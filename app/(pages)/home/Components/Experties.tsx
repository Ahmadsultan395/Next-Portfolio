"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/Components/ui/button";
import { Sparkles } from "lucide-react";
import SectionHeader from "@/Components/pages/SectionHeader";
// import { experience } from "@/data/data";
import { useExperience } from "@/context/ExperienceContext";
import { Experience } from "@/types/experience.types";

gsap.registerPlugin(ScrollTrigger);

export default function ExperienceTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { experiences } = useExperience();
  console.log(experiences);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Content animations
      gsap.from(".about-content", {
        scrollTrigger: {
          trigger: ".about-content",
          start: "top 80%",
        },
        opacity: 0,
        x: -100,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });

      gsap.from(".timeline-heading", {
        scrollTrigger: {
          trigger: ".timeline-heading",
          start: "top 80%",
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".timeline-item", {
        scrollTrigger: {
          trigger: ".timeline-item",
          start: "top 85%",
        },
        opacity: 0,
        x: -50,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });

      gsap.from(".timeline-line", {
        scrollTrigger: {
          trigger: ".timeline-line",
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1,
        },
        scaleY: 0,
        transformOrigin: "top",
        ease: "none",
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
      <div className="absolute top-20 left-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow" />
      <div
        className="absolute bottom-20 right-10 w-80 h-80 bg-[var(--hero-image)]/10 rounded-full blur-3xl animate-pulse-slow"
        style={{ animationDelay: "3s" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/*header*/}
        <SectionHeader
          mark="EXPERIENCE"
          abs="Story • Skills • Working Style"
          t1="Experience"
          t2="Timeline"
          des="My professional journey and career milestones"
          icon={Sparkles}
        />

        {/* Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Line */}
          <div className="timeline-line absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[var(--hero-image)] via-purple-500 to-[var(--hero-image)] rounded-full" />

          {/* Timeline Items */}
          {experiences.map((exp: Experience, index: number) => (
            <div
              key={index}
              className={`timeline-item relative mb-16 last:mb-0 ${
                index % 2 === 0 ? "md:pr-1/2" : "md:pl-1/2 md:ml-auto"
              }`}
            >
              <div className="flex items-center gap-6 ">
                {/* Timeline Dot */}
                <div className="absolute left-8 md:left-1/2 w-8 h-8 -ml-4 rounded-full bg-gradient-to-br from-[var(--hero-image)] to-purple-500 border-4 border-[var(--background)] z-10 shadow-lg shadow-[var(--hero-image)]/100 ">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[var(--hero-image)] to-purple-500 animate-ping opacity-75" />
                </div>

                {/* Content Card */}
                <div
                  className={`ml-20 md:ml-0 ${
                    index % 2 === 0 ? "md:mr-20" : "md:ml-20"
                  } flex-1`}
                >
                  <div className="group relative p-8 rounded-2xl bg-gradient-to-br from-[var(--hero-image)]/10 to-purple-500/10 border border-[var(--hero-image)]/30 backdrop-blur-sm hover:border-[var(--hero-image)]/60 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[var(--hero-image)]/20">
                    {/* Year Badge */}
                    <div className="inline-block mb-3 px-4 py-1.5 rounded-full bg-gradient-to-r from-[var(--hero-image)] to-purple-500 text-white text-sm font-bold shadow-lg">
                      {exp.period}
                    </div>

                    {/* Role */}
                    <h4 className="text-2xl md:text-3xl font-bold text-[var(--foreground)] mb-2">
                      {exp.role}
                    </h4>

                    {/* Company */}
                    <p className="text-lg md:text-xl text-purple-500 font-bold mb-4 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-purple-500" />
                      {exp.company}
                    </p>

                    {/* Description */}
                    <p className="text-base md:text-lg text-[var(--muted)] leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Decorative Corner */}
                    <div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-br from-[var(--hero-image)]/20 to-purple-500/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="about-content text-center p-12 rounded-3xl bg-gradient-to-br from-[var(--hero-image)]/10 via-purple-500/10 to-[var(--hero-image)]/10 border border-[var(--hero-image)]/30 backdrop-blur-sm mt-10 shadow-[0_0_10px_var(--hero-image)]">
          <h3 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-4">
            Let's Build Something Amazing Together
          </h3>
          <p className="text-lg text-[var(--muted)] mb-8 max-w-2xl mx-auto">
            I'm always excited to work on new projects and collaborate with
            passionate people.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="default" size="xl">
              Download Resume
            </Button>
            <Button variant="borderButton" size="xl">
              Get In Touch
            </Button>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
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
