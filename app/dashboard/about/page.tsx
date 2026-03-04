import { Breadcrumb } from "@/Components/dashboard/ui/Widgets";
import AboutPage from "@/Components/dashboard/about/AboutPage";

export const metadata = { title: "About — Portfolio Dashboard" };

export default function Page() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "About", active: true },
        ]}
      />
      <AboutPage />
    </>
  );
}
