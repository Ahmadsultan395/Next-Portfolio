import axios from "axios";
import {
  Contact,
  ContactFormValues,
  ContactMessage,
  ContactMessageResponse,
  ContactMessageSingleResponse,
  ContactMessageValues,
  ContactResponse,
  UpdateContactMessageValues,
} from "@/types/contact.types";

const api = axios.create({ baseURL: "/api", withCredentials: true });

export const ContactService = {
  get: async (): Promise<Contact> =>
    (await api.get<ContactResponse>("/contact")).data.data,
  create: async (v: ContactFormValues): Promise<Contact> =>
    (await api.post<ContactResponse>("/contact", v)).data.data,
  update: async (id: string, v: ContactFormValues): Promise<Contact> =>
    (await api.patch<ContactResponse>(`/contact/${id}`, v)).data.data,
  delete: async (id: string): Promise<void> => {
    await api.delete(`/contact/${id}`);
  },

  // Contact Message
  createUserMessage: async (v: ContactMessageValues): Promise<ContactMessage> =>
    (await api.post<ContactMessageSingleResponse>("/contact-message", v)).data
      .data,

  updateMessage: async (
    id: string,
    v: UpdateContactMessageValues,
  ): Promise<ContactMessage> =>
    (await api.patch<ContactMessageSingleResponse>(`/contact-message/${id}`, v))
      .data.data,

  getAllMessage: async (): Promise<ContactMessage[]> =>
    (await api.get<ContactMessageResponse>("/contact-message")).data.data ?? [],
  removeMessage: async (id: string): Promise<void> => {
    await api.delete(`/contact-message/${id}`);
  },
};
