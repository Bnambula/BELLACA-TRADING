"use client";
import { useState } from "react";
import { Plus, Search, Download, Eye, X } from "lucide-react";

const ORDERS = [
  { id:"#ORD-041", date:"27 May", commodity:"Avocado (Hass)", qty:"300 kg",   route:"UG→KE", supplier:"Manafwa Farms",     buyer:"Kitale Wholesale", value:"432,000", status:"Delivered",  cert:"PH-2026-041" },
  { id:"#ORD-042", date:"26 May", commodity:"Dry Beans",      qty:"400 kg",   route:"UG→KE", supplier:"Sironko Co-op",     buyer:"Eldoret Market",   value:"540,000", status:"In Transit", cert:"PH-2026-042" },
  { id:"#ORD-043", date:"26 May", commodity:"Irish Potatoes", qty:"400 kg",   route:"KE→UG", supplier:"Meru Growers",      buyer:"Mbale Market",     value:"720,000", status:"At Border",  cert:"PH-2026-043" },
  { id:"#ORD-044", date:"25 May", commodity:"Onions",         qty:"200 kg",   route:"KE→UG", supplier:"Kipkaren Farm",     buyer:"Tororo Market",    value:"440,000", status:"Pending",    cert:"—" },
  { id:"#ORD-040", date:"24 May", commodity:"Dried Fish",     qty:"80 kg",    route:"UG→KE", supplier:"Busia Fish Landing",buyer:"Nairobi Gikomba",  value:"403,200", status:"Delivered",  cert:"PH-2026-040" },
  { id:"#ORD-039", date:"22 May", commodity:"Eggs",           qty:"50 trays", route:"UG→KE", supplier:"Busia Poultry",     buyer:"Kitale Retail",    value:"378,000", status:"Delivered",  cert:"PH-2026-039" },
  { id:"#ORD-038", date:"20 May", commodity:"Plantain",       qty:"500 kg",   route:"UG→KE", supplier:"Mbale Co-op",       buyer:"Eldoret Market",   value:"324,000", status:"Delivered",  cert:"PH-2026-038" },
  { id:"#ORD-037", date:"19 May", commodity:"Tomatoes",       qty:"300 kg",   route:"KE→UG", supplier:"Kiambu Growers",   buyer:"Mbale Central",    value:"750,000", status:"Delivered",  cert:"PH-2026-037" },
  { id:"#ORD-035", date:"15 May", commodity:"Dry Beans",      qty:"350 kg",   route:"UG→KE", supplier:"Sironko Co-op",     buyer:"Kitale Wholesale", value:"472,500", status:"Cancelled",  cert:"—" },
];
const STATUS_BADGE: Record<string,string> = { "Delivered":"badge-success","In Transit":"badge-warning","At Border":"badge-info","Pending":"badge-gray","Cancelled":"badge-danger" };
const TABS = ["All","Pending","In Transit","At Border","Delivered","Cancelled"];

export default function OrdersPage() {
  const [tab, setTab]     = useState("All");
  const [q, setQ]         = useState("");
  const [modal, setModal] = useState(false);
  const [view, setView]   = useState<typeof ORDERS[0]|null>(null);

  const filtered = ORDERS.filter(o => {
    const matchTab = tab==="All" || o.status===tab;
    const qL = q.toLowerCase();
    const matchQ = !qL || o.id.toLowerCase().includes(qL) || o.commodity.toLowerCase().includes(qL) || o.buyer.toLowerCase().includes(qL);
    return matchTab && matchQ;
  });

  const ModalWrap = ({ children, onClose }: { children: React.ReactNode; onClose: ()=>void }) => (
    <div style={{ position:"fixed",inset:0,background:"rgba(0,28,92,.55)",zIndex:200,display:"flex",alignItems:"flex-end",justifyContent:"center",backdropFilter:"blur(3px)" }} onClick={e=>{ if(e.target===e.currentTarget) onClose(); }}>
      <div className="fade-up" style={{ background:"white",width:"100%",maxWidth:540,maxHeight:"90vh",overflowY:"auto",borderRadius:"14px 14px 0 0" }}>{children}</div>
    </div>
  );

  return (
    <div className="fade-in">
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:18,flexWrap:"wrap",gap:10 }}>
        <div>
          <h1 style={{ fontSize:20,fontWeight:900,color:"#001C5C",marginBottom:2 }}>Orders</h1>
          <p style={{ fontSize:13,color:"var(--gray)" }}>{ORDERS.length} total · {ORDERS.filter(o=>o.status==="In Transit").length} in transit</p>
        </div>
        <div style={{ display:"flex",gap:8 }}>
          <button className="btn btn-ghost btn-sm"><Download size={13}/> Export</button>
          <button className="btn btn-primary btn-sm" onClick={()=>setModal(true)}><Plus size={14}/> New Order</button>
        </div>
      </div>

      <div style={{ display:"flex",gap:0,marginBottom:14,borderBottom:"2px solid var(--border)",overflowX:"auto",WebkitOverflowScrolling:"touch" }}>
        {TABS.map(t=>(
          <button key={t} onClick={()=>setTab(t)} style={{ padding:"8px 12px",fontSize:12,fontWeight:t===tab?800:500,background:"none",border:"none",cursor:"pointer",color:t===tab?"#003DA5":"var(--gray)",borderBottom:t===tab?"3px solid #003DA5":"3px solid transparent",marginBottom:-2,whiteSpace:"nowrap",transition:"all .15s",flexShrink:0 }}>
            {t}{t!=="All"&&<span style={{ marginLeft:4,fontSize:10,background:t===tab?"#003DA5":"var(--border)",color:t===tab?"white":"var(--gray)",padding:"1px 5px",borderRadius:10,fontWeight:800 }}>{ORDERS.filter(o=>o.status===t).length}</span>}
          </button>
        ))}
      </div>

      <div style={{ position:"relative",maxWidth:320,marginBottom:14 }}>
        <Search size={14} style={{ position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:"var(--gray)" }}/>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search orders…" style={{ paddingLeft:34,fontSize:13,height:36 }}/>
      </div>

      <div className="card" style={{ overflowX:"auto" }}>
        <table>
          <thead><tr><th>Order</th><th>Date</th><th>Commodity</th><th>Qty</th><th>Route</th><th>Buyer</th><th>Value (UGX)</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {filtered.length===0 && <tr><td colSpan={9} style={{ textAlign:"center",padding:40,color:"var(--gray)",fontStyle:"italic" }}>No orders match filter.</td></tr>}
            {filtered.map(o=>(
              <tr key={o.id}>
                <td style={{ fontWeight:800,color:"#003DA5",fontSize:12,whiteSpace:"nowrap" }}>{o.id}</td>
                <td style={{ fontSize:11,color:"var(--gray)" }}>{o.date}</td>
                <td style={{ fontSize:12,fontWeight:600 }}>{o.commodity}</td>
                <td style={{ fontSize:12 }}>{o.qty}</td>
                <td><span style={{ fontSize:10,fontWeight:800,background:"#DBEAFE",color:"#001C5C",padding:"2px 7px" }}>{o.route}</span></td>
                <td style={{ fontSize:12 }}>{o.buyer}</td>
                <td style={{ fontSize:12,fontWeight:600,textAlign:"right",whiteSpace:"nowrap" }}>{o.value}</td>
                <td><span className={`badge ${STATUS_BADGE[o.status]||"badge-gray"}`}>{o.status}</span></td>
                <td><button className="btn btn-ghost btn-sm" onClick={()=>setView(o)} style={{ padding:"3px 9px",fontSize:11 }}><Eye size={12}/></button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ padding:"10px 14px",borderTop:"1px solid var(--border)",fontSize:12,color:"var(--gray)" }}>Showing {filtered.length} of {ORDERS.length}</div>
      </div>

      {view && (
        <ModalWrap onClose={()=>setView(null)}>
          <div style={{ background:"#001C5C",padding:"18px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",borderRadius:"14px 14px 0 0" }}>
            <div><div style={{ color:"white",fontWeight:800,fontSize:16 }}>{view.id}</div><div style={{ color:"rgba(255,255,255,.5)",fontSize:12 }}>{view.commodity}</div></div>
            <button onClick={()=>setView(null)} style={{ background:"none",border:"none",color:"rgba(255,255,255,.6)",cursor:"pointer",display:"flex" }}><X size={20}/></button>
          </div>
          <div style={{ padding:20 }}>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16 }}>
              {[["Date",view.date],["Qty",view.qty],["Route",view.route],["Supplier",view.supplier],["Buyer",view.buyer],["Value","UGX "+view.value],["Cert",view.cert],["Status",view.status]].map(([k,v])=>(
                <div key={k} style={{ padding:"10px 12px",background:"var(--off)" }}>
                  <div style={{ fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".06em",color:"var(--gray)",marginBottom:2 }}>{k}</div>
                  <div style={{ fontSize:13,fontWeight:700,color:"#001C5C" }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ display:"flex",gap:10 }}>
              <button className="btn btn-ghost btn-sm" onClick={()=>setView(null)} style={{ flex:1,justifyContent:"center" }}>Close</button>
              <button className="btn btn-primary btn-sm" style={{ flex:1,justifyContent:"center" }}>Print Waybill</button>
            </div>
          </div>
        </ModalWrap>
      )}

      {modal && (
        <ModalWrap onClose={()=>setModal(false)}>
          <div style={{ background:"#001C5C",padding:"18px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",borderRadius:"14px 14px 0 0" }}>
            <div style={{ color:"white",fontWeight:800,fontSize:16 }}>New Order</div>
            <button onClick={()=>setModal(false)} style={{ background:"none",border:"none",color:"rgba(255,255,255,.6)",cursor:"pointer",display:"flex" }}><X size={20}/></button>
          </div>
          <div style={{ padding:20 }}>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12 }}>
              <div><label>Route</label><select><option>Uganda → Kenya</option><option>Kenya → Uganda</option></select></div>
              <div><label>Commodity</label><select><option>Avocado (Hass)</option><option>Dry Beans</option><option>Plantain</option><option>Eggs</option><option>Dried Fish</option><option>Irish Potatoes</option><option>Onions</option><option>Tomatoes</option></select></div>
              <div><label>Quantity (kg)</label><input type="number" placeholder="e.g. 300"/></div>
              <div><label>Unit Cost (UGX)</label><input type="number" placeholder="e.g. 500"/></div>
              <div><label>Supplier</label><select><option>Manafwa Farms</option><option>Sironko Co-op</option><option>Busia Fish Landing</option><option>Busia Poultry</option><option>Meru Growers</option><option>Kipkaren Farm</option></select></div>
              <div><label>Buyer / Market</label><input type="text" placeholder="e.g. Kitale Wholesale"/></div>
              <div><label>Departure Date</label><input type="date"/></div>
              <div><label>Cert No.</label><input type="text" placeholder="PH-2026-XXX"/></div>
            </div>
            <div style={{ marginBottom:14 }}><label>Notes</label><textarea rows={3} placeholder="Special handling…"/></div>
            <div style={{ display:"flex",gap:10 }}>
              <button className="btn btn-primary" style={{ flex:1,justifyContent:"center" }}>Create Order</button>
              <button className="btn btn-ghost" onClick={()=>setModal(false)} style={{ flex:1,justifyContent:"center" }}>Cancel</button>
            </div>
          </div>
        </ModalWrap>
      )}
    </div>
  );
}
