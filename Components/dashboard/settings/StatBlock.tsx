import { useState } from "react";

function StatBlock({
  value,
  label,
  color,
}: {
  value: string;
  label: string;
  color: string;
}) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: "18px 20px",
        borderRadius: 16,
        border: `1.5px solid ${hov ? color + "55" : "var(--border)"}`,
        background: hov ? color + "0a" : "var(--card)",
        transition: "all .2s",
        cursor: "default",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: 28,
          fontWeight: 900,
          color: hov ? color : "var(--text-primary)",
          fontFamily: "var(--font-mono)",
          letterSpacing: "-0.03em",
          transition: "color .2s",
          lineHeight: 1,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: 11,
          color: "var(--text-secondary)",
          marginTop: 6,
          fontWeight: 600,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>
    </div>
  );
}

export default StatBlock;
