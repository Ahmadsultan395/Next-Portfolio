"use client";
import React from "react";
import { FormikProps } from "formik";
import { AboutFormValues } from "@/types/about";

// ── Small shared card ─────────────────────────────────────────────────────────
const Card = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div
    style={{
      background: "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius)",
      padding: 24,
      marginBottom: 20,
    }}
  >
    <div style={{ fontSize: 13.5, fontWeight: 700, marginBottom: 18 }}>
      {title}
    </div>
    {children}
  </div>
);

// ── Field styles ──────────────────────────────────────────────────────────────
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

// ── Field Component ───────────────────────────────────────────────────────────
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
            color: "var(--danger, #ef4444)",
            marginTop: 4,
          }}
        >
          ⚠ {error}
        </div>
      )}
    </div>
  );
}

// ── Add / Remove Buttons ──────────────────────────────────────────────────────
const AddBtn = ({ onClick, label }: { onClick: () => void; label: string }) => (
  <button
    type="button"
    onClick={onClick}
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
    + {label}
  </button>
);

const RemoveBtn = ({ onClick }: { onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    style={{
      padding: "4px 10px",
      background: "transparent",
      border: "1px solid rgba(239,68,68,.4)",
      borderRadius: "var(--radius-sm)",
      cursor: "pointer",
      fontSize: 12,
      color: "#ef4444",
    }}
  >
    ✕
  </button>
);

// ── Main Form Component ───────────────────────────────────────────────────────
interface AboutFormProps {
  formik: FormikProps<AboutFormValues>;
  submitLabel: string;
  onCancel: () => void;
}

export default function AboutForm({
  formik,
  submitLabel,
  onCancel,
}: AboutFormProps) {
  const {
    values,
    errors,
    touched,
    setFieldValue,
    isSubmitting,
    handleSubmit,
    handleChange,
    handleBlur,
  } = formik;

  // ── Array helpers ─────────────────────────────────────────────────────────
  const addSkill = () =>
    setFieldValue("skills", [...values.skills, { label: "", percentage: 80 }]);
  const addStat = () =>
    setFieldValue("stats", [...values.stats, { value: "", label: "" }]);
  const addInterest = () =>
    setFieldValue("interests", [
      ...values.interests,
      { emoji: "", title: "", description: "" },
    ]);
  const addFunFact = () =>
    setFieldValue("funFacts", [...values.funFacts, { text: "" }]);

  const remove = (field: keyof AboutFormValues, idx: number) =>
    setFieldValue(
      field,
      (values[field] as any[]).filter((_, i) => i !== idx),
    );

  const updateItem = (
    field: keyof AboutFormValues,
    idx: number,
    key: string,
    val: any,
  ) => {
    const arr = [...(values[field] as any[])];
    arr[idx] = { ...arr[idx], [key]: val };
    setFieldValue(field, arr);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* ── Journey ── */}
      <Card title="🚀 Journey Section">
        <Field
          label="Section Title *"
          error={touched.journeyTitle ? errors.journeyTitle : undefined}
        >
          <input
            name="journeyTitle"
            value={values.journeyTitle}
            onChange={handleChange}
            onBlur={handleBlur}
            style={inputStyle}
            placeholder="My Journey"
          />
        </Field>
        <Field
          label="Journey Text *"
          error={touched.journeyText ? errors.journeyText : undefined}
        >
          <textarea
            name="journeyText"
            value={values.journeyText}
            onChange={handleChange}
            onBlur={handleBlur}
            style={{ ...inputStyle, minHeight: 120, resize: "vertical" }}
            placeholder="Tell your story..."
          />
          <div style={{ fontSize: 11.5, color: "var(--muted)", marginTop: 4 }}>
            {values.journeyText.length} / 1000
          </div>
        </Field>
      </Card>

      {/* ── What I Do ── */}
      <Card title="🎯 What I Do Section">
        <Field
          label="Section Title *"
          error={touched.whatIDoTitle ? errors.whatIDoTitle : undefined}
        >
          <input
            name="whatIDoTitle"
            value={values.whatIDoTitle}
            onChange={handleChange}
            onBlur={handleBlur}
            style={inputStyle}
            placeholder="What I Do"
          />
        </Field>
        <Field
          label="Description *"
          error={touched.whatIDoText ? errors.whatIDoText : undefined}
        >
          <textarea
            name="whatIDoText"
            value={values.whatIDoText}
            onChange={handleChange}
            onBlur={handleBlur}
            style={{ ...inputStyle, minHeight: 120, resize: "vertical" }}
            placeholder="What you specialize in..."
          />
          <div style={{ fontSize: 11.5, color: "var(--muted)", marginTop: 4 }}>
            {values.whatIDoText.length} / 1000
          </div>
        </Field>
      </Card>

      {/* ── Skills ── */}
      <Card title="⚡ Core Skills">
        {values.skills.map((skill, i) => (
          <div
            key={i}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 120px auto",
              gap: 10,
              marginBottom: 10,
              alignItems: "flex-end",
            }}
          >
            <Field label={i === 0 ? "Skill Label" : ""}>
              <input
                value={skill.label}
                onChange={(e) =>
                  updateItem("skills", i, "label", e.target.value)
                }
                style={inputStyle}
                placeholder="e.g. Frontend Development"
              />
            </Field>
            <Field label={i === 0 ? "Percentage" : ""}>
              <input
                type="number"
                min={0}
                max={100}
                value={skill.percentage}
                onChange={(e) =>
                  updateItem("skills", i, "percentage", Number(e.target.value))
                }
                style={inputStyle}
                placeholder="95"
              />
            </Field>
            <RemoveBtn onClick={() => remove("skills", i)} />
          </div>
        ))}
        <AddBtn onClick={addSkill} label="Add Skill" />
      </Card>

      {/* ── Stats ── */}
      <Card title="📊 Beyond The Code / Stats">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 14,
            marginBottom: 14,
          }}
        >
          <Field label="Section Title">
            <input
              name="beyondTitle"
              value={values.beyondTitle}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Beyond The Code"
            />
          </Field>
          <Field label="Subtitle">
            <input
              name="beyondSubtitle"
              value={values.beyondSubtitle}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Numbers that define my journey..."
            />
          </Field>
        </div>
        {values.stats.map((stat, i) => (
          <div
            key={i}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr auto",
              gap: 10,
              marginBottom: 10,
              alignItems: "flex-end",
            }}
          >
            <Field label={i === 0 ? "Value" : ""}>
              <input
                value={stat.value}
                onChange={(e) =>
                  updateItem("stats", i, "value", e.target.value)
                }
                style={inputStyle}
                placeholder="2+"
              />
            </Field>
            <Field label={i === 0 ? "Label" : ""}>
              <input
                value={stat.label}
                onChange={(e) =>
                  updateItem("stats", i, "label", e.target.value)
                }
                style={inputStyle}
                placeholder="Years Experience"
              />
            </Field>
            <RemoveBtn onClick={() => remove("stats", i)} />
          </div>
        ))}
        <AddBtn onClick={addStat} label="Add Stat" />
      </Card>

      {/* ── Interests ── */}
      <Card title="❤️ What I Love / Interests">
        {values.interests.map((item, i) => (
          <div
            key={i}
            style={{
              display: "grid",
              gridTemplateColumns: "60px 1fr 2fr auto",
              gap: 10,
              marginBottom: 10,
              alignItems: "flex-end",
            }}
          >
            <Field label={i === 0 ? "Emoji" : ""}>
              <input
                value={item.emoji}
                onChange={(e) =>
                  updateItem("interests", i, "emoji", e.target.value)
                }
                style={inputStyle}
                placeholder="🎵"
              />
            </Field>
            <Field label={i === 0 ? "Title" : ""}>
              <input
                value={item.title}
                onChange={(e) =>
                  updateItem("interests", i, "title", e.target.value)
                }
                style={inputStyle}
                placeholder="Music Lover"
              />
            </Field>
            <Field label={i === 0 ? "Description" : ""}>
              <input
                value={item.description}
                onChange={(e) =>
                  updateItem("interests", i, "description", e.target.value)
                }
                style={inputStyle}
                placeholder="Lo-fi beats while coding..."
              />
            </Field>
            <RemoveBtn onClick={() => remove("interests", i)} />
          </div>
        ))}
        <AddBtn onClick={addInterest} label="Add Interest" />
      </Card>

      {/* ── Fun Facts ── */}
      <Card title="🎉 Fun Facts">
        {values.funFacts.map((fact, i) => (
          <div
            key={i}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: 10,
              marginBottom: 10,
              alignItems: "flex-end",
            }}
          >
            <Field label={i === 0 ? "Fun Fact" : ""}>
              <input
                value={fact.text}
                onChange={(e) =>
                  updateItem("funFacts", i, "text", e.target.value)
                }
                style={inputStyle}
                placeholder="My code editor: VS Code with 20+ extensions 🛠️"
              />
            </Field>
            <RemoveBtn onClick={() => remove("funFacts", i)} />
          </div>
        ))}
        <AddBtn onClick={addFunFact} label="Add Fun Fact" />
      </Card>

      {/* ── Submit ── */}
      <div style={{ display: "flex", gap: 10 }}>
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7,
            padding: "9px 22px",
            background: "var(--accent)",
            color: "var(--bg)",
            border: "none",
            borderRadius: "var(--radius-sm)",
            cursor: isSubmitting ? "not-allowed" : "pointer",
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
