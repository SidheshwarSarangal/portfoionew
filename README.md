# Sidheshwar Sarangal — Portfolio

A React 19, TypeScript, Vite, Tailwind CSS, and Motion portfolio for full-stack products, backend systems, project case studies, engineering experience, LinkedIn posts, and contact workflows.

Repository: [SidheshwarSarangal/portfoionew](https://github.com/SidheshwarSarangal/portfoionew)

## Requirements

- Node.js 20 or newer
- npm with lockfile support
- Git

The repository includes `.nvmrc` and `package-lock.json` so contributors can reproduce the same dependency graph.

## Reproducible setup

```bash
git clone https://github.com/SidheshwarSarangal/portfoionew.git
cd portfoionew
nvm use
npm ci
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

Use `npm ci`, rather than `npm install`, for a clean checkout or CI build. Restart the development server whenever `.env.local` changes.

## Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Generate SEO files and start Vite on port 3000 |
| `npm run lint` | Run TypeScript validation without emitting files |
| `npm run build` | Generate SEO files and create the production `dist/` bundle |
| `npm run preview` | Preview the generated production bundle |
| `npm run check` | Run TypeScript validation and a production build |

## Repository map

```text
portfoionew/
├── docs/                         architecture and maintenance guides
├── public/
│   ├── documents/
│   │   ├── projects/             ten project case-study PDFs
│   │   └── resume/               downloadable resume
│   ├── images/
│   │   ├── profile/              hero, portrait, and recommendation reference
│   │   └── projects/
│   │       ├── photos/           locally stored project card imagery
│   │       └── illustrations/    retained generated project artwork
│   ├── content/
│   │   └── portfolio-data.json   optional runtime content overrides
│   ├── favicon.svg
│   ├── robots.txt
│   └── sitemap.xml
├── scripts/                      build-time automation
├── src/
│   ├── components/               visual sections and interactions
│   ├── content/                  provider, merge, validation, and content contract
│   ├── hooks/                    reusable React hooks
│   ├── lib/                      assets, analytics, routes, security, and SEO
│   ├── App.tsx                   page composition and view routing
│   ├── data.ts                   primary non-project portfolio content
│   ├── projectData.ts            ten PDF-backed project case studies
│   ├── index.css                 global design and responsive behavior
│   └── main.tsx                  application entry point
├── .env.example                  public configuration template
├── .nvmrc                       supported Node major version
├── package-lock.json             deterministic dependency lockfile
├── netlify.toml                  Netlify configuration
├── vercel.json                   Vercel configuration
└── vite.config.ts                build and base-path configuration
```

## Content sources

The complete built-in portfolio is maintained in:

- `src/data.ts` — profile, timeline, capabilities, posts, testimonials, and other page content.
- `src/projectData.ts` — the ten PDF-backed project case studies.

`public/content/portfolio-data.json` is an optional runtime override. Object fields merge, but arrays replace the corresponding built-in array completely. Do not place a partial `socialPosts`, `projects`, or other array there unless replacing the entire section intentionally.

The application can alternatively load a public REST endpoint or Sanity dataset through the provider layer. See [Content providers](docs/CONTENT_PROVIDERS.md).

## Public assets

All source-controlled documents and images live under stable, descriptive paths in `public/`. The generated artwork has been retained under `public/images/projects/illustrations/`; the current project tiles use locally stored photographs under `public/images/projects/photos/`.

See [Asset organization](docs/ASSETS.md) before adding, renaming, or replacing media.

## Contact form

The contact form is prepared to submit to Google Forms and presents submission as a compiler run. It clears values only after the request succeeds and preserves them on failure.

Google Forms requires one form-specific action URL and five `entry.*` identifiers. See [Google Forms contact setup](docs/CONTACT_FORM.md).

## Content and environment configuration

Copy `.env.example` to `.env.local`. Only `VITE_*` values intended to be visible in the browser belong there. Never place API secrets, database passwords, private CMS tokens, or Google account credentials in frontend environment variables.

## Production

```bash
npm ci
npm run check
npm run preview
```

Deploy the generated `dist/` directory. `dist/` is generated output and is intentionally ignored by Git; `public/` and `src/` are the sources of truth.

Hosting guidance is available in [Deployment](docs/DEPLOYMENT.md).

## Documentation

| Guide | Purpose |
|---|---|
| [Documentation map](docs/README.md) | Find the right maintenance guide |
| [Project structure](docs/PROJECT_STRUCTURE.md) | Understand ownership and folder boundaries |
| [Asset organization](docs/ASSETS.md) | Add and reference documents and images safely |
| [Content architecture](docs/CONTENT_ARCHITECTURE.md) | Understand fallback, merge, and provider behavior |
| [Content providers](docs/CONTENT_PROVIDERS.md) | Configure local JSON, REST, or Sanity |
| [Google Forms contact setup](docs/CONTACT_FORM.md) | Connect and test contact submission |
| [SEO and analytics](docs/SEO_AND_ANALYTICS.md) | Configure discovery and measurement |
| [Security and performance](docs/SECURITY_AND_PERFORMANCE.md) | Maintain safe frontend defaults |
| [Deployment](docs/DEPLOYMENT.md) | Build and publish the site |

## Contribution checklist

```text
[ ] Preserve existing user content and locally stored media
[ ] Put new files in the documented source directory
[ ] Update references and the relevant manifest/documentation
[ ] Keep secrets out of VITE_* variables
[ ] Run npm run lint
[ ] Run npm run build for release-facing changes
[ ] Test resume and project PDF downloads
[ ] Test project/article direct routes
[ ] Test external links in a new tab
[ ] Test the contact form against the Google Forms Responses tab
```
