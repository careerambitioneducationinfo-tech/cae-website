# /new-component

Scaffold a new reusable React component for the CAE website.

## Usage
```
/new-component [ComponentName] [type]
```

Types: `ui` | `section` | `form` | `shared`

---

## Output Location by Type

| Type    | Path                                      |
|---------|-------------------------------------------|
| ui      | `components/ui/[ComponentName].tsx`       |
| section | `components/sections/[ComponentName].tsx` |
| form    | `components/forms/[ComponentName].tsx`    |
| shared  | `components/shared/[ComponentName].tsx`   |

---

## Rules

1. **Always export as named export** (not default) for shared/ui components.
2. **Define a TypeScript interface** for all props above the component.
3. **Use Tailwind classes** — no custom CSS files unless animation is needed.
4. **Brand colors via Tailwind** — use `text-ind`, `bg-yel`, `bg-ind` (from `tailwind.config.ts`).
5. For **form components**, always use React Hook Form + Zod.
6. For **section components**, include a Hinglish heading + subtext.
7. **All animations via Framer Motion** — import variants from `/lib/animations.ts`.
8. **All images via Next.js `<Image>`** — never raw `<img>`.
9. Add `'use client'` directive to any component using hooks or motion.

---

## Base Component Template

```tsx
'use client'
import { type FC } from 'react'

interface [ComponentName]Props {
  // define props here
}

export const [ComponentName]: FC<[ComponentName]Props> = ({ ...props }) => {
  return (
    <section>
      {/* component content */}
    </section>
  )
}
```

---

## Animation Component Patterns

### SectionWrapper — scroll-reveal for all content sections
```tsx
'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { staggerContainer } from '@/lib/animations'

interface SectionWrapperProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export const SectionWrapper = ({ children, className, delay = 0 }: SectionWrapperProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ delayChildren: delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

### Animated card — course cards, stat cards, office cards
```tsx
import { motion } from 'framer-motion'
import { fadeInUp } from '@/lib/animations'

<motion.div
  variants={fadeInUp}
  whileHover={{ y: -4, scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
  className="bg-white rounded-cae border border-bdr p-6 cursor-pointer"
>
  {children}
</motion.div>
```

### Animated CTA button — use on ALL primary buttons
```tsx
import { motion } from 'framer-motion'

<motion.button
  whileHover={{ scale: 1.04 }}
  whileTap={{ scale: 0.96 }}
  transition={{ duration: 0.1 }}
  className="bg-yel text-ind font-semibold px-6 py-3 rounded-full font-poppins"
>
  Free Counseling लें →
</motion.button>
```

### AnimatedStat — spring counter for stats section
```tsx
'use client'
import { useRef, useEffect } from 'react'
import { useMotionValue, useSpring, useInView, motion } from 'framer-motion'
import { counterSpring } from '@/lib/animations'

interface AnimatedStatProps {
  value: number
  suffix?: string
  label: string
}

export const AnimatedStat = ({ value, suffix = '+', label }: AnimatedStatProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const count = useMotionValue(0)
  const rounded = useSpring(count, counterSpring)

  useEffect(() => {
    if (isInView) count.set(value)
  }, [isInView, count, value])

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl md:text-4xl font-black text-ind">
        <motion.span>{rounded}</motion.span>{suffix}
      </div>
      <p className="text-sm text-mu mt-1">{label}</p>
    </div>
  )
}
```

### Mobile nav drawer — Framer Motion slide-in
```tsx
import { motion, AnimatePresence } from 'framer-motion'
import { navDrawer } from '@/lib/animations'

<AnimatePresence>
  {isOpen && (
    <motion.nav
      key="mobile-nav"
      variants={navDrawer}
      initial="closed"
      animate="open"
      exit="closed"
      className="fixed inset-y-0 left-0 w-72 bg-white z-50 shadow-2xl p-6"
    >
      {/* nav links */}
    </motion.nav>
  )}
</AnimatePresence>
```
