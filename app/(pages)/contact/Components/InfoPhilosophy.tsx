"use client";
// ✅ DYNAMIC — approach data from useSkill() context

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSkill } from "@/context/SkillContext";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function InfoPhilosophy() {
  const ref = useRef(null);
  const { approach, loading } = useSkill();

  useEffect(() => {
    if (!approach) return;

    const ctx = gsap.context(() => {
      gsap.from(".info-block", {
        opacity: 0,
        y: 20,
        stagger: 0.2,
        duration: 0.8,
        scrollTrigger: { trigger: ".info-container", start: "top 85%" },
      });
    }, ref);

    return () => ctx.revert();
  }, [approach]); // re-animate when data loads

  // ── Loading skeleton ────────────────────────────────────────────────────────
  if (loading)
    return (
      <section className="w-full py-16 px-6 md:px-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
          <div className="h-40 rounded-2xl bg-white/5 animate-pulse" />
          <div className="h-40 rounded-2xl bg-white/5 animate-pulse" />
        </div>
      </section>
    );

  // ── No approach data yet ────────────────────────────────────────────────────
  if (!approach) return null;

  return (
    <section ref={ref} className="w-full py-16 px-6 md:px-20 bg-transparent">
      <div className="max-w-7xl mx-auto info-container">
        {/* Divider */}
        <div className="w-20 h-1 bg-blue-600 mb-10 rounded-full" />

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* ── Left: Philosophy ── */}
          <div className="info-block">
            <h2 className="text-zinc-500 font-mono text-sm tracking-[0.3em] mb-4 uppercase">
              Approach
            </h2>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
              {approach.title}
            </h3>
            <p className="text-zinc-400 leading-relaxed text-lg">
              {approach.description}
            </p>
          </div>

          {/* ── Right: Workflow Steps ── */}
          <div className="info-block">
            <h2 className="text-zinc-500 font-mono text-sm tracking-[0.3em] mb-4 uppercase">
              Workflow
            </h2>
            <div className="space-y-6">
              {approach.workflow.map((step, i) => (
                <div key={i}>
                  <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                    <span className="text-blue-500 text-xs font-mono">
                      {step.step}.
                    </span>
                    {step.title}
                  </h4>
                  <p className="text-zinc-500 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom Note ── */}
        <div className="info-block mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-600 text-xs font-mono uppercase tracking-widest">
            Currently focusing on React Ecosystem & Immersive UI
          </p>
          <div className="flex gap-6">
            <div className="text-center">
              <span className="block text-white font-bold">100%</span>
              <span className="text-[10px] text-zinc-600 uppercase">
                Response Rate
              </span>
            </div>
            <div className="text-center">
              <span className="block text-white font-bold">24/7</span>
              <span className="text-[10px] text-zinc-600 uppercase">
                Support
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
