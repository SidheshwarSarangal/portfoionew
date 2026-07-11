# SEO, Search Console, and Analytics

The implementation follows this sequence:

```text
Discovery -> Indexing -> Search appearance -> Measurement
```

## Production configuration

Set the final public origin before building:

```env
VITE_SITE_URL=https://your-domain.com
```

This value controls canonical URLs, structured-data URLs, sitemap entries, and social-sharing URLs. For a subdirectory deployment, include the complete base path.

## What is automated

- Unique runtime titles and descriptions for the homepage, projects, and articles
- Canonical URLs
- Open Graph and Twitter card metadata
- `Person`, `ProfilePage`, `WebSite`, `CreativeWork`, and `Article` JSON-LD
- Crawlable project and article links
- URL-backed modals with browser Back/Forward support
- `robots.txt` and `sitemap.xml` generation
- Static route entry files for built-in projects and articles
- Optional Google Analytics initialization and portfolio events
- SPA rewrites for Vercel and Netlify

The sitemap is generated from the built-in entries in `src/data.ts`. If a remote provider adds or removes projects/articles, regenerate routes during deployment from that provider or move to an SSR/static-generation integration.

## Google Search Console

These steps require the site owner and cannot be automated safely in the repository:

1. Deploy the production site on its final HTTPS domain.
2. Add and verify the domain property in Google Search Console.
3. Submit `https://your-domain.com/sitemap.xml`.
4. Inspect the homepage and representative project/article URLs.
5. Request indexing after confirming the live tests pass.
6. Monitor Page Indexing, Search Performance, Core Web Vitals, and Enhancements.

If Google supplies an HTML verification tag, add it to `index.html`, or use DNS verification without changing the code.

## Google Analytics 4

Analytics is disabled unless a measurement ID is provided:

```env
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Implemented events include:

- `project_open`
- `project_repository_click`
- `live_demo_click`
- `article_open`
- `contact_submit`

Connect the GA4 property to Search Console from the Google dashboards after both properties are verified. Review applicable privacy and consent requirements before enabling analytics for production visitors.

## Content work still owned by the site author

Technical SEO cannot establish credibility on its own. Replace placeholder photos, testimonials, repository URLs, screenshots, achievements, and articles only with genuine material. Do not invent content to satisfy SEO fields.

## Validation after deployment

- Google Search Console URL Inspection
- Google Rich Results Test
- PageSpeed Insights on mobile and desktop
- Browser tests for direct project/article URLs
- Open Graph preview validator
- GA4 DebugView for configured events
