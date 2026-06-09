"use client";
import { Download, Plus } from "lucide-react";
const SALES = [
  { date:"27 May",inv:"INV-0091",buyer:"Kitale Wholesale", market:"Kitale, KE",  item:"Avocado",   qty:"300kg",    rev:"864,000",   cost:"153,000",  profit:"711,000",  status:"Paid"    },
  { date:"25 May",inv:"INV-0090",buyer:"Nairobi Gikomba",  market:"Nairobi, KE", item:"Dried Fish", qty:"80kg",     rev:"403,200",   cost:"400,000",  profit:"3,200",    status:"Paid"    },
  { date:"24 May",inv:"INV-0089",buyer:"Mbale Central",    market:"Mbale, UG",   item:"Potatoes",   qty:"380kg",    rev:"684,000",   cost:"312,800",  profit:"371,200",  status:"Partial" },
  { date:"22 May",inv:"INV-0088",buyer:"Eldoret Market",   market:"Eldoret, KE", item:"Dry Beans",  qty:"400kg",    rev:"1,080,000", cost:"400,000",  profit:"680,000",  status:"Paid"    },
  { date:"20 May",inv:"INV-0087",buyer:"Kitale Retail",    market:"Kitale, KE",  item:"Eggs",       qty:"50 trays", rev:"378,000",   cost:"525,000",  profit:"-147,000", status:"Unpaid"  },
  { date:"19 May",inv:"INV-0086",buyer:"Tororo Market",    market:"Tororo, UG",  item:"Onions",     qty:"200kg",    rev:"440,000",   cost:"172,800",  profit:"267,200",  status:"Paid"    },
];
export default function SalesPage() {
  return (
    <div className="fade-in">
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:18,flexWrap:"wrap",gap:10 }}>
        <div><h1 style={{ fontSize:20,fontWeight:900,color:"#001C5C",marginBottom:2 }}>Sales</h1><p style={{ fontSize:13,color:"var(--gray)" }}>Invoices & receipts · May 2026</p></div>
        <div style={{ display:"flex",gap:8 }}><button className="btn btn-ghost btn-sm"><Download size={13}/> Export</button><button className="btn btn-primary btn-sm"><Plus size={14}/> New Invoice</button></div>
      </div>
      <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:12,marginBottom:18 }}>
        {[["Total Revenue","UGX 38.4M","#003DA5"],["KES Receipts","KES 2.84M","#009FE3"],["Outstanding","UGX 1.2M","#D97706"],["Paid Invoices","18/21","#166534"]].map(([l,v,c])=>(
          <div key={l} className="card" style={{ padding:"14px 16px",borderTop:`3px solid ${c}` }}><div style={{ fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".07em",color:"var(--gray)",marginBottom:6 }}>{l}</div><div style={{ fontSize:20,fontWeight:900,color:"#001C5C" }}>{v}</div></div>
        ))}
      </div>
      <div className="card" style={{ overflowX:"auto" }}>
        <div style={{ padding:"12px 16px",borderBottom:"1px solid var(--border)",fontWeight:800,color:"#001C5C",fontSize:14 }}>Sales Ledger — May 2026</div>
        <table>
          <thead><tr><th>Date</th><th>Invoice</th><th>Buyer</th><th>Item</th><th>Qty</th><th>Revenue</th><th>Cost</th><th>Profit</th><th>Status</th></tr></thead>
          <tbody>
            {SALES.map(s=>(
              <tr key={s.inv}>
                <td style={{ fontSize:11,color:"var(--gray)" }}>{s.date}</td>
                <td style={{ fontWeight:700,color:"#003DA5",fontSize:12,fontFamily:"monospace" }}>{s.inv}</td>
                <td style={{ fontSize:12,fontWeight:600 }}>{s.buyer}</td>
                <td style={{ fontSize:12 }}>{s.item}</td>
                <td style={{ fontSize:12 }}>{s.qty}</td>
                <td style={{ fontSize:12,fontWeight:600,textAlign:"right" }}>{s.rev}</td>
                <td style={{ fontSize:12,color:"var(--gray)",textAlign:"right" }}>{s.cost}</td>
                <td style={{ fontSize:12,fontWeight:800,textAlign:"right",color:s.profit.startsWith("-")?"#DC2626":"#166534" }}>{s.profit.startsWith("-")?s.profit:"+"+s.profit}</td>
                <td><span className={`badge ${s.status==="Paid"?"badge-success":s.status==="Partial"?"badge-warning":"badge-danger"}`}>{s.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
