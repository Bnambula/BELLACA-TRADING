"use client";
import { useState } from "react";
import { Plus, Star, X } from "lucide-react";

const INIT = [
  { id:1, name:"Manafwa Farms Co-op",   country:"UG", loc:"Manafwa District",    items:"Avocado (Hass)",    terms:"Cash on delivery", rating:5, balance:"UGX 0",      status:"Active"  },
  { id:2, name:"Sironko Highland Co-op",country:"UG", loc:"Sironko District",    items:"Beans, Sweet Potato",terms:"7-day credit",    rating:4, balance:"UGX 0",      status:"Active"  },
  { id:3, name:"Busia Fish Landing",    country:"UG", loc:"Busia, Lake Victoria",items:"Dried Fish, Tilapia",terms:"Cash on delivery",rating:4, balance:"UGX 0",      status:"Active"  },
  { id:4, name:"Busia Poultry Farms",   country:"UG", loc:"Busia District",      items:"Eggs (30-tray)",    terms:"Weekly account",  rating:3, balance:"UGX 315,000", status:"Overdue" },
  { id:5, name:"Meru Highland Growers", country:"KE", loc:"Meru County",         items:"Irish Potatoes",    terms:"KES cash",        rating:4, balance:"KES 0",       status:"Active"  },
  { id:6, name:"Kipkaren Valley Farm",  country:"KE", loc:"Eldoret, Uasin Gishu",items:"Onions",            terms:"KES cash",        rating:5, balance:"KES 0",       status:"Active"  },
  { id:7, name:"Kiambu Growers Assoc.", country:"KE", loc:"Kiambu County",       items:"Tomatoes",          terms:"KES cash",        rating:4, balance:"KES 0",       status:"Active"  },
];

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState(INIT);
  const [modal, setModal] = useState(false);
  const [form, setForm]   = useState({ name:"", country:"UG", loc:"", items:"", terms:"Cash on delivery", rating:4 });

  function add() {
    setSuppliers(s=>[...s,{id:Date.now(),...form,balance:"UGX 0",status:"Active"}]);
    setForm({ name:"",country:"UG",loc:"",items:"",terms:"Cash on delivery",rating:4 });
    setModal(false);
  }

  return (
    <div className="fade-in">
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:18,flexWrap:"wrap",gap:10 }}>
        <div><h1 style={{ fontSize:20,fontWeight:900,color:"#001C5C",marginBottom:2 }}>Suppliers</h1><p style={{ fontSize:13,color:"var(--gray)" }}>{suppliers.length} registered · Uganda & Kenya</p></div>
        <button className="btn btn-primary btn-sm" onClick={()=>setModal(true)}><Plus size={14}/> Add Supplier</button>
      </div>
      <div className="card" style={{ overflowX:"auto" }}>
        <table>
          <thead><tr><th>Supplier</th><th>Country</th><th>Location</th><th>Commodities</th><th>Terms</th><th>Rating</th><th>Balance</th><th>Status</th></tr></thead>
          <tbody>
            {suppliers.map(s=>(
              <tr key={s.id}>
                <td style={{ fontWeight:700,fontSize:13 }}>{s.name}</td>
                <td><span style={{ fontSize:10,fontWeight:800,background:"#DBEAFE",color:"#001C5C",padding:"2px 7px" }}>{s.country==="UG"?"🇺🇬":"🇰🇪"} {s.country}</span></td>
                <td style={{ fontSize:12,color:"var(--gray)" }}>{s.loc}</td>
                <td style={{ fontSize:12 }}>{s.items}</td>
                <td style={{ fontSize:12,color:"var(--gray)" }}>{s.terms}</td>
                <td><span style={{ display:"flex",gap:1 }}>{Array.from({length:5}).map((_,i)=><Star key={i} size={12} fill={i<s.rating?"#F59E0B":"none"} color={i<s.rating?"#F59E0B":"#D1D5DB"}/>)}</span></td>
                <td style={{ fontSize:12,fontWeight:s.status==="Overdue"?800:500,color:s.status==="Overdue"?"#DC2626":"#001C5C" }}>{s.balance}</td>
                <td><span className={`badge ${s.status==="Active"?"badge-success":s.status==="Overdue"?"badge-danger":"badge-gray"}`}>{s.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modal && (
        <div style={{ position:"fixed",inset:0,background:"rgba(0,28,92,.55)",zIndex:200,display:"flex",alignItems:"flex-end",justifyContent:"center",backdropFilter:"blur(3px)" }} onClick={e=>{if(e.target===e.currentTarget)setModal(false);}}>
          <div className="fade-up" style={{ background:"white",width:"100%",maxWidth:520,maxHeight:"90vh",overflowY:"auto",borderRadius:"14px 14px 0 0" }}>
            <div style={{ background:"#001C5C",padding:"18px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",borderRadius:"14px 14px 0 0" }}>
              <div style={{ color:"white",fontWeight:800,fontSize:16 }}>Add Supplier</div>
              <button onClick={()=>setModal(false)} style={{ background:"none",border:"none",color:"rgba(255,255,255,.6)",cursor:"pointer",display:"flex" }}><X size={20}/></button>
            </div>
            <div style={{ padding:20 }}>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12 }}>
                <div style={{ gridColumn:"1/-1" }}><label>Supplier Name</label><input value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="e.g. Manafwa Farms"/></div>
                <div><label>Country</label><select value={form.country} onChange={e=>setForm(f=>({...f,country:e.target.value}))}><option value="UG">Uganda 🇺🇬</option><option value="KE">Kenya 🇰🇪</option></select></div>
                <div><label>Location</label><input value={form.loc} onChange={e=>setForm(f=>({...f,loc:e.target.value}))} placeholder="District/County"/></div>
                <div style={{ gridColumn:"1/-1" }}><label>Commodities Supplied</label><input value={form.items} onChange={e=>setForm(f=>({...f,items:e.target.value}))} placeholder="e.g. Avocado, Beans"/></div>
                <div><label>Payment Terms</label><select value={form.terms} onChange={e=>setForm(f=>({...f,terms:e.target.value}))}><option>Cash on delivery</option><option>7-day credit</option><option>Weekly account</option><option>KES cash</option></select></div>
                <div><label>Rating (1–5)</label><input type="number" min={1} max={5} value={form.rating} onChange={e=>setForm(f=>({...f,rating:Number(e.target.value)}))} /></div>
              </div>
              <div style={{ display:"flex",gap:10 }}>
                <button className="btn btn-primary" style={{ flex:1,justifyContent:"center" }} onClick={add}>Add Supplier</button>
                <button className="btn btn-ghost" style={{ flex:1,justifyContent:"center" }} onClick={()=>setModal(false)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
