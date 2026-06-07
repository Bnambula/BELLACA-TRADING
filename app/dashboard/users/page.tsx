"use client";
import { useState } from "react";
import { Plus, Edit2, Trash2, Shield, ShieldCheck, UserCheck, AlertTriangle } from "lucide-react";

const users = [
  { name:"Samuel Akello",   email:"admin@belacatrading.com",       role:"Super Admin",  roleCls:"role-super",    lastLogin:"27 May, 08:12", twoFA:true,  status:"Active"   },
  { name:"Grace Namukasa",  email:"grace@belacatrading.com",       role:"Admin",         roleCls:"role-admin",   lastLogin:"27 May, 07:44", twoFA:true,  status:"Active"   },
  { name:"Patrick Ochieng", email:"accounts@belacatrading.com",    role:"Accounts",     roleCls:"role-accounts",  lastLogin:"26 May, 16:30", twoFA:true,  status:"Active"   },
  { name:"Fatuma Wanjiku",  email:"fatuma@belacatrading.com",      role:"Procurement",  roleCls:"role-procurement",lastLogin:"27 May, 09:01",twoFA:false, status:"Active"   },
  { name:"Moses Wafula",    email:"moses@belacatrading.com",       role:"Stock Manager",roleCls:"role-stock",    lastLogin:"25 May, 11:18", twoFA:true,  status:"Active"   },
  { name:"Jane Atuheire",   email:"jane@belacatrading.com",        role:"Sales",        roleCls:"role-sales",    lastLogin:"27 May, 10:22", twoFA:false, status:"Active"   },
  { name:"Robert Otieno",   email:"robert@belacatrading.com",      role:"Driver/Logistics",roleCls:"role-driver",lastLogin:"26 May, 14:05",twoFA:false, status:"Active"   },
  { name:"Diana Mutesi",    email:"diana@belacatrading.com",       role:"Accounts",     roleCls:"role-accounts", lastLogin:"20 May, 09:30", twoFA:false, status:"Inactive" },
];

const permissions = [
  { module:"View Dashboard",   superAdmin:true, admin:true, accounts:true,  procurement:true,  stock:true,  sales:true,  driver:false },
  { module:"Create Orders",    superAdmin:true, admin:true, accounts:false, procurement:true,  stock:false, sales:true,  driver:false },
  { module:"Delete Orders",    superAdmin:true, admin:true, accounts:false, procurement:false, stock:false, sales:false, driver:false },
  { module:"View Financials",  superAdmin:true, admin:true, accounts:true,  procurement:false, stock:false, sales:false, driver:false },
  { module:"Edit Financials",  superAdmin:true, admin:false,accounts:true,  procurement:false, stock:false, sales:false, driver:false },
  { module:"Manage Inventory", superAdmin:true, admin:true, accounts:false, procurement:true,  stock:true,  sales:false, driver:false },
  { module:"View Reports",     superAdmin:true, admin:true, accounts:true,  procurement:false, stock:false, sales:"own", driver:false },
  { module:"Export Reports",   superAdmin:true, admin:true, accounts:true,  procurement:false, stock:false, sales:false, driver:false },
  { module:"Add/Delete Users", superAdmin:true, admin:false,accounts:false, procurement:false, stock:false, sales:false, driver:false },
  { module:"Change Roles",     superAdmin:true, admin:false,accounts:false, procurement:false, stock:false, sales:false, driver:false },
  { module:"View Audit Log",   superAdmin:true, admin:true, accounts:false, procurement:false, stock:false, sales:false, driver:false },
  { module:"Security Settings",superAdmin:true, admin:false,accounts:false, procurement:false, stock:false, sales:false, driver:false },
];

const roleCols = ["superAdmin","admin","accounts","procurement","stock","sales","driver"] as const;
const roleLabels = ["Super Admin","Admin","Accounts","Procurement","Stock Mgr","Sales","Driver"];

const auditLog = [
  { time:"27 May 10:22", user:"Jane Atuheire",  role:"Sales",       action:"Created invoice",       record:"INV-0091",      ip:"197.x.x.41",  result:"OK" },
  { time:"27 May 09:01", user:"Fatuma Wanjiku", role:"Procurement", action:"Added supplier",        record:"Kipkaren Farm",  ip:"197.x.x.88",  result:"OK" },
  { time:"27 May 08:44", user:"Unknown",         role:"—",           action:"Failed login ×3",       record:"grace@...",     ip:"41.x.x.102",  result:"Blocked" },
  { time:"26 May 16:30", user:"Patrick Ochieng", role:"Accounts",   action:"Exported P&L report",   record:"May 2026",       ip:"197.x.x.55",  result:"OK" },
  { time:"26 May 14:05", user:"Robert Otieno",   role:"Driver",      action:"Attempted /admin/users",record:"/admin/users",  ip:"41.x.x.77",   result:"Denied" },
  { time:"25 May 11:18", user:"Moses Wafula",    role:"Stock Mgr",   action:"Stock adjustment",      record:"Onions -5kg",   ip:"197.x.x.33",  result:"Flagged" },
];

const roleColorMap: Record<string, string> = {
  "Super Admin":"#EDE9FD", "Admin":"#E6F1FB", "Accounts":"#D9EAD3",
  "Procurement":"#FAEEDA", "Stock Manager":"#FBEAF0", "Sales":"#E1F5EE", "Driver/Logistics":"#F1EFE8"
};
const roleTextMap: Record<string, string> = {
  "Super Admin":"#3C3489","Admin":"#0C447C","Accounts":"#27500A",
  "Procurement":"#633806","Stock Manager":"#4B1528","Sales":"#04342C","Driver/Logistics":"#444441"
};

function RoleBadge({ role }: { role: string }) {
  return <span style={{ display:"inline-block", padding:"2px 10px", fontSize:11, fontWeight:700, background:roleColorMap[role]||"#F3F4F6", color:roleTextMap[role]||"#6B7280", borderRadius:2 }}>{role}</span>;
}

function PermCell({ val }: { val: boolean | string }) {
  if (val === true)  return <div style={{ textAlign:"center", fontSize:16, color:"var(--green)" }}>✓</div>;
  if (val === false) return <div style={{ textAlign:"center", fontSize:14, color:"var(--border)" }}>–</div>;
  return <div style={{ textAlign:"center", fontSize:11, color:"var(--amber)", fontWeight:700 }}>OWN</div>;
}

export default function UsersPage() {
  const [tab, setTab] = useState(0);
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div className="animate-fade-in">
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:24, flexWrap:"wrap", gap:16 }}>
        <div>
          <h1 style={{ fontSize:22, fontWeight:900, color:"var(--navy)", marginBottom:4 }}>Users & Roles</h1>
          <p style={{ fontSize:14, color:"var(--gray)" }}>{users.filter(u=>u.status==="Active").length} active users · Role-based access control</p>
        </div>
        <button className="btn-primary" onClick={()=>setShowAdd(true)} style={{ fontSize:13, padding:"10px 20px" }}><Plus size={15} /> Add User</button>
      </div>

      <div style={{ padding:"12px 16px", background:"#E6F1FB", border:"1px solid var(--blue)", marginBottom:20, fontSize:13, color:"var(--navy)", display:"flex", gap:10, alignItems:"center" }}>
        <ShieldCheck size={16} style={{ flexShrink:0 }} />
        <span><strong>Access control:</strong> Only Super Admin can add, edit or delete users. All role changes are permanently logged in the audit trail.</span>
      </div>

      <div style={{ display:"flex", gap:0, marginBottom:20, borderBottom:"2px solid var(--border)" }}>
        {["User Management","Permission Matrix","Audit Log"].map((t,i)=>(
          <button key={t} onClick={()=>setTab(i)} style={{ padding:"10px 20px", fontSize:13, fontWeight:tab===i?800:500, background:"none", border:"none", cursor:"pointer", color:tab===i?"var(--blue)":"var(--gray)", borderBottom:tab===i?"3px solid var(--blue)":"3px solid transparent", marginBottom:-2, whiteSpace:"nowrap", transition:"all 0.15s" }}>{t}</button>
        ))}
      </div>

      {tab === 0 && (
        <div style={{ background:"white", border:"1px solid var(--border)" }}>
          <div style={{ overflowX:"auto" }}>
            <table>
              <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Last Login</th><th>2FA</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.email}>
                    <td style={{ fontWeight:700, fontSize:13 }}>{u.name}</td>
                    <td style={{ fontSize:12, color:"var(--gray)" }}>{u.email}</td>
                    <td><RoleBadge role={u.role} /></td>
                    <td style={{ fontSize:12, color:"var(--gray)", whiteSpace:"nowrap" }}>{u.lastLogin}</td>
                    <td>
                      {u.twoFA ? <span className="badge badge-success" style={{ display:"flex", alignItems:"center", gap:4, width:"fit-content" }}><ShieldCheck size={10}/> On</span>
                               : <span className="badge badge-warning" style={{ display:"flex", alignItems:"center", gap:4, width:"fit-content" }}><AlertTriangle size={10}/> Off</span>}
                    </td>
                    <td><span className={`badge ${u.status==="Active"?"badge-success":"badge-gray"}`}>{u.status}</span></td>
                    <td>
                      <div style={{ display:"flex", gap:6 }}>
                        <button className="btn-secondary" style={{ fontSize:11, padding:"4px 10px", display:"flex", alignItems:"center", gap:4 }} disabled={u.role==="Super Admin"}><Edit2 size={11}/> Edit</button>
                        <button style={{ background:"none", border:"1px solid #C0392B", color:"#C0392B", padding:"4px 10px", fontSize:11, cursor:u.role==="Super Admin"?"not-allowed":"pointer", opacity:u.role==="Super Admin"?0.4:1, display:"flex", alignItems:"center", gap:4 }} disabled={u.role==="Super Admin"}><Trash2 size={11}/></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 1 && (
        <div style={{ background:"white", border:"1px solid var(--border)" }}>
          <div style={{ overflowX:"auto" }}>
            <table>
              <thead>
                <tr>
                  <th style={{ minWidth:180 }}>Module / Action</th>
                  {roleLabels.map(r=><th key={r} style={{ textAlign:"center", minWidth:80 }}>{r}</th>)}
                </tr>
              </thead>
              <tbody>
                {permissions.map(p => (
                  <tr key={p.module}>
                    <td style={{ fontSize:13, fontWeight:600, color:"var(--navy)" }}>{p.module}</td>
                    {roleCols.map(col => <td key={col}><PermCell val={p[col]} /></td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ padding:"12px 16px", borderTop:"1px solid var(--border)", background:"var(--offwhite)", fontSize:12, color:"var(--gray)", display:"flex", gap:24 }}>
            <span><span style={{ color:"var(--green)", fontWeight:800 }}>✓</span> Full access</span>
            <span><span style={{ color:"var(--amber)", fontWeight:800 }}>OWN</span> Own records only</span>
            <span><span style={{ color:"var(--border)", fontWeight:800 }}>–</span> No access</span>
          </div>
        </div>
      )}

      {tab === 2 && (
        <div style={{ background:"white", border:"1px solid var(--border)" }}>
          <div style={{ padding:"14px 20px", borderBottom:"1px solid var(--border)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <span style={{ fontWeight:800, color:"var(--navy)", fontSize:15 }}>Audit Log — Immutable Record</span>
            <span style={{ fontSize:12, color:"var(--gray)" }}>Append-only · Cannot be edited or deleted</span>
          </div>
          <div style={{ overflowX:"auto" }}>
            <table>
              <thead><tr><th>Timestamp</th><th>User</th><th>Role</th><th>Action</th><th>Record</th><th>IP Address</th><th>Result</th></tr></thead>
              <tbody>
                {auditLog.map((r,i) => (
                  <tr key={i}>
                    <td style={{ fontSize:12, color:"var(--gray)", whiteSpace:"nowrap", fontFamily:"monospace" }}>{r.time}</td>
                    <td style={{ fontSize:13, fontWeight:600 }}>{r.user}</td>
                    <td><RoleBadge role={r.role} /></td>
                    <td style={{ fontSize:13 }}>{r.action}</td>
                    <td style={{ fontSize:12, color:"var(--gray)", fontFamily:"monospace" }}>{r.record}</td>
                    <td style={{ fontSize:12, color:"var(--gray)", fontFamily:"monospace" }}>{r.ip}</td>
                    <td><span className={`badge ${r.result==="OK"?"badge-success":r.result==="Blocked"||r.result==="Denied"?"badge-danger":"badge-warning"}`}>{r.result}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showAdd && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,28,92,0.5)", zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center", padding:24, backdropFilter:"blur(3px)" }} onClick={e=>{ if(e.target===e.currentTarget) setShowAdd(false); }}>
          <div className="animate-fade-up" style={{ background:"white", width:"100%", maxWidth:480, maxHeight:"90vh", overflowY:"auto" }}>
            <div style={{ background:"var(--navy)", padding:"20px 24px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <h2 style={{ color:"white", fontSize:17, fontWeight:800 }}>Add New User</h2>
              <button onClick={()=>setShowAdd(false)} style={{ background:"none", border:"none", color:"rgba(255,255,255,0.6)", cursor:"pointer", fontSize:22 }}>×</button>
            </div>
            <div style={{ padding:24 }}>
              <div style={{ padding:"12px 14px", background:"#FAEEDA", border:"1px solid var(--amber)", marginBottom:20, fontSize:13, color:"#7A4D0A" }}>
                New users will receive a welcome email with a temporary password and must set their own password on first login.
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 }}>
                <div><label>First Name</label><input placeholder="e.g. John" /></div>
                <div><label>Last Name</label><input placeholder="e.g. Mugisha" /></div>
              </div>
              <div style={{ marginBottom:16 }}><label>Email Address</label><input type="email" placeholder="user@belacatrading.com" /></div>
              <div style={{ marginBottom:16 }}><label>Assign Role</label>
                <select>
                  {["Admin","Accounts","Procurement","Stock Manager","Sales","Driver/Logistics"].map(r=><option key={r}>{r}</option>)}
                </select>
              </div>
              <div style={{ marginBottom:20 }}><label>Require 2FA on First Login</label>
                <select><option>Yes — Required</option><option>No — Optional</option></select>
              </div>
              <div style={{ display:"flex", gap:12 }}>
                <button className="btn-primary" style={{ flex:1, justifyContent:"center" }}>Create User</button>
                <button className="btn-secondary" onClick={()=>setShowAdd(false)} style={{ flex:1, justifyContent:"center" }}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
