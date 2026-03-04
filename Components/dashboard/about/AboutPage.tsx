"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useAbout } from "@/context/AboutContext";
import PageLoader from "@/Components/common/PageLoader";
import { Card, SectionTitle } from "../common/Widgets";
import DeleteConfirm from "../common/DeleteConfirm";

export default function AboutPage() {
  const { about, loading, deleteAbout } = useAbout();
  const [deleteone, setDeletOnce] = useState<Boolean>(false);

  if (loading) return <PageLoader />;

  if (!about)
    return (
      <Card>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "60px 24px",
            gap: 14,
          }}
        >
          <div style={{ fontSize: 48 }}>📝</div>
          <div style={{ fontSize: 16, fontWeight: 700 }}>
            No About section yet
          </div>
          <div
            style={{
              fontSize: 13.5,
              color: "var(--muted)",
              maxWidth: 320,
              textAlign: "center",
            }}
          >
            Create your About section to tell visitors your story.
          </div>
          <Link href="/dashboard/about/addabout">
            <button
              style={{
                marginTop: 8,
                padding: "9px 20px",
                background: "var(--accent)",
                color: "var(--bg)",
                border: "none",
                borderRadius: "var(--radius-sm)",
                fontWeight: 600,
                cursor: "pointer",
                fontSize: 13,
              }}
            >
              + Create About
            </button>
          </Link>
        </div>
      </Card>
    );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* ── Header Actions ── */}
      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
        <Link href="/dashboard/about/editabout">
          <button
            style={{
              padding: "8px 18px",
              background: "var(--surface2)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-sm)",
              cursor: "pointer",
              fontSize: 12.5,
              fontWeight: 600,
              color: "var(--fg)",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            ✏️ Edit
          </button>
        </Link>
        <button
          onClick={() => setDeletOnce(true)}
          style={{
            padding: "8px 18px",
            background: "var(--danger, #ef4444)",
            color: "#fff",
            border: "none",
            borderRadius: "var(--radius-sm)",
            cursor: "pointer",
            fontSize: 12.5,
            fontWeight: 600,
          }}
        >
          🗑 Delete
        </button>

        {deleteone && (
          <DeleteConfirm
            onConfirm={() => {
              deleteAbout(about._id);
            }}
            onCancel={() => setDeletOnce(false)}
          />
        )}
      </div>

      {/* ── Journey + What I Do ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: 20,
        }}
      >
        <Card>
          <SectionTitle>🚀 {about.journeyTitle}</SectionTitle>
          <p
            style={{
              fontSize: 13.5,
              color: "var(--muted)",
              lineHeight: 1.7,
              whiteSpace: "pre-line",
            }}
          >
            {about.journeyText}
          </p>
        </Card>
        <Card>
          <SectionTitle>🎯 {about.whatIDoTitle}</SectionTitle>
          <p
            style={{
              fontSize: 13.5,
              color: "var(--muted)",
              lineHeight: 1.7,
              whiteSpace: "pre-line",
            }}
          >
            {about.whatIDoText}
          </p>
        </Card>
      </div>

      {/* ── Skills ── */}
      {about.skills.length > 0 && (
        <Card>
          <SectionTitle>⚡ Core Skills</SectionTitle>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
              gap: 18,
            }}
          >
            {about.skills.map((skill: any, i: number) => (
              <div key={i}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 6,
                  }}
                >
                  <span style={{ fontSize: 13, fontWeight: 500 }}>
                    {skill.label}
                  </span>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: "var(--accent)",
                    }}
                  >
                    {skill.percentage}%
                  </span>
                </div>
                <div
                  style={{
                    height: 6,
                    background: "var(--surface3)",
                    borderRadius: 99,
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${skill.percentage}%`,
                      background: "var(--accent)",
                      borderRadius: 99,
                      transition: "width .6s ease",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* ── Stats ── */}
      {about?.stats?.length > 0 && (
        <Card>
          <SectionTitle>📊 {about.beyondTitle}</SectionTitle>
          {about.beyondSubtitle && (
            <p
              style={{
                fontSize: 12.5,
                color: "var(--muted)",
                marginTop: -10,
                marginBottom: 18,
              }}
            >
              {about.beyondSubtitle}
            </p>
          )}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: 16,
            }}
          >
            {about.stats.map((stat: any, i: number) => (
              <div
                key={i}
                style={{
                  textAlign: "center",
                  padding: 16,
                  background: "var(--surface2)",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--border)",
                }}
              >
                <div
                  style={{
                    fontSize: 28,
                    fontWeight: 800,
                    color: "var(--accent)",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* ── Interests ── */}
      {about.interests.length > 0 && (
        <Card>
          <SectionTitle>❤️ What I Love</SectionTitle>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 14,
            }}
          >
            {about.interests.map((item: any, i: number) => (
              <div
                key={i}
                style={{
                  padding: 16,
                  background: "var(--surface2)",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--border)",
                }}
              >
                <div style={{ fontSize: 24, marginBottom: 8 }}>
                  {item.emoji}
                </div>
                <div
                  style={{ fontSize: 13.5, fontWeight: 600, marginBottom: 4 }}
                >
                  {item.title}
                </div>
                <div
                  style={{
                    fontSize: 12.5,
                    color: "var(--muted)",
                    lineHeight: 1.5,
                  }}
                >
                  {item.description}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* ── Fun Facts ── */}
      {about.funFacts.length > 0 && (
        <Card>
          <SectionTitle>🎉 Fun Facts</SectionTitle>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
              gap: 10,
            }}
          >
            {about.funFacts.map((fact: any, i: number) => (
              <div
                key={i}
                style={{
                  padding: "10px 14px",
                  background: "var(--surface2)",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--border)",
                  fontSize: 13.5,
                }}
              >
                {fact.text}
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
