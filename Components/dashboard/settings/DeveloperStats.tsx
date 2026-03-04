import React from "react";
import SectionHeader from "./SectionHeader";
import StatBlock from "./StatBlock";
import { useAbout } from "@/context/AboutContext";

const DeveloperStats = () => {
  const { about } = useAbout();
  return (
    <>
      <div className="sp" style={{ animationDelay: ".08s" }}>
        <SectionHeader title="Developer Overview" color="#6366f1" />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(140px,1fr))",
            gap: 12,
          }}
        >
          <StatBlock
            value={about?.stats?.[0].value || ""}
            label={about?.stats?.[0].label || ""}
            color="#6366f1"
          />
          <StatBlock
            value={about?.stats?.[1].value || ""}
            label={about?.stats?.[1].label || ""}
            color="#10b981"
          />
          <StatBlock
            value={about?.stats?.[2].value || ""}
            label={about?.stats?.[2].label || ""}
            color="#f97316"
          />
          <StatBlock
            value={about?.stats?.[3].value || ""}
            label={about?.stats?.[3].label || ""}
            color="#06b6d4"
          />
          {/* "☕" */}
          <StatBlock value="v2.0" label="Dashboard" color="#a855f7" />
          <StatBlock value="2026" label="Joined" color="#ec4899" />
        </div>
      </div>
    </>
  );
};

export default DeveloperStats;
