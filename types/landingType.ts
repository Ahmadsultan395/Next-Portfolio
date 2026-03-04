import { IconType } from "react-icons";

export interface SectionHeaderProps {
  mark?: string;
  abs?: string;
  t1?: string;
  t2?: string;
  des?: string;
  icon?: IconType | undefined;
}

export type Project = {
  title: string;
  short: string;
  category:
    | "All"
    | "Frontend"
    | "Full Stack"
    | "UI"
    | "Realtime"
    | "E-commerce";
  image: string; // /projects/xxx.png
  imageUrl: string;
  tags: string[];
  highlights: string[];
  live?: string;
  github?: string;
  featured?: boolean;
};

export type Accent = "hero" | "purple" | "cyan" | "amber" | "pink";

export type Service = {
  title: string;
  subtitle: string;
  icon: React.ComponentType<any>;
  accent: Accent;
  points: string[];
  stack: string[];
  badge?: string;
};

export type AccentStyle = {
  glow: string;
  border: string;
  iconBg: string;
  title: string;
  chip: string;
  shadow: string;
};

export type ProcessStep = {
  title: string;
  desc: string;
};
