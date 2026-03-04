import ServicesPage from "@/Components/dashboard/services/ServicesPage";
import { Breadcrumb } from "@/Components/dashboard/ui/Widgets";
export default function Page() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Services", active: true },
        ]}
      />
      <ServicesPage />
    </>
  );
}
