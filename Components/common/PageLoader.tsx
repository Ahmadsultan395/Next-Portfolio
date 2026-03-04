"use client";
export default function PageLoader() {
  return (
    <div className="flex items-center justify-center w-full h-full min-h-[200px]">
      <div className="flex gap-1.5 items-end h-14">
        {[...Array(7)].map((_, i) => (
          <div
            key={i}
            className="w-4 rounded-full bg-gradient-to-t from-[var(--hero-image)]/100 to-[var(--hero-image)]/50"
            style={{
              animation: `liquidBar 1s ease-in-out infinite`,
              animationDelay: `${i * 0.1}s`,
              boxShadow: "0 0 12px var(--hero-image)",
            }}
          />
        ))}
      </div>
      <style>{`
        @keyframes liquidBar {
          0%, 100% { height: 12px; }
          50% { height: 56px; }
        }
      `}</style>
    </div>
  );
}

// "use client";
// import { useEffect, useState } from "react";

// // =============================================
// // 🔥 KAMAL LOADER COLLECTION - Next.js + Tailwind
// // =============================================

// // ---- Loader 1: Morphing Orb ----
// export function PageLoader() {
//   return (
//     <div className="flex items-center justify-center w-full h-full min-h-[200px]">
//       <div className="relative flex items-center justify-center">
//         {/* Outer rings */}
//         <div className="absolute w-24 h-24 rounded-full border-2 border-cyan-400/30 animate-ping" />
//         <div
//           className="absolute w-16 h-16 rounded-full border-2 border-cyan-400/50"
//           style={{ animation: "spin 2s linear infinite" }}
//         />
//         {/* Core orb */}
//         <div
//           className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 shadow-lg shadow-cyan-500/50"
//           style={{
//             animation: "pulse 1.5s ease-in-out infinite",
//             boxShadow:
//               "0 0 30px rgba(34,211,238,0.7), 0 0 60px rgba(34,211,238,0.3)",
//           }}
//         />
//         {/* Orbiting dot */}
//         <div
//           className="absolute w-3 h-3 rounded-full bg-white"
//           style={{
//             animation: "orbit 1.5s linear infinite",
//             transformOrigin: "0 0",
//             top: "50%",
//             left: "50%",
//             marginTop: "-6px",
//             marginLeft: "28px",
//           }}
//         />
//       </div>

//       <style>{`
//         @keyframes orbit {
//           from { transform: rotate(0deg) translateX(30px) rotate(0deg); }
//           to   { transform: rotate(360deg) translateX(30px) rotate(-360deg); }
//         }
//       `}</style>
//     </div>
//   );
// }

// // ---- Loader 2: DNA Strand ----
// export function DNALoader() {
//   return (
//     <div className="flex items-center justify-center w-full h-full min-h-[200px]">
//       <div className="flex gap-2 items-center">
//         {[...Array(6)].map((_, i) => (
//           <div key={i} className="flex flex-col gap-2 items-center">
//             <div
//               className="w-3 h-3 rounded-full bg-violet-500"
//               style={{
//                 animation: `dnaTop 1.2s ease-in-out infinite`,
//                 animationDelay: `${i * 0.1}s`,
//               }}
//             />
//             <div
//               className="w-px h-8 bg-gradient-to-b from-violet-500/40 to-pink-500/40"
//               style={{
//                 animation: `dnaMid 1.2s ease-in-out infinite`,
//                 animationDelay: `${i * 0.1}s`,
//               }}
//             />
//             <div
//               className="w-3 h-3 rounded-full bg-pink-500"
//               style={{
//                 animation: `dnaBottom 1.2s ease-in-out infinite`,
//                 animationDelay: `${i * 0.1}s`,
//               }}
//             />
//           </div>
//         ))}
//       </div>
//       <style>{`
//         @keyframes dnaTop {
//           0%, 100% { transform: translateY(0px); background: rgb(139,92,246); }
//           50% { transform: translateY(20px); background: rgb(236,72,153); }
//         }
//         @keyframes dnaBottom {
//           0%, 100% { transform: translateY(0px); background: rgb(236,72,153); }
//           50% { transform: translateY(-20px); background: rgb(139,92,246); }
//         }
//         @keyframes dnaMid {
//           0%, 100% { opacity: 0.4; }
//           50% { opacity: 0.8; }
//         }
//       `}</style>
//     </div>
//   );
// }

// // ---- Loader 3: Liquid Bars ----
// export function LiquidBarsLoader() {
//   return (
//     <div className="flex items-center justify-center w-full h-full min-h-[200px]">
//       <div className="flex gap-1.5 items-end h-14">
//         {[...Array(7)].map((_, i) => (
//           <div
//             key={i}
//             className="w-4 rounded-full bg-gradient-to-t from-orange-600 to-yellow-400"
//             style={{
//               animation: `liquidBar 1s ease-in-out infinite`,
//               animationDelay: `${i * 0.1}s`,
//               boxShadow: "0 0 12px rgba(251,146,60,0.6)",
//             }}
//           />
//         ))}
//       </div>
//       <style>{`
//         @keyframes liquidBar {
//           0%, 100% { height: 12px; }
//           50% { height: 56px; }
//         }
//       `}</style>
//     </div>
//   );
// }

// // ---- Loader 4: Glitch Text ----
// export function GlitchTextLoader({ text = "Loading..." }) {
//   return (
//     <div className="flex items-center justify-center w-full h-full min-h-[200px]">
//       <div className="relative">
//         <span
//           className="text-3xl font-black tracking-widest text-white uppercase"
//           style={{ fontFamily: "'Courier New', monospace" }}
//         >
//           {text}
//         </span>
//         <span
//           className="absolute inset-0 text-3xl font-black tracking-widest text-red-500/70 uppercase"
//           style={{
//             fontFamily: "'Courier New', monospace",
//             animation: "glitch1 2s infinite",
//             clipPath: "polygon(0 30%, 100% 30%, 100% 50%, 0 50%)",
//           }}
//         >
//           {text}
//         </span>
//         <span
//           className="absolute inset-0 text-3xl font-black tracking-widest text-cyan-400/70 uppercase"
//           style={{
//             fontFamily: "'Courier New', monospace",
//             animation: "glitch2 2s infinite",
//             clipPath: "polygon(0 60%, 100% 60%, 100% 80%, 0 80%)",
//           }}
//         >
//           {text}
//         </span>
//       </div>
//       <style>{`
//         @keyframes glitch1 {
//           0%, 90%, 100% { transform: translate(0); }
//           92% { transform: translate(-4px, 2px); }
//           94% { transform: translate(4px, -2px); }
//           96% { transform: translate(-2px, 0); }
//         }
//         @keyframes glitch2 {
//           0%, 85%, 100% { transform: translate(0); }
//           87% { transform: translate(4px, -2px); }
//           89% { transform: translate(-4px, 2px); }
//           91% { transform: translate(2px, 0); }
//         }
//       `}</style>
//     </div>
//   );
// }

// // ---- Loader 5: Matrix Rain Dots ----
// export function MatrixDotsLoader() {
//   const dots = Array.from({ length: 25 });
//   return (
//     <div className="flex items-center justify-center w-full h-full min-h-[200px]">
//       <div className="grid grid-cols-5 gap-2">
//         {dots.map((_, i) => (
//           <div
//             key={i}
//             className="w-3 h-3 rounded-sm bg-emerald-400"
//             style={{
//               animation: `matrixDot 1.5s ease-in-out infinite`,
//               animationDelay: `${(i % 5) * 0.1 + Math.floor(i / 5) * 0.15}s`,
//               boxShadow: "0 0 6px rgba(52,211,153,0.8)",
//             }}
//           />
//         ))}
//       </div>
//       <style>{`
//         @keyframes matrixDot {
//           0%, 100% { opacity: 0.1; transform: scale(0.5); }
//           50% { opacity: 1; transform: scale(1); }
//         }
//       `}</style>
//     </div>
//   );
// }

// // ---- DEMO PAGE ----
// export default function LoaderShowcase() {
//   const [active, setActive] = useState(0);
//   const loaders = [
//     { name: "Morphing Orb", component: <PageLoader /> },
//     { name: "DNA Strand", component: <DNALoader /> },
//     { name: "Liquid Bars", component: <LiquidBarsLoader /> },
//     { name: "Glitch Text", component: <GlitchTextLoader /> },
//     { name: "Matrix Dots", component: <MatrixDotsLoader /> },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-950 text-white p-8 flex flex-col items-center gap-10">
//       {/* Header */}
//       <div className="text-center">
//         <h1 className="text-4xl font-black tracking-tight bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
//           🔥 Loader Collection
//         </h1>
//         <p className="text-gray-400 mt-2 text-sm tracking-widest uppercase">
//           Next.js + Tailwind CSS
//         </p>
//       </div>

//       {/* Loader Buttons */}
//       <div className="flex flex-wrap gap-3 justify-center">
//         {loaders.map((l, i) => (
//           <button
//             key={i}
//             onClick={() => setActive(i)}
//             className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 border
//               ${
//                 active === i
//                   ? "bg-white text-gray-900 border-white scale-105"
//                   : "bg-transparent text-gray-400 border-gray-700 hover:border-gray-400 hover:text-white"
//               }`}
//           >
//             {l.name}
//           </button>
//         ))}
//       </div>

//       {/* Active Loader Display */}
//       <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl flex items-center justify-center min-h-[240px] shadow-2xl">
//         {loaders[active].component}
//       </div>

//       {/* All Loaders Grid */}
//       <div className="w-full max-w-4xl">
//         <h2 className="text-center text-gray-500 text-xs uppercase tracking-widest mb-6">
//           — Saare Loaders Ek Saath —
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {loaders.map((l, i) => (
//             <div
//               key={i}
//               className="bg-gray-900 border border-gray-800 rounded-xl p-4 hover:border-gray-600 transition-colors"
//             >
//               <p className="text-center text-xs text-gray-500 mb-3 uppercase tracking-widest">
//                 {l.name}
//               </p>
//               {l.component}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Usage code hint */}
//       <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-xl p-4">
//         <p className="text-xs text-gray-500 mb-2 uppercase tracking-widest">
//           Usage
//         </p>
//         <pre className="text-emerald-400 text-sm overflow-auto">
//           {`import { MorphingOrbLoader } from "./Loader";

// export default function Page() {
//   return <MorphingOrbLoader />;
// }`}
//         </pre>
//       </div>
//     </div>
//   );
// }
// drop ball portfolio
//  <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[var(--background)]">
//       {/* Smiley */}
//       <div className="relative w-20 h-20 bg-[var(--hero-image)] rounded-full shadow-lg flex items-center justify-center animate-bounce-fancy">
//         <div className="absolute w-4 h-4 bg-white rounded-full left-5 top-6" />
//         <div className="absolute w-4 h-4 bg-white rounded-full right-5 top-6" />
//         <div className="absolute w-10 h-5 border-b-4 border-white rounded-full bottom-5" />
//       </div>

//       {/* Portfolio Text */}
//       <div className="mt-4 font-bold tracking-widest text-center text-[clamp(2rem,3vw,5rem)] text-[var(--hero-image)] animate-fade-in">
//         PORTFOLIO
//       </div>

//       {/* Line */}
//       <div className="mt-2 w-1/4 h-0.5 bg-[var(--hero-image)] animate-fade-in" />

//       {/* Animations */}
//       <style jsx>{`
//         @keyframes bounceFancy {
//           0%,
//           100% {
//             transform: translateY(0);
//           }
//           25% {
//             transform: translateY(-20px);
//           }
//           50% {
//             transform: translateY(-10px);
//           }
//           75% {
//             transform: translateY(-15px);
//           }
//         }
//         .animate-bounce-fancy {
//           animation: bounceFancy 1s ease-in-out forwards;
//         }

//         @keyframes fadeIn {
//           0% {
//             opacity: 0;
//             transform: scale(0.9);
//           }
//           100% {
//             opacity: 1;
//             transform: scale(1);
//           }
//         }
//         .animate-fade-in {
//           animation: fadeIn 1s ease forwards;
//         }
//       `}</style>
//     </div>
