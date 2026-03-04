"use client";
import React, { useState } from "react";
import { FormikProps } from "formik";
import { SkillFormValues } from "@/types/skill";

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

// Popular emojis for categories
const EMOJI_SUGGESTIONS = [
  "🎨",
  "🔧",
  "⚡",
  "🔥",
  "💎",
  "🚀",
  "🎯",
  "💻",
  "🛠️",
  "📱",
  "🌐",
  "🔐",
  "☁️",
  "🤖",
  "📊",
  "🎮",
  "🎵",
  "📸",
  "🔬",
  "💡",
];

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
  formik: FormikProps<SkillFormValues>;
  submitLabel: string;
  onCancel: () => void;
}

export default function SkillCategoryForm({
  formik,
  submitLabel,
  onCancel,
}: Props) {
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
  const [newItemName, setNewItemName] = useState("");
  const [newItemEmoji, setNewItemEmoji] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const addItem = () => {
    const name = newItemName.trim();
    if (!name) return;
    setFieldValue("items", [...values.items, { name, emoji: newItemEmoji }]);
    setNewItemName("");
    setNewItemEmoji("");
  };

  const removeItem = (i: number) =>
    setFieldValue(
      "items",
      values.items.filter((_, idx) => idx !== i),
    );

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
          ⚡ Skill Category
        </div>

        {/* Row 1 */}
        <div
          style={{ display: "grid", gridTemplateColumns: "80px 1fr", gap: 14 }}
        >
          <Field
            label="Emoji *"
            error={touched.categoryEmoji ? errors.categoryEmoji : undefined}
          >
            <div style={{ position: "relative" }}>
              <input
                value={values.categoryEmoji}
                onChange={(e) => setFieldValue("categoryEmoji", e.target.value)}
                style={{ ...inputStyle, textAlign: "center", fontSize: 22 }}
                placeholder="🎨"
                maxLength={4}
              />
              <button
                type="button"
                onClick={() => setShowEmojiPicker((p) => !p)}
                style={{
                  position: "absolute",
                  right: 6,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 14,
                  color: "var(--muted)",
                }}
              >
                ▾
              </button>
              {showEmojiPicker && (
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
                  {EMOJI_SUGGESTIONS.map((em) => (
                    <button
                      key={em}
                      type="button"
                      onClick={() => {
                        setFieldValue("categoryEmoji", em);
                        setShowEmojiPicker(false);
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
            label="Category Name *"
            error={touched.categoryName ? errors.categoryName : undefined}
          >
            <input
              name="categoryName"
              value={values.categoryName}
              onChange={handleChange}
              onBlur={handleBlur}
              style={inputStyle}
              placeholder="Frontend"
            />
          </Field>
        </div>

        {/* Row 2 */}
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}
        >
          <Field
            label="Subtitle *"
            error={
              touched.categorySubtitle ? errors.categorySubtitle : undefined
            }
          >
            <input
              name="categorySubtitle"
              value={values.categorySubtitle}
              onChange={handleChange}
              onBlur={handleBlur}
              style={inputStyle}
              placeholder="UI, components, styling & performance"
            />
          </Field>
          <Field
            label="Focus *"
            error={touched.focus ? errors.focus : undefined}
          >
            <input
              name="focus"
              value={values.focus}
              onChange={handleChange}
              onBlur={handleBlur}
              style={inputStyle}
              placeholder="Quality • Speed • Maintainability"
            />
          </Field>
        </div>

        {/* Row 3 */}
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}
        >
          <Field label="Badge *">
            <select
              name="badge"
              value={values.badge}
              onChange={handleChange}
              style={{ ...inputStyle, cursor: "pointer", appearance: "none" }}
            >
              <option value="Primary">Primary</option>
              <option value="Support">Support</option>
            </select>
          </Field>
          <Field label="Order (for sorting)">
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

        {/* Items */}
        <div style={{ marginBottom: 14 }}>
          <label style={labelStyle}>Skill Items</label>
          {/* existing items */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              marginBottom: 12,
            }}
          >
            {values.items.map((item, i) => (
              <span
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "5px 12px",
                  borderRadius: 99,
                  background: "var(--surface3)",
                  border: "1px solid var(--border)",
                  fontSize: 12.5,
                }}
              >
                {item.emoji && <span>{item.emoji}</span>}
                {item.name}
                <button
                  type="button"
                  onClick={() => removeItem(i)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#ef4444",
                    fontSize: 14,
                    lineHeight: 1,
                    padding: 0,
                    marginLeft: 2,
                  }}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          {/* add new item row */}
          <div style={{ display: "flex", gap: 8 }}>
            <input
              value={newItemEmoji}
              onChange={(e) => setNewItemEmoji(e.target.value)}
              style={{
                ...inputStyle,
                width: 56,
                textAlign: "center",
                fontSize: 20,
                flexShrink: 0,
              }}
              placeholder="🔥"
              maxLength={4}
            />
            <input
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && (e.preventDefault(), addItem())
              }
              style={inputStyle}
              placeholder="e.g. Next.js (press Enter to add)"
            />
            <button
              type="button"
              onClick={addItem}
              style={{
                padding: "10px 16px",
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
          <div style={{ fontSize: 11.5, color: "var(--muted)", marginTop: 6 }}>
            {values.items.length} items added
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
      </div>
    </form>
  );
}
