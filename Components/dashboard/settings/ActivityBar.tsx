import { useEffect, useState } from "react";

// ─── ACTIVITY BAR ─────────────────────────────────────────────
function ActivityBar({
  day,
  height,
  active,
}: {
  day: string;
  height: number;
  active?: boolean;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setTimeout(() => setMounted(true), 100);
  }, []);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
      }}
    >
      <div
        style={{
          width: 10,
          borderRadius: 3,
          background: active ? "#6366f1" : "#6366f120",
          transition: "height .6s cubic-bezier(.34,1.1,.64,1)",
          height: mounted ? height : 0,
          minHeight: 4,
        }}
      />
      <span
        style={{ fontSize: 9, color: "var(--text-secondary)", fontWeight: 600 }}
      >
        {day}
      </span>
    </div>
  );
}

export default ActivityBar;
