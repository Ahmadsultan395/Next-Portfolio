"use client";

export default function SkillsSkeleton() {
  return (
    <section className="relative w-full min-h-screen py-20 px-6 md:px-20 animate-pulse">
      <div className="max-w-7xl h-min-h-screen mx-auto">
        {/* Header Skeleton */}
        <div className="mb-16 space-y-4 flex justify-center items-center flex-col">
          <div className="h-6 w-32 bg-gray-700 rounded shimmer" />
          <div className="h-10 w-48 bg-gray-700 rounded shimmer" />
          <div className="h-4 w-96 bg-gray-700 rounded shimmer" />
        </div>

        {/* Cards Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {[1, 2].map((card) => (
            <div
              key={card}
              className="rounded-3xl p-8 bg-gray-800/40 border border-gray-700 space-y-6"
            >
              {/* Card Header */}
              <div className="flex justify-between items-center">
                <div className="flex gap-4 items-center">
                  <div className="w-14 h-14 rounded-2xl bg-gray-700 shimmer" />
                  <div className="space-y-2">
                    <div className="h-6 w-32 bg-gray-700 rounded shimmer" />
                    <div className="h-4 w-24 bg-gray-700 rounded shimmer" />
                  </div>
                </div>
                <div className="h-6 w-10 bg-gray-700 rounded shimmer" />
              </div>

              {/* Chips */}
              <div className="flex flex-wrap gap-3">
                {[1, 2, 3, 4, 5].map((chip) => (
                  <div
                    key={chip}
                    className="h-8 w-20 rounded-full bg-gray-700 shimmer"
                  />
                ))}
              </div>

              {/* Footer */}
              <div className="flex justify-between mt-6">
                <div className="h-4 w-28 bg-gray-700 rounded shimmer" />
                <div className="h-4 w-16 bg-gray-700 rounded shimmer" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .shimmer {
          position: relative;
          overflow: hidden;
          background: #2a2a2a;
        }

        .shimmer::after {
          content: "";
          position: absolute;
          top: 0;
          left: -150%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
          );
          animation: shimmer 1.6s infinite;
        }

        @keyframes shimmer {
          100% {
            left: 150%;
          }
        }
      `}</style>
    </section>
  );
}
