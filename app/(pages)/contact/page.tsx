"use client";
import ScrollToTop from "@/Components/pages/ScrollToTop";
import WhatDrivesMe from "../home/Components/Drives";
import ContactPageSkeleton from "@/Components/skeleton/ContactPageSkeleton";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const ContactPage = dynamic(() => import("../home/Components/Contact"), {
  loading: () => <ContactPageSkeleton />,
  ssr: false,
});

const Contact = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div>
      <ScrollToTop />
      {mounted && <ContactPage />}
      <WhatDrivesMe />
    </div>
  );
};

export default Contact;
