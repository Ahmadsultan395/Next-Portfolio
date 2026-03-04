"use client";
import TimeEfficiencyBadge from "./Components/State";
import ScrollToTop from "@/Components/pages/ScrollToTop";
import ProjectsSkeleton from "@/Components/skeleton/ProjectsSkeleton";
import dynamic from "next/dynamic";

const ProjectsPage = () => {
  const ProjectSection = dynamic(() => import("../home/Components/Projects"), {
    loading: () => <ProjectsSkeleton />,
  });
  return (
    <>
      <ScrollToTop />
      <ProjectSection />
      <TimeEfficiencyBadge />
    </>
  );
};

export default ProjectsPage;
