"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Globe } from "lucide-react";

const nav = [
  { label: "Trade Routes", href: "/routes" },
  { label: "Commodities", href: "/commodities" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      {/* Top utility bar */}
      <div style={{ background: "var(--navy)", color: "rgba(255,255,255,0.75)", fontSize: 12, fontWeight: 500, letterSpacing: "0.05em" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "6px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Globe size={12} /> Uganda · Kenya · East Africa</span>
          <div style={{ display: "flex", gap: 20 }}>
            <a href="/login" style={{ color: "rgba(255,255,255,0.75)", textDecoration: "none", textTransform: "uppercase" }}>Portal Login</a>
            <span>|</span>
            <span>+256 700 000 000</span>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <header style={{
        position: "sticky", top: 0, zIndex: 100,
        background: scrolled ? "rgba(0,61,165,0.97)" : "var(--blue)",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.25)" : "none",
        transition: "all 0.25s ease",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", height: 68, gap: 40 }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none", flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 38, height: 38, background: "white", display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 900, fontSize: 16, color: "var(--blue)", letterSpacing: -1, fontFamily: "Helvetica Neue, sans-serif"
              }}>BT</div>
              <div>
                <div style={{ color: "white", fontWeight: 800, fontSize: 17, letterSpacing: "-0.02em", lineHeight: 1.1 }}>BELACA</div>
                <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 500 }}>TRADING LTD</div>
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav style={{ display: "flex", gap: 4, flex: 1 }} className="hidden md:flex">
            {nav.map(n => (
              <a key={n.href} href={n.href} style={{
                color: "rgba(255,255,255,0.88)", textDecoration: "none", padding: "8px 16px",
                fontSize: 14, fontWeight: 600, letterSpacing: "0.02em", textTransform: "uppercase",
                transition: "all 0.15s", borderBottom: "3px solid transparent",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color="#fff"; (e.currentTarget as HTMLElement).style.borderBottomColor="#fff"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color="rgba(255,255,255,0.88)"; (e.currentTarget as HTMLElement).style.borderBottomColor="transparent"; }}
              >{n.label}</a>
            ))}
          </nav>

          {/* CTA */}
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <a href="/login" className="btn-white hidden md:inline-flex" style={{ fontSize: 13, padding: "9px 22px", letterSpacing: "0.05em" }}>
              Sign In
            </a>
            <button onClick={() => setOpen(!open)} className="md:hidden" style={{ background: "none", border: "none", color: "white", cursor: "pointer", padding: 4 }} aria-label="Menu">
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div style={{ background: "var(--navy)", padding: "8px 0 16px", borderTop: "1px solid rgba(255,255,255,0.1)" }} className="animate-slide-down">
            {nav.map(n => (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)} style={{
                display: "block", color: "rgba(255,255,255,0.88)", textDecoration: "none",
                padding: "13px 24px", fontSize: 15, fontWeight: 600, borderBottom: "1px solid rgba(255,255,255,0.07)"
              }}>{n.label}</a>
            ))}
            <div style={{ padding: "16px 24px" }}>
              <a href="/login" className="btn-white" style={{ fontSize: 13, display: "inline-block", textAlign: "center", width: "100%", padding: "12px", textDecoration: "none" }}>Sign In to Portal</a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
