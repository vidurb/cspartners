# C&S Partners — Astro site

Site for [C&S Partners](https://cspartners.in), built with [Astro](https://astro.build/) (server output + Vercel ISR), Tailwind CSS v4 (`@tailwindcss/vite`), and [Sanity](https://www.sanity.io/) as the content backend via the official [`@sanity/astro`](https://github.com/sanity-io/sanity-astro) integration.

## Sanity content

Studio is embedded at `/admin`. Desk structure groups **Singletons** (fixed `_id` documents) and **Collections** (blog posts, practice areas, team, job pages).

Singleton document IDs:

| `_id` | Type |
| --- | --- |
| `siteSettings` | Global nav, contact, SEO defaults |
| `homePage` | Home hero and section copy |
| `aboutPage` | About page sections |
| `contactPage` | Contact / careers page copy |
| `disclaimerSettings` | Disclaimer popup |

The site builds with **fallback copy** from `src/lib/sanity/fallbacks.ts` when these documents are missing.

To **bootstrap** the production dataset with the same defaults (requires a write token):

```bash
export SANITY_API_WRITE_TOKEN="…"
pnpm sanity:seed
```

## On-demand ISR revalidation (Sanity webhooks)

Published CMS changes purge only the affected pages from Vercel’s ISR cache (instead of a full redeploy). Flow: Sanity GROQ webhook → `POST /api/revalidate` → `HEAD` each path with `x-prerender-revalidate`.

### Local env

Copy from [`.env.example`](.env.example):

- `SANITY_REVALIDATE_SECRET` — shared with the Sanity webhook
- `VERCEL_ISR_BYPASS_TOKEN` — must match `bypassToken` in [`astro.config.mjs`](astro.config.mjs); generate with `openssl rand -base64 32`
- `REVALIDATE_SITE_URL` — production origin (`https://cspartners.in`)

### Vercel (Production)

Set the same three variables in the Vercel project, then **redeploy** so `VERCEL_ISR_BYPASS_TOKEN` is baked into the adapter config.

### Sanity webhook

Canonical filter and projection live in [`sanity/webhook-revalidate.groq`](sanity/webhook-revalidate.groq). In [sanity.io/manage → Webhooks](https://www.sanity.io/manage):

| Field | Value |
| --- | --- |
| URL | `https://cspartners.in/api/revalidate` |
| Method | POST |
| Dataset | `production` |
| Events | Create, Update, Delete |
| Include drafts | off |
| Secret | `SANITY_REVALIDATE_SECRET` |
| Filter / Projection | Copy from `sanity/webhook-revalidate.groq` |
| API version | `v2026-04-22` |

### Verify

1. Deploy with env vars configured.
2. Publish a small `blogPost` edit in Studio.
3. Sanity webhook log should show `200` and `revalidated` including `/recent-matters-and-blogs/{slug}/`, `/recent-matters-and-blogs`, `/`.
4. Reload the post in the browser — content updates without waiting for the 24h ISR fallback.
