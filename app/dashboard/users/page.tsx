"use client";
import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, ShieldCheck, AlertTriangle, X, Eye, EyeOff } from "lucide-react";

const ROLE_COLORS: Record<string,{bg:string;text:string}> = {
  "Super Admin":    { bg:"#EDE9FD", text:"#3C3489" },
  "Admin":          { bg:"#DBEAFE", text:"#1E40AF" },
  "Accounts":       { bg:"#DCFCE7", text:"#166534" },
  "Procurement":    { bg:"#FEF3C7", text:"#92400E" },
  "Stock Manager":  { bg:"#FCE7F3", text:"#9D174D" },
  "Sales":          { bg:"#D1FAE5", text:"#065F46" },
  "Driver/Logistics":{ bg:"#F3F4F6",text:"#374151" },
};
const ROLES = Object.keys(ROLE_COLORS);

const INITIAL_USERS = [
  { id:1, name:"Samuel Akello",   email:"admin@belacatrading.com",       role:"Super Admin",     lastLogin:"27 May 08:12", twoFA:true,  status:"Active" },
  { id:2, name:"Grace Namukasa",  email:"grace@belacatrading.com",       role:"Admin",            lastLogin:"27 May 07:44", twoFA:true,  status:"Active" },
  { id:3, name:"Patrick Ochieng", email:"accounts@belacatrading.com",    role:"Accounts",         lastLogin:"26 May 16:30", twoFA:true,  status:"Active" },
  { id:4, name:"Fatuma Wanjiku",  email:"fatuma@belacatrading.com",      role:"Procurement",      lastLogin:"27 May 09:01", twoFA:false, status:"Active" },
  { id:5, name:"Moses Wafula",    email:"stock@belacatrading.com",       role:"Stock Manager",    lastLogin:"25 May 11:18", twoFA:true,  status:"Active" },
  { id:6, name:"Jane Atuheire",   email:"sales@belacatrading.com",       role:"Sales",            lastLogin:"27 May 10:22", twoFA:false, status:"Active" },
  { id:7, name:"Robert Otieno",   email:"driver@belacatrading.com",      role:"Driver/Logistics", lastLogin:"26 May 14:05", twoFA:false, status:"Active" },
  { id:8, name:"Diana Mutesi",    email:"diana@belacatrading.com",       role:"Accounts",         lastLogin:"20 May 09:30", twoFA:false, status:"Inactive"},
];

const PERMS = [
  { module:"View Dashboard",   superAdmin:true,admin:true,accounts:true,procurement:true,stock:true,sales:true,driver:false },
  { module:"Create Orders",    superAdmin:true,admin:true,accounts:false,procurement:true,stock:false,sales:true,driver:false },
  { module:"Delete Orders",    superAdmin:true,admin:true,accounts:false,procurement:false,stock:false,sales:false,driver:false },
  { module:"View Financials",  superAdmin:true,admin:true,accounts:true,procurement:false,stock:false,sales:false,driver:false },
  { module:"Edit Financials",  superAdmin:true,admin:false,accounts:true,procurement:false,stock:false,sales:false,driver:false },
  { module:"Manage Inventory", superAdmin:true,admin:true,accounts:false,procurement:true,stock:true,sales:false,driver:false },
  { module:"Export Reports",   superAdmin:true,admin:true,accounts:true,procurement:false,stock:false,sales:false,driver:false },
  { module:"Add/Delete Users", superAdmin:true,admin:false,accounts:false,procurement:false,stock:false,sales:false,driver:false },
  { module:"View Audit Log",   superAdmin:true,admin:true,accounts:false,procurement:false,stock:false,sales:false,driver:false },
];

const AUDIT = [
  { time:"27 May 10:22", user:"Jane Atuheire",  role:"Sales",       action:"Created invoice INV-0091",          ip:"197.x.x.41", result:"OK"      },
  { time:"27 May 09:01", user:"Fatuma Wanjiku", role:"Procurement", action:"Added supplier Kipkaren Farm",       ip:"197.x.x.88", result:"OK"      },
  { time:"27 May 08:44", user:"Unknown",         role:"—",           action:"Failed login ×3 on grace@...",      ip:"41.x.x.102", result:"Blocked" },
  { time:"26 May 16:30", user:"Patrick Ochieng", role:"Accounts",   action:"Exported P&L report May 2026",      ip:"197.x.x.55", result:"OK"      },
  { time:"26 May 14:05", user:"Robert Otieno",   role:"Driver",      action:"Attempted /admin/users (denied)",   ip:"41.x.x.77",  result:"Denied"  },
  { time:"25 May 11:18", user:"Moses Wafula",    role:"Stock Mgr",   action:"Stock adjustment Onions -5kg",      ip:"197.x.x.33", result:"Flagged" },
];

function RolePill({ role }: { role: string }) {
  const c = ROLE_COLORS[role]||{bg:"#F3F4F6",text:"#374151"};
  return <span style={{ fontSize:11,fontWeight:700,padding:"2px 9px",background:c.bg,color:c.text }}>{role}</span>;
}

function PCeil({ val }: { val: boolean }) {
  return <div style={{ textAlign:"center",fontSize:15,color:val?"#166534":"#D1D5DB" }}>{val?"✓":"–"}</div>;
}

export default function UsersPage() {
  const [tab, setTab]   = useState(0);
  const [users, setUsers] = useState(INITIAL_USERS);
  const [showAdd, setShowAdd] = useState(false);
  const [editUser, setEditUser] = useState<typeof INITIAL_USERS[0]|null>(null);
  const [delUser, setDelUser]   = useState<typeof INITIAL_USERS[0]|null>(null);
  const [showPw, setShowPw]     = useState(false);
  const [curRole, setCurRole]   = useState<string|null>(null);

  // Get current user role from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("belaca_user");
    if (stored) { try { setCurRole(JSON.parse(stored).role); } catch {} }
  }, []);

  const isSuperAdmin = curRole === "Super Admin";

  const [form, setForm] = useState({ firstName:"", lastName:"", email:"", role:"Accounts", password:"", twoFA:true });

  function addUser() {
    if (!form.firstName||!form.email) return;
    const newUser = { id:Date.now(), name:`${form.firstName} ${form.lastName}`, email:form.email, role:form.role, lastLogin:"Never", twoFA:form.twoFA, status:"Active" };
    setUsers(u=>[...u, newUser]);
    setForm({ firstName:"",lastName:"",email:"",role:"Accounts",password:"",twoFA:true });
    setShowAdd(false);
  }

  function deleteUser(id: number) { setUsers(u=>u.filter(x=>x.id!==id)); setDelUser(null); }
  function toggleStatus(id: number) { setUsers(u=>u.map(x=>x.id===id?{...x,status:x.status==="Active"?"Inactive":"Active"}:x)); }

  const ModalWrap = ({ children, onClose }: { children: React.ReactNode; onClose: ()=>void }) => (
    <div style={{ position:"fixed",inset:0,background:"rgba(0,28,92,.55)",zIndex:200,display:"flex",alignItems:"flex-end",justifyContent:"center",backdropFilter:"blur(3px)" }}
      onClick={e=>{if(e.target===e.currentTarget) onClose();}}>
      <div className="fade-up" style={{ background:"white",width:"100%",maxWidth:520,maxHeight:"90vh",overflowY:"auto",borderRadius:"14px 14px 0 0" }}>{children}</div>
    </div>
  );

  return (
    <div className="fade-in">
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:18,flexWrap:"wrap",gap:10 }}>
        <div>
          <h1 style={{ fontSize:20,fontWeight:900,color:"#001C5C",marginBottom:2 }}>Users & Roles</h1>
          <p style={{ fontSize:13,color:"var(--gray)" }}>{users.filter(u=>u.status==="Active").length} active users · Role-based access control</p>
        </div>
        {isSuperAdmin && <button className="btn btn-primary btn-sm" onClick={()=>setShowAdd(true)}><Plus size={14}/> Add User</button>}
      </div>

      {!isSuperAdmin && (
        <div style={{ display:"flex",gap:10,alignItems:"center",background:"var(--amber-l)",border:"1px solid #D97706",padding:"11px 14px",marginBottom:16,fontSize:13,color:"#92400E" }}>
          <AlertTriangle size={15} style={{ flexShrink:0 }}/> Only Super Admin can add, edit or delete users.
        </div>
      )}

      <div style={{ display:"flex",gap:0,marginBottom:16,borderBottom:"2px solid var(--border)",overflowX:"auto" }}>
        {["Users","Permissions","Audit Log"].map((t,i)=>(
          <button key={t} onClick={()=>setTab(i)} style={{ padding:"8px 14px",fontSize:12,fontWeight:tab===i?800:500,background:"none",border:"none",cursor:"pointer",color:tab===i?"#003DA5":"var(--gray)",borderBottom:tab===i?"3px solid #003DA5":"3px solid transparent",marginBottom:-2,whiteSpace:"nowrap",transition:"all .15s",flexShrink:0 }}>{t}</button>
        ))}
      </div>

      {tab===0 && (
        <div className="card" style={{ overflowX:"auto" }}>
          <table>
            <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Last Login</th><th>2FA</th><th>Status</th>{isSuperAdmin&&<th>Actions</th>}</tr></thead>
            <tbody>
              {users.map(u=>(
                <tr key={u.id}>
                  <td style={{ fontWeight:700,fontSize:13 }}>{u.name}</td>
                  <td style={{ fontSize:12,color:"var(--gray)" }}>{u.email}</td>
                  <td><RolePill role={u.role}/></td>
                  <td style={{ fontSize:11,color:"var(--gray)",whiteSpace:"nowrap" }}>{u.lastLogin}</td>
                  <td>{u.twoFA?<span className="badge badge-success" style={{ gap:3 }}><ShieldCheck size={10}/> On</span>:<span className="badge badge-warning"><AlertTriangle size={10}/> Off</span>}</td>
                  <td>
                    <button onClick={()=>toggleStatus(u.id)} style={{ fontSize:11,fontWeight:700,padding:"2px 9px",background:u.status==="Active"?"#DCFCE7":"#F3F4F6",color:u.status==="Active"?"#166534":"#6B7280",border:"none",cursor:isSuperAdmin?"pointer":"default" }} disabled={!isSuperAdmin}>{u.status}</button>
                  </td>
                  {isSuperAdmin && (
                    <td>
                      <div style={{ display:"flex",gap:6 }}>
                        <button className="btn btn-ghost btn-sm" onClick={()=>setEditUser(u)} disabled={u.role==="Super Admin"} style={{ padding:"3px 9px",fontSize:11,opacity:u.role==="Super Admin"?.4:1 }}><Edit2 size={11}/></button>
                        <button onClick={()=>setDelUser(u)} disabled={u.role==="Super Admin"} style={{ background:"none",border:"1px solid #FCA5A5",color:"#DC2626",padding:"3px 9px",fontSize:11,cursor:u.role==="Super Admin"?"not-allowed":"pointer",opacity:u.role==="Super Admin"?.4:1,display:"flex",alignItems:"center",gap:3 }}><Trash2 size={11}/></button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab===1 && (
        <div className="card" style={{ overflowX:"auto" }}>
          <table>
            <thead>
              <tr>
                <th style={{ minWidth:160 }}>Module</th>
                {["Super Admin","Admin","Accounts","Procurement","Stock Mgr","Sales","Driver"].map(r=><th key={r} style={{ textAlign:"center",minWidth:72 }}>{r}</th>)}
              </tr>
            </thead>
            <tbody>
              {PERMS.map(p=>(
                <tr key={p.module}>
                  <td style={{ fontSize:12,fontWeight:600,color:"#001C5C" }}>{p.module}</td>
                  <td><PCeil val={p.superAdmin}/></td>
                  <td><PCeil val={p.admin}/></td>
                  <td><PCeil val={p.accounts}/></td>
                  <td><PCeil val={p.procurement}/></td>
                  <td><PCeil val={p.stock}/></td>
                  <td><PCeil val={p.sales}/></td>
                  <td><PCeil val={p.driver}/></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ padding:"10px 14px",borderTop:"1px solid var(--border)",fontSize:12,color:"var(--gray)",display:"flex",gap:20 }}>
            <span><span style={{ color:"#166534",fontWeight:800 }}>✓</span> Full access</span>
            <span><span style={{ color:"#D1D5DB",fontWeight:800 }}>–</span> No access</span>
          </div>
        </div>
      )}

      {tab===2 && (
        <div className="card" style={{ overflowX:"auto" }}>
          <div style={{ padding:"12px 16px",borderBottom:"1px solid var(--border)",display:"flex",justifyContent:"space-between",alignItems:"center" }}>
            <span style={{ fontWeight:800,color:"#001C5C",fontSize:14 }}>Audit Log</span>
            <span style={{ fontSize:11,color:"var(--gray)" }}>Append-only · Cannot be edited</span>
          </div>
          <table>
            <thead><tr><th>Time</th><th>User</th><th>Role</th><th>Action</th><th>IP</th><th>Result</th></tr></thead>
            <tbody>
              {AUDIT.map((r,i)=>(
                <tr key={i}>
                  <td style={{ fontSize:11,color:"var(--gray)",fontFamily:"monospace",whiteSpace:"nowrap" }}>{r.time}</td>
                  <td style={{ fontSize:12,fontWeight:600 }}>{r.user}</td>
                  <td><RolePill role={r.role}/></td>
                  <td style={{ fontSize:12 }}>{r.action}</td>
                  <td style={{ fontSize:11,fontFamily:"monospace",color:"var(--gray)" }}>{r.ip}</td>
                  <td><span className={`badge ${r.result==="OK"?"badge-success":r.result==="Blocked"||r.result==="Denied"?"badge-danger":"badge-warning"}`}>{r.result}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add User Modal */}
      {showAdd && (
        <ModalWrap onClose={()=>setShowAdd(false)}>
          <div style={{ background:"#001C5C",padding:"18px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",borderRadius:"14px 14px 0 0" }}>
            <div style={{ color:"white",fontWeight:800,fontSize:16 }}>Add New User</div>
            <button onClick={()=>setShowAdd(false)} style={{ background:"none",border:"none",color:"rgba(255,255,255,.6)",cursor:"pointer",display:"flex" }}><X size={20}/></button>
          </div>
          <div style={{ padding:20 }}>
            <div style={{ padding:"10px 12px",background:"var(--amber-l)",border:"1px solid #D97706",marginBottom:16,fontSize:12,color:"#92400E" }}>
              New user will receive a welcome email with a temporary password and must change it on first login.
            </div>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12 }}>
              <div><label>First Name</label><input value={form.firstName} onChange={e=>setForm(f=>({...f,firstName:e.target.value}))} placeholder="John"/></div>
              <div><label>Last Name</label><input value={form.lastName} onChange={e=>setForm(f=>({...f,lastName:e.target.value}))} placeholder="Mugisha"/></div>
            </div>
            <div style={{ marginBottom:12 }}><label>Email Address</label><input type="email" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} placeholder="user@belacatrading.com"/></div>
            <div style={{ marginBottom:12 }}>
              <label>Assign Role</label>
              <select value={form.role} onChange={e=>setForm(f=>({...f,role:e.target.value}))}>
                {ROLES.filter(r=>r!=="Super Admin").map(r=><option key={r}>{r}</option>)}
              </select>
            </div>
            <div style={{ marginBottom:12 }}>
              <label>Temporary Password</label>
              <div style={{ position:"relative" }}>
                <input type={showPw?"text":"password"} value={form.password} onChange={e=>setForm(f=>({...f,password:e.target.value}))} placeholder="Min 8 chars, 1 number, 1 special" style={{ paddingRight:44 }}/>
                <button type="button" onClick={()=>setShowPw(!showPw)} style={{ position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:"var(--gray)",padding:0,display:"flex" }}>
                  {showPw?<EyeOff size={16}/>:<Eye size={16}/>}
                </button>
              </div>
            </div>
            <div style={{ marginBottom:20,display:"flex",alignItems:"center",gap:10 }}>
              <input type="checkbox" id="twofa" checked={form.twoFA} onChange={e=>setForm(f=>({...f,twoFA:e.target.checked}))} style={{ width:18,height:18 }}/>
              <label htmlFor="twofa" style={{ fontSize:13,fontWeight:600,textTransform:"none",letterSpacing:0,marginBottom:0,cursor:"pointer" }}>Require 2FA on first login</label>
            </div>
            <div style={{ display:"flex",gap:10 }}>
              <button className="btn btn-primary" style={{ flex:1,justifyContent:"center" }} onClick={addUser}>Create User</button>
              <button className="btn btn-ghost" style={{ flex:1,justifyContent:"center" }} onClick={()=>setShowAdd(false)}>Cancel</button>
            </div>
          </div>
        </ModalWrap>
      )}

      {/* Delete confirm */}
      {delUser && (
        <ModalWrap onClose={()=>setDelUser(null)}>
          <div style={{ padding:28,textAlign:"center" }}>
            <div style={{ fontSize:48,marginBottom:12 }}>⚠️</div>
            <h3 style={{ marginBottom:8,color:"#991B1B" }}>Delete User?</h3>
            <p style={{ color:"var(--gray)",marginBottom:20,fontSize:14 }}>Are you sure you want to delete <strong>{delUser.name}</strong>? This action is permanent and cannot be undone.</p>
            <div style={{ display:"flex",gap:10,justifyContent:"center" }}>
              <button className="btn btn-danger" style={{ flex:1,maxWidth:160,justifyContent:"center" }} onClick={()=>deleteUser(delUser.id)}>Yes, Delete</button>
              <button className="btn btn-ghost" style={{ flex:1,maxWidth:160,justifyContent:"center" }} onClick={()=>setDelUser(null)}>Cancel</button>
            </div>
          </div>
        </ModalWrap>
      )}

      {/* Edit Role Modal */}
      {editUser && (
        <ModalWrap onClose={()=>setEditUser(null)}>
          <div style={{ background:"#001C5C",padding:"18px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",borderRadius:"14px 14px 0 0" }}>
            <div style={{ color:"white",fontWeight:800,fontSize:16 }}>Edit User</div>
            <button onClick={()=>setEditUser(null)} style={{ background:"none",border:"none",color:"rgba(255,255,255,.6)",cursor:"pointer",display:"flex" }}><X size={20}/></button>
          </div>
          <div style={{ padding:20 }}>
            <div style={{ marginBottom:12 }}><label>Name</label><input defaultValue={editUser.name}/></div>
            <div style={{ marginBottom:12 }}><label>Email</label><input defaultValue={editUser.email}/></div>
            <div style={{ marginBottom:12 }}>
              <label>Role</label>
              <select defaultValue={editUser.role} onChange={e=>setUsers(u=>u.map(x=>x.id===editUser.id?{...x,role:e.target.value}:x))}>
                {ROLES.filter(r=>r!=="Super Admin").map(r=><option key={r}>{r}</option>)}
              </select>
            </div>
            <div style={{ display:"flex",gap:10,marginTop:20 }}>
              <button className="btn btn-primary" style={{ flex:1,justifyContent:"center" }} onClick={()=>setEditUser(null)}>Save Changes</button>
              <button className="btn btn-ghost" style={{ flex:1,justifyContent:"center" }} onClick={()=>setEditUser(null)}>Cancel</button>
            </div>
          </div>
        </ModalWrap>
      )}
    </div>
  );
}
