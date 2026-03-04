"use client";
import React from "react";
import { FormikProps } from "formik";
import { ExperienceFormValues } from "@/types/experience.types";

const inp: React.CSSProperties = { width:"100%",padding:"10px 14px",background:"var(--surface2)",border:"1px solid var(--border)",borderRadius:"var(--radius-sm)",color:"var(--fg)",fontSize:13.5,outline:"none",boxSizing:"border-box",fontFamily:"inherit" };
const lbl: React.CSSProperties = { fontSize:11,fontWeight:600,color:"var(--muted)",textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:6,display:"block" };

function Field({ label, error, children }: { label:string; error?:string; children:React.ReactNode }) {
  return (
    <div style={{ marginBottom:14 }}>
      <label style={lbl}>{label}</label>
      {children}
      {error && <div style={{ fontSize:11.5,color:"#ef4444",marginTop:4 }}>⚠ {error}</div>}
    </div>
  );
}

interface Props { formik: FormikProps<ExperienceFormValues>; submitLabel: string; onCancel: () => void; }

export default function ExperienceForm({ formik, submitLabel, onCancel }: Props) {
  const { values, errors, touched, handleChange, handleBlur, setFieldValue, isSubmitting, handleSubmit } = formik;

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:20 }}>

        {/* LEFT — main fields */}
        <div>
          <div style={{ background:"var(--surface)",border:"1px solid var(--border)",borderRadius:"var(--radius)",padding:24,marginBottom:20 }}>
            <div style={{ fontSize:13.5,fontWeight:700,marginBottom:20 }}>💼 Experience Details</div>

            <Field label="Period *" error={touched.period?errors.period:undefined}>
              <input name="period" value={values.period} onChange={handleChange} onBlur={handleBlur} style={inp} placeholder="2023 - Present" />
            </Field>
            <Field label="Role / Title *" error={touched.role?errors.role:undefined}>
              <input name="role" value={values.role} onChange={handleChange} onBlur={handleBlur} style={inp} placeholder="Senior Full Stack Developer" />
            </Field>
            <Field label="Company *" error={touched.company?errors.company:undefined}>
              <input name="company" value={values.company} onChange={handleChange} onBlur={handleBlur} style={inp} placeholder="Tech Solutions Inc." />
            </Field>
            <Field label="Description">
              <textarea name="description" value={values.description} onChange={handleChange} style={{ ...inp,minHeight:120,resize:"vertical" }} placeholder="Describe your responsibilities and achievements..." />
              <div style={{ fontSize:11.5,color:"var(--muted)",marginTop:4 }}>{values.description.length}/600</div>
            </Field>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12 }}>
              <Field label="Order (sorting)">
                <input type="number" name="order" value={values.order} onChange={handleChange} style={inp} min={0} />
              </Field>
              <Field label="Current Job?">
                <div style={{ display:"flex",alignItems:"center",gap:10,height:42 }}>
                  <input type="checkbox" id="current" checked={values.current} onChange={e=>setFieldValue("current",e.target.checked)} style={{ width:16,height:16,cursor:"pointer" }} />
                  <label htmlFor="current" style={{ fontSize:13.5,cursor:"pointer" }}>Currently working here</label>
                </div>
              </Field>
            </div>
          </div>
        </div>

        {/* RIGHT — preview */}
        <div>
          <div style={{ background:"var(--surface)",border:"1px solid var(--border)",borderRadius:"var(--radius)",padding:24 }}>
            <div style={{ fontSize:13.5,fontWeight:700,marginBottom:14 }}>👁 Preview</div>
            <div style={{ position:"relative",paddingLeft:24,borderLeft:"2px solid var(--accent)" }}>
              <div style={{ position:"absolute",left:-7,top:4,width:12,height:12,borderRadius:"50%",background:"var(--accent)",border:"2px solid var(--surface)" }}/>
              <div style={{ fontSize:11,color:"var(--accent)",fontWeight:600,marginBottom:4 }}>
                {values.period||"Period"} {values.current&&<span style={{ background:"var(--accent)22",color:"var(--accent)",padding:"1px 6px",borderRadius:99,fontSize:10,marginLeft:4 }}>Current</span>}
              </div>
              <div style={{ fontSize:14,fontWeight:700,marginBottom:2 }}>{values.role||"Your Role"}</div>
              <div style={{ fontSize:12,color:"var(--muted)",marginBottom:8 }}>{values.company||"Company Name"}</div>
              <p style={{ fontSize:12.5,color:"var(--muted)",lineHeight:1.6 }}>{values.description||"Your description will appear here..."}</p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display:"flex",gap:10,marginTop:8 }}>
        <button type="submit" disabled={isSubmitting} style={{ padding:"9px 22px",background:"var(--accent)",color:"var(--bg)",border:"none",borderRadius:"var(--radius-sm)",cursor:"pointer",fontSize:13,fontWeight:700,opacity:isSubmitting?0.6:1 }}>
          {isSubmitting?"⏳ Saving...":`✓ ${submitLabel}`}
        </button>
        <button type="button" onClick={onCancel} style={{ padding:"9px 22px",background:"var(--surface2)",border:"1px solid var(--border)",borderRadius:"var(--radius-sm)",cursor:"pointer",fontSize:13,fontWeight:600,color:"var(--fg)" }}>Cancel</button>
      </div>
    </form>
  );
}
