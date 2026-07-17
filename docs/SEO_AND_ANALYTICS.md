# SEO and Analytics

## Discovery Pipeline

```mermaid
flowchart LR
  Deploy[Deploy] --> Robots[robots.txt]
  Deploy --> Sitemap[sitemap.xml]
  Robots --> Crawl[Search crawl]
  Sitemap --> Crawl
  Crawl --> Meta[Metadata + JSON-LD]
  Meta --> Search[Search appearance]
  Visitor[Visitor] --> GA[Optional GA4 events]
```

## Generated Outputs

```mermaid
flowchart TD
  Data[src/data.ts] --> Script[generate-seo.mjs]
  Projects[src/projectData.ts] --> Script
  Script --> Robots[public/robots.txt]
  Script --> Sitemap[public/sitemap.xml]
  Script --> Routes[route-specific HTML metadata]
  Runtime[src/lib/seo.ts] --> Meta[client metadata]
```

## Env

```env
VITE_SITE_URL=https://your-domain.com
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

| Value | Required? |
|---|---:|
| `VITE_SITE_URL` | Recommended for final canonical domain |
| `VITE_GA_MEASUREMENT_ID` | Only for GA4 |

GA4 stays disabled when the measurement ID is empty.

## SEO Feature Matrix

| Feature | File |
|---|---|
| Titles/descriptions | `src/lib/seo.ts` |
| Canonical URLs | `src/lib/seo.ts` |
| Open Graph/Twitter cards | `src/lib/seo.ts` |
| JSON-LD | `src/lib/seo.ts`, `scripts/generate-seo.mjs` |
| Sitemap/robots | `scripts/generate-seo.mjs` |
| Direct routes | `/projects/:id`, `/articles/:slug` |
| GA4 events | `src/lib/analytics.ts` |

## Search Console Flow

```mermaid
flowchart LR
  Domain[Final HTTPS domain] --> Verify[Verify property]
  Verify --> Sitemap[Submit /sitemap.xml]
  Sitemap --> Inspect[Inspect homepage + one project + one article]
  Inspect --> Monitor[Indexing + Core Web Vitals]
```

## Event Map

```mermaid
flowchart TD
  Visitor[Visitor] --> Project[project_open]
  Visitor --> Article[article_open]
  Visitor --> Repo[project_repository_click]
  Visitor --> Demo[live_demo_click]
  Visitor --> Contact[contact_submit]
  Visitor --> Resume[resume_download]
  Visitor --> Social[email/github/linkedin clicks]
```

## Validation Matrix

| Tool | Checks |
|---|---|
| Search Console | Crawl/index status |
| Rich Results Test | Structured data |
| PageSpeed Insights | Core Web Vitals |
| GA4 DebugView | Events |
| Social preview tools | Card image/text |

Targets:

```text
LCP <= 2.5s
INP <= 200ms
CLS <= 0.1
```

## Content Credibility

```mermaid
flowchart LR
  Real[Real screenshots] --> Trust[Trust]
  Links[Correct repo/demo links] --> Trust
  Cases[Original case studies] --> Trust
  Proof[Verifiable outcomes] --> Trust
```
