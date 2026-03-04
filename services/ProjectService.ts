import axios from "axios";
import {
  Project,
  ProjectFormValues,
  ProjectListResponse,
  ProjectResponse,
} from "@/types/project";

const api = axios.create({ baseURL: "/api", withCredentials: true });

// ── FormData builder ──────────────────────────────────────────────────────────
const toFormData = (values: ProjectFormValues): FormData => {
  const fd = new FormData();

  // Simple fields
  const textFields = [
    "name",
    "desc",
    "emoji",
    "color",
    "status",
    "category",
    "liveUrl",
    "githubUrl",
    "imageUrl",
  ] as const;
  textFields.forEach((key) => {
    const val = values[key as keyof ProjectFormValues];
    if (val !== undefined && val !== null) fd.append(key, String(val));
  });

  // Booleans + numbers
  fd.append("featured", String(values.featured ?? false));
  fd.append("order", String(values.order ?? 0));

  // ✅ Arrays — each item as separate entry (same key)
  // Backend collects these into an array
  (values.tech || []).forEach((t) => fd.append("tech", t));
  (values.highlights || []).forEach((h) => fd.append("highlights", h));

  // ✅ Image — only if it's a new File (not existing string URL)
  if (values.image instanceof File) {
    fd.append("image", values.image);
  }

  return fd;
};

export const ProjectService = {
  getAll: async (): Promise<Project[]> =>
    (await api.get<ProjectListResponse>("/projects")).data.data,

  getById: async (id: string): Promise<Project> =>
    (await api.get<ProjectResponse>(`/projects/${id}`)).data.data,

  create: async (values: ProjectFormValues): Promise<Project> =>
    (
      await api.post<ProjectResponse>("/projects", toFormData(values), {
        headers: { "Content-Type": "multipart/form-data" },
      })
    ).data.data,

  update: async (id: string, values: ProjectFormValues): Promise<Project> =>
    (
      await api.patch<ProjectResponse>(`/projects/${id}`, toFormData(values), {
        headers: { "Content-Type": "multipart/form-data" },
      })
    ).data.data,

  remove: async (id: string): Promise<void> => {
    await api.delete(`/projects/${id}`);
  },
};
