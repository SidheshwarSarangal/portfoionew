# Project Structure

## Directory map

```text
portfoionew/
├── docs/                         maintenance and integration guides
├── public/
│   ├── documents/
│   │   ├── projects/             project case-study PDFs
│   │   └── resume/               downloadable resume
│   ├── images/
│   │   ├── profile/              portrait and profile references
│   │   └── projects/
│   │       ├── photos/           active project card images + sources
│   │       └── illustrations/    retained generated artwork
│   ├── content/
│   │   └── portfolio-data.json   optional local content overrides
│   ├── favicon.svg
│   ├── robots.txt
│   └── sitemap.xml
├── scripts/
│   └── generate-seo.mjs       sitemap + direct route output
├── src/
│   ├── components/            visible UI only
│   ├── hooks/                 reusable React behavior
│   ├── content/
│   │   ├── index.tsx          context entry point
│   │   ├── providers.ts       local + REST + Sanity
│   │   ├── defaults.ts        sanitize + fallback merge
│   │   └── types.ts           canonical content contract
│   ├── lib/
│   │   ├── analytics.ts       optional GA4
│   │   ├── routes.ts          project/article URLs
│   │   ├── security.ts        URL and input validation
│   │   └── seo.ts             metadata + JSON-LD
│   ├── App.tsx                composition + route state
│   ├── data.ts                complete built-in content
│   ├── projectData.ts         PDF-backed project case studies
│   ├── index.css              global visual rules
│   └── main.tsx               application bootstrap
├── .env.example
├── .nvmrc                     supported Node major version
├── package-lock.json          reproducible dependency graph
├── index.html
├── netlify.toml
├── vercel.json
└── vite.config.ts
```

## Where should a change go?

```mermaid
flowchart TD
  Change{Type of change}
  Change -->|Text, projects, skills| Data[src/data.ts or provider]
  Change -->|Backend/CMS| Providers[src/content/providers.ts]
  Change -->|Data fields| Types[src/content/types.ts]
  Change -->|Visible layout| Components[src/components]
  Change -->|Metadata| SEO[src/lib/seo.ts]
  Change -->|Tracking| Analytics[src/lib/analytics.ts]
  Change -->|Deployment policy| Hosting[vercel.json / netlify.toml]
```

## Simple path vs advanced path

| Need | Edit |
|---|---|
| Personal copy | `src/data.ts` |
| PDF-backed projects | `src/projectData.ts` |
| Small deployment override | `public/content/portfolio-data.json` |
| Documents and images | `public/documents/` and `public/images/` |
| CMS/API | `.env.local` + `providers.ts` |
| New visual feature | `src/components/` |

## Design boundary

```text
content/ + lib/ + backend configuration
                 ↓ data only
components/ + index.css
                 ↓ presentation only
browser
```

Root deployment files stay at the root because hosting platforms discover them there.

`dist/` is generated output. Edit `src/` and `public/`, then run `npm run build`; never maintain production files directly inside `dist/`.
