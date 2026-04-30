# C&S Partners — Astro site

Static site for [C&S Partners](https://cspartners.in), built with [Astro](https://astro.build/), Tailwind CSS v4 (`@tailwindcss/vite`), and [Sanity](https://www.sanity.io/) as the content backend via the official [`@sanity/astro`](https://github.com/sanity-io/sanity-astro) integration.

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
