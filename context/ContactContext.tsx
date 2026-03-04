"use client";
import { ContactService } from "@/services/ContactService";
import {
  Contact,
  ContactContextType,
  ContactFormValues,
  ContactMessage,
  ContactMessageValues,
  UpdateContactMessageValues,
} from "@/types/contact.types";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";

const Ctx = createContext<ContactContextType | undefined>(undefined);

export function ContactProvider({ children }: { children: ReactNode }) {
  const [contact, setContact] = useState<Contact | null>(null);
  const [contactMessage, setContactMessage] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchContact = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setContact(await ContactService.get());
    } catch (e: any) {
      if (e?.response?.status !== 404) setError(e?.message);
      setContact(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const createContact = useCallback(async (v: ContactFormValues) => {
    setLoading(true);
    setError(null);
    try {
      setContact(await ContactService.create(v));
    } catch (e: any) {
      setError(e?.message);
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateContact = useCallback(
    async (id: string, v: ContactFormValues) => {
      setLoading(true);
      setError(null);
      try {
        setContact(await ContactService.update(id, v));
      } catch (e: any) {
        setError(e?.message);
        throw e;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const deleteContact = useCallback(async (id: string) => {
    setLoading(true);
    try {
      await ContactService.delete(id);
      setContact(null);
    } catch (e: any) {
      setError(e?.message);
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  // MessageContact
  const createMessageContact = useCallback(async (v: ContactMessageValues) => {
    setLoading(true);
    setError(null);
    try {
      const newMessage = await ContactService.createUserMessage(v);
      setContactMessage((prev) => [newMessage, ...prev]);
    } catch (e: any) {
      setError(e?.message);
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchContactMessage = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await ContactService.getAllMessage();
      console.log(res);
      setContactMessage(res);
    } catch (e: any) {
      if (e?.response?.status !== 404) setError(e?.message);
      setContactMessage([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateContactMessage = useCallback(
    async (id: string, v: UpdateContactMessageValues) => {
      try {
        const updatedMessage = await ContactService.updateMessage(id, v);
        setContactMessage((prev) =>
          prev.map((msg) => (msg._id === id ? updatedMessage : msg)),
        );
      } catch (err) {
        console.error("Failed to update message:", err);
      }
    },
    [],
  );

  const deleteContactMessage = useCallback(async (id: string) => {
    try {
      await ContactService.removeMessage(id);
      setContactMessage((prev) => prev.filter((msg) => msg._id !== id));
    } catch (err) {
      console.error("Failed to delete message:", err);
    }
  }, []);
  useEffect(() => {
    fetchContact();
    fetchContactMessage();
  }, [fetchContact, fetchContactMessage]);

  return (
    <Ctx.Provider
      value={{
        contact,
        contactMessage,
        loading,
        error,
        fetchContact,
        createContact,
        updateContact,
        deleteContact,

        createMessageContact,
        updateContactMessage,
        deleteContactMessage,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useContact(): ContactContextType {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useContact must be inside <ContactProvider>");
  return ctx;
}
