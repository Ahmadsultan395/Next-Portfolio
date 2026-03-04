import * as Yup from 'yup';
import { AboutFormValues } from '../types/about';

// ── Sub-schemas ───────────────────────────────────────────────────────────────

const skillSchema = Yup.object({
  label:      Yup.string().required('Skill label is required'),
  percentage: Yup.number().min(0).max(100).required('Percentage required'),
});

const statSchema = Yup.object({
  value: Yup.string().required('Stat value is required'),
  label: Yup.string().required('Stat label is required'),
});

const interestSchema = Yup.object({
  emoji:       Yup.string().required('Emoji is required'),
  title:       Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
});

const funFactSchema = Yup.object({
  text: Yup.string().required('Fun fact text is required'),
});

// ── Main Validation Schema ────────────────────────────────────────────────────

export const aboutValidationSchema = Yup.object({
  journeyTitle: Yup.string()
    .max(100, 'Too long')
    .required('Journey title is required'),

  journeyText: Yup.string()
    .max(1000, 'Max 1000 characters')
    .required('Journey text is required'),

  whatIDoTitle: Yup.string()
    .max(100, 'Too long')
    .required('What I Do title is required'),

  whatIDoText: Yup.string()
    .max(1000, 'Max 1000 characters')
    .required('What I Do text is required'),

  beyondTitle:    Yup.string().max(100).optional(),
  beyondSubtitle: Yup.string().max(200).optional(),

  skills:    Yup.array().of(skillSchema).optional(),
  stats:     Yup.array().of(statSchema).optional(),
  interests: Yup.array().of(interestSchema).optional(),
  funFacts:  Yup.array().of(funFactSchema).optional(),
});

// ── Initial Values (pre-filled from your content) ────────────────────────────

export const aboutInitialValues: AboutFormValues = {
  journeyTitle: 'My Journey',
  journeyText:
    "Started coding at 16, turning curiosity into a career. With over 2 years of professional experience, I've helped businesses transform their digital presence through clean code and innovative solutions.\nI believe in writing code that not only works but is maintainable, scalable, and elegant.",

  whatIDoTitle: 'What I Do',
  whatIDoText:
    'I specialize in building full-stack web applications using modern technologies like Next.js, React, and TypeScript.\nFrom concept to deployment, I handle the entire development lifecycle, ensuring pixel-perfect designs meet robust backend architecture.',

  beyondTitle:    'Beyond The Code',
  beyondSubtitle: 'Numbers that define my journey aur cheezain jo mujhe inspire karti hain.',

  skills: [
    { label: 'Frontend Development', percentage: 95 },
    { label: 'UI/UX Design',         percentage: 90 },
    { label: 'Backend Development',  percentage: 85 },
    { label: 'Problem Solving',      percentage: 92 },
  ],

  stats: [
    { value: '2+',   label: 'Years Experience' },
    { value: '30+',  label: 'Projects Completed' },
    { value: '500+', label: 'Cups of Coffee ☕' },
    { value: '1000+',label: 'GitHub Commits' },
  ],

  interests: [
    { emoji: '🎵', title: 'Music Lover',  description: 'Lo-fi beats while coding — best combination ever!' },
    { emoji: '🎮', title: 'Gaming',       description: 'FPS aur strategy games mein thora break lena zaroori hai.' },
    { emoji: '📚', title: 'Reading',      description: 'Tech blogs, development articles, aur kabhi kabhi fiction bhi.' },
    { emoji: '📸', title: 'Photography',  description: 'Capturing moments and beautiful landscapes in free time.' },
    { emoji: '🚴', title: 'Cycling',      description: 'Weekend rides to clear the mind and stay active.' },
    { emoji: '💻', title: 'Open Source',  description: 'Contributing to community projects and learning together.' },
  ],

  funFacts: [
    { text: 'My code editor: VS Code with 20+ extensions 🛠️' },
    { text: 'Started coding at 16 with a basic HTML tutorial 🚀' },
    { text: 'Can debug code better after a good cup of chai ☕' },
    { text: 'Favorite IDE theme: Dark mode, always! 🌙' },
    { text: 'Learned React by building 10 todo apps first 😄' },
    { text: 'Night owl — most productive after 10 PM 🦉' },
    { text: 'Stack Overflow saved me countless times 🙏' },
    { text: 'Dream project: Build a SaaS used by millions 💭' },
  ],
};
