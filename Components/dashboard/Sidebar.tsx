"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "./ui/SidebarContext";
import Icon, { ICONS } from "./ui/Icon";
import { NAV_ITEMS as STATIC_NAV } from "./data";
import { useContact } from "@/context/ContactContext";
import { useProfile } from "@/context/ProfileContext";
import Image from "next/image";
import { buildFileUrl } from "@/Utils/utility";

export default function Sidebar() {
  const { collapsed } = useSidebar();
  const pathname = usePathname();
  const { contactMessage } = useContact();
  const messageLength = contactMessage.length;
  const { profileData } = useProfile();

  // Add badge dynamically
  const NAV_ITEMS = STATIC_NAV.map((item) =>
    item.id === "messages" ? { ...item, badge: messageLength } : item,
  );

  const portfolioItems = NAV_ITEMS.filter((n) => n.section === "portfolio");
  const systemItems = NAV_ITEMS.filter((n) => n.section === "system");

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  return (
    <aside
      style={{
        width: collapsed ? "var(--sidebar-collapsed)" : "var(--sidebar-w)",
        background: "var(--surface)",
        borderRight: "1px solid var(--border)",
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        zIndex: 100,
        transition: "width .25s cubic-bezier(.4,0,.2,1)",
        overflow: "hidden",
      }}
    >
      {/* ── Logo ── */}
      <div
        style={{
          padding: "20px 18px",
          borderBottom: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          gap: 12,
          minHeight: 70,
        }}
      >
        <div
          style={{
            width: 45,
            height: 45,
            flexShrink: 0,
            background:
              "linear-gradient(135deg, var(--accent), var(--accent2))",
            borderRadius: "var(--radius-sm)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: 14,
            color: "#fff",
            letterSpacing: "-0.5px",
            overflow: "hidden",
          }}
        >
          <div className="w-full h-full">
            {profileData?.avatarUrl && (
              <Image
                src={buildFileUrl(profileData?.avatarUrl)}
                width={150}
                height={150}
                className="object-cover"
                alt="profile"
              />
            )}
          </div>
        </div>
        {!collapsed && (
          <div style={{ overflow: "hidden" }}>
            <div
              style={{ fontWeight: 700, fontSize: 15, whiteSpace: "nowrap" }}
            >
              Portfolio
            </div>
            <div
              style={{ fontSize: 10, color: "var(--muted)", fontWeight: 400 }}
            >
              Dashboard v2.0
            </div>
          </div>
        )}
      </div>

      {/* ── Nav ── */}
      <nav
        style={{
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
          padding: "12px 10px",
        }}
      >
        {/* Portfolio section */}
        {!collapsed && (
          <div
            style={{
              fontSize: 9,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              color: "var(--muted)",
              padding: "4px 10px 8px",
            }}
          >
            Portfolio
          </div>
        )}
        {portfolioItems.map((item) => (
          <NavItem
            key={item.id}
            item={item}
            active={isActive(item.href)}
            collapsed={collapsed}
          />
        ))}

        <div style={{ height: 12 }} />

        {/* System section */}
        {!collapsed && (
          <div
            style={{
              fontSize: 9,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              color: "var(--muted)",
              padding: "4px 10px 8px",
            }}
          >
            System
          </div>
        )}
        {systemItems.map((item) => (
          <NavItem
            key={item.id}
            item={item}
            active={isActive(item.href)}
            collapsed={collapsed}
          />
        ))}
      </nav>

      {/* ── User card ── */}
      <div
        style={{ padding: "12px 10px", borderTop: "1px solid var(--border)" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 12px",
            borderRadius: "var(--radius-sm)",
            background: "var(--surface2)",
            border: "1px solid var(--border)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              flexShrink: 0,
              background:
                "linear-gradient(135deg, var(--accent), var(--accent2))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: 13,
              color: "#fff",
              overflow: "hidden",
            }}
          >
            <div className="w-full h-full">
              {profileData?.avatarUrl && (
                <Image
                  src={buildFileUrl(profileData?.avatarUrl)}
                  width={150}
                  height={150}
                  className="object-cover"
                  alt="profile"
                />
              )}
            </div>
          </div>
          {!collapsed && (
            <>
              <div style={{ overflow: "hidden" }}>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                  }}
                >
                  Ahmad Sultan
                </div>
                <div
                  style={{
                    fontSize: 10,
                    color: "var(--muted)",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "var(--success)",
                      display: "inline-block",
                      animation: "pulse 2s infinite",
                    }}
                  />
                  Online
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}`}</style>
    </aside>
  );
}

// ─── NAV ITEM ────────────────────────────────────────────────
function NavItem({
  item,
  active,
  collapsed,
}: {
  item: (typeof STATIC_NAV)[number];
  active: boolean;
  collapsed: boolean;
}) {
  return (
    <Link
      href={item.href}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "10px 12px",
        borderRadius: "var(--radius-sm)",
        color: active ? "var(--fg)" : "var(--muted)",
        background: active ? "rgba(0,201,177,.08)" : "transparent",
        border: `1px solid ${active ? "rgba(0,201,177,.25)" : "transparent"}`,
        textDecoration: "none",
        fontSize: 13.5,
        fontWeight: 500,
        transition: "all .18s",
        position: "relative",
        marginBottom: 2,
        whiteSpace: "nowrap",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        if (!active) {
          (e.currentTarget as HTMLElement).style.background = "var(--surface2)";
          (e.currentTarget as HTMLElement).style.color = "var(--fg)";
          (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          (e.currentTarget as HTMLElement).style.background = "transparent";
          (e.currentTarget as HTMLElement).style.color = "var(--muted)";
          (e.currentTarget as HTMLElement).style.borderColor = "transparent";
        }
      }}
    >
      {/* Active left bar */}
      {active && (
        <span
          style={{
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
            width: 3,
            height: "60%",
            background: "var(--accent)",
            borderRadius: "0 3px 3px 0",
          }}
        />
      )}
      <Icon
        path={ICONS[item.icon]}
        size={18}
        color={active ? "var(--accent)" : undefined}
      />
      {!collapsed && <span style={{ flex: 1 }}>{item.label}</span>}
      {!collapsed && "badge" in item && item.badge && (
        <span
          style={{
            background: "var(--accent)",
            color: "var(--bg)",
            fontSize: 10,
            fontWeight: 700,
            padding: "1px 6px",
            borderRadius: 99,
            flexShrink: 0,
          }}
        >
          {item.badge}
        </span>
      )}
    </Link>
  );
}
