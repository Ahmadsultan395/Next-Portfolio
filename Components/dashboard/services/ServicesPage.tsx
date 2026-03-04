"use client";
import { useState } from "react";
import Link from "next/link";
import { useService } from "@/context/ServiceContext";
import { Service } from "@/types/service.types";

export default function ServicesPage() {
  const { services, loading, deleteService } = useService();
  const [confirmId, setConfirmId] = useState<string | null>(null);

  if (loading) return (
    <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:16 }}>
      {[0,1,2].map(i=><div key={i} style={{ height:220,borderRadius:"var(--radius)",background:"var(--surface)",animation:"pulse 1.5s ease infinite",border:"1px solid var(--border)" }}/>)}
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}`}</style>
    </div>
  );

  return (
    <div>
      {/* Toolbar */}
      <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20,flexWrap:"wrap",gap:12 }}>
        <div>
          <div style={{ fontSize:18,fontWeight:700 }}>Services</div>
          <div style={{ fontSize:12,color:"var(--muted)",marginTop:2 }}>{services.length} service{services.length!==1?"s":""}</div>
        </div>
        <Link href="/dashboard/services/addservice">
          <button style={{ padding:"8px 16px",borderRadius:"var(--radius-sm)",background:"var(--accent)",color:"var(--bg)",border:"none",cursor:"pointer",fontSize:12.5,fontWeight:600 }}>
            + New Service
          </button>
        </Link>
      </div>

      {/* Grid */}
      <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:16 }}>
        {services.map((s,i) => (
          <ServiceCard key={s._id} service={s} index={i}
            isConfirming={confirmId===s._id}
            onDeleteClick={() => setConfirmId(s._id)}
            onConfirmDelete={async () => { await deleteService(s._id); setConfirmId(null); }}
            onCancelDelete={() => setConfirmId(null)}
          />
        ))}
      </div>

      {services.length===0 && (
        <div style={{ textAlign:"center",padding:"60px 20px",color:"var(--muted)" }}>
          <div style={{ fontSize:40,marginBottom:12 }}>🛠</div>
          <div style={{ fontSize:14,marginBottom:16 }}>No services yet</div>
          <Link href="/dashboard/services/addservice">
            <button style={{ padding:"8px 18px",background:"var(--accent)",color:"var(--bg)",border:"none",borderRadius:"var(--radius-sm)",cursor:"pointer",fontSize:13,fontWeight:600 }}>+ Add First Service</button>
          </Link>
        </div>
      )}
    </div>
  );
}

function ServiceCard({ service:s, index, isConfirming, onDeleteClick, onConfirmDelete, onCancelDelete }:{
  service:Service; index:number; isConfirming:boolean;
  onDeleteClick:()=>void; onConfirmDelete:()=>void; onCancelDelete:()=>void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}
      style={{ background:"var(--surface)",borderTop:`3px solid ${s.color}`,borderRadius:"var(--radius)",padding:20,position:"relative",border:"1px solid var(--border)",transition:"all .22s",transform:hovered?"translateY(-3px)":"translateY(0)",animation:`fadeUp .4s ease ${index*0.06}s both` }}>
      {s.badge && (
        <div style={{ position:"absolute",top:10,right:10,padding:"2px 8px",borderRadius:99,fontSize:10,fontWeight:700,background:`${s.color}22`,color:s.color,border:`1px solid ${s.color}44` }}>{s.badge}</div>
      )}

      <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:12,paddingRight:s.badge?80:0 }}>
        <div style={{ width:44,height:44,background:`${s.color}18`,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0 }}>{s.icon}</div>
        <div>
          <div style={{ fontSize:14,fontWeight:700 }}>{s.title}</div>
          <div style={{ fontSize:11.5,color:"var(--muted)",marginTop:2 }}>{s.subtitle}</div>
        </div>
      </div>

      {s.description && <p style={{ fontSize:12.5,color:"var(--muted)",lineHeight:1.6,marginBottom:10 }}>{s.description}</p>}

      {s.features.length>0 && (
        <div style={{ marginBottom:10 }}>
          {s.features.slice(0,3).map((f,i)=>(
            <div key={i} style={{ display:"flex",alignItems:"center",gap:6,fontSize:12,color:"var(--muted)",marginBottom:4 }}>
              <span style={{ color:s.color,fontSize:10 }}>●</span> {f}
            </div>
          ))}
          {s.features.length>3 && <div style={{ fontSize:11,color:"var(--muted)" }}>+{s.features.length-3} more</div>}
        </div>
      )}

      {s.tech.length>0 && (
        <div style={{ display:"flex",flexWrap:"wrap",gap:5,marginBottom:12 }}>
          {s.tech.map(t=>(
            <span key={t} style={{ padding:"3px 8px",borderRadius:99,fontSize:11,background:`${s.color}18`,border:`1px solid ${s.color}44`,color:s.color }}>{t}</span>
          ))}
        </div>
      )}

      <div style={{ display:"flex",alignItems:"center",gap:6,marginBottom:12 }}>
        <span style={{ width:7,height:7,borderRadius:"50%",background:s.isActive?"#22c55e":"#9ca3af",display:"inline-block" }}/>
        <span style={{ fontSize:11,color:"var(--muted)" }}>{s.isActive?"Active":"Inactive"} · Order: {s.order}</span>
      </div>

      {!isConfirming ? (
        <div style={{ display:"flex",gap:8 }}>
          <Link href={`/dashboard/services/editservice?id=${s._id}`} style={{ flex:1 }}>
            <button style={{ width:"100%",padding:"7px 12px",borderRadius:"var(--radius-sm)",background:"var(--surface2)",border:"1px solid var(--border)",color:"var(--fg)",fontSize:12,fontWeight:600,cursor:"pointer" }}>✏ Edit</button>
          </Link>
          <button onClick={onDeleteClick} style={{ width:34,height:34,borderRadius:"var(--radius-sm)",background:"rgba(255,77,109,.08)",border:"1px solid rgba(255,77,109,.25)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:"var(--danger)",fontSize:16 }}>🗑</button>
        </div>
      ) : (
        <div style={{ display:"flex",gap:8 }}>
          <button onClick={onConfirmDelete} style={{ flex:1,padding:"7px 0",background:"#ef4444",color:"#fff",border:"none",borderRadius:"var(--radius-sm)",cursor:"pointer",fontSize:12,fontWeight:700 }}>Confirm Delete</button>
          <button onClick={onCancelDelete} style={{ flex:1,padding:"7px 0",background:"var(--surface2)",border:"1px solid var(--border)",borderRadius:"var(--radius-sm)",cursor:"pointer",fontSize:12,color:"var(--fg)" }}>Cancel</button>
        </div>
      )}
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  );
}
