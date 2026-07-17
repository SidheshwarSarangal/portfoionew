# Security and Performance

## Trust Boundary

```mermaid
flowchart LR
  Remote[Public JSON / CMS / Form IDs] --> Validate[Validate + sanitize]
  Validate --> Merge[Fallback merge]
  Merge --> React[React text rendering]
  React --> Browser[Visitor browser]
  Secret[Private credentials] -. never enters .-> Browser
```

## Public vs Private

```mermaid
flowchart TD
  Value{Can every visitor see it?}
  Value -->|Yes| Public[VITE_* is acceptable]
  Value -->|No| Backend[Keep on server/backend only]
```

| Public frontend values | Private backend values |
|---|---|
| Site URL | Database password |
| GA4 ID | CMS write token |
| Public REST endpoint | Personal access token |
| Sanity project/dataset | Private API key |
| Google Form ID + `entry.*` | Google password/OAuth secret |

## Controls Map

```mermaid
flowchart TD
  Config[Provider config] --> URL[URL validation]
  Remote[Remote content] --> Clean[Sanitize email + links]
  Clean --> Render[No raw HTML injection]
  Render --> Headers[CSP + browser headers]
  Headers --> Links[noopener noreferrer]
```

| Layer | Control |
|---|---|
| Config | REST/Sanity validation |
| Rendering | React text output, no raw HTML |
| Browser | CSP, referrer, permissions, frame policy |
| Links | `noopener noreferrer` |
| Assets | Hashed immutable cache |
| Motion | Reduced-motion support |
| Bundle | Modal chunks lazy-loaded |

## Hosting Headers

```mermaid
flowchart LR
  Vercel[vercel.json] --> Headers[Security headers]
  Netlify[netlify.toml] --> Headers
  Pages[GitHub Pages] --> CDN[CDN/proxy for headers]
```

Configured:

```text
Content-Security-Policy
Referrer-Policy
Permissions-Policy
X-Content-Type-Options
X-Frame-Options
Cross-Origin-Opener-Policy
```

## Performance Shape

```mermaid
flowchart LR
  Initial[Initial bundle] --> Core[Core portfolio UI]
  Click[Project/article click] --> Chunk[Lazy modal chunk]
  Images[Below-fold images] --> Lazy[Lazy image loading]
  Assets[Hashed assets] --> Cache[1-year immutable cache]
```

## Maintenance Loop

```mermaid
flowchart LR
  Edit[Change] --> Lint[npm run lint]
  Lint --> Build[npm run build]
  Build --> Browser[Test routes + console]
  Browser --> Speed[PageSpeed]
```

```text
[ ] Check CSP console errors
[ ] Test direct project/article routes
[ ] Test contact form delivery
[ ] Run PageSpeed after visual-heavy changes
[ ] Review dependency updates before npm audit fix --force
```

## Backend Boundary

Authentication, write-rate limits, CSRF, database authorization, private workflows, and verified email delivery belong behind a backend or serverless endpoint.
