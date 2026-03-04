"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, ArrowRight } from "lucide-react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const pricingPlans = [
  {
    name: "Starter",
    price: "$499",
    desc: "Perfect for small projects and MVPs.",
    features: [
      "Single Page Application",
      "Responsive Design",
      "Basic SEO Setup",
      "1 Week Support",
    ],
    accent: "from-[var(--hero-image)] to-purple-500",
    border: "border-[var(--hero-image)]/20",
    glow: "bg-[var(--hero-image)]",
    isPopular: false,
  },
  {
    name: "Pro",
    price: "$999",
    desc: "Ideal for growing businesses.",
    features: [
      "Full Stack Application",
      "Advanced Animations",
      "Database Integration",
      "2 Weeks Support",
      "Deployment Included",
    ],
    accent: "from-[var(--teal)] to-[var(--accent)]",
    border: "border-[var(--teal)]/20",
    glow: "bg-[var(--teal)]",
    isPopular: true,
  },
  {
    name: "Enterprise",
    price: "$1999+",
    desc: "For complex and scalable systems.",
    features: [
      "Custom Architecture",
      "Third-party Integrations",
      "Advanced Security",
      "1 Month Support",
      "Priority Access",
    ],
    accent: "from-purple-500 to-[var(--hero-image)]",
    border: "border-purple-500/20",
    glow: "bg-purple-500",
    isPopular: false,
  },
];

export default function Pricing() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".pricing-card", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        // stagger: 0.15,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-16 px-6 md:px-20 bg-[var(--background)]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-[var(--foreground)] mb-4">
            Pricing <span className="text-[var(--hero-image)]">Plans</span>
          </h2>
          <p className="text-[var(--muted)] max-w-2xl mx-auto">
            Transparent pricing for every stage of your project.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, idx) => (
            <div
              key={idx}
              className={[
                "pricing-card group relative overflow-hidden rounded-3xl p-7 md:p-8",
                "border bg-white/5 backdrop-blur-sm transition-all duration-300",
                plan.border,
                plan.isPopular ? "scale-105 shadow-2xl" : "",
              ].join(" ")}
              style={{
                boxShadow: `0 0 10px ${plan.glow}`,
              }}
            >
              {/* Glow Effect */}
              <div
                className={[
                  "absolute -top-24 -right-20 w-80 h-80 rounded-full blur-3xl",
                  "bg-gradient-to-br",
                  plan.glow,
                  "opacity-70 group-hover:opacity-100 transition-opacity duration-300",
                ].join(" ")}
              />

              <div className="relative z-10">
                {plan.isPopular && (
                  <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold bg-[var(--hero-image)] text-black">
                    POPULAR
                  </span>
                )}

                <h3 className="text-2xl font-extrabold text-[var(--foreground)]">
                  {plan.name}
                </h3>
                <p className="mt-2 text-[var(--muted)] text-sm">{plan.desc}</p>

                <div className="mt-6 mb-6">
                  <span className="text-4xl font-black text-[var(--foreground)]">
                    {plan.price}
                  </span>
                  <span className="text-[var(--muted)]">/project</span>
                </div>

                <div className="space-y-3 mb-8">
                  {plan.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded bg-[var(--hero-image)]/20 flex items-center justify-center">
                        <Check className="w-3 h-3 text-[var(--hero-image)]" />
                      </div>
                      <p className="text-sm text-[var(--muted)]">{f}</p>
                    </div>
                  ))}
                </div>

                <a
                  href="/contact"
                  className={[
                    "inline-flex items-center justify-center w-full py-3 rounded-xl font-semibold text-white transition-all duration-300",
                    "bg-gradient-to-r",
                    plan.accent,
                    "hover:opacity-90 hover:shadow-lg",
                  ].join(" ")}
                >
                  Get Started <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
