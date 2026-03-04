import { Breadcrumb } from "@/Components/dashboard/ui/Widgets";
import LinksPage from "@/Components/dashboard/links/LinksPage";

export const metadata = { title: "Links & Contact — Portfolio Dashboard" };

export default function Page() {
  return (
    <>
      <Breadcrumb items={[{ label: "Dashboard" }, { label: "Links & Contact", active: true }]} />
      <LinksPage />
    </>
  );
}
