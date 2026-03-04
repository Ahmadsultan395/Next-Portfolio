"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import AboutForm from "./AboutForm";
import { AboutFormValues } from "@/types/about";
import { useAbout } from "@/context/AboutContext";
import {
  aboutInitialValues,
  aboutValidationSchema,
} from "@/validation/aboutValidation";

export default function EditAboutPage() {
  const router = useRouter();
  const { about, loading, updateAbout } = useAbout();

  const formik = useFormik<AboutFormValues>({
    enableReinitialize: true,
    initialValues: about
      ? {
          journeyTitle: about.journeyTitle,
          journeyText: about.journeyText,
          whatIDoTitle: about.whatIDoTitle,
          whatIDoText: about.whatIDoText,
          beyondTitle: about.beyondTitle,
          beyondSubtitle: about.beyondSubtitle,
          skills: about.skills.map((s: any) => ({ ...s })),
          stats: about.stats.map((s: any) => ({ ...s })),
          interests: about.interests.map((i: any) => ({ ...i })),
          funFacts: about.funFacts.map((f: any) => ({ ...f })),
        }
      : aboutInitialValues,
    validationSchema: aboutValidationSchema,
    onSubmit: async (values, helpers) => {
      if (!about) return;
      try {
        await updateAbout(about._id, values);
        router.push("/dashboard/about");
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

  if (!about) {
    router.replace("/dashboard/about");
    return null;
  }

  return (
    <AboutForm
      formik={formik}
      submitLabel="Save Changes"
      onCancel={() => router.push("/dashboard/about")}
    />
  );
}
