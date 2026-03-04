import mongoose, { Schema, Document } from "mongoose";
export interface IService extends Document {
  title: string; subtitle: string; description: string;
  badge: string; tech: string[]; features: string[];
  icon: string; color: string; order: number; isActive: boolean;
}
const ServiceSchema = new Schema<IService>({
  title:       { type: String, required: true },
  subtitle:    { type: String, default: "" },
  description: { type: String, default: "" },
  badge:       { type: String, default: "" },
  tech:        [{ type: String }],
  features:    [{ type: String }],
  icon:        { type: String, default: "💻" },
  color:       { type: String, default: "#6366f1" },
  order:       { type: Number, default: 0 },
  isActive:    { type: Boolean, default: true },
}, { timestamps: true });
export const ServiceModel = mongoose.models.Service || mongoose.model<IService>("Service", ServiceSchema);
