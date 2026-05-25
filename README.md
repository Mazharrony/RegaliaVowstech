# Regalia Vows Tech — Studio Website

Editorial, light-first marketing site for **Regalia Vows Tech**, a Dubai-based studio for branding, marketing, software, automation and event/expo experiences.

## Stack

- Next.js 16 App Router + TypeScript + Turbopack
- Tailwind CSS v4 with editorial design tokens
- Framer Motion for reveals, marquees, presence transitions
- next-intl for English + Arabic (RTL) routing
- Resend + Server Actions for the contact form
- Zod for validation, Sonner for toasts, Lucide for icons

## Getting started

```bash
npm install
cp .env.example .env.local   # fill RESEND_API_KEY, CONTACT_TO_EMAIL, etc.
npm run dev
```

Open `http://localhost:3000` — you'll be redirected to `/en`. Arabic is at `/ar`.

## Scripts

| Script          | Purpose                       |
| --------------- | ----------------------------- |
| `npm run dev`   | Dev server (Turbopack)        |
| `npm run build` | Production build              |
| `npm run start` | Serve the production build    |
| `npm run lint`  | ESLint                        |

## Structure

```
src/
  app/[locale]/      Locale-prefixed routes (/en, /ar)
    services/[slug]  work/[slug]  insights/[slug]
    about  process  contact  legal/{privacy,terms}
    layout.tsx       Root locale layout (fonts, providers, header/footer)
    not-found.tsx
  app/sitemap.ts  app/robots.ts
  components/layout    Header, Footer, LocaleSwitcher
  components/motion    Reveal, TextSplit, Marquee, MagneticButton
  components/sections  Home + shared page sections, ContactForm
  content/             services, work, insights, company (typed TS)
  i18n/                routing.ts, navigation.ts, request.ts
  lib/                 utils.ts, actions/contact.ts
messages/              en.json, ar.json
middleware.ts          next-intl locale middleware
```

## Content

All content lives as typed TS in `src/content`. Replace placeholder copy, case studies, clients and testimonials with the real ones — types will guide you.

## Environment variables

| Key                    | Required | Description                              |
| ---------------------- | -------- | ---------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | –        | Used for metadata, sitemap, canonical    |
| `RESEND_API_KEY`       | prod     | Resend API key for the contact form      |
| `CONTACT_TO_EMAIL`     | prod     | Inbox that receives new project briefs   |
| `CONTACT_FROM_EMAIL`   | prod     | Verified `from` sender on Resend         |

Without `RESEND_API_KEY` the contact form succeeds silently (no email sent) — useful for local dev.

## Deployment

Designed for Vercel. Connect the repo, set env vars, attach the domain. No additional config required.
