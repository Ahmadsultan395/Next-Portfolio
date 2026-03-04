export const Card = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) => (
  <div
    style={{
      background: "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius)",
      padding: 24,
      ...style,
    }}
  >
    {children}
  </div>
);

export const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      fontSize: 13.5,
      fontWeight: 700,
      marginBottom: 18,
      letterSpacing: "-0.2px",
    }}
  >
    {children}
  </div>
);

export const Label = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      fontSize: 10.5,
      fontWeight: 600,
      color: "var(--muted)",
      textTransform: "uppercase" as const,
      letterSpacing: "0.7px",
      marginBottom: 3,
    }}
  >
    {children}
  </div>
);
