"use client";
import { useState } from "react";
import Link from "next/link";
import { useExperience } from "@/context/ExperienceContext";
import { Experience } from "@/types/experience.types";

export default function ExperiencePage() {
  const { experiences, loading, deleteExperience } = useExperience();
  const [confirmId, setConfirmId] = useState<string|null>(null);

  if (loading) return (
    <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
      {[0,1,2].map(i=><div key={i} style={{ height:120,borderRadius:"var(--radius)",background:"var(--surface)",animation:"pulse 1.5s ease infinite",border:"1px solid var(--border)" }}/>)}
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}`}</style>
    </div>
  );

  return (
    <div>
      <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20,flexWrap:"wrap",gap:12 }}>
        <div>
          <div style={{ fontSize:18,fontWeight:700 }}>Experience</div>
          <div style={{ fontSize:12,color:"var(--muted)",marginTop:2 }}>{experiences.length} entr{experiences.length!==1?"ies":"y"}</div>
        </div>
        <Link href="/dashboard/experience/addexperience">
          <button style={{ padding:"8px 16px",borderRadius:"var(--radius-sm)",background:"var(--accent)",color:"var(--bg)",border:"none",cursor:"pointer",fontSize:12.5,fontWeight:600 }}>+ Add Experience</button>
        </Link>
      </div>

      {/* Timeline list */}
      <div style={{ position:"relative",paddingLeft:24 }}>
        <div style={{ position:"absolute",left:6,top:0,bottom:0,width:2,background:"var(--border)" }}/>
        {experiences.map((e,i)=>(
          <ExperienceCard key={e._id} exp={e} index={i}
            isConfirming={confirmId===e._id}
            onDeleteClick={()=>setConfirmId(e._id)}
            onConfirmDelete={async()=>{ await deleteExperience(e._id); setConfirmId(null); }}
            onCancelDelete={()=>setConfirmId(null)}
          />
        ))}
      </div>

      {experiences.length===0 && (
        <div style={{ textAlign:"center",padding:"60px 20px",color:"var(--muted)" }}>
          <div style={{ fontSize:40,marginBottom:12 }}>💼</div>
          <div style={{ fontSize:14,marginBottom:16 }}>No experience added yet</div>
          <Link href="/dashboard/experience/addexperience">
            <button style={{ padding:"8px 18px",background:"var(--accent)",color:"var(--bg)",border:"none",borderRadius:"var(--radius-sm)",cursor:"pointer",fontSize:13,fontWeight:600 }}>+ Add First Entry</button>
          </Link>
        </div>
      )}
    </div>
  );
}

function ExperienceCard({ exp:e, index, isConfirming, onDeleteClick, onConfirmDelete, onCancelDelete }:{
  exp:Experience; index:number; isConfirming:boolean;
  onDeleteClick:()=>void; onConfirmDelete:()=>void; onCancelDelete:()=>void;
}) {
  return (
    <div style={{ position:"relative",marginBottom:20,animation:`fadeUp .4s ease ${index*0.08}s both` }}>
      {/* Timeline dot */}
      <div style={{ position:"absolute",left:-26,top:16,width:12,height:12,borderRadius:"50%",background:"var(--accent)",border:"2px solid var(--surface)",zIndex:1 }}/>

      <div style={{ background:"var(--surface)",border:"1px solid var(--border)",borderRadius:"var(--radius)",padding:20 }}>
        <div style={{ display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:12,marginBottom:8 }}>
          <div style={{ flex:1 }}>
            <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:4,flexWrap:"wrap" }}>
              <span style={{ fontSize:11.5,color:"var(--accent)",fontWeight:600 }}>{e.period}</span>
              {e.current && <span style={{ background:"var(--accent)22",color:"var(--accent)",padding:"1px 8px",borderRadius:99,fontSize:10,fontWeight:700 }}>Current</span>}
            </div>
            <div style={{ fontSize:14,fontWeight:700,marginBottom:2 }}>{e.role}</div>
            <div style={{ fontSize:12,color:"var(--muted)" }}>{e.company}</div>
          </div>
          <div style={{ fontSize:11,color:"var(--muted)",fontFamily:"var(--font-mono)",flexShrink:0 }}>#{e.order}</div>
        </div>
        {e.description && <p style={{ fontSize:12.5,color:"var(--muted)",lineHeight:1.6,marginBottom:12 }}>{e.description}</p>}

        {!isConfirming ? (
          <div style={{ display:"flex",gap:8 }}>
            <Link href={`/dashboard/experience/editexperience?id=${e._id}`} style={{ flex:1 }}>
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
      </div>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  );
}
