// ─── STATUS BADGE ─────────────────────────────────────────────
function StatusBadge({
  on,
  trueText,
  falseText,
  color,
}: {
  on: boolean;
  trueText: string;
  falseText: string;
  color: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        padding: "5px 11px",
        borderRadius: 20,
        border: `1px solid ${on ? color + "40" : "var(--border)"}`,
        background: on ? color + "10" : "transparent",
      }}
    >
      <div
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: on ? color : "var(--text-secondary)",
          boxShadow: on ? `0 0 6px ${color}` : "none",
        }}
      />
      <span
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: on ? color : "var(--text-secondary)",
          letterSpacing: "0.04em",
        }}
      >
        {on ? trueText : falseText}
      </span>
    </div>
  );
}
export default StatusBadge;
