declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export type AnalyticsEvent =
  | "project_open"
  | "project_repository_click"
  | "live_demo_click"
  | "article_open"
  | "resume_download"
  | "email_click"
  | "contact_submit"
  | "contact_error"
  | "linkedin_click"
  | "github_click";

export function initializeAnalytics() {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  if (!measurementId || document.querySelector(`script[data-ga-id="${measurementId}"]`)) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = (...args: unknown[]) => window.dataLayer?.push(args);
  window.gtag("js", new Date());
  window.gtag("config", measurementId, { anonymize_ip: true });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  script.dataset.gaId = measurementId;
  document.head.appendChild(script);

  document.addEventListener("click", (event) => {
    const link = (event.target as HTMLElement).closest<HTMLAnchorElement>("a[href]");
    if (!link) return;
    const href = link.href;
    if (href.startsWith("mailto:")) trackEvent("email_click");
    else if (href.includes("github.com")) trackEvent("github_click", { destination: href });
    else if (href.includes("linkedin.com")) trackEvent("linkedin_click", { destination: href });
    else if (/resume|cv/i.test(href)) trackEvent("resume_download", { destination: href });
  });
}

export function trackEvent(name: AnalyticsEvent, parameters: Record<string, string | number | boolean> = {}) {
  window.gtag?.("event", name, parameters);
}
