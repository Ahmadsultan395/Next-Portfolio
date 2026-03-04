"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useFormik } from "formik";
import ProjectForm from "./ProjectForm";
import { useProject } from "@/context/ProjectContext";
import { ProjectFormValues } from "@/types/project";
import {
  projectInitialValues,
  projectValidationSchema,
} from "@/validation/projectValidation";

export default function EditProjectPage() {
  const router = useRouter();
  const params = useSearchParams();
  const id = params.get("id") || "";

  const { projects, loading, updateProject } = useProject();
  const current = projects.find((p) => p._id === id);

  const formik = useFormik<ProjectFormValues>({
    enableReinitialize: true,
    initialValues: current
      ? {
          name: current.name,
          desc: current.desc,
          emoji: current.emoji ?? "",
          color: current.color ?? "",
          status: current.status,
          category: current.category,
          tech: [...current.tech],
          highlights: [...current.highlights],
          liveUrl: current.liveUrl ?? "",
          githubUrl: current.githubUrl ?? "",
          featured: current.featured ?? false,
          order: current.order ?? 0,
          image: current.imageUrl || current.image || "",
          imageUrl: current.imageUrl ?? "",
        }
      : projectInitialValues,
    validationSchema: projectValidationSchema,
    onSubmit: async (values, helpers) => {
      console.log(values);

      try {
        await updateProject(id, values);
        router.push("/dashboard/projects");
      } catch {
        helpers.setSubmitting(false);
      }
    },
  });

  // Still loading projects list
  if (loading) {
    return (
      <div className="py-16 text-center text-[var(--muted)]">Loading...</div>
    );
  }

  // Projects loaded but this ID not found — redirect
  if (!loading && !current) {
    router.replace("/dashboard/projects");
    return null;
  }

  return (
    <ProjectForm
      formik={formik}
      submitLabel="Save Changes"
      onCancel={() => router.push("/dashboard/projects")}
    />
  );
}
