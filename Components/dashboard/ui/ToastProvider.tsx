"use client";
import { createContext, useContext, useState, useCallback, ReactNode } from "react";

// ─── TYPES ───────────────────────────────────────────────────
interface Toast {
  id: number;
  msg: string;
  type: "success" | "error" | "info";
}

interface ToastContextType {
  showToast: (msg: string, type?: Toast["type"]) => void;
}

// ─── CONTEXT ─────────────────────────────────────────────────
const ToastContext = createContext<ToastContextType>({ showToast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

// ─── PROVIDER ────────────────────────────────────────────────
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((msg: string, type: Toast["type"] = "success") => {
    const id = Date.now();
    setToasts((t) => [...t, { id, msg, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast Area */}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="toast-item flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium"
            style={{
              background: "var(--surface)",
              border: `1px solid ${t.type === "success" ? "rgba(34,211,165,.4)" : t.type === "error" ? "rgba(255,77,109,.4)" : "rgba(124,106,245,.4)"}`,
              color: "var(--fg)",
              minWidth: 240,
              boxShadow: "0 8px 32px rgba(0,0,0,.5)",
              animation: "toastIn .3s ease",
              pointerEvents: "auto",
            }}
          >
            <span
              style={{
                width: 8, height: 8, borderRadius: "50%", flexShrink: 0,
                background: t.type === "success" ? "var(--success)" : t.type === "error" ? "var(--danger)" : "var(--accent2)",
              }}
            />
            {t.msg}
          </div>
        ))}
      </div>
      <style>{`
        @keyframes toastIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </ToastContext.Provider>
  );
}
