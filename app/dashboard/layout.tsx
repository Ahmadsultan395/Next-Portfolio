import type { ReactNode } from "react";
import Sidebar from "@/Components/dashboard/Sidebar";
import MainContent from "@/Components/dashboard/MainContent";
import { SidebarProvider } from "@/Components/dashboard/ui/SidebarContext";
import { ToastProvider } from "@/Components/dashboard/ui/ToastProvider";

export const metadata = {
  title: "Portfolio Dashboard",
  description: "Manage your portfolio content",
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <ToastProvider>
        <DashboardStyles />
        <div style={{ display: "flex", minHeight: "100vh" }}>
          <Sidebar />
          <MainContent>{children}</MainContent>
        </div>
      </ToastProvider>
    </SidebarProvider>
  );
}

// ─── GLOBAL DASHBOARD STYLES ─────────────────────────────────
function DashboardStyles() {
  return (
    <style suppressHydrationWarning>{`
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

      :root {
        --surface:        #131317;
        --surface2:       #1a1a20;
        --surface3:       #22222a;
        --border:         #2a2a35;
        --border-bright:  #3d3d50;
        --fg:             #e8e8f0;
        --muted:          #7c7c99;
        --accent:         #00c9b1;
        --accent2:        #7c6af5;
        --accent3:        #f5a623;
        --danger:         #ff4d6d;
        --success:        #22d3a5;
        --sidebar-w:      260px;
        --sidebar-collapsed: 72px;
        --radius:         14px;
        --radius-sm:      8px;
        --font-display:   'Space Grotesk', sans-serif;
        --font-mono:      'JetBrains Mono', monospace;
        --bg:             #0c0c0f;
      }

      body {
        background: var(--bg);
        color: var(--fg);
        font-family: var(--font-display);
        line-height: 1.6;
      }

      ::-webkit-scrollbar { width: 4px; }
      ::-webkit-scrollbar-track { background: var(--surface); }
      ::-webkit-scrollbar-thumb { background: var(--border-bright); border-radius: 99px; }

      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(16px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      .fade-up { animation: fadeUp .4s ease both; }
    `}</style>
  );
}
