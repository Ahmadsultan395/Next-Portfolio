import mongoose, { Schema, Document, Model } from 'mongoose';

// ── Skill Category ────────────────────────────────────────────────────────────
export interface ISkill extends Document {
  categoryName: string;
  categoryEmoji: string;
  categorySubtitle: string;
  badge: 'Primary' | 'Support';
  focus: string;
  items: { name: string; emoji: string }[];
  order: number;
}

const SkillSchema = new Schema<ISkill>(
  {
    categoryName: { type: String, required: true, trim: true, maxlength: 80 },
    categoryEmoji: { type: String, required: true, trim: true },
    categorySubtitle: { type: String, required: true, trim: true, maxlength: 120 },
    badge: { type: String, enum: ['Primary', 'Support'], default: 'Support', required: true },
    focus: { type: String, required: true, trim: true, maxlength: 120 },
    items: { type: [{ name: String, emoji: { type: String, default: '' } }], default: [] },
    order: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true }
);

export const Skill: Model<ISkill> =
  mongoose.models.Skill ?? mongoose.model<ISkill>('Skill', SkillSchema);

// ── Approach / Workflow ───────────────────────────────────────────────────────
export interface IApproach extends Document {
  title: string;
  description: string;
  workflow: { step: string; title: string; description: string }[];
}

const ApproachSchema = new Schema<IApproach>(
  {
    title: { type: String, required: true, trim: true, maxlength: 100 },
    description: { type: String, required: true, trim: true, maxlength: 1000 },
    workflow: {
      type: [{ step: String, title: String, description: String }],
      default: [],
    },
  },
  { timestamps: true }
);

export const Approach: Model<IApproach> =
  mongoose.models.Approach ?? mongoose.model<IApproach>('Approach', ApproachSchema);
