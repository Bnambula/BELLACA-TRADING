"use client";
const layers = [
  { color:"var(--blue)", icon:"👤", title:"Authentication & Users", tables:[
    { name:"users", fields:"id, email, password_hash, role_id, is_active, twofa_secret, last_login, failed_attempts, locked_until, created_at" },
    { name:"roles", fields:"id, name, slug, description, created_at" },
    { name:"permissions", fields:"id, module, action, description" },
    { name:"role_permissions", fields:"role_id, permission_id — junction table" },
    { name:"sessions", fields:"id, user_id, token_hash, ip_address, device_fingerprint, expires_at, revoked_at" },
    { name:"login_attempts", fields:"id, email, ip_address, success, attempted_at" },
  ]},
  { color:"var(--sky)", icon:"📦", title:"Orders & Procurement", tables:[
    { name:"orders", fields:"id, order_no, type[inbound/outbound], status, route, created_by, created_at, updated_at" },
    { name:"order_items", fields:"id, order_id, commodity_id, qty_kg, unit_cost, currency, notes" },
    { name:"purchase_orders", fields:"id, supplier_id, order_id, total_ugx, payment_status, due_date" },
    { name:"border_clearances", fields:"id, order_id, border_post, cert_no, fees_ugx, cleared_by, cleared_at" },
    { name:"trips", fields:"id, order_ids[], vehicle_id, driver_id, route, departed_at, arrived_at, returned_at, fuel_cost" },
  ]},
  { color:"var(--amber)", icon:"🗂", title:"Inventory — FIFO & LIFO", tables:[
    { name:"commodities", fields:"id, name, category, unit, shelf_life_days, valuation_method[FIFO/LIFO], reorder_threshold" },
    { name:"inventory_batches", fields:"id, commodity_id, qty_in, unit_cost, currency, date_received, expiry_date, batch_no, supplier_id" },
    { name:"inventory_movements", fields:"id, batch_id, movement_type[in/out/adjust/spoilage/reserve], qty, order_id, moved_by, moved_at" },
    { name:"stock_levels", fields:"id, commodity_id, qty_available, qty_reserved, last_updated — MATERIALISED VIEW" },
    { name:"spoilage_log", fields:"id, batch_id, commodity_id, qty_lost, reason, financial_impact_ugx, logged_by, logged_at" },
  ]},
  { color:"var(--green)", icon:"🚚", title:"Suppliers & Buyers", tables:[
    { name:"suppliers", fields:"id, name, country_code, district, contact_name, phone, email, commodities[], payment_terms, rating, is_active" },
    { name:"buyers", fields:"id, name, market_name, city, country_code, contact_name, phone, payment_terms, credit_limit, is_active" },
    { name:"supplier_payments", fields:"id, supplier_id, amount, currency, payment_method, reference, paid_at, order_id, recorded_by" },
  ]},
  { color:"#C0392B", icon:"💰", title:"Financials", tables:[
    { name:"invoices", fields:"id, invoice_no, order_id, buyer_id, amount, currency, status[paid/partial/unpaid], issued_at, due_at" },
    { name:"payments_received", fields:"id, invoice_id, amount, currency, fx_rate_ugx, payment_method, received_at, recorded_by" },
    { name:"expenses", fields:"id, category, description, amount, currency, trip_id, order_id, recorded_by, expense_date" },
    { name:"fx_rates", fields:"id, from_currency, to_currency, rate, rate_date, source" },
    { name:"pl_snapshots", fields:"id, period_type[week/month/quarter], period_start, period_end, revenue, cogs, gross_profit, expenses, net_profit, generated_at" },
  ]},
  { color:"var(--gray)", icon:"🔒", title:"Audit & Security", tables:[
    { name:"audit_log", fields:"id, user_id, action, table_name, record_id, old_values_json, new_values_json, ip_address, timestamp — APPEND-ONLY, no DELETE grant" },
    { name:"security_events", fields:"id, event_type, severity[low/medium/high], user_id, ip_address, details_json, created_at, resolved_at" },
    { name:"report_schedules", fields:"id, report_type, frequency[weekly/monthly/quarterly], recipients[], format[PDF/Excel], last_run, next_run, is_active" },
  ]},
];

const principles = [
  ["Soft deletes", "No row is ever hard-deleted. All tables carry a deleted_at timestamp. Audit integrity is always preserved."],
  ["Row-level security (RLS)", "PostgreSQL RLS policies enforce per-user data visibility at the DB layer — not just the application layer."],
  ["FIFO / LIFO inventory", "batch_id on every movement means cost basis can be calculated under either method at report time without data migration."],
  ["Append-only audit log", "audit_log has no UPDATE or DELETE grants — even for the superuser app role. Entries can never be altered."],
  ["FX normalisation", "All financial totals stored in UGX equivalent. Original currency and exchange rate preserved for full audit trail."],
  ["Materialised stock view", "stock_levels is a materialised view refreshed on every inventory_movement insert — O(1) read, consistent writes."],
  ["Session token hashing", "JWT refresh tokens stored as bcrypt hashes — raw tokens never stored. Compromised DB cannot replay sessions."],
  ["Parameterised queries only", "ORM enforces parameterised queries throughout. Zero raw SQL in application code — SQL injection structurally impossible."],
];

export default function DatabasePage() {
  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom:24 }}>
        <h1 style={{ fontSize:22, fontWeight:900, color:"var(--navy)", marginBottom:4 }}>Database Schema</h1>
        <p style={{ fontSize:14, color:"var(--gray)" }}>Production-ready relational schema · PostgreSQL 16 · 6 domain layers · 22 tables</p>
      </div>

      <div style={{ padding:"14px 16px", background:"#E6F1FB", border:"1px solid var(--blue)", marginBottom:24, fontSize:13, color:"var(--navy)", lineHeight:1.7 }}>
        <strong>Recommended stack:</strong> PostgreSQL 16 (primary DB) · Redis 7 (session cache + rate-limit counters) · Node.js 20 + Prisma ORM (API) · Next.js 14 (frontend) · Vercel (hosting) · Supabase or Railway (managed Postgres)
      </div>

      {layers.map(layer => (
        <div key={layer.title} style={{ background:"white", border:"1px solid var(--border)", borderLeft:`4px solid ${layer.color}`, marginBottom:16 }}>
          <div style={{ padding:"14px 20px", borderBottom:"1px solid var(--border)", display:"flex", alignItems:"center", gap:10, background:"var(--offwhite)" }}>
            <span style={{ fontSize:20 }}>{layer.icon}</span>
            <span style={{ fontWeight:800, color:"var(--navy)", fontSize:14 }}>{layer.title}</span>
            <span style={{ marginLeft:"auto", fontSize:11, fontWeight:700, color:"var(--gray)" }}>{layer.tables.length} tables</span>
          </div>
          <div style={{ padding:"14px 20px", display:"flex", flexDirection:"column", gap:10 }}>
            {layer.tables.map(t => (
              <div key={t.name} style={{ padding:"10px 14px", background:"var(--offwhite)", fontFamily:"'Courier New', monospace", fontSize:12, lineHeight:1.7, wordBreak:"break-word" }}>
                <span style={{ fontWeight:800, color:layer.color, fontSize:13 }}>{t.name}</span>
                <span style={{ color:"var(--gray)" }}> ({t.fields})</span>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div style={{ background:"white", border:"1px solid var(--border)" }}>
        <div style={{ padding:"14px 20px", borderBottom:"2px solid var(--blue)", fontWeight:800, color:"var(--navy)", fontSize:15 }}>Key Design Principles</div>
        <div style={{ padding:"0 20px" }}>
          {principles.map(([k,v], i) => (
            <div key={k as string} style={{ display:"flex", gap:20, padding:"13px 0", borderBottom: i < principles.length - 1 ? "1px solid var(--border)" : "none", fontSize:13, flexWrap:"wrap" }}>
              <span style={{ fontWeight:800, color:"var(--blue)", minWidth:200, flexShrink:0 }}>{k}</span>
              <span style={{ color:"var(--gray)", flex:1, lineHeight:1.65 }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
