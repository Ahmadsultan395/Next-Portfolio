import axios from "axios";
import {
  Approach, ApproachFormValues, ApproachResponse,
  Skill, SkillFormValues, SkillListResponse, SkillResponse,
} from "@/types/skill";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export const SkillService = {
  async getAll(): Promise<Skill[]> {
    return (await api.get<SkillListResponse>("/skills")).data.data;
  },
  async getById(id: string): Promise<Skill> {
    return (await api.get<SkillResponse>(`/skills/${id}`)).data.data;
  },
  async create(v: SkillFormValues): Promise<Skill> {
    return (await api.post<SkillResponse>("/skills", v)).data.data;
  },
  async update(id: string, v: SkillFormValues): Promise<Skill> {
    return (await api.patch<SkillResponse>(`/skills/${id}`, v)).data.data;
  },
  async remove(id: string): Promise<void> {
    await api.delete(`/skills/${id}`);
  },
  async getApproach(): Promise<Approach> {
    return (await api.get<ApproachResponse>("/skills/approach")).data.data;
  },
  async createApproach(v: ApproachFormValues): Promise<Approach> {
    return (await api.post<ApproachResponse>("/skills/approach", v)).data.data;
  },
  async updateApproach(id: string, v: ApproachFormValues): Promise<Approach> {
    return (await api.patch<ApproachResponse>(`/skills/approach/${id}`, v)).data.data;
  },
  async removeApproach(id: string): Promise<void> {
    await api.delete(`/skills/approach/${id}`);
  },
};
