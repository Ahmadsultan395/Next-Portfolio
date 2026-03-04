"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Clock, Zap, CheckCircle, TrendingUp } from "lucide-react";

export default function TimeEfficiencyBadge() {
  const containerRef = useRef<any | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(containerRef.current.children, {
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full px-6 md:px-16 py-14 relative">
      {/* Divider Lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>

      <div className="max-w-3xl mx-auto text-center space-y-6">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-lg">
            <Clock className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          Fast Turnaround,{" "}
          <span className="text-[var(--hero-image)]">Zero Compromise</span>
        </h2>

        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-4 text-sm">
          {/* Avg Delivery */}
          <div className="p-4 rounded-xl bg-gray-900/60 border border-gray-700 hover:border-yellow-500/50 transition">
            <Zap className="w-5 h-5 text-yellow-400 mx-auto mb-2" />
            <div className="font-black text-white">~2 Weeks</div>
            <div className="text-gray-400">Avg. Delivery Time</div>
          </div>

          {/* On-Time */}
          <div className="p-4 rounded-xl bg-gray-900/60 border border-gray-700 hover:border-green-500/50 transition">
            <CheckCircle className="w-5 h-5 text-green-400 mx-auto mb-2" />
            <div className="font-black text-white">95%</div>
            <div className="text-gray-400">On-Time Projects</div>
          </div>

          {/* Speed Improvement */}
          <div className="p-4 rounded-xl bg-gray-900/60 border border-gray-700 hover:border-purple-500/50 transition">
            <TrendingUp className="w-5 h-5 text-[var(--hero-image)] mx-auto mb-2" />
            <div className="font-black text-white">60%+</div>
            <div className="text-gray-400">Faster Than Average</div>
          </div>
        </div>

        {/* Micro Copy */}
        <p className="text-gray-400 text-sm italic max-w-xl mx-auto">
          Small teams, tight deadlines? Main code se pehle plan karta hoon —
          taki har milestone on time ho.
        </p>
      </div>
    </section>
  );
}
