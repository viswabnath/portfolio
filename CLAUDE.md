# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running Locally

**Requires Node 22 LTS** (v25 causes `.next` tmp file race conditions). Switch before starting:
```bash
nvm use 22
```

```bash
npm install
npm run dev      # → http://localhost:3000 (predev auto-cleans .next)
npm run build    # production build — must pass with zero errors before committing
```

## Architecture

**Next.js 15 App Router + TypeScript.** Single-page portfolio with component-based sections.

- `app/globals.css` — entire CSS design system (tokens, all class styles). Edit here, not in components.
- `lib/expYears.ts` — single source of truth for experience year calculation. Used by Hero, About, layout.tsx, and og/route.tsx.
- `data/*.ts` — all site content as typed arrays. Add/edit content here only.
- `components/` — one file per section. GSAP animations use `gsap.context()` with `ctx.revert()` cleanup.
- `app/api/og/route.tsx` — edge runtime OG image. Cannot import from `@/lib` — duplicates `calcExpYears` inline by design.

## Content Updates

| What | File |
|---|---|
| Projects | `data/projects.ts` |
| Experience timeline | `data/experience.ts` |
| Skill bars + cloud tags | `data/skills.ts` |
| Certifications | `data/certs.ts` |
| Terminal boot lines | `components/Hero.tsx` → `lines` array |
| Aurora palette | `components/AuroraCanvas.tsx` → `p0`–`p6` vec3 values |
| Ticker items | `components/Ticker.tsx` → `items` array |
| About expertise cards | `components/About.tsx` → `cards` array |
| Resume PDF | Replace `public/resume.pdf` |

## Key Rules

- `calcExpYears()` must never be hardcoded — always call the function from `@/lib/expYears`
- Copyright year in `app/page.tsx` uses `new Date().getFullYear()` — never hardcode
- All new components that use GSAP must wrap animations in `gsap.context()` and return `ctx.revert()` from useEffect cleanup
- `'use client'` only on components that use Three.js, GSAP, or browser APIs — everything else is server

## Deployment

Vercel — push to `master` to deploy. OG image at `/api/og` auto-generates on each request.
