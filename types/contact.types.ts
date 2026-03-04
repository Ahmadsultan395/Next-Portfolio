export interface Contact {
  _id: string;
  email: string;
  phone: string;
  whatsapp: string;
  location: string;
  locationNote: string;
  github: string;
  linkedin: string;
  createdAt: string;
  updatedAt: string;
}
export interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  unread: boolean;
  reply: string;
  createdAt: string;
  updatedAt: string;
}
export interface ContactFormValues {
  email: string;
  phone: string;
  whatsapp: string;
  location: string;
  locationNote: string;
  github: string;
  linkedin: string;
}
export interface ContactMessageValues {
  name: string;
  email: string;
  subject: string;
  message: string;
  unread?: boolean;
  reply?: string;
}

export type UpdateContactMessageValues = Partial<ContactMessageValues> & {
  unread?: boolean;
  reply?: string;
};
export interface ContactResponse {
  success: boolean;
  data: Contact;
}
export interface ContactMessageResponse {
  success: boolean;
  data: ContactMessage[];
}
export interface ContactMessageSingleResponse {
  success: boolean;
  data: ContactMessage;
}
export interface ContactContextType {
  contact: Contact | null;
  contactMessage: ContactMessage[] | [];
  loading: boolean;
  error: string | null;
  fetchContact: () => Promise<void>;
  fetchContactMessage?: () => Promise<void>;
  createContact: (v: ContactFormValues) => Promise<void>;
  updateContact: (id: string, v: ContactFormValues) => Promise<void>;
  deleteContact: (id: string) => Promise<void>;

  createMessageContact: (v: ContactMessageValues) => Promise<void>;
  updateContactMessage: (
    id: string,
    v: UpdateContactMessageValues,
  ) => Promise<void>;
  deleteContactMessage: (id: string) => Promise<void>;
}
