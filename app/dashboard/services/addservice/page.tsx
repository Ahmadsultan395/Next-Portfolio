"use client";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import ServiceForm from "@/Components/dashboard/services/ServiceForm";
import { useService } from "@/context/ServiceContext";
import {
  serviceInitialValues,
  serviceValidationSchema,
} from "@/validation/serviceValidation";
import { Breadcrumb } from "@/Components/dashboard/ui/Widgets";

export default function AddServicePage() {
  const router = useRouter();
  const { createService } = useService();
  const formik = useFormik({
    initialValues: serviceInitialValues,
    validationSchema: serviceValidationSchema,
    onSubmit: async (values, helpers) => {
      try {
        await createService(values);
        router.push("/dashboard/services");
      } catch {
        helpers.setSubmitting(false);
      }
    },
  });
  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Services", href: "/dashboard/services" },
          { label: "Add Services", active: true },
        ]}
      />
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 18, fontWeight: 700 }}>Add Service</div>
        <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>
          Create a new service offering
        </div>
      </div>
      <ServiceForm
        formik={formik}
        submitLabel="Create Service"
        onCancel={() => router.push("/dashboard/services")}
      />
    </div>
  );
}
