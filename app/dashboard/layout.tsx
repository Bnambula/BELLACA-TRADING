"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, FileText, Package, Truck, DollarSign,
  BarChart2, Users, Shield, Database, Menu, X, LogOut,
  Bell, Search, ChevronRight
} from "lucide-react";

const navGroups = [
  {
    label: "Main",
    items: [
      { href: "/dashboard",            label: "Dashboard",      icon: LayoutDashboard },
      { href: "/dashboard/orders",     label: "Orders",         icon: FileText,   badge: "4" },
      { href: "/dashboard/inventory",  label: "Inventory",      icon: Package },
      { href: "/dashboard/suppliers",  label: "Suppliers",      icon: Truck },
    ]
  },
  {
    label: "Finance",
    items: [
      { href: "/dashboard/sales",      label: "Sales",          icon: DollarSign },
      { href: "/dashboard/financials", label: "Financials",     icon: BarChart2 },
      { href: "/dashboard/reports",    label: "Reports",        icon: BarChart2 },
    ]
  },
  {
    label: "Admin",
    items: [
      { href: "/dashboard/users",      label: "Users & Roles",  icon: Users },
      { href: "/dashboard/security",   label: "Security",       icon: Shield },
      { href: "/dashboard/database",   label: "DB Schema",      icon: Database },
    ]
  },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sideOpen, setSideOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--offwhite)", fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif" }}>
      {/* Mobile overlay */}
      {sideOpen && (
        <div onClick={() => setSideOpen(false)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,28,92,0.4)", zIndex: 40, backdropFilter: "blur(2px)" }} />
      )}

      {/* Sidebar */}
      <aside style={{
        width: 236, background: "var(--navy)", display: "flex", flexDirection: "column",
        position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 50,
        transform: sideOpen ? "translateX(0)" : undefined,
        transition: "transform 0.25s ease",
      }} className={`${sideOpen ? "" : "hidden md:flex"} flex-col`}>
        {/* Logo */}
        <div style={{ padding: "20px", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, background: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 13, color: "var(--blue)", flexShrink: 0 }}>BT</div>
            <div>
              <div style={{ color: "white", fontWeight: 800, fontSize: 14, letterSpacing: "-0.01em" }}>BELACA</div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase" }}>TRADING LTD</div>
            </div>
          </Link>
          <button onClick={() => setSideOpen(false)} className="md:hidden" style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", cursor: "pointer" }}>
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, overflowY: "auto", padding: "12px 0" }}>
          {navGroups.map(g => (
            <div key={g.label}>
              <div style={{ padding: "12px 20px 4px", fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{g.label}</div>
              {g.items.map(item => {
                const Icon = item.icon;
                const active = pathname === item.href;
                return (
                  <Link key={item.href} href={item.href}
                    style={{
                      display: "flex", alignItems: "center", gap: 11, padding: "10px 20px",
                      textDecoration: "none", fontSize: 13, fontWeight: active ? 700 : 500,
                      color: active ? "white" : "rgba(255,255,255,0.6)",
                      background: active ? "rgba(0,159,227,0.15)" : "transparent",
                      borderLeft: `3px solid ${active ? "var(--sky)" : "transparent"}`,
                      transition: "all 0.15s",
                    }}
                    onMouseEnter={e => { if (!active) { (e.currentTarget as HTMLElement).style.color="rgba(255,255,255,0.9)"; (e.currentTarget as HTMLElement).style.background="rgba(255,255,255,0.05)"; }}}
                    onMouseLeave={e => { if (!active) { (e.currentTarget as HTMLElement).style.color="rgba(255,255,255,0.6)"; (e.currentTarget as HTMLElement).style.background="transparent"; }}}
                  >
                    <Icon size={16} />
                    <span style={{ flex: 1 }}>{item.label}</span>
                    {(item as any).badge && (
                      <span style={{ background: "#C0392B", color: "white", fontSize: 10, fontWeight: 800, padding: "1px 6px", borderRadius: 10 }}>{(item as any).badge}</span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* User panel */}
        <div style={{ padding: "16px 20px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ width: 34, height: 34, background: "var(--blue)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 13, color: "white", flexShrink: 0 }}>SA</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ color: "white", fontSize: 13, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Samuel Akello</div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em" }}>Super Admin</div>
            </div>
          </div>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", transition: "color 0.15s" }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color="rgba(255,255,255,0.9)"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color="rgba(255,255,255,0.5)"}
          >
            <LogOut size={14} /> Sign Out
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", marginLeft: 0 }} className="md:ml-[236px]">
        {/* Topbar */}
        <header style={{ background: "white", borderBottom: "1px solid var(--border)", padding: "0 24px", position: "sticky", top: 0, zIndex: 30, boxShadow: "var(--shadow-sm)" }}>
          <div style={{ display: "flex", alignItems: "center", height: 60, gap: 16 }}>
            <button onClick={() => setSideOpen(true)} className="md:hidden" style={{ background: "none", border: "none", cursor: "pointer", color: "var(--navy)", padding: 4 }}>
              <Menu size={22} />
            </button>

            {/* Breadcrumb */}
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--gray)", flex: 1 }} className="hidden md:flex">
              <span style={{ color: "var(--blue)", fontWeight: 600 }}>Belaca</span>
              <ChevronRight size={14} />
              <span style={{ fontWeight: 600, color: "var(--navy)", textTransform: "capitalize" }}>
                {pathname.replace("/dashboard/", "").replace("/dashboard", "Dashboard")}
              </span>
            </div>

            {/* Search */}
            <div style={{ position: "relative", flex: 1, maxWidth: 320 }} className="hidden md:block">
              <Search size={15} style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", color: "var(--gray)" }} />
              <input placeholder="Search orders, suppliers…" style={{ paddingLeft: 36, fontSize: 13, height: 36, border: "1px solid var(--border)", background: "var(--offwhite)" }} />
            </div>

            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <button style={{ position: "relative", background: "var(--offwhite)", border: "1px solid var(--border)", padding: "7px 10px", cursor: "pointer", display: "flex" }} aria-label="Notifications">
                <Bell size={18} color="var(--navy)" />
                <span style={{ position: "absolute", top: 5, right: 5, width: 8, height: 8, background: "#C0392B", borderRadius: "50%", border: "2px solid white" }} />
              </button>
              <div style={{ width: 34, height: 34, background: "var(--blue)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 13, color: "white", cursor: "pointer" }}>SA</div>
            </div>
          </div>
        </header>

        {/* Blue accent top line */}
        <div style={{ height: 3, background: "var(--blue)", flexShrink: 0 }} />

        {/* Page content */}
        <main style={{ flex: 1, padding: "28px 24px", overflowY: "auto" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
