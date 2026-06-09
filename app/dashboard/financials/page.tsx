"use client";
import { useState } from "react";
import { Download } from "lucide-react";
const PL = [
  { label:"Uganda → Kenya Sales", v:"27,200,000", type:"income" },
  { label:"Kenya → Uganda Sales",  v:"11,200,000", type:"income" },
  { label:"Total Revenue",         v:"38,400,000", type:"total"  },
  { label:"Produce Purchase — UG", v:"(19,680,000)",type:"cost"  },
  { label:"Produce Purchase — KE", v:"(4,210,000)", type:"cost"  },
  { label:"Gross Profit",          v:"14,510,000",  type:"sub"   },
  { label:"Transport (8 trips)",   v:"(4,000,000)", type:"exp"   },
  { label:"Border Fees & Levies",  v:"(800,000)",   type:"exp"   },
  { label:"Packaging & Handling",  v:"(320,000)",   type:"exp"   },
  { label:"Spoilage Losses",       v:"(290,000)",   type:"exp"   },
  { label:"NET PROFIT",            v:"9,100,000",   type:"net"   },
];
const CF = [
  { date:"1 May",  desc:"Opening balance",           inn:"3,200,000", out:"—",          bal:"3,200,000"  },
  { date:"5 May",  desc:"Produce purchase",          inn:"—",         out:"1,825,000",  bal:"1,375,000"  },
  { date:"8 May",  desc:"Kitale sales receipt",      inn:"1,944,000", out:"—",          bal:"3,319,000"  },
  { date:"10 May", desc:"Transport — Trip 3",        inn:"—",         out:"500,000",    bal:"2,819,000"  },
  { date:"22 May", desc:"Eldoret beans receipt",     inn:"1,080,000", out:"—",          bal:"4,583,000"  },
  { date:"27 May", desc:"CLOSING BALANCE",           inn:"—",         out:"—",          bal:"14,283,000" },
];
const MNT = [24,28,21,31,38]; const MNTHS = ["Jan","Feb","Mar","Apr","May"]; const MX = 38;
export default function FinancialsPage() {
  const [tab, setTab] = useState(0);
  return (
    <div className="fade-in">
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:18,flexWrap:"wrap",gap:10 }}>
        <div><h1 style={{ fontSize:20,fontWeight:900,color:"#001C5C",marginBottom:2 }}>Financials</h1><p style={{ fontSize:13,color:"var(--gray)" }}>May 2026 · All figures in UGX</p></div>
        <button className="btn btn-primary btn-sm"><Download size={13}/> Export PDF</button>
      </div>
      <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:12,marginBottom:18 }}>
        {[["Revenue","UGX 38.4M","#003DA5"],["Gross Profit","UGX 14.5M","#166534"],["Net Profit","UGX 9.1M","#166534"],["Net Margin","23.7%","#009FE3"]].map(([l,v,c])=>(
          <div key={l} className="card" style={{ padding:"14px 16px",borderTop:`3px solid ${c}` }}><div style={{ fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".07em",color:"var(--gray)",marginBottom:6 }}>{l}</div><div style={{ fontSize:20,fontWeight:900,color:"#001C5C" }}>{v}</div></div>
        ))}
      </div>
      <div style={{ display:"flex",gap:0,marginBottom:16,borderBottom:"2px solid var(--border)",overflowX:"auto" }}>
        {["P&L Statement","Cash Flow","Balance Sheet"].map((t,i)=>(
          <button key={t} onClick={()=>setTab(i)} style={{ padding:"8px 14px",fontSize:12,fontWeight:tab===i?800:500,background:"none",border:"none",cursor:"pointer",color:tab===i?"#003DA5":"var(--gray)",borderBottom:tab===i?"3px solid #003DA5":"3px solid transparent",marginBottom:-2,whiteSpace:"nowrap",transition:"all .15s",flexShrink:0 }}>{t}</button>
        ))}
      </div>
      {tab===0 && (
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:16 }}>
          <div className="card">
            <div style={{ padding:"12px 16px",borderBottom:"1px solid var(--border)",fontWeight:800,color:"#001C5C",fontSize:14 }}>P&L — May 2026</div>
            <div style={{ padding:"0 16px" }}>
              {PL.map((r,i)=>(
                <div key={i} style={{ display:"flex",justifyContent:"space-between",padding:r.type==="net"||r.type==="total"||r.type==="sub"?"13px 0":"9px 0",borderBottom:r.type==="total"||r.type==="sub"||r.type==="net"?"2px solid #001C5C":"1px solid var(--border)",paddingLeft:r.type==="exp"||r.type==="cost"?12:0,background:r.type==="net"?"var(--off)":"transparent" }}>
                  <span style={{ fontSize:r.type==="net"?14:13,fontWeight:r.type==="net"||r.type==="total"||r.type==="sub"?800:500,textTransform:r.type==="net"?"uppercase":"none",letterSpacing:r.type==="net"?".04em":"0" }}>{r.label}</span>
                  <span style={{ fontSize:r.type==="net"?15:13,fontWeight:r.type==="net"||r.type==="total"||r.type==="sub"?800:600,color:r.v.startsWith("(")?"#DC2626":r.type==="net"||r.type==="sub"?"#166534":"#001C5C" }}>UGX {r.v}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="card" style={{ padding:"16px" }}>
            <div style={{ fontWeight:800,color:"#001C5C",fontSize:14,marginBottom:16 }}>Monthly Trend</div>
            <div style={{ display:"flex",alignItems:"flex-end",gap:10,height:120,marginBottom:8 }}>
              {MNTHS.map((m,i)=>(
                <div key={m} style={{ flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4 }}>
                  <div style={{ width:"100%",background:i===MNTHS.length-1?"#003DA5":"#E8EDF7",height:`${(MNT[i]/MX)*110}px`,borderRadius:"3px 3px 0 0" }}/>
                  <div style={{ fontSize:11,fontWeight:i===MNTHS.length-1?800:500,color:i===MNTHS.length-1?"#003DA5":"var(--gray)" }}>{m}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize:12,color:"var(--gray)",textAlign:"center" }}>Revenue UGX M · May peak: 38.4M</div>
          </div>
        </div>
      )}
      {tab===1 && (
        <div className="card" style={{ overflowX:"auto" }}>
          <table>
            <thead><tr><th>Date</th><th>Description</th><th>Inflow</th><th>Outflow</th><th>Balance</th></tr></thead>
            <tbody>
              {CF.map((r,i)=>(
                <tr key={i} style={{ background:r.desc.includes("CLOSING")?"var(--off)":"white" }}>
                  <td style={{ fontSize:11,color:"var(--gray)" }}>{r.date}</td>
                  <td style={{ fontSize:13,fontWeight:r.desc.includes("CLOSING")?800:500 }}>{r.desc}</td>
                  <td style={{ fontSize:12,fontWeight:600,color:r.inn!=="—"?"#166534":"var(--gray)",textAlign:"right" }}>{r.inn!=="—"?"+"+r.inn:r.inn}</td>
                  <td style={{ fontSize:12,fontWeight:600,color:r.out!=="—"?"#DC2626":"var(--gray)",textAlign:"right" }}>{r.out!=="—"?"("+r.out+")":r.out}</td>
                  <td style={{ fontSize:13,fontWeight:r.desc.includes("CLOSING")?900:600,color:"#001C5C",textAlign:"right" }}>UGX {r.bal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {tab===2 && (
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:16 }}>
          {[{title:"Assets",color:"#003DA5",rows:[["Cash (UGX)","14,283,000"],["Cash (KES equiv)","1,360,000"],["Inventory","1,663,150"],["Receivables","1,200,000"],["TOTAL ASSETS","18,506,150"]]},{title:"Liabilities & Equity",color:"#166534",rows:[["Supplier Payables","315,000"],["Total Liabilities","315,000"],["Opening Equity","3,000,000"],["Retained Profits","15,191,150"],["TOTAL EQUITY","18,191,150"]]}].map(s=>(
            <div key={s.title} className="card" style={{ padding:"16px" }}>
              <div style={{ fontWeight:800,color:"#001C5C",fontSize:14,marginBottom:14,paddingBottom:8,borderBottom:`3px solid ${s.color}` }}>{s.title}</div>
              {s.rows.map(([l,v],i)=>(
                <div key={l} style={{ display:"flex",justifyContent:"space-between",padding:"9px 0",borderBottom:i<s.rows.length-1?"1px solid var(--border)":"2px solid #001C5C",fontWeight:i===s.rows.length-1?800:500 }}>
                  <span style={{ fontSize:13 }}>{l}</span>
                  <span style={{ fontSize:i===s.rows.length-1?15:13,fontWeight:i===s.rows.length-1?900:600,color:i===s.rows.length-1?s.color:"#001C5C" }}>UGX {v}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
