import {
  ARTICLES,
  CAPABILITIES,
  EXPERIENCE_SUMMARY,
  INDUSTRY_AWARDS,
  PERSONAL_BIO,
  PROJECTS,
  SOCIAL_LINKS,
  SOCIAL_POSTS,
  TEAM_AWARDS,
  TECH_SKILLS,
  TESTIMONIALS,
  TIMELINE,
} from "../data";
import type { PortfolioContent, PortfolioContentOverrides } from "./types";
import { isEmail, safeContactUrl, safePdfUrl, safePhoneNumber, safeWebUrl } from "../lib/security";

export const defaultContent: PortfolioContent = {
  personalBio: PERSONAL_BIO,
  projects: PROJECTS,
  articles: ARTICLES,
  timeline: TIMELINE,
  socialLinks: SOCIAL_LINKS,
  socialPosts: SOCIAL_POSTS,
  experienceSummary: EXPERIENCE_SUMMARY,
  capabilities: CAPABILITIES,
  techSkills: TECH_SKILLS,
  industryAwards: INDUSTRY_AWARDS,
  teamAwards: TEAM_AWARDS,
  testimonials: TESTIMONIALS,
};

export function mergeContent(overrides: PortfolioContentOverrides): PortfolioContent {
  const personalBio = { ...defaultContent.personalBio, ...overrides.personalBio };
  personalBio.email = isEmail(personalBio.email) ? personalBio.email : defaultContent.personalBio.email;
  personalBio.phone = safePhoneNumber(personalBio.phone);
  personalBio.resumeUrl = safePdfUrl(personalBio.resumeUrl);
  personalBio.avatarUrl = safeWebUrl(personalBio.avatarUrl, defaultContent.personalBio.avatarUrl);

  const projects = (overrides.projects ?? defaultContent.projects).map((project) => ({
    ...project,
    imageUrl: safeWebUrl(project.imageUrl),
    hoverImageUrl: safeWebUrl(project.hoverImageUrl),
    videoUrl: safeWebUrl(project.videoUrl),
    videoPosterUrl: safeWebUrl(project.videoPosterUrl),
    pdfUrl: safePdfUrl(project.pdfUrl),
    links: {
      live: safeWebUrl(project.links.live),
      github: safeWebUrl(project.links.github),
      dribbble: safeWebUrl(project.links.dribbble),
      behance: safeWebUrl(project.links.behance),
    },
  }));

  const socialLinks = (overrides.socialLinks ?? defaultContent.socialLinks)
    .filter((link) => typeof link.url === "string" && link.url.trim())
    .map((link) => ({
      ...link,
      url: safeContactUrl(link.url),
    }))
    .filter((link) => link.url);

  const testimonials = (overrides.testimonials ?? defaultContent.testimonials).map((testimonial) => ({
    ...testimonial,
    avatarUrl: safeWebUrl(testimonial.avatarUrl),
  }));

  return {
    personalBio,
    projects,
    articles: (overrides.articles ?? defaultContent.articles).map((article) => ({
      ...article,
      externalUrl: safeWebUrl(article.externalUrl),
    })),
    timeline: overrides.timeline ?? defaultContent.timeline,
    socialLinks,
    socialPosts: (overrides.socialPosts ?? defaultContent.socialPosts).map((post) => ({
      ...post,
      url: safeWebUrl(post.url),
      imageUrl: safeWebUrl(post.imageUrl),
    })),
    experienceSummary: overrides.experienceSummary ?? defaultContent.experienceSummary,
    capabilities: overrides.capabilities ?? defaultContent.capabilities,
    techSkills: overrides.techSkills ?? defaultContent.techSkills,
    industryAwards: overrides.industryAwards ?? defaultContent.industryAwards,
    teamAwards: overrides.teamAwards ?? defaultContent.teamAwards,
    testimonials,
  };
}
