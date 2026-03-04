// ─── About Types ──────────────────────────────────────────────────────────────

export interface Skill {
  label: string;
  percentage: number;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Interest {
  emoji: string;
  title: string;
  description: string;
}

export interface FunFact {
  text: string;
}

export interface About {
  _id: string;
  journeyTitle: string;
  journeyText: string;
  whatIDoTitle: string;
  whatIDoText: string;
  beyondTitle: string;
  beyondSubtitle: string;
  skills: Skill[];
  stats: Stat[];
  interests: Interest[];
  funFacts: FunFact[];
  createdAt: string;
  updatedAt: string;
}

// ─── Form Values ──────────────────────────────────────────────────────────────

export type AboutFormValues = Omit<About, '_id' | 'createdAt' | 'updatedAt'>;

// ─── API Response ─────────────────────────────────────────────────────────────

export interface AboutResponse {
  success: boolean;
  data: About;
}

// ─── Context ──────────────────────────────────────────────────────────────────

export interface AboutContextType {
  about: About | null;
  loading: boolean;
  error: string | null;
  fetchAbout: () => Promise<void>;
  createAbout: (values: AboutFormValues) => Promise<void>;
  updateAbout: (id: string, values: AboutFormValues) => Promise<void>;
  deleteAbout: (id: string) => Promise<void>;
}
