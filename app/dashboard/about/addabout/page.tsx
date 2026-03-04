import { Breadcrumb } from "@/Components/dashboard/ui/Widgets";
import AddAboutPage from "@/Components/dashboard/about/AddAboutPage";

export const metadata = { title: "Add About — Portfolio Dashboard" };

export default function Page() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "About", href: "/dashboard/about" },
          { label: "Add About", active: true },
        ]}
      />
      <AddAboutPage />
    </>
  );
}
