import { useEffect } from "react";
import type { Article, Project, SocialLink } from "../types";
import type { PersonalBio } from "../content/types";

interface SeoInput {
  personalBio: PersonalBio;
  socialLinks: SocialLink[];
  project: Project | null;
  article: Article | null;
}

function upsertMeta(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([key, value]) => element?.setAttribute(key, value));
}

function upsertLink(rel: string, href: string) {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement("link");
    element.rel = rel;
    document.head.appendChild(element);
  }
  element.href = href;
}

function absoluteUrl(pathOrUrl: string) {
  const configuredSiteUrl = import.meta.env.VITE_SITE_URL;
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  if (!configuredSiteUrl) return new URL(pathOrUrl, window.location.origin).toString();

  const siteBase = configuredSiteUrl.replace(/\/$/, "");
  if (pathOrUrl === "/") return `${siteBase}/`;
  if (pathOrUrl.startsWith("/")) return new URL(pathOrUrl, new URL(siteBase).origin).toString();
  return new URL(pathOrUrl, `${siteBase}/`).toString();
}

function toIsoDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
}

export function useSeoMetadata({ personalBio, socialLinks, project, article }: SeoInput) {
  useEffect(() => {
    const isProject = Boolean(project);
    const isArticle = Boolean(article);
    const title = project
      ? `${project.title} — ${personalBio.fullName}`
      : article
        ? `${article.title} — ${personalBio.fullName}`
        : `${personalBio.fullName} — ${personalBio.title}`;
    const description = project?.description || article?.summary || personalBio.about;
    const canonical = absoluteUrl(window.location.pathname);
    const image = absoluteUrl(project?.imageUrl || personalBio.avatarUrl || `${import.meta.env.BASE_URL}favicon.svg`);

    document.title = title;
    upsertMeta('meta[name="description"]', { name: "description", content: description });
    upsertMeta('meta[name="robots"]', { name: "robots", content: "index, follow, max-image-preview:large" });
    upsertMeta('meta[property="og:type"]', { property: "og:type", content: isArticle ? "article" : "website" });
    upsertMeta('meta[property="og:title"]', { property: "og:title", content: title });
    upsertMeta('meta[property="og:description"]', { property: "og:description", content: description });
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: canonical });
    upsertMeta('meta[property="og:image"]', { property: "og:image", content: image });
    upsertMeta('meta[property="og:site_name"]', { property: "og:site_name", content: personalBio.fullName });
    upsertMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: title });
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: description });
    upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: image });
    upsertLink("canonical", canonical);

    const sameAs = socialLinks.filter((link) => !link.url.startsWith("mailto:")).map((link) => link.url);
    const person = {
      "@type": "Person",
      "@id": `${absoluteUrl("/")}#person`,
      name: personalBio.fullName,
      jobTitle: personalBio.title,
      url: absoluteUrl("/"),
      image: absoluteUrl(personalBio.avatarUrl),
      email: personalBio.email,
      sameAs,
      alumniOf: { "@type": "CollegeOrUniversity", name: "Indian Institute of Technology Roorkee" },
    };
    const schema = isProject && project
      ? {
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: project.title,
          description: project.description,
          url: canonical,
          image,
          author: person,
          keywords: project.technologies.join(", "),
        }
      : isArticle && article
        ? {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: article.summary,
            url: canonical,
            author: person,
            datePublished: toIsoDate(article.publishedAt),
          }
        : {
            "@context": "https://schema.org",
            "@graph": [
              { "@type": "WebSite", "@id": `${absoluteUrl("/")}#website`, url: absoluteUrl("/"), name: personalBio.fullName },
              { "@type": "ProfilePage", "@id": `${absoluteUrl("/")}#profile", url: absoluteUrl("/"), mainEntity: person },
              person,
            ],
          };

    let script = document.head.querySelector<HTMLScriptElement>('script[data-portfolio-schema="true"]');
    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.portfolioSchema = "true";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema);
  }, [article, personalBio, project, socialLinks]);
}
