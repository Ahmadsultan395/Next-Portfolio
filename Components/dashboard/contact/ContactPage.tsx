"use client";
import React from "react";
import { useFormik } from "formik";
import { useContact } from "@/context/ContactContext";
import {
  contactInitialValues,
  contactValidationSchema,
} from "@/validation/contactValidation";
import { ContactFormValues } from "@/types/contact.types";

const inp: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  background: "var(--surface2)",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius-sm)",
  color: "var(--fg)",
  fontSize: 13.5,
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "inherit",
};
const lbl: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  color: "var(--muted)",
  textTransform: "uppercase",
  letterSpacing: "0.8px",
  marginBottom: 6,
  display: "block",
};

function Field({
  label,
  error,
  hint,
  children,
}: {
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={lbl}>{label}</label>
      {children}
      {hint && !error && (
        <div style={{ fontSize: 11.5, color: "var(--muted)", marginTop: 4 }}>
          {hint}
        </div>
      )}
      {error && (
        <div style={{ fontSize: 11.5, color: "#ef4444", marginTop: 4 }}>
          ⚠ {error}
        </div>
      )}
    </div>
  );
}

export default function ContactPage() {
  const { contact, loading, createContact, updateContact } = useContact();
  const isEdit = !!contact;

  const formik = useFormik<ContactFormValues>({
    enableReinitialize: true,
    initialValues: contact
      ? {
          email: contact.email,
          phone: contact.phone,
          whatsapp: contact.whatsapp,
          location: contact.location,
          locationNote: contact.locationNote,
          github: contact.github,
          linkedin: contact.linkedin,
        }
      : contactInitialValues,
    validationSchema: contactValidationSchema,
    onSubmit: async (values, helpers) => {
      try {
        if (isEdit) {
          await updateContact(contact!._id, values);
        } else {
          await createContact(values);
        }
      } catch {
        helpers.setSubmitting(false);
      }
    },
  });

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    isSubmitting,
    handleSubmit,
  } = formik;

  if (loading)
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              height: 52,
              borderRadius: "var(--radius-sm)",
              background: "var(--surface)",
              animation: "pulse 1.5s ease infinite",
            }}
          />
        ))}
        <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}`}</style>
      </div>
    );

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 18, fontWeight: 700 }}>Contact Info</div>
        <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>
          {isEdit
            ? "Update your contact details"
            : "Add your contact information"}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}
        >
          {/* LEFT — contact fields */}
          <div>
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                padding: 24,
                marginBottom: 20,
              }}
            >
              <div
                style={{ fontSize: 13.5, fontWeight: 700, marginBottom: 20 }}
              >
                📧 Contact Details
              </div>

              <Field
                label="Email"
                error={touched.email ? errors.email : undefined}
                hint="e.g. contact@example.com"
              >
                <div style={{ position: "relative" }}>
                  <span
                    style={{
                      position: "absolute",
                      left: 12,
                      top: "50%",
                      transform: "translateY(-50%)",
                      fontSize: 16,
                    }}
                  >
                    ✉️
                  </span>
                  <input
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{ ...inp, paddingLeft: 38 }}
                    placeholder="contact@example.com"
                  />
                </div>
              </Field>

              <Field
                label="Phone"
                error={touched.phone ? errors.phone : undefined}
                hint="Displayed on contact page"
              >
                <div style={{ position: "relative" }}>
                  <span
                    style={{
                      position: "absolute",
                      left: 12,
                      top: "50%",
                      transform: "translateY(-50%)",
                      fontSize: 16,
                    }}
                  >
                    📞
                  </span>
                  <input
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{ ...inp, paddingLeft: 38 }}
                    placeholder="+1234567890"
                  />
                </div>
              </Field>

              <Field
                label="WhatsApp"
                error={touched.whatsapp ? errors.whatsapp : undefined}
                hint="Can be same as phone or different"
              >
                <div style={{ position: "relative" }}>
                  <span
                    style={{
                      position: "absolute",
                      left: 12,
                      top: "50%",
                      transform: "translateY(-50%)",
                      fontSize: 16,
                    }}
                  >
                    💬
                  </span>
                  <input
                    name="whatsapp"
                    value={values.whatsapp}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{ ...inp, paddingLeft: 38 }}
                    placeholder="+1234567890"
                  />
                </div>
              </Field>
            </div>

            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                padding: 24,
              }}
            >
              <div
                style={{ fontSize: 13.5, fontWeight: 700, marginBottom: 20 }}
              >
                📍 Location
              </div>

              <Field
                label="Location"
                error={touched.location ? errors.location : undefined}
              >
                <div style={{ position: "relative" }}>
                  <span
                    style={{
                      position: "absolute",
                      left: 12,
                      top: "50%",
                      transform: "translateY(-50%)",
                      fontSize: 16,
                    }}
                  >
                    📍
                  </span>
                  <input
                    name="location"
                    value={values.location}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{ ...inp, paddingLeft: 38 }}
                    placeholder="New York, USA"
                  />
                </div>
              </Field>

              <Field label="Location Note">
                <input
                  name="locationNote"
                  value={values.locationNote}
                  onChange={handleChange}
                  style={inp}
                  placeholder="Remote / Online projects available."
                />
              </Field>
            </div>
          </div>

          {/* RIGHT — social + preview */}
          <div>
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                padding: 24,
                marginBottom: 20,
              }}
            >
              <div
                style={{ fontSize: 13.5, fontWeight: 700, marginBottom: 20 }}
              >
                🔗 Social Links
              </div>

              <Field
                label="GitHub URL"
                error={touched.github ? errors.github : undefined}
              >
                <div style={{ position: "relative" }}>
                  <span
                    style={{
                      position: "absolute",
                      left: 12,
                      top: "50%",
                      transform: "translateY(-50%)",
                      fontSize: 16,
                    }}
                  >
                    🐙
                  </span>
                  <input
                    name="github"
                    value={values.github}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{ ...inp, paddingLeft: 38 }}
                    placeholder="https://github.com/username"
                  />
                </div>
              </Field>

              <Field
                label="LinkedIn URL"
                error={touched.linkedin ? errors.linkedin : undefined}
              >
                <div style={{ position: "relative" }}>
                  <span
                    style={{
                      position: "absolute",
                      left: 12,
                      top: "50%",
                      transform: "translateY(-50%)",
                      fontSize: 16,
                    }}
                  >
                    💼
                  </span>
                  <input
                    name="linkedin"
                    value={values.linkedin}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{ ...inp, paddingLeft: 38 }}
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
              </Field>
            </div>

            {/* Live Preview */}
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                padding: 24,
              }}
            >
              <div
                style={{ fontSize: 13.5, fontWeight: 700, marginBottom: 16 }}
              >
                👁 Preview
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                {values.email && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "10px 14px",
                      background: "var(--surface2)",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <span style={{ fontSize: 18 }}>✉️</span>
                    <div>
                      <div
                        style={{
                          fontSize: 10,
                          color: "var(--muted)",
                          fontWeight: 600,
                          textTransform: "uppercase",
                        }}
                      >
                        Email
                      </div>
                      <div style={{ fontSize: 13 }}>{values.email}</div>
                    </div>
                  </div>
                )}
                {values.phone && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "10px 14px",
                      background: "var(--surface2)",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <span style={{ fontSize: 18 }}>📞</span>
                    <div>
                      <div
                        style={{
                          fontSize: 10,
                          color: "var(--muted)",
                          fontWeight: 600,
                          textTransform: "uppercase",
                        }}
                      >
                        Phone
                      </div>
                      <div style={{ fontSize: 13 }}>{values.phone}</div>
                    </div>
                  </div>
                )}
                {values.location && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "10px 14px",
                      background: "var(--surface2)",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <span style={{ fontSize: 18 }}>📍</span>
                    <div>
                      <div
                        style={{
                          fontSize: 10,
                          color: "var(--muted)",
                          fontWeight: 600,
                          textTransform: "uppercase",
                        }}
                      >
                        Location
                      </div>
                      <div style={{ fontSize: 13 }}>{values.location}</div>
                      {values.locationNote && (
                        <div style={{ fontSize: 11, color: "var(--muted)" }}>
                          {values.locationNote}
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {(values.github || values.linkedin) && (
                  <div style={{ display: "flex", gap: 8 }}>
                    {values.github && (
                      <a
                        href={values.github}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          padding: "6px 14px",
                          background: "var(--surface2)",
                          border: "1px solid var(--border)",
                          borderRadius: "var(--radius-sm)",
                          fontSize: 12,
                          color: "var(--fg)",
                          textDecoration: "none",
                        }}
                      >
                        🐙 GitHub
                      </a>
                    )}
                    {values.linkedin && (
                      <a
                        href={values.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          padding: "6px 14px",
                          background: "var(--surface2)",
                          border: "1px solid var(--border)",
                          borderRadius: "var(--radius-sm)",
                          fontSize: 12,
                          color: "var(--fg)",
                          textDecoration: "none",
                        }}
                      >
                        💼 LinkedIn
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              padding: "9px 22px",
              background: "var(--accent)",
              color: "var(--bg)",
              border: "none",
              borderRadius: "var(--radius-sm)",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 700,
              opacity: isSubmitting ? 0.6 : 1,
            }}
          >
            {isSubmitting
              ? "⏳ Saving..."
              : `✓ ${isEdit ? "Update Contact" : "Save Contact"}`}
          </button>
        </div>
      </form>
    </div>
  );
}
