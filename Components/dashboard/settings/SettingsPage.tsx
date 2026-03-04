"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import LogoutModal from "./LogoutModal";
import HeadCard from "./HeadCard";
import DeveloperStats from "./DeveloperStats";
import DeveloperProfile from "./DeveloperProfile";

export default function SettingsPage() {
  const { logout } = useAuth();
  const [showLogout, setShowLogout] = useState(false);

  return (
    <>
      {showLogout && (
        <LogoutModal
          onConfirm={() => {
            setShowLogout(false);
            logout();
          }}
          onCancel={() => setShowLogout(false)}
        />
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <HeadCard setShowLogout={setShowLogout} />
        <DeveloperStats />
        <DeveloperProfile />
      </div>
    </>
  );
}
