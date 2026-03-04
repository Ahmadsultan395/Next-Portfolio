// ── Skill Badge ───────────────────────────────────────────────────────────────
export interface SkillBadge {
  name: string;
  emoji: string;
}

// ── Skill Category ────────────────────────────────────────────────────────────
export interface Skill {
  _id: string;
  categoryName: string;
  categoryEmoji: string;
  categorySubtitle: string;
  badge: 'Primary' | 'Support';
  focus: string;
  items: SkillBadge[];
  order: number;
  createdAt: string;
  updatedAt: string;
}

export type SkillFormValues = Omit<Skill, '_id' | 'createdAt' | 'updatedAt'>;

// ── Workflow Step ─────────────────────────────────────────────────────────────
export interface WorkflowStep {
  step: string;
  title: string;
  description: string;
}

// ── Approach ──────────────────────────────────────────────────────────────────
export interface Approach {
  _id: string;
  title: string;
  description: string;
  workflow: WorkflowStep[];
  createdAt: string;
  updatedAt: string;
}

export type ApproachFormValues = Omit<Approach, '_id' | 'createdAt' | 'updatedAt'>;

// ── API Responses ─────────────────────────────────────────────────────────────
export interface SkillListResponse   { success: boolean; data: Skill[] }
export interface SkillResponse       { success: boolean; data: Skill }
export interface ApproachResponse    { success: boolean; data: Approach }

// ── Context ───────────────────────────────────────────────────────────────────
export interface SkillContextType {
  skills: Skill[];
  approach: Approach | null;
  loading: boolean;
  error: string | null;
  fetchSkills: () => Promise<void>;
  createSkill: (values: SkillFormValues) => Promise<void>;
  updateSkill: (id: string, values: SkillFormValues) => Promise<void>;
  deleteSkill: (id: string) => Promise<void>;
  fetchApproach: () => Promise<void>;
  createApproach: (values: ApproachFormValues) => Promise<void>;
  updateApproach: (id: string, values: ApproachFormValues) => Promise<void>;
  deleteApproach: (id: string) => Promise<void>;
}
