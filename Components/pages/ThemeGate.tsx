"use client";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

export function ThemeGate({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  // Set mounted to true after client renders
  useEffect(() => setMounted(true), []);

  if (!mounted) return null; // Don't render anything until client mounts
  return <>{children}</>;
}
