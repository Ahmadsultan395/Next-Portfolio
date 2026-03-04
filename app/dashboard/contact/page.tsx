import ContactPage from "@/Components/dashboard/contact/ContactPage";
import { Breadcrumb } from "@/Components/dashboard/ui/Widgets";
export default function Page() {
  return (
    <>
      {" "}
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Contact", active: true },
        ]}
      />
      <ContactPage />
    </>
  );
}
