"use client";
import { useState, useEffect } from "react";
import { SKILLS_DATA } from "../data";
import { SectionCard, SkillBar } from "../ui/Widgets";
import Link from "next/link";
import StatsSection from "./Components/Stats";
import ActivityChart from "./Components/ActivityChart";
import ProjectListCard from "./Components/RecentProjects";
import RecentMessages from "./Components/MessageCard";
import { useSkill } from "@/context/SkillContext";
import { useAbout } from "@/context/AboutContext";
import SkillsShowcase from "./Components/SkillsShowCase";

// ─── OVERVIEW PAGE ────────────────────────────────────────────
export default function OverviewPage() {
  const [skillsAnimated, setSkillsAnimated] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setSkillsAnimated(true), 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <div className="w-full">
        <StatsSection />
      </div>

      <div className="grid gap-5 mb-5 grid-cols-1 md:grid-cols-[1.8fr_1fr]">
        <ActivityChart />
        <ProjectListCard />
      </div>

      <div className="grid gap-5 mb-5 grid-cols-1 md:grid-cols-[1.8fr_1fr]">
        <SkillsShowcase />
        <RecentMessages />
      </div>
    </div>
  );
}
