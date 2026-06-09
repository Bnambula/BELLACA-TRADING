"use client";
import { Shield, Lock, Smartphone, Clock, Ban, Database, Eye, FileText, Key, AlertTriangle, CheckCircle } from "lucide-react";
const FEATURES = [
  { icon:Lock,         title:"Bcrypt Password Hashing",       status:"Active",  color:"#166534", desc:"Cost factor 12. Plain-text passwords never stored, transmitted, or logged." },
  { icon:Smartphone,   title:"Two-Factor Authentication (TOTP)",status:"Partial",color:"#D97706", desc:"TOTP enforced for Super Admin and Admin. 3 users currently without 2FA." },
  { icon:Clock,        title:"JWT Session Management",         status:"Active",  color:"#166534", desc:"8-hour access tokens. Refresh tokens rotate on use. Auto-logout after 30 min inactivity." },
  { icon:Ban,          title:"Brute-Force Protection",         status:"Active",  color:"#166534", desc:"Locked for 15 min after 5 failed attempts. IP rate-limit: 100 req/min." },
  { icon:Database,     title:"AES-256 Encryption at Rest",     status:"Active",  color:"#166534", desc:"Database encrypted with AES-256. Separate keys per environment in HSM vault." },
  { icon:Shield,       title:"TLS 1.3 In Transit",             status:"Active",  color:"#166534", desc:"All traffic encrypted via HTTPS/TLS 1.3. HSTS enforced. No HTTP fallback." },
  { icon:Eye,          title:"Row-Level Security (RLS)",        status:"Active",  color:"#166534", desc:"PostgreSQL RLS policies enforce per-user data visibility at the DB layer." },
  { icon:FileText,     title:"Immutable Audit Log",             status:"Active",  color:"#166534", desc:"Append-only table — no UPDATE or DELETE grant. Stores every data change forever." },
  { icon:Key,          title:"CSRF & XSS Protection",           status:"Active",  color:"#166534", desc:"Per-session CSRF tokens. CSP headers. React DOM escaping. SameSite=Strict cookies." },
  { icon:AlertTriangle,title:"SQL Injection Prevention",        status:"Active",  color:"#166534", desc:"ORM parameterised queries throughout. Zero raw SQL in application code." },
];
const EVENTS = [
  { time:"27 May 08:44", ev:"3 failed logins → account locked", sev:"High",   resolved:true  },
  { time:"26 May 14:05", ev:"Driver attempted admin page",       sev:"Medium", resolved:true  },
  { time:"25 May 11:18", ev:"Unusual stock adjustment flagged",  sev:"Low",    resolved:false },
  { time:"24 May 22:14", ev:"After-hours login detected",        sev:"Medium", resolved:true  },
];
export default function SecurityPage() {
  const active = FEATURES.filter(f=>f.status==="Active").length;
  const score  = Math.round((active/FEATURES.length)*100);
  return (
    <div className="fade-in">
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:18,flexWrap:"wrap",gap:10 }}>
        <div><h1 style={{ fontSize:20,fontWeight:900,color:"#001C5C",marginBottom:2 }}>Security Centre</h1><p style={{ fontSize:13,color:"var(--gray)" }}>System hardening · Access control · Threat monitoring</p></div>
        <div className="card" style={{ padding:"14px 20px",textAlign:"center" }}>
          <div style={{ fontSize:32,fontWeight:900,color:score>=90?"#166534":"#D97706",letterSpacing:"-.04em" }}>{score}/100</div>
          <div style={{ fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".08em",color:"var(--gray)" }}>Security Score</div>
          <div style={{ height:4,background:"var(--border)",marginTop:8 }}><div style={{ width:`${score}%`,height:"100%",background:score>=90?"#166534":"#D97706" }}/></div>
        </div>
      </div>
      <div style={{ display:"flex",gap:10,alignItems:"center",background:"var(--amber-l)",border:"1px solid #D97706",padding:"11px 14px",marginBottom:18,fontSize:13,color:"#92400E" }}>
        <AlertTriangle size={15} style={{ flexShrink:0 }}/> <strong>Recommendation:</strong> Enable 2FA for Sales, Driver and one Accounts user to reach 100/100.
        <button style={{ marginLeft:"auto",background:"#D97706",color:"white",border:"none",padding:"6px 12px",fontSize:11,fontWeight:800,cursor:"pointer",flexShrink:0 }}>Enforce Now</button>
      </div>
      <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:14,marginBottom:20 }}>
        {FEATURES.map((f,i)=>{ const Icon=f.icon; return (
          <div key={i} className="card fade-up" style={{ padding:"16px",borderLeft:`4px solid ${f.color}`,animationDelay:`${i*.04}s` }}>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8 }}>
              <div style={{ display:"flex",gap:9,alignItems:"center" }}>
                <div style={{ width:30,height:30,background:"var(--off)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}><Icon size={15} color={f.color}/></div>
                <div style={{ fontSize:13,fontWeight:800,color:"#001C5C",lineHeight:1.3 }}>{f.title}</div>
              </div>
              <span className={`badge ${f.status==="Active"?"badge-success":"badge-warning"}`} style={{ flexShrink:0,marginLeft:8 }}>{f.status}</span>
            </div>
            <p style={{ fontSize:12,color:"var(--gray)",lineHeight:1.65,paddingLeft:39 }}>{f.desc}</p>
          </div>
        );})}
      </div>
      <div className="card">
        <div style={{ padding:"12px 16px",borderBottom:"1px solid var(--border)",fontWeight:800,color:"#001C5C",fontSize:14 }}>Recent Security Events</div>
        <table>
          <thead><tr><th>Time</th><th>Event</th><th>Severity</th><th>Resolved</th></tr></thead>
          <tbody>
            {EVENTS.map((e,i)=>(
              <tr key={i}>
                <td style={{ fontSize:11,fontFamily:"monospace",color:"var(--gray)",whiteSpace:"nowrap" }}>{e.time}</td>
                <td style={{ fontSize:13 }}>{e.ev}</td>
                <td><span className={`badge ${e.sev==="High"?"badge-danger":e.sev==="Medium"?"badge-warning":"badge-gray"}`}>{e.sev}</span></td>
                <td>{e.resolved?<span style={{ display:"flex",alignItems:"center",gap:4,fontSize:12,color:"#166534",fontWeight:700 }}><CheckCircle size={12}/> Yes</span>:<span style={{ fontSize:12,color:"#DC2626",fontWeight:700 }}>⏳ Pending</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
