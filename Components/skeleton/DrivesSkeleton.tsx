"use client";

export default function WhatDrivesMeSkeleton() {
  return (
    <section className="relative max-w-7xl py-20 px-6 md:px-20 overflow-hidden mx-auto">
      <div className="relative z-10 max-w-7xl mx-auto ">
        {/* Section Heading Shimmer */}
        <div className="w-full mb-16 text-center ">
          <div className="h-12 w-64 mx-auto bg-white/10 rounded-full animate-pulse-slow mb-4"></div>
          <div className="h-2 w-20 mx-auto bg-white/10 rounded-full animate-pulse-slow mb-6"></div>
          <div className="h-4 w-96 mx-auto bg-white/10 rounded-full animate-pulse-slow"></div>
        </div>

        {/* Achievements Grid Shimmer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[0, 1, 2, 3].map((_, index) => (
            <div
              key={index}
              className="relative p-8 rounded-2xl bg-white/5 border border-white/10 overflow-hidden flex justify-center items-center flex-col"
            >
              {/* Icon */}
              <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-white/10 animate-pulse-slow"></div>

              {/* Title */}
              <div className="h-5 w-24 mx-auto bg-white/10 rounded-full animate-pulse-slow mb-2"></div>

              {/* Description */}
              <div className="h-3 w-3/4 mx-auto bg-white/10 rounded-full animate-pulse-slow mb-1"></div>
              <div className="h-3 w-2/3 mx-auto bg-white/10 rounded-full animate-pulse-slow"></div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.05);
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 1.5s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
