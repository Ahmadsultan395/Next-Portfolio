"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Coffee, Globe, Sparkles } from "lucide-react";
import SectionHeader from "@/Components/pages/SectionHeader";
import { useAbout } from "@/context/AboutContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Stat card gradient colors — cycles through if more stats added
const STAT_COLORS = [
  "from-[var(--hero-image)] to-purple-500",
  "from-purple-500 to-fuchsia-500",
  "from-amber-500 to-orange-500",
  "from-cyan-500 to-blue-500",
  "from-green-500 to-emerald-500",
  "from-rose-500 to-pink-500",
];

// Stat icons — cycles through
const STAT_ICONS = [Code2, Sparkles, Coffee, Globe, Code2, Sparkles];

export default function FunFactsInterests() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeFact, setActiveFact] = useState(0);
  const { about, loading } = useAbout();

  // ── GSAP animations ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (!containerRef.current || !about) return;

    const ctx = gsap.context(() => {
      gsap.from(".stat-card", {
        scrollTrigger: { trigger: ".stats-grid", start: "top 80%" },
        opacity: 0,
        scale: 0.8,
        y: 30,
        duration: 0.7,
        ease: "back.out(1.5)",
      });
      gsap.from(".interest-card", {
        scrollTrigger: { trigger: ".interests-grid", start: "top 80%" },
        opacity: 0,
        y: 40,
        duration: 0.6,
        ease: "power2.out",
      });
      gsap.from(".fact-item", {
        scrollTrigger: { trigger: ".facts-section", start: "top 80%" },
        opacity: 0,
        x: -20,
        duration: 0.5,
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, [about]);

  // ── Auto-rotate fun facts ────────────────────────────────────────────────────
  useEffect(() => {
    if (!about?.funFacts?.length) return;
    const interval = setInterval(() => {
      setActiveFact((prev) => (prev + 1) % about.funFacts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [about]);

  // ── Loading skeleton ─────────────────────────────────────────────────────────
  if (loading) {
    return (
      <section className="relative w-full px-6 md:px-20 py-20">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-40 rounded-2xl bg-[var(--card-bg)]/20 animate-pulse border border-[var(--hero-image)]/10"
            />
          ))}
        </div>
      </section>
    );
  }

  if (!about) return null;

  const { beyondTitle, beyondSubtitle, stats, interests, funFacts } = about;

  return (
    <section
      ref={containerRef}
      className="relative w-full -mt-24 px-6 md:px-20 overflow-hidden"
    >
      {/* Background blobs */}
      <div className="absolute -top-20 right-10 w-[28rem] h-[28rem] bg-purple-500/6 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow" />
      <div
        className="absolute -bottom-20 left-10 w-[32rem] h-[32rem] bg-[var(--hero-image)]/6 dark:bg-[var(--hero-image)]/10 rounded-full blur-3xl animate-pulse-slow"
        style={{ animationDelay: "3s" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* ── Stats Section ── */}
        {stats.length > 0 && (
          <div className="mb-20">
            <SectionHeader
              t1={beyondTitle?.split(" ").slice(0, -1).join(" ") || "Beyond"}
              t2={beyondTitle?.split(" ").slice(-1)[0] || "The Code"}
              des={beyondSubtitle || "Numbers that define my journey."}
            />

            <div className="stats-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = STAT_ICONS[index % STAT_ICONS.length];
                const color = STAT_COLORS[index % STAT_COLORS.length];
                return (
                  <div
                    key={index}
                    className="stat-card group relative p-6 rounded-2xl hover:scale-105 bg-gradient-to-br from-[var(--card-bg)]/15 to-purple-500/5 border border-[var(--hero-image)]/20 backdrop-blur-sm hover:border-[var(--hero-image)]/40 transition-all duration-300 shadow-[0_0_5px_var(--hero-image)]"
                  >
                    <div className="text-center">
                      <div
                        className={`w-14 h-14 rounded-xl mx-auto mb-4 flex items-center justify-center bg-gradient-to-br ${color} shadow-lg group-hover:scale-110 transition-transform`}
                      >
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="text-4xl font-black text-[var(--hero-image)] mb-2">
                        {stat.value}
                      </div>
                      <div className="text-sm font-medium text-gray-700 dark:text-[var(--muted)]">
                        {stat.label}
                      </div>
                    </div>
                    <div
                      className={`absolute -inset-0.5 rounded-2xl bg-gradient-to-br ${color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity -z-10`}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Interests Section ── */}
        {interests.length > 0 && (
          <div className="mb-20">
            <h3 className="text-4xl font-black text-[var(--foreground)] mb-10 text-center">
              What I <span className="text-[var(--hero-image)]">Love</span>
            </h3>

            <div className="interests-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {interests.map((item, index) => (
                <div
                  key={index}
                  className="interest-card group relative p-6 rounded-2xl hover:scale-105 bg-gradient-to-br from-[var(--card-bg)]/15 to-purple-500/5 border border-[var(--hero-image)]/20 backdrop-blur-sm hover:border-[var(--hero-image)]/40 transition-all duration-300 shadow-[0_0_5px_var(--hero-image)]"
                >
                  <div className="flex items-start gap-4 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--hero-image)] to-purple-500 flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform">
                      {item.emoji}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-[var(--foreground)] mb-1">
                        {item.title}
                      </h4>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-[var(--muted)] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Fun Facts Section ── */}
        {funFacts.length > 0 && (
          <div className="facts-section relative p-8 md:p-12 rounded-3xl border backdrop-blur-sm bg-gradient-to-br from-[var(--hero-image)]/10 to-purple-500/10 dark:from-[var(--hero-image)]/5 dark:to-purple-500/5 border-[var(--hero-image)]/25 dark:border-[var(--hero-image)]/20">
            <h3 className="text-4xl font-black text-[var(--foreground)] mb-8 text-center">
              Fun <span className="text-[var(--hero-image)]">Facts</span> 🎉
            </h3>

            {/* Rotating Highlight */}
            <div className="mb-8 p-6 rounded-2xl bg-white/15 dark:bg-white/10 border border-[var(--hero-image)]/30 text-center shadow-[0_0_5px_var(--hero-image)]">
              <p className="text-xl font-semibold text-[var(--foreground)]">
                {funFacts[activeFact]?.text}
              </p>
              <div className="flex justify-center gap-2 mt-4">
                {funFacts.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveFact(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === activeFact
                        ? "bg-[var(--hero-image)] w-6"
                        : "bg-gray-400 dark:bg-gray-600 w-2"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* All Facts Grid */}
            <div className="grid sm:grid-cols-2 gap-3">
              {funFacts.map((fact, index) => (
                <div
                  key={index}
                  className={`fact-item p-4 rounded-xl transition-all duration-300 cursor-pointer ${
                    index === activeFact
                      ? "bg-white/5 dark:bg-white/15 border-2 border-[var(--hero-image)]"
                      : "bg-white/15 dark:bg-white/5 border border-gray-300/40 dark:border-white/10 shadow-[0_0_5px_var(--hero-image)]"
                  }`}
                  onClick={() => setActiveFact(index)}
                >
                  <p className="text-sm text-[var(--foreground)]">
                    {fact.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.1);
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
