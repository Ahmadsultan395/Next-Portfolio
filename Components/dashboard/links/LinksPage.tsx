"use client";
import { SectionCard, Toggle } from "../ui/Widgets";
import Icon, { ICONS } from "../ui/Icon";
import { useToast } from "../ui/ToastProvider";

export default function LinksPage() {
  const { showToast } = useToast();

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 20,
          marginBottom: 20,
        }}
      >
        {/* ── Contact Info ── */}
        <SectionCard title="Contact Information">
          {[
            {
              icon: "✉️",
              label: "Email",
              value: "ahmad@example.com",
              status: "Active",
              active: true,
            },
            {
              icon: "📱",
              label: "Phone",
              value: "+92 300 1234567",
              status: "Active",
              active: true,
            },
            {
              icon: "📍",
              label: "Location",
              value: "Lahore, Pakistan",
              status: "Public",
              active: false,
            },
            {
              icon: "🌐",
              label: "Timezone",
              value: "UTC+5 (PKT)",
              status: "Public",
              active: false,
            },
          ].map((c, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 0",
                borderBottom: i < 3 ? "1px solid var(--border)" : undefined,
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "var(--radius-sm)",
                  background: "var(--surface2)",
                  border: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                  flexShrink: 0,
                }}
              >
                {c.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, color: "var(--muted)" }}>
                  {c.label}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {c.value}
                </div>
              </div>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  padding: "3px 9px",
                  borderRadius: 99,
                  background: c.active
                    ? "rgba(34,211,165,.12)"
                    : "rgba(124,106,245,.12)",
                  color: c.active ? "var(--success)" : "var(--accent2)",
                }}
              >
                {c.status}
              </span>
            </div>
          ))}
          <button
            onClick={() => showToast("Contact info saved!")}
            style={{
              width: "100%",
              marginTop: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 7,
              padding: "9px 16px",
              borderRadius: "var(--radius-sm)",
              background: "var(--accent)",
              color: "var(--bg)",
              border: "none",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 600,
              fontFamily: "var(--font-display)",
            }}
          >
            <Icon path={ICONS.check} size={14} /> Save Contact Info
          </button>
        </SectionCard>

        {/* ── Social Links ── */}
        <SectionCard title="Social Links">
          {[
            {
              emoji: "🐙",
              label: "GitHub",
              value: "github.com/ahmadsultan",
              icon: "github" as const,
            },
            {
              emoji: "💼",
              label: "LinkedIn",
              value: "linkedin.com/in/ahmadsultan",
              icon: "linkedin" as const,
            },
            {
              emoji: "🌐",
              label: "Portfolio",
              value: "ahmadsultan.dev",
              icon: "globe" as const,
            },
            {
              emoji: "🐦",
              label: "upwork",
              value: "@ahmadsultan",
              icon: "link" as const,
            },
          ].map((s, i) => (
            <div key={i} style={{ marginBottom: 14 }}>
              <label
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "var(--muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.8px",
                  marginBottom: 6,
                  display: "block",
                }}
              >
                {s.emoji} {s.label}
              </label>
              <div style={{ position: "relative" }}>
                <input
                  defaultValue={s.value}
                  style={{
                    width: "100%",
                    padding: "10px 14px 10px 36px",
                    background: "var(--surface2)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-sm)",
                    color: "var(--fg)",
                    fontFamily: "var(--font-mono)",
                    fontSize: 12.5,
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    left: 10,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--muted)",
                  }}
                >
                  <Icon path={ICONS[s.icon]} size={15} />
                </span>
              </div>
            </div>
          ))}
          <button
            onClick={() => showToast("Social links updated!")}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 7,
              padding: "9px 16px",
              borderRadius: "var(--radius-sm)",
              background: "var(--accent)",
              color: "var(--bg)",
              border: "none",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 600,
              fontFamily: "var(--font-display)",
            }}
          >
            <Icon path={ICONS.check} size={14} /> Update Links
          </button>
        </SectionCard>
      </div>

      {/* ── Contact Form Settings ── */}
      <SectionCard
        title="Contact Form Settings"
        subtitle="Manage how visitors can reach you"
      >
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}
        >
          {[
            {
              label: "Enable contact form",
              desc: "Allow visitors to send messages directly",
              def: true,
            },
            {
              label: "Email notifications",
              desc: "Get notified for every new message",
              def: true,
            },
            {
              label: "Show availability status",
              desc: "Display your work availability to visitors",
              def: true,
            },
            {
              label: "Auto-reply",
              desc: "Send automatic response to new inquiries",
              def: false,
            },
            {
              label: "Show phone number",
              desc: "Display phone on public portfolio page",
              def: false,
            },
            {
              label: "Require email verification",
              desc: "Verify sender email before submitting form",
              def: true,
            },
          ].map((s, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 0",
                borderBottom: i < 5 ? "1px solid var(--border)" : undefined,
              }}
            >
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 500 }}>{s.label}</div>
                <div
                  style={{
                    fontSize: 11.5,
                    color: "var(--muted)",
                    marginTop: 2,
                  }}
                >
                  {s.desc}
                </div>
              </div>
              <Toggle
                defaultOn={s.def}
                onChange={() => showToast(`${s.label} updated`)}
              />
            </div>
          ))}
        </div>
      </SectionCard>

      {/* ── Link Preview ── */}
      <div style={{ marginTop: 20 }}>
        <SectionCard
          title="Public Portfolio Links"
          subtitle="Share these with clients and recruiters"
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: 12,
              marginTop: 8,
            }}
          >
            {[
              {
                label: "Portfolio",
                url: "https://ahmadsultan.dev",
                color: "var(--accent)",
              },
              {
                label: "Resume / CV",
                url: "https://ahmadsultan.dev/cv.pdf",
                color: "var(--accent2)",
              },
              {
                label: "GitHub Profile",
                url: "https://github.com/ahmadsultan",
                color: "var(--accent3)",
              },
            ].map((link, i) => (
              <div
                key={i}
                style={{
                  padding: 14,
                  background: "var(--surface2)",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--border)",
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--muted)",
                    marginBottom: 4,
                  }}
                >
                  {link.label}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: link.color,
                    fontFamily: "var(--font-mono)",
                    wordBreak: "break-all",
                    marginBottom: 10,
                  }}
                >
                  {link.url}
                </div>
                <button
                  onClick={() => showToast(`Copied ${link.label} link!`)}
                  style={{
                    width: "100%",
                    padding: "6px",
                    background: "transparent",
                    border: `1px solid ${link.color}40`,
                    borderRadius: 6,
                    color: link.color,
                    fontSize: 11,
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  Copy Link
                </button>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
