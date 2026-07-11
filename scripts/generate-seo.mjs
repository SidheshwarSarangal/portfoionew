import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const siteUrl = (process.env.VITE_SITE_URL || "https://sidheshwarsarangal.github.io/portfoionew").replace(/\/$/, "");
const source = await readFile(path.join(root, "src/data.ts"), "utf8");

function section(start, end) {
  return source.slice(source.indexOf(start), source.indexOf(end));
}

const projectIds = [...section("export const PROJECTS", "export const ARTICLES").matchAll(/\bid:\s*"([^"]+)"/g)].map((match) => match[1]);
const articleSlugs = [...section("export const ARTICLES", "export const TIMELINE").matchAll(/\bslug:\s*"([^"]+)"/g)].map((match) => match[1]);
const urls = [
  `${siteUrl}/`,
  ...projectIds.map((id) => `${siteUrl}/projects/${id}`),
  ...articleSlugs.map((slug) => `${siteUrl}/articles/${slug}`),
];

const publicDirectory = path.join(root, "public");
await mkdir(publicDirectory, { recursive: true });
await writeFile(
  path.join(publicDirectory, "robots.txt"),
  `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
);
await writeFile(
  path.join(publicDirectory, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((url) => `  <url><loc>${url}</loc></url>`).join("\n")}\n</urlset>\n`,
);

const distDirectory = path.join(root, "dist");
try {
  await copyFile(path.join(distDirectory, "index.html"), path.join(distDirectory, "404.html"));
  for (const id of projectIds) {
    const directory = path.join(distDirectory, "projects", id);
    await mkdir(directory, { recursive: true });
    await copyFile(path.join(distDirectory, "index.html"), path.join(directory, "index.html"));
  }
  for (const slug of articleSlugs) {
    const directory = path.join(distDirectory, "articles", slug);
    await mkdir(directory, { recursive: true });
    await copyFile(path.join(distDirectory, "index.html"), path.join(directory, "index.html"));
  }
} catch (error) {
  if (error?.code !== "ENOENT") throw error;
}
