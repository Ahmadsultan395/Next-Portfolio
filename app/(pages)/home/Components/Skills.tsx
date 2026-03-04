"use client";
// ✅ DYNAMIC — data from useSkill() context, no static imports needed
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GitBranch } from "lucide-react";
import SectionHeader from "@/Components/pages/SectionHeader";
import { useSkill } from "@/context/SkillContext";
import PageLoader from "@/Components/common/PageLoader";
import { Button } from "@/Components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

// ── Rotating accent palette — cycles 1 2 3 4 5 1 2 3 4 5 ... ─────────────────
const ACCENTS = [
  {
    glow: "from-[var(--hero-image)]/18 via-purple-500/10 to-transparent",
    border: "border-[var(--hero-image)]/20 hover:border-[var(--hero-image)]/40",
    iconBg: "from-[var(--hero-image)] to-purple-500",
    title: "text-[var(--hero-image)]",
    chip: "border-[var(--hero-image)]/25 bg-[var(--hero-image)]/10",
    shadow: "var(--hero-image)",
  },
  {
    glow: "from-amber-400/18 via-orange-500/10 to-transparent",
    border: "border-amber-400/20 hover:border-amber-400/40",
    iconBg: "from-amber-400 to-orange-500",
    title: "text-amber-300",
    chip: "border-amber-400/25 bg-amber-400/10",
    shadow: "rgb(252 211 77)",
  },
  {
    glow: "from-purple-500/18 via-fuchsia-500/10 to-transparent",
    border: "border-purple-500/20 hover:border-purple-500/40",
    iconBg: "from-purple-500 to-fuchsia-500",
    title: "text-purple-300",
    chip: "border-purple-500/25 bg-purple-500/10",
    shadow: "rgb(196 181 253)",
  },
  {
    glow: "from-cyan-400/18 via-sky-500/10 to-transparent",
    border: "border-cyan-400/20 hover:border-cyan-400/40",
    iconBg: "from-cyan-400 to-sky-500",
    title: "text-cyan-300",
    chip: "border-cyan-400/25 bg-cyan-400/10",
    shadow: "rgb(103 232 249)",
  },
  {
    glow: "from-pink-500/18 via-rose-500/10 to-transparent",
    border: "border-pink-500/20 hover:border-pink-500/40",
    iconBg: "from-pink-500 to-rose-500",
    title: "text-pink-300",
    chip: "border-pink-500/25 bg-pink-500/10",
    shadow: "rgb(249 168 212)",
  },
];

export default function SkillsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { skills, loading } = useSkill();
  const pathname = usePathname();
  const visibleSkills = pathname === "/" ? skills.slice(0, 2) : skills;

  useEffect(() => {
    if (!ref.current || !skills.length) return;

    const ctx = gsap.context(() => {
      gsap.from(".skills-heading", {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: "power3.out",
        // scrollTrigger: { trigger: ".skills-heading", start: "top 85%" },
      });
      gsap.from(".skills-card", {
        opacity: 0,
        y: 45,
        duration: 0.9,
        ease: "power3.out",
        // scrollTrigger: { trigger: ".skills-grid", start: "top 80%" },
      });
      gsap.from(".chip", {
        opacity: 0,
        y: 16,
        duration: 0.55,
        ease: "back.out(1.6)",
        // scrollTrigger: { trigger: ".skills-grid", start: "top 70%" },
      });
    }, ref);

    return () => ctx.revert();
  }, [skills]); // re-run when data loads

  // ── Loading skeleton ──────────────────────────────────────────────────────
  if (loading) <PageLoader />;

  if (!skills.length) return null;

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
        <SectionHeader
          mark="SKILLS"
          abs="Tech Stack • Tools • Backend Basics"
          t1="My"
          t2="Skills"
          des="Modern web apps, clean UI, fast performance — aur deployment tak end to end workflow."
          icon={GitBranch}
        />

        {/* Grid */}
        <div className="skills-grid grid lg:grid-cols-2 gap-8">
          {visibleSkills?.map((cat, idx) => {
            // ── Rotate accent: index % 5 → 0,1,2,3,4,0,1,2,3,4,...
            const accent = ACCENTS[idx % ACCENTS.length];

            return (
              <div
                key={cat._id}
                className={[
                  "skills-card group relative overflow-hidden rounded-3xl p-7 md:p-8",
                  "bg-white/5 backdrop-blur-sm border transition-all duration-300",
                  accent.border,
                ].join(" ")}
                style={{ boxShadow: `0 0 10px ${accent.shadow}` }}
              >
                {/* Glow layer */}
                <div
                  className={[
                    "absolute -top-24 -right-20 w-80 h-80 rounded-full blur-3xl",
                    "bg-gradient-to-br",
                    accent.glow,
                    "opacity-70 group-hover:opacity-100 transition-opacity duration-300",
                  ].join(" ")}
                />

                <div className="relative flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex items-center gap-4">
                      {/* Icon box with emoji */}
                      <div
                        className={[
                          "w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg",
                          "bg-gradient-to-br",
                          accent.iconBg,
                        ].join(" ")}
                      >
                        <span className="text-3xl">{cat.categoryEmoji}</span>
                      </div>

                      <div>
                        <h3
                          className={[
                            "text-2xl md:text-3xl font-extrabold",
                            accent.title,
                          ].join(" ")}
                        >
                          {cat.categoryName}
                        </h3>
                        <p className="mt-1 text-[15px] text-[var(--muted)]">
                          {cat.categorySubtitle}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 text-right">
                      <div className="text-sm text-[var(--muted)]">Items</div>
                      <div className="text-2xl font-black text-[var(--foreground)]">
                        {cat.items.length}
                      </div>
                    </div>
                  </div>

                  {/* Skill chips */}
                  <div className="my-6 flex flex-wrap gap-2.5">
                    {cat.items.map((item, i) => (
                      <span
                        key={i}
                        className={[
                          "chip inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-sm",
                          "border transition-all duration-200 cursor-default",
                          "hover:-translate-y-[1px] hover:shadow-lg",
                          accent.chip,
                        ].join(" ")}
                      >
                        {item.emoji && <span>{item.emoji}</span>}
                        {item.name}
                      </span>
                    ))}
                  </div>

                  {/* Divider */}
                  <div className="mt-auto h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent" />

                  {/* Footer */}
                  <div className="mt-5 flex items-center justify-between">
                    <div className="text-sm text-[var(--muted)]">
                      Focus: {cat.focus}
                    </div>
                    <div className="text-sm font-semibold text-[var(--foreground)]">
                      {cat.badge}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {pathname === "/" && (
          <Link href="/skills" className="flex justify-center mt-10">
            <Button variant="default" size="xl" className="text-white">
              Explore
            </Button>
          </Link>
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
