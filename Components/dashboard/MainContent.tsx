"use client";
import { ReactNode } from "react";
import Topbar from "./Topbar";
import { useSidebar } from "./ui/SidebarContext";

export default function MainContent({ children }: { children: ReactNode }) {
  const { collapsed } = useSidebar();

  return (
    <main
      style={{
        marginLeft: collapsed ? "var(--sidebar-collapsed)" : "var(--sidebar-w)",
        flex: 1,
        transition: "margin-left .25s cubic-bezier(.4,0,.2,1)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Topbar />
      <div
        style={{
          padding: 28,
          maxWidth: 1400,
          width: "100%",
          flex: 1,
        }}
      >
        {children}
      </div>
    </main>
  );
}
