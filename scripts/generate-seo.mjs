import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const siteUrl = (process.env.VITE_SITE_URL || "https://sidheshwarsarangal.github.io/portfoionew").replace(/\/$/, "");
const source = await readFile(path.join(root, "src/data.ts"), "utf8");
const projectSource = await readFile(path.join(root, "src/projectData.ts"), "utf8");
const publicDirectory = path.join(root, "public");
const distDirectory = path.join(root, "dist");

function sourceSection(start, end, input = source) {
  const startIndex = input.indexOf(start);
  if (startIndex === -1) return "";
  const endIndex = end ? input.indexOf(end, startIndex) : input.length;
  return input.slice(startIndex, endIndex === -1 ? input.length : endIndex);
}

function extractTopLevelObjects(start, end, sourceInput = source) {
  const input = sourceSection(start, end, sourceInput);
  const arrayStart = input.indexOf("[");
  if (arrayStart === -1) return [];

  const objects = [];
  let objectStart = -1;
  let depth = 0;
  let quote = "";
  let escaped = false;

  for (let index = arrayStart + 1; index < input.length; index += 1) {
    const character = input[index];

    if (quote) {
      if (escaped) escaped = false;
      else if (character === "\\") escaped = true;
      else if (character === quote) quote = "";
      continue;
    }

    if (character === '"' || character === "'" || character === "`") {
      quote = character;
      continue;
    }
    if (character === "{") {
      if (depth === 0) objectStart = index;
      depth += 1;
    } else if (character === "}") {
      depth -= 1;
      if (depth === 0 && objectStart !== -1) {
        objects.push(input.slice(objectStart, index + 1));
        objectStart = -1;
      }
    }
  }

  return objects;
}

function readStringField(input, field) {
  const match = input.match(new RegExp(`\\b${field}:\\s*("(?:\\\\.|[^"\\\\])*")`));
  if (!match) return "";
  try {
    return JSON.parse(match[1]);
  } catch {
    return "";
  }
}

function readStringArray(input, field) {
  const match = input.match(new RegExp(`\\b${field}:\\s*\\[([^\\]]*)\\]`));
  if (!match) return [];
  return [...match[1].matchAll(/"(?:\\.|[^"\\])*"/g)].map((item) => {
    try {
      return JSON.parse(item[0]);
    } catch {
      return "";
    }
  }).filter(Boolean);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function escapeXml(value) {
  return escapeHtml(value).replaceAll("'", "&apos;");
}

function pageUrl(route) {
  return route === "/" ? `${siteUrl}/` : `${siteUrl}${route}`;
}

function absoluteAssetUrl(value) {
  if (/^https?:\/\//i.test(value)) return value;
  return `${siteUrl}/${String(value).replace(/^\.\//, "").replace(/^\//, "")}`;
}

function toIsoDate(value) {
  if (!value) return "";
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? "" : parsed.toISOString().slice(0, 10);
}

const personalBlock = sourceSection("export const PERSONAL_BIO", "export const PROJECTS");
const person = {
  name: readStringField(personalBlock, "fullName") || "Sidheshwar Sarangal",
  title: readStringField(personalBlock, "title") || "Software Engineer",
  description: readStringField(personalBlock, "about"),
  image: readStringField(personalBlock, "avatarUrl"),
  email: readStringField(personalBlock, "email"),
};
const socialUrls = extractTopLevelObjects("export const SOCIAL_LINKS", "export const SOCIAL_POSTS")
  .map((block) => readStringField(block, "url"))
  .filter((url) => /^https?:\/\//i.test(url));

const projects = extractTopLevelObjects("export const PDF_PROJECTS", undefined, projectSource).map((block) => ({
  id: readStringField(block, "id"),
  title: readStringField(block, "title"),
  description: readStringField(block, "description"),
  image: readStringField(block, "imageUrl"),
  technologies: readStringArray(block, "technologies"),
})).filter((project) => project.id && project.title);

const articles = extractTopLevelObjects("export const ARTICLES", "export const TIMELINE").map((block) => ({
  slug: readStringField(block, "slug"),
  title: readStringField(block, "title"),
  description: readStringField(block, "summary"),
  publishedAt: toIsoDate(readStringField(block, "publishedAt")),
})).filter((article) => article.slug && article.title);

const homeDescription = "Software engineer from IIT Roorkee building backend systems, REST APIs, and full-stack applications with Python, Spring Boot, MERN, Docker, and Kubernetes.";
const defaultImage = absoluteAssetUrl("images/profile/portfolio-hero.png");
const personId = `${pageUrl("/")}#person`;
const personSchema = {
  "@type": "Person",
  "@id": personId,
  name: person.name,
  jobTitle: person.title,
  description: person.description,
  url: pageUrl("/"),
  image: absoluteAssetUrl(person.image),
  email: person.email,
  sameAs: socialUrls,
  alumniOf: { "@type": "CollegeOrUniversity", name: "Indian Institute of Technology Roorkee" },
  knowsAbout: ["Software Engineering", "Full-Stack Development", "REST APIs", "Python", "Spring Boot", "MERN", "Docker", "Kubernetes"],
};

const pages = [
  {
    route: "/",
    title: `${person.name} — ${person.title}`,
    description: homeDescription,
    type: "website",
    image: defaultImage,
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "WebSite", "@id": `${pageUrl("/")}#website`, url: pageUrl("/"), name: person.name },
        { "@type": "ProfilePage", "@id": `${pageUrl("/")}#profile`, url: pageUrl("/"), mainEntity: { "@id": personId } },
        personSchema,
      ],
    },
  },
  ...projects.map((project) => {
    const route = `/projects/${encodeURIComponent(project.id)}`;
    const canonical = pageUrl(route);
    const image = absoluteAssetUrl(project.image || "images/profile/portfolio-hero.png");
    return {
      route,
      title: `${project.title} | ${person.name}`,
      description: project.description,
      type: "website",
      image,
      schema: {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: project.title,
        description: project.description,
        url: canonical,
        mainEntityOfPage: canonical,
        image,
        author: { "@id": personId, "@type": "Person", name: person.name, url: pageUrl("/") },
        keywords: project.technologies,
      },
    };
  }),
  ...articles.map((article) => {
    const route = `/articles/${encodeURIComponent(article.slug)}`;
    const canonical = pageUrl(route);
    return {
      route,
      title: `${article.title} | ${person.name}`,
      description: article.description,
      type: "article",
      image: defaultImage,
      publishedAt: article.publishedAt,
      schema: {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.title,
        description: article.description,
        url: canonical,
        mainEntityOfPage: canonical,
        image: [defaultImage],
        author: { "@id": personId, "@type": "Person", name: person.name, url: pageUrl("/") },
        datePublished: article.publishedAt || undefined,
        dateModified: article.publishedAt || undefined,
      },
    };
  }),
];

function renderMetadata(html, page, robots = "index, follow, max-image-preview:large") {
  const canonical = pageUrl(page.route);
  const removableTags = [
    /\s*<title>[\s\S]*?<\/title>/i,
    /\s*<meta\s+(?:name|property)=["'](?:description|robots|og:type|og:title|og:description|og:url|og:image|og:image:alt|twitter:card|twitter:title|twitter:description|twitter:image|article:published_time)["'][^>]*\/?\s*>/gi,
    /\s*<link\s+rel=["']canonical["'][^>]*\/?\s*>/gi,
    /\s*<script\s+type=["']application\/ld\+json["'][^>]*data-portfolio-schema=["']true["'][^>]*>[\s\S]*?<\/script>/gi,
  ];
  let output = html;
  removableTags.forEach((pattern) => {
    output = output.replace(pattern, "");
  });

  const articleMeta = page.publishedAt
    ? `\n    <meta property="article:published_time" content="${escapeHtml(page.publishedAt)}" />`
    : "";
  const schema = JSON.stringify(page.schema).replaceAll("<", "\\u003c");
  const metadata = `
    <title>${escapeHtml(page.title)}</title>
    <meta name="description" content="${escapeHtml(page.description)}" />
    <meta name="robots" content="${escapeHtml(robots)}" />
    <link rel="canonical" href="${escapeHtml(canonical)}" />
    <meta property="og:type" content="${escapeHtml(page.type)}" />
    <meta property="og:title" content="${escapeHtml(page.title)}" />
    <meta property="og:description" content="${escapeHtml(page.description)}" />
    <meta property="og:url" content="${escapeHtml(canonical)}" />
    <meta property="og:image" content="${escapeHtml(page.image)}" />
    <meta property="og:image:alt" content="${escapeHtml(`${page.title} preview`)}" />${articleMeta}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(page.title)}" />
    <meta name="twitter:description" content="${escapeHtml(page.description)}" />
    <meta name="twitter:image" content="${escapeHtml(page.image)}" />
    <script type="application/ld+json" data-portfolio-schema="true">${schema}</script>`;

  return output.replace("</head>", `${metadata}\n  </head>`);
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((page) => {
  const lastModified = page.publishedAt ? `<lastmod>${escapeXml(page.publishedAt)}</lastmod>` : "";
  return `  <url><loc>${escapeXml(pageUrl(page.route))}</loc>${lastModified}</url>`;
}).join("\n")}
</urlset>
`;
const robots = `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`;

await mkdir(publicDirectory, { recursive: true });
await writeFile(path.join(publicDirectory, "robots.txt"), robots);
await writeFile(path.join(publicDirectory, "sitemap.xml"), sitemap);

try {
  const baseHtml = await readFile(path.join(distDirectory, "index.html"), "utf8");
  await writeFile(path.join(distDirectory, "robots.txt"), robots);
  await writeFile(path.join(distDirectory, "sitemap.xml"), sitemap);

  for (const page of pages) {
    const renderedHtml = renderMetadata(baseHtml, page);
    if (page.route === "/") {
      await writeFile(path.join(distDirectory, "index.html"), renderedHtml);
      continue;
    }
    const directory = path.join(distDirectory, page.route.slice(1));
    await mkdir(directory, { recursive: true });
    await writeFile(path.join(directory, "index.html"), renderedHtml);
  }

  const notFoundPage = {
    ...pages[0],
    title: `Page not found | ${person.name}`,
    description: "The requested portfolio page could not be found.",
  };
  await writeFile(
    path.join(distDirectory, "404.html"),
    renderMetadata(baseHtml, notFoundPage, "noindex, follow"),
  );
} catch (error) {
  if (error?.code !== "ENOENT") throw error;
}
