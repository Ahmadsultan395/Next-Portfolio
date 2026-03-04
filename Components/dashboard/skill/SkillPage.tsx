"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Skill } from "@/types/skill";
import { useSkill } from "@/context/SkillContext";

// ── tiny card shell ───────────────────────────────────────────────────────────
const Card = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) => (
  <div
    style={{
      background: "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius)",
      padding: 24,
      ...style,
    }}
  >
    {children}
  </div>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      fontSize: 13.5,
      fontWeight: 700,
      marginBottom: 18,
      letterSpacing: "-0.2px",
    }}
  >
    {children}
  </div>
);

// ── Badge pill ────────────────────────────────────────────────────────────────
const BadgePill = ({ label }: { label: "Primary" | "Support" }) => (
  <span
    style={{
      padding: "2px 10px",
      borderRadius: 99,
      fontSize: 10.5,
      fontWeight: 700,
      background:
        label === "Primary" ? "rgba(0,201,177,.15)" : "rgba(124,106,245,.15)",
      color: label === "Primary" ? "var(--accent)" : "#7c6af5",
      border: `1px solid ${label === "Primary" ? "rgba(0,201,177,.3)" : "rgba(124,106,245,.3)"}`,
    }}
  >
    {label}
  </span>
);

// ── Skill Category Card ───────────────────────────────────────────────────────
function SkillCard({
  skill,
  onDelete,
}: {
  skill: Skill;
  onDelete: (id: string) => void;
}) {
  const [confirm, setConfirm] = useState(false);
  return (
    <div
      style={{
        background: "var(--surface2)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
        padding: 20,
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: "linear-gradient(135deg,var(--accent),#7c6af5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              flexShrink: 0,
            }}
          >
            {skill.categoryEmoji}
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14 }}>
              {skill.categoryName}
            </div>
            <div
              style={{ fontSize: 11.5, color: "var(--muted)", marginTop: 2 }}
            >
              {skill.categorySubtitle}
            </div>
          </div>
        </div>
        <BadgePill label={skill.badge as any} />
      </div>

      {/* Skill tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {skill.items.map((item, i) => (
          <span
            key={i}
            style={{
              padding: "4px 10px",
              borderRadius: 99,
              fontSize: 12,
              background: "var(--surface3)",
              border: "1px solid var(--border)",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            {item.emoji && <span>{item.emoji}</span>}
            {item.name}
          </span>
        ))}
        {skill.items.length === 0 && (
          <span style={{ fontSize: 12, color: "var(--muted)" }}>
            No items yet
          </span>
        )}
      </div>

      {/* Focus */}
      <div
        style={{
          fontSize: 11.5,
          color: "var(--muted)",
          borderTop: "1px solid var(--border)",
          paddingTop: 10,
        }}
      >
        Focus: {skill.focus}
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: 8 }}>
        <Link
          href={`/dashboard/skill/editskill?id=${skill._id}`}
          style={{ flex: 1 }}
        >
          <button
            style={{
              width: "100%",
              padding: "7px 0",
              background: "var(--surface3)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-sm)",
              cursor: "pointer",
              fontSize: 12,
              fontWeight: 600,
              color: "var(--fg)",
            }}
          >
            ✏️ Edit
          </button>
        </Link>
        {!confirm ? (
          <button
            onClick={() => setConfirm(true)}
            style={{
              flex: 1,
              padding: "7px 0",
              background: "rgba(239,68,68,.1)",
              border: "1px solid rgba(239,68,68,.3)",
              borderRadius: "var(--radius-sm)",
              cursor: "pointer",
              fontSize: 12,
              fontWeight: 600,
              color: "#ef4444",
            }}
          >
            🗑 Delete
          </button>
        ) : (
          <div style={{ display: "flex", gap: 6, flex: 1 }}>
            <button
              onClick={() => onDelete(skill._id)}
              style={{
                flex: 1,
                padding: "7px 0",
                background: "#ef4444",
                border: "none",
                borderRadius: "var(--radius-sm)",
                cursor: "pointer",
                fontSize: 11,
                fontWeight: 700,
                color: "#fff",
              }}
            >
              Confirm
            </button>
            <button
              onClick={() => setConfirm(false)}
              style={{
                flex: 1,
                padding: "7px 0",
                background: "var(--surface3)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-sm)",
                cursor: "pointer",
                fontSize: 11,
                color: "var(--fg)",
              }}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function SkillPage() {
  const { skills, approach, loading, deleteSkill, deleteApproach } = useSkill();

  if (loading)
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
          gap: 20,
        }}
      >
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              height: 200,
              borderRadius: "var(--radius)",
              background: "var(--surface2)",
              animation: "pulse 1.5s ease infinite",
            }}
          />
        ))}
      </div>
    );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* ── Header ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ fontSize: 13.5, color: "var(--muted)" }}>
          {skills.length} skill{" "}
          {skills.length === 1 ? "category" : "categories"}
        </div>
        <Link href="/dashboard/skill/addskill">
          <button
            style={{
              padding: "8px 18px",
              background: "var(--accent)",
              color: "var(--bg)",
              border: "none",
              borderRadius: "var(--radius-sm)",
              cursor: "pointer",
              fontSize: 12.5,
              fontWeight: 700,
            }}
          >
            + Add Skill Category
          </button>
        </Link>
      </div>

      {/* ── Empty state ── */}
      {skills.length === 0 && (
        <Card>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "60px 24px",
              gap: 14,
            }}
          >
            <div style={{ fontSize: 48 }}>⚡</div>
            <div style={{ fontSize: 16, fontWeight: 700 }}>
              No skill categories yet
            </div>
            <div
              style={{
                fontSize: 13.5,
                color: "var(--muted)",
                maxWidth: 300,
                textAlign: "center",
              }}
            >
              Add your first skill category to showcase your expertise.
            </div>
            <Link href="/dashboard/skill/addskill">
              <button
                style={{
                  padding: "9px 20px",
                  background: "var(--accent)",
                  color: "var(--bg)",
                  border: "none",
                  borderRadius: "var(--radius-sm)",
                  fontWeight: 600,
                  cursor: "pointer",
                  fontSize: 13,
                }}
              >
                + Add Skill Category
              </button>
            </Link>
          </div>
        </Card>
      )}

      {/* ── Skills Grid ── */}
      {skills.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
            gap: 20,
          }}
        >
          {skills.map((skill) => (
            <SkillCard key={skill._id} skill={skill} onDelete={deleteSkill} />
          ))}
        </div>
      )}

      {/* ── Approach Section ── */}
      <Card>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 18,
          }}
        >
          <SectionTitle>🧠 Development Approach</SectionTitle>
          <div style={{ display: "flex", gap: 8 }}>
            {!approach ? (
              <Link href="/dashboard/skill/addskill?tab=approach">
                <button
                  style={{
                    padding: "7px 14px",
                    background: "var(--accent)",
                    color: "var(--bg)",
                    border: "none",
                    borderRadius: "var(--radius-sm)",
                    cursor: "pointer",
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  + Add Approach
                </button>
              </Link>
            ) : (
              <>
                <Link
                  href={`/dashboard/skill/editskill?tab=approach&id=${approach._id}`}
                >
                  <button
                    style={{
                      padding: "7px 14px",
                      background: "var(--surface2)",
                      border: "1px solid var(--border)",
                      borderRadius: "var(--radius-sm)",
                      cursor: "pointer",
                      fontSize: 12,
                      fontWeight: 600,
                      color: "var(--fg)",
                    }}
                  >
                    ✏️ Edit
                  </button>
                </Link>
                <button
                  onClick={() => deleteApproach(approach._id)}
                  style={{
                    padding: "7px 14px",
                    background: "rgba(239,68,68,.1)",
                    border: "1px solid rgba(239,68,68,.3)",
                    borderRadius: "var(--radius-sm)",
                    cursor: "pointer",
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#ef4444",
                  }}
                >
                  🗑 Delete
                </button>
              </>
            )}
          </div>
        </div>

        {approach ? (
          <div>
            <p
              style={{
                fontSize: 13.5,
                color: "var(--muted)",
                lineHeight: 1.7,
                marginBottom: 20,
              }}
            >
              {approach.description}
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))",
                gap: 14,
              }}
            >
              {approach.workflow.map((step, i) => (
                <div
                  key={i}
                  style={{
                    padding: 16,
                    background: "var(--surface2)",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: "var(--accent)",
                      marginBottom: 6,
                      letterSpacing: "1px",
                    }}
                  >
                    {step.step}
                  </div>
                  <div
                    style={{ fontSize: 13.5, fontWeight: 600, marginBottom: 6 }}
                  >
                    {step.title}
                  </div>
                  <div
                    style={{
                      fontSize: 12.5,
                      color: "var(--muted)",
                      lineHeight: 1.6,
                    }}
                  >
                    {step.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "30px 0",
              color: "var(--muted)",
              fontSize: 13.5,
            }}
          >
            No approach added yet.
          </div>
        )}
      </Card>
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}`}</style>
    </div>
  );
}
