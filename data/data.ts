// About Section
import { Accent, AccentStyle, ProcessStep, Service } from "@/types/landingType";
import {
  // About
  Code2,
  Palette,
  Rocket,
  Zap,
  // Skills
  Layout,
  Flame,
  Wrench,
  Database,
  Boxes,

  // Services
  // Code2,
  // Layout,
  // Database,
  // Flame,
  PlugZap,
  // Rocket,
  Check,
  ArrowRight,
  MessagesSquare,
} from "lucide-react";
export const skills = [
  { name: "Frontend Development", level: 95, icon: Code2 },
  { name: "UI/UX Design", level: 90, icon: Palette },
  { name: "Backend Development", level: 85, icon: Rocket },
  { name: "Problem Solving", level: 92, icon: Zap },
];

//HERO SECTION----------------------------------
export const fallbackRoles = [
  "Full Stack Developer",
  "UI/UX Enthusiast",
  "React/Next.js Expert",
  "Problem Solver",
  "Tech Innovator",
];

// Skills Section
type Category = {
  title: string;
  subtitle: string;
  icon: any;
  accent: "hero" | "purple" | "cyan" | "amber" | "pink";
  items: string[];
};

export const categories: Category[] = [
  {
    title: "Frontend",
    subtitle: "UI, components, styling & performance",
    icon: Layout,
    accent: "hero",
    items: [
      "Next.js",
      "React.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "Material UI",
      "jQuery",
      "HTML5",
      "CSS3",
      "SCSS",
      "Sass",
      "API Integration",
    ],
  },
  {
    title: "Firebase",
    subtitle: "Auth, database & serverless backend",
    icon: Flame,
    accent: "amber",
    items: [
      "Authentication",
      "Firestore / Realtime Database",
      "Cloud Functions",
      "Firebase Hosting",
    ],
  },
  {
    title: "Libraries / Frameworks",
    subtitle: "State, data fetching, routing & realtime",
    icon: Boxes,
    accent: "purple",
    items: [
      "Redux",
      "Axios",
      "React Router",
      "socket.io",
      "PayPal Payment Integration",
    ],
  },
  {
    title: "Tools",
    subtitle: "Version control, testing & deployment",
    icon: Wrench,
    accent: "cyan",
    items: ["GitHub", "Postman", "Vercel", "Netlify"],
  },
  {
    title: "Basic Backend",
    subtitle: "APIs, database modeling & server logic",
    icon: Database,
    accent: "pink",
    items: ["Express.js", "MongoDB", "Mongoose"],
  },
];

export const stillsAccentMap = {
  hero: {
    glow: "from-[var(--hero-image)]/18 via-purple-500/12 to-transparent",
    chip: "border-[var(--hero-image)]/25 bg-[var(--hero-image)]/10 text-[var(--foreground)] hover:bg-[var(--hero-image)]/15",
    icon: "from-[var(--hero-image)] to-purple-500",
    border: "border-[var(--hero-image)]/20 hover:border-[var(--hero-image)]/40",
    title: "text-[var(--hero-image)]",
    shadow: "var(--hero-image)",
  },
  purple: {
    glow: "from-purple-500/18 via-fuchsia-500/12 to-transparent",
    chip: "border-purple-500/25 bg-purple-500/10 text-[var(--foreground)] hover:bg-purple-500/15",
    icon: "from-purple-500 to-fuchsia-500",
    border: "border-purple-500/20 hover:border-purple-500/40",
    title: "text-purple-300",
    shadow: "rgb(196 181 253)",
  },
  cyan: {
    glow: "from-cyan-400/18 via-sky-500/12 to-transparent",
    chip: "border-cyan-400/25 bg-cyan-400/10 text-[var(--foreground)] hover:bg-cyan-400/15",
    icon: "from-cyan-400 to-sky-500",
    border: "border-cyan-400/20 hover:border-cyan-400/40",
    title: "text-cyan-300",
    shadow: "rgb(103 232 249)",
  },
  amber: {
    glow: "from-amber-400/18 via-orange-500/12 to-transparent",
    chip: "border-amber-400/25 bg-amber-400/10 text-[var(--foreground)] hover:bg-amber-400/15",
    icon: "from-amber-400 to-orange-500",
    border: "border-amber-400/20 hover:border-amber-400/40",
    title: "text-amber-300",
    shadow: "rgb(252 211 77)",
  },
  pink: {
    glow: "from-pink-500/18 via-rose-500/12 to-transparent",
    chip: "border-pink-500/25 bg-pink-500/10 text-[var(--foreground)] hover:bg-pink-500/15",
    icon: "from-pink-500 to-rose-500",
    border: "border-pink-500/20 hover:border-pink-500/40",
    title: "text-pink-300",
    shadow: "rgb(249 168 212)",
  },
};

// Projects
export const projectsData = [
  {
    title: "Portfolio Website",
    short:
      "Modern animated portfolio with Next.js, Tailwind and smooth scroll-based interactions.",
    category: "Frontend",
    image: "/images/project/thumb1.jpg",
    tags: ["Next.js", "TypeScript", "Tailwind", "GSAP"],
    highlights: ["Responsive UI", "Smooth animations", "Clean structure"],
    live: "https://your-live-link.com",
    github: "https://github.com/your-username/your-repo",
    featured: true,
  },
  {
    title: "E-commerce Store",
    short:
      "Product listing, cart, checkout flow and payment integration with a fast UI.",
    category: "E-commerce",
    image: "/images/project/thumb2.jpg",
    tags: ["React", "Redux", "PayPal", "API Integration"],
    highlights: ["Cart + Checkout", "Payment Integration", "Optimized UX"],
    live: "https://your-live-link.com",
  },
  {
    title: "Realtime Chat App",
    short:
      "Realtime messaging experience with authentication, live updates and clean UI.",
    category: "Realtime",
    image: "/images/project/thumb3.jpg",
    tags: ["React", "socket.io", "Firebase Auth", "Firestore"],
    highlights: ["Realtime messages", "Auth flow", "Fast updates"],
    github: "https://github.com/your-username/your-repo",
  },
  {
    title: "Admin Dashboard",
    short:
      "Analytics dashboard with reusable components, charts-ready structure and filtering.",
    category: "UI",
    image: "/images/project/thumb4.jpg",
    tags: ["Next.js", "Tailwind", "Material UI", "Axios"],
    highlights: ["Reusable UI", "Tables/Filters", "Scalable layout"],
  },
  {
    title: "REST API (Basic Backend)",
    short:
      "Express + MongoDB backend with clean routes, models and validations (Mongoose).",
    category: "Full Stack",
    image: "/images/project/thumb1.jpg",
    tags: ["Express.js", "MongoDB", "Mongoose", "Postman"],
    highlights: ["CRUD APIs", "Schema modeling", "Clean structure"],
    github: "https://github.com/your-username/your-repo",
  },
];

// Services Section
export const servicesAccentMap: Record<Accent, AccentStyle> = {
  hero: {
    glow: "from-[var(--hero-image)]/18 via-purple-500/10 to-transparent",
    border: "border-[var(--hero-image)]/20 hover:border-[var(--hero-image)]/40",
    iconBg: "from-[var(--hero-image)] to-purple-500",
    title: "text-[var(--hero-image)]",
    chip: "border-[var(--hero-image)]/25 bg-[var(--hero-image)]/10",
    shadow: "var(--hero-image)",
  },
  purple: {
    glow: "from-purple-500/18 via-fuchsia-500/10 to-transparent",
    border: "border-purple-500/20 hover:border-purple-500/40",
    iconBg: "from-purple-500 to-fuchsia-500",
    title: "text-purple-300",
    chip: "border-purple-500/25 bg-purple-500/10",
    shadow: "rgb(196 181 253)",
  },
  cyan: {
    glow: "from-cyan-400/18 via-sky-500/10 to-transparent",
    border: "border-cyan-400/20 hover:border-cyan-400/40",
    iconBg: "from-cyan-400 to-sky-500",
    title: "text-cyan-300",
    chip: "border-cyan-400/25 bg-cyan-400/10",
    shadow: "rgb(103 232 249)",
  },
  amber: {
    glow: "from-amber-400/18 via-orange-500/10 to-transparent",
    border: "border-amber-400/20 hover:border-amber-400/40",
    iconBg: "from-amber-400 to-orange-500",
    title: "text-amber-300",
    chip: "border-amber-400/25 bg-amber-400/10",
    shadow: "rgb(252 211 77)",
  },
  pink: {
    glow: "from-pink-500/18 via-rose-500/10 to-transparent",
    border: "border-pink-500/20 hover:border-pink-500/40",
    iconBg: "from-pink-500 to-rose-500",
    title: "text-pink-300",
    chip: "border-pink-500/25 bg-pink-500/10",
    shadow: "rgb(249 168 212)",
  },
};

export const services: Service[] = [
  {
    title: "Frontend / UI Development",
    subtitle: "Pixel-perfect UI, responsive layouts, smooth animations",
    icon: Layout,
    accent: "hero",
    badge: "Most Requested",
    points: [
      "Modern UI with clean component structure",
      "Responsive + cross-browser support",
      "Performance optimizations (UX + speed)",
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind", "MUI"],
  },
  {
    title: "Full-Stack Web Apps",
    subtitle: "End-to-end apps: frontend + backend + deployment",
    icon: Code2,
    accent: "purple",
    points: [
      "Scalable architecture & reusable patterns",
      "Secure auth flows + protected routes",
      "Production-ready build & deployment",
    ],
    stack: ["Next.js", "Express", "MongoDB", "Mongoose", "Firebase"],
  },
  {
    title: "API Integration",
    subtitle: "3rd party APIs + custom endpoints integration",
    icon: PlugZap,
    accent: "cyan",
    points: [
      "REST APIs integration (Axios / fetch)",
      "Error handling + loaders + UX states",
      "Postman-tested & clean data flow",
    ],
    stack: ["Axios", "REST APIs", "Postman", "React Query (optional)"],
  },
  {
    title: "Firebase Development",
    subtitle: "Auth, Firestore, Functions, realtime data",
    icon: Flame,
    accent: "amber",
    points: [
      "Firebase Auth (email, social, guards)",
      "Firestore structure + security rules",
      "Cloud Functions for serverless logic",
    ],
    stack: ["Firebase Auth", "Firestore", "Cloud Functions", "Hosting"],
  },
  {
    title: "Realtime Features",
    subtitle: "Chat, live updates, notifications (socket.io etc.)",
    icon: MessagesSquare,
    accent: "pink",
    points: [
      "socket.io based realtime messaging",
      "Online/offline states + typing status",
      "Optimized updates & smooth UI",
    ],
    stack: ["socket.io", "React", "Node/Express", "Firebase (optional)"],
  },
  {
    title: "Backend (Basic)",
    subtitle: "CRUD APIs, database modeling, validations",
    icon: Database,
    accent: "hero",
    points: [
      "Express routes/controllers structure",
      "MongoDB schema modeling (Mongoose)",
      "Clean code + maintainable patterns",
    ],
    stack: ["Express.js", "MongoDB", "Mongoose", "JWT (optional)"],
  },
];

export const processSteps: ProcessStep[] = [
  { title: "Discussion", desc: "Requirements + scope + timeline finalize" },
  { title: "Design / UI", desc: "Wireframe / UI plan + components breakdown" },
  {
    title: "Development",
    desc: "Clean code, reusable components, integrations",
  },
  { title: "Deploy", desc: "Vercel/Netlify + testing + handover" },
];

// Experience
export const experience = [
  {
    year: "2023 - Present",
    role: "Senior Full Stack Developer",
    company: "Tech Solutions Inc.",
    desc: "Leading development of enterprise web applications using Next.js and Node.js. Mentoring junior developers and implementing best practices.",
  },
  {
    year: "2022 - 2023",
    role: "Full Stack Developer",
    company: "Digital Agency Co.",
    desc: "Built modern responsive web apps for clients across various industries. Specialized in React ecosystem and RESTful API development.",
  },
  {
    year: "2021 - 2022",
    role: "Frontend Developer",
    company: "Startup Hub",
    desc: "Created interactive user interfaces with React and TypeScript. Collaborated with designers to implement pixel-perfect UI components.",
  },
];
