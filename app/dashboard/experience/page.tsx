import ExperiencePage from "@/Components/dashboard/experience/ExperiencePage";
import { Breadcrumb } from "@/Components/dashboard/ui/Widgets";
export default function Page() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Experience", active: true },
        ]}
      />
      <ExperiencePage />
    </>
  );
}
