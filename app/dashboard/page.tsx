"use client";
import { TrendingUp, Truck, Package, DollarSign, AlertTriangle, ArrowUpRight, ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";

const METRICS = [
  { label:"Monthly Revenue", value:"UGX 38.4M", sub:"+12.4%", up:true, icon:DollarSign, color:"#003DA5" },
  { label:"Net Profit",      value:"UGX 9.1M",  sub:"+8.2%",  up:true, icon:TrendingUp, color:"#166534" },
  { label:"Active Orders",   value:"17",         sub:"4 pending", up:false, icon:Truck, color:"#92400E" },
  { label:"Stock Value",     value:"UGX 14.2M", sub:"83% cap",up:true, icon:Package,   color:"#009FE3" },
];
const ORDERS = [
  { id:"#ORD-041", commodity:"Avocado 300kg",   route:"UG→KE", status:"Delivered",  cls:"badge-success", val:"432,000" },
  { id:"#ORD-042", commodity:"Dry Beans 400kg", route:"UG→KE", status:"In Transit", cls:"badge-warning", val:"540,000" },
  { id:"#ORD-043", commodity:"Irish Potatoes",  route:"KE→UG", status:"At Border",  cls:"badge-info",    val:"720,000" },
  { id:"#ORD-044", commodity:"Onions 200kg",    route:"KE→UG", status:"Pending",    cls:"badge-gray",    val:"440,000" },
  { id:"#ORD-040", commodity:"Dried Fish 80kg", route:"UG→KE", status:"Delivered",  cls:"badge-success", val:"403,200" },
];
const STOCK = [
  { name:"Avocado",  pct:72, color:"#166534", warn:false },
  { name:"Beans",    pct:85, color:"#166534", warn:false },
  { name:"Onions",   pct:18, color:"#DC2626", warn:true  },
  { name:"Matoke",   pct:35, color:"#D97706", warn:true  },
  { name:"Fish",     pct:68, color:"#166534", warn:false },
];
const BARS = [52,68,45,80,63,71,88];
const DAYS = ["M","T","W","T","F","S","S"];

export default function DashboardPage() {
  return (
    <div className="fade-in">
      {/* Alert */}
      <div style={{ display:"flex", gap:10, alignItems:"flex-start", background:"var(--amber-l)", border:"1px solid #D97706", padding:"11px 14px", marginBottom:20, fontSize:13, color:"#92400E" }}>
        <AlertTriangle size={15} style={{ marginTop:1, flexShrink:0 }}/>
        <span><strong>Action required:</strong> 3 orders pending border clearance · Busia Poultry payment overdue UGX 315,000</span>
      </div>

      {/* Metrics */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))", gap:12, marginBottom:20 }}>
        {METRICS.map((m,i) => {
          const Icon = m.icon;
          return (
            <div key={i} className={`card fade-up d${i+1}`} style={{ padding:"16px", borderTop:`3px solid ${m.color}` }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
                <div style={{ fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:".07em", color:"var(--gray)" }}>{m.label}</div>
                <Icon size={16} color={m.color}/>
              </div>
              <div style={{ fontSize:22, fontWeight:900, color:"#001C5C", letterSpacing:"-.03em", marginBottom:4 }}>{m.value}</div>
              <div style={{ display:"flex", alignItems:"center", gap:4, fontSize:11, fontWeight:600, color:m.up?"var(--green)":"var(--amber)" }}>
                <ArrowUpRight size={12}/>{m.sub}
              </div>
            </div>
          );
        })}
      </div>

      {/* Content grid — stacks on mobile */}
      <div style={{ display:"grid", gridTemplateColumns:"minmax(0,1fr)", gap:16 }}>

        {/* Recent Orders */}
        <div className="card">
          <div style={{ padding:"14px 16px", borderBottom:"1px solid var(--border)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <span style={{ fontSize:14, fontWeight:800, color:"#001C5C" }}>Recent Orders</span>
            <Link href="/dashboard/orders" style={{ display:"flex", alignItems:"center", gap:4, fontSize:11, fontWeight:700, color:"#003DA5", textDecoration:"none", textTransform:"uppercase", letterSpacing:".06em" }}>
              All <ArrowRight size={12}/>
            </Link>
          </div>
          <div style={{ overflowX:"auto" }}>
            <table>
              <thead><tr><th>Order</th><th>Commodity</th><th>Route</th><th>Value</th><th>Status</th></tr></thead>
              <tbody>
                {ORDERS.map(o=>(
                  <tr key={o.id}>
                    <td style={{ fontWeight:800, color:"#003DA5", fontSize:12, whiteSpace:"nowrap" }}>{o.id}</td>
                    <td style={{ fontSize:12 }}>{o.commodity}</td>
                    <td><span style={{ fontSize:10, fontWeight:800, background:"#DBEAFE", color:"#003DA5", padding:"2px 7px" }}>{o.route}</span></td>
                    <td style={{ fontSize:12, fontWeight:600, whiteSpace:"nowrap" }}>{o.val}</td>
                    <td><span className={`badge ${o.cls}`}>{o.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 2-col on wider screens */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:16 }}>
          {/* Chart */}
          <div className="card" style={{ padding:"16px" }}>
            <div style={{ fontSize:13, fontWeight:800, color:"#001C5C", marginBottom:14 }}>Weekly Revenue</div>
            <div style={{ display:"flex", alignItems:"flex-end", gap:5, height:80 }}>
              {BARS.map((h,i)=>(
                <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:3 }}>
                  <div style={{ width:"100%", background:i===6?"#003DA5":"#E8EDF7", height:`${h}%`, borderRadius:"2px 2px 0 0" }}/>
                  <div style={{ fontSize:10, color:"var(--gray)", fontWeight:600 }}>{DAYS[i]}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Stock */}
          <div className="card" style={{ padding:"16px" }}>
            <div style={{ fontSize:13, fontWeight:800, color:"#001C5C", marginBottom:14 }}>Stock Levels</div>
            {STOCK.map(s=>(
              <div key={s.name} style={{ marginBottom:10 }}>
                <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, marginBottom:3 }}>
                  <span style={{ fontWeight:600, color:"#001C5C" }}>{s.name}</span>
                  <span style={{ fontWeight:700, color:s.warn?"#DC2626":"var(--gray)" }}>{s.pct}%{s.warn?" ⚠":""}</span>
                </div>
                <div style={{ height:5, background:"var(--off)" }}>
                  <div style={{ width:`${s.pct}%`, height:"100%", background:s.color, transition:"width .4s" }}/>
                </div>
              </div>
            ))}
          </div>

          {/* Trips */}
          <div className="card" style={{ padding:"16px" }}>
            <div style={{ fontSize:13, fontWeight:800, color:"#001C5C", marginBottom:8 }}>Trips This Month</div>
            <div style={{ fontSize:36, fontWeight:900, color:"#003DA5", letterSpacing:"-.04em", marginBottom:10 }}>8</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8 }}>
              {[["4","Done","#166534"],["2","Transit","#D97706"],["2","Planned","var(--gray)"]].map(([n,l,c])=>(
                <div key={l} style={{ textAlign:"center", padding:"8px 4px", background:"var(--off)" }}>
                  <div style={{ fontSize:20, fontWeight:900, color:c as string }}>{n}</div>
                  <div style={{ fontSize:10, color:"var(--gray)", fontWeight:600, textTransform:"uppercase", letterSpacing:".05em" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Commodity performance */}
          <div className="card" style={{ padding:"16px" }}>
            <div style={{ fontSize:13, fontWeight:800, color:"#001C5C", marginBottom:12 }}>Top Commodities</div>
            {[["🥑 Avocado","UGX 8.4M","42%"],["🫘 Beans","UGX 7.1M","35%"],["🐟 Fish","UGX 5.2M","38%"],["🥔 Potatoes","UGX 5.8M","28%"]].map(([c,r,m])=>(
              <div key={c} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 0", borderBottom:"1px solid var(--border)", fontSize:13 }}>
                <span style={{ fontWeight:600 }}>{c}</span>
                <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                  <span style={{ color:"var(--gray)", fontSize:12 }}>{r}</span>
                  <span className="badge badge-success">{m}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
