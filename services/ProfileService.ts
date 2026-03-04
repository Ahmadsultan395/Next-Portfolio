import {
  Profile,
  ProfileFormValues,
  ProfileResponse,
} from "@/types/profileTypes";
import { api } from "@/Utils/utility";

export const buildFileUrl = (filePath?: string | null): string => {
  if (!filePath) return "";
  if (filePath.startsWith("http")) return filePath;
  return `/${filePath.replace(/^\//, "")}`;
};

const toFormData = (values: ProfileFormValues): FormData => {
  const fd = new FormData();
  (
    [
      "name",
      "role",
      "email",
      "phone",
      "location",
      "bio",
      "github",
      "portfolio",
      "linkedin",
      "upwork",
    ] as (keyof ProfileFormValues)[]
  ).forEach((key) => {
    const val = values[key];
    if (val != null) fd.append(key, String(val));
  });

  (
    [
      "showOnLanding",
      "availableForFreelance",
      "acceptContactForm",
      "showSocialLinks",
    ] as (keyof ProfileFormValues)[]
  ).forEach((key) => {
    const val = values[key];
    if (val != null) fd.append(key, String(val));
  });

  // Files
  if (values.avatar instanceof File) fd.append("avatar", values.avatar);
  if (values.resume instanceof File) fd.append("resume", values.resume);

  return fd;
};

export const ProfileService = {
  getProfile: async (): Promise<Profile> => {
    const res = await api.get<ProfileResponse>("/api/profile");
    return res.data.data;
  },

  createProfile: async (values: ProfileFormValues): Promise<Profile> => {
    const res = await api.post<ProfileResponse>(
      "/api/profile",
      toFormData(values),
    );
    return res.data.data;
  },

  updateProfile: async (
    id: string,
    values: ProfileFormValues,
  ): Promise<Profile> => {
    const res = await api.patch<ProfileResponse>(
      `/api/profile/${id}`,
      toFormData(values),
    );
    return res.data.data;
  },

  deleteProfile: async (id: string): Promise<void> => {
    await api.delete(`/api/profile/${id}`);
  },

  removeAvatar: async (id: string): Promise<Profile> => {
    const res = await api.delete<ProfileResponse>(`/api/profile/${id}/avatar`);
    return res.data.data;
  },

  removeResume: async (id: string): Promise<Profile> => {
    const res = await api.delete<ProfileResponse>(`/api/profile/${id}/resume`);
    return res.data.data;
  },
};
