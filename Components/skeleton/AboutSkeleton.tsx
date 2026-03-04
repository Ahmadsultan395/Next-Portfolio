"use client";

export default function AboutSkeleton() {
  return (
    <section className="relative w-full min-h-screen py-20 px-6 md:px-20 animate-pulse">
      <div className="max-w-7xl min-h-screen mx-auto">
        {/* Section Header Skeleton */}
        <div className="mb-16 space-y-4 w-full flex flex-col justify-center items-center">
          <div className="h-6 w-32 bg-gray-700 rounded shimmer" />
          <div className="h-10 w-64 bg-gray-700 rounded shimmer" />
          <div className="h-4 w-96 bg-gray-700 rounded shimmer" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* LEFT - Story Cards */}
          <div className="space-y-8">
            <div className="p-8 rounded-3xl bg-gray-800/40 border border-gray-700 space-y-4">
              <div className="h-8 w-40 bg-gray-700 rounded shimmer" />
              <div className="h-4 w-full bg-gray-700 rounded shimmer" />
              <div className="h-4 w-5/6 bg-gray-700 rounded shimmer" />
              <div className="h-4 w-2/3 bg-gray-700 rounded shimmer" />
            </div>

            <div className="p-8 rounded-3xl bg-gray-800/40 border border-gray-700 space-y-4">
              <div className="h-8 w-40 bg-gray-700 rounded shimmer" />
              <div className="h-4 w-full bg-gray-700 rounded shimmer" />
              <div className="h-4 w-5/6 bg-gray-700 rounded shimmer" />
              <div className="h-4 w-2/3 bg-gray-700 rounded shimmer" />
            </div>
          </div>

          {/* RIGHT - Skills */}
          <div className="space-y-6">
            <div className="h-8 w-40 bg-gray-700 rounded shimmer mb-6" />

            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-3">
                <div className="flex justify-between">
                  <div className="h-5 w-32 bg-gray-700 rounded shimmer" />
                  <div className="h-5 w-12 bg-gray-700 rounded shimmer" />
                </div>
                <div className="h-3 w-full bg-gray-700 rounded-full shimmer" />
              </div>
            ))}
          </div>
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
          animation: shimmer 1.5s infinite;
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
