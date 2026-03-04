"use client";
import InfoPhilosophy from "./Components/InfoPhilosophy";
import ScrollToTop from "@/Components/pages/ScrollToTop";
import SkillsSkeleton from "@/Components/skeleton/SkillsSkeleton";
import dynamic from "next/dynamic";

const SkillsPage = () => {
  const SkillsSection = dynamic(() => import("../home/Components/Skills"), {
    loading: () => <SkillsSkeleton />,
  });
  return (
    <div>
      <ScrollToTop />
      <SkillsSection />
      <InfoPhilosophy />
    </div>
  );
};

export default SkillsPage;
