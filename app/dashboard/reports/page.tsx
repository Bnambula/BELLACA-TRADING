"use client";
import { Download, Calendar, BarChart2, FileText, RefreshCw } from "lucide-react";

const weeklyReports = [
  { week:"Week 21 — 19–25 May 2026", trips:3, revenue:"UGX 9.8M", profit:"UGX 2.1M", spoilage:"UGX 42,000" },
  { week:"Week 20 — 12–18 May 2026", trips:2, revenue:"UGX 7.2M", profit:"UGX 1.6M", spoilage:"UGX 87,000" },
  { week:"Week 19 — 5–11 May 2026",  trips:2, revenue:"UGX 6.8M", profit:"UGX 1.4M", spoilage:"UGX 23,000" },
  { week:"Week 18 — 28 Apr–4 May",   trips:1, revenue:"UGX 4.1M", profit:"UGX 0.9M", spoilage:"UGX 61,000" },
];

const monthlyReports = [
  { month:"May 2026",      revenue:"38.4M", profit:"9.1M",  margin:"23.7%", trips:8, status:"Current" },
  { month:"April 2026",    revenue:"31.2M", profit:"7.3M",  margin:"23.4%", trips:7, status:"Final" },
  { month:"March 2026",    revenue:"21.0M", profit:"4.6M",  margin:"21.9%", trips:5, status:"Final" },
  { month:"February 2026", revenue:"28.1M", profit:"6.2M",  margin:"22.1%", trips:6, status:"Final" },
  { month:"January 2026",  revenue:"24.0M", profit:"5.0M",  margin:"20.8%", trips:5, status:"Final" },
];

const quarterlyReports = [
  { quarter:"Q2 2026 (Apr–Jun)",   status:"In Progress", revenue:"69.6M+", profit:"16.4M+" },
  { quarter:"Q1 2026 (Jan–Mar)",   status:"Final",       revenue:"73.1M",  profit:"15.8M"  },
  { quarter:"Q4 2025 (Oct–Dec)",   status:"Final",       revenue:"61.0M",  profit:"12.2M"  },
];

export default function ReportsPage() {
  return (
    <div className="animate-fade-in">
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:24, flexWrap:"wrap", gap:16 }}>
        <div>
          <h1 style={{ fontSize:22, fontWeight:900, color:"var(--navy)", marginBottom:4 }}>Reports</h1>
          <p style={{ fontSize:14, color:"var(--gray)" }}>Auto-generated weekly, monthly & quarterly · PDF and Excel export</p>
        </div>
        <div style={{ display:"flex", gap:10 }}>
          <button className="btn-secondary" style={{ fontSize:12, padding:"9px 16px" }}><RefreshCw size={14}/> Generate Now</button>
          <button className="btn-primary" style={{ fontSize:13, padding:"10px 20px" }}><FileText size={14}/> Custom Report</button>
        </div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:20, marginBottom:28 }}>

        {/* Weekly */}
        <div style={{ background:"white", border:"1px solid var(--border)" }}>
          <div style={{ background:"var(--blue)", padding:"14px 20px", display:"flex", alignItems:"center", gap:10 }}>
            <Calendar size={18} color="white" />
            <div style={{ color:"white", fontWeight:800, fontSize:15 }}>Weekly Reports</div>
            <span style={{ marginLeft:"auto", background:"rgba(255,255,255,0.15)", color:"white", fontSize:11, fontWeight:700, padding:"2px 8px" }}>Auto · Monday 06:00</span>
          </div>
          <div style={{ padding:"0" }}>
            {weeklyReports.map((r,i) => (
              <div key={i} style={{ padding:"14px 20px", borderBottom:"1px solid var(--border)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div>
                  <div style={{ fontSize:13, fontWeight:700, color:"var(--navy)", marginBottom:4 }}>{r.week}</div>
                  <div style={{ fontSize:11, color:"var(--gray)", display:"flex", gap:12 }}>
                    <span>{r.trips} trips</span>
                    <span style={{ color:"var(--green)", fontWeight:600 }}>{r.profit}</span>
                    {parseInt(r.spoilage.replace(/[^0-9]/g,"")) > 50000 && <span style={{ color:"var(--amber)", fontWeight:600 }}>⚠ Spoilage</span>}
                  </div>
                </div>
                <div style={{ display:"flex", gap:6 }}>
                  <button style={{ background:"var(--offwhite)", border:"1px solid var(--border)", padding:"5px 10px", cursor:"pointer", fontSize:11, fontWeight:700, color:"var(--navy)", display:"flex", alignItems:"center", gap:4 }}><Download size={11}/> PDF</button>
                  <button style={{ background:"var(--offwhite)", border:"1px solid var(--border)", padding:"5px 10px", cursor:"pointer", fontSize:11, fontWeight:700, color:"var(--navy)" }}>XLS</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly */}
        <div style={{ background:"white", border:"1px solid var(--border)" }}>
          <div style={{ background:"var(--navy)", padding:"14px 20px", display:"flex", alignItems:"center", gap:10 }}>
            <BarChart2 size={18} color="white" />
            <div style={{ color:"white", fontWeight:800, fontSize:15 }}>Monthly Reports</div>
            <span style={{ marginLeft:"auto", background:"rgba(255,255,255,0.15)", color:"white", fontSize:11, fontWeight:700, padding:"2px 8px" }}>Auto · 1st of month</span>
          </div>
          <div style={{ overflowX:"auto" }}>
            <table>
              <thead><tr><th>Month</th><th>Revenue</th><th>Profit</th><th>Margin</th><th>Status</th><th></th></tr></thead>
              <tbody>
                {monthlyReports.map((r,i) => (
                  <tr key={i}>
                    <td style={{ fontSize:13, fontWeight:700, color:"var(--navy)", whiteSpace:"nowrap" }}>{r.month}</td>
                    <td style={{ fontSize:13 }}>UGX {r.revenue}</td>
                    <td style={{ fontSize:13, fontWeight:700, color:"var(--green)" }}>UGX {r.profit}</td>
                    <td><span className="badge badge-success">{r.margin}</span></td>
                    <td><span className={`badge ${r.status==="Current"?"badge-info":"badge-gray"}`}>{r.status}</span></td>
                    <td><button style={{ background:"none", border:"none", cursor:"pointer", color:"var(--blue)", display:"flex", alignItems:"center", gap:3, fontSize:12, fontWeight:700 }}><Download size={13}/> PDF</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Quarterly */}
      <div style={{ background:"white", border:"1px solid var(--border)", marginBottom:28 }}>
        <div style={{ background:"var(--sky)", padding:"14px 20px", display:"flex", alignItems:"center", gap:10 }}>
          <Calendar size={18} color="white" />
          <div style={{ color:"white", fontWeight:800, fontSize:15 }}>Quarterly Reports</div>
          <span style={{ marginLeft:"auto", background:"rgba(255,255,255,0.2)", color:"white", fontSize:11, fontWeight:700, padding:"2px 8px" }}>Auto · Jan, Apr, Jul, Oct</span>
        </div>
        <div style={{ padding:"0" }}>
          {quarterlyReports.map((r,i) => (
            <div key={i} style={{ padding:"18px 20px", borderBottom: i<quarterlyReports.length-1 ? "1px solid var(--border)":"none", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
              <div>
                <div style={{ fontSize:15, fontWeight:800, color:"var(--navy)", marginBottom:6 }}>{r.quarter}</div>
                <div style={{ display:"flex", gap:20, fontSize:13 }}>
                  <span>Revenue: <strong style={{ color:"var(--navy)" }}>UGX {r.revenue}</strong></span>
                  <span>Net Profit: <strong style={{ color:"var(--green)" }}>UGX {r.profit}</strong></span>
                </div>
              </div>
              <div style={{ display:"flex", gap:10, alignItems:"center" }}>
                <span className={`badge ${r.status==="In Progress"?"badge-warning":"badge-success"}`}>{r.status}</span>
                <button style={{ background:"var(--blue)", color:"white", border:"none", padding:"8px 16px", fontSize:12, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", gap:6 }}><Download size={13}/> Full Report</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Report Builder */}
      <div style={{ background:"white", border:"1px solid var(--border)" }}>
        <div style={{ padding:"14px 20px", borderBottom:"1px solid var(--border)", fontWeight:800, color:"var(--navy)", fontSize:15 }}>Custom Report Builder</div>
        <div style={{ padding:"24px" }}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:16, marginBottom:20 }}>
            <div><label>Report Type</label>
              <select><option>P&L Summary</option><option>Inventory Movement</option><option>Sales by Buyer</option><option>Commodity Margin Analysis</option><option>Trip Profitability</option><option>Supplier Payments</option><option>FX Exposure</option><option>FIFO/LIFO Reconciliation</option></select>
            </div>
            <div><label>Period</label>
              <select><option>This Month</option><option>Last Month</option><option>This Quarter</option><option>Last Quarter</option><option>Custom Range</option></select>
            </div>
            <div><label>Commodity</label>
              <select><option>All Commodities</option><option>🥑 Avocado</option><option>🫘 Dry Beans</option><option>🥔 Irish Potatoes</option><option>🧅 Onions</option><option>🥚 Eggs</option><option>🐟 Dried Fish</option><option>🍌 Plantain</option></select>
            </div>
            <div><label>Route</label>
              <select><option>Both Routes</option><option>Uganda → Kenya</option><option>Kenya → Uganda</option></select>
            </div>
            <div><label>Format</label>
              <select><option>PDF (Formatted)</option><option>Excel (.xlsx)</option><option>CSV (Raw Data)</option></select>
            </div>
            <div><label>Group By</label>
              <select><option>Week</option><option>Month</option><option>Commodity</option><option>Route</option><option>Buyer</option></select>
            </div>
          </div>
          <div style={{ display:"flex", gap:12 }}>
            <button className="btn-primary" style={{ fontSize:13, padding:"11px 24px" }}><BarChart2 size={14}/> Generate Report</button>
            <button className="btn-secondary" style={{ fontSize:13, padding:"11px 20px" }}><Download size={14}/> Schedule Auto-Export</button>
          </div>
        </div>
      </div>
    </div>
  );
}
