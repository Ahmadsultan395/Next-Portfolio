"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { Profile, ProfileContextType, ProfileFormValues } from "@/types/profileTypes";
import { ProfileService } from "@/services/ProfileService";

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

interface ProfileProviderProps {
  children: ReactNode;
}

export function ProfileProvider({ children }: ProfileProviderProps) {
  const [profileData, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // ── Fetch Profile ──────────────────────────────────────────────────────────
  const fetchProfile = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await ProfileService.getProfile();
      setProfile(data);
    } catch (err: any) {
      if (!err?.message?.toLowerCase().includes("not found")) {
        setError(err?.message || "Something went wrong");
      }
      setProfile(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // ── Create Profile ─────────────────────────────────────────────────────────
  const createProfile = useCallback(async (values: ProfileFormValues) => {
    setLoading(true);
    setError(null);
    try {
      const data = await ProfileService.createProfile(values);
      setProfile(data);
    } catch (err: any) {
      setError(err?.message || "Failed to create profile");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // ── Update Profile ─────────────────────────────────────────────────────────
  const updateProfile = useCallback(async (id: string, values: ProfileFormValues) => {
    setLoading(true);
    setError(null);
    try {
      const data = await ProfileService.updateProfile(id, values);
      setProfile(data);
    } catch (err: any) {
      setError(err?.message || "Failed to update profile");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // ── Delete Profile ─────────────────────────────────────────────────────────
  const deleteProfile = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await ProfileService.deleteProfile(id);
      setProfile(null);
    } catch (err: any) {
      setError(err?.message || "Failed to delete profile");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // ── Remove Avatar ──────────────────────────────────────────────────────────
  const removeAvatar = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await ProfileService.removeAvatar(id);
      setProfile(data);
    } catch (err: any) {
      setError(err?.message || "Failed to remove avatar");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // ── Remove Resume ──────────────────────────────────────────────────────────
  const removeResume = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await ProfileService.removeResume(id);
      setProfile(data);
    } catch (err: any) {
      setError(err?.message || "Failed to remove resume");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // ── Auto-fetch on mount ────────────────────────────────────────────────────
  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const value: ProfileContextType = {
    profileData,
    loading,
    error,
    fetchProfile,
    createProfile,
    updateProfile,
    deleteProfile,
    removeAvatar,
    removeResume,
  };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
}

export function useProfile(): ProfileContextType {
  const context = useContext(ProfileContext);
  if (!context) throw new Error("useProfile must be used inside <ProfileProvider>");
  return context;
}
