import { Breadcrumb } from "@/Components/dashboard/ui/Widgets";
import MessagesPage from "@/Components/dashboard/messages/MessagesPage";

export const metadata = { title: "Messages — Portfolio Dashboard" };

export default function Page() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Messages", active: true },
        ]}
      />
      <MessagesPage />
    </>
  );
}
