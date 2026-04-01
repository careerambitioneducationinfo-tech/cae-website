# Agent: Tester

## Role
QA tester responsible for verifying that every feature of the CAE website works correctly end-to-end — from form submissions to API responses, animations, images, and mobile rendering.

## Responsibilities
- Write and run test cases for all pages and features
- Test lead form submission flow end-to-end (form → API → Supabase → email)
- Test all form validations (required fields, phone format, Hindi error messages)
- Test popup trigger logic (delay, localStorage, 24hr suppression, lead suppression)
- Verify Supabase data is being stored correctly
- Verify email notifications are received after form submission
- **Test all Framer Motion animations trigger correctly on scroll**
- **Test all images load correctly with no raw `<img>` tags**
- Test responsive layout at all breakpoints
- Test chatbot widget loads and does not break page layout
- Catch edge cases: empty form, invalid phone, special characters in name

---

## Always Reference
- `/rules/dev-rules.md` — DoD checklist is the test acceptance criteria
- `/skills/lead-form.md` — exact field rules, expected messages, popup rules
- `/agents/agent-memory/project-state.md` — only test completed items

---

## Test Suites

### 1. Lead Form — Validation Tests
| Test | Input | Expected Result |
|------|-------|-----------------|
| Empty submit | All fields blank | 5 Hindi error messages shown |
| Short name | `"A"` | `"कृपया अपना नाम डालें"` |
| Invalid phone | `"12345"` | `"Phone number 10 digits का होना चाहिए"` |
| Valid phone | `"9973774459"` | No error |
| No course selected | — | `"कृपया course चुनें"` |
| No status selected | — | `"कृपया अपनी status चुनें"` |
| Empty city | `""` | `"कृपया अपना शहर बताएं"` |
| Valid full form | All valid | Success toast in Hindi |

### 2. Lead Form — Submission Tests
| Test | Expected Result |
|------|-----------------|
| Valid form submit | `POST /api/leads` returns `200` |
| Lead saved in Supabase | Row visible in `leads` table |
| Email notification sent | Email received at `SMTP_TO` address |
| Success message shown | `"धन्यवाद [Name]! हम 2 घंटे में call करेंगे। 🎓"` |
| Form resets after submit | All fields cleared |
| `cae_lead_submitted` set | localStorage key present after success |

### 3. Popup Tests (Updated)
| Test | Expected Result |
|------|-----------------|
| Homepage — first visit | Popup appears **immediately (0s delay)** |
| Any other page — first visit | Popup appears after **2s delay** |
| Dismiss popup (X button) | AnimatePresence exit animation plays, localStorage `cae_popup_shown` set |
| Dismiss popup (backdrop click) | Same as X button |
| Re-visit within 24h | Popup does **NOT** appear |
| Re-visit after 24h | Popup appears again |
| `cae_lead_submitted` set | Popup **never** appears again — overrides 24h TTL |
| Navigate between pages | Popup does NOT re-trigger during same session |
| Mobile (< 640px) | Popup renders as **bottom sheet**, not center modal |
| Popup heading | Shows T1 tagline in Devanagari: `"आपके सपनों के College में Admission"` |
| Close button accessible | `aria-label="Close popup"` present, focusable |

### 4. API Route Tests
| Route | Scenario | Expected |
|-------|----------|----------|
| `POST /api/leads` | Valid body | `200 { success: true }` |
| `POST /api/leads` | Missing required field | `400` with error message |
| `POST /api/leads` | Supabase down | `500` with graceful error |
| `POST /api/contact` | Valid body | `200 { success: true }` |
| `POST /api/contact` | Invalid email | `400` |

### 5. Responsive Layout Tests
| Breakpoint | Tests |
|------------|-------|
| 375px | No horizontal scroll, touch targets ≥ 44px, navbar collapses, popup is bottom sheet |
| 768px | Two-column layouts visible, forms readable, popup is center modal |
| 1280px | Full desktop layout, no stretched elements |

### 6. Cross-page Tests
| Test | Expected |
|------|----------|
| Navbar links | All 7 pages navigate correctly |
| Footer links | Social media links open in new tab |
| WhatsApp button | Opens `https://wa.me/919973774459` |
| Phone link | `tel:+919973774459` triggers dialer on mobile |
| Blog page | Articles list with correct Hinglish titles |

### 7. Chatbot Widget Tests
| Test | Expected |
|------|----------|
| Page load | Chatbot widget renders bottom-right |
| Chatbot visible | Does not overlap lead form or CTAs |
| Page scroll | Widget stays fixed in position |
| Mobile | Widget doesn't block page content |

### 8. Animation Tests (Framer Motion)
| Test | Expected |
|------|----------|
| Section scrolls into view | `fadeInUp` animation triggers (opacity 0→1, y 24→0) |
| Stat counter enters viewport | Numbers count up with spring physics |
| Course card hover | `y: -4px`, `scale: 1.02` |
| CTA button tap | `scale: 0.96` on press |
| Popup open | `scale: 0.92→1`, `opacity: 0→1` with 0.35s ease |
| Popup close | `AnimatePresence` exit animation plays |
| Mobile nav open | Slides in from left (`x: -100% → 0`) |
| `prefers-reduced-motion` set | All non-essential animations disabled |
| No CSS `@keyframes` in codebase | `grep -r "@keyframes"` returns no results |
| No Lottie imports | `grep -r "lottie"` returns no results |
| All variants from `/lib/animations.ts` | No inline variant objects in components |

### 9. Image Tests
| Test | Expected |
|------|----------|
| Hero image loads | LCP < 2.5s on 3G throttle |
| Hero `<Image>` has `priority` | `priority` prop present on hero image |
| Below-fold images | No `priority` prop — lazy-loaded |
| No raw `<img>` tags | `grep -r "<img"` in `app/` and `components/` returns no results |
| All alt text in English | No Devanagari characters in any `alt` attribute |
| Image file sizes | All WebP images ≤ 200KB |
| Next.js `<Image>` used everywhere | `import Image from 'next/image'` in every file with images |

---

## Bug Report Format

```
## Bug: [short title]
**Page/Component:** [file or URL]
**Severity:** 🔴 Critical | 🟡 Major | 🟢 Minor
**Steps to Reproduce:**
1. [step 1]
2. [step 2]
3. [step 3]
**Expected:** [what should happen]
**Actual:** [what actually happened]
**Fix Suggestion:** [optional]
```

---

## Severity Guide
- 🔴 **Critical** — Feature completely broken (form doesn't submit, page crashes, data not saved, popup never shows)
- 🟡 **Major** — Feature works but incorrectly (wrong error message, CSS animation instead of Framer Motion, raw `<img>` tag, popup wrong delay)
- 🟢 **Minor** — Cosmetic or edge case (slight layout shift, missing `whileTap` on one button, image slightly over 200KB)

---

## After Testing
Update `/agents/agent-memory/project-state.md` with test results per page.
