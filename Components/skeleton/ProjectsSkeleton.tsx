"use client";

export default function ProjectsSkeleton({ count = 3 }: { count?: number }) {
  return (
    <section className="relative w-full min-h-screen py-20 px-6 md:px-20 animate-pulse">
      <div className="max-w-7xl min-h-screen mx-auto space-y-12">
        {/* Header skeleton */}
        <div className="space-y-4 mb-10 flex justify-center items-center flex-col">
          <div className="h-6 w-32 bg-gray-700 rounded shimmer" />
          <div className="h-10 w-48 bg-gray-700 rounded shimmer" />
          <div className="h-4 w-96 bg-gray-700 rounded shimmer" />
        </div>

        {/* Filter skeleton */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="h-8 w-20 rounded-full bg-gray-700 shimmer"
              />
            ))}
        </div>

        {/* Project cards skeleton */}
        <div className="grid lg:grid-cols-2 gap-8">
          {Array(count)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="rounded-3xl overflow-hidden bg-gray-800/40 border border-gray-700 p-6 space-y-4"
              >
                {/* Image */}
                <div className="h-64 rounded-xl bg-gray-700 shimmer" />

                {/* Title */}
                <div className="h-6 w-40 bg-gray-700 rounded shimmer" />

                {/* Description */}
                <div className="h-4 w-full bg-gray-700 rounded shimmer" />
                <div className="h-4 w-5/6 bg-gray-700 rounded shimmer" />

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {Array(3)
                    .fill(0)
                    .map((_, j) => (
                      <div
                        key={j}
                        className="h-6 w-16 rounded-full bg-gray-700 shimmer"
                      />
                    ))}
                </div>

                {/* Action buttons */}
                <div className="flex gap-3 mt-4">
                  <div className="h-10 w-24 rounded-full bg-gray-700 shimmer" />
                  <div className="h-10 w-24 rounded-full bg-gray-700 shimmer" />
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
