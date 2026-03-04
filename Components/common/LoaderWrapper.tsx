"use client";
import PageLoader from "./PageLoader";
const LoaderWrapper = () => {
  return (
    <div className="fixed inset-0 h-screen w-screen bg-[var(--background)] z-50 flex items-center justify-center">
      <PageLoader />
    </div>
  );
};

export default LoaderWrapper;
