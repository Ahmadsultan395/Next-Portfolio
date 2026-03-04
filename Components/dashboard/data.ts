// ─── TYPES ───────────────────────────────────────────────────
export interface Skill {
  name: string;
  level: number;
  color: string;
  emoji: string;
}

export interface Project {
  name: string;
  tech: string;
  status: "live" | "wip" | "plan";
  emoji: string;
  color: string;
  desc?: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  current: boolean;
  desc: string;
  tags: string[];
}

export interface Message {
  sender: string;
  subject: string;
  preview: string;
  time: string;
  unread: boolean;
  color: string;
  init: string;
}

export interface StatItem {
  label: string;
  value: string;
  up: boolean;
  icon: string;
  cls: string;
}

// ─── DATA ────────────────────────────────────────────────────
export const SKILLS_DATA: Record<string, Skill[]> = {
  Frontend: [
    { name: "React / Next.js", level: 92, color: "#00c9b1", emoji: "⚛️" },
    { name: "TypeScript", level: 88, color: "#7c6af5", emoji: "🟦" },
    { name: "Tailwind CSS", level: 90, color: "#38bdf8", emoji: "💨" },
    { name: "GSAP / Framer", level: 80, color: "#f5a623", emoji: "✨" },
  ],
  Backend: [
    { name: "Node.js / Express", level: 85, color: "#00c9b1", emoji: "🟩" },
    { name: "PostgreSQL / MongoDB", level: 78, color: "#7c6af5", emoji: "🗄️" },
    { name: "REST & GraphQL APIs", level: 82, color: "#f5a623", emoji: "🔗" },
    { name: "Prisma / Drizzle ORM", level: 75, color: "#ff4d6d", emoji: "🔮" },
  ],
  Tools: [
    { name: "Git & GitHub", level: 93, color: "#00c9b1", emoji: "🐙" },
    { name: "Docker / CI/CD", level: 70, color: "#7c6af5", emoji: "🐳" },
    { name: "Figma / UI Design", level: 77, color: "#f5a623", emoji: "🎨" },
  ],
};

export const PROJECTS_DATA: Project[] = [
  {
    name: "E-Commerce Platform",
    tech: "Next.js · Stripe · PostgreSQL",
    status: "live",
    emoji: "🛍️",
    color: "#00c9b1",
    desc: "Full-featured online store with cart, payments and admin panel.",
  },
  {
    name: "SaaS Dashboard",
    tech: "React · Node · MongoDB",
    status: "live",
    emoji: "📊",
    color: "#7c6af5",
    desc: "Analytics dashboard for B2B SaaS product.",
  },
  {
    name: "AI Chat Application",
    tech: "Next.js · OpenAI · Prisma",
    status: "live",
    emoji: "🤖",
    color: "#f5a623",
    desc: "Real-time AI chatbot with streaming responses.",
  },
  {
    name: "Real Estate Finder",
    tech: "React · Maps API · Express",
    status: "wip",
    emoji: "🏠",
    color: "#38bdf8",
    desc: "Property listing app with map integration.",
  },
  {
    name: "Portfolio v3 Redesign",
    tech: "Next.js · Framer · GSAP",
    status: "wip",
    emoji: "✨",
    color: "#ff4d6d",
    desc: "Current portfolio redesign with advanced animations.",
  },
  {
    name: "Mobile Banking App",
    tech: "React Native · Node.js",
    status: "plan",
    emoji: "💳",
    color: "#22d3a5",
    desc: "Cross-platform mobile banking application.",
  },
];

export const EXPERIENCE_DATA: Experience[] = [
  {
    company: "TechCorp Digital",
    role: "Senior Frontend Developer",
    period: "Jan 2024 – Present",
    current: true,
    desc: "Leading frontend architecture for enterprise SaaS products. Mentoring junior developers and driving performance optimization initiatives.",
    tags: ["Next.js", "TypeScript", "AWS", "GraphQL"],
  },
  {
    company: "StartupXYZ",
    role: "Full Stack Developer",
    period: "Jun 2022 – Dec 2023",
    current: false,
    desc: "Built and maintained multiple client-facing web applications from scratch. Worked closely with design and product teams.",
    tags: ["React", "Node.js", "MongoDB", "Docker"],
  },
  {
    company: "Freelance",
    role: "Web Developer",
    period: "Jan 2022 – Jun 2022",
    current: false,
    desc: "Delivered 10+ custom websites and web apps for clients across different industries.",
    tags: ["React", "WordPress", "PHP", "Figma"],
  },
];

export const MESSAGES_DATA: Message[] = [
  {
    sender: "Sarah Johnson",
    subject: "Project collaboration inquiry",
    preview:
      "Hi Ahmad, I loved your portfolio! I wanted to reach out about a potential project...",
    time: "2h ago",
    unread: true,
    color: "#00c9b1",
    init: "SJ",
  },
  {
    sender: "Mike Chen",
    subject: "Freelance opportunity",
    preview:
      "We're looking for a Next.js developer for a 3-month contract engagement...",
    time: "5h ago",
    unread: true,
    color: "#7c6af5",
    init: "MC",
  },
  {
    sender: "Aisha Malik",
    subject: "Re: Job application",
    preview:
      "Thank you for applying! We'd love to schedule an interview at your earliest...",
    time: "1d ago",
    unread: true,
    color: "#f5a623",
    init: "AM",
  },
  {
    sender: "David Lee",
    subject: "Website feedback",
    preview:
      "Just browsed through your work — incredibly polished and professional...",
    time: "2d ago",
    unread: false,
    color: "#38bdf8",
    init: "DL",
  },
  {
    sender: "Priya Nair",
    subject: "Mentorship request",
    preview:
      "I'm a student learning React and would love some guidance on getting started...",
    time: "3d ago",
    unread: false,
    color: "#ff4d6d",
    init: "PN",
  },
];

// export const STATS_DATA: StatItem[] = [
//   {
//     label: "Total Projects",
//     value: "50+",
//     change: "+12%",
//     up: true,
//     icon: "folder",
//     cls: "s1",
//   },
//   {
//     label: "Happy Clients",
//     value: "100+",
//     change: "+8%",
//     up: true,
//     icon: "star",
//     cls: "s2",
//   },
//   {
//     label: "Years Exp",
//     value: "2+",
//     change: "+1yr",
//     up: true,
//     icon: "briefcase",
//     cls: "s3",
//   },
//   {
//     label: "Messages",
//     value: "3",
//     change: "3 new",
//     up: false,
//     icon: "mail",
//     cls: "s4",
//   },
// ];

export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
export const ACTIVITY_VALS = [40, 65, 30, 80, 55, 90, 45, 70, 88, 60, 75, 95];

export const TECH_STACK = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "MongoDB",
  "Prisma",
  "Tailwind",
  "GSAP",
  "Docker",
  "AWS",
  "Figma",
  "Git",
  "GraphQL",
];

export interface NavItemType {
  id: string;
  label: string;
  icon: string;
  href: string;
  section: "portfolio" | "system";
  badge?: number; // optional so we can add it dynamically
}

export const NAV_ITEMS: NavItemType[] = [
  {
    id: "overview",
    label: "Overview",
    icon: "dashboard",
    href: "/dashboard",
    section: "portfolio",
  },
  {
    id: "profile",
    label: "Profile",
    icon: "user",
    href: "/dashboard/profile",
    section: "portfolio",
  },
  {
    id: "about",
    label: "About",
    icon: "user",
    href: "/dashboard/about",
    section: "portfolio",
  },
  {
    id: "skills",
    label: "Skills",
    icon: "chart",
    href: "/dashboard/skill",
    section: "portfolio",
  },
  {
    id: "projects",
    label: "Projects",
    icon: "folder",
    href: "/dashboard/projects",
    section: "portfolio",
  },
  {
    id: "experience",
    label: "Experience",
    icon: "briefcase",
    href: "/dashboard/experience",
    section: "portfolio",
  },
  {
    id: "services",
    label: "Services",
    icon: "briefcase",
    href: "/dashboard/services",
    section: "portfolio",
  },
  {
    id: "contact",
    label: "Contact",
    icon: "briefcase",
    href: "/dashboard/contact",
    section: "portfolio",
  },
  {
    id: "messages",
    label: "Messages",
    icon: "mail",
    href: "/dashboard/messages",
    section: "system",
    badge: 0,
  },
  {
    id: "settings",
    label: "Settings",
    icon: "settings",
    href: "/dashboard/settings",
    section: "system",
  },
] as const;
