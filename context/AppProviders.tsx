"use client";

import { ReactNode } from "react";
import { AuthProvider } from "./AuthContext";
import { ProfileProvider } from "./ProfileContext";
import { AboutProvider } from "./AboutContext";
import { ProjectProvider } from "./ProjectContext";
import { SkillProvider } from "./SkillContext";
import { ServiceProvider } from "./ServiceContext";
import { ExperienceProvider } from "./ExperienceContext";
import { ContactProvider } from "./ContactContext";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <ProfileProvider>
        <AboutProvider>
          <ProjectProvider>
            <SkillProvider>
              <ServiceProvider>
                <ExperienceProvider>
                  <ContactProvider>{children}</ContactProvider>
                </ExperienceProvider>
              </ServiceProvider>
            </SkillProvider>
          </ProjectProvider>
        </AboutProvider>
      </ProfileProvider>
    </AuthProvider>
  );
}
