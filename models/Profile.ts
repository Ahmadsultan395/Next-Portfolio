import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProfile extends Document {
  name: string;
  role: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  avatarUrl: string;
  resumeUrl: string;
  resumeOriginalName: string;
  github: string;
  portfolio: string;
  linkedin: string;
  upwork: string;
  showOnLanding: boolean;
  availableForFreelance: boolean;
  acceptContactForm: boolean;
  showSocialLinks: boolean;
}

const ProfileSchema = new Schema<IProfile>(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, default: '' },
    location: { type: String, default: '' },
    bio: { type: String, default: '' },
    avatarUrl: { type: String, default: '' },
    resumeUrl: { type: String, default: '' },
    resumeOriginalName: { type: String, default: '' },
    github: { type: String, default: '' },
    portfolio: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    upwork: { type: String, default: '' },
    showOnLanding: { type: Boolean, default: true },
    availableForFreelance: { type: Boolean, default: true },
    acceptContactForm: { type: Boolean, default: true },
    showSocialLinks: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Profile: Model<IProfile> =
  mongoose.models.Profile ?? mongoose.model<IProfile>('Profile', ProfileSchema);
