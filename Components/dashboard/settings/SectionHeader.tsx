// ─── SECTION HEADER ───────────────────────────────────────────
function SectionHeader({
  title,
  color = "var(--accent)",
}: {
  title: string;
  color?: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        marginBottom: 14,
      }}
    >
      <div
        style={{
          width: 3,
          height: 18,
          borderRadius: 2,
          background: `linear-gradient(to bottom,${color},${color}40)`,
        }}
      />
      <span
        style={{
          fontWeight: 800,
          fontSize: 14,
          color: "var(--text-primary)",
          letterSpacing: "-0.01em",
        }}
      >
        {title}
      </span>
    </div>
  );
}

export default SectionHeader;
