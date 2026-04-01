# /lead-form

Generate or update the CAE lead capture form with full validation.

## Usage
```
/lead-form [variant]
```

Variants: `popup` | `inline` | `sidebar`

---

## Form Fields Spec

### Required fields (Zod: `.min()` / `.regex()`)
| Field          | Type   | Validation          | Hindi Error Message                          |
|----------------|--------|---------------------|----------------------------------------------|
| name           | string | min 2 chars         | `"कृपया अपना नाम डालें"`                     |
| phone          | string | exactly 10 digits   | `"Phone number 10 digits का होना चाहिए"`     |
| courseInterest | enum   | required select     | `"कृपया course चुनें"`                       |
| currentStatus  | enum   | required select     | `"कृपया अपनी status चुनें"`                  |
| city           | string | min 2 chars         | `"कृपया अपना शहर बताएं"`                     |

### Optional fields
| Field       | Type   |
|-------------|--------|
| email       | string |
| message     | string |
| budgetRange | string |

---

## Course Options Enum
```ts
const COURSE_OPTIONS = [
  'B.Tech / Engineering', 'MBBS India', 'MBBS Abroad',
  'MBA', 'BBA', 'BCA/MCA', 'BAMS/BDS', 'B.Pharma',
  'B.Sc Nursing', 'B.Sc Agriculture', 'LLB', 'BSCC Loan', 'Other'
]
```

## Status Options Enum
```ts
const STATUS_OPTIONS = [
  'Appearing in 12th (2026)', '12th Pass (2025)',
  'Gap Year', 'Graduation Lateral', 'Parent inquiring'
]
```

---

## On Success
1. Submit to `POST /api/leads` → Supabase insert
2. Show Hindi success toast: `"धन्यवाद [Name]! हम 2 घंटे में call करेंगे। 🎓"`
3. Trigger email notification via Nodemailer
4. Set `cae_lead_submitted` in localStorage → suppress popup permanently for this user

## CTA Button Text
```
"Free Counseling लें →"
```

---

## Popup Trigger Rules (MANDATORY — No Exceptions)

The popup form **MUST appear on EVERY page load**. No exceptions.

### `/lib/popup.ts`
```ts
export const POPUP_KEY    = 'cae_popup_shown'
export const LEAD_KEY     = 'cae_lead_submitted'
export const POPUP_TTL    = 24 * 60 * 60 * 1000  // 24 hours in ms

export function shouldShowPopup(): boolean {
  if (typeof window === 'undefined') return false
  // If lead already submitted this session — never show again
  if (localStorage.getItem(LEAD_KEY)) return false
  const stored = localStorage.getItem(POPUP_KEY)
  if (!stored) return true
  const { timestamp } = JSON.parse(stored)
  return Date.now() - timestamp > POPUP_TTL
}

export function markPopupShown(): void {
  localStorage.setItem(POPUP_KEY, JSON.stringify({ timestamp: Date.now() }))
}

export function markLeadSubmitted(): void {
  localStorage.setItem(LEAD_KEY, 'true')
}
```

### Popup delay by page
```ts
const POPUP_DELAYS: Record<string, number> = {
  '/':             0,     // Immediate on homepage
  '/courses':      2000,
  '/study-abroad': 2000,
  '/bscc-loan':    2000,
  '/about':        2000,
  '/contact':      2000,
  '/blog':         2000,
}
```

---

## Popup Animation (Framer Motion — Required)

```tsx
import { motion, AnimatePresence } from 'framer-motion'

{/* Backdrop */}
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
  onClick={handleDismiss}
/>

{/* Modal */}
<motion.div
  initial={{ opacity: 0, scale: 0.92, y: 24 }}
  animate={{ opacity: 1, scale: 1, y: 0 }}
  exit={{ opacity: 0, scale: 0.95, y: 16 }}
  transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
  className="fixed inset-0 z-50 flex items-center justify-center p-4"
>
  <LeadForm variant="popup" onSuccess={handleDismiss} />
</motion.div>
```

### Mobile popup: bottom sheet preferred
```tsx
// On mobile (< 640px), render as bottom sheet instead of center modal
<motion.div
  initial={{ y: '100%' }}
  animate={{ y: 0 }}
  exit={{ y: '100%' }}
  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
  className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-[24px] p-6 sm:hidden"
>
  <LeadForm variant="popup" onSuccess={handleDismiss} />
</motion.div>
```

---

## Popup Heading (Mandatory — T1 Tagline)

The popup heading must always use the T1 tagline:
```tsx
<h2 className="font-devanagari text-ind text-xl font-bold mb-1">
  आपके सपनों के College में Admission
</h2>
<p className="text-mu text-sm mb-4">हम करेंगे आसान! — Free Counseling लें</p>
```
