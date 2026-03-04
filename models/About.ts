import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAbout extends Document {
  journeyTitle: string;
  journeyText: string;
  whatIDoTitle: string;
  whatIDoText: string;
  beyondTitle: string;
  beyondSubtitle: string;
  skills: { label: string; percentage: number }[];
  stats: { value: string; label: string }[];
  interests: { emoji: string; title: string; description: string }[];
  funFacts: { text: string }[];
}

const AboutSchema = new Schema<IAbout>(
  {
    journeyTitle: { type: String, required: true, trim: true },
    journeyText: { type: String, required: true, trim: true, maxlength: 1000 },
    whatIDoTitle: { type: String, required: true, trim: true },
    whatIDoText: { type: String, required: true, trim: true, maxlength: 1000 },
    beyondTitle: { type: String, trim: true, default: 'Beyond The Code' },
    beyondSubtitle: { type: String, trim: true, default: '' },
    skills: {
      type: [{ label: String, percentage: Number }],
      default: [],
    },
    stats: {
      type: [{ value: String, label: String }],
      default: [],
    },
    interests: {
      type: [{ emoji: String, title: String, description: String }],
      default: [],
    },
    funFacts: {
      type: [{ text: String }],
      default: [],
    },
  },
  { timestamps: true }
);

export const About: Model<IAbout> =
  mongoose.models.About ?? mongoose.model<IAbout>('About', AboutSchema);
