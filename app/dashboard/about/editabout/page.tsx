import { Breadcrumb } from "@/Components/dashboard/ui/Widgets";
import EditAboutPage from "@/Components/dashboard/about/EditAboutPage";

export const metadata = { title: "Edit About — Portfolio Dashboard" };

export default function Page() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "About", href: "/dashboard/about" },
          { label: "Edit About", active: true },
        ]}
      />
      <EditAboutPage />
    </>
  );
}
