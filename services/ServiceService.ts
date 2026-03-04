import axios from "axios";
import { Service, ServiceFormValues, ServiceResponse, ServicesResponse } from "@/types/service.types";

const api = axios.create({ baseURL: "/api", withCredentials: true });

export const ServiceService = {
  getAll: async (): Promise<Service[]> =>
    (await api.get<ServicesResponse>("/services")).data.data,
  getById: async (id: string): Promise<Service> =>
    (await api.get<ServiceResponse>(`/services/${id}`)).data.data,
  create: async (v: ServiceFormValues): Promise<Service> =>
    (await api.post<ServiceResponse>("/services", v)).data.data,
  update: async (id: string, v: ServiceFormValues): Promise<Service> =>
    (await api.patch<ServiceResponse>(`/services/${id}`, v)).data.data,
  remove: async (id: string): Promise<void> => { await api.delete(`/services/${id}`); },
};
