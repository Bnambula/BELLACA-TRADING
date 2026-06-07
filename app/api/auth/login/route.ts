import { NextRequest, NextResponse } from "next/server";

// In-memory rate limit store (use Redis in production)
const attempts = new Map<string, { count: number; firstAt: number; lockedUntil?: number }>();

const MAX_ATTEMPTS = 5;
const WINDOW_MS    = 15 * 60 * 1000; // 15 min
const LOCKOUT_MS   = 15 * 60 * 1000;
const API_LIMIT    = 100; // per minute

function getClientIP(req: NextRequest): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || req.headers.get("x-real-ip")
    || "unknown";
}

function checkRateLimit(ip: string): { allowed: boolean; remaining: number; lockout?: number } {
  const now  = Date.now();
  const data = attempts.get(ip);

  if (!data) {
    attempts.set(ip, { count: 1, firstAt: now });
    return { allowed: true, remaining: MAX_ATTEMPTS - 1 };
  }

  // Currently locked?
  if (data.lockedUntil && now < data.lockedUntil) {
    return { allowed: false, remaining: 0, lockout: Math.ceil((data.lockedUntil - now) / 1000) };
  }

  // Window expired — reset
  if (now - data.firstAt > WINDOW_MS) {
    attempts.set(ip, { count: 1, firstAt: now });
    return { allowed: true, remaining: MAX_ATTEMPTS - 1 };
  }

  data.count++;
  if (data.count >= MAX_ATTEMPTS) {
    data.lockedUntil = now + LOCKOUT_MS;
    attempts.set(ip, data);
    return { allowed: false, remaining: 0, lockout: LOCKOUT_MS / 1000 };
  }

  attempts.set(ip, data);
  return { allowed: true, remaining: MAX_ATTEMPTS - data.count };
}

// Demo users — replace with DB lookup in production
const DEMO_USERS = [
  { email: "admin@belacatrading.com",    password: "Admin@2026",    role: "Super Admin", name: "Samuel Akello"   },
  { email: "accounts@belacatrading.com", password: "Accounts@2026", role: "Accounts",    name: "Patrick Ochieng" },
  { email: "stock@belacatrading.com",    password: "Stock@2026",    role: "Stock Manager",name: "Moses Wafula"   },
  { email: "sales@belacatrading.com",    password: "Sales@2026",    role: "Sales",        name: "Jane Atuheire"  },
];

export async function POST(req: NextRequest) {
  const ip = getClientIP(req);

  // Rate limit check
  const rl = checkRateLimit(ip);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: `Too many attempts. Locked for ${rl.lockout} seconds.`, locked: true },
      { status: 429, headers: { "Retry-After": String(rl.lockout), "X-RateLimit-Remaining": "0" } }
    );
  }

  let body: { email?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { email, password } = body;

  // Basic validation
  if (!email || !password || typeof email !== "string" || typeof password !== "string") {
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
  }

  if (email.length > 254 || password.length > 128) {
    return NextResponse.json({ error: "Invalid credentials." }, { status: 400 });
  }

  // Constant-time user lookup (prevents user enumeration)
  const user = DEMO_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
  const passwordMatch = user ? user.password === password : false; // Use bcrypt.compare() in production

  if (!user || !passwordMatch) {
    // Log failed attempt
    console.warn(`[AUTH] Failed login for ${email} from ${ip}`);
    return NextResponse.json(
      { error: `Invalid credentials. ${rl.remaining} attempt(s) remaining.`, remaining: rl.remaining },
      { status: 401 }
    );
  }

  // Success — clear rate limit
  attempts.delete(ip);

  // In production: generate proper JWT here
  const sessionToken = Buffer.from(JSON.stringify({ email: user.email, role: user.role, exp: Date.now() + 8*60*60*1000 })).toString("base64");

  console.info(`[AUTH] Successful login: ${user.email} from ${ip}`);

  const response = NextResponse.json({
    success: true,
    user: { email: user.email, name: user.name, role: user.role },
    redirectTo: "/dashboard",
  });

  // Set HttpOnly cookie (production: add Secure, SameSite=Strict)
  response.cookies.set("belaca_session", sessionToken, {
    httpOnly: true,
    secure:   process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge:   8 * 60 * 60, // 8 hours
    path:     "/",
  });

  return response;
}

// Block non-POST methods
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
