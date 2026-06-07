"use client";
import { useState } from "react";
import { TrendingUp, TrendingDown, Download } from "lucide-react";

const plData = [
  { label:"Uganda → Kenya Sales", amount:"27,200,000", type:"income" },
  { label:"Kenya → Uganda Sales",  amount:"11,200,000", type:"income" },
  { label:"Total Revenue",         amount:"38,400,000", type:"total" },
  { label:"Produce Purchase — UG", amount:"(19,680,000)",type:"cost" },
  { label:"Produce Purchase — KE", amount:"(4,210,000)", type:"cost" },
  { label:"Gross Profit",          amount:"14,510,000",  type:"subtotal" },
  { label:"Transport — 8 trips",   amount:"(4,000,000)", type:"expense" },
  { label:"Border Fees & Levies",  amount:"(800,000)",   type:"expense" },
  { label:"Packaging & Handling",  amount:"(320,000)",   type:"expense" },
  { label:"Spoilage Losses",       amount:"(290,000)",   type:"expense" },
  { label:"NET PROFIT",            amount:"9,100,000",   type:"net" },
];

const cashFlow = [
  { date:"1 May",  desc:"Opening balance",              inflow:"3,200,000",    outflow:"—",          balance:"3,200,000" },
  { date:"5 May",  desc:"Produce purchase — beans/avo", inflow:"—",            outflow:"1,825,000",   balance:"1,375,000" },
  { date:"8 May",  desc:"Kitale sales receipt",         inflow:"1,944,000",    outflow:"—",          balance:"3,319,000" },
  { date:"10 May", desc:"Transport — Trip 3",           inflow:"—",            outflow:"500,000",     balance:"2,819,000" },
  { date:"15 May", desc:"Mbale market sales",           inflow:"684,000",      outflow:"—",          balance:"3,503,000" },
  { date:"22 May", desc:"Eldoret beans (INV-0088)",     inflow:"1,080,000",    outflow:"—",          balance:"4,583,000" },
  { date:"27 May", desc:"CLOSING BALANCE",              inflow:"—",            outflow:"—",          balance:"14,283,000" },
];

const months = ["Jan","Feb","Mar","Apr","May"];
const revenue = [24,28,21,31,38];
const profit =  [5,6,4,7,9];

export default function FinancialsPage() {
  const [tab, setTab] = useState(0);
  const maxRev = Math.max(...revenue);

  return (
    <div className="animate-fade-in">
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:24, flexWrap:"wrap", gap:16 }}>
        <div>
          <h1 style={{ fontSize:22, fontWeight:900, color:"var(--navy)", marginBottom:4 }}>Financials</h1>
          <p style={{ fontSize:14, color:"var(--gray)" }}>May 2026 · All figures in Uganda Shillings (UGX)</p>
        </div>
        <button className="btn-primary" style={{ fontSize:13, padding:"10px 20px" }}><Download size={14} /> Export PDF</button>
      </div>

      {/* Summary cards */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:16, marginBottom:28 }}>
        {[
          { label:"Total Revenue",   value:"UGX 38.4M", color:"var(--blue)",  up:true,  change:"+12.4%" },
          { label:"Gross Profit",    value:"UGX 14.5M", color:"var(--green)", up:true,  change:"37.8% margin" },
          { label:"Net Profit",      value:"UGX 9.1M",  color:"var(--green)", up:true,  change:"23.7% margin" },
          { label:"KES Receipts",    value:"KES 2.84M", color:"var(--sky)",   up:true,  change:"≈ UGX 27.2M" },
          { label:"Payables",        value:"UGX 315K",  color:"var(--amber)", up:false, change:"1 overdue" },
        ].map((c,i) => (
          <div key={i} style={{ background:"white", border:"1px solid var(--border)", padding:"18px 20px", borderTop:`3px solid ${c.color}` }}>
            <div style={{ fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.07em", color:"var(--gray)", marginBottom:8 }}>{c.label}</div>
            <div style={{ fontSize:22, fontWeight:900, color:"var(--navy)", letterSpacing:"-0.03em", marginBottom:4 }}>{c.value}</div>
            <div style={{ fontSize:12, fontWeight:600, display:"flex", alignItems:"center", gap:4, color: c.up?"var(--green)":"var(--amber)" }}>
              {c.up ? <TrendingUp size={13}/> : <TrendingDown size={13}/>} {c.change}
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display:"flex", gap:0, marginBottom:20, borderBottom:"2px solid var(--border)" }}>
        {["P&L Statement","Cash Flow","Balance Sheet","FX Positions"].map((t,i) => (
          <button key={t} onClick={()=>setTab(i)} style={{ padding:"10px 20px", fontSize:13, fontWeight:tab===i?800:500, background:"none", border:"none", cursor:"pointer", color:tab===i?"var(--blue)":"var(--gray)", borderBottom:tab===i?"3px solid var(--blue)":"3px solid transparent", marginBottom:-2, whiteSpace:"nowrap", transition:"all 0.15s" }}>{t}</button>
        ))}
      </div>

      {tab === 0 && (
        <div style={{ display:"grid", gridTemplateColumns:"1fr 340px", gap:20 }}>
          <div style={{ background:"white", border:"1px solid var(--border)" }}>
            <div style={{ padding:"14px 20px", borderBottom:"1px solid var(--border)", fontWeight:800, color:"var(--navy)", fontSize:15 }}>Profit & Loss — May 2026</div>
            <div style={{ padding:"0 20px" }}>
              {plData.map((r,i) => (
                <div key={i} style={{
                  display:"flex", justifyContent:"space-between", alignItems:"center",
                  padding: r.type==="total"||r.type==="subtotal"||r.type==="net" ? "14px 0" : "10px 0",
                  borderBottom: r.type==="total"||r.type==="subtotal"||r.type==="net" ? "2px solid var(--navy)" : "1px solid var(--border)",
                  background: r.type==="net" ? "var(--offwhite)" : "transparent",
                  marginLeft: r.type==="expense"||r.type==="cost" ? 16 : 0,
                }}>
                  <span style={{ fontSize: r.type==="net"?15:13, fontWeight: r.type==="total"||r.type==="net"||r.type==="subtotal" ? 800 : 500, color: r.type==="net"?"var(--navy)":"var(--dark)", textTransform:r.type==="net"?"uppercase":"none", letterSpacing:r.type==="net"?"0.04em":"0" }}>{r.label}</span>
                  <span style={{ fontSize: r.type==="net"?17:14, fontWeight: r.type==="net"||r.type==="total"||r.type==="subtotal" ? 800 : 600, color: r.amount.startsWith("(")?  "#C0392B" : r.type==="net"||r.type==="subtotal" ? "var(--green)" : "var(--navy)" }}>UGX {r.amount}</span>
                </div>
              ))}
            </div>
            <div style={{ padding:"12px 20px", display:"flex", justifyContent:"flex-end" }}>
              <div style={{ display:"flex", gap:24, fontSize:12 }}>
                <span style={{ color:"var(--gray)" }}>Gross Margin: <strong style={{ color:"var(--navy)" }}>37.8%</strong></span>
                <span style={{ color:"var(--gray)" }}>Net Margin: <strong style={{ color:"var(--navy)" }}>23.7%</strong></span>
              </div>
            </div>
          </div>
          {/* Chart */}
          <div style={{ background:"white", border:"1px solid var(--border)", padding:"20px" }}>
            <div style={{ fontWeight:800, color:"var(--navy)", fontSize:14, marginBottom:20 }}>Monthly Trend (UGX M)</div>
            <div style={{ display:"flex", alignItems:"flex-end", gap:12, height:160, marginBottom:10 }}>
              {months.map((m,i) => (
                <div key={m} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:3 }}>
                  <div style={{ width:"100%", background: i===months.length-1?"var(--blue)":"var(--light)", height:`${(revenue[i]/maxRev)*140}px`, position:"relative", transition:"height 0.4s ease" }}>
                    <div style={{ position:"absolute", bottom:0, width:"100%", background: i===months.length-1?"var(--sky)":"rgba(0,159,227,0.3)", height:`${(profit[i]/maxRev)*140}px` }} />
                  </div>
                  <div style={{ fontSize:11, fontWeight:700, color: i===months.length-1?"var(--blue)":"var(--gray)" }}>{m}</div>
                </div>
              ))}
            </div>
            <div style={{ display:"flex", gap:16, fontSize:11, color:"var(--gray)" }}>
              <span style={{ display:"flex", alignItems:"center", gap:5 }}><span style={{ width:12, height:12, background:"var(--blue)", display:"inline-block" }}/> Revenue</span>
              <span style={{ display:"flex", alignItems:"center", gap:5 }}><span style={{ width:12, height:12, background:"var(--sky)", display:"inline-block" }}/> Net Profit</span>
            </div>
            <div style={{ marginTop:20, padding:"14px", background:"var(--offwhite)", fontSize:13 }}>
              <div style={{ fontWeight:800, color:"var(--navy)", marginBottom:6 }}>YTD Summary</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                <div style={{ fontSize:12, color:"var(--gray)" }}>Total Revenue</div><div style={{ fontSize:12, fontWeight:700, color:"var(--navy)", textAlign:"right" }}>UGX 142M</div>
                <div style={{ fontSize:12, color:"var(--gray)" }}>Net Profit</div><div style={{ fontSize:12, fontWeight:700, color:"var(--green)", textAlign:"right" }}>UGX 31.1M</div>
                <div style={{ fontSize:12, color:"var(--gray)" }}>Avg Margin</div><div style={{ fontSize:12, fontWeight:700, color:"var(--navy)", textAlign:"right" }}>21.9%</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === 1 && (
        <div style={{ background:"white", border:"1px solid var(--border)" }}>
          <div style={{ padding:"14px 20px", borderBottom:"1px solid var(--border)", fontWeight:800, color:"var(--navy)", fontSize:15 }}>Cash Flow Ledger — May 2026</div>
          <table>
            <thead><tr><th>Date</th><th>Description</th><th>Inflow (UGX)</th><th>Outflow (UGX)</th><th>Running Balance</th></tr></thead>
            <tbody>
              {cashFlow.map((r,i) => (
                <tr key={i} style={{ background: r.desc.includes("CLOSING") ? "var(--offwhite)" : "white" }}>
                  <td style={{ fontSize:12, color:"var(--gray)", whiteSpace:"nowrap" }}>{r.date}</td>
                  <td style={{ fontSize:13, fontWeight: r.desc.includes("CLOSING") ? 800 : 500 }}>{r.desc}</td>
                  <td style={{ fontSize:13, fontWeight:600, color: r.inflow!=="—"?"var(--green)":"var(--gray)", textAlign:"right" }}>{r.inflow!=="—"?`+${r.inflow}`:r.inflow}</td>
                  <td style={{ fontSize:13, fontWeight:600, color: r.outflow!=="—"?"#C0392B":"var(--gray)", textAlign:"right" }}>{r.outflow!=="—"?`(${r.outflow})`:r.outflow}</td>
                  <td style={{ fontSize:14, fontWeight: r.desc.includes("CLOSING")?900:600, color:"var(--navy)", textAlign:"right" }}>UGX {r.balance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 2 && (
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
          {[
            { title:"Assets", rows:[["Cash (UGX)","14,283,000"],["Cash (KES ≈ UGX)","1,360,000"],["Inventory","1,663,150"],["Receivables","1,200,000"],["Total Assets","18,506,150"]], color:"var(--blue)" },
            { title:"Liabilities & Equity", rows:[["Supplier Payables","315,000"],["Total Liabilities","315,000"],["Opening Equity","3,000,000"],["Retained Profits","15,191,150"],["Total Equity","18,191,150"]], color:"var(--green)" },
          ].map(s => (
            <div key={s.title} style={{ background:"white", border:"1px solid var(--border)", padding:"20px" }}>
              <div style={{ fontWeight:800, color:"var(--navy)", fontSize:15, marginBottom:16, paddingBottom:10, borderBottom:`3px solid ${s.color}` }}>{s.title}</div>
              {s.rows.map(([l,v],i) => (
                <div key={l} style={{ display:"flex", justifyContent:"space-between", padding:"10px 0", borderBottom: i<s.rows.length-1?"1px solid var(--border)":"2px solid var(--navy)", fontWeight: i===s.rows.length-1?800:500 }}>
                  <span style={{ fontSize:13 }}>{l}</span>
                  <span style={{ fontSize:14, fontWeight: i===s.rows.length-1?900:600, color: i===s.rows.length-1?s.color:"var(--navy)" }}>UGX {v}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {tab === 3 && (
        <div style={{ background:"white", border:"1px solid var(--border)" }}>
          <div style={{ padding:"14px 20px", borderBottom:"1px solid var(--border)", fontWeight:800, color:"var(--navy)", fontSize:15 }}>FX Positions — UGX / KES</div>
          <table>
            <thead><tr><th>Date</th><th>Transaction</th><th>KES Amount</th><th>Rate Used</th><th>UGX Equivalent</th><th>Current Rate</th><th>FX Gain/Loss</th></tr></thead>
            <tbody>
              {[
                ["27 May","Kitale sales receipts","KES 302,400","28.8","8,709,120","29.0","+60,480"],
                ["22 May","Eldoret beans sold","KES 375,000","28.8","10,800,000","29.0","+75,000"],
                ["20 May","KE potato purchase","(KES 112,000)","28.7","(3,214,400)","29.0","(33,600)"],
              ].map(([d,t,k,r,u,c,fx]) => (
                <tr key={d+t}>
                  <td style={{ fontSize:12, color:"var(--gray)" }}>{d}</td>
                  <td style={{ fontSize:13 }}>{t}</td>
                  <td style={{ fontSize:13, fontWeight:600 }}>{k}</td>
                  <td style={{ fontSize:13 }}>{r}</td>
                  <td style={{ fontSize:13, fontWeight:600 }}>{u}</td>
                  <td style={{ fontSize:13 }}>{c}</td>
                  <td style={{ fontSize:13, fontWeight:800, color: (fx as string).startsWith("+")?"var(--green)":"#C0392B" }}>{fx}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ padding:"14px 20px", background:"#E6F1FB", borderTop:"1px solid var(--blue)", fontSize:13, color:"var(--navy)" }}>
            <strong>Natural hedge:</strong> Converting KES receipts directly into Kenyan return produce eliminates currency holding risk — a built-in FX strategy that saves the cost of formal hedging instruments.
          </div>
        </div>
      )}
    </div>
  );
}
