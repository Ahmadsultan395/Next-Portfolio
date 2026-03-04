"use client";

export default function ServicesShimmer() {
  return (
    <section className="relative w-full min-h-screen py-20 px-6 md:px-20 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header Shimmer */}
        <div className="mb-12 flex justify-center items-center flex-col">
          <div className="h-8 w-32 bg-white/10 rounded-full animate-pulse-slow mb-3"></div>
          <div className="h-6 w-56 bg-white/10 rounded-full animate-pulse-slow"></div>
        </div>

        {/* Services grid shimmer */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="relative rounded-3xl p-6 bg-white/5 border border-white/10 overflow-hidden"
            >
              {/* Glow placeholder */}
              <div className="absolute -top-24 -right-20 w-80 h-80 rounded-full blur-3xl opacity-30 bg-gradient-to-br from-white/10 to-transparent animate-pulse-slow pointer-events-none" />

              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-white/10 animate-pulse-slow mb-4"></div>

              {/* Title */}
              <div className="h-5 w-32 bg-white/10 rounded-full animate-pulse-slow mb-2"></div>
              {/* Subtitle */}
              <div className="h-4 w-24 bg-white/10 rounded-full animate-pulse-slow mb-4"></div>

              {/* Description */}
              <div className="h-3 w-full bg-white/10 rounded-full animate-pulse-slow mb-1"></div>
              <div className="h-3 w-5/6 bg-white/10 rounded-full animate-pulse-slow mb-1"></div>
              <div className="h-3 w-3/4 bg-white/10 rounded-full animate-pulse-slow mb-4"></div>

              {/* Tech chips */}
              <div className="flex flex-wrap gap-2">
                {[0, 1, 2].map((t) => (
                  <div
                    key={t}
                    className="h-6 w-14 bg-white/10 rounded-full animate-pulse-slow"
                  />
                ))}
              </div>

              {/* CTA */}
              <div className="mt-4 h-8 w-28 bg-white/10 rounded-full animate-pulse-slow"></div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.35;
            transform: scale(1);
          }
          50% {
            opacity: 0.55;
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
