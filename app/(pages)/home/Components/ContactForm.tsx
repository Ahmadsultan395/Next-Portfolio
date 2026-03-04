"use client";

import { Send, Mail, Loader2 } from "lucide-react";
import { useContact } from "@/context/ContactContext";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { ContactMessageValues } from "@/types/contact.types";
import { ContactMessageSchema } from "@/validation/contactValidation";
import { toast } from "sonner";

export default function ContactForm() {
  const { contactMessage, contact, createMessageContact } = useContact();
  // console.log(contactMessage);

  const initialValues: ContactMessageValues = {
    name: "",
    email: "",
    subject: "",
    message: "",
    reply: "Wait",
    unread: true,
  };

  const handleSubmit = async (
    values: ContactMessageValues,
    { setSubmitting, resetForm, setStatus }: any,
  ) => {
    setStatus(null);
    try {
      await createMessageContact({
        name: values.name.trim(),
        email: values.email.trim(),
        subject: values.subject.trim(),
        message: values.message.trim(),
        unread: values.unread,
        reply: values.reply?.trim(),
      });

      resetForm();
      setStatus({ success: true });
      toast.success("Message send successfully!");
    } catch (err) {
      // Fallback: mailto open karo agar API fail ho
      const subject = encodeURIComponent(values.subject.trim());
      const body = encodeURIComponent(
        `Hi,\n\nMy name is ${values.name.trim()}.\n\n${values.message.trim()}\n\nEmail: ${values.email.trim()}\n`,
      );
      window.location.href = `mailto:${contact?.email}?subject=${subject}&body=${body}`;
      setStatus({ error: "user messsge failed" });
    } finally {
      setSubmitting(false);
    }
  };

  const inputBase =
    "w-full px-4 py-3 rounded-2xl border bg-[var(--head-btn-border)]/35 backdrop-blur-sm text-[var(--foreground)] placeholder:text-[var(--muted)] outline-none transition";
  const inputNormal =
    "border-white/10 hover:border-white/20 focus:border-[var(--hero-image)]/45 focus:ring-2 focus:ring-[var(--hero-image)]/15";
  const inputErr =
    "border-red-400/60 focus:border-red-400/70 focus:ring-2 focus:ring-red-400/20";

  return (
    <div className="form-card relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-7 md:p-8 shadow-[0_0_10px_var(--hero-image)]">
      {/* Glow blob */}
      <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full blur-3xl bg-gradient-to-br from-[var(--hero-image)]/18 via-purple-500/10 to-transparent opacity-80" />

      <div className="relative">
        <h2 className="text-3xl font-black text-[var(--foreground)]">
          Send a <span className="text-[var(--hero-image)]">Message</span>
        </h2>
        <p className="mt-2 text-[15px] text-[var(--muted)]">
          Send Your Message, i will contact you soon.
        </p>

        <Formik
          initialValues={initialValues}
          validationSchema={ContactMessageSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting, values, status }) => (
            <Form className="mt-7 space-y-4" noValidate>
              {/* ── Success Banner ── */}
              {status?.success && (
                <div className="rounded-2xl border border-green-400/25 bg-green-400/10 px-4 py-3 text-sm text-green-300">
                  ✅ Message send successfully i will reach you soon.
                </div>
              )}

              {/* ── Error Banner ── */}
              {status?.error && (
                <div className="rounded-2xl border border-red-400/25 bg-red-400/10 px-4 py-3 text-sm text-red-300">
                  ⚠️ {status.error}
                </div>
              )}

              {/* ── Name + Email Row ── */}
              <div className="grid md:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-1">
                  <label className="text-sm text-[var(--muted)]">
                    Name <span className="text-red-400">*</span>
                  </label>
                  <Field
                    name="name"
                    placeholder="Your name"
                    className={`${inputBase} ${
                      errors.name && touched.name ? inputErr : inputNormal
                    }`}
                  />
                  <ErrorMessage
                    name="name"
                    component="p"
                    className="text-xs text-red-400"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label className="text-sm text-[var(--muted)]">
                    Email <span className="text-red-400">*</span>
                  </label>
                  <Field
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    className={`${inputBase} ${
                      errors.email && touched.email ? inputErr : inputNormal
                    }`}
                  />
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-xs text-red-400"
                  />
                </div>
              </div>

              {/* ── Subject ── */}
              <div className="space-y-1">
                <label className="text-sm text-[var(--muted)]">
                  Subject <span className="text-red-400">*</span>
                </label>
                <Field
                  name="subject"
                  placeholder="Project discussion / Website / Fix bugs"
                  className={`${inputBase} ${
                    errors.subject && touched.subject ? inputErr : inputNormal
                  }`}
                />
                <ErrorMessage
                  name="subject"
                  component="p"
                  className="text-xs text-red-400"
                />
              </div>

              {/* ── Message ── */}
              <div className="space-y-1">
                <label className="text-sm text-[var(--muted)]">
                  Message <span className="text-red-400">*</span>
                </label>
                <Field
                  as="textarea"
                  name="message"
                  placeholder="Tell me about your project..."
                  className={`${inputBase} ${
                    errors.message && touched.message ? inputErr : inputNormal
                  } min-h-[140px] resize-none`}
                />
                <div className="flex justify-between items-start">
                  <ErrorMessage
                    name="message"
                    component="p"
                    className="text-xs text-red-400"
                  />
                  <p
                    className={`text-xs ml-auto ${
                      values.message.length > 1000
                        ? "text-red-400"
                        : "text-[var(--muted)]"
                    }`}
                  >
                    {values.message.length}/1000
                  </p>
                </div>
              </div>

              {/* ── Buttons ── */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold shadow-lg transition bg-gradient-to-r from-[var(--hero-image)] to-purple-500 text-white disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

                <a
                  href={`mailto:${contact?.email}`}
                  className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 bg-white/5 text-[var(--foreground)] hover:bg-white/10 transition"
                >
                  Email Direct <Mail className="w-4 h-4" />
                </a>
              </div>

              {/* ── Divider ── */}
              <div className="pt-5">
                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent" />
                <p className="mt-4 text-sm text-[var(--muted)]">
                  Response time: 24 ghante ke andar (usually faster).
                </p>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
