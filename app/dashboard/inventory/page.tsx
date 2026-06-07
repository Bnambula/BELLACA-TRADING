"use client";
import { useState } from "react";
import { AlertTriangle, TrendingDown, Plus, RefreshCw } from "lucide-react";

const stock = [
  { name:"Avocado (Hass)", icon:"🥑", inStock:240, reserved:120, unitCost:510, method:"FIFO", shelfDays:7,  status:"Good",    pct:72 },
  { name:"Dry Beans",      icon:"🫘", inStock:380, reserved:200, unitCost:1020,method:"LIFO", shelfDays:180,status:"Good",    pct:85 },
  { name:"Plantain/Matoke",icon:"🍌", inStock:150, reserved:0,   unitCost:310, method:"FIFO", shelfDays:3,  status:"Expiring",pct:35 },
  { name:"Eggs",           icon:"🥚", inStock:30,  reserved:10,  unitCost:10800,method:"FIFO",shelfDays:14, status:"Good",    pct:60 },
  { name:"Dried Fish",     icon:"🐟", inStock:95,  reserved:40,  unitCost:5100, method:"LIFO",shelfDays:90, status:"Good",    pct:68 },
  { name:"Irish Potatoes", icon:"🥔", inStock:320, reserved:0,   unitCost:820,  method:"FIFO",shelfDays:30, status:"Good",    pct:80 },
  { name:"Onions",         icon:"🧅", inStock:42,  reserved:0,   unitCost:875,  method:"LIFO",shelfDays:60, status:"Reorder", pct:18 },
  { name:"Tomatoes",       icon:"🍅", inStock:0,   reserved:0,   unitCost:0,    method:"FIFO",shelfDays:5,  status:"Out",     pct:0  },
];

const fifoLedger = [
  { batch:"B-019", dateIn:"20 May", qty:"100 kg", buyCost:"UGX 480/kg", dateOut:"22 May", qtyOut:"100 kg", sellRate:"KES 95→UGX 2,736", profitPct:"2,256", status:"Cleared" },
  { batch:"B-021", dateIn:"23 May", qty:"150 kg", buyCost:"UGX 510/kg", dateOut:"25 May", qtyOut:"80 kg",  sellRate:"KES 100→UGX 2,880",profitPct:"2,370", status:"Part-cleared" },
  { batch:"B-021", dateIn:"23 May", qty:"—",      buyCost:"UGX 510/kg", dateOut:"In stock",qtyOut:"70 kg", sellRate:"—",                profitPct:"—",     status:"In Stock" },
  { batch:"B-024", dateIn:"26 May", qty:"170 kg", buyCost:"UGX 500/kg", dateOut:"—",      qtyOut:"—",      sellRate:"—",                profitPct:"—",     status:"In Stock" },
];

const lifoLedger = [
  { batch:"B-014", dateIn:"10 May", qty:"200 kg", buyCost:"UGX 980/kg", lifoUsed:"B-018 assigned first", remaining:"200 kg", profit:"UGX +980/kg", status:"On Hand" },
  { batch:"B-018", dateIn:"18 May", qty:"180 kg", buyCost:"UGX 1,010/kg",lifoUsed:"Assigned first",       remaining:"0 kg",  profit:"Cleared",     status:"Cleared" },
  { batch:"B-022", dateIn:"24 May", qty:"180 kg", buyCost:"UGX 1,020/kg",lifoUsed:"Next to assign",        remaining:"180 kg",profit:"—",           status:"In Stock" },
];

const statusColor: Record<string, string> = { Good:"var(--green)", Expiring:"var(--amber)", Reorder:"#C0392B", Out:"#C0392B" };
const statusBadge: Record<string, string> = { Good:"badge-success", Expiring:"badge-warning", Reorder:"badge-danger", Out:"badge-danger" };

export default function InventoryPage() {
  const [tab, setTab] = useState(0);
  const tabs = ["Stock Levels","FIFO Ledger","LIFO Ledger","Valuation"];

  return (
    <div className="animate-fade-in">
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:24, flexWrap:"wrap", gap:16 }}>
        <div>
          <h1 style={{ fontSize:22, fontWeight:900, color:"var(--navy)", marginBottom:4 }}>Inventory</h1>
          <p style={{ fontSize:14, color:"var(--gray)" }}>FIFO for perishables · LIFO for dry goods · Real-time stock tracking</p>
        </div>
        <div style={{ display:"flex", gap:10 }}>
          <button className="btn-secondary" style={{ fontSize:12, padding:"9px 16px" }}><RefreshCw size={14} /> Sync</button>
          <button className="btn-primary" style={{ fontSize:13, padding:"10px 20px" }}><Plus size={15} /> Add Stock</button>
        </div>
      </div>

      {/* Alerts */}
      {stock.filter(s=>s.status!=="Good").map(s => (
        <div key={s.name} style={{ display:"flex", gap:10, alignItems:"center", background: s.status==="Expiring"?"#FAEEDA":"#FCEBEB", border:`1px solid ${s.status==="Expiring"?"var(--amber)":"#C0392B"}`, padding:"10px 16px", marginBottom:10, fontSize:13, color: s.status==="Expiring"?"#7A4D0A":"#C0392B" }}>
          <AlertTriangle size={15} style={{ flexShrink:0 }} />
          <span><strong>{s.name}:</strong> {s.status === "Expiring" ? `Expiring in ${s.shelfDays} days — move stock now` : s.status === "Reorder" ? `Only ${s.pct}% remaining — reorder recommended` : "Out of stock — source immediately"}</span>
        </div>
      ))}

      {/* Tabs */}
      <div style={{ display:"flex", gap:0, marginBottom:20, borderBottom:"2px solid var(--border)" }}>
        {tabs.map((t,i) => (
          <button key={t} onClick={()=>setTab(i)} style={{ padding:"10px 20px", fontSize:13, fontWeight:tab===i?800:500, background:"none", border:"none", cursor:"pointer", color:tab===i?"var(--blue)":"var(--gray)", borderBottom:tab===i?"3px solid var(--blue)":"3px solid transparent", marginBottom:-2, whiteSpace:"nowrap", transition:"all 0.15s" }}>{t}</button>
        ))}
      </div>

      {/* Tab 0: Stock Levels */}
      {tab === 0 && (
        <div style={{ background:"white", border:"1px solid var(--border)" }}>
          <div style={{ overflowX:"auto" }}>
            <table>
              <thead><tr><th>Commodity</th><th>In Stock</th><th>Reserved</th><th>Available</th><th>Unit Cost</th><th>Total Value (UGX)</th><th>Method</th><th>Shelf Life</th><th>Status</th></tr></thead>
              <tbody>
                {stock.map(s => {
                  const available = s.inStock - s.reserved;
                  return (
                    <tr key={s.name}>
                      <td style={{ fontWeight:700, display:"flex", alignItems:"center", gap:8, fontSize:13 }}><span style={{fontSize:20}}>{s.icon}</span>{s.name}</td>
                      <td style={{ fontSize:13, fontWeight:600 }}>{s.inStock > 0 ? `${s.inStock} kg` : "—"}</td>
                      <td style={{ fontSize:13, color:"var(--gray)" }}>{s.reserved > 0 ? `${s.reserved} kg` : "—"}</td>
                      <td style={{ fontSize:13, fontWeight:700, color: available < 50 && available > 0 ? "var(--amber)" : "var(--navy)" }}>{available > 0 ? `${available} kg` : "0"}</td>
                      <td style={{ fontSize:13 }}>{s.unitCost > 0 ? `UGX ${s.unitCost.toLocaleString()}` : "—"}</td>
                      <td style={{ fontSize:13, fontWeight:600 }}>{s.inStock > 0 ? `UGX ${(s.inStock * s.unitCost).toLocaleString()}` : "0"}</td>
                      <td><span className={`badge ${s.method==="FIFO"?"badge-info":"badge-warning"}`}>{s.method}</span></td>
                      <td style={{ fontSize:12, color: s.shelfDays <= 5 ? "#C0392B" : "var(--gray)" }}>
                        {s.shelfDays <= 5 ? <span style={{ color:"#C0392B", fontWeight:700 }}>⚠ {s.shelfDays}d</span> : `${s.shelfDays} days`}
                      </td>
                      <td>
                        <div>
                          <span className={`badge ${statusBadge[s.status]}`}>{s.status}</span>
                          <div style={{ height:4, width:80, background:"var(--offwhite)", marginTop:4 }}>
                            <div style={{ width:`${s.pct}%`, height:"100%", background: s.pct < 25 ? "#C0392B" : s.pct < 50 ? "var(--amber)" : "var(--green)" }} />
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 1: FIFO */}
      {tab === 1 && (
        <div>
          <div style={{ padding:"14px 16px", background:"#E6F1FB", border:"1px solid var(--blue)", marginBottom:16, fontSize:13, color:"var(--navy)" }}>
            <strong>FIFO (First In, First Out):</strong> Oldest stock assigned first. Required for perishables (Avocado, Eggs, Tomatoes, Matoke). Reduces spoilage losses and ensures accurate profit tracking per batch.
          </div>
          <div style={{ background:"white", border:"1px solid var(--border)" }}>
            <div style={{ padding:"14px 20px", borderBottom:"1px solid var(--border)", fontWeight:800, color:"var(--navy)", fontSize:14 }}>FIFO Ledger — Avocado (Hass) · May 2026</div>
            <div style={{ overflowX:"auto" }}>
              <table>
                <thead><tr><th>Batch</th><th>Date In</th><th>Qty In</th><th>Buy Cost</th><th>Date Out</th><th>Qty Out</th><th>Sell Rate</th><th>Profit/kg</th><th>Status</th></tr></thead>
                <tbody>
                  {fifoLedger.map((r,i) => (
                    <tr key={i}>
                      <td style={{ fontWeight:700, color:"var(--blue)", fontFamily:"monospace" }}>{r.batch}</td>
                      <td style={{ fontSize:12, color:"var(--gray)" }}>{r.dateIn}</td>
                      <td style={{ fontSize:13 }}>{r.qty}</td>
                      <td style={{ fontSize:13 }}>{r.buyCost}</td>
                      <td style={{ fontSize:13 }}>{r.dateOut}</td>
                      <td style={{ fontSize:13 }}>{r.qtyOut}</td>
                      <td style={{ fontSize:12, color:"var(--gray)" }}>{r.sellRate}</td>
                      <td>{r.profitPct !== "—" ? <span className="badge badge-success">+{r.profitPct}</span> : <span className="badge badge-gray">—</span>}</td>
                      <td><span className={`badge ${r.status==="Cleared"?"badge-success":r.status==="In Stock"?"badge-info":"badge-warning"}`}>{r.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: LIFO */}
      {tab === 2 && (
        <div>
          <div style={{ padding:"14px 16px", background:"#FAEEDA", border:"1px solid var(--amber)", marginBottom:16, fontSize:13, color:"#7A4D0A" }}>
            <strong>LIFO (Last In, First Out):</strong> Most recently purchased stock assigned first. Best for dry goods (Beans, Onions, Dried Fish) — uses latest prices as cost basis, more accurately reflecting replacement cost in rising markets.
          </div>
          <div style={{ background:"white", border:"1px solid var(--border)" }}>
            <div style={{ padding:"14px 20px", borderBottom:"1px solid var(--border)", fontWeight:800, color:"var(--navy)", fontSize:14 }}>LIFO Ledger — Dry Beans · May 2026</div>
            <div style={{ overflowX:"auto" }}>
              <table>
                <thead><tr><th>Batch</th><th>Date In</th><th>Qty</th><th>Buy Cost</th><th>LIFO Assignment</th><th>Remaining</th><th>Profit Indicator</th><th>Status</th></tr></thead>
                <tbody>
                  {lifoLedger.map((r,i) => (
                    <tr key={i}>
                      <td style={{ fontWeight:700, color:"var(--blue)", fontFamily:"monospace" }}>{r.batch}</td>
                      <td style={{ fontSize:12, color:"var(--gray)" }}>{r.dateIn}</td>
                      <td style={{ fontSize:13 }}>{r.qty}</td>
                      <td style={{ fontSize:13 }}>{r.buyCost}</td>
                      <td style={{ fontSize:12, color:"var(--gray)" }}>{r.lifoUsed}</td>
                      <td style={{ fontSize:13, fontWeight:600 }}>{r.remaining}</td>
                      <td>{r.profit.startsWith("UGX") ? <span className="badge badge-success">{r.profit}</span> : <span className="badge badge-gray">{r.profit}</span>}</td>
                      <td><span className={`badge ${r.status==="Cleared"?"badge-success":r.status==="In Stock"?"badge-info":"badge-warning"}`}>{r.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Valuation */}
      {tab === 3 && (
        <div style={{ background:"white", border:"1px solid var(--border)" }}>
          <div style={{ padding:"14px 20px", borderBottom:"1px solid var(--border)", fontWeight:800, color:"var(--navy)", fontSize:14 }}>Inventory Valuation Comparison</div>
          <div style={{ overflowX:"auto" }}>
            <table>
              <thead><tr><th>Commodity</th><th>FIFO Value (UGX)</th><th>LIFO Value (UGX)</th><th>Difference</th><th>Impact</th><th>Method Used</th></tr></thead>
              <tbody>
                {[
                  ["🥑 Avocado",       "122,400","118,800","-3,600","Lower profit under FIFO","FIFO"],
                  ["🫘 Dry Beans",     "387,600","374,600","-13,000","LIFO reduces taxable profit","LIFO"],
                  ["🥚 Eggs",          "324,000","315,000","-9,000","FIFO better for perishable","FIFO"],
                  ["🐟 Dried Fish",    "484,500","465,500","-19,000","LIFO tracks cost inflation","LIFO"],
                  ["🥔 Irish Potatoes","262,400","257,200","-5,200","FIFO for freshness tracking","FIFO"],
                  ["🧅 Onions",        "36,750","35,520","-1,230","LIFO for stable dry goods","LIFO"],
                ].map(([c,fv,lv,diff,note,method]) => (
                  <tr key={c}>
                    <td style={{ fontWeight:700, fontSize:13 }}>{c}</td>
                    <td style={{ fontSize:13, fontWeight:600 }}>{fv}</td>
                    <td style={{ fontSize:13, fontWeight:600 }}>{lv}</td>
                    <td style={{ fontSize:12, color:"var(--amber)", fontWeight:700 }}>{diff}</td>
                    <td style={{ fontSize:12, color:"var(--gray)" }}>{note}</td>
                    <td><span className={`badge ${method==="FIFO"?"badge-info":"badge-warning"}`}>{method}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ padding:"16px 20px", borderTop:"1px solid var(--border)", background:"var(--offwhite)", fontSize:13, color:"var(--navy)" }}>
            <strong>Total FIFO Inventory Value:</strong> UGX 1,617,650 &nbsp;|&nbsp; <strong>Total LIFO Inventory Value:</strong> UGX 1,566,620 &nbsp;|&nbsp; <span style={{ color:"var(--amber)", fontWeight:700 }}>Difference: UGX 51,030</span>
          </div>
        </div>
      )}
    </div>
  );
}
