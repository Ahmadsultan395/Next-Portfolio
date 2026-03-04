"use client";
import { Profile } from "@/types/profileTypes";
import { buildFileUrl } from "@/services/ProfileService";

interface ProfileHeroCardProps {
  profile: Profile;
}

export function ProfileHeroCard({ profile }: ProfileHeroCardProps) {
  const initials = profile.name;
  const avatarFullUrl = buildFileUrl(profile.avatarUrl);
  const resumeFullUrl = buildFileUrl(profile.resumeUrl);

  const handleDownloadCV = () => {
    if (!resumeFullUrl) return;
    window.open(resumeFullUrl, "_blank");
  };

  return (
    <div className="relative overflow-hidden rounded-xl border border-[var(--border)] bg-gradient-to-br from-[var(--surface)] to-[var(--surface2)] p-8 mb-5">
      {/* Decorative blobs */}
      <div className="absolute -top-16 -right-16 w-60 h-60 rounded-full bg-[radial-gradient(circle,rgba(0,201,177,.12)_0%,transparent_70%)]" />
      <div className="absolute -bottom-20 -left-10 w-52 h-52 rounded-full bg-[radial-gradient(circle,rgba(124,106,245,.08)_0%,transparent_70%)]" />

      <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
        {/* Avatar */}
        <div className="w-[90px] h-[90px] rounded-full flex-shrink-0 overflow-hidden flex items-center justify-center text-white text-2xl font-extrabold shadow-[0_0_0_3px_var(--bg),0_0_0_5px_rgba(0,201,177,.3)] bg-gradient-to-br from-[var(--accent)] to-[var(--accent2)]">
          {profile.avatarUrl ? (
            <img
              src={avatarFullUrl}
              alt={profile.name}
              className="w-full h-full object-cover"
            />
          ) : (
            initials || "?"
          )}
        </div>

        {/* Text Section */}
        <div className="flex-1 text-center md:text-left">
          {/* Name */}
          <h2 className="text-2xl font-extrabold tracking-tight">
            {profile.name}
          </h2>

          {/* Role */}
          <div className="flex items-center justify-center md:justify-start gap-2 text-sm font-semibold text-[var(--accent)] mt-1">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            {profile.role}
          </div>

          {profile.bio && (
            <div
              className="text-sm text-[var(--muted)] mt-3 max-w-xl leading-relaxed"
              dangerouslySetInnerHTML={{ __html: profile.bio }}
              style={{ color: "var(--fg)" }}
            />
          )}

          {/* Chips */}
          <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-4">
            {profile.location && (
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-[var(--surface3)] border border-[var(--border)]">
                🌍 {profile.location}
              </span>
            )}
            {profile?.availableForFreelance && (
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-[var(--surface3)] border border-[var(--border)]">
                ⚡ Available now
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-5">
            {profile.resumeUrl && (
              <button
                onClick={handleDownloadCV}
                className="flex items-center gap-2 px-4 py-2 rounded-md bg-[var(--accent)] text-[var(--bg)] text-sm font-semibold hover:opacity-90 transition"
              >
                ↓ Download CV
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
