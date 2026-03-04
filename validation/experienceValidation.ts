import * as Yup from "yup";
import { ExperienceFormValues } from "@/types/experience.types";

export const experienceInitialValues: ExperienceFormValues = {
  period: "", role: "", company: "", description: "", current: false, order: 0,
};

export const experienceValidationSchema = Yup.object({
  period:  Yup.string().required("Period is required").max(40),
  role:    Yup.string().required("Role is required").max(100),
  company: Yup.string().required("Company is required").max(100),
  description: Yup.string().max(600),
  order:   Yup.number().min(0),
});
