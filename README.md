# C&S Partners — Astro site

Static site for [C&S Partners](https://cspartners.in), built with [Astro](https://astro.build/), Tailwind CSS v4 (`@tailwindcss/vite`), and [Sanity](https://www.sanity.io/) as the content backend via the official [`@sanity/astro`](https://github.com/sanity-io/sanity-astro) integration.

## Commands

| Command                     | Action                                                |
| :-------------------------- | :---------------------------------------------------- |
| `pnpm install`              | Install dependencies                                  |
| `pnpm dev`                  | Start dev server at `localhost:4321`                  |
| `pnpm build`                | Build to `./dist/`                                    |
| `pnpm preview`              | Preview the production build locally                  |
| `pnpm sanity:import:dry`    | Validate local seed files (no Sanity writes)         |
| `pnpm sanity:import`        | Upload images + upsert docs to Sanity (needs token)   |
| `pnpm sanity:import:verify` | Compare dataset document counts vs local seed counts  |

## Content (Sanity)

- **Studio:** embedded at [`/admin`](https://cspartners.in/admin) (hash router). Project **`u1i19rrb`**, organization **`odRmQq94n`**, dataset **`production`**.
- **Document types:** `blogPost`, `practiceArea`, `teamMember` (see [`src/sanity/schemaTypes/`](src/sanity/schemaTypes/) and [`sanity.config.ts`](sanity.config.ts)).
- **Site:** pages load published content at build time using `sanity:client` (see [`src/lib/sanity/queries.ts`](src/lib/sanity/queries.ts)).

### One-time import (existing text + images)

1. Copy [`.env.example`](.env.example) to `.env` and set `SANITY_API_WRITE_TOKEN` (Editor token with write access to the project).
2. Ensure local seed files exist (used by the importer):
   - `src/content/blog/*.md`
   - `src/content/practice-areas/*.md`
   - `src/data/team.ts` + `public/team/*` (or the script will try `https://cspartners.in/team/...` for each filename).
   - Blog / practice hero & icon files under `src/assets/` (or the script falls back to WordPress uploads URLs for those basenames).
3. Run:

```bash
pnpm sanity:import:dry   # optional
pnpm sanity:import       # uploads to production dataset
pnpm sanity:import:verify
```

### Vercel redeploy on publish (deploy hook)

1. In **Vercel** → Project → Settings → Git → **Deploy Hooks**, create a hook for the production branch and copy the URL.
2. Store it as `VERCEL_DEPLOY_HOOK_URL` in your password manager / Vercel env (reference only; the app does not read it).
3. In **Sanity** → Project `u1i19rrb` → API → **Webhooks**, create a webhook:
   - **URL:** the Vercel deploy hook URL (Sanity will `POST` / trigger per hook configuration).
   - **Trigger on:** document published (and optionally deleted if you want rebuilds on removal).
   - **Filter** (GROQ-powered), e.g. `_type in ["blogPost", "practiceArea", "teamMember"]` so unrelated edits do not redeploy.

Sanity’s webhook docs describe publish-only behaviour and GROQ filters: [GROQ-powered webhooks](https://www.sanity.io/docs/developer-guides/filters-in-groq-powered-webhooks).

## Legacy WordPress scrape (optional)

`scripts/wp-import.mjs` can regenerate local markdown + `src/data/team.ts` from a scraped `wp-json` tree. The Sanity importer above is the path to production content.

## Assets

Brand images live under `src/assets/`. Team headshots for the **import script** are read from `public/team/` when present.

## Deployment

Configured for [Vercel](https://vercel.com/) via `@astrojs/vercel` (`output: 'static'`).

Set **`PUBLIC_SANITY_PROJECT_ID`** and **`PUBLIC_SANITY_DATASET`** on Vercel (defaults match the repo, but setting them explicitly avoids surprises). The build fetches public published documents without a read token.
