import { Breadcrumb } from "@/Components/dashboard/ui/Widgets";
import OverviewPage from "@/Components/dashboard/overview/OverviewPage";

export const metadata = { title: "Overview — Portfolio Dashboard" };

export default function DashboardPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Dashboard", active: true }]} />
      <OverviewPage />
    </>
  );
}
