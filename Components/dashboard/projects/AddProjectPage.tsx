"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import ProjectForm from "./ProjectForm";
import { useProject } from "@/context/ProjectContext";
import {
  projectInitialValues,
  projectValidationSchema,
} from "@/validation/projectValidation";

export default function AddProjectPage() {
  const router = useRouter();
  const { createProject } = useProject();

  const formik = useFormik({
    initialValues: projectInitialValues,
    validationSchema: projectValidationSchema,
    onSubmit: async (values, helpers) => {
      try {
        await createProject(values);
        router.push("/dashboard/projects");
      } catch {
        helpers.setSubmitting(false);
      }
    },
  });

  return (
    <ProjectForm
      formik={formik}
      submitLabel="Create Project"
      onCancel={() => router.push("/dashboard/projects")}
    />
  );
}
