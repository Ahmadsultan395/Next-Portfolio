// app/dashboard/projects/editproject/page.tsx
import { Breadcrumb } from "@/Components/dashboard/ui/Widgets";
import EditProjectPage from "@/Components/dashboard/projects/EditProjectPage";
export const metadata = { title: "Edit Project — Portfolio Dashboard" };
export default function Page() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Dashboard" },
          { label: "Projects", href: "/dashboard/projects" },
          { label: "Edit Project", active: true },
        ]}
      />
      <EditProjectPage />
    </>
  );
}
