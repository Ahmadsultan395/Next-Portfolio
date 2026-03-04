import mongoose, { Schema, Document, Model } from "mongoose";

export enum Role {
  Admin = "Admin",
  User = "User",
}

export interface IUser extends Document {
  fname: string;
  lname: string;
  email: string;
  password: string;
  role: Role;
  resetToken?: string | null;
  resetTokenExpires?: number | null;
}

const UserSchema = new Schema<IUser>(
  {
    fname: { type: String, required: true, trim: true },
    lname: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    role: { type: String, enum: Object.values(Role), default: Role.User },
    resetToken: { type: String, default: null },
    resetTokenExpires: { type: Number, default: null },
  },
  { timestamps: true },
);

export const User: Model<IUser> =
  mongoose.models.User ?? mongoose.model<IUser>("User", UserSchema);
