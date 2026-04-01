# /content-check

Audit any file or component for CAE language, brand, animation, image, and popup compliance.

## Usage
```
/content-check [file-path]
```

---

## Language Rules Audit (10 Core Rules)

| Rule    | Check                                                    |
|---------|----------------------------------------------------------|
| RULE 1  | Headings start with Hindi (Devanagari), then English     |
| RULE 2  | CTA buttons are Hinglish mix                             |
| RULE 3  | Descriptions are full Hinglish sentences                 |
| RULE 4  | Form error messages are in full Hindi                    |
| RULE 5  | Success messages are full Hindi with `[Name]` placeholder|
| RULE 6  | FAQ questions + answers in Hinglish                      |
| RULE 7  | Blog titles in Hinglish                                  |
| RULE 8  | Meta descriptions in English only                        |
| RULE 9  | Numbers in English numerals (not Devanagari)             |
| RULE 10 | College names always in English                          |

### Extended Language Checks
- [ ] Image `alt` text is in English only (RULE 11)
- [ ] URL slugs are English, lowercase, hyphenated (RULE 12)
- [ ] OG tags / meta are in English only (RULE 14)
- [ ] Popup heading uses T1 tagline in Devanagari (RULE 15)

---

## Brand Checks

### Colors
- [ ] Primary `#2E2567` (var `--ind`) used for headings and navbar
- [ ] Accent `#FBD207` (var `--yel`) used for CTAs and highlights
- [ ] Amber `#ECA121` (var `--amb`) used for secondary CTAs only
- [ ] WhatsApp `#25D366` (var `--wa`) used for WhatsApp button only
- [ ] Dark Navy `#1A1840` (var `--dk`) used for footer
- [ ] No hardcoded hex values in JSX — use Tailwind tokens (`text-ind`, `bg-yel`, etc.)

### Typography
- [ ] Poppins (`font-poppins`) used for all English text
- [ ] Noto Sans Devanagari (`font-devanagari`) used for all Hindi text
- [ ] No Inter, Roboto, Arial, or system fonts anywhere

### Content Integrity
- [ ] No lorem ipsum or placeholder text — all real CAE content
- [ ] Stats match exactly: `10,000+`, `17+`, `490+`, `20`, `100+`, `3,000+`, `90%+`
- [ ] Official taglines used verbatim (T1, T2, T3, T4)

---

## Animation Checks (Framer Motion)

- [ ] No CSS `@keyframes` used anywhere in the file
- [ ] No Lottie React imports
- [ ] All animation variants imported from `/lib/animations.ts` — none defined inline
- [ ] Sections wrapped in `<SectionWrapper>` for scroll reveals
- [ ] Stat numbers use `<AnimatedStat>` component (not plain text)
- [ ] CTA buttons have `whileTap={{ scale: 0.96 }}`
- [ ] Arrow links have `whileHover={{ x: 4 }}`
- [ ] `'use client'` directive present on components using `motion.*` or hooks
- [ ] `prefers-reduced-motion` check present in animation-heavy components

---

## Image Checks

- [ ] All images use Next.js `<Image>` — no raw `<img>` tags
- [ ] Hero images have `priority` prop
- [ ] Below-fold images do NOT have `priority` (lazy loaded by default)
- [ ] All `alt` text is in English
- [ ] No `alt` text contains Devanagari characters
- [ ] Images are WebP format and ≤ 200KB
- [ ] `import Image from 'next/image'` present in files with images

---

## Popup Checks

- [ ] `<PopupController>` mounted in `app/layout.tsx` (check layout, not this file)
- [ ] If this is `PopupController.tsx`: `AnimatePresence` wraps modal
- [ ] Popup heading uses T1 tagline in Devanagari font
- [ ] Close button has `aria-label="Close popup"`
- [ ] Mobile popup is bottom sheet (`< 640px`)
- [ ] `shouldShowPopup()` imported from `/lib/popup.ts`

---

## Code Quality Checks

- [ ] No `any` TypeScript types
- [ ] All props have defined interfaces
- [ ] No hardcoded phone numbers, emails, or addresses (use `/lib/constants.ts`)
- [ ] Zod schema covers all required fields
- [ ] API routes have `try/catch` error handling
- [ ] No unused imports or variables

---

## Output Format

Returns a structured checklist with ✅ pass / ❌ fail per rule:

```
## Content Check: [file-path]
**Overall Status:** ✅ All passed | ⚠️ X issues found | ❌ X critical failures

### Language
| Rule    | Status | Issue (if any)            | Fix                          |
|---------|--------|---------------------------|------------------------------|
| RULE 1  | ✅     | —                         | —                            |
| RULE 4  | ❌     | Error message in English  | Change to full Hindi         |

### Brand
| Check           | Status | Issue (if any)            | Fix                          |
|-----------------|--------|---------------------------|------------------------------|
| Primary color   | ✅     | —                         | —                            |
| Stats accuracy  | ⚠️    | "10000+" missing "+"      | Use "10,000+"                |

### Animation
| Check                  | Status | Issue (if any)            | Fix                                    |
|------------------------|--------|---------------------------|----------------------------------------|
| No @keyframes          | ✅     | —                         | —                                      |
| SectionWrapper used    | ❌     | Section not wrapped       | Wrap in <SectionWrapper>               |

### Images
| Check                  | Status | Issue (if any)            | Fix                                    |
|------------------------|--------|---------------------------|----------------------------------------|
| No raw <img> tags      | ✅     | —                         | —                                      |
| Alt text in English    | ❌     | Hindi in alt attribute    | Replace with English description       |
```
