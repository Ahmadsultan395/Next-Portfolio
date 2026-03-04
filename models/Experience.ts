import mongoose, { Schema, Document } from "mongoose";
export interface IExperience extends Document {
  period: string; role: string; company: string;
  description: string; current: boolean; order: number;
}
const ExperienceSchema = new Schema<IExperience>({
  period:      { type: String, required: true },
  role:        { type: String, required: true },
  company:     { type: String, required: true },
  description: { type: String, default: "" },
  current:     { type: Boolean, default: false },
  order:       { type: Number, default: 0 },
}, { timestamps: true });
export const ExperienceModel = mongoose.models.Experience || mongoose.model<IExperience>("Experience", ExperienceSchema);
