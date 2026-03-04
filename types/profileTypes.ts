// ─── PROFILE TYPE ─────────────────────────────────────────────
export interface ProfileData {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  github: string;
  portfolio: string;
  linkedin: string;
  upwork: string;
  isActive: boolean;
  avatar: string;
  createdAt: string;
}

// ─── AUTH USER TYPE ───────────────────────────────────────────
export interface AuthUser {
  name: string;
  email: string;
  role: "admin" | "viewer";
}

export const MOCK_AUTH: AuthUser = {
  name: "Ahmad Sultan",
  email: "admin@ahmadsultan.dev",
  role: "admin",
};

// ─── HELPER: get initials from name ───────────────────────────
export const getInitials = (name: string): string =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "??";

// ─── MOCK PROFILES (seed data) ────────────────────────────────
// Replace with real API calls / DB queries
export const SEED_PROFILES: ProfileData[] = [
  {
    id: "1",
    name: "Ahmad Sultan",
    role: "Full Stack Developer",
    email: "ahmad@example.com",
    phone: "+92 300 1234567",
    location: "Lahore, Pakistan",
    bio: "Passionate developer crafting digital experiences that make a difference. Started coding at 16, turning curiosity into a career. Over 2 years of professional experience.",
    github: "github.com/ahmadsultan",
    portfolio: "ahmadsultan.dev",
    linkedin: "linkedin.com/in/ahmadsultan",
    upwork: "@ahmadsultan",
    isActive: true,
    avatar: "AS",
    createdAt: "2024-01-15",
  },
];

// ─── Profile Function Type ────────────────────────────────────────────────────────────

export interface Profile {
  _id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  location: string;
  bio: string;

  // Files
  avatarUrl: string;
  resumeUrl: string;
  resumeOriginalName: string;

  // Social Links
  github: string;
  portfolio: string;
  linkedin: string;
  upwork: string;

  // Visibility
  showOnLanding: boolean;
  availableForFreelance: boolean;
  acceptContactForm: boolean;
  showSocialLinks: boolean;

  createdAt: string;
  updatedAt: string;
}

// ─── Form Values (create / update) ───────────────────────────────────────────

export interface ProfileFormValues {
  name: string;
  role: string;
  email: string;
  phone?: string;
  location?: string;
  bio?: string;

  github?: string;
  portfolio?: string;
  linkedin?: string;
  upwork?: string;

  showOnLanding?: boolean;
  availableForFreelance?: boolean;
  acceptContactForm?: boolean;
  showSocialLinks?: boolean;

  // File inputs (optional — only when user picks a new file)
  avatar?: File | null;
  resume?: File | null;
}

// ─── API Response Shapes ──────────────────────────────────────────────────────

export interface ProfileResponse {
  success: boolean;
  data: Profile;
}

// ─── Context Shape ────────────────────────────────────────────────────────────

export interface ProfileContextType {
  profileData: Profile | null;
  loading: boolean;
  error: string | null;

  fetchProfile: () => Promise<void>;
  createProfile: (values: ProfileFormValues) => Promise<void>;
  updateProfile: (id: string, values: ProfileFormValues) => Promise<void>;
  deleteProfile: (id: string) => Promise<void>;
  removeAvatar: (id: string) => Promise<void>;
  removeResume: (id: string) => Promise<void>;
}

// -----------------------------------------------
export interface SocialLinks {
  github: string;
  portfolio: string;
  linkedin: string;
  upwork: string;
}

export interface VisibilitySettings {
  showOnLanding: boolean;
  availableForFreelance: boolean;
  acceptContactForm: boolean;
  showSocialLinks: boolean;
}

export interface Profile {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  social: SocialLinks;
  visibility: VisibilitySettings;
  createdAt: string;
  updatedAt: string;
}
export const PROFILE_STORAGE_KEY = "portfolio_profile";
