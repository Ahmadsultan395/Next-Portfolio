"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Rocket, Check, ArrowRight } from "lucide-react";
import SectionHeader from "@/Components/pages/SectionHeader";
import { processSteps } from "@/data/data";
import { useService } from "@/context/ServiceContext";
import Link from "next/link";
import { Button } from "@/Components/ui/button";
import { usePathname } from "next/navigation";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

// ── Map DB hex color → Tailwind-compatible inline style classes ───────────────
// Since DB stores hex color (e.g. #6366f1), we use inline styles instead of
// dynamic Tailwind classes (which don't work at runtime)
function getCardStyles(color: string) {
  return {
    border: `1px solid ${color}33`,
    boxShadow: `0 0 10px ${color}44`,
    glowBg: `radial-gradient(ellipse at top right, ${color}22 0%, transparent 70%)`,
    iconBg: `linear-gradient(135deg, ${color}, ${color}99)`,
    chipBorder: `1px solid ${color}44`,
    chipBg: `${color}18`,
    chipColor: color,
  };
}

export default function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { services, loading } = useService();
  const visibleServices = pathname === "/" ? services.slice(0, 3) : services;

  useEffect(() => {
    if (!ref.current || loading) return;

    const ctx = gsap.context(() => {
      gsap.from(".services-heading", {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".services-heading", start: "top 85%" },
      });
      gsap.from(".service-card", {
        opacity: 0,
        y: 45,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: { trigger: ".services-grid", start: "top 80%" },
      });
      gsap.from(".process-step", {
        opacity: 0,
        y: 24,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: { trigger: ".process", start: "top 82%" },
      });
      gsap.from(".cta-bar", {
        opacity: 0,
        y: 24,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".cta-bar", start: "top 90%" },
      });
    }, ref);

    return () => ctx.revert();
  }, [loading]); // re-run after data loads

  return (
    <section
      ref={ref}
      className="relative w-full min-h-screen py-20 px-6 md:px-20 overflow-hidden"
    >
      {/* Background blobs */}
      <div className="absolute -top-24 -right-20 w-[28rem] h-[28rem] bg-[var(--hero-image)]/12 rounded-full blur-3xl animate-pulse-slow" />
      <div
        className="absolute -bottom-24 -left-20 w-[34rem] h-[34rem] bg-purple-500/12 rounded-full blur-3xl animate-pulse-slow"
        style={{ animationDelay: "2s" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <SectionHeader
          mark="SERVICES"
          abs="Development • Integration • Deployment"
          t1="My"
          t2="Services"
          des="Main focus: clean UI, scalable code, aur production-ready delivery."
          icon={Rocket}
        />

        {/* ── Loading skeleton ── */}
        {loading && (
          <div className="services-grid grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="rounded-3xl border border-white/10 bg-white/5"
                style={{
                  height: 280,
                  animation: "pulse-slow 1.5s ease infinite",
                }}
              />
            ))}
          </div>
        )}

        {/* ── Services Grid — DB data ── */}
        {!loading && services.length > 0 && (
          <div className="services-grid grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {visibleServices?.map((s) => {
              const styles = getCardStyles(s.color || "#6366f1");

              return (
                <article
                  key={s._id}
                  className="service-card group relative overflow-hidden rounded-3xl p-7 md:p-8 backdrop-blur-sm transition-all duration-300"
                  style={{
                    border: styles.border,
                    boxShadow: styles.boxShadow,
                    background: "rgba(255,255,255,0.04)",
                  }}
                >
                  {/* Glow effect */}
                  <div
                    className="absolute -top-24 -right-20 w-80 h-80 rounded-full blur-3xl opacity-70 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ background: styles.glowBg }}
                  />

                  <div className="relative">
                    {/* Header row */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-4">
                        {/* ✅ DB icon is emoji string — render directly */}
                        <div
                          className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg text-2xl shrink-0"
                          style={{ background: styles.iconBg }}
                        >
                          {s.icon}
                        </div>

                        <div>
                          <h3 className="text-xl md:text-2xl font-extrabold text-[var(--foreground)]">
                            {s.title}
                          </h3>
                          <p className="mt-1 text-[14px] text-[var(--muted)]">
                            {s.subtitle}
                          </p>
                        </div>
                      </div>

                      {s.badge && (
                        <span className="shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border border-white/12 bg-black/15 text-[var(--foreground)] whitespace-nowrap">
                          {s.badge}
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    {s.description && (
                      <p className="mt-4 text-sm text-[var(--muted)] leading-relaxed">
                        {s.description}
                      </p>
                    )}

                    {/* ✅ features array (was "points" in static data) */}
                    {s.features && s.features.length > 0 && (
                      <div className="mt-4 space-y-2.5">
                        {s.features.map((f, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <div className="mt-[2px] w-5 h-5 rounded-md bg-[var(--head-btn-border)]/35 border border-white/10 flex items-center justify-center shrink-0">
                              <Check className="w-3.5 h-3.5 text-[var(--hero-image)]" />
                            </div>
                            <p className="text-sm text-[var(--muted)] leading-relaxed">
                              {f}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Divider */}
                    <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent" />

                    {/* ✅ tech array (was "stack" in static data) */}
                    {s.tech && s.tech.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {s.tech.map((t, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center px-2.5 py-1.5 rounded-full text-xs transition-all duration-200 hover:-translate-y-[1px]"
                            style={{
                              border: styles.chipBorder,
                              background: styles.chipBg,
                              color: styles.chipColor,
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* CTA link */}
                    <div className="mt-6">
                      <a
                        href="/contact"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--foreground)] hover:text-[var(--hero-image)] transition"
                      >
                        Discuss your project <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Empty state */}
        {!loading && services.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <span className="text-6xl">🛠</span>
            <p className="text-[var(--muted)] text-center">
              No services added yet.
            </p>
          </div>
        )}

        {pathname === "/" && (
          <Link href="/services" className="flex justify-center mt-10">
            <Button variant="default" size="xl" className="text-white">
              Explore
            </Button>
          </Link>
        )}

        {/* ── Process Steps (static — stays as is) ── */}
        {pathname !== "/" && (
          <>
            <div className="process mt-16">
              <div className="flex items-center justify-between gap-4 flex-wrap mb-7">
                <h2 className="text-3xl md:text-4xl font-black text-[var(--foreground)]">
                  Simple{" "}
                  <span className="text-[var(--hero-image)]">Process</span>
                </h2>
                <p className="text-[var(--muted)] max-w-2xl">
                  Fast communication, clear milestones, and clean delivery.
                </p>
              </div>

              <div className="grid md:grid-cols-4 gap-6">
                {processSteps.map((st, i) => (
                  <div
                    key={i}
                    className="process-step rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 shadow-[0_0_10px_var(--hero-image)]"
                  >
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[var(--hero-image)] to-purple-500 flex items-center justify-center text-white font-black">
                      {i + 1}
                    </div>
                    <h3 className="mt-4 text-xl font-extrabold text-[var(--foreground)]">
                      {st.title}
                    </h3>
                    <p className="mt-2 text-[15px] text-[var(--muted)]">
                      {st.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── CTA Bar ── */}
            <div className="cta-bar mt-14 rounded-3xl border border-white/10 bg-gradient-to-r from-white/6 to-white/3 backdrop-blur-sm p-7 md:p-9 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_0_10px_var(--hero-image)]">
              <div>
                <h3 className="text-2xl md:text-3xl font-black text-[var(--foreground)]">
                  Ready to build something{" "}
                  <span className="text-[var(--hero-image)]">awesome</span>?
                </h3>
                <p className="mt-2 text-[var(--muted)]">
                  Share your idea — I'll suggest best stack + timeline.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href="mailto:yourmail@gmail.com"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-[var(--hero-image)] to-purple-500 text-white font-semibold shadow-lg hover:opacity-95 transition"
                >
                  Email Me <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/15 bg-[var(--head-btn-border)]/35 text-[var(--foreground)] hover:bg-[var(--head-btn-border)]/60 transition"
                >
                  Contact Page <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </>
        )}
      </div>

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
      `}</style>
    </section>
  );
}
