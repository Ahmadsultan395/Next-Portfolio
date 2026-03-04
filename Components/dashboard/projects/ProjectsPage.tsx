"use client";
import { useState } from "react";
import Link from "next/link";

import { StatusBadge, TechTag } from "../ui/Widgets";
import Icon, { ICONS } from "../ui/Icon";
import { useToast } from "../ui/ToastProvider";
import { PROJECT_CATEGORIES } from "@/validation/projectValidation";
import { useProject } from "@/context/ProjectContext";
import { CategoryFilter, Project, StatusFilter } from "@/types/project";
import { buildFileUrl } from "@/services/ProfileService";

// ── Status badge colors ───────────────────────────────────────────────────────
const STATUS_EMOJI: Record<string, string> = {
  live: "🟢",
  wip: "🟡",
  plan: "🔵",
};

// ── Category filter list ──────────────────────────────────────────────────────
const CAT_FILTERS = ["all", ...PROJECT_CATEGORIES];

export default function ProjectsPage() {
  const { projects, loading, deleteProject } = useProject();
  const { showToast } = useToast();
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");

  console.log(projects);

  // ── Filtered list ─────────────────────────────────────────────────────────
  const filtered = projects
    .filter((p) => statusFilter === "all" || p.status === statusFilter)
    .filter((p) => categoryFilter === "all" || p.category === categoryFilter);

  const counts = {
    all: projects.length,
    live: projects.filter((p) => p.status === "live").length,
    wip: projects.filter((p) => p.status === "wip").length,
    plan: projects.filter((p) => p.status === "plan").length,
  };

  const statusBtns: { id: StatusFilter; label: string }[] = [
    { id: "all", label: `All (${counts.all})` },
    { id: "live", label: `🟢 Live (${counts.live})` },
    { id: "wip", label: `🟡 WIP (${counts.wip})` },
    { id: "plan", label: `🔵 Planned (${counts.plan})` },
  ];

  if (loading)
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))",
          gap: 16,
        }}
      >
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              height: 260,
              borderRadius: "var(--radius)",
              background: "var(--surface)",
              animation: "pulse 1.5s ease infinite",
              border: "1px solid var(--border)",
            }}
          />
        ))}
        <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}`}</style>
      </div>
    );

  return (
    <div>
      {/* ── Toolbar ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 12,
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        {/* Status filters */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {statusBtns.map((btn) => (
            <button
              key={btn.id}
              onClick={() => setStatusFilter(btn.id)}
              style={{
                padding: "7px 14px",
                borderRadius: "var(--radius-sm)",
                fontSize: 12.5,
                fontWeight: 600,
                cursor: "pointer",
                transition: "all .18s",
                fontFamily: "var(--font-display)",
                background:
                  statusFilter === btn.id ? "var(--accent)" : "var(--surface2)",
                color: statusFilter === btn.id ? "var(--bg)" : "var(--muted)",
                border: `1px solid ${statusFilter === btn.id ? "var(--accent)" : "var(--border)"}`,
              }}
            >
              {btn.label}
            </button>
          ))}
        </div>

        <Link href="/dashboard/projects/addproject">
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              padding: "8px 16px",
              borderRadius: "var(--radius-sm)",
              background: "var(--accent)",
              color: "var(--bg)",
              border: "none",
              cursor: "pointer",
              fontSize: 12.5,
              fontWeight: 600,
              fontFamily: "var(--font-display)",
            }}
          >
            <Icon path={ICONS.plus} size={14} /> New Project
          </button>
        </Link>
      </div>

      {/* ── Category filters ── */}
      <div
        style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}
      >
        {CAT_FILTERS.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat as CategoryFilter)}
            style={{
              padding: "5px 12px",
              borderRadius: 99,
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all .18s",
              background:
                categoryFilter === cat ? "var(--accent)" : "var(--surface2)",
              color: categoryFilter === cat ? "var(--bg)" : "var(--muted)",
              border: `1px solid ${categoryFilter === cat ? "var(--accent)" : "var(--border)"}`,
            }}
          >
            {cat === "all" ? "All" : cat}
          </button>
        ))}
      </div>

      {/* ── Projects Grid ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(350px,1fr))",
          gap: 16,
        }}
      >
        {filtered.map((p, i) => (
          <ProjectCard
            key={p._id}
            project={p}
            index={i}
            onDelete={async () => {
              await deleteProject(p._id);
              showToast(`Deleted: ${p.name}`);
            }}
            onToast={showToast}
          />
        ))}
      </div>

      {/* ── Empty state ── */}
      {filtered.length === 0 && !loading && (
        <div
          style={{
            textAlign: "center",
            padding: "60px 20px",
            color: "var(--muted)",
          }}
        >
          <div style={{ fontSize: 40, marginBottom: 12 }}>📭</div>
          <div style={{ fontSize: 14, marginBottom: 16 }}>
            No projects with this filter
          </div>
          <Link href="/dashboard/projects/addproject">
            <button
              style={{
                padding: "8px 18px",
                background: "var(--accent)",
                color: "var(--bg)",
                border: "none",
                borderRadius: "var(--radius-sm)",
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              + Add First Project
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

// ── Project Card ──────────────────────────────────────────────────────────────
function ProjectCard({
  project: p,
  index,
  onDelete,
  onToast,
}: {
  project: Project;
  index: number;
  onDelete: () => void;
  onToast: (msg: string) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const previewImage = buildFileUrl(p.imageUrl);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "var(--surface)",
        borderTop: `3px solid ${p.color}`,
        borderRadius: "var(--radius)",
        padding: 20,
        position: "relative",
        overflow: "hidden",
        transition: "all .22s",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        animation: `fadeUp .4s ease ${index * 0.06}s both`,
      }}
    >
      {/* Featured badge */}
      {p.featured && (
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            padding: "2px 8px",
            borderRadius: 99,
            fontSize: 10,
            fontWeight: 700,
            background: `${p.color}22`,
            color: p.color,
            border: `1px solid ${p.color}44`,
          }}
        >
          ⭐ Featured
        </div>
      )}

      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: 14,
          paddingRight: p.featured ? 70 : 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 44,
              height: 44,
              background: `${p.color}18`,
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              flexShrink: 0,
            }}
          >
            {p.emoji || "🚀"}
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700 }}>{p.name}</div>
            <div
              style={{
                fontSize: 11,
                color: "var(--muted)",
                fontFamily: "var(--font-mono)",
                marginTop: 2,
              }}
            >
              {p.category}
            </div>
          </div>
        </div>
        <StatusBadge status={p.status as any} />
      </div>

      {previewImage && (
        <div
          style={{
            marginTop: 12,
            maxWidth: "100%",
            height: 180,
            borderRadius: 8,
            overflow: "hidden",
            border: `1px solid var(--border)`,
          }}
        >
          {previewImage && (
            <img
              src={previewImage}
              alt="Project Preview"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          )}
        </div>
      )}

      {/* Description */}
      {p.desc && (
        <p
          style={{
            fontSize: 12.5,
            color: "var(--muted)",
            lineHeight: 1.6,
            marginBottom: 12,
          }}
        >
          {p.desc}
        </p>
      )}

      {/* Tech Tags */}
      {p.tech.length > 0 && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
            marginBottom: 12,
          }}
        >
          {p.tech.map((t) => (
            <TechTag key={t} label={t} color={p.color} />
          ))}
        </div>
      )}

      {/* Highlights */}
      {p.highlights.length > 0 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            marginBottom: 14,
          }}
        >
          {p.highlights.map((h, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 12,
                color: "var(--muted)",
              }}
            >
              <span style={{ color: p.color, fontSize: 10 }}>●</span> {h}
            </div>
          ))}
        </div>
      )}

      {/* Links row */}
      {(p.liveUrl || p.githubUrl) && (
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          {p.liveUrl && (
            <a
              href={p.liveUrl}
              target="_blank"
              rel="noreferrer"
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 5,
                padding: "6px 10px",
                borderRadius: "var(--radius-sm)",
                background: `${p.color}18`,
                border: `1px solid ${p.color}44`,
                color: p.color,
                fontSize: 11.5,
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              🔗 Live Demo
            </a>
          )}
          {p.githubUrl && (
            <a
              href={p.githubUrl}
              target="_blank"
              rel="noreferrer"
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 5,
                padding: "6px 10px",
                borderRadius: "var(--radius-sm)",
                background: "var(--surface2)",
                border: "1px solid var(--border)",
                color: "var(--muted)",
                fontSize: 11.5,
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              🐙 GitHub
            </a>
          )}
        </div>
      )}

      {/* Actions */}
      {!confirmDelete ? (
        <div style={{ display: "flex", gap: 8 }}>
          <Link
            href={`/dashboard/projects/editproject?id=${p._id}`}
            style={{ flex: 1 }}
          >
            <button
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                padding: "7px 12px",
                borderRadius: "var(--radius-sm)",
                background: "var(--surface2)",
                border: "1px solid var(--border)",
                color: "var(--fg)",
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "var(--font-display)",
              }}
            >
              <Icon path={ICONS.edit} size={13} /> Edit
            </button>
          </Link>
          {p.liveUrl && (
            <a href={p.liveUrl} target="_blank" rel="noreferrer">
              <button
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: "var(--radius-sm)",
                  background: "var(--surface2)",
                  border: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "var(--muted)",
                }}
              >
                <Icon path={ICONS.eye} size={14} />
              </button>
            </a>
          )}
          <button
            onClick={() => setConfirmDelete(true)}
            style={{
              width: 34,
              height: 34,
              borderRadius: "var(--radius-sm)",
              background: "rgba(255,77,109,.08)",
              border: "1px solid rgba(255,77,109,.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "var(--danger)",
            }}
          >
            <Icon path={ICONS.trash} size={14} />
          </button>
        </div>
      ) : (
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={onDelete}
            style={{
              flex: 1,
              padding: "7px 0",
              background: "#ef4444",
              color: "#fff",
              border: "none",
              borderRadius: "var(--radius-sm)",
              cursor: "pointer",
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            Confirm Delete
          </button>
          <button
            onClick={() => setConfirmDelete(false)}
            style={{
              flex: 1,
              padding: "7px 0",
              background: "var(--surface2)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-sm)",
              cursor: "pointer",
              fontSize: 12,
              color: "var(--fg)",
            }}
          >
            Cancel
          </button>
        </div>
      )}

      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  );
}
