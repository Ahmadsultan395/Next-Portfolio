import { Breadcrumb } from "@/Components/dashboard/ui/Widgets";
import ProfilePage from "@/Components/dashboard/profile/ProfilePage";

export const metadata = { title: "Profile — Portfolio Dashboard" };

export default function Page() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Profile", active: true },
        ]}
      />
      <ProfilePage />
    </>
  );
}
