"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "@/Components/pages/SectionHeader";
import { Sparkles } from "lucide-react";
import { useAbout } from "@/context/AboutContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { about } = useAbout();

  useEffect(() => {
    if (!containerRef.current || !about) return;

    const ctx = gsap.context(() => {
      gsap.from(".about-heading", {
        scrollTrigger: {
          trigger: ".about-heading",
          start: "top 85%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".story-card", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(".skills-heading", {
        scrollTrigger: {
          trigger: ".skills-section",
          start: "top 85%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power2.out",
      });

      gsap.from(".skill-item", {
        scrollTrigger: {
          trigger: ".skills-section",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.2)",
      });

      gsap.fromTo(
        ".skill-bar",
        { width: "0%" },
        {
          scrollTrigger: {
            trigger: ".skills-section",
            start: "top 75%",
            toggleActions: "play none none none",
          },
          width: (_index: number, target: HTMLElement) =>
            target.getAttribute("data-level") + "%",
          duration: 1.5,
          stagger: 0.2,
          ease: "power2.out",
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, [about]);

  if (!about) return null;
  return (
    <section
      ref={containerRef}
      className="relative isolate w-full min-h-screen py-20 px-6 md:px-20 overflow-hidden"
    >
      {/* Background blobs */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-[var(--hero-image)]/10 rounded-full blur-3xl animate-pulse-slow" />
      <div
        className="absolute bottom-20 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow"
        style={{ animationDelay: "2s" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <SectionHeader
          mark="ABOUT"
          abs="Story • Skills • Working Style"
          t1="About"
          t2="Me"
          des="Passionate developer crafting digital experiences that make a difference."
          icon={Sparkles}
        />

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* ── Left: Story Cards ── */}
          <div className="story-cards space-y-6">
            {/* Journey Card */}
            <div className="story-card relative p-8 rounded-3xl bg-gradient-to-br from-[var(--card-bg)]/15 to-purple-500/5 border border-[var(--hero-image)]/20 backdrop-blur-sm hover:border-[var(--hero-image)]/40 transition-all duration-300 group shadow-[0_0_15px_var(--hero-image)]">
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-[var(--hero-image)] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-3xl">💡</span>
              </div>
              <h3 className="text-3xl font-bold text-[var(--foreground)] mb-4 mt-8">
                {about.journeyTitle}
              </h3>
              <p className="text-lg text-[var(--muted)] leading-relaxed whitespace-pre-line">
                {about.journeyText}
              </p>
            </div>

            {/* What I Do Card */}
            <div className="story-card relative p-8 rounded-3xl bg-gradient-to-br from-purple-500/5 to-[var(--card-bg)]/20 border border-purple-500/20 backdrop-blur-sm hover:border-purple-500/40 transition-all duration-300 group shadow-[0_0_15px_rgb(169,85,247)]">
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-purple-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="text-3xl font-bold text-[var(--foreground)] mb-4">
                {about.whatIDoTitle}
              </h3>
              <p className="text-lg text-[var(--muted)] leading-relaxed whitespace-pre-line">
                {about.whatIDoText}
              </p>
            </div>
          </div>

          {/* ── Right: Skills ── */}
          <div className="skills-section space-y-6">
            <h3 className="skills-heading text-3xl font-bold text-[var(--foreground)] mb-8">
              Core Skills
            </h3>

            {about.skills.map((skill, index) => (
              <div key={index} className="skill-item">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--hero-image)] to-purple-500 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {skill.label.charAt(0)}
                      </span>
                    </div>
                    <span className="text-lg font-semibold text-[var(--foreground)]">
                      {skill.label}
                    </span>
                  </div>
                  <span className="text-2xl font-bold text-[var(--hero-image)]">
                    {skill.percentage}%
                  </span>
                </div>
                <div className="relative h-3 bg-[var(--muted)]/20 rounded-full overflow-hidden">
                  <div
                    className="skill-bar absolute top-0 left-0 h-full bg-gradient-to-r from-[var(--hero-image)] to-purple-500 rounded-full"
                    data-level={skill.percentage}
                    style={{ width: "0%" }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
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
