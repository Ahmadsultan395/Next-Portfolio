import axios from "axios";
import { User } from "@/types/authType";

// ✅ Next.js same project ka backend — sirf /api prefix use karo
// NEXT_PUBLIC_API_URL ki zaroorat nahi agar frontend aur backend same port pe hain
const BASE_URL = "/api/auth";

const signupService = async (userData: Omit<User, "createdAt">) => {
  const response = await axios.post(`${BASE_URL}/signup`, userData);
  return response.data;
};

const loginService = async (email: string, password: string) => {
  console.log(email, password);
  const response = await axios.post(
    `${BASE_URL}/login`,
    { email, password },
    { withCredentials: true },
  );
  return response.data;
};

const logoutService = async () => {
  const response = await axios.post(
    `${BASE_URL}/logout`,
    {},
    { withCredentials: true },
  );
  return response.data;
};

const forgetPasswordService = async (email: string) => {
  const res = await axios.post(`${BASE_URL}/forget-password`, { email });
  return res.data;
};

const resetPassword = async (
  email: string,
  token: string,
  newPassword: string,
) => {
  const res = await axios.post(`${BASE_URL}/reset-password`, {
    email,
    token,
    newPassword,
  });
  return res.data;
};

export const Auth = {
  signupService,
  loginService,
  logoutService,
  forgetPasswordService,
  resetPassword,
};
