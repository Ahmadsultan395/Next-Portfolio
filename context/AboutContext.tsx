"use client";

import { AboutService } from "@/services/AboutService";
import { About, AboutContextType, AboutFormValues } from "@/types/about";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";

const AboutContext = createContext<AboutContextType | undefined>(undefined);

export function AboutProvider({ children }: { children: ReactNode }) {
  const [about, setAbout] = useState<About | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAbout = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await AboutService.getAbout();
      setAbout(data);
    } catch (err: any) {
      if (!err?.response?.status || err.response.status !== 404) {
        setError(err?.message || "Failed to fetch about");
      }
      setAbout(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const createAbout = useCallback(async (values: AboutFormValues) => {
    setLoading(true);
    setError(null);
    try {
      const data = await AboutService.createAbout(values);
      setAbout(data);
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || "Failed to create");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateAbout = useCallback(async (id: string, values: AboutFormValues) => {
    setLoading(true);
    setError(null);
    try {
      const data = await AboutService.updateAbout(id, values);
      setAbout(data);
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || "Failed to update");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteAbout = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await AboutService.deleteAbout(id);
      setAbout(null);
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || "Failed to delete");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAbout();
  }, [fetchAbout]);

  return (
    <AboutContext.Provider
      value={{ about, loading, error, fetchAbout, createAbout, updateAbout, deleteAbout }}
    >
      {children}
    </AboutContext.Provider>
  );
}

export function useAbout(): AboutContextType {
  const ctx = useContext(AboutContext);
  if (!ctx) throw new Error("useAbout must be used inside <AboutProvider>");
  return ctx;
}
