import { useState } from "react";

// ─── TECH PILL ────────────────────────────────────────────────
const TechPill = ({ label, color }: { label: string; color: string }) => {
  const [hov, setHov] = useState(false);
  return (
    <span
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "5px 12px",
        borderRadius: 8,
        fontSize: 11.5,
        fontWeight: 600,
        border: `1px solid ${hov ? color + "80" : color + "35"}`,
        background: hov ? color + "18" : color + "0a",
        color: hov ? color : color + "cc",
        transition: "all .18s ease",
        cursor: "default",
        userSelect: "none",
      }}
    >
      {label}
    </span>
  );
};

export default TechPill;
