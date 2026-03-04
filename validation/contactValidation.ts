import * as Yup from "yup";
import { ContactFormValues } from "@/types/contact.types";

export const contactInitialValues: ContactFormValues = {
  email: "",
  phone: "",
  whatsapp: "",
  location: "",
  locationNote: "",
  github: "",
  linkedin: "",
};

export const contactValidationSchema = Yup.object({
  email: Yup.string().email("Invalid email").max(100),
  phone: Yup.string().max(30),
  whatsapp: Yup.string().max(30),
  location: Yup.string().max(100),
  locationNote: Yup.string().max(200),
  github: Yup.string().url("Must be a valid URL").max(200).nullable(),
  linkedin: Yup.string().url("Must be a valid URL").max(200).nullable(),
});

export const ContactMessageSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot be longer than 50 characters")
    .required("Name is required"),

  email: Yup.string()
    .email("Enter a valid email (e.g. you@example.com)")
    .required("Email is required"),

  subject: Yup.string()
    .min(3, "Subject must be at least 3 characters")
    .max(100, "Subject cannot be longer than 100 characters")
    .required("Subject is required"),

  message: Yup.string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message cannot be longer than 1000 characters")
    .required("Message is required"),
});
