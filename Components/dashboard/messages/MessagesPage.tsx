"use client";
import { useState, useMemo, useEffect } from "react";
import { SectionCard, EmptyState } from "../ui/Widgets";
import Icon, { ICONS } from "../ui/Icon";
import { useToast } from "../ui/ToastProvider";
import { useContact } from "@/context/ContactContext";

// ─── Time formatter (No change)
function formatTime(createdAt: string | Date): string {
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

// ─── Avatar color (No change)
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

// ─── Component
export default function MessagesPage() {
  const { showToast } = useToast();
  const { contactMessage, deleteContactMessage, updateContactMessage } =
    useContact();

  const sortedMessages = useMemo(() => {
    if (!contactMessage) return [];
    return [...contactMessage].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }, [contactMessage]);

  const [selected, setSelected] = useState<number | null>(null);
  const [reply, setReply] = useState("");
  const [isReplying, setIsReplying] = useState(false);

  const sel = selected !== null ? sortedMessages[selected] : null;

  useEffect(() => {
    if (sel && sel.unread) {
      updateContactMessage(sel._id, { unread: false });
    }
    setReply(sel?.reply || "");
  }, [sel]);

  const handleReply = async () => {
    if (!reply.trim() || !sel) return;
    setIsReplying(true);
    try {
      await updateContactMessage(sel._id, { reply: reply });

      const response = await fetch("/api/reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: sel.email,
          name: sel.name,
          subject: sel.subject,
          originalMessage: sel.message,
          replyText: reply,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send email.");
      }

      showToast(`Reply sent to ${sel.name}!`, "success");
    } catch (error) {
      console.error("Reply Error:", error);
      showToast("Could not send reply. Please try again.", "error");
    } finally {
      setIsReplying(false);
    }
  };

  const handleDelete = async () => {
    if (!sel) return;
    const messageName = sel.name;
    const messageId = sel._id;

    setSelected(null);

    try {
      await deleteContactMessage(messageId);
      showToast(`Message from ${messageName} deleted.`, "success");
    } catch (error) {
      console.error("Delete Error:", error);
      showToast("Failed to delete message.", "error");
    }
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 20 }}>
      {/* ── Inbox List ── */}
      <SectionCard
        title="Inbox"
        action={
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              padding: "2px 8px",
              borderRadius: 99,
              background: "rgba(34,211,165,.12)",
              color: "var(--success)",
            }}
          >
            {sortedMessages.filter((m) => m?.unread).length} unread
          </span>
        }
      >
        {sortedMessages.length === 0 ? (
          <EmptyState icon="📭" text="Koi message nahi hai abhi" />
        ) : (
          // Change 6: List ko scrollable banayein
          <div style={{ maxHeight: "calc(100vh - 250px)", overflowY: "auto" }}>
            {sortedMessages.map((m, i) => {
              // Change 7: 'sortedMessages' use karein, 'messages' nahi.
              if (!m) return null;
              const color = getColor(m.name);
              const initials = getInitials(m.name);
              const time = formatTime(m.createdAt);

              return (
                <div
                  key={m._id} // Key mein unique _id use karein
                  onClick={() => setSelected(i)}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 12,
                    padding: "14px 10px",
                    background:
                      selected === i ? "var(--surface2)" : "transparent",
                    borderRadius:
                      selected === i ? "var(--radius-sm)" : undefined,
                    borderBottom:
                      i < sortedMessages.length - 1
                        ? "1px solid var(--border)"
                        : undefined,
                    cursor: "pointer",
                    transition: "all .18s",
                    paddingLeft: selected === i ? 16 : 10,
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      flexShrink: 0,
                      background: `${color}22`,
                      color: color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: 14,
                    }}
                  >
                    {initials}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: 2,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: m.unread ? 700 : 500,
                        }}
                      >
                        {m.name}
                      </span>
                      <span
                        style={{
                          fontSize: 10,
                          color: "var(--muted)",
                          fontFamily: "var(--font-mono)",
                          flexShrink: 0,
                        }}
                      >
                        {time}
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 500,
                        color: m.unread ? "var(--fg)" : "var(--muted)",
                        marginBottom: 3,
                      }}
                    >
                      {m.subject || "(No Subject)"}
                    </div>
                    <div
                      style={{
                        fontSize: 11.5,
                        color: "var(--muted)",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        maxWidth: 260,
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
                        flexShrink: 0,
                        marginTop: 6,
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </SectionCard>

      {/* ── Message Detail ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        <SectionCard
          style={{ flex: 1, display: "flex", flexDirection: "column" }}
        >
          {sel ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 0,
                height: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  marginBottom: 20,
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: `${getColor(sel.name)}22`,
                    color: getColor(sel.name),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: 16,
                    flexShrink: 0,
                  }}
                >
                  {getInitials(sel.name)}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>
                    {sel.name}
                  </div>
                  <div
                    style={{
                      fontSize: 11.5,
                      color: "var(--muted)",
                      marginTop: 1,
                    }}
                  >
                    {sel.email}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "var(--muted)",
                      marginTop: 2,
                    }}
                  >
                    {formatTime(sel.createdAt)}
                  </div>
                </div>
                <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
                  {/* Change 8: Delete button ko function se jorein */}
                  <button
                    onClick={handleDelete}
                    title="Delete Message"
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "var(--radius-sm)",
                      background: "var(--surface2)",
                      border: "1px solid var(--border)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      color: "var(--muted)",
                    }}
                  >
                    <Icon path={ICONS.trash} size={14} />
                  </button>
                </div>
              </div>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 14,
                  marginBottom: 12,
                  color: "var(--fg)",
                }}
              >
                {sel.subject || "(No Subject)"}
              </div>
              <div
                style={{
                  fontSize: 13.5,
                  color: "var(--muted)",
                  lineHeight: 1.75,
                  flex: 1,
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  overflowY: "auto",
                  paddingRight: "10px",
                }}
              >
                {sel.message}
              </div>

              {/* Show previous reply if exists */}
              {sel.reply && (
                <div style={{ marginTop: 20 }}>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: "var(--accent)",
                      marginBottom: 5,
                    }}
                  >
                    Your Reply:
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      background: "var(--surface2)",
                      padding: "10px",
                      borderRadius: "var(--radius-sm)",
                      whiteSpace: "pre-wrap",
                      color: "var(--muted)",
                    }}
                  >
                    {sel.reply}
                  </div>
                </div>
              )}

              <div
                style={{
                  height: 1,
                  background: "var(--border)",
                  margin: "20px 0",
                }}
              />
              <div>
                <textarea
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder={`Reply to ${sel.name}...`}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    background: "var(--surface2)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-sm)",
                    color: "var(--fg)",
                    fontFamily: "var(--font-display)",
                    fontSize: 13,
                    outline: "none",
                    resize: "vertical",
                    minHeight: 80,
                    boxSizing: "border-box",
                  }}
                />
                <button
                  onClick={handleReply}
                  disabled={isReplying} // Disable button during sending
                  style={{
                    marginTop: 10,
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                    padding: "8px 16px",
                    borderRadius: "var(--radius-sm)",
                    background: "var(--accent)",
                    color: "var(--bg)",
                    border: "none",
                    cursor: "pointer",
                    fontSize: 13,
                    fontWeight: 600,
                    fontFamily: "var(--font-display)",
                    opacity: isReplying ? 0.7 : 1,
                  }}
                >
                  <Icon path={ICONS.mail} size={14} />{" "}
                  {isReplying ? "Sending..." : "Send Reply"}
                </button>
              </div>
            </div>
          ) : (
            <EmptyState icon="💬" text="Select a message to read" />
          )}
        </SectionCard>
      </div>
    </div>
  );
}
