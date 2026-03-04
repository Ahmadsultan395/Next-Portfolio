"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Target, Users, Award, TrendingUp } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const achievements = [
  { icon: Target, title: "Precision", desc: "Pixel-perfect designs" },
  { icon: Users, title: "Collaboration", desc: "Team player mindset" },
  { icon: Award, title: "Excellence", desc: "Quality-driven work" },
  { icon: TrendingUp, title: "Growth", desc: "Continuous learning" },
];

export default function WhatDrivesMe() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.from(".drives-heading", {
        scrollTrigger: {
          trigger: ".drives-heading",
          start: "top 85%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
      });

      // Achievement cards animation
      gsap.from(".achievement-card", {
        scrollTrigger: {
          trigger: ".achievements-grid",
          start: "top 85%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        scale: 0.8,
        y: 30,
        duration: 0.6,
        ease: "back.out(1.5)",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-20 px-6 md:px-20 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--hero-image)]/5 rounded-full blur-3xl animate-pulse-slow" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="drives-heading text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-[var(--hero-image)] mb-4">
            What Drives Me
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-[var(--hero-image)] to-purple-500 mx-auto rounded-full" />
          <p className="text-lg md:text-xl text-[var(--muted)] mt-6 max-w-2xl mx-auto">
            Core values that guide my work and define my approach
          </p>
        </div>

        {/* Achievements Grid */}
        <div className="achievements-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {achievements.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="achievement-card group relative p-8 rounded-2xl bg-gradient-to-br from-[var(--hero-image)]/5 to-transparent border border-[var(--hero-image)]/20 hover:border-[var(--hero-image)]/60 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[var(--hero-image)]/20 shadow-[0_0_10px_var(--hero-image)]"
              >
                {/* Icon */}
                <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-gradient-to-br from-[var(--hero-image)] to-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Title */}
                <h4 className="text-xl md:text-2xl font-bold text-[var(--foreground)] text-center mb-2">
                  {item.title}
                </h4>

                {/* Description */}
                <p className="text-sm md:text-base text-[var(--muted)] text-center">
                  {item.desc}
                </p>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--hero-image)]/0 to-purple-500/0 group-hover:from-[var(--hero-image)]/10 group-hover:to-purple-500/10 transition-all duration-300 -z-10" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.3;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 0.6;
            transform: translate(-50%, -50%) scale(1.1);
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 10s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
