import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProject extends Document {
  name: string;
  desc: string;
  emoji?: string;
  color?: string;
  status: 'live' | 'wip' | 'plan';
  category?: string;
  tech: string[];
  highlights: string[];
  liveUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  featured: boolean;
  order: number;
}

const ProjectSchema = new Schema<IProject>(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    desc: { type: String, required: true, trim: true, maxlength: 300 },
    emoji: { type: String, default: '' },
    color: { type: String, default: '' },
    status: { type: String, enum: ['live', 'wip', 'plan'], required: true },
    category: { type: String, default: '' },
    tech: { type: [String], default: [] },
    highlights: { type: [String], default: [] },
    liveUrl: { type: String, default: '' },
    githubUrl: { type: String, default: '' },
    imageUrl: { type: String, default: '' },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true }
);

export const Project: Model<IProject> =
  mongoose.models.Project ?? mongoose.model<IProject>('Project', ProjectSchema);
