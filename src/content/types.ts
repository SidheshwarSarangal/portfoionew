import type { Article, Project, SocialLink, SocialPost, TimelineEvent } from "../types";

export interface PersonalBio {
  name: string;
  fullName: string;
  title: string;
  subtitle: string;
  location: string;
  email: string;
  phone?: string;
  resumeUrl?: string;
  avatarUrl: string;
  about: string;
}

export interface ExperienceSummaryItem {
  period: string;
  role: string;
  org: string;
}

export interface Capability {
  num: string;
  title: string;
  items: string[];
}

export interface TechSkill {
  name: string;
  level: number;
  color: string;
}

export interface Award {
  award: string;
  year: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  date?: string;
  avatarUrl: string;
  avatarCrop?: {
    x: number;
    y: number;
    size: number;
    sourceWidth: number;
    sourceHeight: number;
  };
}

export interface PortfolioContent {
  personalBio: PersonalBio;
  projects: Project[];
  articles: Article[];
  timeline: TimelineEvent[];
  socialLinks: SocialLink[];
  socialPosts: SocialPost[];
  experienceSummary: ExperienceSummaryItem[];
  capabilities: Capability[];
  techSkills: TechSkill[];
  industryAwards: Award[];
  teamAwards: Award[];
  testimonials: Testimonial[];
}

export type PortfolioContentOverrides = Partial<Omit<PortfolioContent, "personalBio">> & {
  personalBio?: Partial<PersonalBio>;
};

export interface ContentProvider {
  readonly name: string;
  load(signal?: AbortSignal): Promise<PortfolioContentOverrides>;
}
