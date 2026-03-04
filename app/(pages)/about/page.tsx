"use client";
import { useAbout } from "@/context/AboutContext";
import FunFactsInterests from "./Components/Expert";
import ScrollToTop from "@/Components/pages/ScrollToTop";
import dynamic from "next/dynamic";
import AboutSkeleton from "@/Components/skeleton/AboutSkeleton";

const About = () => {
  const { about } = useAbout();

  const AboutStory = dynamic(() => import("../home/Components/About"), {
    loading: () => (
      <div>
        <AboutSkeleton />
      </div>
    ),
  });

  return (
    <div>
      <ScrollToTop />
      <AboutStory />
      <FunFactsInterests />
    </div>
  );
};

export default About;
