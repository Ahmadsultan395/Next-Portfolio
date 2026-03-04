"use client";
import React from "react";
import { FormikProps } from "formik";
import { ApproachFormValues } from "@/types/skill";

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  background: "var(--surface2)",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius-sm)",
  color: "var(--fg)",
  fontSize: 13.5,
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "inherit",
};

const labelStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  color: "var(--muted)",
  textTransform: "uppercase",
  letterSpacing: "0.8px",
  marginBottom: 6,
  display: "block",
};

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={labelStyle}>{label}</label>
      {children}
      {error && (
        <div
          style={{
            fontSize: 11.5,
            color: "var(--danger,#ef4444)",
            marginTop: 4,
          }}
        >
          ⚠ {error}
        </div>
      )}
    </div>
  );
}

interface Props {
  formik: FormikProps<ApproachFormValues>;
  submitLabel: string;
  onCancel: () => void;
}

export default function ApproachForm({ formik, submitLabel, onCancel }: Props) {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldValue,
    isSubmitting,
    handleSubmit,
  } = formik;

  const addStep = () => {
    const next = String(values.workflow.length + 1).padStart(2, "0");
    setFieldValue("workflow", [
      ...values.workflow,
      { step: next, title: "", description: "" },
    ]);
  };

  const removeStep = (i: number) =>
    setFieldValue(
      "workflow",
      values.workflow.filter((_: any, idx: number) => idx !== i),
    );

  const updateStep = (i: number, key: string, val: string) => {
    const arr = [...values.workflow];
    arr[i] = { ...arr[i], [key]: val };
    setFieldValue("workflow", arr);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius)",
          padding: 24,
          marginBottom: 20,
        }}
      >
        <div style={{ fontSize: 13.5, fontWeight: 700, marginBottom: 20 }}>
          🧠 Development Approach
        </div>

        <Field label="Title *" error={touched.title ? errors.title : undefined}>
          <input
            name="title"
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            style={inputStyle}
            placeholder="Development Philosophy"
          />
        </Field>

        <Field
          label="Description *"
          error={touched.description ? errors.description : undefined}
        >
          <textarea
            name="description"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            style={{ ...inputStyle, minHeight: 100, resize: "vertical" }}
            placeholder="Mera maqsad sirf code likhna nahi..."
          />
          <div style={{ fontSize: 11.5, color: "var(--muted)", marginTop: 4 }}>
            {values.description.length} / 1000
          </div>
        </Field>

        {/* Workflow Steps */}
        <div style={{ marginBottom: 14 }}>
          <label style={labelStyle}>Workflow Steps</label>
          {values.workflow.map((step: any, i: number) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "64px 1fr 2fr auto",
                gap: 10,
                marginBottom: 10,
                alignItems: "flex-end",
              }}
            >
              <Field label={i === 0 ? "Step #" : ""}>
                <input
                  value={step.step}
                  onChange={(e) => updateStep(i, "step", e.target.value)}
                  style={{
                    ...inputStyle,
                    textAlign: "center",
                    fontWeight: 700,
                  }}
                  placeholder="01"
                />
              </Field>
              <Field label={i === 0 ? "Title" : ""}>
                <input
                  value={step.title}
                  onChange={(e) => updateStep(i, "title", e.target.value)}
                  style={inputStyle}
                  placeholder="Planning & Architecture"
                />
              </Field>
              <Field label={i === 0 ? "Description" : ""}>
                <input
                  value={step.description}
                  onChange={(e) => updateStep(i, "description", e.target.value)}
                  style={inputStyle}
                  placeholder="What happens in this step..."
                />
              </Field>
              <button
                type="button"
                onClick={() => removeStep(i)}
                style={{
                  padding: "10px 12px",
                  background: "rgba(239,68,68,.1)",
                  border: "1px solid rgba(239,68,68,.3)",
                  borderRadius: "var(--radius-sm)",
                  cursor: "pointer",
                  color: "#ef4444",
                  fontSize: 14,
                  marginBottom: 14,
                }}
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addStep}
            style={{
              padding: "7px 14px",
              background: "var(--surface2)",
              border: "1px dashed var(--border)",
              borderRadius: "var(--radius-sm)",
              cursor: "pointer",
              fontSize: 12.5,
              color: "var(--accent)",
              fontWeight: 600,
            }}
          >
            + Add Step
          </button>
        </div>

        {/* Submit */}
        <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              padding: "9px 22px",
              background: "var(--accent)",
              color: "var(--bg)",
              border: "none",
              borderRadius: "var(--radius-sm)",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 700,
              opacity: isSubmitting ? 0.6 : 1,
            }}
          >
            {isSubmitting ? "⏳ Saving..." : `✓ ${submitLabel}`}
          </button>
          <button
            type="button"
            onClick={onCancel}
            style={{
              padding: "9px 22px",
              background: "var(--surface2)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-sm)",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 600,
              color: "var(--fg)",
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}
