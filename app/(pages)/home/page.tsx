"use client";

import dynamic from "next/dynamic";
import ScrollToTop from "@/Components/pages/ScrollToTop";
import HeroSkeleton from "@/Components/skeleton/HeroSkeleton";
import AboutSkeleton from "@/Components/skeleton/AboutSkeleton";
import SkillsSkeleton from "@/Components/skeleton/SkillsSkeleton";
import ProjectsSkeleton from "@/Components/skeleton/ProjectsSkeleton";
import ServicesShimmer from "@/Components/skeleton/ServicsSkeleton";
import WhatDrivesMeSkeleton from "@/Components/skeleton/DrivesSkeleton";
import ExperienceSkeleton from "@/Components/skeleton/ExperienceSkeleton";
import ContactPageSkeleton from "@/Components/skeleton/ContactPageSkeleton";

// Dynamic Imports with loading option
const HeroSection = dynamic(() => import("./Components/Hero"), {
  loading: () => <HeroSkeleton />,
});

const AboutStory = dynamic(() => import("./Components/About"), {
  loading: () => <AboutSkeleton />,
});

const SkillsSection = dynamic(() => import("./Components/Skills"), {
  loading: () => <SkillsSkeleton />,
});

const ProjectSection = dynamic(() => import("./Components/Projects"), {
  loading: () => <ProjectsSkeleton />,
});

const ServicesSection = dynamic(() => import("./Components/Services"), {
  loading: () => <ServicesShimmer />,
});

const WhatDrivesMe = dynamic(() => import("./Components/Drives"), {
  loading: () => <WhatDrivesMeSkeleton />,
});

const ExperienceTimeline = dynamic(() => import("./Components/Experties"), {
  loading: () => <ExperienceSkeleton />,
});

const ContactPage = dynamic(() => import("./Components/Contact"), {
  loading: () => <ContactPageSkeleton />,
});

export default function HomePage() {
  return (
    <div>
      <ScrollToTop />
      <HeroSection />
      <AboutStory />
      <SkillsSection />
      <ProjectSection />
      <ServicesSection />
      <WhatDrivesMe />
      <ExperienceTimeline />
      <ContactPage />
    </div>
  );
}
