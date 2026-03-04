"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Mail, ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/Components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { forgetPassword } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Card entrance animation
      gsap.from(".auth-card", {
        opacity: 0,
        scale: 0.9,
        y: 50,
        duration: 1,
        ease: "power3.out",
      });

      // Form elements stagger
      gsap.from(".form-element", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        delay: 0.3,
      });

      // Side content animation
      gsap.from(".side-content", {
        opacity: 0,
        scale: 0.95,
        duration: 1,
        ease: "power2.out",
        delay: 0.4,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await forgetPassword(email);
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden flex items-center justify-center px-6 py-20"
    >
      {/* Background Effects */}
      <div className="absolute top-1/4 -right-24 w-[28rem] h-[28rem] bg-[var(--hero-image)]/12 rounded-full blur-3xl animate-pulse-slow" />
      <div
        className="absolute bottom-1/4 -left-28 w-[34rem] h-[34rem] bg-purple-500/12 rounded-full blur-3xl animate-pulse-slow"
        style={{ animationDelay: "2s" }}
      />

      <div className="relative z-10 max-w-5xl w-full mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Illustration/Info */}
          <div className="side-content hidden lg:block space-y-8">
            {/* Decorative Icon */}
            <div className="relative">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-[var(--hero-image)] to-purple-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-[var(--hero-image)]/30">
                <Mail className="w-16 h-16 text-white" />
              </div>
              {/* Floating particles */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-[var(--hero-image)]/30 rounded-full animate-bounce-slow" />
              <div
                className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-500/30 rounded-full animate-bounce-slow"
                style={{ animationDelay: "0.5s" }}
              />
            </div>

            <div className="text-center space-y-4">
              <h2 className="text-4xl font-black text-[var(--foreground)]">
                Don't Worry
              </h2>
              <p className="text-lg text-[var(--muted)] max-w-sm mx-auto leading-relaxed">
                We'll send you instructions to reset your password to your email
                address.
              </p>
            </div>

            {/* Info Cards */}
            <div className="space-y-4 pt-8">
              {[
                {
                  icon: "📧",
                  title: "Check your email",
                  desc: "We'll send a reset link",
                },
                {
                  icon: "🔐",
                  title: "Create new password",
                  desc: "Choose a strong password",
                },
                {
                  icon: "✅",
                  title: "Access your account",
                  desc: "Sign in with new password",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 bg-[var(--card-bg)]/30 backdrop-blur-sm border border-[var(--hero-image)]/10 rounded-xl"
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-[var(--hero-image)] to-purple-500 rounded-xl flex-shrink-0">
                    <span className="text-2xl">{item.icon}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--foreground)] mb-1">
                      {item.title}
                    </h4>
                    <p className="text-sm text-[var(--muted)]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="auth-card relative">
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[var(--hero-image)] to-purple-500 rounded-3xl blur-2xl opacity-20" />

            <div className="relative bg-[var(--card-bg)]/80 backdrop-blur-xl border border-[var(--hero-image)]/20 rounded-3xl p-8 md:p-12 shadow-2xl">
              {!isSubmitted ? (
                <div className="form-content">
                  {/* Header */}
                  <div className="form-element text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--hero-image)] to-purple-500 mb-4">
                      <Mail className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-4xl font-black text-[var(--foreground)] mb-2">
                      Reset Password
                    </h2>
                    <p className="text-[var(--muted)]">
                      Enter your email to receive reset instructions
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email Input */}
                    <div className="form-element">
                      <label className="block text-sm font-semibold text-[var(--foreground)] mb-2">
                        Email Address
                      </label>
                      <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--muted)] group-hover:text-[var(--hero-image)] transition-colors" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your.email@example.com"
                          className="w-full pl-12 pr-4 py-4 bg-[var(--background)]/50 border-2 border-[var(--hero-image)]/20 rounded-xl text-[var(--foreground)] placeholder:text-[var(--muted)]/50 focus:border-[var(--hero-image)] focus:outline-none focus:ring-2 focus:ring-[var(--hero-image)]/20 transition-all"
                          required
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="form-element">
                      <Button
                        type="submit"
                        size="xl"
                        className="w-full group relative overflow-hidden"
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          Send Reset Link
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

                  {/* Help Text */}
                  <div className="form-element mt-8 pt-6 border-t border-[var(--hero-image)]/10">
                    <p className="text-center text-sm text-[var(--muted)]">
                      Remember your password?{" "}
                      <Link
                        href="/auth/login"
                        className="font-semibold text-[var(--hero-image)] hover:text-purple-500 transition-colors"
                      >
                        Sign in
                      </Link>
                    </p>
                  </div>
                </div>
              ) : (
                <div className="success-content text-center space-y-6">
                  {/* Success Icon */}
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[var(--hero-image)] to-purple-500 mb-4 animate-bounce-slow">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>

                  {/* Success Message */}
                  <div className="space-y-3">
                    <h2 className="text-4xl font-black text-[var(--foreground)]">
                      Check Your Email
                    </h2>
                    <p className="text-lg text-[var(--muted)] max-w-md mx-auto">
                      We've sent password reset instructions to
                    </p>
                    <p className="text-[var(--hero-image)] font-semibold text-lg">
                      {email}
                    </p>
                  </div>

                  {/* Info Box */}
                  <div className="mt-8 p-6 bg-[var(--background)]/50 border-2 border-[var(--hero-image)]/20 rounded-xl">
                    <p className="text-sm text-[var(--muted)] leading-relaxed">
                      If you don't see the email in your inbox, please check
                      your spam folder. The link will expire in{" "}
                      <span className="text-[var(--hero-image)] font-semibold">
                        24 hours
                      </span>
                      .
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="space-y-4 pt-6">
                    <Button
                      onClick={() => setIsSubmitted(false)}
                      size="xl"
                      variant="outline"
                      className="w-full"
                    >
                      Didn't receive email? Resend
                    </Button>

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
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.35;
            transform: scale(1);
          }
          50% {
            opacity: 0.55;
            transform: scale(1.08);
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
        .animate-bounce-slow {
          animation: bounce 3s infinite;
        }
      `}</style>
    </section>
  );
}
