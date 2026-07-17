# Documentation Map

```mermaid
flowchart TD
  A[Start] --> B{What do you need?}
  B -->|Understand folders| C[Project structure]
  B -->|Manage files| Assets[Asset organization]
  B -->|Connect content| D[Content providers]
  B -->|Connect contact form| Forms[Google Forms setup]
  B -->|Understand data flow| E[Architecture]
  B -->|Improve discovery| F[SEO and analytics]
  B -->|Harden deployment| G[Security and performance]
  B -->|Publish the site| H[Deployment]
```

| # | Guide | Outcome |
|---:|---|---|
| 1 | [Project structure](PROJECT_STRUCTURE.md) | Know where changes belong |
| 2 | [Asset organization](ASSETS.md) | Place documents and images correctly |
| 3 | [Content providers](CONTENT_PROVIDERS.md) | Connect JSON, REST, or Sanity |
| 4 | [Content architecture](CONTENT_ARCHITECTURE.md) | Extend adapters safely |
| 5 | [Google Forms contact setup](CONTACT_FORM.md) | Configure and test message submission |
| 6 | [SEO and analytics](SEO_AND_ANALYTICS.md) | Configure discovery and measurement |
| 7 | [Security and performance](SECURITY_AND_PERFORMANCE.md) | Deploy with safe defaults |
| 8 | [Deployment](DEPLOYMENT.md) | Configure and publish the build |

## Five-minute path

```text
1. nvm use && npm ci
2. cp .env.example .env.local
3. choose VITE_CONTENT_PROVIDER
4. npm run dev
5. customize content in src/data.ts and src/projectData.ts
```

## Ownership boundary

```mermaid
flowchart LR
  Repo[This repository] --> UI[Design + components]
  Repo --> Adapter[Read-only adapters]
  Owner[Site owner] --> Data[Real content + images]
  Owner --> Services[CMS/API + Search Console + GA4]
```
