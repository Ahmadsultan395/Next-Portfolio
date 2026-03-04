"use client";

import Link from "next/link";
import { useCallback } from "react";
import {
  ArrowUp,
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Sparkles,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useContact } from "@/context/ContactContext";
import { useProfile } from "@/context/ProfileContext";
import Image from "next/image";
import { buildFileUrl } from "@/Utils/utility";

export default function Footer() {
  const year = new Date().getFullYear();
  const pathname = usePathname();
  const { contact } = useContact();
  const { profileData } = useProfile();
  console.log(contact);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Data
  // const profileData?.name = "Muhammad Ahmad";
  // const profileData?.role = "Full Stack Developer";
  // const profileData?.email = "yourmail@gmail.com";
  // const profileData?.phone = "+92 300 0000000";
  // const profileData?.location = "Pakistan";
  // const profileData?.github = "https://github.com/your-username";
  // const profileData?.linkedin = "https://linkedin.com/in/your-username";

  if (pathname.startsWith("/auth") || pathname.startsWith("/dashboard")) return;
  return (
    <footer className="relative overflow-hidden">
      {/* Top divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent" />

      {/* Background glow blobs */}
      <div className="pointer-events-none absolute -top-40 right-[-140px] w-[34rem] h-[34rem] rounded-full blur-3xl bg-[var(--hero-image)]/10" />
      <div className="pointer-events-none absolute -bottom-48 left-[-160px] w-[40rem] h-[40rem] rounded-full blur-3xl bg-purple-500/10" />

      {/* IMPORTANT: same padding as your sections */}
      <div className="relative py-16 px-6 md:px-20">
        {/* same width wrapper as other pages */}
        <div className="max-w-7xl mx-auto w-full">
          {/* Top CTA strip */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-7 md:p-9 shadow-[0_0_10px_var(--hero-image)]">
            <div className="absolute -top-20 -right-24 w-72 h-72 rounded-full blur-3xl bg-gradient-to-br from-[var(--hero-image)]/18 via-purple-500/10 to-transparent" />
            <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-white/10 bg-black/10">
                  <Sparkles className="w-4 h-4 text-[var(--hero-image)]" />
                  <span className="text-sm text-[var(--muted)]">
                    Available for freelance / remote work
                  </span>
                </div>

                <h3 className="mt-4 text-2xl md:text-3xl font-black text-[var(--foreground)]">
                  Let’s build something{" "}
                  <span className="text-[var(--hero-image)]">clean</span> &{" "}
                  <span className="text-[var(--hero-image)]">fast</span>
                </h3>
                <p className="mt-2 text-[15px] text-[var(--muted)] max-w-2xl">
                  UI, full-stack, API integrations, firebase, realtime — project
                  detail bhejo, main best approach suggest kar dunga.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[var(--hero-image)] to-purple-500 text-white font-semibold shadow-lg hover:opacity-95 transition"
                >
                  Contact <ArrowUpRight className="w-4 h-4" />
                </Link>
                <a
                  href={`mailto:${profileData?.email}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 bg-[var(--head-btn-border)]/35 text-[var(--foreground)] hover:bg-[var(--head-btn-border)]/60 transition"
                >
                  Email <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Main Footer Content */}
          <div className="mt-10 grid lg:grid-cols-12 gap-10">
            {/* Brand */}
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3">
                {profileData?.avatarUrl && (
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[var(--hero-image)] to-purple-500 flex justify-center text-white font-black shadow-lg overflow-hidden ">
                    <div className="w-full h-full">
                      <Image
                        src={buildFileUrl(profileData?.avatarUrl)}
                        width={150}
                        height={150}
                        className="object-cover"
                        alt="profile"
                      />
                    </div>
                  </div>
                )}
                <div>
                  <h4 className="text-xl font-extrabold text-[var(--foreground)]">
                    {profileData?.name}
                  </h4>
                  <p className="text-sm text-[var(--muted)]">
                    {profileData?.role}
                  </p>
                </div>
              </div>

              <p className="mt-5 text-[15px] leading-relaxed text-[var(--muted)]">
                I build modern web apps with clean UI, scalable code, and
                deployment-ready flow.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={profileData?.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-[var(--head-btn-border)]/35 text-[var(--foreground)] hover:bg-[var(--head-btn-border)]/60 transition"
                >
                  <Github className="w-4 h-4" /> GitHub
                </a>
                <a
                  href={profileData?.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-[var(--head-btn-border)]/35 text-[var(--foreground)] hover:bg-[var(--head-btn-border)]/60 transition"
                >
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </a>
              </div>
            </div>

            {/* Links */}
            <div className="lg:col-span-3">
              <h4 className="text-lg font-extrabold text-[var(--foreground)]">
                Quick Links
              </h4>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {quickLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="group inline-flex items-center justify-between gap-2 rounded-2xl border border-white/10 bg-[var(--head-btn-border)]/35 px-4 py-3 text-[15px] hover:bg-[var(--head-btn-border)]/60 transition"
                  >
                    <span className="text-[var(--muted)] group-hover:text-[var(--foreground)] transition">
                      {l.label}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-[var(--hero-image)] opacity-80 group-hover:opacity-100" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Services */}
            <div className="lg:col-span-3">
              <h4 className="text-lg font-extrabold text-[var(--foreground)]">
                Services
              </h4>
              <ul className="mt-5 space-y-3">
                {services.map((s) => (
                  <li
                    key={s}
                    className="rounded-2xl border border-white/10 bg-[var(--head-btn-border)]/35 px-4 py-3 text-[15px] text-[var(--muted)]"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="lg:col-span-2">
              <h4 className="text-lg font-extrabold text-[var(--foreground)]">
                Contact
              </h4>

              <div className="mt-5 space-y-3">
                <a
                  href={`mailto:${profileData?.email}`}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[var(--head-btn-border)]/35 px-4 py-3 hover:bg-[var(--head-btn-border)]/60 transition"
                >
                  <div className="shrink-0 w-10 h-10 rounded-2xl bg-gradient-to-br from-[var(--hero-image)] to-purple-500 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-[var(--muted)]">Email</div>
                    <div className="text-sm text-[var(--foreground)] truncate">
                      {profileData?.email}
                    </div>
                  </div>
                </a>

                <a
                  href={`tel:${profileData?.phone}`}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[var(--head-btn-border)]/35 px-4 py-3"
                >
                  <div className="shrink-0 w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-[var(--muted)]">Phone</div>
                    <div className="text-sm text-[var(--foreground)] truncate">
                      {profileData?.phone}
                    </div>
                  </div>
                </a>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${profileData?.location}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[var(--head-btn-border)]/35 px-4 py-3"
                >
                  <div className="shrink-0 w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-400 to-sky-500 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-[var(--muted)]">Location</div>
                    <div className="text-sm text-[var(--foreground)] truncate">
                      {profileData?.location}
                    </div>
                  </div>
                </a>

                <button
                  type="button"
                  onClick={scrollToTop}
                  className="inline-flex w-full items-center justify-center gap-2 px-5 py-3 rounded-2xl border border-white/12 bg-[var(--head-btn-border)]/35 text-[var(--foreground)] hover:bg-[var(--head-btn-border)]/35 transition"
                  aria-label="Back to top"
                >
                  Back to top{" "}
                  <ArrowUp className="w-4 h-4 text-[var(--hero-image)]" />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[var(--muted)]">
              © {year}{" "}
              <span className="text-[var(--foreground)]">
                {profileData?.name}
              </span>
              . All rights reserved.
            </p>

            <p className="text-sm text-[var(--muted)]">
              Built with{" "}
              <span className="text-[var(--foreground)]">Next.js</span> +{" "}
              <span className="text-[var(--foreground)]">Tailwind</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Skills", href: "/skills" },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

const services = [
  "Frontend / UI Development",
  "Full-Stack Web Apps",
  "API Integration",
  "Firebase Development",
  "Realtime Features (socket.io)",
  "Basic Backend (Express + MongoDB)",
];
