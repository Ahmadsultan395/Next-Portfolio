"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useFormik } from "formik";
import ServiceForm from "@/Components/dashboard/services/ServiceForm";
import { useService } from "@/context/ServiceContext";
import { ServiceFormValues } from "@/types/service.types";
import {
  serviceInitialValues,
  serviceValidationSchema,
} from "@/validation/serviceValidation";
import { Breadcrumb } from "@/Components/dashboard/ui/Widgets";

export default function EditServicePage() {
  const router = useRouter();
  const params = useSearchParams();
  const id = params.get("id") || "";
  const { services, loading, updateService } = useService();
  const current = services.find((s) => s._id === id);

  const formik = useFormik<ServiceFormValues>({
    enableReinitialize: true,
    initialValues: current
      ? {
          title: current.title,
          subtitle: current.subtitle,
          description: current.description,
          badge: current.badge,
          tech: [...current.tech],
          features: [...current.features],
          icon: current.icon,
          color: current.color,
          order: current.order,
          isActive: current.isActive,
        }
      : serviceInitialValues,
    validationSchema: serviceValidationSchema,
    onSubmit: async (values, helpers) => {
      try {
        await updateService(id, values);
        router.push("/dashboard/services");
      } catch {
        helpers.setSubmitting(false);
      }
    },
  });

  if (loading)
    return (
      <div
        style={{
          padding: "60px 24px",
          textAlign: "center",
          color: "var(--muted)",
        }}
      >
        Loading...
      </div>
    );
  if (!loading && !current) {
    router.replace("/dashboard/services");
    return null;
  }

  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Services", href: "/dashboard/services" },
          { label: "Edit Services", active: true },
        ]}
      />
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 18, fontWeight: 700 }}>Edit Service</div>
        <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>
          Update "{current?.title}"
        </div>
      </div>
      <ServiceForm
        formik={formik}
        submitLabel="Save Changes"
        onCancel={() => router.push("/dashboard/services")}
      />
    </div>
  );
}
