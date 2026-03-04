export interface Experience {
  _id: string;
  period: string;
  role: string;
  company: string;
  description: string;
  current: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}
export interface ExperienceFormValues {
  period: string;
  role: string;
  company: string;
  description: string;
  current: boolean;
  order: number;
}
export interface ExperienceResponse  { success: boolean; data: Experience }
export interface ExperiencesResponse { success: boolean; data: Experience[] }
export interface ExperienceContextType {
  experiences: Experience[];
  loading: boolean;
  error: string | null;
  fetchExperiences: () => Promise<void>;
  createExperience: (v: ExperienceFormValues) => Promise<void>;
  updateExperience: (id: string, v: ExperienceFormValues) => Promise<void>;
  deleteExperience: (id: string) => Promise<void>;
}
