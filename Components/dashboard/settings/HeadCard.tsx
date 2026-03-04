import React, { Dispatch, SetStateAction, useState } from "react";
import ActivityBar from "./ActivityBar";
import { useProfile } from "@/context/ProfileContext";
import { buildFileUrl } from "@/Utils/utility";
import StatusBadge from "./StatusBadger";
import TechPill from "./TechPill";
interface HeadCardProps {
  setShowLogout: Dispatch<SetStateAction<boolean>>;
}
const HeadCard: React.FC<HeadCardProps> = ({ setShowLogout }) => {
  const { profileData: p } = useProfile();

  const avatarSrc = p?.avatarUrl ? buildFileUrl(p.avatarUrl) : null;
  const initials = (p?.name || "AS")
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  //activity
  const activityDays = [
    { d: "M", h: 20, a: true },
    { d: "T", h: 35, a: true },
    { d: "W", h: 15, a: false },
    { d: "T", h: 42, a: true },
    { d: "F", h: 28, a: true },
    { d: "S", h: 10, a: false },
    { d: "S", h: 38, a: true },
  ];
  const techStack = [
    { label: "Next.js", color: "#e2e8f0" },
    { label: "React", color: "#61dafb" },
    { label: "TypeScript", color: "#3178c6" },
    { label: "Node.js", color: "#84cc16" },
    { label: "MongoDB", color: "#22c55e" },
    { label: "Tailwind", color: "#38bdf8" },
    { label: "Firebase", color: "#f97316" },
    { label: "Redux", color: "#a855f7" },
  ];

  return (
    <>
      <style>{`
        @keyframes _glow { 0%,100%{opacity:.35} 50%{opacity:.75} }
        @keyframes _scan { 0%{transform:translateY(-100%)} 100%{transform:translateY(400%)} }
        .lbtn:hover { transform:translateY(-2px) !important; box-shadow:0 10px 32px rgba(255, 77, 110, 0.253) !important; }
      `}</style>

      <div
        className="sp"
        style={{
          position: "relative",
          overflow: "hidden",
          background: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: 22,
          animationDelay: ".04s",
        }}
      >
        {/* animated bg glows */}
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -80,
            width: 280,
            height: 280,
            borderRadius: "50%",
            background: "#6365f166",
            opacity: 0.07,
            filter: "blur(80px)",
            pointerEvents: "none",
            animation: "_glow 5s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -60,
            left: -40,
            width: 220,
            height: 220,
            borderRadius: "50%",
            background: "#06b5d47c",
            opacity: 0.05,
            filter: "blur(70px)",
            pointerEvents: "none",
            animation: "_glow 7s ease-in-out infinite reverse",
          }}
        />

        {/* scan line effect */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            pointerEvents: "none",
            zIndex: 0,
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              height: 40,
              background:
                "linear-gradient(to bottom,transparent,rgba(99,102,241,.04),transparent)",
              animation: "_scan 4s linear infinite",
            }}
          />
        </div>

        {/* top strip — terminal style */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            padding: "10px 20px",
            borderBottom: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "rgba(0,0,0,.15)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div
              style={{
                width: 9,
                height: 9,
                borderRadius: "50%",
                background: "#ff5f57",
              }}
            />
            <div
              style={{
                width: 9,
                height: 9,
                borderRadius: "50%",
                background: "#febc2e",
              }}
            />
            <div
              style={{
                width: 9,
                height: 9,
                borderRadius: "50%",
                background: "#28c840",
              }}
            />
            <span
              style={{
                marginLeft: 10,
                fontSize: 11,
                color: "var(--text-secondary)",
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.04em",
              }}
            >
              ~/dashboard/profile
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#22c55e",
                boxShadow: "0 0 6px rgba(34,197,94,.8)",
              }}
            />
            <span
              style={{
                fontSize: 10.5,
                color: "#22c55e",
                fontWeight: 600,
                letterSpacing: "0.05em",
              }}
            >
              ONLINE
            </span>
          </div>
        </div>

        {/* main content */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            padding: "24px 24px 20px",
            display: "flex",
            gap: 24,
            flexWrap: "wrap",
            alignItems: "flex-start",
          }}
        >
          {/* LEFT — avatar + status badges */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 12,
              flexShrink: 0,
            }}
          >
            {/* Avatar with ring */}
            <div style={{ position: "relative" }}>
              <div
                style={{
                  width: 84,
                  height: 84,
                  borderRadius: "50%",
                  padding: 3,
                  background: "linear-gradient(135deg,#6366f1,#06b6d4,#8b5cf6)",
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: "3px solid var(--card)",
                  }}
                >
                  {avatarSrc ? (
                    <img
                      src={avatarSrc}
                      alt={p?.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        background: "linear-gradient(135deg,#1e1b4b,#312e81)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 22,
                        fontWeight: 900,
                        color: "#a5b4fc",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {initials}
                    </div>
                  )}
                </div>
              </div>
              {/* pulse ring */}
              <div
                style={{
                  position: "absolute",
                  inset: -4,
                  borderRadius: "50%",
                  border: "1.5px solid #22c55e44",
                  animation: "_glow 2s ease-in-out infinite",
                }}
              />
            </div>

            {/* status badges */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 6,
                alignItems: "center",
              }}
            >
              <StatusBadge
                on={!!p?.availableForFreelance}
                trueText="Available"
                falseText="Busy"
                color="#22c55e"
              />
            </div>
          </div>

          {/* MIDDLE — name + tech stack + activity */}
          <div
            style={{
              flex: 1,
              minWidth: 200,
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            {/* name + role */}
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  flexWrap: "wrap",
                  marginBottom: 4,
                }}
              >
                <span
                  style={{
                    fontSize: 22,
                    fontWeight: 900,
                    color: "var(--text-primary)",
                    letterSpacing: "-0.025em",
                    lineHeight: 1,
                  }}
                >
                  {p?.name || "Ahmad Sultan"}
                </span>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    padding: "3px 9px",
                    borderRadius: 6,
                    background: "#6366f11a",
                    color: "#818cf8",
                    border: "1px solid #6366f130",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  Admin
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span
                  style={{
                    fontSize: 13,
                    color: "var(--text-secondary)",
                    fontWeight: 500,
                  }}
                >
                  {p?.role || "Full Stack Developer"}
                </span>
                <span style={{ fontSize: 11, color: "var(--text-secondary)" }}>
                  ·
                </span>
                <span
                  style={{
                    fontSize: 11.5,
                    fontFamily: "var(--font-mono)",
                    color: "#6366f1",
                    background: "#6366f10d",
                    padding: "2px 8px",
                    borderRadius: 5,
                    border: "1px solid #6366f122",
                  }}
                >
                  since {new Date(p?.createdAt || Date.now()).getFullYear()}
                </span>
              </div>
            </div>

            {/* tech stack pills */}
            <div>
              <div
                style={{
                  fontSize: 10,
                  color: "var(--text-secondary)",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                Tech Stack
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {techStack.map((t) => (
                  <TechPill key={t.label} label={t.label} color={t.color} />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — logout + quick meta */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              alignItems: "flex-end",
              flexShrink: 0,
            }}
          >
            <button
              className="lbtn"
              onClick={() => setShowLogout(true)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                padding: "10px 20px",
                borderRadius: 11,
                border: "none",
                background: "linear-gradient(135deg,#ff4d6d,#c9184a)",
                color: "#fff",
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 4px 16px rgba(255,77,109,.3)",
                transition: "all .2s ease",
                whiteSpace: "nowrap",
                marginBottom: "1rem",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Logout
            </button>

            {/* mini activity bars */}
            <div>
              <div
                style={{
                  fontSize: 10,
                  color: "var(--text-secondary)",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: 12,
                }}
              >
                Weekly Activity
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  gap: 5,
                  height: 50,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
                    paddingBottom: 14,
                  }}
                >
                  <span style={{ fontSize: 9, color: "var(--text-secondary)" }}>
                    50
                  </span>
                  <span style={{ fontSize: 9, color: "var(--text-secondary)" }}>
                    0
                  </span>
                </div>
                {activityDays.map((d, i) => (
                  <ActivityBar key={i} day={d.d} height={d.h} active={d.a} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeadCard;
