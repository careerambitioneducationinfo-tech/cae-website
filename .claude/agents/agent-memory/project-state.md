# Agent Memory: Project State

_This file tracks what has been built. Update after each completed task._
_Format: ⬜ Not started | 🔄 In progress | ✅ Done | ❌ Blocked_

---

## Foundation

| Item | Status | Notes |
|------|--------|-------|
| `app/globals.css` — CSS custom properties | ✅ | CAE brand tokens live. Mobile chatbot push-up selector updated to URL-agnostic class/id patterns |
| `tailwind.config.ts` — CAE tokens | ✅ | `ind`, `yel`, `dk`, `wa`, `pur`, `bdr`, `il`, `amb`, `font-hindi`, `max-w-brand`, `rounded-brand` |
| `/lib/animations.ts` | ✅ | `fadeInUp`, `fadeInLeft`, `fadeInRight`, `scaleIn`, `staggerContainer`, `staggerSlow`, `navDrawer`, `popupEntry`, `overlayVariants`, `buttonTap`, `cardHover`, `counterSpring`, `viewportOnce` |
| `/lib/popup.ts` | ✅ | `shouldShowPopup`, `markPopupShown`, `markLeadSubmitted`, `hasSubmittedLead` |
| `/lib/constants.ts` | ✅ | `SITE`, `SOCIAL`, `TAGLINES`, `STATS` (6 used), `COURSE_OPTIONS`, `STATUS_OPTIONS`, `MBBS_COUNTRIES`, `BSCC`, `POPUP` |
| `/lib/validations.ts` | ✅ | `leadSchema` — 6 required fields: name, phone, email, course, status, city |
| `/lib/supabase.ts` | ✅ | `supabase` (public) + `supabaseAdmin` (server) |
| `/lib/mailer.ts` | ✅ | Nodemailer transporter |
| `/lib/nav-context.tsx` | ✅ | `NavProvider` + `useNav` — shares drawer open state between Navbar and FloatingWidget |

---

## Shared Components

| Component | Status | Notes |
|-----------|--------|-------|
| `Topbar` | ✅ | Server component, `bg-dk`, phone + address + hours |
| `Navbar` | ✅ | Sticky, scroll shadow, mobile drawer with all 7 pages + icons. Logo: `/icons/cae logo.webp`. Uses `useNav` to sync drawer state |
| `Footer` | ✅ | 4-col grid, `bg-dk`, social links, quick links, courses, contact. Logo: `/icons/cae logo.webp` |
| `SectionWrapper` | ✅ | `animate` prop, `outerClassName`, `className`, `id` |
| `AnimatedStat` | ✅ | Spring counter, parses value string (e.g. "10,000+") |
| `FloatingWidget` | ✅ | Desktop: 2 stacked circles (WhatsApp + Call). Mobile: pill bar (Call Now + WhatsApp). Bar hides when nav drawer opens via `useNav`. Chatbot launcher rendered independently by Railway embed script |
| `ClientProviders` | ✅ | Wraps `PopupController` + `FloatingWidget` + `Toaster`. Injects Railway chatbot embed script via `useEffect` with StrictMode-safe `__CAEWidgetLoaded` guard |
| `ChatbotWidget.tsx` | ❌ | Deleted — replaced by Railway embed script in `ClientProviders` |

---

## Chatbot Integration

| Item | Status | Notes |
|------|--------|-------|
| Railway embed script | ✅ | Loaded via `useEffect` in `ClientProviders.tsx`. Sets `window.CAE_SERVER_URL` then appends `<script src="...embed-widget.js">` |
| StrictMode guard | ✅ | `window.__CAEWidgetLoaded` check prevents double-init in React StrictMode |
| No cleanup on unmount | ✅ | Widget is global singleton — removing script breaks re-mount cycle |
| Mobile positioning | ✅ | `globals.css` pushes chatbot launcher 80px above pill bar via URL-agnostic selectors |
| Icon visibility | 🔄 | Pending confirmation from user — fix applied, needs verification on live site |

---

## Form Components

| Component | Status | Notes |
|-----------|--------|-------|
| `LeadForm` | ✅ | 6 required fields (name, phone, email, course, status, city). `compact` prop for popup vs hero layout |
| `PopupController` | ✅ | Homepage: shows every page load/refresh. Other pages: once per 24h, 2s delay. Dark header with CAE logo + T2 taglines + college logo marquee (10 logos) |

---

## API Routes

| Route | Status | Notes |
|-------|--------|-------|
| `POST /api/leads` | ✅ | Supabase insert + Nodemailer email. Fields: name, phone, email, course, status, city, source_page |
| `POST /api/contact` | ✅ | Built — handled by `app/api/contact/route.ts` |

---

## Homepage Sections (`app/page.tsx`)

| Section | Status | Notes |
|---------|--------|-------|
| `HeroSection` | ✅ | Dark `bg-dk`, left content + right 3-slide carousel (`.webp` images) + course pill marquee. GraduationCap Lucide icon in CTA |
| `StatsBar` | ✅ | 6 stats, CSS grid 2→3→6 cols, consistent border dividers |
| `AttentionHookSection` | ✅ | `bg-dk`, T3 tagline hook |
| `VideoSection` | ✅ | Small portrait card (140px, 9:16) with muted autoplay preview. Click → enlarged portrait modal (`min(340px, 80vw)`). Mute toggle + close button. Source: `/images/team/caevideo.mp4` |
| `ServicesSection` | ✅ | 6 service cards. Icons: `GraduationCap`, `Stethoscope`, `Plane`, `Banknote`, `TrendingUp`, `Users` |
| `CoursesSection` | ✅ | 5 filter tabs, 12 course cards. Icons updated: `Cpu` (B.Tech), `Code2` (BCA/MCA), `TrendingUp` (BBA), `Smile` (BAMS/BDS) |
| `MBBSAbroadSection` | ✅ | `bg-dk`, 6 country cards with emoji flags (🇷🇺🇺🇿🇰🇬🇰🇿🇧🇩🇳🇵), T2 tagline right col |
| `BSSCLoanSection` | ✅ | T4 tagline, 4 fact cards, 4-step process |
| `CTAFormSection` | ✅ | `bg-dk`, left trust bullets, right `LeadForm` white card |
| `PartnerCollegesSection` | ✅ | Logo marquee, 10 logos, all `.webp` |
| `TestimonialsSection` | ✅ | 3 student cards, initials avatar, star rating |
| `AboutSection` | ✅ | Left: Chandan Sawan founder (`chandanprofile.webp`) + 4 bullet points (Globe icon for MBBS/global). Right: 2-slide photo carousel |
| `FAQSection` | ✅ | 6 Hinglish Q&As, shadcn Accordion |
| `FinalCTABanner` | ✅ | Gradient banner, 3 CTAs (counseling + whatsapp + call) |

**Page order:** Hero → Stats → AttentionHook → **Video** → Services → Courses → MBBSAbroad → BSSCLoan → CTAForm → PartnerColleges → Testimonials → About → FAQ → FinalCTABanner

---

## Image Assets

| Status | Notes |
|--------|-------|
| ✅ All `.png` → `.webp` | Converted via `sharp` (quality 85). Zero `.png` references remain in any source file |
| ✅ `next.config.mjs` optimised | `formats: ['image/avif', 'image/webp']`, `minimumCacheTTL: 2592000` (30 days), optimised `deviceSizes` + `imageSizes` |

| Asset | Path | Status |
|-------|------|--------|
| CAE Logo | `/public/icons/cae logo.webp` | ✅ |
| Experience slide | `/public/icons/careerambitionexperince.webp` | ✅ |
| All courses slide | `/public/icons/allcourses.webp` | ✅ |
| DRCC scheme slide | `/public/icons/drcc_scheme.webp` | ✅ |
| Collage photo | `/public/icons/collag.webp` | ✅ |
| Founder photo | `/public/images/team/chandanprofile.webp` | ✅ |
| CAE promo video | `/public/images/team/caevideo.mp4` | ✅ |
| Partner college logos (10) | `/public/icons/*.webp` | ✅ All converted |

---

## Infrastructure

| Item | Status | Notes |
|------|--------|-------|
| Supabase project | ✅ | Connected — URL + anon key + service role key set in Railway env vars |
| `leads` table | ✅ | Live in Supabase |
| Gmail App Password | ✅ | `GMAIL_APP_PASSWORD` set in Railway |
| `.env.local.example` | ✅ | Includes `NEXT_PUBLIC_CHATBOT_URL` |
| Railway deployment | ✅ | Live at `https://cae-website-production.up.railway.app/` |
| GitHub repo | ✅ | `https://github.com/careerambitioneducationinfo-tech/cae-website` |
| Domain connection | ⬜ | `careerambition.com` CNAME → Railway (pending) |

---

## All Pages

| Page | Status | Notes |
|------|--------|-------|
| `/` Homepage | ✅ | All 14 sections live |
| `/courses` | ✅ | Hero, StreamPills, CourseFinder, CourseCategories, BSSCHighlight, Colleges, Exams, LeadForm, FAQ |
| `/study-abroad` | ✅ | Built — `StudyAbroadContent.tsx` + dynamic `[country]` routes |
| `/bscc-loan` | ✅ | Built — `BsccContent.tsx` |
| `/about` | ✅ | Built — `AboutContent.tsx` |
| `/contact` | ✅ | Built — `ContactContent.tsx` |
| `/blog` | ✅ | Built — `BlogContent.tsx` + dynamic `[slug]` routes |

---

## Pending / Known Issues

| Item | Notes |
|------|-------|
| Chatbot icon visibility | Fix applied (StrictMode guard), needs live verification |
| `careerambition.com` domain | DNS not yet pointed to Railway |
| YouTube URL | Not yet provided by client — placeholder in Footer |

---

_Last updated: 2026-04-20_
