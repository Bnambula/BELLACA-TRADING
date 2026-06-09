"use client";
const LAYERS = [
  { color:"#003DA5", icon:"👤", title:"Authentication & Users", tables:[
    { n:"users",              f:"id, email, password_hash, role_id, is_active, twofa_secret, last_login, failed_attempts, locked_until, created_at" },
    { n:"roles",              f:"id, name, slug, description" },
    { n:"permissions",        f:"id, module, action, description" },
    { n:"role_permissions",   f:"role_id, permission_id — junction table" },
    { n:"sessions",           f:"id, user_id, token_hash, ip_address, device_fingerprint, expires_at, revoked_at" },
    { n:"login_attempts",     f:"id, email, ip_address, success, attempted_at" },
  ]},
  { color:"#009FE3", icon:"📦", title:"Orders & Procurement", tables:[
    { n:"orders",             f:"id, order_no, type[inbound/outbound], status, route, created_by, created_at" },
    { n:"order_items",        f:"id, order_id, commodity_id, qty_kg, unit_cost, currency, notes" },
    { n:"purchase_orders",    f:"id, supplier_id, order_id, total_ugx, payment_status, due_date" },
    { n:"border_clearances",  f:"id, order_id, border_post, cert_no, fees_ugx, cleared_by, cleared_at" },
    { n:"trips",              f:"id, order_ids[], vehicle_id, driver_id, route, departed_at, returned_at, fuel_cost" },
  ]},
  { color:"#D97706", icon:"🗂", title:"Inventory — FIFO & LIFO", tables:[
    { n:"commodities",        f:"id, name, category, unit, shelf_life_days, valuation_method[FIFO/LIFO], reorder_threshold" },
    { n:"inventory_batches",  f:"id, commodity_id, qty_in, unit_cost, currency, date_received, expiry_date, batch_no, supplier_id" },
    { n:"inventory_movements",f:"id, batch_id, movement_type[in/out/adjust/spoilage], qty, order_id, moved_by, moved_at" },
    { n:"stock_levels",       f:"commodity_id, qty_available, qty_reserved, last_updated — MATERIALISED VIEW" },
    { n:"spoilage_log",       f:"id, batch_id, qty_lost, reason, financial_impact_ugx, logged_by, logged_at" },
  ]},
  { color:"#166534", icon:"🚚", title:"Suppliers & Buyers", tables:[
    { n:"suppliers",          f:"id, name, country_code, district, contact_name, phone, email, payment_terms, rating, is_active" },
    { n:"buyers",             f:"id, name, market_name, city, country_code, contact_name, payment_terms, credit_limit, is_active" },
    { n:"supplier_payments",  f:"id, supplier_id, amount, currency, payment_method, reference, paid_at, order_id" },
  ]},
  { color:"#DC2626", icon:"💰", title:"Financials", tables:[
    { n:"invoices",           f:"id, invoice_no, order_id, buyer_id, amount, currency, status[paid/partial/unpaid], issued_at, due_at" },
    { n:"payments_received",  f:"id, invoice_id, amount, currency, fx_rate_ugx, payment_method, received_at" },
    { n:"expenses",           f:"id, category, description, amount, currency, trip_id, recorded_by, expense_date" },
    { n:"fx_rates",           f:"id, from_currency, to_currency, rate, rate_date" },
    { n:"pl_snapshots",       f:"id, period_type[week/month/quarter], period_start, period_end, revenue, cogs, net_profit, generated_at" },
  ]},
  { color:"#374151", icon:"🔒", title:"Audit & Security", tables:[
    { n:"audit_log",          f:"id, user_id, action, table_name, record_id, old_json, new_json, ip_address, timestamp — APPEND-ONLY" },
    { n:"security_events",    f:"id, event_type, severity, user_id, ip_address, details_json, created_at, resolved_at" },
    { n:"report_schedules",   f:"id, report_type, frequency, recipients[], format[PDF/Excel], last_run, next_run" },
  ]},
];
export default function DatabasePage() {
  return (
    <div className="fade-in">
      <h1 style={{ fontSize:20,fontWeight:900,color:"#001C5C",marginBottom:4 }}>Database Schema</h1>
      <p style={{ fontSize:13,color:"var(--gray)",marginBottom:16 }}>PostgreSQL 16 · Redis 7 · 6 domain layers · 22 tables</p>
      <div style={{ padding:"12px 14px",background:"#E0F2FE",border:"1px solid #0369A1",marginBottom:20,fontSize:13,color:"#0C4A6E" }}>
        <strong>Recommended stack:</strong> PostgreSQL 16 · Redis 7 (session cache) · Node.js 20 + Prisma ORM · Next.js 14 · Vercel + Supabase or Railway
      </div>
      {LAYERS.map(l=>(
        <div key={l.title} className="card" style={{ marginBottom:14,borderLeft:`4px solid ${l.color}` }}>
          <div style={{ padding:"12px 16px",borderBottom:"1px solid var(--border)",display:"flex",alignItems:"center",gap:10,background:"var(--off)" }}>
            <span style={{ fontSize:18 }}>{l.icon}</span>
            <span style={{ fontWeight:800,color:"#001C5C",fontSize:13 }}>{l.title}</span>
            <span style={{ marginLeft:"auto",fontSize:11,color:"var(--gray)",fontWeight:600 }}>{l.tables.length} tables</span>
          </div>
          <div style={{ padding:"12px 16px",display:"flex",flexDirection:"column",gap:8 }}>
            {l.tables.map(t=>(
              <div key={t.n} style={{ padding:"9px 12px",background:"var(--off)",fontFamily:"monospace",fontSize:12,lineHeight:1.65,wordBreak:"break-word" }}>
                <span style={{ fontWeight:800,color:l.color,fontSize:13 }}>{t.n}</span>
                <span style={{ color:"var(--gray)" }}> ({t.f})</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
