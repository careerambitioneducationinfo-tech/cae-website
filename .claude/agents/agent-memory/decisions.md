# Agent Memory: Design & Technical Decisions

_Log important decisions here so agents don't re-debate them._

---

## Design Decisions

| Decision        | Choice                   | Reason                              |
|-----------------|--------------------------|-------------------------------------|
| Primary font    | Poppins                  | Client DPR spec                     |
| Hindi font      | Noto Sans Devanagari     | Client DPR spec                     |
| UI library      | shadcn/ui                | Client DPR spec                     |
| Form library    | React Hook Form + Zod    | Client DPR spec                     |
| Animation       | **Framer Motion ^11**    | Replaces Lottie React; better React integration, scroll triggers, spring physics |
| Image component | **Next.js `<Image>`**    | WebP optimization, lazy loading, CLS prevention |
| CSS variables   | Updated style guide      | Standardized design tokens, consistent spacing/radius/motion |

---

## Technical Decisions

| Decision       | Choice                    | Reason                                         |
|----------------|---------------------------|------------------------------------------------|
| Framework      | Next.js 14 App Router     | Client DPR spec                                |
| Database       | Supabase (PostgreSQL)     | Client DPR spec                                |
| Hosting        | Railway                   | Client DPR spec                                |
| Email          | Nodemailer Gmail SMTP     | Client DPR spec                                |
| Chatbot        | External (automation team)| Do not rebuild                                 |
| Popup strategy | Layout-level `<PopupController>` | Mounts once in `app/layout.tsx`, works across all pages automatically |
| Animation variants | `/lib/animations.ts` | Single source of truth — all variants in one file |
| Popup logic    | `/lib/popup.ts`           | `shouldShowPopup()`, `markPopupShown()`, `markLeadSubmitted()` |

---

## Content Decisions

| Decision       | Choice                                          |
|----------------|-------------------------------------------------|
| Language       | Hinglish (10 rules in language-rules.md)        |
| Numbers        | Always English numerals                         |
| College names  | Always English                                  |
| Meta / SEO     | English only                                    |
| Image alt text | English only                                    |

---

## Popup Delays (Locked)

| Page           | Delay  |
|----------------|--------|
| `/` Homepage   | 0ms (immediate) |
| All other pages| 2000ms |

---

## Animation Rules (Locked)

| Rule | Decision |
|------|----------|
| Library | Framer Motion ^11 only — no CSS @keyframes, no Lottie, no GSAP |
| Variants location | `/lib/animations.ts` — never inline |
| Scroll reveals | `useInView` with `once: true` and `margin: '-80px'` |
| Stat counters | `AnimatedStat` component with spring physics |
| CTA buttons | `whileTap={{ scale: 0.96 }}` on every button |
| Reduced motion | `prefers-reduced-motion` always respected |
| Max concurrent animations | 3–4 elements (Bihar low-end Android devices) |

---

## Image Rules (Locked)

| Rule | Decision |
|------|----------|
| Component | Next.js `<Image>` only — no raw `<img>` |
| Hero images | `priority` prop — LCP target < 2.5s on 3G |
| Format | WebP only, max 200KB per image |
| Alt text | English only |
| Compression | `squoosh.app` or `sharp` before adding to `/public` |

---

## Agent Responsibilities Split

| Agent             | Owns                                                          |
|-------------------|---------------------------------------------------------------|
| `developer.md`    | Pages, API routes, Supabase, email, popup, animations setup, chatbot |
| `reviewer.md`     | Code review, brand/language audit, animation audit, image audit, a11y, SEO |
| `tester.md`       | E2E testing, form validation, animation tests, image tests, popup tests, API tests |
| `content-writer.md` | All Hinglish copy, blog content, CTAs                      |
| `ui-builder.md`   | React component scaffolding, Tailwind styling, Framer Motion patterns |
| `seo-specialist.md` | Meta tags, keywords, URL slugs                             |

---

## Open Questions

- [ ] YouTube channel link not provided — confirm with client
- [ ] Facebook URL in DPR is long redirect — get clean URL from client
- [ ] Chatbot frontend delivery date from automation team?
- [ ] Gmail account for SMTP — confirm with client
- [ ] Real CAE photos for hero/team/offices — confirm delivery timeline
