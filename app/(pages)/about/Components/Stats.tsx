"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Stats({ skills }: { skills: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".skill-card", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        // stagger: 0.1,
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="skills-section">
      <h3 className="skills-heading text-3xl font-bold text-[var(--foreground)] mb-8">
        Core Skills
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skills.map((skill, index) => {
          const Icon = skill.icon;
          return (
            <div
              key={index}
              className="skill-card group relative p-5 rounded-2xl bg-gradient-to-br from-[var(--card-bg)]/10 to-purple-500/5 border border-[var(--neutral-gray)]/30 hover:border-[var(--hero-image)]/50 transition-all duration-300 overflow-hidden"
            >
              {/* Background Glow on Hover */}
              <div className="absolute inset-0 bg-[var(--hero-image)] opacity-0 group-hover:opacity-5 transition-opacity duration-300" />

              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--hero-image)] to-purple-500 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[var(--foreground)] group-hover:text-[var(--hero-image)] transition-colors">
                      {skill.name}
                    </h4>
                    <div className="w-full max-w-[150px] h-1.5 bg-[var(--muted)]/20 rounded-full mt-2 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[var(--hero-image)] to-purple-500 rounded-full"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                </div>
                <span className="text-xl font-bold text-[var(--hero-image)]">
                  {skill.level}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
