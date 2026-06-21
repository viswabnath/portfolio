# Viswanath Bodasakurthi — Portfolio

Personal portfolio of a Senior Software Engineer with 9+ years across clinical tech, banking, blockchain, and AI-powered SaaS. Built with Next.js 15 App Router, Three.js, and GSAP.

**Live:** [viswabnath.github.io/portfolio](https://viswabnath.github.io/portfolio)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 App Router + TypeScript |
| 3D / Shader | Three.js r128 — custom GLSL aurora fragment shader |
| Animations | GSAP 3.15 + ScrollTrigger |
| Styling | Global CSS design system (tokens in `:root`) |
| OG Image | `@vercel/og` — branded 1200×630 card at `/api/og` |
| Fonts | Cormorant Garamond · Outfit · JetBrains Mono via `next/font` |
| Deployment | Vercel |

---

## Running Locally

```bash
npm install
npm run dev       # → http://localhost:3000
npm run build     # production build check
```

---

## Project Structure

```
app/
├── layout.tsx          # Global metadata, OG tags, font loading
├── page.tsx            # Composes all section components
├── globals.css         # Full CSS design system — all tokens and styles
└── api/og/route.tsx    # Branded OG image endpoint

components/
├── AuroraCanvas.tsx    # Three.js GLSL shader (client component)
├── Hero.tsx            # Terminal boot sequence + GSAP entrance
├── Navbar.tsx          # Hamburger menu + active section tracking
├── Ticker.tsx          # Infinite scrolling marquee
├── About.tsx           # Expertise cards
├── Experience.tsx      # Career timeline
├── Projects.tsx        # Project cards grid
├── Skills.tsx          # Skill bars + cloud tags + certifications
├── Contact.tsx         # Contact info + social grid
└── BackToTop.tsx

data/                   # All site content as typed TypeScript arrays
├── projects.ts         # 8 projects with links, stack, badge type
├── experience.ts       # 5 career entries with achievements
├── skills.ts           # Skill bars (%) + cloud tags
└── certs.ts            # Anthropic + Outskill certifications

public/
└── resume.pdf          # Downloadable CV
```

---

## Content Updates

All content lives in `data/` — no need to touch components:

| What to change | File |
|---|---|
| Add / edit a project | `data/projects.ts` |
| Update career history | `data/experience.ts` |
| Add a skill or tag | `data/skills.ts` |
| Add a certification | `data/certs.ts` |
| Terminal boot sequence | `components/Hero.tsx` → `lines` array |
| Aurora shader colours | `components/AuroraCanvas.tsx` → `p0`–`p6` vec3 values |
| Resume PDF | Replace `public/resume.pdf` |

---

## Deployment

Push to `master` — Vercel auto-deploys on every push.

OG image is served dynamically at `/api/og` and picked up automatically by LinkedIn, Twitter, and WhatsApp when the portfolio URL is shared.
