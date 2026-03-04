"use client";

import { useEffect, useState } from "react";
import { SectionCard } from "../../ui/Widgets";
import { useProject } from "@/context/ProjectContext";
import { months } from "../../data";

export default function ActivityChart() {
  const [animated, setAnimated] = useState(false);
  const { projects } = useProject();

  const currentYear = new Date().getFullYear();

  // Monthly activity counts
  const activityVals = Array(12).fill(0);

  projects?.forEach((p: any) => {
    const date = new Date(p.createdAt);
    if (date.getFullYear() === currentYear) {
      const month = date.getMonth();
      activityVals[month] += 1;
    }
  });

  // Normalize height (0-100%), set minimum for empty months
  const maxVal = Math.max(...activityVals, 1);
  const activityPercents = activityVals.map(
    (v) => (v === 0 ? 10 : (v / maxVal) * 100), // 5% height for zero activity
  );

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <SectionCard
      title="Portfolio Activity"
      subtitle="Projects added this year"
      action={
        <button
          style={{
            padding: "5px 10px",
            borderRadius: "var(--radius-sm)",
            background: "var(--surface2)",
            border: "1px solid var(--border)",
            color: "var(--fg)",
            fontSize: 12,
            cursor: "pointer",
            fontFamily: "var(--font-display)",
          }}
        >
          {currentYear}
        </button>
      }
      glowColor="rgba(0,201,177,.06)"
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: 6,
          height: 80,
          marginTop: 16,
        }}
      >
        {activityPercents.map((v, i) => {
          // Color logic
          const color =
            activityVals[i] === 0
              ? "rgba(255,77,109,.6)" // Red for no activity
              : i % 2 === 0
                ? "rgba(0,201,177,.6)"
                : "rgba(124,106,245,.6)";

          return (
            <div
              key={i}
              title={`${activityVals[i]} project${activityVals[i] !== 1 ? "s" : ""}`}
              style={{
                flex: 1,
                borderRadius: "4px 4px 0 0",
                background: color,
                height: animated ? `${v}%` : "0%",
                transition: `height .8s ease ${i * 0.05}s`,
                cursor: "pointer",
              }}
            />
          );
        })}
      </div>

      {/* Month Labels */}
      <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
        {months.map((m) => (
          <span
            key={m}
            style={{
              flex: 1,
              textAlign: "center",
              fontSize: 9,
              color: "var(--muted)",
            }}
          >
            {m}
          </span>
        ))}
      </div>
    </SectionCard>
  );
}
