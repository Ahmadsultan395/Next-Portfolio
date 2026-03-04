"use client";
import { usePathname } from "next/navigation";
import { useSidebar } from "./ui/SidebarContext";
import Icon, { ICONS } from "./ui/Icon";
import { NAV_ITEMS } from "./data";
import Link from "next/link";

export default function Topbar() {
  const { toggle } = useSidebar();
  const pathname = usePathname();

  const currentNav = NAV_ITEMS.find((n) => {
    if (n.href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(n.href);
  });

  return (
    <header
      style={{
        height: 70,
        background: "var(--surface)",
        borderBottom: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        padding: "0 28px",
        gap: 16,
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      {/* Toggle btn */}
      <button
        onClick={toggle}
        style={{
          width: 36,
          height: 36,
          borderRadius: "var(--radius-sm)",
          border: "1px solid var(--border)",
          background: "var(--surface2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: "var(--fg)",
          transition: "all .18s",
          flexShrink: 0,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
          (e.currentTarget as HTMLElement).style.color = "var(--accent)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
          (e.currentTarget as HTMLElement).style.color = "var(--fg)";
        }}
      >
        <Icon path={ICONS.menu} size={16} />
      </button>

      {/* Title */}
      <div>
        <div style={{ fontSize: 18, fontWeight: 700 }}>
          {currentNav?.label ?? "Dashboard"}
        </div>
        <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 1 }}>
          Portfolio Management System
        </div>
      </div>

      {/* Right actions */}
      <div
        style={{
          marginLeft: "auto",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        {/* Notifications */}
        <button
          className="hidden sm:flex"
          style={{
            width: 36,
            height: 36,
            borderRadius: "var(--radius-sm)",
            border: "1px solid var(--border)",
            background: "var(--surface2)",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "var(--muted)",
            position: "relative",
          }}
        >
          <Icon path={ICONS.bell} size={16} />
          <span
            style={{
              position: "absolute",
              top: 6,
              right: 6,
              width: 7,
              height: 7,
              background: "var(--accent)",
              borderRadius: "50%",
              border: "2px solid var(--surface)",
            }}
          />
        </button>

        {/* Preview site btn */}
        <Link
          href="/"
          className="hidden sm:flex"
          style={{
            padding: "6px 14px",
            borderRadius: "var(--radius-sm)",
            background: "rgba(0,201,177,.15)",
            border: "1px solid rgba(0,201,177,.35)",
            color: "var(--accent)",
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
            alignItems: "center",
            gap: 6,
            fontFamily: "var(--font-display)",
          }}
        >
          <Icon path={ICONS.eye} size={13} />
          Preview Site
        </Link>
      </div>
    </header>
  );
}
