import {
  ARTICLES,
  CAPABILITIES,
  EXPERIENCE_SUMMARY,
  INDUSTRY_AWARDS,
  PERSONAL_BIO,
  PROJECTS,
  SOCIAL_LINKS,
  TEAM_AWARDS,
  TECH_SKILLS,
  TESTIMONIALS,
  TIMELINE,
} from "../data";
import type { PortfolioContent, PortfolioContentOverrides } from "./types";

export const defaultContent: PortfolioContent = {
  personalBio: PERSONAL_BIO,
  projects: PROJECTS,
  articles: ARTICLES,
  timeline: TIMELINE,
  socialLinks: SOCIAL_LINKS,
  experienceSummary: EXPERIENCE_SUMMARY,
  capabilities: CAPABILITIES,
  techSkills: TECH_SKILLS,
  industryAwards: INDUSTRY_AWARDS,
  teamAwards: TEAM_AWARDS,
  testimonials: TESTIMONIALS,
};

export function mergeContent(overrides: PortfolioContentOverrides): PortfolioContent {
  return {
    personalBio: { ...defaultContent.personalBio, ...overrides.personalBio },
    projects: overrides.projects ?? defaultContent.projects,
    articles: overrides.articles ?? defaultContent.articles,
    timeline: overrides.timeline ?? defaultContent.timeline,
    socialLinks: overrides.socialLinks ?? defaultContent.socialLinks,
    experienceSummary: overrides.experienceSummary ?? defaultContent.experienceSummary,
    capabilities: overrides.capabilities ?? defaultContent.capabilities,
    techSkills: overrides.techSkills ?? defaultContent.techSkills,
    industryAwards: overrides.industryAwards ?? defaultContent.industryAwards,
    teamAwards: overrides.teamAwards ?? defaultContent.teamAwards,
    testimonials: overrides.testimonials ?? defaultContent.testimonials,
  };
}
