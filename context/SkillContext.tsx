"use client";

import { SkillService } from "@/services/SkillService";
import {
  Approach,
  ApproachFormValues,
  Skill,
  SkillContextType,
  SkillFormValues,
} from "@/types/skill";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";

const SkillContext = createContext<SkillContextType | undefined>(undefined);

export function SkillProvider({ children }: { children: ReactNode }) {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [approach, setApproach] = useState<Approach | null>(null);
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

  // ── Skills ─────────────────────────────────────────────────────────────────
  const fetchSkills = useCallback(async () => {
    await run(async () => setSkills(await SkillService.getAll()));
  }, []);

  const createSkill = useCallback(async (v: SkillFormValues) => {
    await run(async () => {
      const s = await SkillService.create(v);
      setSkills((p) => [...p, s]);
    });
  }, []);

  const updateSkill = useCallback(async (id: string, v: SkillFormValues) => {
    await run(async () => {
      const s = await SkillService.update(id, v);
      setSkills((p) => p.map((x) => (x._id === id ? s : x)));
    });
  }, []);

  const deleteSkill = useCallback(async (id: string) => {
    await run(async () => {
      await SkillService.remove(id);
      setSkills((p) => p.filter((x) => x._id !== id));
    });
  }, []);

  // ── Approach ───────────────────────────────────────────────────────────────
  const fetchApproach = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setApproach(await SkillService.getApproach());
    } catch (e: any) {
      if (e?.response?.status !== 404) setError(e?.message);
      setApproach(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const createApproach = useCallback(async (v: ApproachFormValues) => {
    await run(async () => setApproach(await SkillService.createApproach(v)));
  }, []);

  const updateApproach = useCallback(async (id: string, v: ApproachFormValues) => {
    await run(async () => setApproach(await SkillService.updateApproach(id, v)));
  }, []);

  const deleteApproach = useCallback(async (id: string) => {
    await run(async () => {
      await SkillService.removeApproach(id);
      setApproach(null);
    });
  }, []);

  useEffect(() => {
    fetchSkills();
    fetchApproach();
  }, [fetchSkills, fetchApproach]);

  return (
    <SkillContext.Provider
      value={{
        skills, approach, loading, error,
        fetchSkills, createSkill, updateSkill, deleteSkill,
        fetchApproach, createApproach, updateApproach, deleteApproach,
      }}
    >
      {children}
    </SkillContext.Provider>
  );
}

export function useSkill(): SkillContextType {
  const ctx = useContext(SkillContext);
  if (!ctx) throw new Error("useSkill must be used inside <SkillProvider>");
  return ctx;
}
