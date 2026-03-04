"use client";
import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { FormField, SectionCard, ActionButton, VisibilityRow } from "../common";
import { useProfile } from "@/context/ProfileContext";
import FroalaBioEditor from "@/Components/common/BioEditor";
import { buildFileUrl } from "@/services/ProfileService";
import PageLoader from "@/Components/common/PageLoader";
import DeleteConfirm from "../common/DeleteConfirm";
import { profileValidationSchema } from "@/validation/profileValidation";

export default function EditProfilePage() {
  const router = useRouter();
  const { profileData, loading, updateProfile, deleteProfile } = useProfile();
  const avatarRef = useRef<HTMLInputElement>(null);
  const resumeRef = useRef<HTMLInputElement>(null);

  const [editorContent, setEditorContent] = useState(profileData?.bio ?? "");

  useEffect(() => {
    if (profileData) setEditorContent(profileData.bio ?? "");
  }, [profileData]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: profileData?.name ?? "",
      role: profileData?.role ?? "",
      email: profileData?.email ?? "",
      phone: profileData?.phone ?? "",
      location: profileData?.location ?? "",
      bio: profileData?.bio ?? "",
      github: profileData?.github ?? "",
      portfolio: profileData?.portfolio ?? "",
      linkedin: profileData?.linkedin ?? "",
      upwork: profileData?.upwork ?? "",
      showOnLanding: profileData?.showOnLanding ?? true,
      availableForFreelance: profileData?.availableForFreelance ?? true,
      acceptContactForm: profileData?.acceptContactForm ?? true,
      showSocialLinks: profileData?.showSocialLinks ?? true,
      avatar: null as File | null,
      resume: null as File | null,
    },
    validationSchema: profileValidationSchema,
    onSubmit: async (values, helpers) => {
      if (!profileData) return;
      values.bio = editorContent;

      try {
        await updateProfile(profileData._id, values);
        router.push("/dashboard/profile");
      } catch (err) {
        helpers.setSubmitting(false);
      }
    },
  });

  const {
    values,
    errors,
    touched,
    handleBlur,
    setFieldValue,
    isSubmitting,
    handleSubmit,
  } = formik;

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = async () => {
    if (!profileData) return;
    await deleteProfile(profileData._id);
    router.push("/dashboard/profile");
  };

  if (loading) return <PageLoader />;

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Personal Info */}
        <SectionCard title="Edit Personal Info">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Full Name *"
              value={values.name}
              onChange={(v) => setFieldValue("name", v)}
              onBlur={() => handleBlur({ target: { name: "name" } } as any)}
              error={touched.name ? errors.name : undefined}
            />
            <FormField
              label="Role / Title *"
              value={values.role}
              onChange={(v) => setFieldValue("role", v)}
              onBlur={() => handleBlur({ target: { name: "role" } } as any)}
              error={touched.role ? errors.role : undefined}
            />
            <FormField
              label="Email *"
              type="email"
              value={values.email}
              onChange={(v) => setFieldValue("email", v)}
              onBlur={() => handleBlur({ target: { name: "email" } } as any)}
              error={touched.email ? errors.email : undefined}
            />
            <FormField
              label="Phone"
              value={values.phone}
              onChange={(v) => setFieldValue("phone", v)}
              error={touched.phone ? errors.phone : undefined}
            />
          </div>

          <FormField
            label="Location"
            value={values.location}
            onChange={(v) => setFieldValue("location", v)}
          />

          {/* BioEditor */}
          <div className="mb-4">
            <label className="block mb-1.5 text-sm font-medium">Bio</label>
            <FroalaBioEditor
              value={editorContent} // your local state
              onChange={(html) => setEditorContent(html)} // updates local state only
              placeholder="Tell visitors a bit about yourself..."
              // maxLength={500}
            />
            {touched.bio && errors.bio && (
              <div className="text-red-500 text-xs mt-1">{errors.bio}</div>
            )}
          </div>

          {/* Files */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Avatar */}
            <div>
              <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                🖼 Replace Avatar
              </label>
              <input
                ref={avatarRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={(e) =>
                  setFieldValue("avatar", e.target.files?.[0] ?? null)
                }
              />
              {profileData?.avatarUrl && !values.avatar && (
                <img
                  src={buildFileUrl(profileData.avatarUrl)}
                  alt="Current avatar"
                  className="w-12 h-12 rounded-full object-cover mb-2 border-2 border-border"
                />
              )}
              <button
                type="button"
                onClick={() => avatarRef.current?.click()}
                className="w-full px-3 py-2.5 bg-surface2 border border-border rounded-sm text-sm text-left font-display transition-colors hover:bg-surface2/90"
              >
                {values.avatar
                  ? `✅ ${(values.avatar as File).name}`
                  : "Click to replace avatar"}
              </button>
            </div>

            {/* Resume */}
            <div>
              <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                📄 Replace Resume (PDF)
              </label>
              {profileData?.resumeOriginalName && !values.resume && (
                <div className="text-xs text-muted mb-2">
                  Current: {profileData.resumeOriginalName}
                </div>
              )}
              <input
                ref={resumeRef}
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={(e) =>
                  setFieldValue("resume", e.target.files?.[0] ?? null)
                }
              />
              <button
                type="button"
                onClick={() => resumeRef.current?.click()}
                className="w-full px-3 py-2.5 bg-surface2 border border-border rounded-sm text-sm text-left font-display transition-colors hover:bg-surface2/90"
              >
                {values.resume
                  ? `✅ ${(values.resume as File).name}`
                  : "Click to replace resume PDF"}
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="gap-2.5 flex-wrap hidden md:flex">
            <ActionButton
              label={isSubmitting ? "Saving..." : "Save Changes"}
              onClick={() => handleSubmit()}
              loading={isSubmitting}
              icon={<span>✓</span>}
            />
            <ActionButton
              label="Cancel"
              variant="secondary"
              onClick={() => router.push("/dashboard/profile")}
            />
            <ActionButton
              label="Delete Profile"
              variant="danger"
              onClick={() => setShowDeleteConfirm(true)}
            />
          </div>

          {/* Delete Confirmation */}
          {showDeleteConfirm && (
            <DeleteConfirm
              onConfirm={handleDelete}
              onCancel={() => setShowDeleteConfirm(false)}
            />
          )}
        </SectionCard>

        {/* Social & Visibility */}
        <div className="flex flex-col gap-5">
          <SectionCard title="Social & Links">
            {[
              {
                key: "github",
                label: "GitHub",
                emoji: "🐙",
                placeholder: "github.com/username",
              },
              {
                key: "portfolio",
                label: "Portfolio URL",
                emoji: "🌐",
                placeholder: "yoursite.dev",
              },
              {
                key: "linkedin",
                label: "LinkedIn",
                emoji: "💼",
                placeholder: "linkedin.com/in/username",
              },
              {
                key: "upwork",
                label: "Upwork",
                emoji: "⚡",
                placeholder: "@username",
              },
            ].map(({ key, label, emoji, placeholder }) => (
              <FormField
                key={key}
                label={`${emoji} ${label}`}
                value={(values as any)[key]}
                onChange={(v) => setFieldValue(key, v)}
                placeholder={placeholder}
                error={(touched as any)[key] ? (errors as any)[key] : undefined}
              />
            ))}
          </SectionCard>

          <SectionCard title="Visibility Settings">
            <VisibilityRow
              label="Show on landing page"
              desc="Display your profile publicly"
              checked={values.showOnLanding}
              onChange={(v) => setFieldValue("showOnLanding", v)}
            />
            <VisibilityRow
              label="Available for freelance"
              desc="Show 'available' badge"
              checked={values.availableForFreelance}
              onChange={(v) => setFieldValue("availableForFreelance", v)}
            />
            <VisibilityRow
              label="Accept contact form"
              desc="Let visitors message you"
              checked={values.acceptContactForm}
              onChange={(v) => setFieldValue("acceptContactForm", v)}
            />
            <VisibilityRow
              label="Show social links"
              desc="Display links on portfolio"
              checked={values.showSocialLinks}
              onChange={(v) => setFieldValue("showSocialLinks", v)}
              last
            />

            {/* Action Buttons */}
            <div className="gap-2.5 flex-wrap flex md:hidden mt-10">
              <ActionButton
                label={isSubmitting ? "Saving..." : "Save Changes"}
                onClick={() => handleSubmit()}
                loading={isSubmitting}
                icon={<span>✓</span>}
              />
              <ActionButton
                label="Cancel"
                variant="secondary"
                onClick={() => router.push("/dashboard/profile")}
              />
              <ActionButton
                label="Delete Profile"
                variant="danger"
                onClick={() => setShowDeleteConfirm(true)}
              />
            </div>
          </SectionCard>
        </div>
      </div>
    </form>
  );
}
