"use client";

import { ProjectService } from "@/services/ProjectService";
import { Project, ProjectContextType, ProjectFormValues } from "@/types/project";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);
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

  const fetchProjects = useCallback(async () => {
    await run(async () => setProjects(await ProjectService.getAll()));
  }, []);

  const createProject = useCallback(async (v: ProjectFormValues) => {
    await run(async () => {
      const p = await ProjectService.create(v);
      setProjects((prev) => [p, ...prev]);
    });
  }, []);

  const updateProject = useCallback(async (id: string, v: ProjectFormValues) => {
    await run(async () => {
      const p = await ProjectService.update(id, v);
      setProjects((prev) => prev.map((x) => (x._id === id ? p : x)));
    });
  }, []);

  const deleteProject = useCallback(async (id: string) => {
    await run(async () => {
      await ProjectService.remove(id);
      setProjects((prev) => prev.filter((x) => x._id !== id));
    });
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <ProjectContext.Provider
      value={{ projects, loading, error, fetchProjects, createProject, updateProject, deleteProject }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject(): ProjectContextType {
  const ctx = useContext(ProjectContext);
  if (!ctx) throw new Error("useProject must be inside <ProjectProvider>");
  return ctx;
}
