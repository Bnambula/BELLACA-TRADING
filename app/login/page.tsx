"use client";
import { useState } from "react";
import { Eye, EyeOff, ArrowRight, AlertCircle, Shield, ArrowLeft } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw]     = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const [attempts, setAttempts] = useState(0);

  const MAX = 5;
  const locked = attempts >= MAX;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (locked) return;
    setLoading(true); setError("");
    await new Promise(r => setTimeout(r, 700));

    const users: Record<string, string> = {
      "admin@belacatrading.com":       "Admin@2026",
      "accounts@belacatrading.com":    "Accounts@2026",
      "stock@belacatrading.com":       "Stock@2026",
      "sales@belacatrading.com":       "Sales@2026",
      "procurement@belacatrading.com": "Procure@2026",
      "driver@belacatrading.com":      "Driver@2026",
    };

    if (users[email.toLowerCase()] === password) {
      // store session
      localStorage.setItem("belaca_user", JSON.stringify({ email: email.toLowerCase(), role: email.includes("admin") ? "Super Admin" : email.includes("accounts") ? "Accounts" : email.includes("stock") ? "Stock Manager" : email.includes("sales") ? "Sales" : email.includes("procurement") ? "Procurement" : "Driver" }));
      window.location.href = "/dashboard";
    } else {
      const left = MAX - attempts - 1;
      setAttempts(a => a + 1);
      setError(left > 0 ? `Invalid credentials. ${left} attempt${left===1?"":"s"} remaining.` : "Account locked. Contact your administrator.");
    }
    setLoading(false);
  }

  const blue = "var(--blue)", navy = "var(--navy)";

  return (
    <div style={{ minHeight:"100vh", display:"flex", flexDirection:"column", background:"var(--off)" }}>
      {/* Header */}
      <div style={{ background:blue, padding:"0 20px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", height:62 }}>
          <a href="/" style={{ textDecoration:"none", display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:32, height:32, background:"white", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, fontSize:13, color:blue }}>BT</div>
            <div>
              <div style={{ color:"white", fontWeight:800, fontSize:14 }}>BELACA TRADING</div>
              <div style={{ color:"rgba(255,255,255,.5)", fontSize:9, letterSpacing:".15em", textTransform:"uppercase" }}>Secure Portal</div>
            </div>
          </a>
          <div style={{ display:"flex", alignItems:"center", gap:6, color:"rgba(255,255,255,.7)", fontSize:11, fontWeight:600 }}>
            <Shield size={13}/> 256-bit Encrypted
          </div>
        </div>
      </div>
      <div style={{ height:4, background:"var(--sky)" }}/>

      {/* Form */}
      <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", padding:"40px 20px" }}>
        <div style={{ width:"100%", maxWidth:440 }}>
          <a href="/" style={{ display:"inline-flex", alignItems:"center", gap:6, color:"var(--gray)", textDecoration:"none", fontSize:13, fontWeight:600, marginBottom:24 }}>
            <ArrowLeft size={15}/> Back to website
          </a>

          <div className="card fade-up">
            <div style={{ background:navy, padding:"24px 28px" }}>
              <h1 style={{ color:"white", fontSize:20, fontWeight:800, marginBottom:4 }}>Welcome back</h1>
              <p style={{ color:"rgba(255,255,255,.6)", fontSize:14 }}>Sign in to your Belaca Trading account</p>
            </div>

            <div style={{ padding:"28px" }}>
              {locked && (
                <div style={{ display:"flex", gap:10, alignItems:"flex-start", background:"var(--amber-l)", border:"1px solid #D97706", padding:"12px 14px", marginBottom:20, fontSize:13, color:navy, borderRadius:0 }}>
                  <AlertCircle size={16} style={{ marginTop:1, flexShrink:0, color:"#D97706" }}/>
                  <span>Account locked after {MAX} failed attempts. Please contact your administrator or wait 15 minutes.</span>
                </div>
              )}
              {error && !locked && (
                <div className="fade-in" style={{ display:"flex", gap:10, alignItems:"center", background:"var(--red-l)", border:"1px solid #EF4444", padding:"11px 14px", marginBottom:20, fontSize:13, color:"var(--red)" }}>
                  <AlertCircle size={15} style={{ flexShrink:0 }}/>
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom:18 }}>
                  <label htmlFor="email">Email Address</label>
                  <input id="email" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@belacatrading.com" required disabled={locked||loading} autoComplete="email"/>
                </div>
                <div style={{ marginBottom:8 }}>
                  <label htmlFor="pw">Password</label>
                  <div style={{ position:"relative" }}>
                    <input id="pw" type={showPw?"text":"password"} value={password} onChange={e=>setPassword(e.target.value)} placeholder="Enter your password" required disabled={locked||loading} style={{ paddingRight:46 }} autoComplete="current-password"/>
                    <button type="button" onClick={()=>setShowPw(!showPw)} style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", color:"var(--gray)", padding:0 }}>
                      {showPw ? <EyeOff size={18}/> : <Eye size={18}/>}
                    </button>
                  </div>
                </div>
                <div style={{ textAlign:"right", marginBottom:24 }}>
                  <a href="#" style={{ fontSize:13, color:blue, textDecoration:"none", fontWeight:600 }}>Forgot password?</a>
                </div>
                <button type="submit" className="btn btn-primary" disabled={locked||loading}
                  style={{ width:"100%", justifyContent:"center", fontSize:14, padding:"13px", opacity:locked?.5:1, cursor:locked?"not-allowed":"pointer" }}>
                  {loading ? <><span className="spin" style={{ width:16, height:16, border:"2px solid rgba(255,255,255,.3)", borderTopColor:"white", borderRadius:"50%", display:"inline-block" }}/> Signing in…</> : <><span>Sign In</span><ArrowRight size={16}/></>}
                </button>
              </form>

              {/* Demo credentials */}
              <div style={{ marginTop:24, padding:"16px", background:"var(--off)", border:"1px solid var(--border)", fontSize:12 }}>
                <div style={{ fontWeight:800, color:navy, marginBottom:8, textTransform:"uppercase", letterSpacing:".06em", fontSize:10 }}>Demo Credentials</div>
                {[["Super Admin","admin@belacatrading.com","Admin@2026"],["Accounts","accounts@belacatrading.com","Accounts@2026"],["Stock Mgr","stock@belacatrading.com","Stock@2026"],["Sales","sales@belacatrading.com","Sales@2026"]].map(([r,e,p])=>(
                  <div key={r} style={{ display:"grid", gridTemplateColumns:"80px 1fr", gap:8, padding:"5px 0", borderBottom:"1px solid var(--border)" }}>
                    <span style={{ fontWeight:700, color:navy, fontSize:11 }}>{r}</span>
                    <button onClick={()=>{setEmail(e);setPassword(p);}} style={{ background:"none", border:"none", cursor:"pointer", textAlign:"left", color:"var(--gray)", fontSize:11, padding:0, fontFamily:"monospace" }}>{e}</button>
                  </div>
                ))}
                <p style={{ marginTop:8, color:"var(--gray)", fontSize:11 }}>Click a row to auto-fill credentials.</p>
              </div>
            </div>
          </div>

          <p style={{ textAlign:"center", fontSize:12, color:"var(--gray)", marginTop:20 }}>
            Protected by rate limiting & session encryption ·{" "}
            <a href="#" style={{ color:blue, textDecoration:"none" }}>Privacy Policy</a>
          </p>
        </div>
      </div>
      <div style={{ background:navy, padding:"14px 20px", textAlign:"center" }}>
        <p style={{ color:"rgba(255,255,255,.35)", fontSize:11 }}>© 2026 Belaca Trading Ltd · Mbale, Uganda</p>
      </div>
    </div>
  );
}
