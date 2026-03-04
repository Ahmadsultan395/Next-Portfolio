"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Mail, Lock, User, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/Components/ui/button";
import { Formik, Form } from "formik";
import { toast } from "sonner"; // or use any toast library
import { signupValidationSchema } from "@/validation/validationSchemas";
import InputComponent from "@/Components/common/InputComponent";
import SignupBranding from "@/Components/pages/SignUpBrading";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

interface SignupFormValues {
  fname: string;
  lname: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

const features = [
  { icon: "✨", text: "Access to premium templates" },
  { icon: "🚀", text: "Advanced development tools" },
  { icon: "💡", text: "24/7 community support" },
  { icon: "🎯", text: "Regular updates & features" },
];

export default function SignupPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { signup, isLoading } = useAuth();
  const router = useRouter();

  const initialValues: SignupFormValues = {
    fname: "",
    lname: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  };

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
        stagger: 0.12,
        ease: "power2.out",
        delay: 0.3,
      });

      // Side content animation
      gsap.from(".side-content", {
        opacity: 0,
        x: 50,
        duration: 1,
        ease: "power2.out",
        delay: 0.5,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (values: SignupFormValues) => {
    try {
      const userData = {
        fname: values.fname,
        lname: values.lname,
        email: values.email,
        password: values.password,
        // createdAt: new Date().toISOString(),
      };

      await signup(userData);
      toast.success("Account created successfully!", {
        description: "Welcome to our platform!",
      });
      router.push("/auth/login");
    } catch (error) {
      toast.error("Registration failed", {
        description: "Please try again later",
      });
      console.error("Registration error:", error);
    }
  };

  if (isLoading) return <p>...Loading</p>;

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden flex items-center justify-center px-6 py-20"
    >
      {/* Background Effects */}
      <div className="absolute -top-28 -left-24 w-[28rem] h-[28rem] bg-purple-500/12 rounded-full blur-3xl animate-pulse-slow" />
      <div
        className="absolute -bottom-32 -right-28 w-[34rem] h-[34rem] bg-[var(--hero-image)]/12 rounded-full blur-3xl animate-pulse-slow"
        style={{ animationDelay: "2s" }}
      />

      <div className="relative z-10 max-w-7xl w-full mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Sign Up Form */}
          <div className="auth-card relative">
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-[var(--hero-image)] rounded-3xl blur-2xl opacity-20" />

            <div className="relative bg-[var(--card-bg)]/80 backdrop-blur-xl border border-[var(--hero-image)]/20 rounded-3xl p-8 md:p-12 shadow-2xl">
              {/* Header */}
              <div className="form-element text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-[var(--hero-image)] mb-4">
                  <User className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-4xl font-black text-[var(--foreground)] mb-2">
                  Create Account
                </h2>
                <p className="text-[var(--muted)]">
                  Join us and start your journey today
                </p>
              </div>

              {/* Formik Form */}
              <Formik
                initialValues={initialValues}
                validationSchema={signupValidationSchema}
                onSubmit={handleSubmit}
              >
                {({ values, errors, touched, handleChange, handleBlur }) => (
                  <Form className="space-y-5">
                    {/* Name Input */}
                    <InputComponent
                      label="First Name"
                      name="fname"
                      type="text"
                      placeholder="Enter First Name"
                      icon={User}
                      value={values.fname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.fname}
                      touched={touched.fname}
                    />
                    {/* Name Input */}
                    <InputComponent
                      label="Last Name"
                      name="lname"
                      type="text"
                      placeholder="Enter Last Name"
                      icon={User}
                      value={values.lname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.lname}
                      touched={touched.lname}
                    />

                    {/* Email Input */}
                    <InputComponent
                      label="Email Address"
                      name="email"
                      type="email"
                      placeholder="your.email@example.com"
                      icon={Mail}
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.email}
                      touched={touched.email}
                    />

                    {/* Password Input */}
                    <InputComponent
                      label="Password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      icon={Lock}
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.password}
                      touched={touched.password}
                      isPassword
                      showPassword={showPassword}
                      onTogglePassword={() => setShowPassword(!showPassword)}
                    />

                    {/* Confirm Password Input */}
                    <InputComponent
                      label="Confirm Password"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      icon={Lock}
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.confirmPassword}
                      touched={touched.confirmPassword}
                      isPassword
                      showPassword={showConfirmPassword}
                      onTogglePassword={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    />

                    {/* Terms & Conditions */}
                    <div className="form-element">
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          name="terms"
                          checked={values.terms}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`w-5 h-5 mt-0.5 rounded border-2 ${
                            errors.terms && touched.terms
                              ? "border-red-500/50"
                              : "border-[var(--hero-image)]/30"
                          } bg-[var(--background)]/50 checked:bg-[var(--hero-image)] checked:border-[var(--hero-image)] transition-all cursor-pointer`}
                        />
                        <span className="text-sm text-[var(--muted)] group-hover:text-[var(--foreground)] transition-colors">
                          I agree to the{" "}
                          <Link
                            href="/terms"
                            className="text-[var(--hero-image)] hover:text-purple-500 font-semibold"
                          >
                            Terms & Conditions
                          </Link>{" "}
                          and{" "}
                          <Link
                            href="/privacy"
                            className="text-[var(--hero-image)] hover:text-purple-500 font-semibold"
                          >
                            Privacy Policy
                          </Link>
                        </span>
                      </label>
                      {errors.terms && touched.terms && (
                        <p className="mt-2 text-sm text-red-500 animate-shake">
                          {errors.terms}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="form-element">
                      <Button
                        type="submit"
                        size="xl"
                        className="w-full group relative overflow-hidden"
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          Create Account
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </Button>
                    </div>

                    {/* Divider */}
                    <div className="form-element relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-[var(--hero-image)]/20" />
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-[var(--card-bg)] text-[var(--muted)]">
                          Or sign up with
                        </span>
                      </div>
                    </div>

                    {/* Social Signup */}
                    <div className="form-element grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        className="flex items-center justify-center gap-2 px-4 py-3 bg-[var(--background)]/50 border-2 border-[var(--hero-image)]/20 rounded-xl hover:border-[var(--hero-image)] hover:bg-[var(--background)]/80 transition-all group"
                      >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="currentColor"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="currentColor"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          />
                          <path
                            fill="currentColor"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          />
                        </svg>
                        <span className="text-sm font-semibold text-[var(--foreground)]">
                          Google
                        </span>
                      </button>
                      <button
                        type="button"
                        className="flex items-center justify-center gap-2 px-4 py-3 bg-[var(--background)]/50 border-2 border-[var(--hero-image)]/20 rounded-xl hover:border-[var(--hero-image)] hover:bg-[var(--background)]/80 transition-all group"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        <span className="text-sm font-semibold text-[var(--foreground)]">
                          GitHub
                        </span>
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>

              {/* Sign In Link */}
              <div className="form-element text-center mt-8 pt-6 border-t border-[var(--hero-image)]/10">
                <p className="text-[var(--muted)]">
                  Already have an account?{" "}
                  <Link
                    href="/auth/login"
                    className="font-semibold text-[var(--hero-image)] hover:text-purple-500 transition-colors"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Branding */}
          <SignupBranding
            title="Start Your"
            highlightText="Journey"
            description="Join thousands of developers creating exceptional digital experiences. Build, learn, and grow with our community."
            features={features}
          />
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
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-5px);
          }
          75% {
            transform: translateX(5px);
          }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </section>
  );
}
