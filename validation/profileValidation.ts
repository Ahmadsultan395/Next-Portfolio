import { ProfileFormValues } from "@/types/profileTypes";
import * as Yup from "yup";

export const profileValidationSchema = Yup.object({
  // ─── Required Fields ───────────────────────────────────────────
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(60, "Name too long")
    .required("Full name is required"),

  role: Yup.string()
    .min(2, "Role must be at least 2 characters")
    .max(80, "Role title too long")
    .required("Role / title is required"),

  email: Yup.string()
    .email("Enter a valid email address")
    .required("Email is required"),

  // ─── Optional Fields ───────────────────────────────────────────
  phone: Yup.string()
    .matches(/^[+\d\s\-()]{7,20}$/, "Enter a valid phone number")
    .nullable()
    .notRequired(),

  location: Yup.string().max(100, "Location too long").nullable().notRequired(),

  // FIX 1: bio — removed conflicting .required() + wrong message
  bio: Yup.string().nullable().notRequired(),

  // ─── Social Links (FLAT — matching ProfileFormValues) ──────────
  // FIX 2: no longer nested under social: Yup.object({...})
  github: Yup.string().max(200, "URL too long").nullable().notRequired(),
  portfolio: Yup.string().max(200, "URL too long").nullable().notRequired(),
  linkedin: Yup.string().max(200, "URL too long").nullable().notRequired(),
  upwork: Yup.string().max(100, "Handle too long").nullable().notRequired(),

  // ─── Visibility (FLAT — matching ProfileFormValues) ────────────
  showOnLanding: Yup.boolean().notRequired(),
  availableForFreelance: Yup.boolean().notRequired(),
  acceptContactForm: Yup.boolean().notRequired(),
  showSocialLinks: Yup.boolean().notRequired(),
});

// ─── Initial Values ────────────────────────────────────────────
export const profileInitialValues: ProfileFormValues = {
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
};
