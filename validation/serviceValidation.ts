import * as Yup from "yup";
import { ServiceFormValues } from "@/types/service.types";

export const SERVICE_ICONS = ["💻","🎨","🔗","🔥","⚡","🌐","🛒","💬","📊","🔐","🎮","📱","🔧","🏆","💡","🚀"];
export const SERVICE_COLORS = ["#6366f1","#8b5cf6","#ec4899","#14b8a6","#f59e0b","#22c55e"];

export const serviceInitialValues: ServiceFormValues = {
  title: "", subtitle: "", description: "", badge: "",
  tech: [], features: [], icon: "💻", color: "#6366f1", order: 0, isActive: true,
};

export const serviceValidationSchema = Yup.object({
  title:    Yup.string().required("Title is required").max(80, "Max 80 chars"),
  subtitle: Yup.string().max(120),
  description: Yup.string().max(500),
  badge:    Yup.string().max(40),
  order:    Yup.number().min(0),
});
