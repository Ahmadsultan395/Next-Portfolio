"use client";

import { Auth } from "@/services/Auth";
import { AuthContextType, LoginSession, User } from "@/types/authType";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loginSession, setLoginSession] = useState<LoginSession | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // ── Check Auth on First Load ──────────────────────────────────────────────
  useEffect(() => {
    const storedSession = localStorage.getItem("loginSession");
    const storedUser = localStorage.getItem("user");

    if (storedSession && storedUser) {
      setLoginSession(JSON.parse(storedSession));
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }

    setIsLoading(false);
  }, []);

  // ── Signup ────────────────────────────────────────────────────────────────
  const signup = async (data: Omit<User, "createdAt">): Promise<boolean> => {
    try {
      const result = await Auth.signupService(data);
      toast.success(result.message || "Signup successful 🎉");
      return true;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Signup error");
      return false;
    }
  };

  // ── Login ─────────────────────────────────────────────────────────────────
  const login = async (
    email: string,
    password: string,
    rememberMe: boolean = false,
  ): Promise<boolean> => {
    console.log(email, password);
    try {
      const result = await Auth.loginService(email, password);

      console.log(result);

      if (result.success && result.user) {
        setUser(result.user);
        setIsAuthenticated(true);

        // Session save
        const session: LoginSession = {
          email: result.user.email,
          name: result.user.name,
          loggedInAt: new Date().toISOString(),
          rememberMe,
        };
        setLoginSession(session);

        if (rememberMe) {
          localStorage.setItem("user", JSON.stringify(result.user));
          localStorage.setItem("loginSession", JSON.stringify(session));
        }

        toast.success("Login successful!", {
          description: `Welcome back, ${result.user.name}`,
        });

        return true;
      } else {
        toast.error(result.message || "Invalid credentials");
        return false;
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed");
      return false;
    }
  };

  // ── Logout ────────────────────────────────────────────────────────────────
  const logout = async () => {
    try {
      await Auth.logoutService();

      setUser(null);
      setLoginSession(null);
      setIsAuthenticated(false);

      localStorage.removeItem("user");
      localStorage.removeItem("loginSession");

      router.push("/auth/login");

      toast.success("Logged out successfully!");
    } catch (err: any) {
      toast.error(err.message || "Logout failed");
    }
  };

  // ── Forget Password ───────────────────────────────────────────────────────
  const forgetPassword = async (email: string): Promise<boolean> => {
    try {
      const res = await Auth.forgetPasswordService(email);
      toast.success(res.message);
      return true;
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to send reset link");
      return false;
    }
  };

  // ── Reset Password ────────────────────────────────────────────────────────
  const resetPassword = async (
    email: string,
    token: string,
    newPassword: string,
  ): Promise<boolean> => {
    try {
      const res = await Auth.resetPassword(email, token, newPassword);
      toast.success(res.message);
      return true;
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to reset password");
      return false;
    }
  };

  // ── Update User ───────────────────────────────────────────────────────────
  const updateUser = (updatedData: Partial<User>) => {
    if (!user) return;
    const updatedUser = { ...user, ...updatedData };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    toast.success("Profile updated successfully");
  };

  const value: AuthContextType = {
    user,
    loginSession,
    isAuthenticated,
    isLoading,
    signup,
    login,
    logout,
    forgetPassword,
    resetPassword,
    updateUser,
    checkAuth: () => {},
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
