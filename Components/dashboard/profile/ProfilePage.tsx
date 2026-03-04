"use client";
import Link from "next/link";
import { ProfileHeroCard } from "./ProfileHeroCard";
import {
  SectionCard,
  EmptyState,
  ActionButton,
  VisibilityRow,
} from "../common";
import { useProfile } from "@/context/ProfileContext";
import PageLoader from "@/Components/common/PageLoader";

export default function ProfilePage() {
  const { profileData, loading } = useProfile();

  if (loading) return <PageLoader />;

  if (!profileData) {
    return (
      <SectionCard>
        <EmptyState
          emoji="🧑‍💻"
          title="No profileData yet"
          description="Create your profileData to showcase your skills, experience, and social links across your portfolio."
          action={
            <Link href="/dashboard/profile/addprofile">
              <ActionButton
                label="Create Profile"
                icon={<span>+</span>}
                type="button"
              />
            </Link>
          }
        />
      </SectionCard>
    );
  }

  const social = [
    { label: "GitHub", emoji: "🐙", value: profileData.github },
    { label: "Portfolio", emoji: "🌐", value: profileData.portfolio },
    { label: "LinkedIn", emoji: "💼", value: profileData.linkedin },
    { label: "upwork", emoji: "⚡", value: profileData.upwork },
  ].filter((s) => s.value);

  return (
    <div>
      <ProfileHeroCard profile={profileData} />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: 20,
        }}
      >
        {/* ── Personal Info ── */}
        <SectionCard
          title="Personal Info"
          action={
            <Link href="/dashboard/profile/editprofile">
              <ActionButton
                label="Edit"
                variant="secondary"
                icon={<span>✏️</span>}
              />
            </Link>
          }
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax( 1fr))",
              gap: 0,
            }}
          >
            {[
              { label: "Full Name", value: profileData.name },
              { label: "Role / Title", value: profileData.role },
              { label: "Email", value: profileData.email },
              { label: "Phone", value: profileData.phone },
              { label: "Location", value: profileData.location },
            ].map((field) => (
              <div
                key={field.label}
                style={{
                  padding: "10px 0",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                <div
                  style={{
                    fontSize: 10.5,
                    fontWeight: 600,
                    color: "var(--muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.7px",
                    marginBottom: 3,
                  }}
                >
                  {field.label}
                </div>
                <div style={{ fontSize: 13.5, fontWeight: 500 }}>
                  {field.value || "—"}
                </div>
              </div>
            ))}
          </div>

          {profileData.bio && (
            <div
              style={{
                marginTop: 16,
                padding: 14,
                background: "var(--surface2)",
                borderRadius: "var(--radius-sm)",
                fontSize: 13.5,
                color: "var(--muted)",
                lineHeight: 1.7,
              }}
            >
              {/* Render HTML content */}
              <div
                dangerouslySetInnerHTML={{ __html: profileData.bio }}
                style={{ color: "var(--fg)" }} // Override muted color for content
              />
            </div>
          )}

          {/* Avatar / Resume file actions (Optional - Uncomment if needed) */}
          {/* <div
            style={{
              display: "flex",
              gap: 10,
              marginTop: 16,
              flexWrap: "wrap",
            }}
          >
            {profileData.avatarUrl && (
              <ActionButton
                label="Remove Avatar"
                variant="danger"
                icon={<span>🗑</span>}
                onClick={() => removeAvatar(profileData._id)}
              />
            )}
            {profileData.resumeUrl && (
              <ActionButton
                label="Remove Resume"
                variant="danger"
                icon={<span>🗑</span>}
                onClick={() => removeResume(profileData._id)}
              />
            )}
          </div> */}
        </SectionCard>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* ── Social Links ── */}
          {profileData?.showSocialLinks && (
            <>
              {social.length > 0 && (
                <SectionCard title="Social & Links">
                  {social.map((s) => (
                    <div
                      key={s.label}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "10px 0",
                        borderBottom: "1px solid var(--border)",
                      }}
                    >
                      <span style={{ fontSize: 18 }}>{s.emoji}</span>
                      <div>
                        <div
                          style={{
                            fontSize: 10.5,
                            fontWeight: 600,
                            color: "var(--muted)",
                            textTransform: "uppercase",
                            letterSpacing: "0.7px",
                          }}
                        >
                          {s.label}
                        </div>
                        <div style={{ fontSize: 13.5 }}>{s.value}</div>
                      </div>
                    </div>
                  ))}
                </SectionCard>
              )}
            </>
          )}

          {/* ── Visibility Settings ── */}
          <SectionCard title="Visibility Settings">
            <VisibilityRow
              label="Show on landing page"
              desc="Display profileData publicly"
              checked={profileData.showOnLanding}
              onChange={() => {}}
            />
            <VisibilityRow
              label="Available for freelance"
              desc="Show 'available' badge"
              checked={profileData.availableForFreelance}
              onChange={() => {}}
            />
            <VisibilityRow
              label="Accept contact form"
              desc="Let visitors message you"
              checked={profileData.acceptContactForm}
              onChange={() => {}}
            />
            <VisibilityRow
              label="Show social links"
              desc="Display links on portfolio"
              checked={profileData.showSocialLinks}
              onChange={() => {}}
              last
            />
            <div style={{ marginTop: 14 }}>
              {/* Fixed the link path to match the edit page */}
              <Link href="/dashboard/profile/editprofile">
                <ActionButton
                  label="Edit Settings"
                  variant="secondary"
                  icon={<span>⚙️</span>}
                />
              </Link>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
