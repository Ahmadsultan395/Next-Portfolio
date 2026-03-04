import { Breadcrumb } from "@/Components/dashboard/ui/Widgets";
import AddProfilePage from "@/Components/dashboard/profile/AddProfilePage";

export const metadata = { title: "Add Profile — Portfolio Dashboard" };

export default function Page() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Dashboard" },
          { label: "Profile", href: "/dashboard/profile" },
          { label: "Add Profile", active: true },
        ]}
      />
      <AddProfilePage />
    </>
  );
}
