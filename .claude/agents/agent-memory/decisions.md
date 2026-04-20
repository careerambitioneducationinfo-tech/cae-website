# Agent Memory: Design & Technical Decisions

_Log important decisions here so agents don't re-debate them._

---

## Design Decisions

| Decision | Choice | Reason |
|----------|--------|--------|
| Primary font | Poppins | Client spec |
| Hindi font | Noto Sans Devanagari | Client spec |
| UI library | shadcn/ui v4 (`@base-ui/react`) | NOT Radix UI — use `@base-ui/react` APIs |
| Form library | React Hook Form + Zod | Client spec |
| Animation | Framer Motion ^11 | No CSS @keyframes, no Lottie, no GSAP |
| Image component | Next.js `<Image>` | WebP, lazy loading, CLS prevention |
| Image format | `.webp` everywhere | All `.png` converted to `.webp` via sharp (quality 85). Zero `.png` refs in source |
| Hero background | Dark `bg-dk` + radial glows | Clean, no Three.js aurora (removed — too heavy) |
| Form in hero | ❌ Removed | Form moved to dedicated `CTAFormSection` + popup |
| Partner colleges | Logo images from `/public/icons/` | Replaced text pills with actual university logos (all `.webp`) |
| MBBS country icons | Emoji flags (🇷🇺🇺🇿🇰🇬🇰🇿🇧🇩🇳🇵) | Replaced generic Lucide icons — flags are more recognisable and no library needed |
| Chatbot | Railway embed script | Automation team's script injected via `ClientProviders.tsx` useEffect — do NOT rebuild |
| FloatingWidget buttons | WhatsApp + Call only | Chatbot launcher rendered by Railway embed script — no duplicate button from our side |

---

## Form Fields (LOCKED — do not add optional fields back)

The lead form takes exactly **6 required fields** and 1 silent field:

| Field | Type | Required |
|-------|------|----------|
| `name` | text | ✅ min 2 chars |
| `phone` | tel | ✅ exactly 10 digits |
| `email` | email | ✅ valid email |
| `course` | select | ✅ from `COURSE_OPTIONS` |
| `status` | select | ✅ from `STATUS_OPTIONS` |
| `city` | text | ✅ min 2 chars |
| `source_page` | hidden | injected silently |

> `message` and `budget` fields were **permanently removed**. Do not add them back.

---

## Popup Behaviour (LOCKED)

| Page | Behaviour |
|------|-----------|
| `/` Homepage | Shows on **every page load/refresh** (no TTL). Only suppressed if lead already submitted |
| All other pages | Shows once per 24h, 2s delay |

> Popup structure: dark header (CAE logo + T2 taglines) → college logo marquee (10 logos) → LeadForm

---

## shadcn/ui v4 API Notes (IMPORTANT)

| Component | Correct API | Wrong API |
|-----------|-------------|-----------|
| Accordion | `<Accordion multiple={false}>` | ~~`type="single" collapsible`~~ |
| Tabs | `data-active:` for active styles | ~~`data-state="active"`~~ |
| Select | Use native `<select>` in forms | shadcn Select breaks RHF `register()` |

---

## Navigation Context

- `NavProvider` wraps the entire `<body>` in `app/layout.tsx`
- `useNav()` gives `drawerOpen` / `setDrawerOpen`
- **Navbar** calls `setDrawerOpen(true/false)` when hamburger opens/closes
- **FloatingWidget** reads `drawerOpen` — hides mobile CTA bar when drawer is open

---

## Page Layout Architecture

- `app/layout.tsx` renders: `NavProvider` → `Topbar` → `Navbar` → `{children}` → `Footer` → `ClientProviders`
- `ClientProviders` renders: `PopupController` (dynamic, ssr:false) + `FloatingWidget` + `Toaster`
- `ClientProviders` also injects Railway chatbot embed script via `useEffect`
- `FloatingWidget` desktop: WhatsApp + Call circles. Mobile: Call Now + WhatsApp pill bar

---

## Chatbot Embed — Technical Detail (CRITICAL)

```tsx
// ClientProviders.tsx useEffect pattern — DO NOT CHANGE
useEffect(() => {
  if ((window as CAEWindow).__CAEWidgetLoaded) return   // StrictMode guard
  ;(window as CAEWindow).CAE_SERVER_URL = 'https://web-production-a532a.up.railway.app'
  const script = document.createElement('script')
  script.src = 'https://web-production-a532a.up.railway.app/embed-widget.js'
  script.async = true
  document.body.appendChild(script)
  // NO cleanup — widget is global singleton. Removing script breaks StrictMode re-mount.
}, [])
```

**Why no cleanup:** React StrictMode runs `useEffect` twice (mount → cleanup → remount). If the script is removed in cleanup, the second mount injects it again, but `__CAEWidgetLoaded` is still `true` so the widget's IIFE returns early → icon never renders.

---

## Stats Bar

- Shows **6 stats only** (90%+ Loan Approval Rate removed — caused uneven grid on mobile)
- Layout: CSS grid `2 cols → 3 cols (sm) → 6 cols (lg)`
- Borders applied per-cell based on grid position (not `divide-x/y` which breaks on flex-wrap)

---

## Homepage Section Order (LOCKED)

1. HeroSection
2. StatsBar
3. AttentionHookSection
4. **VideoSection** ← portrait card (9:16) + modal player, source: `caevideo.mp4`
5. ServicesSection
6. CoursesSection
7. MBBSAbroadSection
8. BSSCLoanSection
9. **CTAFormSection** ← form lives here, `bg-dk`
10. PartnerCollegesSection
11. TestimonialsSection
12. **AboutSection** ← founder + photo carousel
13. FAQSection
14. FinalCTABanner

---

## Icon Standards (LOCKED)

All icons use **Lucide React** — no raw emojis in JSX except MBBS country flags.

| Section | Icon choices |
|---------|-------------|
| Services | `GraduationCap`, `Stethoscope`, `Plane`, `Banknote`, `TrendingUp`, `Users` |
| Courses | `Cpu` (B.Tech), `Stethoscope` (MBBS), `Plane` (Abroad), `Briefcase` (MBA), `TrendingUp` (BBA), `Code2` (BCA/MCA), `Smile` (BAMS/BDS), `Pill`, `Heart`, `Leaf`, `Scale`, `CreditCard` |
| About bullets | `GraduationCap`, `Building2`, `Globe`, `Users` |
| Hero trust badges | `CheckCircle` |
| Hero CTA | `GraduationCap` |

---

## Technical Decisions

| Decision | Choice | Reason |
|----------|--------|--------|
| Framework | Next.js 15 App Router | Client spec |
| Database | Supabase (PostgreSQL) | Client spec |
| Hosting | Railway, `output: 'standalone'` | Client spec |
| Email | Nodemailer Gmail SMTP | Client spec |
| `dynamic(..., { ssr: false })` | In `ClientProviders.tsx` (client component) | Next.js 15: `ssr: false` not allowed in Server Components |
| `NavProvider` placement | `app/layout.tsx` body wrapper | Must wrap both `Navbar` and `ClientProviders` to share state |
| Image optimisation | `avif`+`webp` formats, 30-day cache TTL | Faster loads on Railway (no CDN, cold starts reset cache without TTL) |

---

## Navbar / Footer Logo

- Logo asset: `/public/icons/cae logo.webp` (converted from `.png`)
- Size: `width={40} height={40}` with `className="h-10 w-10 object-contain shrink-0"`
- Navbar desktop + drawer: `priority` prop (above-fold)
- Footer brand column: no `priority` prop (below-fold)

---

## Courses Page Decisions

| Decision | Choice | Reason |
|----------|--------|--------|
| Hero background | `#1A183E` | Matches dark site theme |
| Hero right panel | 3-slide carousel + logo marquee | Consistent with homepage HeroSection |
| CTA button layout mobile | `flex flex-wrap` | `flex-col` caused 100% width stretch |
| College data file | `lib/collegeData.ts` | Too large for constants.ts; typed with `College` interface |

---

## Bug Fixes Applied

| Bug | Fix |
|-----|-----|
| `outline-ring/50` CSS crash | Removed from `globals.css` — Tailwind v3 can't apply opacity modifier to `oklch()` vars |
| Stats bar duplicate Hindi labels | Fixed `labelHi` in `lib/constants.ts` for 5 stats |
| CourseFinder 0 results Medical/BAMS | Added 10 colleges to `lib/collegeData.ts` |
| Hero animation invisible on courses page | `whileInView` + `viewport={viewportOnce}` instead of `animate="visible"` |
| Chatbot icon not showing | StrictMode double-mount fix in `ClientProviders.tsx` — removed cleanup, added `__CAEWidgetLoaded` guard |

---

## Pending from Client

- [ ] `careerambition.com` DNS → Railway
- [ ] YouTube channel URL (placeholder in Footer)
- [ ] Chatbot icon live verification

---

_Last updated: 2026-04-20_
