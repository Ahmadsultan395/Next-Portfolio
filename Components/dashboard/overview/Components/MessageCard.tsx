import Link from "next/link";
import { useContact } from "@/context/ContactContext";
import { SectionCard } from "../../ui/Widgets";

// Avatar colors
const AVATAR_COLORS = [
  "#6366f1",
  "#22d3ee",
  "#f59e0b",
  "#ec4899",
  "#10b981",
  "#f43f5e",
  "#a855f7",
  "#14b8a6",
  "#fb923c",
  "#84cc16",
];
function getColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++)
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}
function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

// Time formatter
function formatTime(createdAt: string | Date) {
  const date = new Date(createdAt);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString("en-PK", { day: "numeric", month: "short" });
}

export default function RecentMessages() {
  const { contactMessage } = useContact();

  const sortedMessages = contactMessage
    ? [...contactMessage].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
    : [];

  return (
    <SectionCard
      title="Recent Messages"
      action={
        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            padding: "2px 7px",
            borderRadius: 99,
            background: "rgba(34,211,165,.12)",
            color: "var(--success)",
          }}
        >
          {sortedMessages.filter((m) => m.unread).length} unread
        </span>
      }
    >
      {sortedMessages.slice(0, 4).map((m, i) => {
        const color = getColor(m.name);
        const initials = getInitials(m.name);
        const time = formatTime(m.createdAt);

        return (
          <Link
            key={m._id}
            href="/dashboard/messages"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 0",
              borderBottom: i < 3 ? "1px solid var(--border)" : undefined,
              textDecoration: "none",
              color: "inherit",
              transition: "padding-left .18s",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.paddingLeft = "6px")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.paddingLeft = "0")
            }
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                flexShrink: 0,
                background: `${color}20`,
                color: color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: 13,
              }}
            >
              {initials}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: m.unread ? 700 : 500 }}>
                {m.name}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "var(--muted)",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  maxWidth: 220,
                }}
              >
                {m.message}
              </div>
            </div>
            {m.unread && (
              <div
                style={{
                  width: 8,
                  height: 8,
                  background: "var(--accent)",
                  borderRadius: "50%",
                }}
              />
            )}
            <div
              style={{
                fontSize: 10,
                color: "var(--muted)",
                flexShrink: 0,
                fontFamily: "var(--font-mono)",
              }}
            >
              {time}
            </div>
          </Link>
        );
      })}
    </SectionCard>
  );
}
