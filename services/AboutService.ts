import axios from "axios";
import { About, AboutFormValues, AboutResponse } from "@/types/about";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export const AboutService = {
  async getAbout(): Promise<About> {
    const res = await api.get<AboutResponse>("/about");
    return res.data.data;
  },
  async createAbout(values: AboutFormValues): Promise<About> {
    const res = await api.post<AboutResponse>("/about", values);
    return res.data.data;
  },
  async updateAbout(id: string, values: AboutFormValues): Promise<About> {
    const res = await api.patch<AboutResponse>(`/about/${id}`, values);
    return res.data.data;
  },
  async deleteAbout(id: string): Promise<void> {
    await api.delete(`/about/${id}`);
  },
};
