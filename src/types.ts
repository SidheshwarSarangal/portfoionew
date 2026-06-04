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
