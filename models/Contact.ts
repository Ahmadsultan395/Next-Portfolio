import mongoose, { Schema, Document } from "mongoose";
export interface IContact extends Document {
  email: string; phone: string; whatsapp: string;
  location: string; locationNote: string; github: string; linkedin: string;
}
const ContactSchema = new Schema<IContact>({
  email:        { type: String, default: "" },
  phone:        { type: String, default: "" },
  whatsapp:     { type: String, default: "" },
  location:     { type: String, default: "" },
  locationNote: { type: String, default: "" },
  github:       { type: String, default: "" },
  linkedin:     { type: String, default: "" },
}, { timestamps: true });
export const ContactModel = mongoose.models.Contact || mongoose.model<IContact>("Contact", ContactSchema);
