export type Locale = 'en' | 'fa' | 'ar';

export interface NavItem {
  id: string;
  label: Record<Locale, string>;
}

export interface Project {
  id: string;
  name: string;
  description: Record<Locale, string>;
  architecture: Record<Locale, string>;
  techStack: string[];
  features: string[];
  category: 'backend' | 'frontend' | 'experimental';
  github?: string;
  liveUrl?: string;
  coverGradient: string;
}

export interface Experience {
  id: string;
  company: string;
  companyLocal: string;
  role: Record<Locale, string>;
  period: string;
  location: string;
  description: Record<Locale, string>;
  achievements: Record<Locale, string[]>;
  techStack: string[];
}

export interface SkillCategory {
  id: string;
  name: Record<Locale, string>;
  icon: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  level: number; // 0–100
}

export interface SoftSkill {
  id: string;
  name: Record<Locale, string>;
  icon: string;
  level: number;
  description: Record<Locale, string>;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  label: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface SectionConfig {
  id: string;
  label: Record<Locale, string>;
}