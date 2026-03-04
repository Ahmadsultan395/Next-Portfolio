import * as Yup from "yup";
import { ProjectFormValues } from "../types/project";

export const PROJECT_CATEGORIES = [
  "Frontend",
  "Full Stack",
  "UI",
  "Realtime",
  "E-commerce",
  "Other",
];
export const PROJECT_STATUSES = ["live", "wip", "plan"];

// Preset colors for color picker
export const PRESET_COLORS = [
  "#6366f1",
  "#8b5cf6",
  "#06b6d4",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#ec4899",
  "#3b82f6",
];

export const projectValidationSchema = Yup.object({
  name: Yup.string().max(100).required("Project name is required"),
  desc: Yup.string().max(300).required("Description is required"),
  emoji: Yup.string().optional(),
  color: Yup.string().optional(),
  status: Yup.string()
    .oneOf(["live", "wip", "plan"])
    .required("Status is required"),
  category: Yup.string().required("Category is required"),
  tech: Yup.array().of(Yup.string().required()).optional(),
  highlights: Yup.array().of(Yup.string().required()).optional(),
  liveUrl: Yup.string()
    .transform((value) => (value === "" ? undefined : value))
    .url("Must be a valid URL")
    .optional(),

  githubUrl: Yup.string()
    .transform((value) => (value === "" ? undefined : value))
    .url("Must be a valid URL")
    .optional(),
  featured: Yup.boolean().optional(),
  order: Yup.number().min(0).optional(),
});

export const projectInitialValues: ProjectFormValues = {
  name: "",
  desc: "",
  emoji: "🚀",
  color: "#6366f1",
  status: "plan",
  category: "Frontend",
  tech: [],
  highlights: [],
  liveUrl: "",
  githubUrl: "",
  featured: false,
  order: 0,
  imageUrl: "",
  image: "",
};
