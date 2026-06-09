"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Menu, X, ArrowRight, CheckCircle, Globe, Shield, Truck, TrendingUp,
  ChevronRight, Star, Phone, Mail, MapPin, ChevronDown
} from "lucide-react";

const NAV = ["Products","Routes","About","Contact"];
const TICKER = [
  "🥑 Avocado: UGX 500/kg → KES 100/kg",
  "🫘 Dry Beans: UGX 1,020/kg → KES 75/kg",
  "🥔 Irish Potatoes: KES 28 → UGX 1,800/kg",
  "🧅 Onions: KES 32 → UGX 2,200/kg",
  "🥚 Eggs: UGX 10,500/tray → KES 420/tray",
  "🐟 Dried Fish: UGX 5,100/kg → KES 280/kg",
  "🍌 Plantain: UGX 310/kg → KES 45/kg",
  "🍅 Tomatoes: KES 25 → UGX 2,500/kg",
];

const PRODUCTS = [
  { icon:"🥑", name:"Hass Avocado",    origin:"Manafwa, UG",   dest:"Nairobi, KE",  margin:"42%", badge:"Premium",   desc:"Farm-gate sourced Hass avocados at mature-green stage. Superior quality graded for Nairobi wholesale.", season:"Year-round", shelf:"5–10 days", method:"FIFO" },
  { icon:"🫘", name:"Dry Beans",       origin:"Sironko, UG",   dest:"Eldoret, KE",  margin:"35%", badge:"High Volume",desc:"Highland-grown dry beans, cleaned and bagged at source. Long shelf life, consistent quality.", season:"Bi-annual",  shelf:"6 months",  method:"LIFO" },
  { icon:"🐟", name:"Dried Nile Perch",origin:"Busia, UG",     dest:"Gikomba, KE",  margin:"38%", badge:"Specialist", desc:"Sun-dried Nile perch from Lake Victoria landings at Busia. Fully dried, firm texture, no mould.", season:"Year-round", shelf:"30+ days",  method:"LIFO" },
  { icon:"🥔", name:"Irish Potatoes",  origin:"Meru, KE",      dest:"Mbale, UG",    margin:"28%", badge:"Return Load",desc:"Fresh from Meru and Elgeyo highlands. Firm, well-sorted, strong demand across eastern Uganda.", season:"Year-round", shelf:"30 days",   method:"FIFO" },
  { icon:"🧅", name:"Onions",          origin:"Kipkaren, KE",  dest:"Tororo, UG",   margin:"30%", badge:"Return Load",desc:"Dry-skinned onions from Eldoret belt. Long shelf life makes them ideal return-trip cargo.", season:"Year-round", shelf:"60 days",   method:"LIFO" },
  { icon:"🍌", name:"Plantain/Matoke", origin:"Mbale, UG",     dest:"Kitale, KE",   margin:"25%", badge:"Bulk",       desc:"Mature green bunches from Mbale district. Volume product — fills truck space efficiently.", season:"Year-round", shelf:"4–7 days",  method:"FIFO" },
  { icon:"🥚", name:"Farm Eggs",       origin:"Busia, UG",     dest:"Kitale, KE",   margin:"31%", badge:"Fragile",    desc:"Fresh eggs from Busia poultry cluster. Grass-padded wooden crates, max 3 high.", season:"Year-round", shelf:"14–21 days",method:"FIFO" },
  { icon:"🍅", name:"Tomatoes",        origin:"Kiambu, KE",    dest:"Mbale, UG",    margin:"26%", badge:"Return Load",desc:"Firm, 70–80% ripe from Kiambu and Rift Valley. Time-sensitive — sell within 48hrs of crossing.", season:"Year-round", shelf:"3–5 days",  method:"FIFO" },
];

const STATS = [
  { value:"UGX 67M+", label:"Projected Year 1 Profit", icon:<TrendingUp size={22}/> },
  { value:"8+",        label:"Trips Per Month",          icon:<Truck size={22}/> },
  { value:"8",         label:"Commodity Categories",     icon:<Globe size={22}/> },
  { value:"100%",      label:"Dual-Flow Efficiency",     icon:<Shield size={22}/> },
];

const TESTIMONIALS = [
  { name:"James Wafula", role:"Kitale Wholesale Buyer", text:"Belaca's avocados are consistently graded and arrive on time. Best supplier we have worked with.", stars:5 },
  { name:"Rose Namukasa", role:"Mbale Market Trader", text:"The Irish potatoes from Kenya are always fresh and competitively priced. Reliable supply every week.", stars:5 },
  { name:"Peter Otieno", role:"Eldoret Distributor", text:"Beans arrive dry and clean every trip. Belaca understands quality standards.", stars:4 },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeProduct, setActiveProduct] = useState<number|null>(null);
  const [faq, setFaq] = useState<number|null>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", fn, { passive:true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const blue = "var(--blue)", navy = "var(--navy)", sky = "var(--sky)";

  return (
    <div style={{ minHeight:"100vh", display:"flex", flexDirection:"column" }}>
      {/* UTILITY BAR */}
      <div style={{ background:navy, padding:"6px 20px", fontSize:11, fontWeight:600, letterSpacing:".05em", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:8 }}>
        <span style={{ color:"rgba(255,255,255,.6)", display:"flex", alignItems:"center", gap:6 }}><Globe size={11}/> Uganda · Kenya · East Africa</span>
        <div style={{ display:"flex", gap:16, color:"rgba(255,255,255,.7)" }}>
          <a href="tel:+256700000000" style={{ color:"inherit", textDecoration:"none" }}>📞 +256 700 000 000</a>
          <span>|</span>
          <a href="/login" style={{ color:"#fff", textDecoration:"none", fontWeight:800 }}>PORTAL LOGIN →</a>
        </div>
      </div>

      {/* NAVBAR */}
      <header style={{ position:"sticky", top:0, zIndex:100, background:scrolled?"rgba(0,61,165,.97)":blue, backdropFilter:scrolled?"blur(12px)":"none", boxShadow:scrolled?"0 2px 20px rgba(0,0,0,.25)":"none", transition:"all .25s" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 20px", display:"flex", alignItems:"center", height:64, gap:32 }}>
          {/* Logo */}
          <a href="/" style={{ textDecoration:"none", display:"flex", alignItems:"center", gap:10, flexShrink:0 }}>
            <div style={{ width:38, height:38, background:"white", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, fontSize:15, color:blue, letterSpacing:-1 }}>BT</div>
            <div>
              <div style={{ color:"white", fontWeight:800, fontSize:16, letterSpacing:"-0.02em", lineHeight:1.1 }}>BELACA</div>
              <div style={{ color:"rgba(255,255,255,.55)", fontSize:9, letterSpacing:".18em", textTransform:"uppercase" }}>TRADING LTD</div>
            </div>
          </a>

          {/* Desktop nav */}
          <nav style={{ display:"flex", gap:4, flex:1 }}>
            {NAV.map(n => (
              <a key={n} href={`#${n.toLowerCase()}`} style={{ color:"rgba(255,255,255,.85)", textDecoration:"none", padding:"8px 14px", fontSize:13, fontWeight:600, letterSpacing:".02em", textTransform:"uppercase", borderBottom:"2px solid transparent", transition:"all .15s" }}
                onMouseEnter={e=>{(e.target as HTMLElement).style.color="#fff";(e.target as HTMLElement).style.borderBottomColor="#fff";}}
                onMouseLeave={e=>{(e.target as HTMLElement).style.color="rgba(255,255,255,.85)";(e.target as HTMLElement).style.borderBottomColor="transparent";}}
              >{n}</a>
            ))}
          </nav>

          <div style={{ display:"flex", gap:10, alignItems:"center" }}>
            <a href="/login" style={{ background:"white", color:blue, padding:"9px 20px", fontSize:12, fontWeight:800, textTransform:"uppercase", letterSpacing:".05em", textDecoration:"none", display:"none" }} className="md-show">Sign In</a>
            <button onClick={()=>setMenuOpen(!menuOpen)} style={{ background:"none", border:"none", color:"white", cursor:"pointer", padding:4, display:"flex" }} aria-label="Menu">
              {menuOpen ? <X size={24}/> : <Menu size={24}/>}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="slide-l" style={{ background:navy, borderTop:"1px solid rgba(255,255,255,.1)" }}>
            {NAV.map(n => (
              <a key={n} href={`#${n.toLowerCase()}`} onClick={()=>setMenuOpen(false)} style={{ display:"block", color:"rgba(255,255,255,.85)", textDecoration:"none", padding:"15px 24px", fontSize:15, fontWeight:600, borderBottom:"1px solid rgba(255,255,255,.07)" }}>{n}</a>
            ))}
            <div style={{ padding:"16px 24px" }}>
              <a href="/login" className="btn btn-primary" style={{ width:"100%", justifyContent:"center", textDecoration:"none" }}>Sign In to Portal <ArrowRight size={15}/></a>
            </div>
          </div>
        )}
      </header>

      {/* LIVE TICKER */}
      <div style={{ background:sky, overflow:"hidden", borderBottom:"2px solid rgba(0,0,0,.08)" }}>
        <div style={{ display:"flex", alignItems:"center" }}>
          <div style={{ background:navy, color:"white", padding:"7px 16px", fontSize:10, fontWeight:800, letterSpacing:".12em", textTransform:"uppercase", flexShrink:0 }}>LIVE RATES</div>
          <div className="ticker-wrap">
            <div className="ticker-track">
              {[...TICKER,...TICKER].map((t,i) => (
                <span key={i} style={{ padding:"7px 28px", fontSize:12, fontWeight:600, whiteSpace:"nowrap", borderRight:"1px solid rgba(0,28,92,.2)", color:navy }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* HERO */}
      <section style={{ background:blue, position:"relative", overflow:"hidden" }}>
        {/* Geometric pattern */}
        <div style={{ position:"absolute", inset:0, pointerEvents:"none", overflow:"hidden" }}>
          <div style={{ position:"absolute", right:-60, top:-60, width:440, height:440, border:"1px solid rgba(255,255,255,.06)", transform:"rotate(15deg)" }}/>
          <div style={{ position:"absolute", right:60, top:60, width:320, height:320, border:"1px solid rgba(255,255,255,.04)", transform:"rotate(15deg)" }}/>
          <div style={{ position:"absolute", left:-80, bottom:-80, width:350, height:200, border:"1px solid rgba(255,255,255,.03)" }}/>
          <div style={{ position:"absolute", right:120, bottom:-40, width:200, height:200, background:"rgba(0,180,216,.07)" }}/>
        </div>
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"clamp(56px,8vw,96px) 20px" }}>
          <div style={{ maxWidth:680, position:"relative", zIndex:1 }}>
            <div className="fade-up" style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(255,255,255,.12)", padding:"5px 14px", marginBottom:24, fontSize:11, fontWeight:800, letterSpacing:".1em", textTransform:"uppercase", color:"rgba(255,255,255,.9)" }}>
              <span style={{ width:7, height:7, borderRadius:"50%", background:"#4ADE80", display:"inline-block" }}/>
              Uganda · Kenya Trade Corridor · Est. 2024
            </div>
            <h1 className="fade-up d1" style={{ fontSize:"clamp(2rem,5.5vw,3.8rem)", fontWeight:900, color:"white", lineHeight:1.05, marginBottom:20, letterSpacing:"-.03em" }}>
              Farm Fresh.<br/>Smart Logistics.<br/>
              <span style={{ color:"#7DD3FC" }}>Both Directions.</span>
            </h1>
            <p className="fade-up d2" style={{ fontSize:"clamp(15px,2vw,18px)", color:"rgba(255,255,255,.78)", lineHeight:1.7, maxWidth:520, marginBottom:36 }}>
              Belaca Trading runs the Mbale–Busia–Nairobi dual-flow agricultural corridor. We export Ugandan produce and return fully loaded with Kenyan goods — zero empty trucks.
            </p>
            <div className="fade-up d3" style={{ display:"flex", gap:14, flexWrap:"wrap" }}>
              <a href="/login" className="btn" style={{ background:"white", color:blue, fontSize:14, padding:"13px 28px" }}>Access Portal <ArrowRight size={16}/></a>
              <a href="#products" className="btn" style={{ background:"transparent", color:"white", border:"2px solid rgba(255,255,255,.4)", fontSize:14, padding:"11px 24px" }}>View Products</a>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <div style={{ background:navy }}>
        <div style={{ maxWidth:1200, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))" }}>
          {STATS.map((s,i) => (
            <div key={i} className={`fade-up d${i+1}`} style={{ padding:"26px 20px", borderRight:"1px solid rgba(255,255,255,.08)", textAlign:"center" }}>
              <div style={{ color:sky, marginBottom:8, display:"flex", justifyContent:"center" }}>{s.icon}</div>
              <div style={{ fontSize:26, fontWeight:900, color:"white", letterSpacing:"-.03em" }}>{s.value}</div>
              <div style={{ fontSize:11, color:"rgba(255,255,255,.45)", marginTop:3, textTransform:"uppercase", letterSpacing:".07em", fontWeight:600 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* PRODUCTS */}
      <section id="products" style={{ padding:"72px 20px", background:"var(--off)" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <div style={{ fontSize:11, fontWeight:800, letterSpacing:".1em", textTransform:"uppercase", color:blue, marginBottom:10 }}>What We Trade</div>
            <h2 style={{ fontSize:"clamp(1.6rem,3vw,2.4rem)", marginBottom:12 }}>Active Commodities</h2>
            <p style={{ color:"var(--gray)", maxWidth:520, margin:"0 auto", fontSize:15 }}>All produce is graded at source, handled correctly and moved fast. FIFO applied to perishables, LIFO to dry goods.</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:16 }}>
            {PRODUCTS.map((p,i) => (
              <div key={i} className="card fade-up" style={{ cursor:"pointer", animationDelay:`${i*.07}s`, transition:"all .2s" }}
                onClick={()=>setActiveProduct(activeProduct===i?null:i)}>
                {/* Card top */}
                <div style={{ background:blue, padding:"18px 20px", display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                    <span style={{ fontSize:32 }}>{p.icon}</span>
                    <div>
                      <div style={{ color:"white", fontWeight:800, fontSize:14 }}>{p.name}</div>
                      <span style={{ fontSize:10, fontWeight:800, background:"rgba(255,255,255,.2)", color:"white", padding:"2px 7px", letterSpacing:".05em" }}>{p.badge}</span>
                    </div>
                  </div>
                  <div style={{ textAlign:"right", flexShrink:0 }}>
                    <div style={{ fontSize:22, fontWeight:900, color:"white" }}>{p.margin}</div>
                    <div style={{ fontSize:10, color:"rgba(255,255,255,.6)", textTransform:"uppercase", letterSpacing:".05em" }}>Margin</div>
                  </div>
                </div>
                {/* Card body */}
                <div style={{ padding:"16px 20px" }}>
                  <div style={{ display:"flex", gap:6, marginBottom:10, flexWrap:"wrap" }}>
                    <span style={{ fontSize:11, fontWeight:700, background:"#DBEAFE", color:blue, padding:"2px 8px" }}>🇺🇬 {p.origin}</span>
                    <span style={{ color:"var(--gray)", fontSize:11, display:"flex", alignItems:"center" }}>→</span>
                    <span style={{ fontSize:11, fontWeight:700, background:"#DBEAFE", color:navy, padding:"2px 8px" }}>🇰🇪 {p.dest}</span>
                  </div>
                  <p style={{ fontSize:13, color:"var(--gray)", lineHeight:1.6, marginBottom:10 }}>{p.desc}</p>

                  {/* Expandable detail */}
                  {activeProduct === i && (
                    <div className="fade-in" style={{ borderTop:"1px solid var(--border)", paddingTop:12, marginTop:4 }}>
                      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                        {[["Shelf Life",p.shelf],["Season",p.season],["Inventory",p.method],["Route",p.origin.includes("KE")?"Return":"Outbound"]].map(([k,v])=>(
                          <div key={k} style={{ background:"var(--off)", padding:"8px 10px" }}>
                            <div style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:".06em", color:"var(--gray)", marginBottom:2 }}>{k}</div>
                            <div style={{ fontSize:13, fontWeight:700, color:navy }}>{v}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <button style={{ marginTop:10, background:"none", border:"none", color:blue, fontSize:12, fontWeight:800, cursor:"pointer", display:"flex", alignItems:"center", gap:4, padding:0, textTransform:"uppercase", letterSpacing:".05em" }}>
                    {activeProduct===i ? "Less info" : "More info"} <ChevronDown size={13} style={{ transform:activeProduct===i?"rotate(180deg)":"none", transition:"transform .2s" }}/>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROUTE SECTION */}
      <section id="routes" style={{ padding:"72px 20px", background:"white" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <div style={{ fontSize:11, fontWeight:800, letterSpacing:".1em", textTransform:"uppercase", color:blue, marginBottom:10 }}>The Belaca Model</div>
            <h2 style={{ fontSize:"clamp(1.6rem,3vw,2.4rem)", marginBottom:12 }}>Dual-Flow Trade Route</h2>
            <p style={{ color:"var(--gray)", maxWidth:480, margin:"0 auto", fontSize:15 }}>Every journey earns twice — outbound with Ugandan produce, return loaded with Kenyan goods. Zero empty trucks.</p>
          </div>

          {/* Route viz */}
          <div style={{ display:"flex", alignItems:"stretch", justifyContent:"center", flexWrap:"wrap", gap:0, marginBottom:40, overflowX:"auto" }}>
            {[
              { flag:"🇺🇬", label:"Mbale/Sironko", sub:"Farm Gate", color:blue },
              { arrow:true },
              { flag:"🛃", label:"Busia OSBP", sub:"Border", color:sky },
              { arrow:true },
              { flag:"🇰🇪", label:"Eldoret/Kitale", sub:"Phase 1", color:navy },
              { arrow:true },
              { flag:"🇰🇪", label:"Nairobi", sub:"Phase 2", color:navy },
            ].map((n,i) => {
              if ((n as any).arrow) return (
                <div key={i} style={{ display:"flex", flexDirection:"column", justifyContent:"center", padding:"0 4px" }}>
                  <div style={{ color:blue, fontWeight:900, fontSize:20 }}>→</div>
                  <div style={{ color:"rgba(0,61,165,.3)", fontWeight:900, fontSize:20 }}>←</div>
                </div>
              );
              const nd = n as any;
              return (
                <div key={i} style={{ background:"white", border:`2px solid ${nd.color}`, padding:"14px 18px", textAlign:"center", minWidth:120, flex:"0 0 auto" }}>
                  <div style={{ fontSize:26, marginBottom:4 }}>{nd.flag}</div>
                  <div style={{ fontWeight:800, fontSize:12, color:nd.color }}>{nd.label}</div>
                  <div style={{ fontSize:10, color:"var(--gray)", textTransform:"uppercase", letterSpacing:".06em", fontWeight:600, marginTop:2 }}>{nd.sub}</div>
                </div>
              );
            })}
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:20 }}>
            {[
              { dir:"Uganda → Kenya", color:blue, items:["🥑 Hass Avocado — Manafwa farms","🫘 Dry Beans — Sironko highlands","🍌 Plantain — Mbale district","🥚 Eggs — Busia poultry cluster","🐟 Dried Fish — Busia lake landings"], badge:"Outbound" },
              { dir:"Kenya → Uganda", color:sky, items:["🍅 Tomatoes — Kiambu & Rift Valley","🥔 Irish Potatoes — Meru County","🧅 Onions — Kipkaren, Eldoret","🥦 Seasonal vegetables","📦 Packaged dry goods"], badge:"Return Load" },
            ].map(r => (
              <div key={r.dir} className="card" style={{ padding:"24px" }}>
                <div style={{ display:"flex", gap:10, alignItems:"center", marginBottom:18 }}>
                  <div style={{ width:4, height:36, background:r.color }}/>
                  <div>
                    <div style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:".07em", color:"var(--gray)" }}>{r.badge}</div>
                    <div style={{ fontWeight:800, color:navy, fontSize:16 }}>{r.dir}</div>
                  </div>
                </div>
                {r.items.map(it => (
                  <div key={it} style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 0", borderBottom:"1px solid var(--border)", fontSize:14 }}>
                    <CheckCircle size={14} color={r.color} style={{ flexShrink:0 }}/>
                    <span>{it}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding:"72px 20px", background:"var(--off)" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:40 }}>
            <h2 style={{ fontSize:"clamp(1.4rem,2.5vw,2rem)", marginBottom:8 }}>What Our Partners Say</h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:16 }}>
            {TESTIMONIALS.map((t,i) => (
              <div key={i} className="card fade-up" style={{ padding:"24px", animationDelay:`${i*.1}s` }}>
                <div style={{ display:"flex", gap:2, marginBottom:12 }}>
                  {Array.from({length:5}).map((_,j) => <Star key={j} size={14} fill={j<t.stars?"#F59E0B":"none"} color={j<t.stars?"#F59E0B":"#D1D5DB"}/>)}
                </div>
                <p style={{ fontSize:14, color:"var(--gray)", lineHeight:1.7, marginBottom:16, fontStyle:"italic" }}>"{t.text}"</p>
                <div style={{ fontWeight:700, fontSize:13, color:navy }}>{t.name}</div>
                <div style={{ fontSize:12, color:"var(--gray)" }}>{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding:"72px 20px", background:"white" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:48, alignItems:"center" }}>
          <div>
            <div style={{ fontSize:11, fontWeight:800, letterSpacing:".1em", textTransform:"uppercase", color:blue, marginBottom:10 }}>About Belaca</div>
            <h2 style={{ fontSize:"clamp(1.5rem,2.8vw,2.2rem)", marginBottom:16 }}>Built on the principle that no truck should run empty</h2>
            <p style={{ color:"var(--gray)", lineHeight:1.75, marginBottom:16, fontSize:15 }}>Belaca Trading was founded by traders who understood the East African agricultural market from the ground up. Operating from Mbale, Uganda, we run a disciplined dual-flow logistics model between Uganda and Kenya.</p>
            <p style={{ color:"var(--gray)", lineHeight:1.75, marginBottom:24, fontSize:15 }}>Every outbound load of avocados, beans or dried fish is matched by a return load of Kenyan produce — tomatoes, Irish potatoes, onions — making our logistics twice as efficient as single-direction traders.</p>
            {[["Founded","2024, Mbale Uganda"],["Route","Mbale → Busia → Nairobi"],["Crossing","Busia One-Stop Border Post"],["Certification","UEPB Registered Trader"]].map(([k,v])=>(
              <div key={k} style={{ display:"flex", gap:16, padding:"10px 0", borderBottom:"1px solid var(--border)", fontSize:14 }}>
                <span style={{ fontWeight:700, color:blue, minWidth:110 }}>{k}</span>
                <span style={{ color:"var(--gray)" }}>{v}</span>
              </div>
            ))}
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
            {[
              { icon:"🏔", label:"Mbale Source", desc:"Direct farm-gate buying in highland districts" },
              { icon:"🚚", label:"Own Logistics", desc:"Dedicated trucks, night travel for perishables" },
              { icon:"🛃", label:"OSBP Cleared", desc:"Full phytosanitary certs, fast border processing" },
              { icon:"📊", label:"Transparent P&L", desc:"Real-time margin tracking per commodity" },
              { icon:"🔄", label:"Return Loads", desc:"Never travel empty — dual-flow every trip" },
              { icon:"📱", label:"WhatsApp Intel", desc:"Pre-sold loads before departure, always" },
            ].map((f,i) => (
              <div key={i} className="card fade-up" style={{ padding:"18px 16px", animationDelay:`${i*.06}s` }}>
                <div style={{ fontSize:28, marginBottom:8 }}>{f.icon}</div>
                <div style={{ fontWeight:800, fontSize:13, color:navy, marginBottom:4 }}>{f.label}</div>
                <div style={{ fontSize:12, color:"var(--gray)", lineHeight:1.5 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding:"72px 20px", background:"var(--off)" }}>
        <div style={{ maxWidth:760, margin:"0 auto" }}>
          <h2 style={{ fontSize:"clamp(1.4rem,2.5vw,2rem)", textAlign:"center", marginBottom:40 }}>Frequently Asked Questions</h2>
          {[
            ["How often do you run trips?","We run 8+ trips per month — roughly 2 per week. Outbound (Uganda to Kenya) and return loads are coordinated so every truck is full in both directions."],
            ["What quality standards do you use?","All produce is graded at farm gate. Phytosanitary certificates are obtained from MAAIF for every consignment. We follow KEBS standards for Kenya entry."],
            ["How do you handle perishables?","FIFO strictly applied. Avocados travel at mature-green stage, eggs in padded crates. Night travel reduces heat exposure. We have pre-confirmed buyers before departure."],
            ["Can I supply produce to Belaca?","Yes. We actively partner with farms in Mbale, Manafwa and Sironko. Contact us to discuss pricing and volumes."],
            ["How do you manage border clearance?","We use the Busia One-Stop Border Post under EAC Single Customs Territory protocol. Our documentation is always complete — reducing clearance delays significantly."],
          ].map(([q,a],i) => (
            <div key={i} style={{ borderBottom:"1px solid var(--border)" }}>
              <button onClick={()=>setFaq(faq===i?null:i)} style={{ width:"100%", padding:"18px 4px", display:"flex", justifyContent:"space-between", alignItems:"center", background:"none", border:"none", cursor:"pointer", textAlign:"left" }}>
                <span style={{ fontSize:15, fontWeight:700, color:navy }}>{q}</span>
                <ChevronDown size={18} color="var(--gray)" style={{ transform:faq===i?"rotate(180deg)":"none", transition:"transform .2s", flexShrink:0, marginLeft:16 }}/>
              </button>
              {faq===i && (
                <div className="fade-in" style={{ padding:"0 4px 18px", fontSize:14, color:"var(--gray)", lineHeight:1.75 }}>{a}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding:"72px 20px", background:"white" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:48 }}>
          <div>
            <div style={{ fontSize:11, fontWeight:800, letterSpacing:".1em", textTransform:"uppercase", color:blue, marginBottom:10 }}>Get In Touch</div>
            <h2 style={{ fontSize:"clamp(1.5rem,2.5vw,2rem)", marginBottom:16 }}>Talk to Us</h2>
            <p style={{ color:"var(--gray)", lineHeight:1.75, marginBottom:28, fontSize:15 }}>Whether you're a farmer, buyer, or logistics partner — we want to hear from you.</p>
            {[[<Phone size={16}/>, "+256 700 000 000"],[<Mail size={16}/>, "info@belacatrading.com"],[<MapPin size={16}/>, "Mbale City, Eastern Uganda"],[<Globe size={16}/>, "Kenya Office: +254 700 000 000"]].map(([icon,text],i)=>(
              <div key={i} style={{ display:"flex", gap:12, alignItems:"center", padding:"12px 0", borderBottom:"1px solid var(--border)", fontSize:14, color:"var(--gray)" }}>
                <span style={{ color:blue, flexShrink:0 }}>{icon}</span>
                <span>{text as string}</span>
              </div>
            ))}
          </div>
          <div className="card" style={{ padding:"28px" }}>
            <h3 style={{ marginBottom:20, fontSize:17 }}>Send a Message</h3>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:14 }}>
              <div><label>First Name</label><input placeholder="John"/></div>
              <div><label>Last Name</label><input placeholder="Mugisha"/></div>
            </div>
            <div style={{ marginBottom:14 }}><label>Email</label><input type="email" placeholder="john@example.com"/></div>
            <div style={{ marginBottom:14 }}>
              <label>I am a</label>
              <select><option>Farmer / Supplier</option><option>Buyer / Distributor</option><option>Logistics Partner</option><option>Investor</option><option>Other</option></select>
            </div>
            <div style={{ marginBottom:20 }}><label>Message</label><textarea rows={4} placeholder="Tell us about your produce, volumes or requirements..."/></div>
            <button className="btn btn-primary" style={{ width:"100%", justifyContent:"center", fontSize:14, padding:"13px" }}>Send Message <ArrowRight size={15}/></button>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{ background:navy, padding:"56px 20px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", right:-60, top:-60, width:380, height:380, border:"1px solid rgba(255,255,255,.05)", transform:"rotate(20deg)", pointerEvents:"none" }}/>
        <div style={{ maxWidth:1200, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:32, alignItems:"center" }}>
          <div>
            <h2 style={{ color:"white", fontSize:"clamp(1.4rem,2.5vw,2rem)", marginBottom:10 }}>Ready to trade with Belaca?</h2>
            <p style={{ color:"rgba(255,255,255,.6)", fontSize:15 }}>Log in to the management portal to track orders, manage inventory and view financials.</p>
          </div>
          <div style={{ display:"flex", gap:14, flexWrap:"wrap" }}>
            <a href="/login" className="btn" style={{ background:"white", color:blue, textDecoration:"none" }}>Access Portal <ArrowRight size={15}/></a>
            <a href="#contact" className="btn btn-ghost" style={{ borderColor:"rgba(255,255,255,.3)", color:"rgba(255,255,255,.9)", textDecoration:"none" }}>Contact Us</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background:"var(--dark)", color:"rgba(255,255,255,.6)" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"48px 20px 32px", display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:32 }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
              <div style={{ width:32, height:32, background:"white", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, fontSize:13, color:blue }}>BT</div>
              <div style={{ color:"white", fontWeight:800, fontSize:14 }}>BELACA TRADING</div>
            </div>
            <p style={{ fontSize:13, lineHeight:1.7 }}>Cross-border agricultural trade between Uganda and Kenya. Est. 2024.</p>
          </div>
          {[
            { title:"Trade", links:["UG → KE Exports","KE → UG Imports","Commodities","Border Clearance"] },
            { title:"Company", links:["About Us","Our Farmers","Sustainability","Careers"] },
            { title:"Legal", links:["Privacy Policy","Terms of Use","Cookie Policy","Trade Licences"] },
          ].map(s => (
            <div key={s.title}>
              <h4 style={{ color:"white", fontSize:11, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", marginBottom:14 }}>{s.title}</h4>
              {s.links.map(l => (
                <div key={l} style={{ marginBottom:9 }}>
                  <a href="#" style={{ color:"rgba(255,255,255,.55)", textDecoration:"none", fontSize:13, transition:"color .15s" }}
                    onMouseEnter={e=>(e.target as HTMLElement).style.color="white"}
                    onMouseLeave={e=>(e.target as HTMLElement).style.color="rgba(255,255,255,.55)"}
                  >{l}</a>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop:"1px solid rgba(255,255,255,.08)", padding:"14px 20px", textAlign:"center", fontSize:12 }}>
          © 2026 Belaca Trading Ltd · Mbale, Uganda · All rights reserved
        </div>
      </footer>
    </div>
  );
}
