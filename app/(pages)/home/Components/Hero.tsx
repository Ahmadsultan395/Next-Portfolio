"use client";
import { useEffect, useRef, useState } from "react";
import TrueFocus from "../../../../Components/TrueFocus";
import { Button } from "@/Components/ui/button";
import { useProfile } from "@/context/ProfileContext";

import {
  Github,
  Linkedin,
  MessageCircle,
  Globe,
  MapPin,
  Mail,
  Phone,
  ArrowDown,
  Loader,
} from "lucide-react";
import { buildFileUrl } from "@/services/ProfileService";
import { HeroAnimation } from "@/Components/animations/Animations";
import { fallbackRoles } from "@/data/data";
import { useAbout } from "@/context/AboutContext";
import Link from "next/link";
import { gsap } from "gsap";
import HeroSkeleton from "@/Components/skeleton/HeroSkeleton";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentRole, setCurrentRole] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { profileData, loading } = useProfile();
  const { about } = useAbout();
  const profileImage = buildFileUrl(profileData?.avatarUrl);

  const socialLinks = (
    [
      ["GitHub", profileData?.github, Github],
      ["LinkedIn", profileData?.linkedin, Linkedin],
      ["Upwork", profileData?.upwork, MessageCircle],
      ["Portfolio", profileData?.portfolio, Globe],
    ] as const
  )
    .filter(([, href]) => href)
    .map(([label, href, icon]) => ({ label, href: href!, icon }));

  const contacts = [
    { Icon: MapPin, value: profileData?.location },
    {
      Icon: Mail,
      value: profileData?.email,
      href: `mailto:${profileData?.email}`,
    },
    {
      Icon: Phone,
      value: profileData?.phone,
      href: `tel:${profileData?.phone}`,
    },
  ];

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Typing effect — uses profileData.role split by "/" or fallback
  useEffect(() => {
    const roles = profileData?.role
      ? profileData.role
          .split("/")
          .map((r: string) => r.trim())
          .filter(Boolean)
      : fallbackRoles;

    let roleIndex = 0;
    let charIndex = 0;
    let forward = true;

    const type = () => {
      const role = roles[roleIndex];
      if (forward) {
        setCurrentRole(role.slice(0, charIndex + 1));
        charIndex++;
        if (charIndex === role.length)
          setTimeout(() => (forward = false), 2000);
      } else {
        setCurrentRole(role.slice(0, charIndex - 1));
        charIndex--;
        if (charIndex === 0) {
          forward = true;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }
    };

    const interval = setInterval(type, 80);
    return () => clearInterval(interval);
  }, [profileData?.role]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(containerRef);
      const tl = gsap.timeline();

      tl.from(q(".hero-title"), {
        opacity: 0,
        y: 80,
        duration: 1,
        stagger: 0.15,
        ease: "power4.out",
      })
        .from(
          q(".hero-typing"),
          { opacity: 0, x: -40, duration: 0.6, ease: "power2.out" },
          "-=0.6",
        )
        .from(
          q(".hero-button"),
          {
            opacity: 0,
            y: 40,
            scale: 0.85,
            duration: 0.6,
            ease: "back.out(1.7)",
          },
          "-=0.4",
        )
        .from(
          q(".hero-image"),
          { opacity: 0, scale: 0.5, duration: 1, ease: "power3.out" },
          "-=0.8",
        );

      gsap.to(q(".hero-image"), {
        y: -20,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      gsap.to(q(".glow-ring"), {
        scale: 1.2,
        opacity: 0,
        duration: 2,
        repeat: -1,
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert(); // ✅ proper cleanup
  }, []);

  // if (loading) return <HeroSkeleton />;
  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden py-20 px-6 md:px-20 flex items-center"
    >
      {/* Background blobs */}
      <div className="absolute -top-28 -right-24 w-[28rem] h-[28rem] bg-[var(--hero-image)]/12 rounded-full blur-3xl animate-pulse-slow" />
      <div
        className="absolute -bottom-32 -left-28 w-[34rem] h-[34rem] bg-purple-500/12 rounded-full blur-3xl animate-pulse-slow"
        style={{ animationDelay: "2s" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid xl:grid-cols-2 gap-12 items-center">
          {/* ── LEFT: Text Content ─────────────────────── */}
          <div
            className="relative py-5 w-full flex flex-col items-start text-left space-y-6"
            style={{
              transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
              transition: "transform 0.3s ease-out",
            }}
          >
            {/* Greeting */}
            <div className="hero-title flex items-center gap-3">
              <span className="text-2xl md:text-3xl animate-wave">👋</span>
              <span className="text-xl md:text-2xl font-medium text-[var(--muted)]">
                Hello, I'm
              </span>
            </div>

            {/* Name */}
            <h1 className="hero-title text-5xl md:text-7xl font-black leading-tight text-[var(--hero-image)]">
              {profileData?.name}
            </h1>

            {/* TrueFocus role */}
            <div className="hero-title">
              <TrueFocus
                sentence={profileData?.role}
                manualMode={false}
                blurAmount={5}
                borderColor="var(--hero-image)"
                glowColor="var(--hero-image)"
                animationDuration={0.5}
                pauseBetweenAnimations={1}
              />
            </div>

            {/* Typing Roles */}
            <div className="hero-typing relative">
              <p className="text-2xl md:text-3xl font-bold text-[var(--hero-image)] min-h-[40px] flex items-center">
                <span className="relative">
                  {currentRole}
                  <span className="blinking-cursor ml-1">|</span>
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[var(--hero-image)] to-transparent rounded-full" />
                </span>
              </p>
            </div>

            {profileData?.bio && (
              <div
                className="hero-title text-base md:text-lg text-[var(--muted)] max-w-xl leading-relaxed prose prose-invert prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: profileData.bio }}
              />
            )}

            <div className="hero-title flex flex-wrap gap-4 text-sm text-[var(--muted)]">
              {contacts
                .filter((c) => c.value)
                .map(({ Icon, value, href }, idx) =>
                  href ? (
                    <a
                      key={idx}
                      href={href}
                      className="flex items-center gap-1.5 hover:text-[var(--hero-image)] transition-colors"
                    >
                      <Icon className="w-4 h-4 text-[var(--hero-image)]" />
                      {value}
                    </a>
                  ) : (
                    <span key={idx} className="flex items-center gap-1.5">
                      <Icon className="w-4 h-4 text-[var(--hero-image)]" />
                      {value}
                    </span>
                  ),
                )}
            </div>

            <Link
              href="/projects"
              className="hero-title flex flex-wrap gap-4 pt-2"
            >
              <Button variant="default" size="xl">
                View Portfolio
              </Button>
            </Link>

            {/* Social Icons + Download CV — same row */}
            <div className="hero-title flex items-center gap-3 flex-wrap">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="group w-12 h-12 rounded-2xl border border-[var(--hero-image)]/20 bg-[var(--hero-image)]/5 flex items-center justify-center text-[var(--muted)] hover:text-[var(--hero-image)] hover:border-[var(--hero-image)]/60 hover:bg-[var(--hero-image)]/15 hover:scale-110 hover:shadow-[0_0_10px_1px_var(--hero-image)] transition-all duration-300"
                >
                  {" "}
                  {label === "Upwork" ? "Up" : <Icon className="w-5 h-5" />}
                </a>
              ))}

              {/* Divider */}
              {socialLinks.length > 0 && profileData?.resumeUrl && (
                <div className="w-px h-8 bg-[var(--hero-image)]/20  shadow-[0_0_10px_1px_var(--hero-image)]  mx-1" />
              )}

              {/* Download CV */}
              {profileData?.resumeUrl && (
                <a
                  href={buildFileUrl(profileData.resumeUrl)}
                  download={profileData.resumeOriginalName ?? "resume.pdf"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-4 py-2.5 rounded-2xl border border-[var(--hero-image)]/20 bg-[var(--hero-image)]/5 text-[var(--muted)] hover:text-[var(--hero-image)] hover:border-[var(--hero-image)]/60 hover:bg-[var(--hero-image)]/15 hover:scale-105 hover:shadow-[0_0_10px_1px_var(--hero-image)]  transition-all duration-300 text-sm font-medium"
                >
                  <span>Download CV</span>
                  <div className="w-5 h-5 rounded-full border border-current flex items-center justify-center group-hover:animate-bounce">
                    <ArrowDown className="w-3 h-3" />
                  </div>
                </a>
              )}
            </div>

            {/* Stats */}
            <div className="hero-title flex flex-wrap gap-8 pt-4">
              {about?.stats.map(
                (stat: { value: string; label: string }, index: number) => (
                  <div key={index} className="text-left">
                    <div className="text-3xl font-bold text-[var(--hero-image)]">
                      {stat.value}
                    </div>
                    <div className="text-sm text-[var(--muted)]">
                      {stat.label}
                    </div>
                  </div>
                ),
              )}
            </div>

            {/* Availability badge */}
            {profileData?.availableForFreelance && (
              <div className="hero-title flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/30 bg-green-500/10 w-fit">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm text-green-400 font-medium">
                  Available for Freelance
                </span>
              </div>
            )}
          </div>

          {/* ── RIGHT: Image Section ───────────────────── */}
          <div
            className="relative w-full flex justify-center xl:justify-end mt-10 xl:mt-0"
            style={{
              transform: `translate(${mousePosition.x * -0.3}px, ${mousePosition.y * -0.3}px)`,
              transition: "transform 0.3s ease-out",
            }}
          >
            <div className="relative">
              {/* Glow Rings */}
              <div className="glow-ring absolute inset-0 rounded-full bg-[var(--hero-image)] opacity-30 blur-3xl" />
              <div
                className="glow-ring absolute inset-0 rounded-full bg-purple-500 opacity-20 blur-3xl"
                style={{ animationDelay: "1s" }}
              />

              {/* Image Container */}
              {/* animation hero-image */}
              <div className=" relative w-72 h-72 md:w-[400px] md:h-[400px] xl:w-[450px] xl:h-[450px]">
                {/* Rotating Border */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[var(--hero-image)] via-[var(--teal)] to-[var(--hero-image)] animate-spin-slow p-1">
                  <div className="w-full h-full rounded-full bg-[var(--background)]" />
                </div>

                {/* Profile Image */}
                <div className="absolute inset-2 rounded-full overflow-hidden shadow-2xl shadow-[var(--hero-image)]/40 border-4 border-[var(--hero-image)]/30">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#00585e]/20 to-transparent z-10" />
                  {profileImage ? (
                    <img
                      src={profileImage && profileImage}
                      alt={`${profileData?.name ?? "Profile"} - ${profileData?.role ?? ""}`}
                      className="object-cover object-top scale-110 hover:scale-125 transition-transform duration-700 w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full flex justify-center items-center">
                      <Loader className="text-[var-(--hero-image)] w-28 h-28 animate-spin" />
                    </div>
                  )}
                </div>

                {/* Floating Emojis */}
                <div className="absolute -top-6 -right-6 w-20 h-20 bg-[var(--hero-image)] rounded-2xl flex items-center justify-center shadow-lg animate-bounce-slow">
                  <span className="text-3xl">⚡</span>
                </div>
                <div
                  className="absolute -bottom-6 -left-6 w-20 h-20 bg-[var(--reverse-image)] rounded-2xl flex items-center justify-center shadow-lg animate-bounce-slow"
                  style={{ animationDelay: "0.5s" }}
                >
                  <span className="text-3xl">🚀</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce z-10">
        <span className="text-sm text-[var(--muted)]">Scroll Down</span>
        <div className="w-6 h-10 border-2 border-[var(--hero-image)] rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-[var(--hero-image)] rounded-full animate-scroll" />
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        .blinking-cursor {
          display: inline-block;
          animation: blink 0.7s steps(2, start) infinite;
        }
        @keyframes blink {
          0%,
          50% {
            opacity: 1;
          }
          50.01%,
          100% {
            opacity: 0;
          }
        }
        .animate-wave {
          animation: wave 2.5s infinite;
          transform-origin: 70% 70%;
          display: inline-block;
        }
        @keyframes wave {
          0%,
          100% {
            transform: rotate(0deg);
          }
          10%,
          30% {
            transform: rotate(14deg);
          }
          20% {
            transform: rotate(-8deg);
          }
          40% {
            transform: rotate(-4deg);
          }
          50% {
            transform: rotate(10deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-bounce-slow {
          animation: bounce 3s infinite;
        }
        .animate-scroll {
          animation: scroll 2s infinite;
        }
        @keyframes scroll {
          0% {
            transform: translateY(0);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(12px);
            opacity: 0;
          }
        }
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
