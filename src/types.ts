export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  roles: string[];
  year: string;
  technologies: string[];
  accentColor: string;
  imageUrl?: string;
  hoverImageUrl?: string;
  pdfUrl?: string;
  videoUrl?: string;
  videoPosterUrl?: string;
  contributors?: string[];
  associatedWith?: string;
  startedAt?: string;
  completedAt?: string;
  status?: string;
  links: {
    live?: string;
    github?: string;
    dribbble?: string;
    behance?: string;
  };
  details: {
    problem: string;
    solution: string;
    outcomes: string[];
    technologyRoles?: Array<{
      technology: string;
      purpose: string;
    }>;
    architecture?: string[];
    highlights?: string[];
  };
  featured: boolean;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  category: string;
  publishedAt: string;
  readTime: string;
  summary: string;
  content: string;
  externalUrl?: string;
}

export interface TimelineEvent {
  id: string;
  period: string;
  role: string;
  organization: string;
  location: string;
  description: string;
  bulletPoints?: string[];
  skills?: string[];
  logoText?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  username: string;
  iconName: string;
}

export interface SocialPost {
  id: string;
  platform: string;
  title: string;
  summary: string;
  publishedAt: string;
  url?: string;
  imageUrl?: string;
}
