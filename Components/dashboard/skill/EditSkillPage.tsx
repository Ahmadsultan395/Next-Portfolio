"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useFormik } from "formik";
import SkillCategoryForm from "./SkillCategoryForm";
import ApproachForm from "./ApproachForm";
import { useSkill } from "@/context/SkillContext";
import { ApproachFormValues, SkillFormValues } from "@/types/skill";
import {
  approachValidationSchema,
  skillValidationSchema,
} from "@/validation/skillValidation";

type Tab = "skill" | "approach";

export default function EditSkillPage() {
  const router = useRouter();
  const params = useSearchParams();
  const id = params.get("id") || "";
  const tab = (params.get("tab") as Tab) || "skill";

  const { skills, approach, updateSkill, updateApproach } = useSkill();

  // ── Find current skill ────────────────────────────────────────────────────
  const currentSkill = skills.find((s) => s._id === id);

  // ── Skill formik ──────────────────────────────────────────────────────────
  const skillFormik = useFormik<SkillFormValues>({
    enableReinitialize: true,
    initialValues: currentSkill
      ? {
          categoryName: currentSkill.categoryName,
          categoryEmoji: currentSkill.categoryEmoji,
          categorySubtitle: currentSkill.categorySubtitle,
          badge: currentSkill.badge as any,
          focus: currentSkill.focus,
          items: currentSkill.items.map((i) => ({ ...i })),
          order: currentSkill.order,
        }
      : {
          categoryName: "",
          categoryEmoji: "",
          categorySubtitle: "",
          badge: "Support",
          focus: "",
          items: [],
          order: 0,
        },
    validationSchema: skillValidationSchema,
    onSubmit: async (values, helpers) => {
      try {
        await updateSkill(id, values);
        router.push("/dashboard/skill");
      } catch {
        helpers.setSubmitting(false);
      }
    },
  });

  // ── Approach formik ───────────────────────────────────────────────────────
  const approachFormik = useFormik<ApproachFormValues>({
    enableReinitialize: true,
    initialValues: approach
      ? {
          title: approach.title,
          description: approach.description,
          workflow: approach.workflow.map((w) => ({ ...w })),
        }
      : { title: "", description: "", workflow: [] },
    validationSchema: approachValidationSchema,
    onSubmit: async (values, helpers) => {
      if (!approach) return;
      try {
        await updateApproach(approach._id, values);
        router.push("/dashboard/skill");
      } catch {
        helpers.setSubmitting(false);
      }
    },
  });

  const cancel = () => router.push("/dashboard/skill");

  // ── Guard: redirect if ID not found after load ────────────────────────────
  useEffect(() => {
    if (tab === "skill" && skills.length > 0 && !currentSkill) {
      router.replace("/dashboard/skill");
    }
  }, [skills, currentSkill, tab, router]);

  return (
    <div>
      {/* Tab indicator (read-only on edit) */}
      <div
        style={{
          display: "flex",
          gap: 4,
          marginBottom: 24,
          background: "var(--surface2)",
          padding: 4,
          borderRadius: "var(--radius-sm)",
          width: "fit-content",
        }}
      >
        <div
          style={{
            padding: "8px 20px",
            borderRadius: "var(--radius-sm)",
            background: "var(--accent)",
            color: "var(--bg)",
            fontSize: 12.5,
            fontWeight: 600,
          }}
        >
          {tab === "skill" ? "⚡ Edit Skill Category" : "🧠 Edit Approach"}
        </div>
      </div>

      {tab === "skill" ? (
        <SkillCategoryForm
          formik={skillFormik}
          submitLabel="Save Changes"
          onCancel={cancel}
        />
      ) : (
        <ApproachForm
          formik={approachFormik}
          submitLabel="Save Changes"
          onCancel={cancel}
        />
      )}
    </div>
  );
}
