"use client";
export default function Footer() {
  return (
    <footer style={{ background: "var(--navy)", color: "rgba(255,255,255,0.7)", marginTop: "auto" }}>
      {/* Main footer */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "56px 24px 40px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 40 }}>
        {/* Brand */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div style={{ width: 36, height: 36, background: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 15, color: "var(--blue)" }}>BT</div>
            <div>
              <div style={{ color: "white", fontWeight: 800, fontSize: 16, letterSpacing: "-0.02em" }}>BELACA TRADING</div>
              <div style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>Uganda · Kenya</div>
            </div>
          </div>
          <p style={{ fontSize: 13, lineHeight: 1.7, maxWidth: 240 }}>Cross-border agricultural trade connecting Ugandan farmers to East African markets.</p>
          <div style={{ marginTop: 20, display: "flex", gap: 12 }}>
            <a href="#" style={{ width: 34, height: 34, background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", textDecoration: "none", fontSize: 13, fontWeight: 700 }}>f</a>
            <a href="#" style={{ width: 34, height: 34, background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", textDecoration: "none", fontSize: 13, fontWeight: 700 }}>in</a>
            <a href="#" style={{ width: 34, height: 34, background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", textDecoration: "none", fontSize: 13, fontWeight: 700 }}>tw</a>
          </div>
        </div>

        {/* Trade */}
        <div>
          <h4 style={{ color: "white", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>Trade</h4>
          {["Outbound: UG → KE", "Inbound: KE → UG", "Commodities", "Border Clearance", "Logistics Partners"].map(l => (
            <div key={l} style={{ marginBottom: 10 }}>
              <a href="#" style={{ color: "rgba(255,255,255,0.65)", textDecoration: "none", fontSize: 13, transition: "color 0.15s" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color="white"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color="rgba(255,255,255,0.65)"}
              >{l}</a>
            </div>
          ))}
        </div>

        {/* Company */}
        <div>
          <h4 style={{ color: "white", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>Company</h4>
          {["About Belaca", "Our Farmers", "Sustainability", "Careers", "Press"].map(l => (
            <div key={l} style={{ marginBottom: 10 }}>
              <a href="#" style={{ color: "rgba(255,255,255,0.65)", textDecoration: "none", fontSize: 13, transition: "color 0.15s" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color="white"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color="rgba(255,255,255,0.65)"}
              >{l}</a>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div>
          <h4 style={{ color: "white", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>Contact</h4>
          <div style={{ fontSize: 13, lineHeight: 2 }}>
            <div>📍 Mbale, Eastern Uganda</div>
            <div>📞 +256 700 000 000</div>
            <div>✉️ info@belacatrading.com</div>
            <div style={{ marginTop: 16 }}>
              <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.08em" }}>Kenya Office</div>
              <div>📞 +254 700 000 000</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)", padding: "16px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, fontSize: 12 }}>
          <span>© 2026 Belaca Trading Ltd. All rights reserved.</span>
          <div style={{ display: "flex", gap: 24 }}>
            {["Privacy Policy", "Terms of Use", "Cookie Policy"].map(l => (
              <a key={l} href="#" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
