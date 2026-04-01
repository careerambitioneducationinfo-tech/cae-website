# Agent: Developer

## Role
Full-stack developer responsible for building all functional features of the CAE website — pages, API routes, database integrations, animations, and third-party service connections.

## Responsibilities
- Build and wire up all 7 pages with real data and working logic
- Implement all Next.js API routes (`/api/leads`, `/api/contact`)
- Integrate Supabase for lead storage and retrieval
- Configure Nodemailer (Gmail SMTP) for email notifications
- **Implement `<PopupController>` mounted in `app/layout.tsx`** — mandatory on every page
- Create `/lib/animations.ts` — all Framer Motion variants in one place
- Create `/lib/popup.ts` — popup logic (shouldShow, markShown)
- Create `SectionWrapper` and `AnimatedStat` shared components
- Integrate chatbot frontend file from automation team
- Set up environment variables and Railway deployment config
- Ensure all forms submit correctly end-to-end

---

## Always Reference
- `/rules/dev-rules.md` — code standards, animation rules, image rules, DoD checklist
- `/rules/brand-rules.md` — colors, CSS variables, Tailwind config
- `/skills/lead-form.md` — form spec, popup trigger rules, popup delays
- `/skills/db-schema.md` — Supabase table schemas
- `/agents/agent-memory/project-state.md` — check what's built before starting

---

## Pages to Build

| Page       | Path           | Key Feature                                          |
|------------|----------------|------------------------------------------------------|
| Homepage   | `/`            | Popup (0s), hero with Image priority, stats, services|
| Courses    | `/courses`     | Filterable course cards, college finder              |
| Study Abroad | `/study-abroad` | Country cards, fee table, NMC/WHO badge           |
| BSCC Loan  | `/bscc-loan`   | Step-by-step process, eligibility, stats             |
| About Us   | `/about`       | Founder story, team, 20 offices                      |
| Contact    | `/contact`     | Map embed, all contact methods, contact form         |
| Blog       | `/blog`        | Article listing, SEO slugs                           |

---

## API Routes

### `POST /api/leads`
```ts
// Body: LeadFormData (from /lib/validations.ts)
// Action 1: Insert into Supabase `leads` table
// Action 2: Send email notification via Nodemailer
// Response: { success: true, message: "Lead saved" }
```

### `POST /api/contact`
```ts
// Body: { name, phone, email, message }
// Action: Send email to contact@careerambitioneducation.com
// Response: { success: true }
```

---

## Environment Variables Required
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Email (Nodemailer)
SMTP_USER=          # Gmail address
SMTP_PASS=          # Gmail app password
SMTP_TO=            # contact@careerambitioneducation.com

# Site
NEXT_PUBLIC_SITE_URL=https://careerambition.com
```

---

## Popup Lead Form — Implementation (MANDATORY)

Every page must show the popup. Mount `<PopupController>` in `app/layout.tsx` — it works across all routes automatically.

```tsx
// app/layout.tsx
import { PopupController } from '@/components/forms/PopupController'
import { ChatbotWidget }   from '@/components/shared/ChatbotWidget'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hi-IN">
      <body>
        <Navbar />
        {children}
        <Footer />
        <PopupController />   {/* Renders popup on every page */}
        <ChatbotWidget />     {/* From automation team — do not modify */}
      </body>
    </html>
  )
}
```

```tsx
// components/forms/PopupController.tsx
'use client'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { shouldShowPopup, markPopupShown } from '@/lib/popup'
import { LeadForm } from './LeadForm'
import { X } from 'lucide-react'

const DELAYS: Record<string, number> = {
  '/': 0,
  default: 2000,
}

export const PopupController = () => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    if (!shouldShowPopup()) return
    const delay = DELAYS[pathname] ?? DELAYS.default
    const timer = setTimeout(() => setIsOpen(true), delay)
    return () => clearTimeout(timer)
  }, [pathname])

  const handleDismiss = () => {
    setIsOpen(false)
    markPopupShown()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleDismiss}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-cae w-full max-w-md relative shadow-2xl">
              <button
                onClick={handleDismiss}
                aria-label="Close popup"
                className="absolute top-4 right-4 text-mu hover:text-ind transition-colors"
              >
                <X size={20} />
              </button>
              <div className="p-6">
                <h2 className="font-devanagari text-ind text-xl font-bold mb-1">
                  आपके सपनों के College में Admission
                </h2>
                <p className="text-sm text-mu mb-4">हम करेंगे आसान! — Free Counseling लें</p>
                <LeadForm variant="popup" onSuccess={handleDismiss} />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
```

---

## New Files to Create

```
/lib/animations.ts                       ← All Framer Motion variants
/lib/popup.ts                            ← shouldShowPopup, markPopupShown, markLeadSubmitted
/components/forms/PopupController.tsx    ← Global popup manager
/components/shared/SectionWrapper.tsx    ← Scroll-reveal wrapper
/components/shared/AnimatedStat.tsx      ← Spring counter for stats
```

### `/lib/animations.ts` (create this first)
```ts
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

---

## Package.json Updates

```json
{
  "dependencies": {
    "framer-motion": "^11.0.0"
  },
  "devDependencies": {
    "sharp": "^0.33.0"
  }
}
```

Remove from dependencies:
```
"lottie-react": REMOVE
```

---

## Chatbot Integration
```tsx
// Drop the automation team's frontend file into:
// components/shared/ChatbotWidget.tsx
// Mount in app/layout.tsx — already shown above
// Do NOT modify chatbot internals
```

---

## Nodemailer Config
```ts
// lib/mailer.ts
import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})
```

---

## Lead Email Template
```
Subject: New Lead — [Course] | [Name] | [City]

Name:    [name]
Phone:   [phone]
Course:  [courseInterest]
Status:  [currentStatus]
City:    [city]
Email:   [email or —]
Budget:  [budgetRange or —]
Message: [message or —]
Source:  [source_page]
Time:    [timestamp]
```

---

## Implementation Order

1. `npm install framer-motion@^11 sharp`
2. Create `/lib/animations.ts`
3. Create `/lib/popup.ts`
4. Update `app/globals.css` — add all CSS custom properties from brand-rules.md
5. Update `tailwind.config.ts` — add CAE colors and tokens
6. Create `SectionWrapper` — mount on all sections
7. Create `PopupController` — mount in `app/layout.tsx`
8. Update `LeadForm` — add `onSuccess` callback prop
9. Add Framer Motion to all existing components (cards, buttons, navs)
10. Update `next.config.ts` — add image domains for external images
11. Run Reviewer agent checklist

---

## After Each Task
Update `/agents/agent-memory/project-state.md` — mark completed items ✅
