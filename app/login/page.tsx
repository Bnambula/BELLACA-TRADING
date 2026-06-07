"use client";
import { useState } from "react";
import { Eye, EyeOff, ArrowRight, AlertCircle, Shield } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (attempts >= 5) { setError("Account temporarily locked. Too many failed attempts. Please wait 15 minutes or contact your administrator."); return; }
    setLoading(true); setError("");
    await new Promise(r => setTimeout(r, 900));

    // Demo routing by email
    if (email === "admin@belacatrading.com" && password === "Admin@2026") {
      window.location.href = "/dashboard";
    } else if (email === "accounts@belacatrading.com" && password === "Accounts@2026") {
      window.location.href = "/dashboard";
    } else {
      setAttempts(a => a + 1);
      setError(`Invalid credentials. ${5 - attempts - 1} attempt(s) remaining before account lock.`);
    }
    setLoading(false);
  }

  const locked = attempts >= 5;

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--offwhite)" }}>
      {/* Header */}
      <div style={{ background: "var(--blue)", padding: "0 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <a href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 34, height: 34, background: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 14, color: "var(--blue)" }}>BT</div>
            <div>
              <div style={{ color: "white", fontWeight: 800, fontSize: 15, letterSpacing: "-0.02em" }}>BELACA TRADING</div>
              <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase" }}>Secure Portal</div>
            </div>
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.7)", fontSize: 12 }}>
            <Shield size={14} />
            <span style={{ fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>256-bit SSL Encrypted</span>
          </div>
        </div>
      </div>

      {/* Blue accent line */}
      <div style={{ height: 4, background: "var(--sky)" }} />

      {/* Login card */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 24px" }}>
        <div style={{ width: "100%", maxWidth: 440 }}>
          <div className="animate-fade-up" style={{ background: "white", border: "1px solid var(--border)", boxShadow: "var(--shadow-lg)" }}>
            {/* Card header */}
            <div style={{ background: "var(--navy)", padding: "28px 32px" }}>
              <h1 style={{ color: "white", fontSize: 22, fontWeight: 800, marginBottom: 4, letterSpacing: "-0.02em" }}>Welcome back</h1>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14 }}>Sign in to your Belaca Trading account</p>
            </div>

            <div style={{ padding: "32px" }}>
              {error && (
                <div style={{ display: "flex", gap: 10, alignItems: "flex-start", background: "#FCEBEB", border: "1px solid #C0392B", padding: "12px 14px", marginBottom: 20, fontSize: 13, color: "#C0392B" }} className="animate-fade-in">
                  <AlertCircle size={16} style={{ marginTop: 1, flexShrink: 0 }} />
                  <span>{error}</span>
                </div>
              )}

              {locked && (
                <div style={{ display: "flex", gap: 10, alignItems: "flex-start", background: "#FFF3CD", border: "1px solid #BA7517", padding: "12px 14px", marginBottom: 20, fontSize: 13, color: "#7A4D0A" }} className="animate-fade-in">
                  <AlertCircle size={16} style={{ marginTop: 1, flexShrink: 0 }} />
                  <span>Account locked for 15 minutes. Contact admin if urgent.</span>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 20 }}>
                  <label htmlFor="email">Email Address</label>
                  <input
                    id="email" type="email" value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@belacatrading.com"
                    required disabled={locked || loading}
                    autoComplete="email"
                  />
                </div>

                <div style={{ marginBottom: 8 }}>
                  <label htmlFor="password">Password</label>
                  <div style={{ position: "relative" }}>
                    <input
                      id="password" type={showPw ? "text" : "password"} value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required disabled={locked || loading}
                      autoComplete="current-password"
                      style={{ paddingRight: 48 }}
                    />
                    <button type="button" onClick={() => setShowPw(!showPw)}
                      style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--gray)", padding: 0 }}
                      aria-label={showPw ? "Hide password" : "Show password"}>
                      {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 24 }}>
                  <a href="/forgot-password" style={{ fontSize: 13, color: "var(--blue)", textDecoration: "none", fontWeight: 600 }}>Forgot password?</a>
                </div>

                <button type="submit" className="btn-primary" disabled={locked || loading}
                  style={{ width: "100%", justifyContent: "center", fontSize: 14, padding: "14px", opacity: locked ? 0.5 : 1, cursor: locked ? "not-allowed" : "pointer" }}>
                  {loading ? (
                    <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "white", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} />
                      Signing in…
                    </span>
                  ) : (
                    <><span>Sign In</span><ArrowRight size={16} /></>
                  )}
                </button>
              </form>

              <div style={{ marginTop: 24, padding: "16px", background: "var(--offwhite)", border: "1px solid var(--border)", fontSize: 12 }}>
                <div style={{ fontWeight: 700, color: "var(--navy)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em", fontSize: 11 }}>Demo Credentials</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6, color: "var(--gray)" }}>
                  <div><strong style={{ color: "var(--navy)" }}>Super Admin:</strong> admin@belacatrading.com / Admin@2026</div>
                  <div><strong style={{ color: "var(--navy)" }}>Accounts:</strong> accounts@belacatrading.com / Accounts@2026</div>
                </div>
              </div>
            </div>
          </div>

          {/* Security note */}
          <p style={{ textAlign: "center", fontSize: 12, color: "var(--gray)", marginTop: 20, lineHeight: 1.6 }}>
            Protected by rate limiting, 2FA and session encryption.<br />
            <a href="/privacy" style={{ color: "var(--blue)", textDecoration: "none", fontWeight: 600 }}>Privacy Policy</a> · <a href="/terms" style={{ color: "var(--blue)", textDecoration: "none", fontWeight: 600 }}>Terms of Use</a>
          </p>
        </div>
      </div>

      {/* Footer */}
      <div style={{ background: "var(--navy)", padding: "16px 24px", textAlign: "center" }}>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>© 2026 Belaca Trading Ltd · All rights reserved · Mbale, Uganda</p>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
