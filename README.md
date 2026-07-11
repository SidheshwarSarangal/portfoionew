# Sidheshwar's Portfolio

A Vite, React, TypeScript, Tailwind CSS, and Motion portfolio.

New here? Start with the [simple project structure guide](docs/PROJECT_STRUCTURE.md).

## Run locally

Requirements: Node.js 20 or newer.

```bash
npm install
npm run dev
```

Use `npm run lint` for the TypeScript check and `npm run build` for a production build.

## Content providers

This frontend is provider-independent. Choose a content source without changing any design component:

```env
VITE_CONTENT_PROVIDER=local
```

Available providers:

- `local`: `public/portfolio-data.json`
- `rest`: any public REST endpoint returning the canonical content shape
- `sanity`: a public Sanity dataset containing a published `portfolio` document

If a provider fails or omits a property, built-in demonstration content from `src/data.ts` keeps the website usable.

Read [the architecture reference](docs/CONTENT_ARCHITECTURE.md) before changing the content system. Configuration and integration instructions are in [the provider guide](docs/CONTENT_PROVIDERS.md).

Search discovery, metadata, route generation, Search Console, and optional analytics setup are documented in [the SEO and analytics guide](docs/SEO_AND_ANALYTICS.md).

Runtime hardening, hosting headers, secrets, caching, and maintenance are documented in [the security and performance guide](docs/SECURITY_AND_PERFORMANCE.md).

## Local content

The default provider reads:

```text
public/portfolio-data.json
```

Edit that file and redeploy the static site. The browser loads it when the page opens.

The JSON supports these top-level properties:

- `personalBio`: profile fields; individual fields can be overridden.
- `projects`: the complete project list.
- `articles`: the complete article list.
- `timeline`: the complete detailed experience/education list.
- `socialLinks`: the complete social-link list.
- `experienceSummary`: the compact “Previous Life” rows.
- `capabilities`: the grouped “What I do” lists.
- `techSkills`: skill names and percentage values.
- `testimonials`: testimonial text, attribution, and avatar.
- `industryAwards`: the left achievements column.
- `teamAwards`: the right achievements column.

Arrays replace their corresponding built-in arrays. Include every item you want displayed.

### Example: add projects from JSON

```json
{
  "personalBio": {
    "title": "Software Engineer"
  },
  "projects": [
    {
      "id": "example-project",
      "title": "Example Project",
      "category": "Full-Stack Application",
      "description": "A short, factual project description.",
      "roles": ["Full-Stack Development"],
      "year": "2026",
      "technologies": ["React", "Spring Boot"],
      "accentColor": "amber",
      "imageUrl": "/images/example-project.webp",
      "links": {
        "live": "https://example.com",
        "github": "https://github.com/username/example-project"
      },
      "details": {
        "problem": "The problem this project addresses.",
        "solution": "How the system addresses it.",
        "outcomes": ["A concrete result or implemented capability"]
      },
      "featured": true
    }
  ]
}
```

Store local images under `public/images/` and reference them as `/images/file-name.webp`. JSON must remain valid: use double quotes and do not leave trailing commas.

The visual structure and styling remain in the React components. Editing the JSON changes content only.
