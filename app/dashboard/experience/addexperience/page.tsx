"use client";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import ExperienceForm from "@/Components/dashboard/experience/ExperienceForm";
import { useExperience } from "@/context/ExperienceContext";
import {
  experienceInitialValues,
  experienceValidationSchema,
} from "@/validation/experienceValidation";
import { Breadcrumb } from "@/Components/dashboard/ui/Widgets";

export default function AddExperiencePage() {
  const router = useRouter();
  const { createExperience } = useExperience();
  const formik = useFormik({
    initialValues: experienceInitialValues,
    validationSchema: experienceValidationSchema,
    onSubmit: async (values, helpers) => {
      try {
        await createExperience(values);
        router.push("/dashboard/experience");
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
          { label: "Experience", href: "/dashboard/experience" },
          { label: "Add Experience", active: true },
        ]}
      />
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 18, fontWeight: 700 }}>Add Experience</div>
        <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>
          Add a new work experience entry
        </div>
      </div>
      <ExperienceForm
        formik={formik}
        submitLabel="Create Entry"
        onCancel={() => router.push("/dashboard/experience")}
      />
    </div>
  );
}
