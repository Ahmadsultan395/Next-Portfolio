"use client";

import Link from "next/link";
import { SectionCard } from "../../ui/Widgets";
import Icon, { ICONS } from "../../ui/Icon";
import { useProject } from "@/context/ProjectContext";

export default function ProjectListCard() {
  const { projects } = useProject();

  if (!projects || projects.length === 0) return null;
  return (
    <SectionCard
      title={"projects"}
      action={
        <Link
          href={"/dashboard/projects"}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "5px 10px",
            borderRadius: "var(--radius-sm)",
            background: "var(--surface2)",
            border: "1px solid var(--border)",
            color: "var(--muted)",
            fontSize: 12,
            textDecoration: "none",
            fontFamily: "var(--font-display)",
          }}
        >
          <Icon path={ICONS.plus} size={13} /> Add
        </Link>
      }
    >
      {projects.slice(0, 4).map((p, i) => (
        <div
          key={p._id}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: "10px 0",
            borderBottom: i < 3 ? "1px solid var(--border)" : undefined,
            cursor: "pointer",
            transition: "padding-left 0.18s ease",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.paddingLeft = "6px")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.paddingLeft = "0")
          }
        >
          {/* Emoji Box */}
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "var(--radius-sm)",
              background: `${p.color}18`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              flexShrink: 0,
            }}
          >
            {p.emoji}
          </div>

          {/* Project Info */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {p.name}
            </div>
            <div
              style={{
                fontSize: 11,
                color: "var(--muted)",
                fontFamily: "var(--font-mono)",
                marginTop: 1,
              }}
            >
              {Array.isArray(p.tech) && p.tech[0]}
            </div>
          </div>
        </div>
      ))}
    </SectionCard>
  );
}
