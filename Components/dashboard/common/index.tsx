"use client";
import React from "react";

// ─── FORM FIELD ──────────────────────────────────────────────────────────────
interface FormFieldProps {
  label: string;
  name?: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  type?: string;
  multiline?: boolean;
  placeholder?: string;
  error?: string;
  prefix?: React.ReactNode;
  rows?: number;
}

export function FormField({
  label,
  name,
  value,
  onChange,
  onBlur,
  type = "text",
  multiline = false,
  placeholder,
  error,
  prefix,
  rows = 4,
}: FormFieldProps) {
  const shared: React.CSSProperties = {
    width: "100%",
    padding: prefix ? "10px 14px 10px 36px" : "10px 14px",
    background: "var(--surface2)",
    border: `1px solid ${error ? "var(--danger, #ef4444)" : "var(--border)"}`,
    borderRadius: "var(--radius-sm)",
    color: "var(--fg)",
    fontFamily: "var(--font-display)",
    fontSize: 13.5,
    outline: "none",
    boxSizing: "border-box" as const,
    transition: "border-color .18s",
    resize: "vertical" as const,
  };

  return (
    <div style={{ marginBottom: 14 }}>
      <label
        style={{
          fontSize: 11,
          fontWeight: 600,
          color: "var(--hero-image)",
          textTransform: "uppercase",
          letterSpacing: "0.8px",
          marginBottom: 6,
          display: "block",
        }}
      >
        {label}
      </label>
      <div style={{ position: "relative" }}>
        {prefix && (
          <span
            style={{
              position: "absolute",
              left: 10,
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--muted)",
              pointerEvents: "none",
            }}
          >
            {prefix}
          </span>
        )}
        {multiline ? (
          <textarea
            name={name}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            placeholder={placeholder}
            rows={rows}
            style={{ ...shared, minHeight: 90 }}
          />
        ) : (
          <input
            name={name}
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            placeholder={placeholder}
            style={shared}
          />
        )}
      </div>
      {error && (
        <div
          style={{
            fontSize: 11.5,
            color: "var(--danger, #ef4444)",
            marginTop: 4,
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          ⚠ {error}
        </div>
      )}
    </div>
  );
}

// ─── SELECT FIELD ────────────────────────────────────────────────────────────
interface SelectFieldProps {
  label: string;
  name?: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  options: { label: string; value: string }[];
  error?: string;
  placeholder?: string;
}

export function SelectField({
  label,
  name,
  value,
  onChange,
  onBlur,
  options,
  error,
  placeholder,
}: SelectFieldProps) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label
        style={{
          fontSize: 11,
          fontWeight: 600,
          color: "var(--muted)",
          textTransform: "uppercase",
          letterSpacing: "0.8px",
          marginBottom: 6,
          display: "block",
        }}
      >
        {label}
      </label>
      <select
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        style={{
          width: "100%",
          padding: "10px 14px",
          background: "var(--surface2)",
          border: `1px solid ${error ? "var(--danger, #ef4444)" : "var(--border)"}`,
          borderRadius: "var(--radius-sm)",
          color: value ? "var(--fg)" : "var(--muted)",
          fontFamily: "var(--font-display)",
          fontSize: 13.5,
          outline: "none",
          boxSizing: "border-box",
          appearance: "none",
          cursor: "pointer",
        }}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
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

// ─── TOGGLE ──────────────────────────────────────────────────────────────────
interface ToggleProps {
  checked: boolean;
  onChange: (v: boolean) => void;
  size?: "sm" | "md";
}

export function Toggle({ checked, onChange, size = "md" }: ToggleProps) {
  const w = size === "sm" ? 36 : 44;
  const h = size === "sm" ? 20 : 24;
  const d = size === "sm" ? 14 : 18;

  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      style={{
        width: w,
        height: h,
        borderRadius: 99,
        border: "none",
        padding: 3,
        background: checked ? "var(--accent)" : "var(--surface3)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: checked ? "flex-end" : "flex-start",
        transition: "background .22s",
        flexShrink: 0,
      }}
    >
      <span
        style={{
          width: d,
          height: d,
          borderRadius: "50%",
          background: "#fff",
          display: "block",
          transition: "all .22s",
          boxShadow: "0 1px 4px rgba(0,0,0,.2)",
        }}
      />
    </button>
  );
}

// ─── SECTION CARD ────────────────────────────────────────────────────────────
interface SectionCardProps {
  title?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
  style?: React.CSSProperties;
}

export function SectionCard({
  title,
  children,
  action,
  style,
}: SectionCardProps) {
  return (
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
        padding: 24,
        ...style,
      }}
    >
      {(title || action) && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 18,
          }}
        >
          {title && (
            <div
              style={{
                fontSize: 13.5,
                fontWeight: 700,
                letterSpacing: "-0.2px",
              }}
            >
              {title}
            </div>
          )}
          {action}
        </div>
      )}
      {children}
    </div>
  );
}

// ─── SAVE BUTTON ─────────────────────────────────────────────────────────────
interface SaveButtonProps {
  label?: string;
  loading?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "secondary" | "danger";
  icon?: React.ReactNode;
  disabled?: boolean;
}

export function ActionButton({
  label = "Save",
  loading = false,
  onClick,
  type = "button",
  variant = "primary",
  icon,
  disabled,
}: SaveButtonProps) {
  const bg =
    variant === "primary"
      ? "var(--accent)"
      : variant === "danger"
        ? "var(--danger, #ef4444)"
        : "var(--surface2)";
  const color =
    variant === "secondary"
      ? "var(--fg)"
      : variant === "primary"
        ? "var(--bg)"
        : "#fff";
  const border = variant === "secondary" ? "1px solid var(--border)" : "none";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 7,
        padding: "8px 18px",
        borderRadius: "var(--radius-sm)",
        background: bg,
        color,
        border,
        cursor: disabled || loading ? "not-allowed" : "pointer",
        fontSize: 12.5,
        fontWeight: 600,
        fontFamily: "var(--font-display)",
        opacity: disabled || loading ? 0.6 : 1,
        transition: "opacity .15s",
      }}
    >
      {loading ? (
        <span
          style={{
            width: 13,
            height: 13,
            borderRadius: "50%",
            border: "2px solid currentColor",
            borderTopColor: "transparent",
            display: "inline-block",
            animation: "spin .7s linear infinite",
          }}
        />
      ) : (
        icon
      )}
      {label}
    </button>
  );
}

// ─── EMPTY STATE ─────────────────────────────────────────────────────────────
interface EmptyStateProps {
  emoji?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({
  emoji = "📭",
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 24px",
        textAlign: "center",
        gap: 12,
      }}
    >
      <div style={{ fontSize: 48 }}>{emoji}</div>
      <div style={{ fontSize: 16, fontWeight: 700 }}>{title}</div>
      {description && (
        <div
          style={{
            fontSize: 13.5,
            color: "var(--muted)",
            maxWidth: 320,
            lineHeight: 1.6,
          }}
        >
          {description}
        </div>
      )}
      {action && <div style={{ marginTop: 8 }}>{action}</div>}
    </div>
  );
}

// ─── VISIBILITY ROW ──────────────────────────────────────────────────────────
interface VisibilityRowProps {
  label: string;
  desc?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  last?: boolean;
}

export function VisibilityRow({
  label,
  desc,
  checked,
  onChange,
  last,
}: VisibilityRowProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 0",
        borderBottom: last ? undefined : "1px solid var(--border)",
      }}
    >
      <div>
        <div style={{ fontSize: 13.5, fontWeight: 500 }}>{label}</div>
        {desc && (
          <div style={{ fontSize: 11.5, color: "var(--muted)", marginTop: 2 }}>
            {desc}
          </div>
        )}
      </div>
      <Toggle checked={checked} onChange={onChange} />
    </div>
  );
}
