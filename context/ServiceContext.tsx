"use client";
import { ServiceService } from "@/services/ServiceService";
import {
  Service,
  ServiceContextType,
  ServiceFormValues,
} from "@/types/service.types";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";

const Ctx = createContext<ServiceContextType | undefined>(undefined);

export function ServiceProvider({ children }: { children: ReactNode }) {
  const [services, setServices] = useState<Service[]>([]);
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

  const fetchServices = useCallback(async () => {
    await run(async () => setServices(await ServiceService.getAll()));
  }, []);

  const createService = useCallback(async (v: ServiceFormValues) => {
    await run(async () => {
      const s = await ServiceService.create(v);
      setServices((p) => [...p, s].sort((a, b) => a.order - b.order));
    });
  }, []);

  const updateService = useCallback(
    async (id: string, v: ServiceFormValues) => {
      await run(async () => {
        const s = await ServiceService.update(id, v);
        setServices((p) => p.map((x) => (x._id === id ? s : x)));
      });
    },
    [],
  );

  const deleteService = useCallback(async (id: string) => {
    await run(async () => {
      await ServiceService.remove(id);
      setServices((p) => p.filter((x) => x._id !== id));
    });
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  return (
    <Ctx.Provider
      value={{
        services,
        loading,
        error,
        fetchServices,
        createService,
        updateService,
        deleteService,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useService(): ServiceContextType {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useService must be inside <ServiceProvider>");
  return ctx;
}
