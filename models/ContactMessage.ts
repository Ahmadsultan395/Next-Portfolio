import mongoose, { Schema, Document } from "mongoose";

export interface IContact extends Document {
  name: string;
  email: string;
  subject?: string;
  message: string;
  reply: string;
  unread?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const ContactMessageSchema = new Schema<IContact>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    subject: { type: String, default: "", trim: true },
    message: { type: String, required: true, trim: true },
    unread: { type: Boolean, default: true },
    reply: { type: String, default: "", trim: true },
  },
  { timestamps: true },
);

export const ContactMessageModel =
  mongoose.models.ContactMessage ||
  mongoose.model<IContact>("ContactMessage", ContactMessageSchema);
