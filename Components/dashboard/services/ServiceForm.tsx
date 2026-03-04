"use client";
import React, { useState } from "react";
import { FormikProps } from "formik";
import { ServiceFormValues } from "@/types/service.types";
import { SERVICE_ICONS, SERVICE_COLORS } from "@/validation/serviceValidation";

const inp: React.CSSProperties = {
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
const lbl: React.CSSProperties = {
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
      <label style={lbl}>{label}</label>
      {children}
      {error && (
        <div style={{ fontSize: 11.5, color: "#ef4444", marginTop: 4 }}>
          ⚠ {error}
        </div>
      )}
    </div>
  );
}

interface Props {
  formik: FormikProps<ServiceFormValues>;
  submitLabel: string;
  onCancel: () => void;
}

export default function ServiceForm({ formik, submitLabel, onCancel }: Props) {
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
  const [newTech, setNewTech] = useState("");
  const [newFeature, setNewFeature] = useState("");
  const [showIcons, setShowIcons] = useState(false);

  const addTech = () => {
    const t = newTech.trim();
    if (!t || values.tech.includes(t)) return;
    setFieldValue("tech", [...values.tech, t]);
    setNewTech("");
  };
  const addFeature = () => {
    const f = newFeature.trim();
    if (!f) return;
    setFieldValue("features", [...values.features, f]);
    setNewFeature("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* LEFT */}
        <div>
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
              🛠 Service Details
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "64px 1fr",
                gap: 12,
              }}
            >
              <Field label="Icon">
                <div style={{ position: "relative" }}>
                  <div
                    onClick={() => setShowIcons((p) => !p)}
                    style={{
                      ...inp,
                      cursor: "pointer",
                      textAlign: "center",
                      fontSize: 24,
                      padding: "8px",
                    }}
                  >
                    {values.icon}
                  </div>
                  {showIcons && (
                    <div
                      style={{
                        position: "absolute",
                        top: "110%",
                        left: 0,
                        zIndex: 50,
                        background: "var(--surface)",
                        border: "1px solid var(--border)",
                        borderRadius: "var(--radius-sm)",
                        padding: 10,
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 6,
                        width: 240,
                      }}
                    >
                      {SERVICE_ICONS.map((em) => (
                        <button
                          key={em}
                          type="button"
                          onClick={() => {
                            setFieldValue("icon", em);
                            setShowIcons(false);
                          }}
                          style={{
                            fontSize: 22,
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            borderRadius: 6,
                            padding: 4,
                          }}
                        >
                          {em}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </Field>
              <Field
                label="Title *"
                error={touched.title ? errors.title : undefined}
              >
                <input
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={inp}
                  placeholder="Frontend Development"
                />
              </Field>
            </div>

            <Field label="Subtitle">
              <input
                name="subtitle"
                value={values.subtitle}
                onChange={handleChange}
                style={inp}
                placeholder="Pixel-perfect UI, responsive layouts..."
              />
            </Field>
            <Field label="Description">
              <textarea
                name="description"
                value={values.description}
                onChange={handleChange}
                style={{ ...inp, minHeight: 80, resize: "vertical" }}
                placeholder="Detailed service description..."
              />
            </Field>
            <Field label="Badge (e.g. Most Requested)">
              <input
                name="badge"
                value={values.badge}
                onChange={handleChange}
                style={inp}
                placeholder="Most Requested"
              />
            </Field>

            <Field label="Accent Color">
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                {SERVICE_COLORS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setFieldValue("color", c)}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: c,
                      border:
                        values.color === c
                          ? "3px solid var(--fg)"
                          : "3px solid transparent",
                      outline: values.color === c ? `2px solid ${c}` : "none",
                      outlineOffset: 2,
                      cursor: "pointer",
                      transition: "all .15s",
                      transform:
                        values.color === c ? "scale(1.15)" : "scale(1)",
                    }}
                  />
                ))}
                <span
                  style={{
                    fontSize: 11.5,
                    color: "var(--muted)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {values.color}
                </span>
              </div>
            </Field>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
              }}
            >
              <Field label="Order (sorting)">
                <input
                  type="number"
                  name="order"
                  value={values.order}
                  onChange={handleChange}
                  style={inp}
                  min={0}
                />
              </Field>
              <Field label="Status">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    height: 42,
                  }}
                >
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={values.isActive}
                    onChange={(e) =>
                      setFieldValue("isActive", e.target.checked)
                    }
                    style={{ width: 16, height: 16, cursor: "pointer" }}
                  />
                  <label
                    htmlFor="isActive"
                    style={{ fontSize: 13.5, cursor: "pointer" }}
                  >
                    Active
                  </label>
                </div>
              </Field>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div>
          {/* Features */}
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              padding: 24,
              marginBottom: 20,
            }}
          >
            <div style={{ fontSize: 13.5, fontWeight: 700, marginBottom: 16 }}>
              ✅ Features
            </div>
            <div style={{ marginBottom: 12 }}>
              {values.features.map((f, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "8px 12px",
                    background: "var(--surface2)",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--border)",
                    marginBottom: 8,
                    fontSize: 13,
                  }}
                >
                  <span>
                    <span style={{ color: values.color, fontSize: 10 }}>●</span>{" "}
                    {f}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setFieldValue(
                        "features",
                        values.features.filter((_, idx) => idx !== i),
                      )
                    }
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#ef4444",
                      fontSize: 16,
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
              {values.features.length === 0 && (
                <div style={{ fontSize: 12, color: "var(--muted)" }}>
                  No features yet. Add bullet points below.
                </div>
              )}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addFeature())
                }
                style={inp}
                placeholder="e.g. Responsive + cross-browser support"
              />
              <button
                type="button"
                onClick={addFeature}
                style={{
                  padding: "10px 14px",
                  background: "var(--accent)",
                  color: "var(--bg)",
                  border: "none",
                  borderRadius: "var(--radius-sm)",
                  cursor: "pointer",
                  fontSize: 12.5,
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                + Add
              </button>
            </div>
          </div>

          {/* Tech Stack */}
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              padding: 24,
              marginBottom: 20,
            }}
          >
            <div style={{ fontSize: 13.5, fontWeight: 700, marginBottom: 16 }}>
              ⚡ Tech Stack
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                marginBottom: 12,
                minHeight: 32,
              }}
            >
              {values.tech.map((t, i) => (
                <span
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "4px 10px",
                    borderRadius: 99,
                    fontSize: 12.5,
                    background: `${values.color}18`,
                    border: `1px solid ${values.color}44`,
                    color: values.color,
                  }}
                >
                  {t}
                  <button
                    type="button"
                    onClick={() =>
                      setFieldValue(
                        "tech",
                        values.tech.filter((_, idx) => idx !== i),
                      )
                    }
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#ef4444",
                      fontSize: 14,
                      lineHeight: 1,
                      padding: 0,
                    }}
                  >
                    ×
                  </button>
                </span>
              ))}
              {values.tech.length === 0 && (
                <span style={{ fontSize: 12, color: "var(--muted)" }}>
                  No tech added
                </span>
              )}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                value={newTech}
                onChange={(e) => setNewTech(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addTech())
                }
                style={inp}
                placeholder="e.g. Next.js"
              />
              <button
                type="button"
                onClick={addTech}
                style={{
                  padding: "10px 14px",
                  background: "var(--accent)",
                  color: "var(--bg)",
                  border: "none",
                  borderRadius: "var(--radius-sm)",
                  cursor: "pointer",
                  fontSize: 12.5,
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                + Add
              </button>
            </div>
          </div>

          {/* Card Preview */}
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              padding: 24,
            }}
          >
            <div style={{ fontSize: 13.5, fontWeight: 700, marginBottom: 14 }}>
              👁 Card Preview
            </div>
            <div
              style={{
                background: "var(--surface2)",
                borderTop: `3px solid ${values.color}`,
                borderRadius: "var(--radius-sm)",
                padding: 16,
                position: "relative",
              }}
            >
              {values.badge && (
                <div
                  style={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    padding: "2px 8px",
                    borderRadius: 99,
                    fontSize: 10,
                    fontWeight: 700,
                    background: `${values.color}22`,
                    color: values.color,
                    border: `1px solid ${values.color}44`,
                  }}
                >
                  {values.badge}
                </div>
              )}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 8,
                  paddingRight: values.badge ? 60 : 0,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    background: `${values.color}18`,
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 18,
                  }}
                >
                  {values.icon}
                </div>
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 700 }}>
                    {values.title || "Service Title"}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--muted)" }}>
                    {values.subtitle || "Subtitle..."}
                  </div>
                </div>
              </div>
              {values.features.slice(0, 2).map((f, i) => (
                <div
                  key={i}
                  style={{
                    fontSize: 12,
                    color: "var(--muted)",
                    marginBottom: 3,
                  }}
                >
                  <span style={{ color: values.color }}>●</span> {f}
                </div>
              ))}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 5,
                  marginTop: 8,
                }}
              >
                {values.tech.map((t, i) => (
                  <span
                    key={i}
                    style={{
                      padding: "3px 8px",
                      borderRadius: 99,
                      fontSize: 11,
                      background: `${values.color}18`,
                      border: `1px solid ${values.color}44`,
                      color: values.color,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

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
    </form>
  );
}
