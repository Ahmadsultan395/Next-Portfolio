import React from "react";
import SectionHeader from "./SectionHeader";
import { useProfile } from "@/context/ProfileContext";

const DeveloperProfile = () => {
  const { profileData: p } = useProfile();
  return (
    <>
      <style>{`
        @keyframes _glow { 0%,100%{opacity:.35} 50%{opacity:.75} }
        
        @keyframes _scan { 0%{transform:translateY(-100%)} 100%{transform:translateY(400%)} }
         @keyframes _blink{ 0%,100%{opacity:1} 50%{opacity:0} }
         .sp  { animation: _up .32s ease both; }
        .lbtn:hover { transform:translateY(-2px) !important; box-shadow:0 10px 32px rgba(255, 77, 110, 0.253) !important; }
      `}</style>
      <div className="sp" style={{ animationDelay: ".12s" }}>
        <SectionHeader title="Developer Identity" color="#10b981" />
        <div
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: 18,
            overflow: "hidden",
          }}
        >
          {/* window chrome */}
          <div
            style={{
              background: "#0d1117",
              borderBottom: "1px solid #30363d",
              padding: "12px 18px",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "#ff5f57",
              }}
            />
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "#febc2e",
              }}
            />
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "#28c840",
              }}
            />
            <span
              style={{
                marginLeft: 10,
                fontSize: 11,
                color: "#8b949e",
                fontFamily: "var(--font-mono)",
              }}
            >
              profile.json
            </span>
            <div
              style={{
                marginLeft: "auto",
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#22c55e",
                  boxShadow: "0 0 5px rgba(34,197,94,.7)",
                  animation: "_glow 2s ease-in-out infinite",
                }}
              />
              <span
                style={{
                  fontSize: 10,
                  color: "#8b949e",
                  fontFamily: "var(--font-mono)",
                }}
              >
                read-only
              </span>
            </div>
          </div>
          {/* code content */}
          <div
            style={{
              background: "#0d1117",
              padding: "20px 24px",
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: 13,
              lineHeight: 2,
            }}
          >
            <div style={{ color: "#e6edf3" }}>
              <span style={{ color: "#8b949e" }}>{"{"}</span>
            </div>
            {[
              {
                k: "name",
                v: `"${p?.name || "Ahmad Sultan"}"`,
                c: "#a8daab",
              },
              {
                k: "role",
                v: `"${p?.role || "Full Stack Developer"}"`,
                c: "#a8daab",
              },
              { k: "email", v: `"${p?.email || "—"}"`, c: "#a8daab" },
              { k: "phone", v: `"${p?.phone || "—"}"`, c: "#a8daab" },
              { k: "location", v: `"${p?.location || "—"}"`, c: "#a8daab" },
              {
                k: "freelance",
                v: p?.availableForFreelance ? "true" : "false",
                c: p?.availableForFreelance ? "#56d364" : "#f85149",
              },
              {
                k: "contact",
                v: p?.acceptContactForm ? "true" : "false",
                c: p?.acceptContactForm ? "#56d364" : "#f85149",
              },
              {
                k: "visible",
                v: p?.showOnLanding ? "true" : "false",
                c: p?.showOnLanding ? "#56d364" : "#f85149",
              },
            ].map((row, i, arr) => (
              <div key={i} style={{ display: "flex", paddingLeft: 20 }}>
                <span style={{ color: "#ff7b72" }}>"{row.k}"</span>
                <span style={{ color: "#8b949e" }}>:&nbsp;</span>
                <span style={{ color: row.c }}>{row.v}</span>
                <span style={{ color: "#8b949e" }}>
                  {i < arr.length - 1 ? "," : ""}
                </span>
              </div>
            ))}
            <div style={{ color: "#8b949e" }}>{"}"}</div>
            {/* blinking cursor */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                marginTop: 8,
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  color: "#3fb950",
                  fontFamily: "monospace",
                }}
              >
                ▶
              </span>
              <span style={{ fontSize: 11, color: "#8b949e" }}>
                No errors found
              </span>
              <div
                style={{
                  width: 7,
                  height: 14,
                  background: "#6366f1",
                  borderRadius: 1,
                  animation: "_blink 1.2s ease-in-out infinite",
                  marginLeft: 4,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeveloperProfile;
