"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import AboutForm from "./AboutForm";
import { useAbout } from "@/context/AboutContext";
import {
  aboutInitialValues,
  aboutValidationSchema,
} from "@/validation/aboutValidation";

export default function AddAboutPage() {
  const router = useRouter();
  const { createAbout } = useAbout();

  const formik = useFormik({
    initialValues: aboutInitialValues,
    validationSchema: aboutValidationSchema,
    onSubmit: async (values, helpers) => {
      try {
        await createAbout(values);
        router.push("/dashboard/about");
      } catch {
        helpers.setSubmitting(false);
      }
    },
  });

  return (
    <AboutForm
      formik={formik}
      submitLabel="Create About"
      onCancel={() => router.push("/dashboard/about")}
    />
  );
}
