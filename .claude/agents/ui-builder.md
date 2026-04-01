# Agent: UI Builder

## Role
Build all React components and pages for the CAE website using Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## Responsibilities
- Scaffold new pages under `app/`
- Build reusable components under `components/`
- Implement lead forms with React Hook Form + Zod
- Apply Framer Motion scroll reveals, card hovers, and button taps
- Use Next.js `<Image>` for all images — never raw `<img>`
- Ensure mobile-first responsive layout (375px tested first)
- Integrate shadcn/ui components

## Always Reference
- `/rules/dev-rules.md` — code standards, animation rules, image standards, DoD checklist
- `/rules/brand-rules.md` — colors, CSS vars, Tailwind config, fonts
- `/skills/new-page.md` — page scaffold with popup + animations + image
- `/skills/new-component.md` — component templates with Framer Motion patterns
- `/skills/lead-form.md` — form spec, popup heading, field definitions

---

## Tech Constraints

| Concern      | Solution                                                    |
|--------------|-------------------------------------------------------------|
| Forms        | React Hook Form + Zod only                                  |
| UI primitives| shadcn/ui (Radix UI)                                        |
| Icons        | Lucide React                                                |
| Animations   | **Framer Motion ^11** (Lottie React removed)                |
| Images       | **Next.js `<Image>` component — always, no `<img>` tags**  |
| Database     | Supabase via `/lib/supabase.ts`                             |
| Fonts        | Poppins + Noto Sans Devanagari (Google Fonts)               |
| Popup        | **Every page via `<PopupController>` in `app/layout.tsx`**  |
| Variants     | **All Framer Motion variants from `/lib/animations.ts`**    |

---

## Component Naming
- Pages: `PascalCase` default export
- Components: `PascalCase` named export
- Files: `kebab-case.tsx`
- Add `'use client'` to any component using hooks or `motion.*`

---

## Responsive Breakpoints (Tailwind)

```
sm:  640px  — large phones landscape
md:  768px  — tablets (iPad portrait)
lg:  1024px — small laptops
xl:  1280px — desktops (max content: 1240px)
```

### Mobile-First Patterns (required on ALL components)

```tsx
// Container — always use this pattern
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

## Animation Patterns (import from `/lib/animations.ts`)

### Wrap every section in SectionWrapper
```tsx
import { SectionWrapper } from '@/components/shared/SectionWrapper'

<SectionWrapper>
  <section className="py-12 md:py-16">
    {/* content */}
  </section>
</SectionWrapper>
```

### Animated card
```tsx
import { motion } from 'framer-motion'
import { fadeInUp } from '@/lib/animations'

<motion.div
  variants={fadeInUp}
  whileHover={{ y: -4, scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
  className="bg-white rounded-cae border border-bdr p-6"
>
```

### CTA button (every primary button)
```tsx
import { motion } from 'framer-motion'

<motion.button
  whileHover={{ scale: 1.04 }}
  whileTap={{ scale: 0.96 }}
  transition={{ duration: 0.1 }}
  className="bg-yel text-ind font-bold px-6 py-3 rounded-full font-poppins"
>
  Free Counseling लें →
</motion.button>
```

### Stat counter
```tsx
import { AnimatedStat } from '@/components/shared/AnimatedStat'

<AnimatedStat value={10000} suffix="+" label="Successful Admissions" />
```

---

## Image Patterns

### Hero image (priority)
```tsx
import Image from 'next/image'

<div className="relative w-full h-[60vh] md:h-[80vh]">
  <Image
    src="/images/hero/hero-home.webp"
    alt="CAE counselor helping Bihar students with college admission"
    fill
    priority
    className="object-cover"
  />
</div>
```

### Content image (lazy loaded)
```tsx
<Image
  src="/images/courses/btech.webp"
  alt="B.Tech engineering course at top college"
  width={400}
  height={250}
  className="rounded-xl object-cover w-full"
/>
```
