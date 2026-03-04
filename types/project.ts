// ── Project ───────────────────────────────────────────────────────────────────
export type ProjectStatus = "live" | "wip" | "plan";
export type ProjectCategory =
  | "Frontend"
  | "Full Stack"
  | "UI"
  | "Realtime"
  | "E-commerce"
  | "Other";

export interface Project {
  _id: string;
  name: string;
  desc: string;
  emoji: string;
  color: string;
  status: ProjectStatus;
  category: ProjectCategory | string;
  tech: string[];
  highlights: string[];
  image: File | string;
  imageUrl: string;
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export type ProjectFormValues = Omit<
  Project,
  "_id" | "createdAt" | "updatedAt"
>;

// ── API Responses ─────────────────────────────────────────────────────────────
export interface ProjectListResponse {
  success: boolean;
  data: Project[];
}
export interface ProjectResponse {
  success: boolean;
  data: Project;
}

// ── Context ───────────────────────────────────────────────────────────────────
export interface ProjectContextType {
  projects: Project[];
  loading: boolean;
  error: string | null;
  fetchProjects: () => Promise<void>;
  createProject: (values: ProjectFormValues) => Promise<void>;
  updateProject: (id: string, values: ProjectFormValues) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
}

// ── Filter options ────────────────────────────────────────────────────────────
export type StatusFilter = "all" | ProjectStatus;
export type CategoryFilter = "all" | ProjectCategory | string;
