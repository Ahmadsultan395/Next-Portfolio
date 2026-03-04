import axios from "axios";

export const buildFileUrl = (filePath: string | null | undefined): string => {
  if (!filePath) return "";
  if (filePath.startsWith("http")) return filePath;
  return `/${filePath.replace(/^\//, "")}`;
};

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";
export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
