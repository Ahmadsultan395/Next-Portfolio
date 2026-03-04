"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Palette, Layers, Rocket } from "lucide-react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Premium Landing Pages",
    desc: "Conversion-focused, blazing fast, jaw-dropping animated landing pages.",
    icon: Rocket,
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    title: "Next.js Web Apps",
    desc: "Full-featured SPAs with auth, dashboard, real-time features & scalability.",
    icon: Layers,
    gradient: "from-purple-500 to-pink-600",
  },
  {
    title: "Full Stack Systems",
    desc: "Complete solution — Next.js + Node + MongoDB/Firebase + Deployment.",
    icon: Rocket,
    gradient: "from-orange-500 to-red-600",
  },
  {
    title: "Cinematic UI/UX",
    desc: "GSAP-powered micro-interactions, scroll animations & premium design.",
    icon: Palette,
    gradient: "from-emerald-500 to-teal-600",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".service-card",
        { y: 100, opacity: 0.8 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        },
      );

      // Hover glow pulse
      document.querySelectorAll(".service-card").forEach((card) => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card.querySelector(".glow-bg"), {
            scale: 1.3,
            opacity: 0.8,
            duration: 0.8,
            ease: "power2.out",
          });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card.querySelector(".glow-bg"), {
            scale: 1,
            opacity: 0.8,
            duration: 1,
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-6 md:px-20 overflow-hidden bg-[var(--background)]"
    >
      {/* Epic Background Glows */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[var(--hero-image)]/20 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-purple-600/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "2s" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Killer Heading */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-white via-[var(--hero-image)] to-purple-400 bg-clip-text text-transparent leading-tight">
            What I Build
          </h2>
          <p className="mt-4 text-xl text-[var(--muted)] font-medium">
            Not just websites —{" "}
            <span className="text-[var(--hero-image)]">
              digital experiences
            </span>
          </p>
        </div>

        {/* Beast Mode Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <div key={i} className="service-card group relative h-full">
                {/* Main Card - Ultra Glass */}
                <div className="relative h-full rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 overflow-hidden transition-all duration-500 group-hover:border-white/30 group-hover:bg-white/10">
                  {/* Dynamic Gradient Glow Background */}
                  <div
                    className={`glow-bg absolute inset-0 opacity-90 scale-100 bg-gradient-to-br ${service.gradient} blur-3xl transition-all duration-1000`}
                  />

                  {/* Content */}
                  <div className="relative z-10">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} p-3 mb-6 shadow-2xl`}
                    >
                      <Icon className="w-full h-full text-white" />
                    </div>

                    <h3 className="text-2xl font-black text-white mb-3">
                      {service.title}
                    </h3>

                    <p className="text-[var(--muted)] leading-relaxed">
                      {service.desc}
                    </p>

                    {/* Bottom Accent Line */}
                    <div className="mt-8 h-1 w-16 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Corner Shine Effect */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-3xl translate-x-16 -translate-y-16 group-hover:translate-x-12 group-hover:-translate-y-12 transition-transform duration-700" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Tagline */}
        <div className="text-center mt-20">
          <p className="text-lg font-medium text-[var(--muted)]">
            Evevy porject has same these—{" "}
            <span className="text-[var(--hero-image)] font-bold">
              Perfection.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
