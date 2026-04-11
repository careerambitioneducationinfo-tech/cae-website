# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Reference

Full project spec, brand rules, language rules, and agent instructions live in [`.claude/CLAUDE.md`](.claude/CLAUDE.md). Read it before building any page or component — it is the single source of truth for content, design tokens, animation variants, and the Hinglish language strategy.

---

## Commands

```bash
# Development
npm run dev          # Start dev server on http://localhost:3000

# Production build
npm run build        # Runs NODE_ENV=production next build (standalone output)

# Lint
npm run lint

# Type-check only (no emit)
npx tsc --noEmit
```

> **Build quirk:** Your shell has `NODE_ENV=development` set globally. The `build` script explicitly sets `NODE_ENV=production` to prevent React's prod/dev runtimes from mixing. Never run `next build` directly — always use `npm run build`.

---

## Architecture

### Stack
- **Next.js 15.1.7** · App Router · `output: 'standalone'` (Railway deployment)
- **React 19** — required by shadcn/ui v4 (`@base-ui/react`)
- **TypeScript** — strict, no `any`
- **Tailwind CSS** + `tailwindcss-animate` + `tw-animate-css`
- **shadcn/ui v4** (`shadcn@4`) — components in `components/ui/`, backed by `@base-ui/react`
- **Framer Motion ^11** — ALL animations; no CSS `@keyframes`, no GSAP, no Lottie
- **Supabase** (PostgreSQL) — lead storage
- **Nodemailer** (Gmail SMTP) — email on form submit
- **React Hook Form + Zod** — all forms

### `lib/` — shared utilities (always import from here, never hardcode)

| File | Purpose |
|------|---------|
| [`lib/animations.ts`](lib/animations.ts) | All Framer Motion variants (`fadeInUp`, `staggerContainer`, `popupEntry`, `navSlide`, `cardHover`, `buttonTap`, etc.) — single source of truth |
| [`lib/constants.ts`](lib/constants.ts) | `SITE`, `TAGLINES`, `STATS`, `COURSE_OPTIONS`, `STATUS_OPTIONS`, `POPUP` — never hardcode phone/email/address |
| [`lib/validations.ts`](lib/validations.ts) | `leadSchema` (Zod) + `LeadFormData` type |
| [`lib/supabase.ts`](lib/supabase.ts) | `supabase` (public/browser) + `supabaseAdmin` (server-only) |
| [`lib/mailer.ts`](lib/mailer.ts) | Nodemailer `transporter` — server-only |
| [`lib/popup.ts`](lib/popup.ts) | `shouldShowPopup()` / `markPopupShown()` — localStorage helpers |
| [`lib/utils.ts`](lib/utils.ts) | shadcn `cn()` utility |

### Components
- `components/ui/` — shadcn/ui primitives (button, input, dialog, select, card, badge, separator, label)
- `components/shared/` — Navbar, Footer, SectionWrapper, AnimatedStat, ChatbotWidget *(to be built)*
- `components/forms/` — LeadForm, PopupController *(to be built)*

### App Router pages (`app/`)
All pages are Server Components by default. Client interactivity requires `"use client"`.

```
app/
├── layout.tsx          ← Poppins + Noto Sans Devanagari fonts; mounts <PopupController>
├── page.tsx            ← Homepage (popup delay: 0ms)
├── globals.css         ← CSS variables (shadcn tokens + brand custom properties)
├── courses/page.tsx
├── study-abroad/page.tsx
├── bscc-loan/page.tsx
├── about/page.tsx
├── contact/page.tsx
├── blog/page.tsx
└── api/
    ├── leads/route.ts  ← POST: validate → Supabase insert → Nodemailer
    └── contact/route.ts
```

### Key design constraints
- **Popup on every page** — `<PopupController>` in `app/layout.tsx`; homepage delay 0ms, all others 2000ms
- **Images** — always `<Image>` from `next/image`, WebP format, max 200 KB, English alt text only; remote images restricted to `*.supabase.co` in [`next.config.mjs`](next.config.mjs)
- **Animations** — import variants from `lib/animations.ts`; use `viewportOnce` for scroll triggers
- **Colors** — use Tailwind tokens `bg-ind`, `text-yel`, `bg-dk`, etc. defined in [`tailwind.config.ts`](tailwind.config.ts)
- **Fonts** — `font-sans` → Poppins, `font-hindi` → Noto Sans Devanagari

### Environment variables
Copy `.env.local.example` → `.env.local` and fill in:
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY   # server-only, never expose client-side
GMAIL_USER
GMAIL_APP_PASSWORD
SMTP_TO
PORT
```
