"use client";

export default function ContactPageSkeleton() {
  return (
    <section className="max-w-7xl min-h-screen py-20 px-6 md:px-20 mx-auto overflow-hidden">
      <div className="w-full">
        {/* Header shimmer */}
        <div className="text-center mb-16">
          <div className="h-12 w-64 mx-auto bg-white/10 rounded-full animate-pulse-slow mb-4"></div>
          <div className="h-2 w-20 mx-auto bg-white/10 rounded-full animate-pulse-slow mb-6"></div>
          <div className="h-4 w-96 mx-auto bg-white/10 rounded-full animate-pulse-slow"></div>
        </div>

        {/* Info + Form shimmer */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Info cards shimmer */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[0, 1, 2, 3].map((_, i) => (
              <div
                key={i}
                className="h-24 rounded-2xl bg-white/10 border border-white/10 animate-pulse-slow"
              />
            ))}
          </div>

          {/* Right: Form shimmer */}
          <div className="space-y-4 p-6 rounded-2xl bg-white/5 border border-white/10 animate-pulse-slow">
            <div className="h-12 w-full bg-white/10 rounded-full animate-pulse-slow" />
            <div className="h-12 w-full bg-white/10 rounded-full animate-pulse-slow" />
            <div className="h-32 w-full bg-white/10 rounded-xl animate-pulse-slow" />
            <div className="h-12 w-32 rounded-full bg-white/10 animate-pulse-slow mx-auto" />
          </div>
        </div>
      </div>

      {/* Shimmer Animation */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.35;
            transform: scale(1);
          }
          50% {
            opacity: 0.55;
            transform: scale(1.01);
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 1.5s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
