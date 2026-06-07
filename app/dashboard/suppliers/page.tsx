"use client";
import { Plus, Star } from "lucide-react";
const suppliers = [
  { name:"Manafwa Farms Co-op",    country:"UG", location:"Manafwa District",    commodities:"Avocado (Hass)",      terms:"Cash on delivery", rating:5, balance:"UGX 0",       status:"Active"  },
  { name:"Sironko Highland Co-op", country:"UG", location:"Sironko District",    commodities:"Beans, Sweet Potato", terms:"7-day credit",     rating:4, balance:"UGX 0",       status:"Active"  },
  { name:"Busia Fish Landing Grp", country:"UG", location:"Busia, Lake Victoria",commodities:"Dried Fish, Tilapia", terms:"Cash on delivery", rating:4, balance:"UGX 0",       status:"Active"  },
  { name:"Busia Poultry Farms",    country:"UG", location:"Busia District",      commodities:"Eggs (30-tray)",      terms:"Weekly account",   rating:3, balance:"UGX 315,000",  status:"Overdue" },
  { name:"Meru Highland Growers",  country:"KE", location:"Meru County",         commodities:"Irish Potatoes",      terms:"KES cash",         rating:4, balance:"KES 0",        status:"Active"  },
  { name:"Kipkaren Valley Farm",   country:"KE", location:"Eldoret, Uasin Gishu",commodities:"Onions",              terms:"KES cash",         rating:5, balance:"KES 0",        status:"Active"  },
  { name:"Kiambu Growers Assoc.",  country:"KE", location:"Kiambu County",       commodities:"Tomatoes",            terms:"KES cash",         rating:4, balance:"KES 0",        status:"Active"  },
];
export default function SuppliersPage() {
  return (
    <div className="animate-fade-in">
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:24, flexWrap:"wrap", gap:16 }}>
        <div>
          <h1 style={{ fontSize:22, fontWeight:900, color:"var(--navy)", marginBottom:4 }}>Suppliers</h1>
          <p style={{ fontSize:14, color:"var(--gray)" }}>{suppliers.length} registered suppliers · Uganda & Kenya</p>
        </div>
        <button className="btn-primary" style={{ fontSize:13, padding:"10px 20px" }}><Plus size={15}/> Add Supplier</button>
      </div>
      <div style={{ background:"white", border:"1px solid var(--border)" }}>
        <div style={{ overflowX:"auto" }}>
          <table>
            <thead><tr><th>Supplier</th><th>Country</th><th>Location</th><th>Commodities</th><th>Payment Terms</th><th>Rating</th><th>Balance Owed</th><th>Status</th></tr></thead>
            <tbody>
              {suppliers.map(s => (
                <tr key={s.name}>
                  <td style={{ fontWeight:700, color:"var(--navy)", fontSize:13 }}>{s.name}</td>
                  <td><span style={{ fontSize:11, fontWeight:800, background:s.country==="UG"?"var(--light)":"#E6F1FB", color:s.country==="UG"?"var(--blue)":"var(--navy)", padding:"2px 8px" }}>{s.country==="UG"?"🇺🇬":"🇰🇪"} {s.country}</span></td>
                  <td style={{ fontSize:12, color:"var(--gray)" }}>{s.location}</td>
                  <td style={{ fontSize:13 }}>{s.commodities}</td>
                  <td style={{ fontSize:12, color:"var(--gray)" }}>{s.terms}</td>
                  <td>
                    <span style={{ display:"flex", gap:1 }}>
                      {Array.from({length:5}).map((_,i) => <Star key={i} size={13} fill={i<s.rating?"#BA7517":"none"} color={i<s.rating?"#BA7517":"#D1D5DB"}/>)}
                    </span>
                  </td>
                  <td style={{ fontSize:13, fontWeight:s.status==="Overdue"?800:500, color:s.status==="Overdue"?"#C0392B":"var(--navy)" }}>{s.balance}</td>
                  <td><span className={`badge ${s.status==="Active"?"badge-success":"badge-danger"}`}>{s.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
