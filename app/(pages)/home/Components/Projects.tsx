"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import {
  ExternalLink,
  Github,
  Filter,
  Sparkles,
  Layers,
  Code2,
  Rocket,
} from "lucide-react";
import SectionHeader from "@/Components/pages/SectionHeader";
import { cn } from "@/lib/utils";
import { useProject } from "@/context/ProjectContext";
import { buildFileUrl } from "@/services/ProfileService";
import PageLoader from "@/Components/common/PageLoader";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/Components/ui/button";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const FILTERS = [
  "All",
  "Frontend",
  "Full Stack",
  "UI",
  "Realtime",
  "E-commerce",
] as const;
type FilterType = (typeof FILTERS)[number];

const statusConfig: Record<string, { label: string; color: string }> = {
  live: {
    label: "Live",
    color: "bg-green-500/20 text-green-400 border border-green-500/30",
  },
  wip: {
    label: "In Progress",
    color: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
  },
  plan: {
    label: "Planned",
    color: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
  },
};

export default function ProjectSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<FilterType>("All");
  const { projects, loading, error } = useProject();
  const pathname = usePathname();

  const filtered = useMemo(() => {
    if (active === "All") return projects;
    return projects.filter((p) => p.category === active);
  }, [active, projects]);

  const visibleProjects = pathname === "/" ? filtered.slice(0, 3) : filtered;

  // scroll animations
  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".projects-heading", {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".projects-heading", start: "top 85%" },
      });
      gsap.from(".filter-bar", {
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: { trigger: ".filter-bar", start: "top 85%" },
      });
      gsap.from(".project-card", {
        opacity: 0,
        y: 45,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: { trigger: ".projects-grid", start: "top 80%" },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // re-animate on filter change
  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-card",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
      );
    }, containerRef);
    return () => ctx.revert();
  }, [active]);

  if (loading) <PageLoader />;

  if (error) {
    return (
      <section className="relative w-full min-h-screen py-20 px-6 md:px-20 flex items-center justify-center">
        <p className="text-red-400 text-sm">Failed to load projects: {error}</p>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen py-20 px-6 md:px-20 overflow-hidden"
    >
      {/* bg blobs */}
      <div className="absolute -top-24 -right-20 w-[28rem] h-[28rem] bg-[var(--hero-image)]/12 rounded-full blur-3xl animate-pulse-slow" />
      <div
        className="absolute -bottom-24 -left-20 w-[34rem] h-[34rem] bg-purple-500/12 rounded-full blur-3xl animate-pulse-slow"
        style={{ animationDelay: "2s" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <SectionHeader
          mark="PROJECTS"
          abs="Selected Work"
          t1="My"
          t2="Projects"
          des="Har project me focus: clean UI, strong architecture, aur production ready output."
          icon={Sparkles}
        />

        {/* filter bar */}
        <div className="filter-bar mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-[var(--muted)]">
            <Filter className="w-4 h-4" />
            <span className="text-sm">Filter by category</span>
          </div>
          <div className="flex flex-wrap justify-center md:justify-end gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm border transition-all duration-200 hover:-translate-y-[1px] hover:shadow-lg",
                  active === f
                    ? "border-[var(--hero-image)] bg-[var(--hero-image)] text-[var(--foreground)]"
                    : "border-[var(--head-btn-border)] bg-white/5 text-[var(--muted)] hover:bg-white/8",
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* empty state */}
        {projects?.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <span className="text-6xl">🚀</span>
            <p className="text-[var(--muted)] text-center">
              No projects in{" "}
              <strong className="text-[var(--foreground)]">{active}</strong>{" "}
              yet.
            </p>
          </div>
        )}

        {/* grid */}
        <div className="projects-grid grid lg:grid-cols-2 gap-8">
          {visibleProjects.map((p) => {
            // DB uses imageUrl — fallback to image field for safety
            const imgSrc = buildFileUrl(p.imageUrl);
            const status = statusConfig[p.status] ?? statusConfig.plan;

            return (
              <article
                key={p._id}
                className={cn(
                  "project-card group relative overflow-hidden rounded-3xl",
                  "border border-white/10 bg-white/10 backdrop-blur-sm shadow-[0_0_10px_var(--hero-image)]",
                  "transition-all duration-300 hover:border-white/20",
                  p.featured && "lg:col-span-2",
                )}
              >
                {/* card glow */}
                <div className="absolute -top-24 -right-20 w-80 h-80 rounded-full blur-3xl pointer-events-none bg-gradient-to-br from-[var(--hero-image)]/18 via-purple-500/10 to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-300" />

                <div className={cn("relative", p.featured ? "md:flex" : "")}>
                  {/* ── Image ── */}
                  <div
                    className={cn(
                      "relative overflow-hidden",
                      p.featured ? "md:w-[46%] h-64 md:h-96" : "h-64",
                    )}
                  >
                    {imgSrc ? (
                      <Image
                        src={imgSrc}
                        alt={p.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        priority={p.featured}
                      />
                    ) : (
                      <div
                        className="absolute inset-0 flex items-center justify-center text-8xl"
                        style={{
                          background: (p as any).color
                            ? `${(p as any).color}22`
                            : "rgba(255,255,255,0.04)",
                        }}
                      >
                        {(p as any).emoji || "🚀"}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                    {/* category badge */}
                    <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/15 bg-black/30 backdrop-blur-sm">
                      <Layers className="w-3.5 h-3.5 text-[var(--hero-image)]" />
                      <span className="text-xs text-white/90 font-medium">
                        {p.category || "Project"}
                      </span>
                    </div>

                    {/* status badge */}
                    <div
                      className={cn(
                        "absolute top-4 right-4 px-2.5 py-1 rounded-full text-xs font-semibold",
                        status.color,
                      )}
                    >
                      {status.label}
                    </div>

                    {/* featured badge */}
                    {p.featured && (
                      <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full bg-[var(--hero-image)] text-white text-xs font-bold shadow-lg">
                        Featured
                      </div>
                    )}
                  </div>

                  {/* ── Content ── */}
                  <div
                    className={cn(
                      "p-7 md:p-8 flex flex-col",
                      p.featured ? "md:w-[54%]" : "",
                    )}
                  >
                    {/* title */}
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-xl md:text-2xl font-extrabold text-[var(--foreground)] leading-tight">
                        {(p as any).emoji && (
                          <span className="mr-2">{(p as any).emoji}</span>
                        )}
                        {p.name}
                      </h3>
                      {p.tech && p.tech.length > 0 && (
                        <div className="hidden md:flex items-center gap-1.5 text-[var(--muted)] shrink-0">
                          <Code2 className="w-3.5 h-3.5" />
                          <span className="text-xs">{p.tech.length} tech</span>
                        </div>
                      )}
                    </div>

                    {/* desc */}
                    <p className="mt-3 text-sm md:text-[15px] text-[var(--muted)] leading-relaxed">
                      {p.desc}
                    </p>

                    {/* tech tags */}
                    {p.tech && p.tech.length > 0 && (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {p.tech.map((t, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center px-3 py-1.5 rounded-full text-xs border border-white/10 bg-[var(--head-btn-border)]/30 text-[var(--foreground)]/80 group-hover:border-white/15 transition-colors"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* highlights */}
                    {p.highlights && p.highlights.length > 0 && (
                      <div className="mt-5 grid sm:grid-cols-3 gap-2">
                        {p.highlights.slice(0, 3).map((h, i) => (
                          <div
                            key={i}
                            className="rounded-xl border border-white/10 bg-black/15 px-3 py-2.5"
                          >
                            <div className="flex items-center gap-2">
                              <Rocket className="w-3.5 h-3.5 text-[var(--hero-image)] shrink-0" />
                              <span className="text-xs text-[var(--foreground)]/90 leading-snug">
                                {h}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex-1" />

                    {/* action buttons */}
                    <div className="mt-6 flex flex-wrap gap-3">
                      {p.liveUrl && (
                        <a
                          href={p.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm bg-gradient-to-r from-[var(--hero-image)] to-purple-500 text-white font-semibold shadow-lg hover:opacity-90 hover:-translate-y-[1px] transition-all"
                        >
                          Live Demo <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {p.githubUrl && (
                        <a
                          href={p.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm border border-white/15 bg-white/5 text-[var(--foreground)] hover:bg-white/10 hover:-translate-y-[1px] transition-all"
                        >
                          GitHub <Github className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {!p.liveUrl && !p.githubUrl && (
                        <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs border border-white/10 bg-white/5 text-[var(--muted)]">
                          Coming Soon 🔒
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {pathname === "/" && (
          <Link href="/projects" className="flex justify-center mt-10">
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
