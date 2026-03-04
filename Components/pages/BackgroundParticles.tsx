"use client";
import { useTheme } from "next-themes";

export default function BackgroundParticles() {
  const { theme } = useTheme();
  return (
    <>
      {theme === "dark" && (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          {/* Gradient Background */}
          {/* {theme === "dark" && (
          <div className="absolute inset-0 bg-gradient-to-tl from-[var(--hero-image)]/20 via-[var(--hero-image)]/8 to-[var(--hero-image)]/2 opacity-40 " />
        )} */}

          {/* Grid Pattern Overlay */}
          {/* <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(#00585e 1px, transparent 1px), linear-gradient(90deg, #00585e 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          />
        </div> */}

          {/* Floating Particles - Increased count for full coverage */}
          <div className="absolute inset-0">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="particle-float absolute rounded-full bg-[var(--hero-image)]"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 2 + 1}px`,
                  height: `${Math.random() * 2 + 1}px`,
                  opacity: Math.random() * 0.4 + 0.2,
                  animationDuration: `${Math.random() * 10 + 15}s`,
                  animationDelay: `${Math.random() * 5}s`,
                }}
              />
            ))}
          </div>

          {/* Rising Particles */}
          <div className="absolute inset-0">
            {[...Array(30)].map((_, i) => (
              <div
                key={`rising-${i}`}
                className="particle-rise absolute rounded-full bg-gradient-to-t from-[var(--hero-image)] to-purple-500"
                style={{
                  left: `${Math.random() * 100}%`,
                  bottom: `-10px`,
                  width: `${Math.random() * 3 + 1}px`,
                  height: `${Math.random() * 3 + 1}px`,
                  opacity: Math.random() * 0.5 + 0.3,
                  animationDuration: `${Math.random() * 8 + 12}s`,
                  animationDelay: `${Math.random() * 8}s`,
                }}
              />
            ))}
          </div>

          {/* Glowing Orbs */}
          {/* <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <div
              key={`orb-${i}`}
              className="particle-glow absolute rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 100 + 50}px`,
                height: `${Math.random() * 100 + 50}px`,
                background: `radial-gradient(circle, var(--hero-image) 0%, transparent 70%)`,
                opacity: 0.1,
                animationDuration: `${Math.random() * 15 + 10}s`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div> */}

          {/* Shooting Stars */}
          {/* <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <div
              key={`star-${i}`}
              className="shooting-star absolute h-[2px] bg-gradient-to-r from-transparent via-[var(--hero-image)] to-transparent"
              style={{
                width: `${Math.random() * 100 + 50}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 50}%`,
                animationDelay: `${Math.random() * 10 + 2}s`,
              }}
            />
          ))}
        </div> */}
        </div>
      )}

      {/* Global Particle Animation Styles */}
      <style jsx global>{`
        @keyframes particleFloat {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.2;
          }
          25% {
            transform: translate(20px, -30px) scale(1.2);
            opacity: 0.5;
          }
          50% {
            transform: translate(-20px, -60px) scale(0.8);
            opacity: 0.3;
          }
          75% {
            transform: translate(30px, -90px) scale(1.1);
            opacity: 0.6;
          }
        }

        @keyframes particleRise {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-100vh) translateX(50px) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes particleGlow {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.05;
          }
          50% {
            transform: translate(30px, -30px) scale(1.5);
            opacity: 0.15;
          }
        }

        @keyframes shootingStar {
          0% {
            transform: translateX(0) translateY(0) rotate(-45deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateX(300px) translateY(300px) rotate(-45deg);
            opacity: 0;
          }
        }

        @keyframes gradientSlow {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .particle-float {
          animation: particleFloat linear infinite;
        }

        .particle-rise {
          animation: particleRise linear infinite;
        }

        .particle-glow {
          animation: particleGlow ease-in-out infinite;
        }

        .shooting-star {
          animation: shootingStar 3s linear infinite;
        }

        .animate-gradient-slow {
          background-size: 200% 200%;
          animation: gradientSlow 20s ease infinite;
        }

        /* Custom Scrollbar */
        /* body::-webkit-scrollbar {
          width: 8px;
        }

        body::-webkit-scrollbar-track {
          background: var(--background);
        }

        body::-webkit-scrollbar-thumb {
          background: var(--hero-image);
          border-radius: 4px;
        }

        body::-webkit-scrollbar-thumb:hover {
          background: var(--hero-image);
          opacity: 0.8;
        } */
      `}</style>
    </>
  );
}
