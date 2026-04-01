# Agent Memory: Project State

_This file tracks what has been built. Update after each completed task._
_Format: ⬜ Not started | 🔄 In progress | ✅ Done | ❌ Blocked_

---

## Foundation (Do First)

| Item | Status | Notes |
|------|--------|-------|
| `npm install framer-motion@^11` | ⬜ | Run before any component work |
| `npm install sharp` | ⬜ | Required for Next.js image optimization |
| Remove `lottie-react` from package.json | ⬜ | |
| `app/globals.css` — CSS custom properties added | ⬜ | From brand-rules.md |
| `tailwind.config.ts` — CAE tokens added | ⬜ | From brand-rules.md |
| `/lib/animations.ts` created | ⬜ | All Framer Motion variants |
| `/lib/popup.ts` created | ⬜ | shouldShowPopup, markPopupShown, markLeadSubmitted |
| `/lib/constants.ts` created | ⬜ | Phone, email, address, stats, course lists |
| `/lib/validations.ts` created | ⬜ | Zod schemas |
| `/lib/supabase.ts` created | ⬜ | supabase + supabaseAdmin clients |
| `/lib/mailer.ts` created | ⬜ | Nodemailer transporter |
| `/types/index.ts` created | ⬜ | All TypeScript interfaces |

---

## Shared Components

| Component | Status | Location | Notes |
|-----------|--------|----------|-------|
| `Navbar` | ⬜ | `components/shared/` | Mobile hamburger + Framer Motion nav drawer |
| `Footer` | ⬜ | `components/shared/` | 4-column grid, dark navy bg |
| `SectionWrapper` | ⬜ | `components/shared/` | Framer Motion scroll-reveal wrapper |
| `AnimatedStat` | ⬜ | `components/shared/` | Spring counter for stats bar |
| `ChatbotWidget` | ⬜ Pending | `components/shared/` | From automation team — do not build |

---

## Form Components

| Component | Status | Location | Notes |
|-----------|--------|----------|-------|
| `LeadForm` | ⬜ | `components/forms/` | Inline + popup variants, RHF + Zod |
| `PopupController` | ⬜ | `components/forms/` | Mounted in layout.tsx |

---

## API Routes

| Route | Status | Notes |
|-------|--------|-------|
| `POST /api/leads` | ⬜ | Supabase insert + Nodemailer email |
| `POST /api/contact` | ⬜ | Nodemailer email only |

---

## Pages

| Page | Status | Popup | Animations | Images | Notes |
|------|--------|-------|------------|--------|-------|
| Homepage (`/`) | ⬜ | ⬜ 0s delay | ⬜ | ⬜ hero priority | T1 hero, T3 hook, stats bar |
| Courses (`/courses`) | ⬜ | ⬜ 2s delay | ⬜ | ⬜ | Filterable course grid |
| Study Abroad (`/study-abroad`) | ⬜ | ⬜ 2s delay | ⬜ | ⬜ | Country cards, fee table |
| BSCC Loan (`/bscc-loan`) | ⬜ | ⬜ 2s delay | ⬜ | ⬜ | T4 tagline, 4-step process |
| About (`/about`) | ⬜ | ⬜ 2s delay | ⬜ | ⬜ | Founder photo, team, offices |
| Contact (`/contact`) | ⬜ | ⬜ 2s delay | ⬜ | ⬜ | Map embed, contact form |
| Blog (`/blog`) | ⬜ | ⬜ 2s delay | ⬜ | ⬜ | Article listing with SEO slugs |

---

## Infrastructure

| Item | Status | Notes |
|------|--------|-------|
| Supabase project created | ⬜ | |
| `leads` table + RLS created | ⬜ | See db-schema.md |
| `blog_posts` table created | ⬜ | See db-schema.md |
| Gmail App Password configured | ⬜ | For SMTP_PASS env var |
| `.env.local` filled with all vars | ⬜ | Never commit this file |
| Railway project created | ⬜ | |
| `output: 'standalone'` in next.config.ts | ⬜ | Required for Railway |
| `$PORT` in package.json start script | ⬜ | `"start": "next start -p $PORT"` |
| Railway env variables set | ⬜ | Copy from .env.local |
| Domain `careerambition.com` connected | ⬜ | CNAME in registrar |

---

## OG Images (for SEO)

| Image | Status | Path |
|-------|--------|------|
| Homepage OG | ⬜ | `/public/og/home.webp` |
| Courses OG | ⬜ | `/public/og/courses.webp` |
| Study Abroad OG | ⬜ | `/public/og/study-abroad.webp` |
| BSCC Loan OG | ⬜ | `/public/og/bscc-loan.webp` |
| About OG | ⬜ | `/public/og/about.webp` |
| Contact OG | ⬜ | `/public/og/contact.webp` |
| Blog OG | ⬜ | `/public/og/blog.webp` |

---

_Last updated: [date]_
_Update this file after completing each item — mark ✅ Done or ❌ Blocked with a note._
