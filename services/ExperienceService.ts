import axios from "axios";
import { Experience, ExperienceFormValues, ExperienceResponse, ExperiencesResponse } from "@/types/experience.types";

const api = axios.create({ baseURL: "/api", withCredentials: true });

export const ExperienceService = {
  getAll: async (): Promise<Experience[]> =>
    (await api.get<ExperiencesResponse>("/experience")).data.data,
  getById: async (id: string): Promise<Experience> =>
    (await api.get<ExperienceResponse>(`/experience/${id}`)).data.data,
  create: async (v: ExperienceFormValues): Promise<Experience> =>
    (await api.post<ExperienceResponse>("/experience", v)).data.data,
  update: async (id: string, v: ExperienceFormValues): Promise<Experience> =>
    (await api.patch<ExperienceResponse>(`/experience/${id}`, v)).data.data,
  remove: async (id: string): Promise<void> => { await api.delete(`/experience/${id}`); },
};
