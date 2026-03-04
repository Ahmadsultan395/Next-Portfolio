"use client";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { FormField, SectionCard, ActionButton, VisibilityRow } from "../common";
import { useProfile } from "@/context/ProfileContext";
import FroalaBioEditor from "@/Components/common/BioEditor";
import { profileValidationSchema } from "@/validation/profileValidation";

const initialValues = {
  name: "",
  role: "",
  email: "",
  phone: "",
  location: "",
  bio: "",
  github: "",
  portfolio: "",
  linkedin: "",
  upwork: "",
  showOnLanding: true,
  availableForFreelance: true,
  acceptContactForm: true,
  showSocialLinks: true,
  avatar: null as File | null,
  resume: null as File | null,
};

export default function AddProfilePage() {
  const router = useRouter();
  const { createProfile } = useProfile();
  const avatarRef = useRef<HTMLInputElement>(null);
  const resumeRef = useRef<HTMLInputElement>(null);

  const formik = useFormik({
    initialValues,
    validationSchema: profileValidationSchema,
    onSubmit: async (values, helpers) => {
      try {
        await createProfile(values);
        router.push("/dashboard/profile");
      } catch (err: any) {
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

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* ── Personal Info ── */}
        <SectionCard title="Personal Info">
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}
          >
            <FormField
              label="Full Name *"
              name="name"
              value={values.name}
              onChange={(v) => setFieldValue("name", v)}
              onBlur={() => handleBlur({ target: { name: "name" } } as any)}
              placeholder="Ahmad Sultan"
              error={touched.name ? errors.name : undefined}
            />
            <FormField
              label="Role / Title *"
              name="role"
              value={values.role}
              onChange={(v) => setFieldValue("role", v)}
              onBlur={() => handleBlur({ target: { name: "role" } } as any)}
              placeholder="Full Stack Developer"
              error={touched.role ? errors.role : undefined}
            />
            <FormField
              label="Email *"
              name="email"
              type="email"
              value={values.email}
              onChange={(v) => setFieldValue("email", v)}
              onBlur={() => handleBlur({ target: { name: "email" } } as any)}
              placeholder="you@example.com"
              error={touched.email ? errors.email : undefined}
            />
            <FormField
              label="Phone"
              name="phone"
              value={values.phone}
              onChange={(v) => setFieldValue("phone", v)}
              onBlur={() => handleBlur({ target: { name: "phone" } } as any)}
              placeholder="+92 300 1234567"
              error={touched.phone ? errors.phone : undefined}
            />
          </div>

          <FormField
            label="Location"
            name="location"
            value={values.location}
            onChange={(v) => setFieldValue("location", v)}
            placeholder="Lahore, Pakistan"
            error={touched.location ? errors.location : undefined}
          />

          <div style={{ marginBottom: 14 }}>
            <label style={{ display: "block", marginBottom: 6 }}>Bio</label>

            <FroalaBioEditor
              value={values.bio} // your local state
              onChange={(html) => setFieldValue("bio", html)} // updates local state only
              placeholder="Tell visitors a bit about yourself..."
              maxLength={500}
            />

            {touched.bio && errors.bio && (
              <div style={{ color: "red", fontSize: 12, marginTop: 5 }}>
                {errors.bio}
              </div>
            )}
          </div>

          {/* ── File Uploads ── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 14,
              marginBottom: 14,
            }}
          >
            {/* Avatar */}
            <div>
              <label
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "var(--muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.8px",
                  marginBottom: 6,
                  display: "block",
                }}
              >
                🖼 Avatar (jpg/png/webp — max 2MB)
              </label>
              <input
                ref={avatarRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                style={{ display: "none" }}
                onChange={(e) =>
                  setFieldValue("avatar", e.target.files?.[0] ?? null)
                }
              />
              <button
                type="button"
                onClick={() => avatarRef.current?.click()}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  background: "var(--surface2)",
                  border: "1px dashed var(--border)",
                  borderRadius: "var(--radius-sm)",
                  color: values.avatar ? "var(--fg)" : "var(--muted)",
                  cursor: "pointer",
                  fontSize: 13,
                  fontFamily: "var(--font-display)",
                  textAlign: "left",
                }}
              >
                {values.avatar
                  ? `✅ ${(values.avatar as File).name}`
                  : "Click to upload avatar"}
              </button>
            </div>

            {/* Resume */}
            <div>
              <label
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "var(--muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.8px",
                  marginBottom: 6,
                  display: "block",
                }}
              >
                📄 Resume / CV (PDF only — max 5MB)
              </label>
              <input
                ref={resumeRef}
                type="file"
                accept="application/pdf"
                style={{ display: "none" }}
                onChange={(e) =>
                  setFieldValue("resume", e.target.files?.[0] ?? null)
                }
              />
              <button
                type="button"
                onClick={() => resumeRef.current?.click()}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  background: "var(--surface2)",
                  border: "1px dashed var(--border)",
                  borderRadius: "var(--radius-sm)",
                  color: values.resume ? "var(--fg)" : "var(--muted)",
                  cursor: "pointer",
                  fontSize: 13,
                  fontFamily: "var(--font-display)",
                  textAlign: "left",
                }}
              >
                {values.resume
                  ? `✅ ${(values.resume as File).name}`
                  : "Click to upload resume PDF"}
              </button>
            </div>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <ActionButton
              label={isSubmitting ? "Creating..." : "Create Profile"}
              type="submit"
              loading={isSubmitting}
              icon={<span>✓</span>}
            />
            <ActionButton
              label="Cancel"
              variant="secondary"
              onClick={() => router.push("/dashboard/profile")}
            />
          </div>
        </SectionCard>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* ── Social Links ── */}
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
                label: "upwork",
                emoji: "⚡",
                placeholder: "@username",
              },
            ].map(({ key, label, emoji, placeholder }) => (
              <FormField
                key={key}
                label={`${emoji} ${label}`}
                name={key}
                value={(values as any)[key]}
                onChange={(v) => setFieldValue(key, v)}
                placeholder={placeholder}
                error={(touched as any)[key] ? (errors as any)[key] : undefined}
              />
            ))}
          </SectionCard>

          {/* ── Visibility ── */}
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
          </SectionCard>
        </div>
      </div>
    </form>
  );
}
