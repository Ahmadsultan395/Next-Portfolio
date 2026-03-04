"use client";
import { useState, useEffect } from "react";
import { useSkill } from "@/context/SkillContext";
import Link from "next/link";

// ─── CATEGORY COLOR THEMES ────────────────────────────────────
const CATEGORY_THEMES: Record<
  string,
  { from: string; to: string; glow: string; accent: string }
> = {
  Frontend: {
    from: "#6366f1",
    to: "#8b5cf6",
    glow: "rgba(99,102,241,0.3)",
    accent: "#818cf8",
  },
  Firebase: {
    from: "#f97316",
    to: "#fb923c",
    glow: "rgba(249,115,22,0.3)",
    accent: "#fb923c",
  },
  "Libraries / Frameworks": {
    from: "#06b6d4",
    to: "#22d3ee",
    glow: "rgba(6,182,212,0.3)",
    accent: "#22d3ee",
  },
  Tools: {
    from: "#10b981",
    to: "#34d399",
    glow: "rgba(16,185,129,0.3)",
    accent: "#34d399",
  },
  Backend: {
    from: "#f43f5e",
    to: "#fb7185",
    glow: "rgba(244,63,94,0.3)",
    accent: "#fb7185",
  },
  Database: {
    from: "#eab308",
    to: "#facc15",
    glow: "rgba(234,179,8,0.3)",
    accent: "#facc15",
  },
};

function getTheme(name: string) {
  return (
    CATEGORY_THEMES[name] ?? {
      from: "#6366f1",
      to: "#8b5cf6",
      glow: "rgba(99,102,241,0.3)",
      accent: "#818cf8",
    }
  );
}

// ─── MAIN ─────────────────────────────────────────────────────
export default function SkillsShowcase() {
  const { skills } = useSkill();
  const [activeIdx, setActiveIdx] = useState(0);

  if (!skills || skills.length === 0) return null;

  const active = skills[activeIdx];
  const theme = getTheme(active.categoryName);

  return (
    <>
      <style>{`
        @keyframes chipIn {
          from { opacity:0; transform:scale(0.8) translateY(8px); }
          to   { opacity:1; transform:scale(1)   translateY(0); }
        }
        @keyframes panelIn {
          from { opacity:0; transform:translateY(8px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes glowPulse {
          0%,100% { opacity:.4; transform:scale(1); }
          50%      { opacity:.8; transform:scale(1.08); }
        }
        .ssc-chip {
          transition: all .18s cubic-bezier(.34,1.56,.64,1);
          cursor:default;
        }
        .ssc-chip:hover {
          transform: translateY(-3px) scale(1.05);
        }
        .ssc-tab {
          transition: all .2s ease;
        }
        .ssc-tab:hover { transform: translateY(-1px); }
        .ssc-panel {
          animation: panelIn .28s ease both;
        }
        .ssc-chips-wrap::-webkit-scrollbar { display:none; }
        .ssc-tabs-wrap::-webkit-scrollbar { display:none; }
      `}</style>

      <div
        style={{
          background: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: 20,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          position: "relative",
        }}
      >
        {/* ── Ambient Glow ── */}
        <div
          style={{
            position: "absolute",
            top: -60,
            right: -60,
            width: 220,
            height: 220,
            borderRadius: "50%",
            background: theme.glow,
            filter: "blur(70px)",
            pointerEvents: "none",
            transition: "background .5s ease",
            animation: "glowPulse 4s ease-in-out infinite",
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -40,
            left: -40,
            width: 140,
            height: 140,
            borderRadius: "50%",
            background: theme.glow,
            filter: "blur(50px)",
            pointerEvents: "none",
            opacity: 0.3,
            zIndex: 0,
          }}
        />

        {/* ── HEADER ── */}
        <div
          style={{
            padding: "16px 20px 14px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid var(--border)",
            position: "relative",
            zIndex: 1,
            background: "linear-gradient(to bottom, var(--card), transparent)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* glowing dot */}
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: `linear-gradient(135deg, ${theme.from}, ${theme.to})`,
                boxShadow: `0 0 10px ${theme.glow}, 0 0 20px ${theme.glow}`,
                transition: "all .4s ease",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontWeight: 800,
                fontSize: 15,
                color: "var(--text-primary)",
                letterSpacing: "-0.02em",
              }}
            >
              Tech Stack
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* Badge */}
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                padding: "3px 10px",
                borderRadius: 20,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                background: `linear-gradient(135deg, ${theme.from}30, ${theme.to}18)`,
                color: theme.accent,
                border: `1.5px solid ${theme.from}50`,
                boxShadow: `0 0 8px ${theme.glow}`,
                transition: "all .4s ease",
              }}
            >
              {active.badge}
            </span>

            <Link
              href="/dashboard/skill"
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: theme.accent,
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 3,
                padding: "4px 10px",
                borderRadius: 8,
                background: `${theme.from}18`,
                border: `1px solid ${theme.from}33`,
                transition: "all .15s ease",
              }}
            >
              View all →
            </Link>
          </div>
        </div>

        {/* ── CATEGORY TABS ── */}
        <div
          className="ssc-tabs-wrap"
          style={{
            display: "flex",
            gap: 6,
            padding: "12px 16px 0",
            overflowX: "auto",
            scrollbarWidth: "none",
            flexShrink: 0,
            position: "relative",
            zIndex: 1,
          }}
        >
          {skills.map((cat: any, i: number) => {
            const t = getTheme(cat.categoryName);
            const isActive = i === activeIdx;
            return (
              <button
                key={cat._id}
                className="ssc-tab"
                onClick={() => setActiveIdx(i)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "7px 14px",
                  borderRadius: 12,
                  border: isActive
                    ? `1.5px solid ${t.from}`
                    : "1.5px solid var(--border)",
                  background: isActive
                    ? `linear-gradient(135deg, ${t.from}28, ${t.to}15)`
                    : "transparent",
                  color: isActive ? t.accent : "var(--text-secondary)",
                  fontSize: 11,
                  fontWeight: isActive ? 700 : 500,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                  boxShadow: isActive
                    ? `0 0 14px ${t.glow}, inset 0 1px 0 ${t.from}30`
                    : "none",
                }}
              >
                <span style={{ fontSize: 15 }}>{cat.categoryEmoji}</span>
                <span>{cat.categoryName}</span>
                {isActive && (
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      background: `${t.from}30`,
                      color: t.accent,
                      padding: "1px 6px",
                      borderRadius: 10,
                    }}
                  >
                    {cat.items.length}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ── PANEL ── */}
        <div
          key={activeIdx}
          className="ssc-panel"
          style={{
            flex: 1,
            padding: "14px 16px 16px",
            display: "flex",
            flexDirection: "column",
            gap: 12,
            overflow: "hidden",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* subtitle + count row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <p
              style={{
                fontSize: 11,
                color: "var(--text-secondary)",
                margin: 0,
              }}
            >
              {active.categorySubtitle}
            </p>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: theme.accent,
                background: `${theme.from}18`,
                padding: "2px 10px",
                borderRadius: 20,
                border: `1px solid ${theme.from}38`,
              }}
            >
              {active.items.length} techs
            </span>
          </div>

          {/* ── CHIPS ── */}
          <div
            className="ssc-chips-wrap"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              overflowY: "auto",
              scrollbarWidth: "none",
              paddingBottom: 4,
              flex: 1,
            }}
          >
            {active.items.map((item: any, idx: number) => (
              <SkillChip
                key={item._id}
                name={item.name}
                emoji={item.emoji}
                idx={idx}
                theme={theme}
              />
            ))}
          </div>

          {/* ── FOCUS TAGS ── */}
          <div
            style={{
              paddingTop: 12,
              borderTop: "1px solid var(--border)",
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 6,
            }}
          >
            {active.focus.split(" • ").map((f: string, i: number) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  padding: "4px 11px",
                  borderRadius: 8,
                  background: `linear-gradient(135deg, ${theme.from}14, ${theme.to}0a)`,
                  border: `1px solid ${theme.from}2a`,
                }}
              >
                <div
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${theme.from}, ${theme.to})`,
                    boxShadow: `0 0 6px ${theme.glow}`,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontSize: 10,
                    color: theme.accent,
                    fontWeight: 700,
                    letterSpacing: "0.04em",
                  }}
                >
                  {f}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// ─── SKILL CHIP ───────────────────────────────────────────────
function SkillChip({
  name,
  emoji,
  idx,
  theme,
}: {
  name: string;
  emoji: string;
  idx: number;
  theme: { from: string; to: string; glow: string; accent: string };
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="ssc-chip"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: emoji ? 6 : 0,
        padding: "7px 14px",
        borderRadius: 11,
        border: hovered
          ? `1.5px solid ${theme.from}`
          : "1.5px solid var(--border)",
        background: hovered
          ? `linear-gradient(135deg, ${theme.from}22, ${theme.to}14)`
          : "var(--bg)",
        color: hovered ? theme.accent : "var(--text-primary)",
        fontSize: 12,
        fontWeight: hovered ? 600 : 500,
        boxShadow: hovered
          ? `0 6px 20px ${theme.glow}, 0 0 0 1px ${theme.from}20, inset 0 1px 0 ${theme.from}20`
          : "0 1px 3px rgba(0,0,0,0.08)",
        userSelect: "none",
        animation: `chipIn .35s cubic-bezier(.34,1.56,.64,1) both`,
        animationDelay: `${idx * 30}ms`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* inner shimmer on hover */}
      {hovered && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(105deg, transparent 30%, ${theme.from}18 50%, transparent 70%)`,
            pointerEvents: "none",
          }}
        />
      )}
      {emoji && (
        <span style={{ fontSize: 14, lineHeight: 1, position: "relative" }}>
          {emoji}
        </span>
      )}
      <span style={{ lineHeight: 1, position: "relative" }}>{name}</span>
    </div>
  );
}
