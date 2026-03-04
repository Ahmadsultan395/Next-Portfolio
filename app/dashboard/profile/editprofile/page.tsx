import { Breadcrumb } from "@/Components/dashboard/ui/Widgets";
import EditProfilePage from "@/Components/dashboard/profile/EditProfilePage";

export const metadata = { title: "Edit Profile — Portfolio Dashboard" };

export default function Page() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Profile", href: "/dashboard/profile" },
          { label: "Edit Profile", active: true },
        ]}
      />
      <EditProfilePage />
    </>
  );
}
