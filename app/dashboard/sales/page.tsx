"use client";
import { Download, Plus } from "lucide-react";

const sales = [
  { date:"27 May", inv:"INV-0091", buyer:"Kitale Wholesale",  market:"Kitale, KE",  commodity:"Avocado",        qty:"300kg",    revenue:"864,000",   cost:"153,000",  profit:"711,000",  status:"Paid"    },
  { date:"25 May", inv:"INV-0090", buyer:"Nairobi Gikomba",   market:"Nairobi, KE", commodity:"Dried Fish",      qty:"80kg",     revenue:"403,200",   cost:"400,000",  profit:"3,200",    status:"Paid"    },
  { date:"24 May", inv:"INV-0089", buyer:"Mbale Central",     market:"Mbale, UG",   commodity:"Irish Potatoes",  qty:"380kg",    revenue:"684,000",   cost:"312,800",  profit:"371,200",  status:"Partial" },
  { date:"22 May", inv:"INV-0088", buyer:"Eldoret Market",    market:"Eldoret, KE", commodity:"Dry Beans",       qty:"400kg",    revenue:"1,080,000", cost:"400,000",  profit:"680,000",  status:"Paid"    },
  { date:"20 May", inv:"INV-0087", buyer:"Kitale Retail",     market:"Kitale, KE",  commodity:"Eggs",            qty:"50 trays", revenue:"378,000",   cost:"525,000",  profit:"-147,000", status:"Unpaid"  },
  { date:"19 May", inv:"INV-0086", buyer:"Tororo Market",     market:"Tororo, UG",  commodity:"Onions",          qty:"200kg",    revenue:"440,000",   cost:"172,800",  profit:"267,200",  status:"Paid"    },
  { date:"17 May", inv:"INV-0085", buyer:"Nairobi City Mkt",  market:"Nairobi, KE", commodity:"Avocado",         qty:"250kg",    revenue:"720,000",   cost:"125,000",  profit:"595,000",  status:"Paid"    },
];

const summaryCards = [
  { label:"Total Revenue",   value:"UGX 38.4M",  color:"var(--blue)"  },
  { label:"KES Receipts",    value:"KES 2.84M",  color:"var(--sky)"   },
  { label:"Outstanding",     value:"UGX 1.2M",   color:"var(--amber)" },
  { label:"Invoices Paid",   value:"18 / 21",    color:"var(--green)" },
];

export default function SalesPage() {
  return (
    <div className="animate-fade-in">
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:24, flexWrap:"wrap", gap:16 }}>
        <div>
          <h1 style={{ fontSize:22, fontWeight:900, color:"var(--navy)", marginBottom:4 }}>Sales</h1>
          <p style={{ fontSize:14, color:"var(--gray)" }}>Invoices, receipts and buyer accounts · May 2026</p>
        </div>
        <div style={{ display:"flex", gap:10 }}>
          <button className="btn-secondary" style={{ fontSize:12, padding:"9px 16px" }}><Download size={14}/> Export</button>
          <button className="btn-primary" style={{ fontSize:13, padding:"10px 20px" }}><Plus size={15}/> New Invoice</button>
        </div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:16, marginBottom:24 }}>
        {summaryCards.map(c => (
          <div key={c.label} style={{ background:"white", border:"1px solid var(--border)", padding:"16px 20px", borderTop:`3px solid ${c.color}` }}>
            <div style={{ fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.07em", color:"var(--gray)", marginBottom:8 }}>{c.label}</div>
            <div style={{ fontSize:22, fontWeight:900, color:"var(--navy)", letterSpacing:"-0.03em" }}>{c.value}</div>
          </div>
        ))}
      </div>

      <div style={{ background:"white", border:"1px solid var(--border)" }}>
        <div style={{ padding:"14px 20px", borderBottom:"1px solid var(--border)", fontWeight:800, color:"var(--navy)", fontSize:15 }}>Sales Ledger — May 2026</div>
        <div style={{ overflowX:"auto" }}>
          <table>
            <thead>
              <tr><th>Date</th><th>Invoice</th><th>Buyer</th><th>Market</th><th>Commodity</th><th>Qty</th><th>Revenue (UGX)</th><th>Cost (UGX)</th><th>Gross Profit</th><th>Status</th></tr>
            </thead>
            <tbody>
              {sales.map(s => (
                <tr key={s.inv}>
                  <td style={{ fontSize:12, color:"var(--gray)" }}>{s.date}</td>
                  <td style={{ fontWeight:700, color:"var(--blue)", fontSize:13, fontFamily:"monospace" }}>{s.inv}</td>
                  <td style={{ fontSize:13, fontWeight:600 }}>{s.buyer}</td>
                  <td style={{ fontSize:12, color:"var(--gray)" }}>{s.market}</td>
                  <td style={{ fontSize:13 }}>{s.commodity}</td>
                  <td style={{ fontSize:13 }}>{s.qty}</td>
                  <td style={{ fontSize:13, fontWeight:600, textAlign:"right" }}>{s.revenue}</td>
                  <td style={{ fontSize:13, textAlign:"right", color:"var(--gray)" }}>{s.cost}</td>
                  <td style={{ fontSize:13, fontWeight:800, textAlign:"right", color:s.profit.startsWith("-")?"#C0392B":"var(--green)" }}>
                    {s.profit.startsWith("-") ? s.profit : `+${s.profit}`}
                  </td>
                  <td>
                    <span className={`badge ${s.status==="Paid"?"badge-success":s.status==="Partial"?"badge-warning":"badge-danger"}`}>{s.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ padding:"12px 20px", borderTop:"1px solid var(--border)", background:"var(--offwhite)", display:"flex", justifyContent:"space-between", fontSize:13, flexWrap:"wrap", gap:8 }}>
          <span style={{ color:"var(--gray)" }}>Showing {sales.length} of 21 invoices this month</span>
          <div style={{ display:"flex", gap:4 }}>
            {[1,2,3].map(p => <button key={p} style={{ width:30, height:30, border:"1px solid var(--border)", background:p===1?"var(--blue)":"white", color:p===1?"white":"var(--gray)", fontWeight:700, fontSize:12, cursor:"pointer" }}>{p}</button>)}
          </div>
        </div>
      </div>
    </div>
  );
}
