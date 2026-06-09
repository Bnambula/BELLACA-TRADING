import { NextRequest, NextResponse } from "next/server";

const attempts = new Map<string, { count: number; firstAt: number; lockedUntil?: number }>();
const MAX = 5, WINDOW = 15 * 60 * 1000, LOCKOUT = 15 * 60 * 1000;

function getIP(req: NextRequest) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

function checkRL(ip: string) {
  const now = Date.now(), d = attempts.get(ip);
  if (!d) { attempts.set(ip, { count: 1, firstAt: now }); return { ok: true, left: MAX - 1 }; }
  if (d.lockedUntil && now < d.lockedUntil) return { ok: false, left: 0, wait: Math.ceil((d.lockedUntil - now) / 1000) };
  if (now - d.firstAt > WINDOW) { attempts.set(ip, { count: 1, firstAt: now }); return { ok: true, left: MAX - 1 }; }
  d.count++;
  if (d.count >= MAX) { d.lockedUntil = now + LOCKOUT; attempts.set(ip, d); return { ok: false, left: 0, wait: LOCKOUT / 1000 }; }
  attempts.set(ip, d);
  return { ok: true, left: MAX - d.count };
}

const USERS: Record<string, { password: string; role: string; name: string }> = {
  "admin@belacatrading.com":       { password: "Admin@2026",    role: "Super Admin",     name: "Samuel Akello"   },
  "accounts@belacatrading.com":    { password: "Accounts@2026", role: "Accounts",        name: "Patrick Ochieng" },
  "stock@belacatrading.com":       { password: "Stock@2026",    role: "Stock Manager",   name: "Moses Wafula"    },
  "sales@belacatrading.com":       { password: "Sales@2026",    role: "Sales",           name: "Jane Atuheire"   },
  "procurement@belacatrading.com": { password: "Procure@2026",  role: "Procurement",     name: "Fatuma Wanjiku"  },
  "driver@belacatrading.com":      { password: "Driver@2026",   role: "Driver/Logistics",name: "Robert Otieno"   },
};

export async function POST(req: NextRequest) {
  const ip = getIP(req);
  const rl = checkRL(ip);
  if (!rl.ok) return NextResponse.json({ error: `Locked. Retry in ${rl.wait}s.`, locked: true }, { status: 429, headers: { "Retry-After": String(rl.wait) } });

  let body: { email?: string; password?: string };
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Bad request" }, { status: 400 }); }

  const { email = "", password = "" } = body;
  if (!email || !password || email.length > 254 || password.length > 128) return NextResponse.json({ error: "Invalid credentials." }, { status: 400 });

  const user = USERS[email.toLowerCase()];
  if (!user || user.password !== password) {
    return NextResponse.json({ error: `Invalid credentials. ${rl.left} attempt(s) remaining.`, remaining: rl.left }, { status: 401 });
  }

  attempts.delete(ip);
  const res = NextResponse.json({ success: true, user: { email, name: user.name, role: user.role }, redirectTo: "/dashboard" });
  res.cookies.set("belaca_session", Buffer.from(JSON.stringify({ email, role: user.role, exp: Date.now() + 8 * 3600 * 1000 })).toString("base64"), {
    httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", maxAge: 8 * 3600, path: "/",
  });
  return res;
}

export async function GET() { return NextResponse.json({ error: "Method not allowed" }, { status: 405 }); }
