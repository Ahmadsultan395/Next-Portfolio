"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowRight, ArrowLeft, CheckCircle, Lock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/Components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useSearchParams } from "next/navigation";

export default function ResetPasswordPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const email = searchParams.get("email") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { resetPassword } = useAuth();

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".auth-card", {
        opacity: 0,
        scale: 0.9,
        y: 50,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".form-element", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        delay: 0.3,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const success = await resetPassword(email, token, password);
    if (success) setIsSubmitted(true);
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden flex items-center justify-center px-6 py-20"
    >
      <div className="relative z-10 max-w-2xl w-full mx-auto">
        <div className="auth-card relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-[var(--hero-image)] to-purple-500 rounded-3xl blur-2xl opacity-20" />
          <div className="relative bg-[var(--card-bg)]/80 backdrop-blur-xl border border-[var(--hero-image)]/20 rounded-3xl p-8 md:p-12 shadow-2xl">
            {!isSubmitted ? (
              <div className="form-content">
                {/* Header */}
                <div className="form-element text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--hero-image)] to-purple-500 mb-4">
                    <Lock className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-4xl font-black text-[var(--foreground)] mb-2">
                    Reset Password
                  </h2>
                  <p className="text-[var(--muted)]">
                    Enter your new password below
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* New Password */}
                  <div className="form-element">
                    <label className="block text-sm font-semibold text-[var(--foreground)] mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="New password"
                      className="w-full pl-4 pr-4 py-4 bg-[var(--background)]/50 border-2 border-[var(--hero-image)]/20 rounded-xl text-[var(--foreground)] placeholder:text-[var(--muted)]/50 focus:border-[var(--hero-image)] focus:outline-none focus:ring-2 focus:ring-[var(--hero-image)]/20 transition-all"
                      required
                    />
                  </div>

                  {/* Confirm Password */}
                  <div className="form-element">
                    <label className="block text-sm font-semibold text-[var(--foreground)] mb-2">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      className="w-full pl-4 pr-4 py-4 bg-[var(--background)]/50 border-2 border-[var(--hero-image)]/20 rounded-xl text-[var(--foreground)] placeholder:text-[var(--muted)]/50 focus:border-[var(--hero-image)] focus:outline-none focus:ring-2 focus:ring-[var(--hero-image)]/20 transition-all"
                      required
                    />
                  </div>

                  {/* Submit */}
                  <div className="form-element">
                    <Button
                      type="submit"
                      size="xl"
                      className="w-full group relative overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Reset Password
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Button>
                  </div>

                  {/* Back to Login */}
                  <div className="form-element">
                    <Link
                      href="/auth/login"
                      className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-[var(--background)]/50 border-2 border-[var(--hero-image)]/20 rounded-xl hover:border-[var(--hero-image)] hover:bg-[var(--background)]/80 transition-all group text-[var(--foreground)] font-semibold"
                    >
                      <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                      Back to Login
                    </Link>
                  </div>
                </form>
              </div>
            ) : (
              <div className="success-content text-center space-y-6">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[var(--hero-image)] to-purple-500 mb-4 animate-bounce-slow">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>

                <div className="space-y-3">
                  <h2 className="text-4xl font-black text-[var(--foreground)]">
                    Password Reset Successful
                  </h2>
                  <p className="text-lg text-[var(--muted)] max-w-md mx-auto">
                    You can now login with your new password
                  </p>
                </div>

                <div className="space-y-4 pt-6">
                  <Link
                    href="/auth/login"
                    className="flex items-center justify-center gap-2 text-[var(--hero-image)] hover:text-purple-500 transition-colors font-semibold"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Login
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-bounce-slow {
          animation: bounce 3s infinite;
        }
      `}</style>
    </section>
  );
}
