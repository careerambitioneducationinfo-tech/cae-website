# Career Ambition Education (CAE) — Claude Project Instructions

## 🏢 Client Overview

**Company:** Career Ambition Education (CAE)
**Founder:** Chandan Sawan
**Founded:** 2009 (17+ years of experience)
**Location:** Ram Saraan Gate, Chandmari, Motihari, Bihar 845401
**Phone/WhatsApp:** +91-9973774459
**Email:** contact@careerambitioneducation.com
**Domain:** careerambition.com
**Hours:** Monday–Saturday, 9AM–7PM

---

## 🎯 Project Goal

Build a **modern, high-converting education consultancy website** for CAE targeting students from Bihar and Eastern India aged 17–22. The website must generate leads, explain services, and build trust.

---

## 🧱 Tech Stack

| Layer       | Technology                                              |
|-------------|---------------------------------------------------------|
| Framework   | Next.js 14 (App Router)                                 |
| Language    | TypeScript                                              |
| Styling     | Tailwind CSS + inline styles                            |
| UI Library  | shadcn/ui (Radix UI)                                    |
| Icons       | Lucide React                                            |
| Animation   | **Framer Motion (^11.x)**                               |
| Images      | **Next.js `<Image>` (WebP, lazy-loaded, priority hero)**|
| Forms       | React Hook Form + Zod                                   |
| Database    | Supabase (PostgreSQL)                                   |
| API         | Next.js API Routes                                      |
| Email       | Nodemailer (Gmail SMTP)                                 |
| Hosting     | Railway                                                 |

> **Note:** Lottie React has been removed. Chatbot frontend provided by automation team — integrate as-is.

---

## 🎨 Brand Identity

### Colors
```
Primary:    #2E2567  (Dark Indigo)
Secondary:  #644A9E  (Medium Purple)
Accent:     #FBD207  (Bright Yellow)
Amber:      #ECA121
WhatsApp:   #25D366
Dark Navy:  #1A1840
Background: #F5F5F8
Border:     #E2E0F0
```

### Typography
- **English:** Poppins (weights: 400, 500, 600, 700, 800, 900)
- **Hindi:** Noto Sans Devanagari (weights: 400, 500, 700, 800)

### Tone
Trustworthy · Friendly · Aspirational · Knowledgeable · Success-oriented

### 🎞️ Animation Tokens (Framer Motion)

All variants defined in `/lib/animations.ts` — never inline.

| Token          | Value                                          | Usage                         |
|----------------|------------------------------------------------|-------------------------------|
| `fadeInUp`     | y: 24→0, opacity: 0→1, duration: 0.5          | Section reveals on scroll     |
| `staggerChild` | staggerChildren: 0.08                          | Card grids, stat counters     |
| `popupEntry`   | scale: 0.92→1, opacity: 0→1, duration: 0.3    | Popup form entrance           |
| `navSlide`     | x: -100%→0, duration: 0.35                    | Mobile nav drawer             |
| `counterRoll`  | Spring stiffness: 100, damping: 30             | Stat counters (10,000+, etc.) |
| `cardHover`    | y: -4px, scale: 1.02, duration: 0.22          | Course cards, office cards    |
| `buttonTap`    | scale: 0.96, duration: 0.1                    | All CTA buttons               |

### 📣 Official Taglines (Attention-Grabbing — Use on Website)

> Do NOT paraphrase or translate these taglines. Use them verbatim.

| # | Tagline | Best Used On |
|---|---------|--------------|
| T1 | `"आपके सपनों के College में Admission — हम करेंगे आसान!"` | Hero headline, popup heading |
| T2 | `"17 वर्षों से चंपारण की सबसे विश्वसनीय संस्था"` + `"10,000+ छात्रों का विभिन्न पाठ्यकर्मों में सफल नामांकन"` | Trust section, About hero |
| T3 | `"कभी सोंचा है"` + `"12 के बाद क्या ?"` | Homepage attention hook banner |
| T4 | `"अब fees की tension क्यों जब DRCC है साथ में!"` | BSCC loan hero, loan section |

#### Tagline Usage Rules
- **T1** → Primary hero headline on homepage — always first
- **T2** → Always a 2-line block, never split apart
- **T3** → 2-line dramatic break: small line 1 → large bold line 2 (pause + hook)
- **T4** → Exclusive to BSCC loan sections; pair with `"Free Counseling लें"` CTA

---

## 🌐 Language Strategy (CRITICAL — Always Follow)

**Primary Language:** Hinglish (Hindi + English mixed)

| Element      | Rule                                 | Example                                            |
|--------------|--------------------------------------|----------------------------------------------------|
| Headings     | Start Hindi, then English            | `"आपके सपनों के College में Admission"`            |
| CTAs/Buttons | Hindi + English mixed                | `"Free Counseling लें"`, `"Apply करें"`            |
| Descriptions | Full Hinglish sentences              | `"Free counseling, कोई obligation नहीं।"`          |
| Form errors  | Full Hindi                           | `"कृपया अपना नाम डालें"`                           |
| Success msgs | Full Hindi with name                 | `"धन्यवाद [Name]! हम 2 घंटे में call करेंगे। 🎓"` |
| FAQ          | Questions + Answers in Hinglish      | —                                                  |
| Blog titles  | Hinglish for SEO                     | `"JEE Main 2026 ke baad B.Tech best colleges"`     |
| Meta tags    | English only                         | —                                                  |
| URL slugs    | English only (lowercase, hyphenated) | `/mbbs-abroad`, `/bscc-loan`                       |
| Numbers      | Always English numerals              | `"10,000+"` not `"१०,०००+"`                        |
| College names| Always English                       | `"Chandigarh University"`                          |

---

## 📄 Pages

| Page       | Path           | Purpose                                          |
|------------|----------------|--------------------------------------------------|
| Homepage   | `/`            | Lead generation + overview + popup form on load  |
| Courses    | `/courses`     | College finder + course categories               |
| Study Abroad | `/study-abroad` | MBBS abroad detailed info                     |
| DRCC/BSCC  | `/bscc-loan`   | Loan scheme details                              |
| About Us   | `/about`       | CAE story, team, offices                         |
| Contact    | `/contact`     | All contact methods + map                        |
| Blog       | `/blog`        | SEO articles                                     |

---

## 📋 Lead Form Fields

### Required
- `name` — min 2 characters
- `phone` — exactly 10 digits
- `courseInterest` — select dropdown
- `currentStatus` — select dropdown
- `city` — text

### Optional
- `email` · `message` · `budgetRange`

### Course Options
```
B.Tech / Engineering | MBBS India | MBBS Abroad | MBA | BBA |
BCA/MCA | BAMS/BDS | B.Pharma | B.Sc Nursing | B.Sc Agriculture |
LLB | BSCC Loan | Other
```

### Status Options
```
Appearing in 12th (2026) | 12th Pass (2025) | Gap Year |
Graduation Lateral | Parent inquiring
```

---

## 🏥 MBBS Abroad Countries

| Country    | Fee (Total) | Duration  |
|------------|-------------|-----------|
| Russia     | ₹35–40L     | 6 Years   |
| Uzbekistan | ₹20–30L     | 6 Years   |
| Kyrgyzstan | ₹20–25L     | 6 Years   |
| Kazakhstan | ₹20–30L     | 6 Years   |
| Bangladesh | ₹20–35L     | 5.5 Years |
| Nepal      | ₹25–45L     | 5.5 Years |

> All universities: NMC approved + WHO listed. English medium. CAE provides FMGE/NEXT coaching.

---

## 💳 BSCC Loan Key Facts

- **Amount:** Up to ₹4,00,000 · **Interest:** 0% (Bihar Govt scheme)
- **Eligibility:** Bihar domicile, 12th pass/appearing, admitted to recognized college
- **CAE Stats:** 3,000+ loans processed · 90%+ approval rate · Free service
- **Timeline:** 10–15 days for sanction

---

## 📊 Key Statistics (Use Exactly)

```
10,000+   Successful admissions
17+       Years of experience
490+      Expert counselors
20        Bihar offices
100+      Partner colleges
3,000+    BSCC loans processed
90%+      BSCC loan approval rate
```

---

## 🔗 Social Media

- **Facebook:** https://www.facebook.com/careereducation.info
- **Instagram:** https://www.instagram.com/careerambitioneducation/
- **YouTube:** (link to be added)
- **WhatsApp:** +91-9973774459

---

## ⚙️ Development Rules

1. **TypeScript always** — no `any` types; define proper interfaces.
2. **Mobile-first is non-negotiable** — Bihar audience is 90%+ mobile. Test every component at 375px before desktop.
3. **Supabase** for all form submissions and lead storage.
4. **Nodemailer (Gmail SMTP)** for email notifications on form submit.
5. **React Hook Form + Zod** for all form validation.
6. **Framer Motion for ALL animations** — no CSS `@keyframes`, no Lottie, no GSAP. Use `motion.div`, `AnimatePresence`, `useInView`, `useScroll`, `useMotionValue`.
7. **Every page must show the popup lead form on load** — no exceptions. Mount `<PopupController>` in `app/layout.tsx`.
8. **Homepage popup: 0s delay. All other pages: 2s delay.**
9. **Hero images:** WebP, use `<Image priority>`, target LCP < 2.5s on 3G.
10. **All images use Next.js `<Image>`** — never raw `<img>` tags. Alt text in English only.
11. **Do NOT rebuild the chatbot** — integrate automation team's file as-is.
12. **SEO:** Meta tags, URL slugs, and alt text in English only.
13. **Fonts:** Poppins + Noto Sans Devanagari from Google Fonts.
14. **CSS variables:** All brand colors defined in `app/globals.css` and `tailwind.config.ts`.

---

## 📁 `.claude` Directory Structure

```
.claude/
├── CLAUDE.md                            ← This file (project bible)
├── settings.json                        ← Claude Code permissions + env
├── rules/
│   ├── language-rules.md                ← 10 Hinglish rules (ALWAYS follow)
│   ├── brand-rules.md                   ← Colors, CSS vars, Tailwind config, taglines
│   ├── dev-rules.md                     ← Code standards, animation rules, image rules, DoD
│   └── content-check.md                 ← Content audit checklist
├── skills/
│   ├── new-page.md                      ← Page scaffold with popup + animations + image
│   ├── new-component.md                 ← Component scaffold with Framer Motion patterns
│   ├── lead-form.md                     ← Form spec + popup trigger rules
│   └── db-schema.md                     ← Supabase schema reference
└── agents/
    ├── content-writer.md                ← Writes all Hinglish copy
    ├── ui-builder.md                    ← Builds React components/pages
    ├── seo-specialist.md                ← Handles SEO meta + keywords
    ├── developer.md                     ← Builds features end-to-end
    ├── reviewer.md                      ← Audits code, brand, language, a11y
    ├── tester.md                        ← QA all features end-to-end
    └── agent-memory/
        ├── project-state.md             ← Tracks build progress
        └── decisions.md                 ← Logs key decisions
```

---

## 📁 Project File Structure

```
/app
  /page.tsx                    ← Homepage
  /courses/page.tsx
  /study-abroad/page.tsx
  /bscc-loan/page.tsx
  /about/page.tsx
  /contact/page.tsx
  /blog/page.tsx
  /layout.tsx                  ← Mounts <PopupController> + <ChatbotWidget>
  /globals.css                 ← CSS custom properties (all brand tokens)
  /api
    /leads/route.ts
    /contact/route.ts
/components
  /ui/                         ← shadcn/ui components
  /shared/
    Navbar.tsx
    Footer.tsx
    SectionWrapper.tsx         ← Framer Motion scroll-reveal wrapper
    AnimatedStat.tsx           ← Spring counter
    ChatbotWidget.tsx          ← Automation team file — do not modify
  /forms/
    LeadForm.tsx
    PopupController.tsx        ← Global popup manager (mounted in layout)
/lib
  /supabase.ts
  /validations.ts              ← Zod schemas
  /constants.ts                ← Colors, stats, course lists, contact details
  /animations.ts               ← ALL Framer Motion variants (single source of truth)
  /popup.ts                    ← shouldShowPopup(), markPopupShown()
  /mailer.ts                   ← Nodemailer transporter
/types
  /index.ts
/public
  /images
    /hero/                     ← hero-home.webp, hero-courses.webp, etc.
    /courses/                  ← btech.webp, mbbs.webp, etc.
    /abroad/                   ← russia.webp, uzbekistan.webp, etc.
    /team/                     ← founder.webp, team.webp
    /offices/                  ← motihari.webp, patna.webp, etc.
    /blog/                     ← per-article images
  /icons/
  /og/                         ← Open Graph images per page
```

---

## 🚫 Do NOT

- Use lorem ipsum or placeholder text
- Use Inter, Roboto, or Arial fonts
- Hard-code phone/email/address outside `/lib/constants.ts`
- Use Devanagari script in meta tags, URLs, or alt text
- Skip mobile responsiveness
- Rebuild the chatbot widget
- Use CSS `@keyframes` for UI animations
- Use raw `<img>` tags — always `<Image>`
- Use Lottie React (removed from stack)

---

## ✅ Definition of Done (Per Page)

- [ ] Hinglish content passes all 10 language rules
- [ ] Brand colors applied correctly (`#2E2567`, `#FBD207`)
- [ ] Mobile responsive at 375px, 768px, 1280px (test ALL three)
- [ ] Lead form present, validated, submits to Supabase
- [ ] **Popup form appears on page load via `<PopupController>`**
- [ ] **Framer Motion scroll reveals on all sections**
- [ ] **Stat counters animate with spring physics**
- [ ] **All images use `<Image>` with English alt text**
- [ ] SEO metadata exported
- [ ] Zero TypeScript errors
- [ ] Aria-labels on all interactive elements
- [ ] `prefers-reduced-motion` respected
