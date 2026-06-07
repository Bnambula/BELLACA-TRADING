"use client";
import { useState } from "react";
import { Plus, Search, Filter, Download, Eye, Truck, CheckCircle, Clock, AlertCircle, XCircle } from "lucide-react";

const allOrders = [
  { id:"#ORD-0041", date:"27 May 26", commodity:"Avocado (Hass)",   qty:"300 kg",   route:"UG→KE", supplier:"Manafwa Farms",        buyer:"Kitale Wholesale",  value:"432,000",   status:"Delivered",   cert:"PH-2026-041" },
  { id:"#ORD-0042", date:"26 May 26", commodity:"Dry Beans",         qty:"400 kg",   route:"UG→KE", supplier:"Sironko Co-op",         buyer:"Eldoret Market",    value:"540,000",   status:"In Transit",  cert:"PH-2026-042" },
  { id:"#ORD-0043", date:"26 May 26", commodity:"Irish Potatoes",    qty:"400 kg",   route:"KE→UG", supplier:"Meru Highland Growers", buyer:"Mbale Market",      value:"720,000",   status:"At Border",   cert:"PH-2026-043" },
  { id:"#ORD-0044", date:"25 May 26", commodity:"Onions",            qty:"200 kg",   route:"KE→UG", supplier:"Kipkaren Farm",         buyer:"Tororo Market",     value:"440,000",   status:"Pending",     cert:"—" },
  { id:"#ORD-0040", date:"24 May 26", commodity:"Dried Fish",        qty:"80 kg",    route:"UG→KE", supplier:"Busia Fish Landing",    buyer:"Nairobi Gikomba",   value:"403,200",   status:"Delivered",   cert:"PH-2026-040" },
  { id:"#ORD-0039", date:"22 May 26", commodity:"Eggs",              qty:"50 trays", route:"UG→KE", supplier:"Busia Poultry",         buyer:"Kitale Retail",     value:"378,000",   status:"Delivered",   cert:"PH-2026-039" },
  { id:"#ORD-0038", date:"20 May 26", commodity:"Plantain/Matoke",   qty:"500 kg",   route:"UG→KE", supplier:"Mbale Farmers Co-op",   buyer:"Eldoret Market",    value:"324,000",   status:"Delivered",   cert:"PH-2026-038" },
  { id:"#ORD-0037", date:"19 May 26", commodity:"Tomatoes",          qty:"300 kg",   route:"KE→UG", supplier:"Kiambu Growers",        buyer:"Mbale Central",     value:"750,000",   status:"Delivered",   cert:"PH-2026-037" },
  { id:"#ORD-0036", date:"18 May 26", commodity:"Avocado (Hass)",   qty:"250 kg",   route:"UG→KE", supplier:"Manafwa Farms",         buyer:"Nairobi City Mkt",  value:"360,000",   status:"Delivered",   cert:"PH-2026-036" },
  { id:"#ORD-0035", date:"15 May 26", commodity:"Dry Beans",         qty:"350 kg",   route:"UG→KE", supplier:"Sironko Co-op",         buyer:"Kitale Wholesale",  value:"472,500",   status:"Cancelled",   cert:"—" },
];

const statusConfig: Record<string, { badge: string; icon: any; color: string }> = {
  "Delivered":   { badge: "badge-success", icon: CheckCircle, color: "var(--green)" },
  "In Transit":  { badge: "badge-warning", icon: Truck,       color: "var(--amber)" },
  "At Border":   { badge: "badge-info",    icon: Clock,       color: "var(--blue)"  },
  "Pending":     { badge: "badge-gray",    icon: Clock,       color: "var(--gray)"  },
  "Cancelled":   { badge: "badge-danger",  icon: XCircle,     color: "var(--red)"   },
};

const tabs = ["All","Pending","In Transit","At Border","Delivered","Cancelled"];

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const filtered = allOrders.filter(o => {
    const matchTab = activeTab === "All" || o.status === activeTab;
    const matchSearch = !search || o.id.toLowerCase().includes(search.toLowerCase()) || o.commodity.toLowerCase().includes(search.toLowerCase()) || o.buyer.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  return (
    <div className="animate-fade-in">
      {/* Page header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24, flexWrap: "wrap", gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 900, color: "var(--navy)", marginBottom: 4 }}>Orders</h1>
          <p style={{ fontSize: 14, color: "var(--gray)" }}>{allOrders.length} total orders · {allOrders.filter(o=>o.status==="In Transit").length} in transit</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn-secondary" style={{ fontSize: 12, padding: "9px 16px" }}><Download size={14} /> Export</button>
          <button className="btn-primary" onClick={() => setShowModal(true)} style={{ fontSize: 13, padding: "10px 20px" }}><Plus size={15} /> New Order</button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 0, marginBottom: 20, borderBottom: "2px solid var(--border)", overflowX: "auto" }}>
        {tabs.map(t => (
          <button key={t} onClick={() => setActiveTab(t)} style={{
            padding: "10px 18px", fontSize: 13, fontWeight: activeTab===t ? 800 : 500, background: "none", border: "none", cursor: "pointer",
            color: activeTab===t ? "var(--blue)" : "var(--gray)", borderBottom: activeTab===t ? "3px solid var(--blue)" : "3px solid transparent",
            marginBottom: -2, whiteSpace: "nowrap", letterSpacing: "0.01em", transition: "all 0.15s"
          }}>
            {t}
            {t !== "All" && <span style={{ marginLeft: 6, fontSize: 11, background: activeTab===t?"var(--blue)":"var(--border)", color: activeTab===t?"white":"var(--gray)", padding: "1px 6px", borderRadius: 10, fontWeight: 800 }}>{allOrders.filter(o=>o.status===t).length}</span>}
          </button>
        ))}
      </div>

      {/* Search */}
      <div style={{ position: "relative", maxWidth: 360, marginBottom: 20 }}>
        <Search size={15} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--gray)" }} />
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by order, commodity, buyer…" style={{ paddingLeft: 38, height: 38, fontSize: 13 }} />
      </div>

      {/* Table */}
      <div style={{ background: "white", border: "1px solid var(--border)" }}>
        <div style={{ overflowX: "auto" }}>
          <table>
            <thead>
              <tr><th>Order ID</th><th>Date</th><th>Commodity</th><th>Qty</th><th>Route</th><th>Supplier</th><th>Buyer</th><th>Value (UGX)</th><th>Cert.</th><th>Status</th><th>Action</th></tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr><td colSpan={11} style={{ textAlign: "center", padding: "40px", color: "var(--gray)", fontStyle: "italic" }}>No orders match your filter.</td></tr>
              )}
              {filtered.map(o => {
                const cfg = statusConfig[o.status] || statusConfig["Pending"];
                const Icon = cfg.icon;
                return (
                  <tr key={o.id}>
                    <td style={{ fontWeight: 800, color: "var(--blue)", fontSize: 13, whiteSpace: "nowrap" }}>{o.id}</td>
                    <td style={{ fontSize: 12, color: "var(--gray)", whiteSpace: "nowrap" }}>{o.date}</td>
                    <td style={{ fontWeight: 600, fontSize: 13, whiteSpace: "nowrap" }}>{o.commodity}</td>
                    <td style={{ fontSize: 13, whiteSpace: "nowrap" }}>{o.qty}</td>
                    <td><span style={{ fontSize: 11, fontWeight: 800, background: o.route==="UG→KE"?"var(--light)":"#E6F1FB", color: o.route==="UG→KE"?"var(--blue)":"var(--navy)", padding: "2px 8px", letterSpacing: "0.04em" }}>{o.route}</span></td>
                    <td style={{ fontSize: 12, color: "var(--gray)" }}>{o.supplier}</td>
                    <td style={{ fontSize: 13 }}>{o.buyer}</td>
                    <td style={{ fontSize: 13, fontWeight: 600, textAlign: "right" }}>{o.value}</td>
                    <td style={{ fontSize: 12, color: "var(--gray)", fontFamily: "monospace" }}>{o.cert}</td>
                    <td>
                      <span className={`badge ${cfg.badge}`} style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                        <Icon size={10} /> {o.status}
                      </span>
                    </td>
                    <td>
                      <button className="btn-secondary" style={{ fontSize: 11, padding: "4px 12px", display: "flex", alignItems: "center", gap: 4 }}>
                        <Eye size={12} /> View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div style={{ padding: "12px 16px", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12, color: "var(--gray)" }}>
          <span>Showing {filtered.length} of {allOrders.length} orders</span>
          <div style={{ display: "flex", gap: 4 }}>
            {[1,2,3].map(p => <button key={p} style={{ width: 30, height: 30, border: "1px solid var(--border)", background: p===1?"var(--blue)":"white", color: p===1?"white":"var(--gray)", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>{p}</button>)}
          </div>
        </div>
      </div>

      {/* New Order Modal */}
      {showModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,28,92,0.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 24, backdropFilter: "blur(3px)" }} onClick={e => { if (e.target === e.currentTarget) setShowModal(false); }}>
          <div className="animate-fade-up" style={{ background: "white", width: "100%", maxWidth: 560, maxHeight: "90vh", overflowY: "auto" }}>
            <div style={{ background: "var(--navy)", padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 style={{ color: "white", fontSize: 17, fontWeight: 800 }}>Create New Order</h2>
              <button onClick={() => setShowModal(false)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.6)", cursor: "pointer", fontSize: 20, lineHeight: 1 }}>×</button>
            </div>
            <div style={{ padding: 24 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                <div><label>Route</label>
                  <select><option>Uganda → Kenya</option><option>Kenya → Uganda</option></select></div>
                <div><label>Commodity</label>
                  <select><option>Avocado (Hass)</option><option>Dry Beans</option><option>Plantain</option><option>Eggs</option><option>Dried Fish</option><option>Irish Potatoes</option><option>Onions</option><option>Tomatoes</option></select></div>
                <div><label>Quantity (kg / units)</label><input type="number" placeholder="e.g. 300" /></div>
                <div><label>Unit Cost (UGX)</label><input type="number" placeholder="e.g. 500" /></div>
                <div><label>Supplier</label>
                  <select><option>Manafwa Farms</option><option>Sironko Co-op</option><option>Busia Fish Landing</option><option>Busia Poultry</option><option>Meru Highland</option><option>Kipkaren Farm</option></select></div>
                <div><label>Buyer / Market</label><input type="text" placeholder="e.g. Kitale Wholesale" /></div>
                <div><label>Departure Date</label><input type="date" /></div>
                <div><label>Phytosanitary Cert No.</label><input type="text" placeholder="PH-2026-XXX" /></div>
              </div>
              <div style={{ marginBottom: 16 }}><label>Notes</label><textarea rows={3} placeholder="Any special handling, buyer instructions…" /></div>
              <div style={{ display: "flex", gap: 12 }}>
                <button className="btn-primary" style={{ flex: 1, justifyContent: "center" }}>Create Order</button>
                <button className="btn-secondary" onClick={() => setShowModal(false)} style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
