# Sidheshwar Sarangal - Portfolio

React 19 + TypeScript + Vite portfolio for projects, experience, posts, testimonials, resume downloads, and Google Forms contact capture.

Repository: [SidheshwarSarangal/portfoionew](https://github.com/SidheshwarSarangal/portfoionew)

## Project Snapshot

```mermaid
flowchart LR
  Content[src/data.ts<br/>src/projectData.ts] --> UI[React sections]
  Assets[public/images<br/>public/documents] --> UI
  Env[.env / Vercel env] --> Providers[Content + contact providers]
  UI --> Build[Vite production bundle]
  Build --> Host[Vercel / Netlify / static host]
  Providers --> Sheet[Google Form<br/>linked Sheet]
```

| Area | Source |
|---|---|
| Portfolio copy | `src/data.ts` |
| Project case studies | `src/projectData.ts` |
| Images and PDFs | `public/` |
| Contact submission | Google Forms env variables |
| SEO output | `scripts/generate-seo.mjs` |
| Hosting rules | `vercel.json`, `netlify.toml` |

## Quick Start

```mermaid
flowchart LR
  Clone[Clone repo] --> Node[nvm use]
  Node --> Install[npm ci]
  Install --> Env[Create .env]
  Env --> Dev[npm run dev]
  Dev --> Browser[localhost:3000]
```

```bash
git clone https://github.com/SidheshwarSarangal/portfoionew.git
cd portfoionew
nvm use
npm ci
cp .env.example .env
npm run dev
```

## Commands

| Command | Does |
|---|---|
| `npm run dev` | SEO prep + Vite dev server |
| `npm run lint` | TypeScript validation |
| `npm run build` | Production `dist/` bundle |
| `npm run preview` | Preview built site |
| `npm run check` | Lint + build |

## Repository Map

```mermaid
flowchart TD
  Root[portfoionew]
  Root --> Docs[docs<br/>maintenance guides]
  Root --> Public[public<br/>served assets]
  Root --> Src[src<br/>app source]
  Root --> Scripts[scripts<br/>build automation]
  Root --> Config[hosting + Vite config]

  Public --> Documents[documents<br/>resume + project PDFs]
  Public --> Images[images<br/>profile + projects]
  Public --> Json[content<br/>optional JSON override]

  Src --> Components[components<br/>visible UI]
  Src --> Content[content<br/>providers + fallback merge]
  Src --> Hooks[hooks]
  Src --> Lib[lib<br/>SEO, routes, analytics, security]
  Src --> Data[data.ts]
  Src --> Projects[projectData.ts]
```

## Edit Map

```mermaid
flowchart LR
  Need{Need to change?}
  Need -->|Text / bio / posts| Data[src/data.ts]
  Need -->|Project cards / PDFs| Projects[src/projectData.ts]
  Need -->|Images / resume| Public[public/]
  Need -->|Layout / sections| Components[src/components/]
  Need -->|External content| Providers[src/content/]
  Need -->|Deploy behavior| Hosting[vercel.json / netlify.toml / vite.config.ts]
```

## Environment

Minimum local/Vercel values for the current setup:

```env
VITE_CONTENT_PROVIDER=local
VITE_GOOGLE_FORM_ACTION_URL=https://docs.google.com/forms/d/e/.../formResponse
VITE_GOOGLE_FORM_FIRST_NAME_ENTRY=entry.xxxxx
VITE_GOOGLE_FORM_LAST_NAME_ENTRY=entry.xxxxx
VITE_GOOGLE_FORM_EMAIL_ENTRY=entry.xxxxx
VITE_GOOGLE_FORM_SUBJECT_ENTRY=entry.xxxxx
VITE_GOOGLE_FORM_MESSAGE_ENTRY=entry.xxxxx
```

Optional:

| Variable | Use |
|---|---|
| `VITE_SITE_URL` | Final canonical URL; Vercel can infer preview URLs |
| `VITE_GA_MEASUREMENT_ID` | Enables GA4 |
| REST/Sanity vars | Only when using those content providers |

## Asset Rule

```mermaid
flowchart LR
  Source[src + public] --> Build[npm run build]
  Build --> Dist[dist]
  Dist -. generated only .-> NoEdit[Do not edit directly]
```

Use `public/` for browser-served files. Keep paths root-relative, for example `/images/projects/photos/search-platform.webp`.

## Documentation

| Guide | Best for |
|---|---|
| [Docs map](docs/README.md) | Find the right guide |
| [Project structure](docs/PROJECT_STRUCTURE.md) | Folder ownership |
| [Assets](docs/ASSETS.md) | Images, PDFs, provenance |
| [Content architecture](docs/CONTENT_ARCHITECTURE.md) | Provider and fallback flow |
| [Content providers](docs/CONTENT_PROVIDERS.md) | Local, REST, Sanity |
| [Contact form](docs/CONTACT_FORM.md) | Google Forms + Sheets |
| [SEO and analytics](docs/SEO_AND_ANALYTICS.md) | Sitemap, metadata, GA4 |
| [Security and performance](docs/SECURITY_AND_PERFORMANCE.md) | Headers, public/private values |
| [Deployment](docs/DEPLOYMENT.md) | Publish checklist |

## Release Check

```mermaid
flowchart LR
  Lint[npm run lint] --> Build[npm run build]
  Build --> Routes[Test direct routes]
  Routes --> Assets[Test PDFs/images]
  Assets --> Contact[Test contact sheet]
  Contact --> Deploy[Deploy]
```

```text
[ ] npm run lint
[ ] npm run build
[ ] Test project/article direct routes
[ ] Test resume and project PDF downloads
[ ] Test external links open in a new tab
[ ] Test Google Form response lands in the linked Sheet
```
