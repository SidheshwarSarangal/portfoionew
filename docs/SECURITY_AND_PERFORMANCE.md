# Security and Performance

This is a public, read-only portfolio frontend. Its security model should remain small and understandable.

## What is protected

- Remote REST endpoints must use HTTP or HTTPS.
- Sanity project, dataset, and API-version values are format-checked.
- CMS-provided image, project, and social URLs are sanitized before rendering.
- Invalid email values fall back to the built-in address.
- React renders article and project content as text; raw HTML is not accepted.
- No write token, database password, or CMS management credential belongs in the browser.
- Vercel and Netlify configurations set CSP, framing, referrer, MIME-sniffing, opener, and browser-feature policies.

## Security headers

The host configurations provide:

- `Content-Security-Policy`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` with unused sensitive features disabled
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Cross-Origin-Opener-Policy: same-origin`

The CSP permits HTTPS images and connections because users may choose different image CDNs, REST APIs, or hosted CMS providers. Tighten `img-src` and `connect-src` to known domains for a single production deployment when possible.

GitHub Pages does not apply `vercel.json` or `netlify.toml`. Configure equivalent headers through a CDN or hosting platform if strict response headers are required.

## Secrets

Every `VITE_*` value is bundled into public browser code. Only public identifiers belong there:

- site URL;
- GA4 measurement ID;
- public REST endpoint;
- Sanity project ID, dataset, and API version.

Never add API write tokens, database credentials, private CMS tokens, or personal access tokens.

## Performance measures

- Project and article modals are loaded only when opened.
- Project and testimonial images below the fold use lazy loading and asynchronous decoding.
- The primary profile image has explicit dimensions and high fetch priority.
- Hashed build assets receive one-year immutable cache headers on Vercel and Netlify.
- Reduced-motion preferences disable nonessential animation work.
- The Vite configuration contains only the required React and Tailwind plugins.

## Maintenance checklist

Run regularly in an environment with Node.js:

```bash
npm run lint
npm run build
npm audit
```

Before merging dependency updates:

1. Review the changelog.
2. Run the TypeScript check and production build.
3. Test homepage and direct project/article URLs.
4. Check the browser console for CSP violations.
5. Run PageSpeed Insights after deployment.

Do not automatically apply breaking dependency upgrades or `npm audit fix --force` without reviewing the resulting changes.

## Deliberately excluded

The project does not add authentication, sessions, CSRF tokens, server-side rate limiting, or a security framework because it has no private application state or write API. Those controls belong to a user-supplied backend if one is later introduced.
