import { SectionHeaderProps } from "@/types/landingType";
import React from "react";

const SectionHeader: React.FC<SectionHeaderProps> = ({
  mark,
  abs,
  t1,
  t2,
  des,
  icon: Icon,
}) => {
  return (
    <div>
      <div className="pointer-events-none absolute inset-0 z-[1] flex items-start justify-center">
        <div className="-mt-[3.5rem] text-[72px] md:text-[120px] font-black tracking-tight select-none text-[var(--foreground)] opacity-[0.06] dark:opacity-[0.04]">
          {mark}
        </div>
      </div>
      <div className="about-heading text-center mb-16 relative">
        {abs && (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--head-btn-border)] bg-white/5 backdrop-blur">
            {Icon && <Icon className="w-4 h-4 text-[var(--hero-image)]" />}
            <span className="text-sm text-[var(--muted)]">{abs}</span>
          </div>
        )}

        <h2 className="mt-6 text-5xl md:text-7xl font-black text-[var(--foreground)]">
          {t1} <span className="text-[var(--hero-image)]">{t2}</span>
        </h2>

        <p className="mt-5 text-lg md:text-xl text-[var(--muted)] max-w-3xl mx-auto">
          {des}
        </p>

        <div className="mt-7 w-28 h-1.5 bg-gradient-to-r from-[color:var(--hero-image)] to-purple-500 mx-auto rounded-full" />
      </div>
    </div>
  );
};

export default SectionHeader;
