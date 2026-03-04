import { Breadcrumb } from "@/Components/dashboard/ui/Widgets";
import ProjectsPage from "@/Components/dashboard/projects/ProjectsPage";
export const metadata = { title: "Projects — Portfolio Dashboard" };
export default function Page() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Projects", active: true },
        ]}
      />
      <ProjectsPage />
    </>
  );
}
