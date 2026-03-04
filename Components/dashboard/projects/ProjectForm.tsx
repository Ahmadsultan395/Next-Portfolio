"use client";

import React, { useState, useEffect, useRef } from "react";
import { FormikProps } from "formik";
import {
  PROJECT_CATEGORIES,
  PROJECT_STATUSES,
} from "@/validation/projectValidation";
import { buildFileUrl } from "@/services/ProfileService";
import { ProjectFormValues } from "@/types/project";

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

const EMOJI_PRESETS = [
  "🚀",
  "🛍️",
  "🤖",
  "💻",
  "🎨",
  "🏠",
  "🛒",
  "💬",
  "📊",
  "🔐",
  "🌐",
  "🎮",
  "📱",
  "⚡",
  "🔧",
  "🎯",
  "💡",
  "🏆",
  "🔥",
  "✨",
  "💳",
];

// ✅ 6 rotating accent colors — no custom picker
const PRESET_COLORS = [
  "#6366f1", // indigo
  "#8b5cf6", // violet
  "#ec4899", // pink
  "#14b8a6", // teal
  "#f59e0b", // amber
  "#22c55e", // green
];

// Auto-rotate colors on mount for variety
let globalColorIdx = 0;

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
        <div style={{ fontSize: 11.5, color: "#ef4444", marginTop: 4 }}>
          ⚠ {error}
        </div>
      )}
    </div>
  );
}

interface Props {
  formik: FormikProps<ProjectFormValues>;
  submitLabel: string;
  onCancel: () => void;
}

export default function ProjectForm({ formik, submitLabel, onCancel }: Props) {
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
  const [newHighlight, setNewHighlight] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);

  // ── Compute image preview src ─────────────────────────────────────────────
  // If user picked a new file → use blob URL
  // If existing imageUrl (edit mode) → use buildFileUrl
  const imgPreviewSrc =
    values.image instanceof File
      ? URL.createObjectURL(values.image)
      : values.imageUrl
        ? buildFileUrl(values.imageUrl)
        : null;

  // ── Cleanup blob URL on unmount ───────────────────────────────────────────
  const blobUrlRef = useRef<string | null>(null);
  useEffect(() => {
    if (values.image instanceof File) {
      const url = URL.createObjectURL(values.image);
      blobUrlRef.current = url;
      return () => URL.revokeObjectURL(url);
    }
  }, [values.image]);

  const addTech = () => {
    const t = newTech.trim();
    if (!t || values.tech.includes(t)) return;
    setFieldValue("tech", [...values.tech, t]);
    setNewTech("");
  };

  const addHighlight = () => {
    const h = newHighlight.trim();
    if (!h) return;
    setFieldValue("highlights", [...values.highlights, h]);
    setNewHighlight("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* ══ LEFT COLUMN ════════════════════════════════════════════════════ */}
        <div>
          {/* Project Details card */}
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
              🚀 Project Details
            </div>

            {/* Emoji + Name */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "70px 1fr",
                gap: 12,
              }}
            >
              <Field label="Icon">
                <div style={{ position: "relative" }}>
                  <div
                    onClick={() => setShowEmojis((p) => !p)}
                    style={{
                      ...inputStyle,
                      cursor: "pointer",
                      textAlign: "center",
                      fontSize: 24,
                      padding: "8px",
                    }}
                  >
                    {values.emoji || "🚀"}
                  </div>
                  {showEmojis && (
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
                      {EMOJI_PRESETS.map((em) => (
                        <button
                          key={em}
                          type="button"
                          onClick={() => {
                            setFieldValue("emoji", em);
                            setShowEmojis(false);
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
                label="Project Name *"
                error={touched.name ? errors.name : undefined}
              >
                <input
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={inputStyle}
                  placeholder="My Awesome Project"
                />
              </Field>
            </div>

            <Field
              label="Description *"
              error={touched.desc ? errors.desc : undefined}
            >
              <textarea
                name="desc"
                value={values.desc}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ ...inputStyle, minHeight: 90, resize: "vertical" }}
                placeholder="What does this project do?"
              />
              <div
                style={{ fontSize: 11.5, color: "var(--muted)", marginTop: 4 }}
              >
                {values.desc.length} / 300
              </div>
            </Field>

            {/* Status + Category */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
              }}
            >
              <Field
                label="Status *"
                error={touched.status ? errors.status : undefined}
              >
                <select
                  name="status"
                  value={values.status}
                  onChange={handleChange}
                  style={{ ...inputStyle, cursor: "pointer" }}
                >
                  {PROJECT_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s === "live"
                        ? "🟢 Live"
                        : s === "wip"
                          ? "🟡 WIP"
                          : "🔵 Planned"}
                    </option>
                  ))}
                </select>
              </Field>
              <Field
                label="Category *"
                error={touched.category ? errors.category : undefined}
              >
                <select
                  name="category"
                  value={values.category}
                  onChange={handleChange}
                  style={{ ...inputStyle, cursor: "pointer" }}
                >
                  {PROJECT_CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            {/* ✅ Color — 6 rotating swatches only, no custom picker */}
            <Field label="Accent Color">
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                {PRESET_COLORS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setFieldValue("color", c)}
                    title={c}
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
                    marginLeft: 4,
                  }}
                >
                  {values.color}
                </span>
              </div>
            </Field>

            <Field
              label="Live URL"
              error={touched.liveUrl ? errors.liveUrl : undefined}
            >
              <input
                name="liveUrl"
                value={values.liveUrl}
                onChange={handleChange}
                onBlur={handleBlur}
                style={inputStyle}
                placeholder="https://myproject.vercel.app"
              />
            </Field>
            <Field
              label="GitHub URL"
              error={touched.githubUrl ? errors.githubUrl : undefined}
            >
              <input
                name="githubUrl"
                value={values.githubUrl}
                onChange={handleChange}
                onBlur={handleBlur}
                style={inputStyle}
                placeholder="https://github.com/user/repo"
              />
            </Field>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
              }}
            >
              <Field label="Featured">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    height: 40,
                  }}
                >
                  <input
                    type="checkbox"
                    id="featured"
                    checked={values.featured}
                    onChange={(e) =>
                      setFieldValue("featured", e.target.checked)
                    }
                    style={{ width: 16, height: 16, cursor: "pointer" }}
                  />
                  <label
                    htmlFor="featured"
                    style={{ fontSize: 13.5, cursor: "pointer" }}
                  >
                    Show as featured
                  </label>
                </div>
              </Field>
              <Field label="Order (sorting)">
                <input
                  type="number"
                  name="order"
                  value={values.order}
                  onChange={handleChange}
                  style={inputStyle}
                  min={0}
                />
              </Field>
            </div>
          </div>

          {/* ✅ Image Upload card */}
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
              🖼 Project Image
            </div>

            <Field label="Upload Image (optional)">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.currentTarget.files?.[0];
                  if (file) setFieldValue("image", file);
                }}
                style={inputStyle}
              />
            </Field>

            {/* ✅ Preview — shows existing imageUrl OR new file blob */}
            {imgPreviewSrc && (
              <div
                style={{
                  marginTop: 12,
                  width: "100%",
                  height: 180,
                  borderRadius: 8,
                  overflow: "hidden",
                  border: "1px solid var(--border)",
                }}
              >
                <img
                  src={imgPreviewSrc}
                  alt="Project Preview"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            )}

            {/* Show current saved URL info */}
            {values.imageUrl && !((values?.image as any) instanceof File) && (
              <div
                style={{ fontSize: 11.5, color: "var(--muted)", marginTop: 8 }}
              >
                📎 Current: {values.imageUrl.split("/").pop()}
                <button
                  type="button"
                  onClick={() => {
                    setFieldValue("imageUrl", "");
                    setFieldValue("image", "");
                  }}
                  style={{
                    marginLeft: 8,
                    color: "#ef4444",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: 11,
                  }}
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ══ RIGHT COLUMN ═══════════════════════════════════════════════════ */}
        <div>
          {/* ✅ Tech Stack — all tags show */}
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
                  No tech added yet
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
                style={inputStyle}
                placeholder="e.g. Next.js (Enter to add)"
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
            <div
              style={{ fontSize: 11.5, color: "var(--muted)", marginTop: 6 }}
            >
              {values.tech.length} technologies
            </div>
          </div>

          {/* ✅ Highlights — all items show */}
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
              ✅ Key Highlights
            </div>
            <div style={{ marginBottom: 12 }}>
              {values.highlights.map((h, i) => (
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
                  <span
                    style={{ display: "flex", alignItems: "center", gap: 6 }}
                  >
                    <span style={{ color: values.color, fontSize: 10 }}>●</span>{" "}
                    {h}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setFieldValue(
                        "highlights",
                        values.highlights.filter((_, idx) => idx !== i),
                      )
                    }
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#ef4444",
                      fontSize: 14,
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
              {values.highlights.length === 0 && (
                <span style={{ fontSize: 12, color: "var(--muted)" }}>
                  No highlights added yet
                </span>
              )}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                value={newHighlight}
                onChange={(e) => setNewHighlight(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addHighlight())
                }
                style={inputStyle}
                placeholder="e.g. Responsive UI (Enter to add)"
              />
              <button
                type="button"
                onClick={addHighlight}
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
            <div
              style={{ fontSize: 11.5, color: "var(--muted)", marginTop: 6 }}
            >
              {values.highlights.length} highlights
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
              }}
            >
              {/* image preview in card */}
              {imgPreviewSrc && (
                <div
                  style={{
                    width: "100%",
                    height: 120,
                    borderRadius: 6,
                    overflow: "hidden",
                    marginBottom: 12,
                    border: "1px solid var(--border)",
                  }}
                >
                  <img
                    src={imgPreviewSrc}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              )}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 8,
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
                  {values.emoji || "🚀"}
                </div>
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 700 }}>
                    {values.name || "Project Name"}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--muted)" }}>
                    {values.category}
                  </div>
                </div>
              </div>
              <p
                style={{
                  fontSize: 12,
                  color: "var(--muted)",
                  lineHeight: 1.5,
                  marginBottom: 10,
                }}
              >
                {values.desc || "Description..."}
              </p>
              {/* ✅ Show ALL tech in preview */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
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
    </form>
  );
}
