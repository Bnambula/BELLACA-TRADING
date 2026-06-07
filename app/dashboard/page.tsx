"use client";
import { TrendingUp, Truck, Package, DollarSign, AlertTriangle, ArrowUpRight, ArrowDownRight, ArrowRight, CheckCircle, Clock, MapPin } from "lucide-react";

const metrics = [
  { label: "Monthly Revenue", value: "UGX 38.4M", change: "+12.4%", up: true, icon: DollarSign, color: "var(--blue)" },
  { label: "Net Profit",      value: "UGX 9.1M",  change: "+8.2%",  up: true, icon: TrendingUp, color: "var(--green)" },
  { label: "Active Orders",   value: "17",          change: "4 pending", up: false, icon: Truck, color: "var(--amber)" },
  { label: "Stock Value",     value: "UGX 14.2M",  change: "83% capacity", up: true, icon: Package, color: "var(--sky)" },
];

const recentOrders = [
  { id: "#ORD-0041", commodity: "Avocado 300kg",     route: "UG→KE", status: "Delivered",  statusClass: "badge-success", buyer: "Kitale Wholesale", value: "432,000" },
  { id: "#ORD-0042", commodity: "Dry Beans 400kg",   route: "UG→KE", status: "In Transit", statusClass: "badge-warning", buyer: "Eldoret Market",  value: "540,000" },
  { id: "#ORD-0043", commodity: "Irish Potatoes",    route: "KE→UG", status: "At Border",  statusClass: "badge-info",    buyer: "Mbale Market",   value: "720,000" },
  { id: "#ORD-0044", commodity: "Onions 200kg",      route: "KE→UG", status: "Pending",    statusClass: "badge-gray",    buyer: "Tororo Market",  value: "440,000" },
  { id: "#ORD-0040", commodity: "Dried Fish 80kg",   route: "UG→KE", status: "Delivered",  statusClass: "badge-success", buyer: "Nairobi Gikomba",value: "403,200" },
];

const stockAlerts = [
  { item: "Onions",  level: 18, status: "Reorder Now",  color: "#C0392B" },
  { item: "Matoke",  level: 35, status: "Expiring Soon", color: "var(--amber)" },
  { item: "Tomatoes",level: 0,  status: "Out of Stock",  color: "#C0392B" },
];

const weeklyBars = [52, 68, 45, 80, 63, 71, 88];
const weekLabels = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

export default function DashboardPage() {
  return (
    <div className="animate-fade-in">
      {/* Alert */}
      <div style={{ display: "flex", gap: 10, alignItems: "flex-start", background: "#FAEEDA", border: "1px solid var(--amber)", padding: "12px 16px", marginBottom: 24, fontSize: 13, color: "#7A4D0A" }}>
        <AlertTriangle size={16} style={{ marginTop: 1, flexShrink: 0 }} />
        <span><strong>Action required:</strong> 3 orders pending border clearance · Busia Poultry payment overdue (UGX 315,000)</span>
      </div>

      {/* Metric cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))", gap: 16, marginBottom: 28 }}>
        {metrics.map((m, i) => {
          const Icon = m.icon;
          return (
            <div key={i} className="animate-fade-up" style={{ background: "white", border: "1px solid var(--border)", padding: "20px 22px", animationDelay: `${i*0.08}s`, borderTop: `3px solid ${m.color}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <div style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--gray)" }}>{m.label}</div>
                <div style={{ width: 36, height: 36, background: "var(--offwhite)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={18} color={m.color} />
                </div>
              </div>
              <div style={{ fontSize: 26, fontWeight: 900, color: "var(--navy)", letterSpacing: "-0.03em", marginBottom: 6 }}>{m.value}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 600 }}>
                {m.up ? <ArrowUpRight size={14} color="var(--green)" /> : <ArrowDownRight size={14} color="var(--amber)" />}
                <span style={{ color: m.up ? "var(--green)" : "var(--amber)" }}>{m.change}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 20, marginBottom: 20 }}>

        {/* Recent orders */}
        <div style={{ background: "white", border: "1px solid var(--border)" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 style={{ fontSize: 15, fontWeight: 800, color: "var(--navy)" }}>Recent Orders</h2>
            <a href="/dashboard/orders" style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 700, color: "var(--blue)", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              View All <ArrowRight size={13} />
            </a>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table>
              <thead>
                <tr>
                  <th>Order</th><th>Commodity</th><th>Route</th><th>Buyer</th><th>Value (UGX)</th><th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map(o => (
                  <tr key={o.id}>
                    <td style={{ fontWeight: 700, color: "var(--blue)", fontSize: 13 }}>{o.id}</td>
                    <td style={{ fontSize: 13 }}>{o.commodity}</td>
                    <td>
                      <span style={{ fontSize: 11, fontWeight: 700, background: "var(--light)", color: "var(--blue)", padding: "2px 8px" }}>{o.route}</span>
                    </td>
                    <td style={{ fontSize: 13, color: "var(--gray)" }}>{o.buyer}</td>
                    <td style={{ fontSize: 13, fontWeight: 600 }}>{o.value}</td>
                    <td><span className={`badge ${o.statusClass}`}>{o.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Weekly chart */}
          <div style={{ background: "white", border: "1px solid var(--border)", padding: "18px 20px" }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "var(--navy)", marginBottom: 14 }}>Weekly Revenue (UGX M)</div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 80 }}>
              {weeklyBars.map((h, i) => (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                  <div style={{ width: "100%", background: i === 6 ? "var(--blue)" : "var(--light)", height: `${h}%`, transition: "height 0.4s ease", position: "relative" }}>
                    {i === 6 && <div style={{ position: "absolute", top: -18, left: "50%", transform: "translateX(-50%)", fontSize: 9, fontWeight: 800, color: "var(--blue)", whiteSpace: "nowrap" }}>9.8M</div>}
                  </div>
                  <div style={{ fontSize: 10, color: "var(--gray)", fontWeight: 600 }}>{weekLabels[i]}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Stock alerts */}
          <div style={{ background: "white", border: "1px solid var(--border)", padding: "18px 20px" }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "var(--navy)", marginBottom: 14 }}>Stock Alerts</div>
            {stockAlerts.map((s, i) => (
              <div key={i} style={{ marginBottom: i < stockAlerts.length - 1 ? 14 : 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "var(--navy)" }}>{s.item}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: s.color }}>{s.status}</span>
                </div>
                <div style={{ height: 6, background: "var(--offwhite)", position: "relative" }}>
                  <div style={{ width: `${s.level}%`, height: "100%", background: s.color, transition: "width 0.4s ease" }} />
                </div>
                <div style={{ fontSize: 11, color: "var(--gray)", marginTop: 2 }}>{s.level}% remaining</div>
              </div>
            ))}
          </div>

          {/* Trip summary */}
          <div style={{ background: "white", border: "1px solid var(--border)", padding: "18px 20px" }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "var(--navy)", marginBottom: 14 }}>Trips This Month</div>
            <div style={{ fontSize: 32, fontWeight: 900, color: "var(--blue)", letterSpacing: "-0.03em", marginBottom: 4 }}>8</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginTop: 12 }}>
              {[["4","Completed","var(--green)"],["2","In Transit","var(--amber)"],["2","Planned","var(--gray)"]].map(([n,l,c]) => (
                <div key={l} style={{ textAlign: "center", padding: "8px 4px", background: "var(--offwhite)" }}>
                  <div style={{ fontSize: 18, fontWeight: 900, color: c as string }}>{n}</div>
                  <div style={{ fontSize: 10, color: "var(--gray)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Commodity performance */}
      <div style={{ background: "white", border: "1px solid var(--border)" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)" }}>
          <h2 style={{ fontSize: 15, fontWeight: 800, color: "var(--navy)" }}>Commodity Performance — May 2026</h2>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table>
            <thead>
              <tr><th>Commodity</th><th>Revenue</th><th>Cost</th><th>Gross Profit</th><th>Margin</th><th>MoM</th><th>Valuation</th></tr>
            </thead>
            <tbody>
              {[
                ["🥑 Avocado (Hass)",  "8,400,000","4,872,000","3,528,000","42%","+18%","FIFO"],
                ["🫘 Dry Beans",        "7,100,000","4,615,000","2,485,000","35%","+12%","LIFO"],
                ["🐟 Dried Fish",       "5,200,000","3,224,000","1,976,000","38%","+9%", "LIFO"],
                ["🥔 Irish Potatoes",   "5,800,000","4,176,000","1,624,000","28%","+14%","FIFO"],
                ["🍌 Plantain/Matoke",  "4,100,000","3,075,000","1,025,000","25%","+11%","FIFO"],
                ["🧅 Onions",           "3,900,000","2,730,000","1,170,000","30%","+7%", "LIFO"],
                ["🥚 Eggs",             "4,900,000","3,430,000","1,470,000","30%","+5%", "FIFO"],
              ].map(([c,r,co,gp,m,mom,val]) => (
                <tr key={c}>
                  <td style={{ fontWeight: 700, color: "var(--navy)", fontSize: 13 }}>{c}</td>
                  <td style={{ fontSize: 13, fontWeight: 600 }}>{r}</td>
                  <td style={{ fontSize: 13, color: "var(--gray)" }}>{co}</td>
                  <td style={{ fontSize: 13, fontWeight: 700, color: "var(--green)" }}>+{gp}</td>
                  <td><span className="badge badge-success">{m}</span></td>
                  <td style={{ fontSize: 12, fontWeight: 700, color: "var(--green)" }}>{mom}</td>
                  <td><span className="badge badge-info">{val}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
