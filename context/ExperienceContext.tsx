"use client";
import { ExperienceService } from "@/services/ExperienceService";
import {
  Experience,
  ExperienceContextType,
  ExperienceFormValues,
} from "@/types/experience.types";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";

const Ctx = createContext<ExperienceContextType | undefined>(undefined);

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  console.log(experiences);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = async (fn: () => Promise<void>) => {
    setLoading(true);
    setError(null);
    try {
      await fn();
    } catch (e: any) {
      setError(e?.response?.data?.message || e?.message || "Error");
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const fetchExperiences = useCallback(async () => {
    await run(async () => setExperiences(await ExperienceService.getAll()));
  }, []);

  const createExperience = useCallback(async (v: ExperienceFormValues) => {
    await run(async () => {
      const e = await ExperienceService.create(v);
      setExperiences((p) => [...p, e].sort((a, b) => a.order - b.order));
    });
  }, []);

  const updateExperience = useCallback(
    async (id: string, v: ExperienceFormValues) => {
      await run(async () => {
        const e = await ExperienceService.update(id, v);
        setExperiences((p) => p.map((x) => (x._id === id ? e : x)));
      });
    },
    [],
  );

  const deleteExperience = useCallback(async (id: string) => {
    await run(async () => {
      await ExperienceService.remove(id);
      setExperiences((p) => p.filter((x) => x._id !== id));
    });
  }, []);

  useEffect(() => {
    fetchExperiences();
  }, [fetchExperiences]);

  return (
    <Ctx.Provider
      value={{
        experiences,
        loading,
        error,
        fetchExperiences,
        createExperience,
        updateExperience,
        deleteExperience,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useExperience(): ExperienceContextType {
  const ctx = useContext(Ctx);
  if (!ctx)
    throw new Error("useExperience must be inside <ExperienceProvider>");
  return ctx;
}
