# CAE Development Rules

## Code Standards
1. **TypeScript always** — no `any` types; define proper interfaces for all data shapes
2. **React Hook Form + Zod** for every form — no uncontrolled inputs
3. **Named exports** for all shared/ui components; default export for pages only
4. **All contact details** must come from `/lib/constants.ts` — never hard-coded

## Responsive Design
- **Mobile-first is non-negotiable** — Bihar audience is 90%+ mobile
- Test breakpoints: `375px` · `768px` · `1280px` — test ALL THREE before marking done
- Every component must be fully usable at 375px before touching desktop styles

### Tailwind Breakpoint Cheat Sheet
```
sm:  640px   — large phones landscape
md:  768px   — tablets (iPad portrait)
lg:  1024px  — small laptops
xl:  1280px  — desktops (max content: 1240px)
```

### Mobile-First Patterns (required on ALL components)
```tsx
// Container
<div className="w-full px-4 sm:px-6 md:px-8 mx-auto max-w-[1240px]">

// Grid: 1 col → 2 col → 3 col
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">

// Text sizes
<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
<p  className="text-sm sm:text-base leading-relaxed">

// Flex direction
<div className="flex flex-col md:flex-row gap-4 md:gap-8">

// Hero height
<section className="min-h-[60vh] md:min-h-[80vh] lg:min-h-screen">

// Section padding
<section className="py-12 md:py-16 lg:py-24">
```

---

## Forms & Data
- All lead submissions → `/api/leads` → Supabase `leads` table
- All contact submissions → `/api/contact` → Nodemailer (Gmail SMTP)
- Supabase client lives in `/lib/supabase.ts` only
- Zod schemas live in `/lib/validations.ts`

---

## SEO
- Every page must export `metadata` from Next.js App Router
- Meta title format: `[Page Name] | Career Ambition Education`
- Meta descriptions: English only, 150–160 chars
- All image `alt` text: English only
- URL slugs: English only, lowercase, hyphenated

---

## Chatbot
- **Do NOT rebuild the chatbot widget**
- Integrate the frontend file provided by the automation team as-is into `components/shared/ChatbotWidget.tsx`
- Mount in `app/layout.tsx` at bottom of `<body>`

---

## Git Hygiene
- Commit messages: `feat:`, `fix:`, `style:`, `chore:` prefixes
- Never commit `.env` or `.env.local`
- Never force-push to main

---

## Animation Standards (Framer Motion)

### Installation
```bash
npm install framer-motion@^11
```

> ⚠️ Lottie React has been removed from the stack. Do NOT use it.

### Import pattern
```tsx
import {
  motion,
  AnimatePresence,
  useInView,
  useScroll,
  useMotionValue,
  useSpring
} from 'framer-motion'
```

### Standard variants — define ALL in `/lib/animations.ts`
```ts
// /lib/animations.ts
import { Variants } from 'framer-motion'

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } }
}

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] } }
}

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] } }
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } }
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
}

export const staggerSlow: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
}

export const navDrawer: Variants = {
  closed: { x: '-100%', opacity: 0 },
  open: { x: 0, opacity: 1, transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] } }
}

export const counterSpring = { stiffness: 100, damping: 30, mass: 1 }
```

### Scroll-triggered reveals (use on ALL sections)
```tsx
'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'

export const SectionWrapper = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.section
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {children}
    </motion.section>
  )
}
```

### Animated stat counters (for 10,000+, 17+, etc.)
```tsx
'use client'
import { useRef, useEffect } from 'react'
import { useMotionValue, useSpring, useInView, motion } from 'framer-motion'
import { counterSpring } from '@/lib/animations'

interface AnimatedStatProps { value: number; suffix?: string }

export const AnimatedStat = ({ value, suffix = '+' }: AnimatedStatProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const count = useMotionValue(0)
  const rounded = useSpring(count, counterSpring)

  useEffect(() => {
    if (isInView) count.set(value)
  }, [isInView, count, value])

  return (
    <motion.span ref={ref}>
      <motion.span>{rounded}</motion.span>{suffix}
    </motion.span>
  )
}
```

### AnimatePresence for popup
```tsx
import { motion, AnimatePresence } from 'framer-motion'
import { scaleIn } from '@/lib/animations'

<AnimatePresence>
  {isOpen && (
    <motion.div
      key="popup"
      variants={scaleIn}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
    >
      <LeadForm variant="popup" onSuccess={handleDismiss} />
    </motion.div>
  )}
</AnimatePresence>
```

### Animation Rules
- **NEVER** use CSS `@keyframes` for UI animations — use Framer Motion
- **NEVER** use Lottie React (removed from stack)
- All animation variants must live in `/lib/animations.ts`
- Use `useInView` with `once: true` on all scroll reveals
- Respect `prefers-reduced-motion`:
  ```tsx
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ```
- Every `<motion.button>` must have `whileTap={{ scale: 0.96 }}`
- Arrow links must have `whileHover={{ x: 4 }}`
- Limit concurrent animations to 3–4 elements (Bihar users may have low-end Android devices)
- Keep animations under 300ms perceived duration for mobile performance

### Performance note
Use dynamic import for heavy animation components:
```ts
const PopupController = dynamic(
  () => import('@/components/forms/PopupController'),
  { ssr: false }
)
```

---

## Image Standards

### Rule: Next.js `<Image>` component everywhere — no raw `<img>` tags

```tsx
import Image from 'next/image'

// Hero image (priority load — above the fold)
<Image
  src="/images/hero/hero-home.webp"
  alt="CAE counselor helping Bihar students with college admission"
  width={1200}
  height={630}
  priority
  className="object-cover w-full h-full"
/>

// Below-fold images (lazy loaded by default)
<Image
  src="/images/offices/motihari.webp"
  alt="Career Ambition Education Motihari office"
  width={800}
  height={500}
  className="rounded-xl object-cover"
/>
```

### Image placement per page
| Page         | Required Images                                         |
|--------------|---------------------------------------------------------|
| Homepage     | Hero (student + counselor), Bihar map, service icons    |
| Courses      | Course category thumbnails (1 per course)               |
| Study Abroad | Country flag + college campus image (1 per country)     |
| BSCC Loan    | Bihar govt logo, happy student photo                    |
| About        | Founder photo, team photo, office photos (20 offices)   |
| Contact      | Office exterior photo                                   |
| Blog         | Featured image per article                              |

### Image format rules
- All images: **WebP format**, max 200KB per image
- Alt text: **English only** (SEO rule — applies here too)
- Hero images: `priority` prop → targets LCP < 2.5s on 3G
- Below-fold: lazy-loaded by default (no `priority`)
- Use `placeholder="blur"` + `blurDataURL` for LCP images
- Compress with `squoosh.app` or `sharp` before adding to `/public`
- No stock photos with non-Indian students

### Public folder structure
```
/public
  /images
    /hero/       ← hero-home.webp, hero-courses.webp, etc.
    /courses/    ← btech.webp, mbbs.webp, mba.webp, etc.
    /abroad/     ← russia.webp, uzbekistan.webp, etc.
    /team/       ← founder.webp, team.webp
    /offices/    ← motihari.webp, patna.webp, etc.
    /blog/       ← per-article images
  /icons/        ← Custom SVG icons
  /og/           ← Open Graph images per page
```

---

## Definition of Done (Per Page)

- [ ] Hinglish content passes all 10 language rules
- [ ] Brand colors applied correctly (`#2E2567`, `#FBD207`)
- [ ] Mobile responsive at 375px, 768px, 1280px (test ALL three)
- [ ] Lead form present, validated, submits to Supabase
- [ ] **Popup form appears on page load via `<PopupController>` in layout**
- [ ] **Framer Motion scroll reveals on all sections**
- [ ] **Stat counters animate with spring physics (`AnimatedStat`)**
- [ ] **All images use `<Image>` with English alt text, no raw `<img>`**
- [ ] SEO metadata exported
- [ ] Zero TypeScript errors (`npm run type-check`)
- [ ] Aria-labels on all interactive elements
- [ ] `prefers-reduced-motion` respected globally
