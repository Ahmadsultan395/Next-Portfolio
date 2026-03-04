import * as Yup from "yup";

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const signupValidationSchema = Yup.object({
  fname: Yup.string()
    .min(2, "First Name must be at least 2 characters")
    .max(50, "First Name must be less than 50 characters")
    .required("First Name is required"),
  lname: Yup.string()
    .min(2, "Last Name must be at least 2 characters")
    .max(50, "Last Name must be less than 50 characters")
    .required("Last Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Password must contain uppercase, lowercase, number and special character",
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
  terms: Yup.boolean()
    .oneOf([true], "You must accept the terms and conditions")
    .required("You must accept the terms and conditions"),
});

export const forgotPasswordValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

// ─── PROFILE SCHEMA ───────────────────────────────────────────
export const profileSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(60, "Name too long")
    .required("Full name is required"),

  role: Yup.string()
    .trim()
    .min(2, "Role must be at least 2 characters")
    .max(80, "Role too long")
    .required("Role / Title is required"),

  email: Yup.string()
    .trim()
    .email("Please enter a valid email address")
    .required("Email is required"),

  phone: Yup.string()
    .trim()
    .matches(
      /^(\+?\d[\d\s\-().]{6,18}\d)?$/,
      "Enter a valid phone number (e.g. +92 300 1234567)",
    )
    .optional(),

  location: Yup.string().trim().max(100, "Location too long").optional(),

  bio: Yup.string()
    .trim()
    .min(20, "Bio should be at least 20 characters")
    .max(500, "Bio should not exceed 500 characters")
    .required("Bio is required"),

  github: Yup.string()
    .trim()
    .matches(
      /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_-]+\/?$/,
      "Enter a valid GitHub URL (e.g. github.com/username)",
    )
    .optional()
    .transform((v) => (v === "" ? undefined : v)),

  portfolio: Yup.string()
    .trim()
    .matches(
      /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/,
      "Enter a valid URL (e.g. yoursite.dev)",
    )
    .optional()
    .transform((v) => (v === "" ? undefined : v)),

  linkedin: Yup.string()
    .trim()
    .matches(
      /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/,
      "Enter a valid LinkedIn URL (e.g. linkedin.com/in/username)",
    )
    .optional()
    .transform((v) => (v === "" ? undefined : v)),

  upwork: Yup.string()
    .trim()
    .matches(
      /^@?[a-zA-Z0-9_]{1,15}$/,
      "Enter a valid upwork handle (e.g. @username)",
    )
    .optional()
    .transform((v) => (v === "" ? undefined : v)),

  isActive: Yup.boolean().required(),
});

// ─── TYPE FROM SCHEMA ─────────────────────────────────────────
export type ProfileFormValues = Yup.InferType<typeof profileSchema>;

// ─── DEFAULT VALUES ───────────────────────────────────────────

// ─────────────────────────────────────────────────────────────
// Add more schemas here as new pages are added, e.g.:
//
// export const experienceSchema = Yup.object({ ... });
// export const projectSchema    = Yup.object({ ... });
// export const skillSchema      = Yup.object({ ... });
// ─────────────────────────────────────────────────────────────

// Backend DTO ke saath match karta hai (flat structure, no nested social/visibility)

export const profileValidationSchema = Yup.object({
  // Required
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

  // Optional personal
  phone: Yup.string()
    .matches(/^[+\d\s\-()]{7,20}$/, "Enter a valid phone number")
    .nullable()
    .notRequired(),

  location: Yup.string().max(100).nullable().notRequired(),

  bio: Yup.string()
    .max(500, "Bio must be under 500 characters")
    .nullable()
    .notRequired(),

  // Optional social (flat)
  github: Yup.string().max(200).nullable().notRequired(),
  portfolio: Yup.string().max(200).nullable().notRequired(),
  linkedin: Yup.string().max(200).nullable().notRequired(),
  upwork: Yup.string().max(100).nullable().notRequired(),

  // Visibility booleans
  showOnLanding: Yup.boolean().notRequired(),
  availableForFreelance: Yup.boolean().notRequired(),
  acceptContactForm: Yup.boolean().notRequired(),
  showSocialLinks: Yup.boolean().notRequired(),

  // Files — validate only if provided
  avatar: Yup.mixed()
    .nullable()
    .notRequired()
    .test("fileSize", "Avatar must be under 2MB", (value) => {
      if (!value || !(value instanceof File)) return true;
      return value.size <= 2 * 1024 * 1024;
    })
    .test("fileType", "Only jpg, png, webp allowed", (value) => {
      if (!value || !(value instanceof File)) return true;
      return ["image/jpeg", "image/png", "image/webp"].includes(value.type);
    }),

  resume: Yup.mixed()
    .nullable()
    .notRequired()
    .test("fileSize", "Resume must be under 5MB", (value) => {
      if (!value || !(value instanceof File)) return true;
      return value.size <= 5 * 1024 * 1024;
    })
    .test("fileType", "Only PDF allowed", (value) => {
      if (!value || !(value instanceof File)) return true;
      return value.type === "application/pdf";
    }),
});

// ── Initial Values ────────────────────────────────────────────────────────────
export const profileInitialValues = {
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
