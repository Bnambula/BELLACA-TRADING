"use client";
import { Shield, Lock, Smartphone, Clock, Ban, Database, Eye, FileText, Key, AlertTriangle, CheckCircle, XCircle, Activity } from "lucide-react";

const secFeatures = [
  { icon: Lock, title:"Bcrypt Password Hashing", status:"Active", color:"var(--green)", desc:"Cost factor 12. Passwords hashed server-side before storage. Plain-text is never stored, transmitted, or logged anywhere in the system." },
  { icon: Smartphone, title:"Two-Factor Authentication (TOTP)", status:"Partial", color:"var(--amber)", desc:"Google Authenticator / SMS OTP enforced for Super Admin and Admin. Optional for other roles. 3 users currently without 2FA — recommendation: enforce for all." },
  { icon: Clock, title:"JWT Session Management", status:"Active", color:"var(--green)", desc:"Access tokens expire after 8 hours. Refresh tokens rotate on every use. Auto-logout after 30 minutes inactivity. Sessions tied to device fingerprint." },
  { icon: Ban, title:"Brute-Force Protection", status:"Active", color:"var(--green)", desc:"Account locked for 15 minutes after 5 failed logins. IP-level rate limiting at 100 requests/minute. CAPTCHA challenge on repeated failures from same IP." },
  { icon: Database, title:"AES-256 Encryption at Rest", status:"Active", color:"var(--green)", desc:"Database files encrypted with AES-256. Separate keys per environment (dev/staging/prod). Keys stored in a hardware security module (HSM) or secure vault." },
  { icon: Shield, title:"TLS 1.3 In Transit", status:"Active", color:"var(--green)", desc:"All API calls and web traffic encrypted via HTTPS/TLS 1.3. HTTP Strict Transport Security (HSTS) enforced. No HTTP fallback permitted." },
  { icon: Eye, title:"Row-Level Security (RLS)", status:"Active", color:"var(--green)", desc:"PostgreSQL RLS policies ensure each authenticated user can only query rows they have permission to see. Role checked at the database layer — not just application layer." },
  { icon: FileText, title:"Immutable Audit Log", status:"Active", color:"var(--green)", desc:"Every data change writes to an append-only table. No row can be updated or deleted — ever. Only Super Admin can view the log. Stored separately from main DB." },
  { icon: Key, title:"CSRF Protection", status:"Active", color:"var(--green)", desc:"Per-session CSRF tokens required on all state-changing POST/PUT/DELETE requests. SameSite=Strict cookie policy. Origin validation on all API endpoints." },
  { icon: AlertTriangle, title:"SQL Injection Prevention", status:"Active", color:"var(--green)", desc:"All database interactions use parameterised queries via ORM. Zero raw SQL in application code. Input sanitised and validated on server-side before any DB operation." },
  { icon: Shield, title:"XSS Protection", status:"Active", color:"var(--green)", desc:"Content Security Policy (CSP) headers configured. React DOM escaping on all user-generated output. No innerHTML. All user-supplied content sanitised on insert and display." },
  { icon: Activity, title:"Security Alert System", status:"Active", color:"var(--green)", desc:"SMS + email alerts triggered by: new login from unrecognised device, 3+ failed logins, role change, bulk data export, any access between 22:00–06:00 local time." },
];

const recentEvents = [
  { time:"27 May 08:44", event:"3 failed logins → account locked", severity:"High",   ip:"41.x.x.102", resolved:true  },
  { time:"26 May 14:05", event:"Driver attempted admin page access", severity:"Medium",ip:"41.x.x.77",  resolved:true  },
  { time:"25 May 11:18", event:"Unusual stock adjustment flagged",   severity:"Low",   ip:"197.x.x.33", resolved:false },
  { time:"24 May 22:14", event:"After-hours login detected",         severity:"Medium",ip:"197.x.x.55", resolved:true  },
  { time:"22 May 09:00", event:"Bulk export — 500+ records",        severity:"Low",   ip:"197.x.x.41", resolved:true  },
];

export default function SecurityPage() {
  const active = secFeatures.filter(f=>f.status==="Active").length;
  const score = Math.round((active / secFeatures.length) * 100);

  return (
    <div className="animate-fade-in">
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:24, flexWrap:"wrap", gap:16 }}>
        <div>
          <h1 style={{ fontSize:22, fontWeight:900, color:"var(--navy)", marginBottom:4 }}>Security Centre</h1>
          <p style={{ fontSize:14, color:"var(--gray)" }}>System hardening · Access control · Threat monitoring</p>
        </div>
        <div style={{ background:"white", border:"1px solid var(--border)", padding:"16px 24px", textAlign:"center" }}>
          <div style={{ fontSize:36, fontWeight:900, color: score >= 90 ? "var(--green)" : "var(--amber)", letterSpacing:"-0.04em" }}>{score}/100</div>
          <div style={{ fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.08em", color:"var(--gray)" }}>Security Score</div>
          <div style={{ height:4, background:"var(--border)", marginTop:8 }}>
            <div style={{ width:`${score}%`, height:"100%", background: score >= 90 ? "var(--green)" : "var(--amber)", transition:"width 0.6s ease" }} />
          </div>
        </div>
      </div>

      {/* 2FA alert */}
      <div style={{ display:"flex", gap:10, alignItems:"center", background:"#FAEEDA", border:"1px solid var(--amber)", padding:"12px 16px", marginBottom:24, fontSize:13, color:"#7A4D0A" }}>
        <AlertTriangle size={16} style={{ flexShrink:0 }} />
        <span><strong>Recommendation:</strong> 3 users (Sales, Driver, Accounts) have not enabled 2FA. Enable enforcement in Settings → Authentication.</span>
        <button style={{ marginLeft:"auto", background:"var(--amber)", color:"white", border:"none", padding:"6px 14px", fontSize:12, fontWeight:700, cursor:"pointer", flexShrink:0 }}>Enforce Now</button>
      </div>

      {/* Features grid */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(340px,1fr))", gap:16, marginBottom:28 }}>
        {secFeatures.map((f,i) => {
          const Icon = f.icon;
          return (
            <div key={i} className="animate-fade-up" style={{ background:"white", border:"1px solid var(--border)", padding:"18px 20px", animationDelay:`${i*0.05}s`, borderLeft:`4px solid ${f.color}` }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
                <div style={{ display:"flex", gap:10, alignItems:"center" }}>
                  <div style={{ width:34, height:34, background:"var(--offwhite)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <Icon size={17} color={f.color} />
                  </div>
                  <div style={{ fontSize:13, fontWeight:800, color:"var(--navy)", lineHeight:1.3 }}>{f.title}</div>
                </div>
                <span className={`badge ${f.status==="Active"?"badge-success":"badge-warning"}`} style={{ flexShrink:0, marginLeft:8 }}>{f.status}</span>
              </div>
              <p style={{ fontSize:12, color:"var(--gray)", lineHeight:1.65 }}>{f.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Recent security events */}
      <div style={{ background:"white", border:"1px solid var(--border)", marginBottom:20 }}>
        <div style={{ padding:"14px 20px", borderBottom:"1px solid var(--border)", fontWeight:800, color:"var(--navy)", fontSize:15 }}>Recent Security Events</div>
        <table>
          <thead><tr><th>Timestamp</th><th>Event</th><th>Severity</th><th>Source IP</th><th>Resolved</th></tr></thead>
          <tbody>
            {recentEvents.map((e,i) => (
              <tr key={i}>
                <td style={{ fontSize:12, color:"var(--gray)", fontFamily:"monospace", whiteSpace:"nowrap" }}>{e.time}</td>
                <td style={{ fontSize:13 }}>{e.event}</td>
                <td><span className={`badge ${e.severity==="High"?"badge-danger":e.severity==="Medium"?"badge-warning":"badge-gray"}`}>{e.severity}</span></td>
                <td style={{ fontSize:12, fontFamily:"monospace", color:"var(--gray)" }}>{e.ip}</td>
                <td>{e.resolved ? <span style={{ display:"flex", alignItems:"center", gap:4, fontSize:12, color:"var(--green)", fontWeight:700 }}><CheckCircle size={13}/> Yes</span> : <span style={{ display:"flex", alignItems:"center", gap:4, fontSize:12, color:"#C0392B", fontWeight:700 }}><XCircle size={13}/> Pending</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Infrastructure */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:16 }}>
        {[
          { title:"Backup Status", items:[["Daily encrypted backup","✓ Today 02:00"],["Weekly full backup","✓ Sun 02:00"],["Offsite replication","✓ AWS S3"],["30-day retention","Active"]] },
          { title:"IP Allowlisting", items:[["Admin panel","196.x.x.0/24"],["API access","Open + Auth"],["VPN requirement","Admin roles only"],["Geo-blocking","Configurable"]] },
          { title:"Compliance", items:[["HTTPS enforced","✓ Active"],["HSTS header","✓ Active"],["CSP header","✓ Active"],["Audit log retention","2 years"]] },
        ].map(s => (
          <div key={s.title} style={{ background:"white", border:"1px solid var(--border)", padding:"16px 20px" }}>
            <div style={{ fontWeight:800, color:"var(--navy)", fontSize:14, marginBottom:14, paddingBottom:10, borderBottom:"2px solid var(--blue)" }}>{s.title}</div>
            {s.items.map(([l,v]) => (
              <div key={l} style={{ display:"flex", justifyContent:"space-between", padding:"7px 0", borderBottom:"1px solid var(--border)", fontSize:12 }}>
                <span style={{ color:"var(--gray)" }}>{l}</span>
                <span style={{ fontWeight:700, color:v.startsWith("✓")?"var(--green)":"var(--navy)" }}>{v}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
