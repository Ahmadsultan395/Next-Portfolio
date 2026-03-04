"use client";

export default function ExperienceSkeleton() {
  return (
    <section className="relative w-full py-20 px-6 md:px-20 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header shimmer */}
        <div className="text-center mb-16">
          <div className="h-12 w-64 mx-auto bg-white/10 rounded-full animate-pulse-slow mb-4"></div>
          <div className="h-2 w-20 mx-auto bg-white/10 rounded-full animate-pulse-slow mb-6"></div>
          <div className="h-4 w-96 mx-auto bg-white/10 rounded-full animate-pulse-slow"></div>
        </div>

        {/* Timeline line shimmer */}
        <div className="relative max-w-4xl mx-auto">
          <div className="timeline-line absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-white/10 rounded-full animate-pulse-slow" />

          {/* Timeline items shimmer */}
          {[0, 1, 2].map((_, index) => (
            <div
              key={index}
              className={`relative mb-16 last:mb-0 ${
                index % 2 === 0 ? "md:pr-1/2" : "md:pl-1/2 md:ml-auto"
              }`}
            >
              <div className="flex items-center gap-6">
                {/* Dot */}
                <div className="absolute left-8 md:left-1/2 w-8 h-8 -ml-4 rounded-full bg-white/10 animate-pulse-slow z-10" />

                {/* Content Card */}
                <div
                  className={`ml-20 md:ml-0 ${index % 2 === 0 ? "md:mr-20" : "md:ml-20"} flex-1`}
                >
                  <div className="relative p-8 rounded-2xl bg-white/5 border border-white/10 animate-pulse-slow">
                    {/* Year Badge */}
                    <div className="h-5 w-24 rounded-full bg-white/10 mb-3 animate-pulse-slow"></div>
                    {/* Role */}
                    <div className="h-6 w-48 rounded-full bg-white/10 mb-2 animate-pulse-slow"></div>
                    {/* Company */}
                    <div className="h-5 w-36 rounded-full bg-white/10 mb-4 animate-pulse-slow"></div>
                    {/* Description */}
                    <div className="space-y-2">
                      <div className="h-3 w-full bg-white/10 rounded-full animate-pulse-slow"></div>
                      <div className="h-3 w-5/6 bg-white/10 rounded-full animate-pulse-slow"></div>
                      <div className="h-3 w-4/6 bg-white/10 rounded-full animate-pulse-slow"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Shimmer */}
        <div className="about-content text-center p-12 rounded-3xl bg-white/5 border border-white/10 animate-pulse-slow mt-10">
          <div className="h-8 w-72 mx-auto bg-white/10 rounded-full mb-4 animate-pulse-slow"></div>
          <div className="h-4 w-96 mx-auto bg-white/10 rounded-full mb-8 animate-pulse-slow"></div>
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="h-12 w-40 rounded-full bg-white/10 animate-pulse-slow"></div>
            <div className="h-12 w-40 rounded-full bg-white/10 animate-pulse-slow"></div>
          </div>
        </div>
      </div>

      {/* Shimmer Animation */}
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
