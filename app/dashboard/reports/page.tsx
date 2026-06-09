"use client";
import { Download, Calendar, BarChart2, RefreshCw } from "lucide-react";

type ReportGroup = { bg: string; icon: React.ReactNode; label: string; freq: string; reports: { w: string; r: string; p: string }[] };

const GROUPS: ReportGroup[] = [
  { bg:"#003DA5", icon:<Calendar size={16}/>, label:"Weekly Reports", freq:"Auto · Monday 06:00",
    reports:[{w:"Week 21 — 19–25 May",r:"UGX 9.8M",p:"UGX 2.1M"},{w:"Week 20 — 12–18 May",r:"UGX 7.2M",p:"UGX 1.6M"},{w:"Week 19 — 5–11 May",r:"UGX 6.8M",p:"UGX 1.4M"}] },
  { bg:"#001C5C", icon:<BarChart2 size={16}/>, label:"Monthly Reports", freq:"Auto · 1st of month",
    reports:[{w:"May 2026",r:"UGX 38.4M",p:"UGX 9.1M"},{w:"April 2026",r:"UGX 31.2M",p:"UGX 7.3M"},{w:"March 2026",r:"UGX 21.0M",p:"UGX 4.6M"}] },
  { bg:"#009FE3", icon:<Calendar size={16}/>, label:"Quarterly Reports", freq:"Auto · Jan,Apr,Jul,Oct",
    reports:[{w:"Q1 2026 (Jan–Mar)",r:"UGX 73.1M",p:"UGX 15.8M"},{w:"Q4 2025 (Oct–Dec)",r:"UGX 61.0M",p:"UGX 12.2M"}] },
];

type CustomField = { label: string; opts: string[] };
const CUSTOM_FIELDS: CustomField[] = [
  { label:"Report Type",  opts:["P&L Summary","Inventory Movement","Sales by Buyer","Commodity Margins","Trip Profitability","Supplier Payments","FIFO/LIFO Reconciliation"] },
  { label:"Period",       opts:["This Month","Last Month","This Quarter","Last Quarter"] },
  { label:"Commodity",    opts:["All Commodities","Avocado","Dry Beans","Irish Potatoes","Onions","Eggs","Dried Fish","Plantain"] },
  { label:"Format",       opts:["PDF (Formatted)","Excel (.xlsx)","CSV (Raw Data)"] },
];

export default function ReportsPage() {
  return (
    <div className="fade-in">
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:18,flexWrap:"wrap",gap:10 }}>
        <div>
          <h1 style={{ fontSize:20,fontWeight:900,color:"#001C5C",marginBottom:2 }}>Reports</h1>
          <p style={{ fontSize:13,color:"var(--gray)" }}>Auto-generated weekly, monthly & quarterly</p>
        </div>
        <button className="btn btn-ghost btn-sm"><RefreshCw size={13}/> Generate Now</button>
      </div>

      <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:14,marginBottom:20 }}>
        {GROUPS.map(g => (
          <div key={g.label} className="card">
            <div style={{ background:g.bg,padding:"12px 16px",display:"flex",alignItems:"center",gap:8 }}>
              <span style={{ color:"white" }}>{g.icon}</span>
              <span style={{ color:"white",fontWeight:800,fontSize:13 }}>{g.label}</span>
              <span style={{ marginLeft:"auto",background:"rgba(255,255,255,.18)",color:"white",fontSize:10,fontWeight:700,padding:"2px 7px" }}>{g.freq}</span>
            </div>
            {g.reports.map(r => (
              <div key={r.w} style={{ padding:"12px 16px",borderBottom:"1px solid var(--border)",display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                <div>
                  <div style={{ fontSize:12,fontWeight:700,color:"#001C5C",marginBottom:2 }}>{r.w}</div>
                  <div style={{ fontSize:11,color:"var(--gray)" }}>Revenue {r.r} · Profit <span style={{ color:"#166534",fontWeight:700 }}>{r.p}</span></div>
                </div>
                <button style={{ background:"var(--off)",border:"1px solid var(--border)",padding:"5px 10px",cursor:"pointer",fontSize:11,fontWeight:700,color:"#001C5C",display:"flex",alignItems:"center",gap:3 }}>
                  <Download size={11}/> PDF
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="card" style={{ padding:"20px" }}>
        <div style={{ fontWeight:800,color:"#001C5C",fontSize:14,marginBottom:16 }}>Custom Report Builder</div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:14,marginBottom:16 }}>
          {CUSTOM_FIELDS.map(f => (
            <div key={f.label}>
              <label>{f.label}</label>
              <select>{f.opts.map(o => <option key={o}>{o}</option>)}</select>
            </div>
          ))}
        </div>
        <div style={{ display:"flex",gap:10 }}>
          <button className="btn btn-primary" style={{ fontSize:13 }}><BarChart2 size={14}/> Generate</button>
          <button className="btn btn-ghost" style={{ fontSize:13 }}><Download size={14}/> Schedule Export</button>
        </div>
      </div>
    </div>
  );
}
