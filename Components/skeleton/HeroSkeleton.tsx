"use client";

export default function HeroSkeleton() {
  return (
    <section className="relative  w-full min-h-screen py-20 px-6 md:px-20 animate-pulse">
      <div className="max-w-7xl min-h-screen mx-auto grid xl:grid-cols-2 gap-12 items-center">
        {/* LEFT SIDE */}
        <div className="space-y-6">
          <div className="h-6 w-40 bg-gray-700 rounded shimmer" />
          <div className="h-14 w-72 bg-gray-700 rounded shimmer" />
          <div className="h-8 w-60 bg-gray-700 rounded shimmer" />
          <div className="h-4 w-full bg-gray-700 rounded shimmer" />
          <div className="h-4 w-5/6 bg-gray-700 rounded shimmer" />
          <div className="h-4 w-2/3 bg-gray-700 rounded shimmer" />

          <div className="flex gap-4 pt-4">
            <div className="h-12 w-32 bg-gray-700 rounded-xl shimmer" />
            <div className="h-12 w-32 bg-gray-700 rounded-xl shimmer" />
          </div>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="flex justify-center md:justify-end ">
          <div className="w-72 h-72 md:w-[400px] md:h-[400px] rounded-full bg-gray-700 shimmer" />
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
