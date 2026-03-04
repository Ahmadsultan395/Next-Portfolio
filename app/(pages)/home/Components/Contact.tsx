"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles } from "lucide-react";
import InfoGrid from "./ContactInfoCard";
import ContactForm from "./ContactForm";
import SectionHeader from "@/Components/pages/SectionHeader";
import { useContact } from "@/context/ContactContext";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function ContactPage() {
  const ref = useRef<HTMLDivElement>(null);
  const { contact } = useContact();
  const CONTACT_EMAIL = contact?.email || "";
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".contact-heading", {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".contact-heading", start: "top 85%" },
      });

      gsap.from(".info-card", {
        opacity: 0,
        y: 35,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ".info-grid", start: "top 82%" },
      });

      gsap.from(".form-card", {
        opacity: 0,
        y: 45,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".form-card", start: "top 85%" },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // ignore
    }
  };

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
        {/*header*/}
        <SectionHeader
          mark="CONTACT"
          abs="Let’s build something clean & fast"
          t1="Get In"
          t2="Touch"
          des="Project discuss karna hai? UI, full-stack, API integration ya
            realtime features — message bhej do."
          icon={Sparkles}
        />

        {/* Info + Form */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Info cards */}
          <InfoGrid copyEmail={copyEmail} copied={copied} />

          {/* Right: Form */}
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

// STYLES=========
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
`}</style>;
