"use client";
import { useState } from "react";
import type { Skill } from "../data";
import Link from "next/link";

// ─── TOGGLE SWITCH ────────────────────────────────────────────
interface ToggleProps {
  defaultOn?: boolean;
  onChange?: (val: boolean) => void;
}
export function Toggle({ defaultOn = false, onChange }: ToggleProps) {
  const [on, setOn] = useState(defaultOn);
  const handle = () => {
    setOn((v) => {
      onChange?.(!v);
      return !v;
    });
  };
  return (
    <button
      onClick={handle}
      aria-pressed={on}
      style={{
        width: 40,
        height: 22,
        borderRadius: 99,
        background: on ? "var(--accent)" : "var(--border-bright)",
        border: "none",
        cursor: "pointer",
        position: "relative",
        transition: "background .2s",
        flexShrink: 0,
      }}
    >
      <span
        style={{
          position: "absolute",
          top: 3,
          left: on ? "calc(100% - 19px)" : 3,
          width: 16,
          height: 16,
          borderRadius: "50%",
          background: "#fff",
          transition: "left .2s",
          display: "block",
        }}
      />
    </button>
  );
}

// ─── SKILL BAR ───────────────────────────────────────────────
interface SkillBarProps {
  skill: Skill;
  animate?: boolean;
}
export function SkillBar({ skill, animate = true }: SkillBarProps) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 6,
        }}
      >
        <span
          style={{
            fontSize: 13,
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          {skill.emoji} {skill.name}
        </span>
        <span
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: "var(--accent)",
            fontFamily: "var(--font-mono)",
          }}
        >
          {skill.level}%
        </span>
      </div>
      <div
        style={{
          height: 6,
          background: "var(--surface3)",
          borderRadius: 99,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            borderRadius: 99,
            width: animate ? `${skill.level}%` : "0%",
            background: `linear-gradient(90deg, ${skill.color}, ${skill.color}99)`,
            transition: "width 1.2s cubic-bezier(.4,0,.2,1)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <span
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(90deg, transparent 30%, rgba(255,255,255,.25), transparent 70%)",
              animation: "shimmer 2s infinite",
            }}
          />
        </div>
      </div>
      <style>{`@keyframes shimmer{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}`}</style>
    </div>
  );
}

// ─── TECH TAG ────────────────────────────────────────────────
interface TechTagProps {
  label: string;
  color?: string;
}
export function TechTag({ label, color = "var(--accent)" }: TechTagProps) {
  return (
    <span
      style={{
        padding: "5px 12px",
        borderRadius: 99,
        fontSize: 11.5,
        fontWeight: 600,
        border: "1px solid var(--border)",
        background: "var(--surface2)",
        color: "var(--fg)",
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        cursor: "default",
        transition: "all .18s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = `${color}80`;
        (e.currentTarget as HTMLElement).style.color = color;
        (e.currentTarget as HTMLElement).style.background = `${color}10`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
        (e.currentTarget as HTMLElement).style.color = "var(--fg)";
        (e.currentTarget as HTMLElement).style.background = "var(--surface2)";
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: color,
          flexShrink: 0,
        }}
      />
      {label}
    </span>
  );
}

// ─── BREADCRUMB ──────────────────────────────────────────────
interface BreadcrumbProps {
  items: { label: string; active?: boolean; href?: string }[];
}
export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        marginBottom: 22,
      }}
    >
      {items.map((item, i) => (
        <span key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              fontSize: 12,
              color: item.active ? "var(--fg)" : "var(--muted)",
              fontWeight: item.active ? 600 : 400,
              cursor: "pointer",
            }}
          >
            {item.href ? (
              <Link href={item.href}>{item.label}</Link>
            ) : (
              item.label
            )}
          </span>

          {i < items.length - 1 && (
            <span
              style={{
                fontSize: 12,
                color: "var(--border-bright)",
                cursor: "pointer",
              }}
            >
              ›
            </span>
          )}
        </span>
      ))}
    </div>
  );
}

// ─── EMPTY STATE ─────────────────────────────────────────────
interface EmptyStateProps {
  icon?: string;
  text?: string;
}
export function EmptyState({
  icon = "📭",
  text = "Nothing here yet",
}: EmptyStateProps) {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "40px 20px",
        color: "var(--muted)",
      }}
    >
      <div style={{ fontSize: 40, marginBottom: 12 }}>{icon}</div>
      <div style={{ fontSize: 14 }}>{text}</div>
    </div>
  );
}

// ─── STATUS BADGE ────────────────────────────────────────────
interface StatusBadgeProps {
  status: "live" | "wip" | "plan";
}
export function StatusBadge({ status }: StatusBadgeProps) {
  const map = {
    live: { label: "🟢 Live", bg: "rgba(34,211,165,.12)", color: "#22d3a5" },
    wip: { label: "🟡 WIP", bg: "rgba(245,166,35,.12)", color: "#f5a623" },
    plan: { label: "🔵 Plan", bg: "rgba(124,106,245,.12)", color: "#7c6af5" },
  };
  const s = map[status];
  return (
    <span
      style={{
        fontSize: 10,
        fontWeight: 600,
        padding: "3px 9px",
        borderRadius: 99,
        background: s.bg,
        color: s.color,
        flexShrink: 0,
      }}
    >
      {s.label}
    </span>
  );
}

// ─── SECTION CARD ────────────────────────────────────────────
interface SectionCardProps {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  glowColor?: string;
  style?: React.CSSProperties;
}
export function SectionCard({
  title,
  subtitle,
  action,
  children,
  glowColor,
  style,
}: SectionCardProps) {
  return (
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
        padding: 24,
        position: "relative",
        overflow: "hidden",
        boxShadow: glowColor ? `0 0 40px ${glowColor}` : undefined,
        ...style,
      }}
    >
      {(title || action) && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <div>
            {title && (
              <div style={{ fontSize: 15, fontWeight: 700 }}>{title}</div>
            )}
            {subtitle && (
              <div
                style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}
              >
                {subtitle}
              </div>
            )}
          </div>
          {action}
        </div>
      )}
      {children}
    </div>
  );
}
