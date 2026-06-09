"use client";
import { useState } from "react";
import { AlertTriangle, Plus, RefreshCw } from "lucide-react";

const STOCK = [
  { name:"Avocado (Hass)", icon:"🥑", inStock:240, reserved:120, unitCostFIFO:510,  unitCostLIFO:495,  method:"FIFO", shelf:7,   status:"Good",    pct:72 },
  { name:"Dry Beans",      icon:"🫘", inStock:380, reserved:200, unitCostFIFO:1020, unitCostLIFO:980,  method:"LIFO", shelf:180, status:"Good",    pct:85 },
  { name:"Plantain",       icon:"🍌", inStock:150, reserved:0,   unitCostFIFO:310,  unitCostLIFO:310,  method:"FIFO", shelf:3,   status:"Expiring",pct:35 },
  { name:"Eggs",           icon:"🥚", inStock:30,  reserved:10,  unitCostFIFO:10800,unitCostLIFO:10500,method:"FIFO", shelf:14,  status:"Good",    pct:60 },
  { name:"Dried Fish",     icon:"🐟", inStock:95,  reserved:40,  unitCostFIFO:5100, unitCostLIFO:4900, method:"LIFO", shelf:90,  status:"Good",    pct:68 },
  { name:"Irish Potatoes", icon:"🥔", inStock:320, reserved:0,   unitCostFIFO:820,  unitCostLIFO:810,  method:"FIFO", shelf:30,  status:"Good",    pct:80 },
  { name:"Onions",         icon:"🧅", inStock:42,  reserved:0,   unitCostFIFO:875,  unitCostLIFO:860,  method:"LIFO", shelf:60,  status:"Reorder", pct:18 },
  { name:"Tomatoes",       icon:"🍅", inStock:0,   reserved:0,   unitCostFIFO:0,    unitCostLIFO:0,    method:"FIFO", shelf:5,   status:"Out",     pct:0  },
];

const FIFO_LEDGER = [
  { batch:"B-019", dateIn:"20 May", qty:"100 kg", buy:"UGX 480/kg", dateOut:"22 May", qtyOut:"100 kg", sell:"KES 95 → UGX 2,736", profit:"+2,256", s:"Cleared" },
  { batch:"B-021", dateIn:"23 May", qty:"150 kg", buy:"UGX 510/kg", dateOut:"25 May", qtyOut:"80 kg",  sell:"KES 100 → UGX 2,880",profit:"+2,370", s:"Partial"  },
  { batch:"B-021", dateIn:"23 May", qty:"—",      buy:"UGX 510/kg", dateOut:"In stock",qtyOut:"70 kg", sell:"—",                  profit:"—",      s:"In Stock" },
  { batch:"B-024", dateIn:"26 May", qty:"170 kg", buy:"UGX 500/kg", dateOut:"—",      qtyOut:"—",      sell:"—",                  profit:"—",      s:"In Stock" },
];
const LIFO_LEDGER = [
  { batch:"B-014", dateIn:"10 May", qty:"200 kg", buy:"UGX 980/kg",  used:"B-018 first", rem:"200 kg", profit:"UGX +980/kg", s:"On Hand" },
  { batch:"B-018", dateIn:"18 May", qty:"180 kg", buy:"UGX 1,010/kg",used:"Assigned first",rem:"0 kg", profit:"Cleared",     s:"Cleared" },
  { batch:"B-022", dateIn:"24 May", qty:"180 kg", buy:"UGX 1,020/kg",used:"Next",        rem:"180 kg", profit:"—",           s:"In Stock"},
];

const STATUS_COLOR: Record<string,string> = { Good:"#166534",Expiring:"#D97706",Reorder:"#DC2626",Out:"#DC2626" };
const STATUS_BG:    Record<string,string> = { Good:"#DCFCE7", Expiring:"#FEF3C7",Reorder:"#FEE2E2",Out:"#FEE2E2" };

export default function InventoryPage() {
  const [tab, setTab] = useState(0);
  const alerts = STOCK.filter(s=>s.status!=="Good");

  return (
    <div className="fade-in">
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:18,flexWrap:"wrap",gap:10 }}>
        <div>
          <h1 style={{ fontSize:20,fontWeight:900,color:"#001C5C",marginBottom:2 }}>Inventory</h1>
          <p style={{ fontSize:13,color:"var(--gray)" }}>FIFO for perishables · LIFO for dry goods</p>
        </div>
        <div style={{ display:"flex",gap:8 }}>
          <button className="btn btn-ghost btn-sm"><RefreshCw size={13}/></button>
          <button className="btn btn-primary btn-sm"><Plus size={14}/> Add Stock</button>
        </div>
      </div>

      {alerts.map(s=>(
        <div key={s.name} style={{ display:"flex",gap:10,alignItems:"center",background:STATUS_BG[s.status],border:`1px solid ${STATUS_COLOR[s.status]}`,padding:"10px 14px",marginBottom:8,fontSize:13,color:STATUS_COLOR[s.status] }}>
          <AlertTriangle size={14} style={{ flexShrink:0 }}/><strong>{s.icon} {s.name}:</strong>&nbsp;
          {s.status==="Expiring"?`Expiring in ${s.shelf} days — move now`:s.status==="Reorder"?`Only ${s.pct}% left — reorder now`:"Out of stock — source immediately"}
        </div>
      ))}

      <div style={{ display:"flex",gap:0,marginBottom:16,borderBottom:"2px solid var(--border)",overflowX:"auto" }}>
        {["Stock Levels","FIFO Ledger","LIFO Ledger","Valuation"].map((t,i)=>(
          <button key={t} onClick={()=>setTab(i)} style={{ padding:"8px 14px",fontSize:12,fontWeight:tab===i?800:500,background:"none",border:"none",cursor:"pointer",color:tab===i?"#003DA5":"var(--gray)",borderBottom:tab===i?"3px solid #003DA5":"3px solid transparent",marginBottom:-2,whiteSpace:"nowrap",transition:"all .15s",flexShrink:0 }}>{t}</button>
        ))}
      </div>

      {tab===0 && (
        <div className="card" style={{ overflowX:"auto" }}>
          <table>
            <thead><tr><th>Commodity</th><th>In Stock</th><th>Reserved</th><th>Available</th><th>FIFO Cost</th><th>LIFO Cost</th><th>Total Value</th><th>Method</th><th>Shelf</th><th>Status</th></tr></thead>
            <tbody>
              {STOCK.map(s=>{
                const avail = s.inStock - s.reserved;
                return (
                  <tr key={s.name}>
                    <td style={{ fontWeight:700,fontSize:13,display:"flex",alignItems:"center",gap:6 }}><span style={{ fontSize:18 }}>{s.icon}</span>{s.name}</td>
                    <td style={{ fontSize:12,fontWeight:600 }}>{s.inStock>0?`${s.inStock} kg`:"—"}</td>
                    <td style={{ fontSize:12,color:"var(--gray)" }}>{s.reserved>0?`${s.reserved} kg`:"—"}</td>
                    <td style={{ fontSize:12,fontWeight:700,color:avail<50&&avail>0?"#D97706":"#001C5C" }}>{avail>0?`${avail} kg`:"0"}</td>
                    <td style={{ fontSize:12 }}>{s.unitCostFIFO>0?`UGX ${s.unitCostFIFO.toLocaleString()}`:"—"}</td>
                    <td style={{ fontSize:12 }}>{s.unitCostLIFO>0?`UGX ${s.unitCostLIFO.toLocaleString()}`:"—"}</td>
                    <td style={{ fontSize:12,fontWeight:600 }}>{s.inStock>0?`UGX ${(s.inStock*s.unitCostFIFO).toLocaleString()}`:"0"}</td>
                    <td><span className={s.method==="FIFO"?"badge badge-info":"badge badge-warning"}>{s.method}</span></td>
                    <td style={{ fontSize:11,color:s.shelf<=5?"#DC2626":"var(--gray)",fontWeight:s.shelf<=5?800:400 }}>{s.shelf<=5?`⚠ ${s.shelf}d`:`${s.shelf}d`}</td>
                    <td>
                      <span style={{ fontSize:11,fontWeight:700,padding:"2px 8px",background:STATUS_BG[s.status],color:STATUS_COLOR[s.status] }}>{s.status}</span>
                      <div style={{ height:3,width:60,background:"var(--border)",marginTop:4 }}>
                        <div style={{ width:`${s.pct}%`,height:"100%",background:s.pct<25?"#DC2626":s.pct<50?"#D97706":"#166534" }}/>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {tab===1 && (
        <div>
          <div style={{ padding:"12px 14px",background:"#E0F2FE",border:"1px solid #0369A1",marginBottom:14,fontSize:13,color:"#0C4A6E" }}>
            <strong>FIFO (First In First Out):</strong> Oldest batch assigned first. Required for perishables — avocado, eggs, tomatoes, plantain. Reduces spoilage losses and ensures accurate profit per batch.
          </div>
          <div className="card" style={{ overflowX:"auto" }}>
            <div style={{ padding:"12px 16px",borderBottom:"1px solid var(--border)",fontWeight:800,color:"#001C5C",fontSize:14 }}>FIFO Ledger — Avocado (Hass) · May 2026</div>
            <table>
              <thead><tr><th>Batch</th><th>Date In</th><th>Qty</th><th>Buy Cost</th><th>Date Out</th><th>Qty Out</th><th>Sell Rate</th><th>Profit/kg</th><th>Status</th></tr></thead>
              <tbody>
                {FIFO_LEDGER.map((r,i)=>(
                  <tr key={i}>
                    <td style={{ fontWeight:800,color:"#003DA5",fontFamily:"monospace",fontSize:12 }}>{r.batch}</td>
                    <td style={{ fontSize:12,color:"var(--gray)" }}>{r.dateIn}</td>
                    <td style={{ fontSize:12 }}>{r.qty}</td>
                    <td style={{ fontSize:12 }}>{r.buy}</td>
                    <td style={{ fontSize:12,color:"var(--gray)" }}>{r.dateOut}</td>
                    <td style={{ fontSize:12 }}>{r.qtyOut}</td>
                    <td style={{ fontSize:11,color:"var(--gray)" }}>{r.sell}</td>
                    <td>{r.profit!=="—"?<span className="badge badge-success">{r.profit}</span>:<span className="badge badge-gray">—</span>}</td>
                    <td><span className={`badge ${r.s==="Cleared"?"badge-success":r.s==="In Stock"?"badge-info":"badge-warning"}`}>{r.s}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab===2 && (
        <div>
          <div style={{ padding:"12px 14px",background:"var(--amber-l)",border:"1px solid #D97706",marginBottom:14,fontSize:13,color:"#92400E" }}>
            <strong>LIFO (Last In First Out):</strong> Most recent batch used first. Best for non-perishable dry goods — beans, onions, dried fish — where latest price reflects current replacement cost.
          </div>
          <div className="card" style={{ overflowX:"auto" }}>
            <div style={{ padding:"12px 16px",borderBottom:"1px solid var(--border)",fontWeight:800,color:"#001C5C",fontSize:14 }}>LIFO Ledger — Dry Beans · May 2026</div>
            <table>
              <thead><tr><th>Batch</th><th>Date In</th><th>Qty</th><th>Buy Cost</th><th>LIFO Assignment</th><th>Remaining</th><th>Profit</th><th>Status</th></tr></thead>
              <tbody>
                {LIFO_LEDGER.map((r,i)=>(
                  <tr key={i}>
                    <td style={{ fontWeight:800,color:"#003DA5",fontFamily:"monospace",fontSize:12 }}>{r.batch}</td>
                    <td style={{ fontSize:12,color:"var(--gray)" }}>{r.dateIn}</td>
                    <td style={{ fontSize:12 }}>{r.qty}</td>
                    <td style={{ fontSize:12 }}>{r.buy}</td>
                    <td style={{ fontSize:12,color:"var(--gray)" }}>{r.used}</td>
                    <td style={{ fontSize:12,fontWeight:600 }}>{r.rem}</td>
                    <td>{r.profit.startsWith("UGX")?<span className="badge badge-success">{r.profit}</span>:<span className="badge badge-gray">{r.profit}</span>}</td>
                    <td><span className={`badge ${r.s==="Cleared"?"badge-success":r.s==="In Stock"?"badge-info":"badge-warning"}`}>{r.s}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab===3 && (
        <div className="card" style={{ overflowX:"auto" }}>
          <div style={{ padding:"12px 16px",borderBottom:"1px solid var(--border)",fontWeight:800,color:"#001C5C",fontSize:14 }}>Inventory Valuation — FIFO vs LIFO</div>
          <table>
            <thead><tr><th>Commodity</th><th>FIFO Value (UGX)</th><th>LIFO Value (UGX)</th><th>Difference</th><th>Note</th><th>Method</th></tr></thead>
            <tbody>
              {[["🥑 Avocado","122,400","118,800","-3,600","Perishable — FIFO mandatory","FIFO"],["🫘 Dry Beans","387,600","374,600","-13,000","LIFO reduces taxable profit","LIFO"],["🥚 Eggs","324,000","315,000","-9,000","FIFO for freshness tracking","FIFO"],["🐟 Dried Fish","484,500","465,500","-19,000","LIFO tracks cost inflation","LIFO"],["🥔 Irish Potatoes","262,400","257,200","-5,200","FIFO for freshness","FIFO"],["🧅 Onions","36,750","35,520","-1,230","LIFO for dry goods","LIFO"]].map(([c,fv,lv,diff,note,m])=>(
                <tr key={c}>
                  <td style={{ fontWeight:700,fontSize:13 }}>{c}</td>
                  <td style={{ fontSize:12,fontWeight:600 }}>{fv}</td>
                  <td style={{ fontSize:12,fontWeight:600 }}>{lv}</td>
                  <td style={{ fontSize:12,color:"#D97706",fontWeight:700 }}>{diff}</td>
                  <td style={{ fontSize:11,color:"var(--gray)" }}>{note}</td>
                  <td><span className={`badge ${m==="FIFO"?"badge-info":"badge-warning"}`}>{m}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ padding:"12px 16px",borderTop:"1px solid var(--border)",background:"var(--off)",fontSize:12,color:"var(--gray)" }}>
            Total FIFO: <strong style={{ color:"#001C5C" }}>UGX 1,617,650</strong> &nbsp;|&nbsp; Total LIFO: <strong style={{ color:"#001C5C" }}>UGX 1,566,620</strong> &nbsp;|&nbsp; <span style={{ color:"#D97706",fontWeight:700 }}>Diff: UGX 51,030</span>
          </div>
        </div>
      )}
    </div>
  );
}
