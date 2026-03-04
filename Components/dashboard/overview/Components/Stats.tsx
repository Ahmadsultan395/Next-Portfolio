"use client";

import { useAbout } from "@/context/AboutContext";
import Icon, { ICONS } from "../../ui/Icon";

export default function StatsSection() {
  const { about } = useAbout();

  const accentMap: Record<string, string> = {
    s1: "var(--danger)",
    s2: "var(--accent)",
    s3: "var(--accent3)",
    s4: "var(--accent2)",
  };

  // Static config (icon + color class)
  const staticConfig = [
    { icon: "briefcase", cls: "s1", up: true },
    { icon: "folder", cls: "s2", up: true },
    { icon: "star", cls: "s3", up: true },
    { icon: "github", cls: "s4", up: true },
  ];

  if (!about?.stats) return null;

  return (
    <div
      style={{
        display: "grid",
        gap: "1.5rem",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      }}
    >
      {about.stats.map((item: any, index: number) => {
        const mergedStat = {
          ...item,
          ...staticConfig[index],
        };

        const color = accentMap[mergedStat.cls];

        return (
          <div
            key={item._id}
            className="fade-up"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              padding: "20px 22px",
              animationDelay: `${index * 0.08}s`,
              borderTop: `2px solid ${color}`,
            }}
          >
            {/* Top */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 8,
                  background: `${color}18`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon path={ICONS[mergedStat.icon]} size={20} color={color} />
              </div>

              <span style={{ fontSize: 12 }}>{mergedStat.value}</span>
            </div>

            {/* Big Value */}
            <div
              style={{
                fontSize: 30,
                fontWeight: 800,
                color,
              }}
            >
              {mergedStat.value}
            </div>

            {/* Label */}
            <div
              style={{
                fontSize: 12,
                marginTop: 4,
                color: "var(--muted)",
              }}
            >
              {mergedStat.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}
