import { Breadcrumb } from "@/Components/dashboard/ui/Widgets";
import SettingsPage from "@/Components/dashboard/settings/SettingsPage";

export const metadata = { title: "Settings — Portfolio Dashboard" };

export default function Page() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Settings", active: true },
        ]}
      />
      <SettingsPage />
    </>
  );
}
