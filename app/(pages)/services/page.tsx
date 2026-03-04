"use client";
import LoaderWrapper from "@/Components/common/LoaderWrapper";
import ServicesSection from "../home/Components/Services";
import Pricing from "./Components/Pricing";
import Services from "./Components/State";
import ScrollToTop from "@/Components/pages/ScrollToTop";
import useMinLoader from "@/hooks/useMinLoader";
import { useService } from "@/context/ServiceContext";
import ServicesShimmer from "@/Components/skeleton/ServicsSkeleton";
import dynamic from "next/dynamic";

const ServicesPage = () => {
  const ServicesSection = dynamic(() => import("../home/Components/Services"), {
    loading: () => <ServicesShimmer />,
  });
  return (
    <div>
      <ScrollToTop />
      <ServicesSection />
      {/* <Pricing /> */}
      <Services />
    </div>
  );
};

export default ServicesPage;
