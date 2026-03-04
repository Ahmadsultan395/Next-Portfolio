"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useFormik } from "formik";
import ExperienceForm from "@/Components/dashboard/experience/ExperienceForm";
import { useExperience } from "@/context/ExperienceContext";
import { ExperienceFormValues } from "@/types/experience.types";
import {
  experienceInitialValues,
  experienceValidationSchema,
} from "@/validation/experienceValidation";
import { Breadcrumb } from "@/Components/dashboard/ui/Widgets";

export default function EditExperiencePage() {
  const router = useRouter();
  const params = useSearchParams();
  const id = params.get("id") || "";
  const { experiences, loading, updateExperience } = useExperience();
  const current = experiences.find((e) => e._id === id);

  const formik = useFormik<ExperienceFormValues>({
    enableReinitialize: true,
    initialValues: current
      ? {
          period: current.period,
          role: current.role,
          company: current.company,
          description: current.description,
          current: current.current,
          order: current.order,
        }
      : experienceInitialValues,
    validationSchema: experienceValidationSchema,
    onSubmit: async (values, helpers) => {
      try {
        await updateExperience(id, values);
        router.push("/dashboard/experience");
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
    router.replace("/dashboard/experience");
    return null;
  }

  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Experience", href: "/dashboard/experience" },
          { label: "Edit Experience", active: true },
        ]}
      />
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 18, fontWeight: 700 }}>Edit Experience</div>
        <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>
          Update "{current?.role}" at {current?.company}
        </div>
      </div>
      <ExperienceForm
        formik={formik}
        submitLabel="Save Changes"
        onCancel={() => router.push("/dashboard/experience")}
      />
    </div>
  );
}
