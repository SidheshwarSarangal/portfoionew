const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

export function projectPath(id: string) {
  return `${basePath}/projects/${encodeURIComponent(id)}` || `/projects/${encodeURIComponent(id)}`;
}

export function articlePath(slug: string) {
  return `${basePath}/articles/${encodeURIComponent(slug)}` || `/articles/${encodeURIComponent(slug)}`;
}

export function homePath() {
  return `${basePath}/` || "/";
}

export function readContentRoute(pathname = window.location.pathname) {
  const projectMatch = pathname.match(/\/projects\/([^/]+)\/?$/);
  if (projectMatch) return { type: "project" as const, value: decodeURIComponent(projectMatch[1]) };

  const articleMatch = pathname.match(/\/articles\/([^/]+)\/?$/);
  if (articleMatch) return { type: "article" as const, value: decodeURIComponent(articleMatch[1]) };

  return { type: "home" as const, value: "" };
}
