import * as Yup from 'yup';
import { SkillFormValues, ApproachFormValues } from '../types/skill';

// ── Skill Badge sub-schema ────────────────────────────────────────────────────
const skillBadgeSchema = Yup.object({
  name:  Yup.string().required('Skill name is required'),
  emoji: Yup.string().optional(),
});

// ── Skill Category Validation ─────────────────────────────────────────────────
export const skillValidationSchema = Yup.object({
  categoryName:     Yup.string().max(80).required('Category name is required'),
  categoryEmoji:    Yup.string().required('Emoji is required'),
  categorySubtitle: Yup.string().max(120).required('Subtitle is required'),
  badge:            Yup.string().oneOf(['Primary', 'Support']).required('Badge is required'),
  focus:            Yup.string().max(120).required('Focus is required'),
  order:            Yup.number().min(0).optional(),
  items:            Yup.array().of(skillBadgeSchema).optional(),
});

export const skillInitialValues: SkillFormValues = {
  categoryName:     '',
  categoryEmoji:    '',
  categorySubtitle: '',
  badge:            'Support',
  focus:            'Quality • Speed • Maintainability',
  items:            [],
  order:            0,
};

// ── Workflow step sub-schema ──────────────────────────────────────────────────
const workflowStepSchema = Yup.object({
  step:        Yup.string().required('Step number is required'),
  title:       Yup.string().required('Step title is required'),
  description: Yup.string().required('Step description is required'),
});

// ── Approach Validation ───────────────────────────────────────────────────────
export const approachValidationSchema = Yup.object({
  title:       Yup.string().max(100).required('Approach title is required'),
  description: Yup.string().max(1000).required('Description is required'),
  workflow:    Yup.array().of(workflowStepSchema).optional(),
});

export const approachInitialValues: ApproachFormValues = {
  title: 'Development Philosophy',
  description:
    'Mera maqsad sirf code likhna nahi, balki aise digital products banana hai jo scalable aur user-friendly hon. Main clean architecture aur performance optimization ko priority deta hoon taake aapka business long-term grow kar sake.',
  workflow: [
    { step: '01', title: 'Planning & Architecture',  description: 'Coding se pehle logic aur structure par kaam karna meri priority hai. Isse development fast aur bug-free hoti hai.' },
    { step: '02', title: 'Rapid Development',         description: 'Modern tools (Next.js, Tailwind) ka use kar ke main fast delivery provide karta hoon bina quality par compromise kiye.' },
    { step: '03', title: 'Testing & Launch',          description: 'Har project ko different devices par test kar ke optimize kiya jata hai taake launch ke waqt experience seamless ho.' },
  ],
};
