"use client";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ArrowRight, TrendingUp, Shield, Truck, Globe, ChevronRight, CheckCircle } from "lucide-react";

const commodities = [
  { name: "Hass Avocado", origin: "Manafwa, UG", dest: "Nairobi, KE", margin: "42%", icon: "🥑", trend: "+18%" },
  { name: "Dry Beans",    origin: "Sironko, UG", dest: "Eldoret, KE",  margin: "35%", icon: "🫘", trend: "+12%" },
  { name: "Dried Fish",   origin: "Busia, UG",   dest: "Gikomba, KE",  margin: "38%", icon: "🐟", trend: "+9%"  },
  { name: "Irish Potatoes",origin:"Meru, KE",    dest: "Mbale, UG",    margin: "28%", icon: "🥔", trend: "+14%" },
  { name: "Onions",       origin: "Eldoret, KE", dest: "Tororo, UG",   margin: "30%", icon: "🧅", trend: "+7%"  },
  { name: "Plantain",     origin: "Mbale, UG",   dest: "Kitale, KE",   margin: "25%", icon: "🍌", trend: "+11%" },
];

const stats = [
  { value: "UGX 67M+", label: "Projected Year 1 Profit", icon: <TrendingUp size={24} /> },
  { value: "8",         label: "Trips Per Month",          icon: <Truck size={24} /> },
  { value: "6",         label: "Commodity Categories",     icon: <Globe size={24} /> },
  { value: "100%",      label: "Dual-Flow Route Coverage", icon: <Shield size={24} /> },
];

const tickerItems = [
  "Avocado: UGX 500/kg → KES 100",
  "Dry Beans: UGX 1,020/kg → KES 75",
  "Irish Potatoes: KES 28 → UGX 1,800/kg",
  "Onions: KES 32 → UGX 2,200/kg",
  "Eggs: UGX 10,500/tray → KES 420",
  "Dried Fish: UGX 5,100/kg → KES 280",
];

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      {/* Live Ticker */}
      <div style={{ background: "var(--sky)", color: "var(--navy)", overflow: "hidden", borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ background: "var(--navy)", color: "white", padding: "7px 18px", fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", flexShrink: 0, zIndex: 2 }}>
            LIVE RATES
          </div>
          <div style={{ overflow: "hidden", flex: 1, position: "relative" }}>
            <div className="ticker-track" style={{ padding: "7px 0" }}>
              {[...tickerItems, ...tickerItems].map((item, i) => (
                <span key={i} style={{ padding: "0 32px", fontSize: 12, fontWeight: 600, whiteSpace: "nowrap", borderRight: "1px solid rgba(0,28,92,0.2)" }}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* HERO */}
      <section style={{ background: "var(--blue)", position: "relative", overflow: "hidden", minHeight: 540 }}>
        {/* Geometric background pattern — KLM style */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <div style={{ position: "absolute", right: -80, top: -80, width: 500, height: 500, border: "1px solid rgba(255,255,255,0.06)", transform: "rotate(15deg)" }} />
          <div style={{ position: "absolute", right: 40, top: 40, width: 380, height: 380, border: "1px solid rgba(255,255,255,0.05)", transform: "rotate(15deg)" }} />
          <div style={{ position: "absolute", right: 140, bottom: -100, width: 300, height: 300, background: "rgba(0,180,216,0.08)" }} />
          <div style={{ position: "absolute", left: -60, bottom: -60, width: 400, height: 200, border: "1px solid rgba(255,255,255,0.04)" }} />
        </div>

        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 24px", position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: 700 }}>
            <div className="animate-fade-up" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.12)", padding: "6px 14px", marginBottom: 24, fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.9)" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00D4A0", display: "inline-block" }} />
              Uganda · Kenya Trade Corridor
            </div>
            <h1 className="animate-fade-up delay-100" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, color: "white", lineHeight: 1.05, marginBottom: 24, letterSpacing: "-0.03em" }}>
              Fresh Produce.<br />Smart Trade.<br />
              <span style={{ color: "var(--cyan)" }}>Two Countries.</span>
            </h1>
            <p className="animate-fade-up delay-200" style={{ fontSize: "clamp(15px, 2vw, 18px)", color: "rgba(255,255,255,0.8)", lineHeight: 1.7, maxWidth: 520, marginBottom: 36 }}>
              Belaca Trading operates the Mbale–Busia–Nairobi dual-flow agricultural corridor. We move Ugandan produce outbound and return fully loaded with Kenyan goods.
            </p>
            <div className="animate-fade-up delay-300" style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <a href="/login" className="btn-white" style={{ fontSize: 14, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}>
                Access Portal <ArrowRight size={16} />
              </a>
              <a href="/about" className="btn-secondary" style={{ borderColor: "rgba(255,255,255,0.5)", color: "white", fontSize: 14, textDecoration: "none" }}>
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section style={{ background: "var(--navy)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
          {stats.map((s, i) => (
            <div key={i} className="animate-fade-up" style={{ padding: "28px 20px", borderRight: "1px solid rgba(255,255,255,0.08)", textAlign: "center", animationDelay: `${i * 0.1}s` }}>
              <div style={{ color: "var(--sky)", marginBottom: 8, display: "flex", justifyContent: "center" }}>{s.icon}</div>
              <div style={{ fontSize: 28, fontWeight: 900, color: "white", letterSpacing: "-0.03em" }}>{s.value}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 4, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Trade Route Visual */}
      <section style={{ background: "var(--offwhite)", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", color: "var(--navy)", marginBottom: 12 }}>Dual-Flow Trade Route</h2>
            <p style={{ color: "var(--gray)", maxWidth: 520, margin: "0 auto", fontSize: 15 }}>Every journey earns twice — outbound with Ugandan produce, return with Kenyan goods. Zero empty trucks.</p>
          </div>

          {/* Route diagram */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, flexWrap: "wrap", marginBottom: 60 }}>
            {[
              { label: "Mbale / Sironko", sub: "Farm Gate Sourcing", flag: "🇺🇬", color: "var(--blue)" },
              null,
              { label: "Busia OSBP", sub: "Border Clearance", flag: "🛃", color: "var(--sky)" },
              null,
              { label: "Eldoret / Kitale", sub: "Phase 1 Markets", flag: "🇰🇪", color: "var(--navy)" },
              null,
              { label: "Nairobi", sub: "Phase 2 Markets", flag: "🇰🇪", color: "var(--navy)" },
            ].map((node, i) => {
              if (node === null) return (
                <div key={i} style={{ display: "flex", alignItems: "center", flexDirection: "column", gap: 4, margin: "0 8px" }}>
                  <div style={{ color: "var(--blue)", fontSize: 18, fontWeight: 900 }}>→</div>
                  <div style={{ color: "rgba(0,61,165,0.4)", fontSize: 18, fontWeight: 900 }}>←</div>
                </div>
              );
              return (
                <div key={i} style={{ background: "white", border: `2px solid ${node.color}`, padding: "16px 20px", textAlign: "center", minWidth: 140, flex: "0 0 auto" }}>
                  <div style={{ fontSize: 28, marginBottom: 6 }}>{node.flag}</div>
                  <div style={{ fontWeight: 800, fontSize: 13, color: node.color, letterSpacing: "-0.01em" }}>{node.label}</div>
                  <div style={{ fontSize: 11, color: "var(--gray)", marginTop: 3, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>{node.sub}</div>
                </div>
              );
            })}
          </div>

          {/* Outbound / Inbound */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <div style={{ background: "white", border: "1px solid var(--border)", padding: "28px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <div style={{ background: "var(--blue)", width: 4, height: 32 }} />
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--gray)" }}>Outbound</div>
                  <div style={{ fontWeight: 800, color: "var(--navy)", fontSize: 17 }}>Uganda → Kenya</div>
                </div>
              </div>
              {["Hass Avocado — Manafwa farms", "Dry Beans — Sironko highlands", "Plantain — Mbale district", "Eggs — Busia poultry", "Dried Fish — Busia landings"].map(i => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: "1px solid var(--border)", fontSize: 14 }}>
                  <CheckCircle size={15} color="var(--green)" />
                  <span>{i}</span>
                </div>
              ))}
            </div>
            <div style={{ background: "white", border: "1px solid var(--border)", padding: "28px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <div style={{ background: "var(--sky)", width: 4, height: 32 }} />
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--gray)" }}>Inbound Return Load</div>
                  <div style={{ fontWeight: 800, color: "var(--navy)", fontSize: 17 }}>Kenya → Uganda</div>
                </div>
              </div>
              {["Tomatoes — Kiambu & Rift Valley", "Irish Potatoes — Meru County", "Onions — Kipkaren, Eldoret", "Seasonal vegetables", "Packaged dry goods"].map(i => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: "1px solid var(--border)", fontSize: 14 }}>
                  <CheckCircle size={15} color="var(--sky)" />
                  <span>{i}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Commodities grid */}
      <section style={{ padding: "80px 24px", background: "white" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40, flexWrap: "wrap", gap: 16 }}>
            <div>
              <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: "var(--navy)", marginBottom: 8 }}>Active Commodities</h2>
              <p style={{ color: "var(--gray)", fontSize: 15 }}>Current trade inventory with live margin data</p>
            </div>
            <a href="/commodities" className="btn-secondary" style={{ fontSize: 13, textDecoration: "none" }}>View All <ArrowRight size={14} /></a>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
            {commodities.map((c, i) => (
              <div key={i} className="card animate-fade-up" style={{ padding: 0, animationDelay: `${i * 0.08}s`, cursor: "pointer" }}>
                <div style={{ background: "var(--blue)", padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 32 }}>{c.icon}</span>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 22, fontWeight: 900, color: "white" }}>{c.margin}</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.65)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Gross Margin</div>
                  </div>
                </div>
                <div style={{ padding: "20px 24px" }}>
                  <h3 style={{ fontSize: 16, fontWeight: 800, color: "var(--navy)", marginBottom: 12 }}>{c.name}</h3>
                  <div style={{ display: "flex", gap: 8, marginBottom: 12, fontSize: 12 }}>
                    <span style={{ background: "var(--light)", padding: "3px 10px", fontWeight: 600, color: "var(--blue)" }}>🇺🇬 {c.origin}</span>
                    <span style={{ color: "var(--gray)" }}>→</span>
                    <span style={{ background: "var(--light)", padding: "3px 10px", fontWeight: 600, color: "var(--navy)" }}>🇰🇪 {c.dest}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 12, borderTop: "1px solid var(--border)" }}>
                    <span style={{ fontSize: 12, color: "var(--gray)", fontWeight: 600 }}>Month on Month</span>
                    <span style={{ fontSize: 13, fontWeight: 800, color: "var(--green)" }}>{c.trend}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{ background: "var(--navy)", padding: "72px 24px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: -100, top: -100, width: 400, height: 400, border: "1px solid rgba(255,255,255,0.05)", transform: "rotate(20deg)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr auto", gap: 40, alignItems: "center", flexWrap: "wrap" }}>
          <div>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", color: "white", marginBottom: 12 }}>Ready to trade with us?</h2>
            <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 16 }}>Log in to the Belaca Trading portal to manage orders, track shipments, and view real-time financials.</p>
          </div>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <a href="/login" className="btn-white" style={{ textDecoration: "none", whiteSpace: "nowrap" }}>Access Portal</a>
            <a href="/contact" className="btn-secondary" style={{ borderColor: "rgba(255,255,255,0.3)", color: "rgba(255,255,255,0.9)", textDecoration: "none", whiteSpace: "nowrap" }}>Contact Us</a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
