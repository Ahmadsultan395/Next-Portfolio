"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useFormik } from "formik";
import SkillCategoryForm from "./SkillCategoryForm";
import ApproachForm from "./ApproachForm";
import { useSkill } from "@/context/SkillContext";
import {
  approachInitialValues,
  approachValidationSchema,
  skillInitialValues,
  skillValidationSchema,
} from "@/validation/skillValidation";
import { ApproachFormValues, SkillFormValues } from "@/types/skill";

type Tab = "skill" | "approach";

export default function AddSkillPage() {
  const router = useRouter();
  const params = useSearchParams();
  const [tab, setTab] = useState<Tab>((params.get("tab") as Tab) || "skill");
  const { createSkill, createApproach } = useSkill();

  // ── Skill formik ──────────────────────────────────────────────────────────
  const skillFormik = useFormik<SkillFormValues>({
    initialValues: skillInitialValues,
    validationSchema: skillValidationSchema,
    onSubmit: async (values, helpers) => {
      try {
        await createSkill(values);
        router.push("/dashboard/skill");
      } catch {
        helpers.setSubmitting(false);
      }
    },
  });

  // ── Approach formik ───────────────────────────────────────────────────────
  const approachFormik = useFormik<ApproachFormValues>({
    initialValues: approachInitialValues,
    validationSchema: approachValidationSchema,
    onSubmit: async (values, helpers) => {
      try {
        await createApproach(values);
        router.push("/dashboard/skill");
      } catch {
        helpers.setSubmitting(false);
      }
    },
  });

  const cancel = () => router.push("/dashboard/skill");

  return (
    <div>
      {/* Tabs */}
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
        {(["skill", "approach"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: "8px 20px",
              borderRadius: "var(--radius-sm)",
              border: "none",
              cursor: "pointer",
              fontSize: 12.5,
              fontWeight: 600,
              transition: "all .15s",
              background: tab === t ? "var(--accent)" : "transparent",
              color: tab === t ? "var(--bg)" : "var(--muted)",
            }}
          >
            {t === "skill" ? "⚡ Skill Category" : "🧠 Approach"}
          </button>
        ))}
      </div>

      {tab === "skill" ? (
        <SkillCategoryForm
          formik={skillFormik}
          submitLabel="Create Skill"
          onCancel={cancel}
        />
      ) : (
        <ApproachForm
          formik={approachFormik}
          submitLabel="Create Approach"
          onCancel={cancel}
        />
      )}
    </div>
  );
}
