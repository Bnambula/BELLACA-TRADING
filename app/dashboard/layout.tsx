"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, ShoppingCart, Package, Truck, DollarSign,
  BarChart2, Users, Shield, Database, Menu, X, LogOut,
  Bell, ChevronRight, FileText, TrendingUp
} from "lucide-react";

const NAV_GROUPS = [
  { label:"Main", items:[
    { href:"/dashboard",            label:"Dashboard",    icon:LayoutDashboard },
    { href:"/dashboard/orders",     label:"Orders",       icon:ShoppingCart, badge:"4" },
    { href:"/dashboard/inventory",  label:"Inventory",    icon:Package },
    { href:"/dashboard/suppliers",  label:"Suppliers",    icon:Truck },
  ]},
  { label:"Finance", items:[
    { href:"/dashboard/sales",      label:"Sales",        icon:DollarSign },
    { href:"/dashboard/financials", label:"Financials",   icon:TrendingUp },
    { href:"/dashboard/reports",    label:"Reports",      icon:FileText },
  ]},
  { label:"Administration", items:[
    { href:"/dashboard/users",      label:"Users & Roles",icon:Users },
    { href:"/dashboard/security",   label:"Security",     icon:Shield },
    { href:"/dashboard/database",   label:"DB Schema",    icon:Database },
  ]},
];

const TITLES: Record<string,string> = {
  "/dashboard":"Dashboard", "/dashboard/orders":"Orders",
  "/dashboard/inventory":"Inventory", "/dashboard/suppliers":"Suppliers",
  "/dashboard/sales":"Sales", "/dashboard/financials":"Financials",
  "/dashboard/reports":"Reports", "/dashboard/users":"Users & Roles",
  "/dashboard/security":"Security", "/dashboard/database":"DB Schema",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sideOpen, setSideOpen] = useState(false);
  const [user, setUser]         = useState<{email:string;role:string}|null>(null);
  const pathname = usePathname();
  const router   = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("belaca_user");
    if (!stored) { router.push("/login"); return; }
    try { setUser(JSON.parse(stored)); } catch { router.push("/login"); }
  }, [router]);

  const signOut = useCallback(() => {
    localStorage.removeItem("belaca_user");
    router.push("/login");
  }, [router]);

  // Close sidebar on route change
  useEffect(() => { setSideOpen(false); }, [pathname]);

  const blue = "#003DA5", navy = "#001C5C", sky = "#009FE3";
  const initials = user?.email?.slice(0,2).toUpperCase() || "?";
  const title    = TITLES[pathname] || "Dashboard";

  if (!user) return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"var(--off)" }}>
      <div style={{ textAlign:"center" }}>
        <div style={{ width:40, height:40, border:"3px solid var(--blue)", borderTopColor:"transparent", borderRadius:"50%", animation:"spin .7s linear infinite", margin:"0 auto 12px" }}/>
        <div style={{ fontSize:14, color:"var(--gray)" }}>Loading…</div>
      </div>
    </div>
  );

  return (
    <div style={{ display:"flex", height:"100vh", overflow:"hidden", background:"var(--off)", fontFamily:"Helvetica Neue,Helvetica,Arial,sans-serif" }}>

      {/* ── OVERLAY (mobile) ── */}
      {sideOpen && (
        <div onClick={()=>setSideOpen(false)}
          style={{ position:"fixed", inset:0, background:"rgba(0,28,92,.5)", zIndex:40, backdropFilter:"blur(2px)" }}
        />
      )}

      {/* ── SIDEBAR ── */}
      <aside style={{
        position:"fixed", top:0, left:0, bottom:0, zIndex:50,
        width:232, background:navy, display:"flex", flexDirection:"column",
        transform: sideOpen ? "translateX(0)" : "translateX(-100%)",
        transition:"transform .28s cubic-bezier(.4,0,.2,1)",
        overflowY:"auto",
        // on desktop, always show
      }}
        className="belaca-sidebar"
      >
        {/* Logo */}
        <div style={{ padding:"18px 20px", borderBottom:"1px solid rgba(255,255,255,.08)", display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0 }}>
          <Link href="/" style={{ textDecoration:"none", display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:30, height:30, background:"white", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, fontSize:12, color:blue, flexShrink:0 }}>BT</div>
            <div>
              <div style={{ color:"white", fontWeight:800, fontSize:13, letterSpacing:"-.01em" }}>BELACA</div>
              <div style={{ color:"rgba(255,255,255,.38)", fontSize:9, letterSpacing:".16em", textTransform:"uppercase" }}>TRADING LTD</div>
            </div>
          </Link>
          <button onClick={()=>setSideOpen(false)} style={{ background:"none", border:"none", color:"rgba(255,255,255,.5)", cursor:"pointer", padding:4, display:"flex" }} aria-label="Close menu">
            <X size={18}/>
          </button>
        </div>

        {/* Nav */}
        <nav style={{ flex:1, padding:"8px 0", overflowY:"auto" }}>
          {NAV_GROUPS.map(g => (
            <div key={g.label}>
              <div style={{ padding:"14px 20px 4px", fontSize:10, fontWeight:700, color:"rgba(255,255,255,.3)", textTransform:"uppercase", letterSpacing:".1em" }}>{g.label}</div>
              {g.items.map(item => {
                const Icon   = item.icon;
                const active = pathname === item.href;
                return (
                  <Link key={item.href} href={item.href}
                    style={{ display:"flex", alignItems:"center", gap:11, padding:"11px 20px", textDecoration:"none", fontSize:13, fontWeight:active?700:500, color:active?"white":"rgba(255,255,255,.58)", background:active?"rgba(0,159,227,.18)":"transparent", borderLeft:`3px solid ${active?sky:"transparent"}`, transition:"all .14s" }}
                  >
                    <Icon size={15} style={{ flexShrink:0 }}/>
                    <span style={{ flex:1 }}>{item.label}</span>
                    {(item as any).badge && <span style={{ background:"#991B1B", color:"white", fontSize:10, fontWeight:800, padding:"1px 6px", borderRadius:10 }}>{(item as any).badge}</span>}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* User panel */}
        <div style={{ padding:"14px 20px", borderTop:"1px solid rgba(255,255,255,.08)", flexShrink:0 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
            <div style={{ width:32, height:32, background:blue, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800, fontSize:12, color:"white", flexShrink:0 }}>{initials}</div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ color:"white", fontSize:12, fontWeight:700, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{user.email}</div>
              <div style={{ color:"rgba(255,255,255,.4)", fontSize:10, textTransform:"uppercase", letterSpacing:".06em" }}>{user.role}</div>
            </div>
          </div>
          <button onClick={signOut} style={{ display:"flex", alignItems:"center", gap:8, color:"rgba(255,255,255,.45)", background:"none", border:"none", cursor:"pointer", fontSize:12, fontWeight:600, textTransform:"uppercase", letterSpacing:".06em", padding:0, width:"100%", transition:"color .15s" }}
            onMouseEnter={e=>(e.currentTarget as HTMLElement).style.color="rgba(255,255,255,.9)"}
            onMouseLeave={e=>(e.currentTarget as HTMLElement).style.color="rgba(255,255,255,.45)"}
          >
            <LogOut size={14}/> Sign Out
          </button>
        </div>
      </aside>

      {/* Desktop sidebar ghost (pushes content) */}
      <div className="belaca-sidebar-push" style={{ width:0, flexShrink:0, transition:"width .28s" }}/>

      {/* ── MAIN ── */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", minWidth:0, overflow:"hidden" }}>
        {/* Topbar */}
        <header style={{ background:"white", borderBottom:"1px solid var(--border)", flexShrink:0, boxShadow:"0 1px 4px rgba(0,28,92,.06)" }}>
          <div style={{ display:"flex", alignItems:"center", height:56, padding:"0 16px", gap:12 }}>
            <button onClick={()=>setSideOpen(true)} style={{ background:"none", border:"none", cursor:"pointer", color:navy, padding:4, display:"flex", flexShrink:0 }} aria-label="Open menu">
              <Menu size={22}/>
            </button>

            {/* Breadcrumb */}
            <div style={{ display:"flex", alignItems:"center", gap:6, fontSize:13, flex:1, minWidth:0 }}>
              <span style={{ color:blue, fontWeight:700 }}>Belaca</span>
              <ChevronRight size={14} color="var(--border)"/>
              <span style={{ fontWeight:800, color:navy, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{title}</span>
            </div>

            <div style={{ display:"flex", gap:8, alignItems:"center", flexShrink:0 }}>
              <button style={{ position:"relative", background:"var(--off)", border:"1px solid var(--border)", width:38, height:38, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }} aria-label="Notifications">
                <Bell size={17} color={navy}/>
                <span style={{ position:"absolute", top:6, right:6, width:8, height:8, background:"#DC2626", borderRadius:"50%", border:"2px solid white" }}/>
              </button>
              <div style={{ width:34, height:34, background:blue, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800, fontSize:12, color:"white", cursor:"pointer", flexShrink:0 }}>{initials}</div>
            </div>
          </div>
          <div style={{ height:3, background:blue }}/>
        </header>

        {/* Page content */}
        <main style={{ flex:1, overflowY:"auto", padding:"20px 16px" }}>
          {children}
        </main>
      </div>

      {/* ── Desktop sidebar CSS trick ── */}
      <style>{`
        @media (min-width:768px) {
          .belaca-sidebar { transform: translateX(0) !important; }
          .belaca-sidebar-push { width: 232px !important; }
          .belaca-sidebar button[aria-label="Close menu"] { display: none; }
        }
        @keyframes spin { to { transform:rotate(360deg) } }
      `}</style>
    </div>
  );
}
