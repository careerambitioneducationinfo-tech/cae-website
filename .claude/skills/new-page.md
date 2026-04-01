# /new-page

Create a new website page for Career Ambition Education.

## Usage
```
/new-page [page-name]
```

---

## What This Does

Scaffolds a complete Next.js page at `app/[page-name]/page.tsx` with:

1. **Correct Hinglish content** following all 10 language rules
2. **Brand colors** — `#2E2567` primary, `#FBD207` accent
3. **Poppins + Noto Sans Devanagari** fonts
4. **Mandatory popup** via `<PopupController>` in layout (automatic — no per-page code needed)
5. **Hero section** with real WebP image using `<Image priority>`
6. **Framer Motion scroll reveals** on all content sections via `<SectionWrapper>`
7. **Lead form section** with React Hook Form + Zod validation
8. **Mobile-first responsive layout** (375px → 768px → 1280px)
9. **SEO meta tags** (English only)
10. **TypeScript interfaces** for all props and data

---

## Updated Page Template

```tsx
// app/[page-name]/page.tsx
import type { Metadata } from 'next'
import Image from 'next/image'
import { SectionWrapper } from '@/components/shared/SectionWrapper'

// Popup is mounted globally in app/layout.tsx — no import needed here

export const metadata: Metadata = {
  title: '[Page Title] | Career Ambition Education',
  description: '[English meta description — 150–160 chars, SEO optimized]',
  keywords: '[english, keywords, only]',
  openGraph: {
    title: '[OG Title]',
    description: '[OG Description]',
    url: 'https://careerambition.com/[slug]',
    images: [{ url: '/og/[page].webp' }],
  }
}

export default function [PageName]Page() {
  return (
    <main>

      {/* ── HERO — real WebP image, priority load ── */}
      <section className="relative min-h-[60vh] md:min-h-[80vh] flex items-center overflow-hidden">
        <Image
          src="/images/hero/[page].webp"
          alt="[English alt text describing the image]"
          fill
          priority
          className="object-cover"
        />
        <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 mx-auto max-w-[1240px]">
          <SectionWrapper>
            {/* Hindi heading using Noto Sans Devanagari */}
            <h1 className="font-devanagari text-3xl md:text-5xl font-bold text-white">
              {/* T1 tagline or page-specific Hindi headline */}
            </h1>
            {/* Hinglish subtext */}
            {/* CTA buttons with whileTap={{ scale: 0.96 }} */}
          </SectionWrapper>
        </div>
      </section>

      {/* ── CONTENT SECTIONS — all wrapped in SectionWrapper ── */}
      <SectionWrapper>
        <section className="py-12 md:py-16 lg:py-24">
          <div className="w-full px-4 sm:px-6 md:px-8 mx-auto max-w-[1240px]">
            {/* Section content */}
          </div>
        </section>
      </SectionWrapper>

      {/* ── LEAD FORM / CTA SECTION ── */}
      <SectionWrapper>
        <section className="py-12 bg-[#F5F5F8]">
          <div className="w-full px-4 sm:px-6 md:px-8 mx-auto max-w-[1240px]">
            {/* LeadForm component */}
          </div>
        </section>
      </SectionWrapper>

    </main>
  )
}
```

---

## Language Checklist Before Finishing
- [ ] Headings start in Hindi (Devanagari script)
- [ ] CTAs are Hinglish: e.g. `"Free Counseling लें"`
- [ ] Error messages are full Hindi
- [ ] Numbers in English numerals
- [ ] College names in English
- [ ] Meta tags in English only
- [ ] Alt text in English only

## Animation Checklist Before Finishing
- [ ] All sections wrapped in `<SectionWrapper>`
- [ ] Stat numbers use `<AnimatedStat>` component
- [ ] CTA buttons have `whileTap={{ scale: 0.96 }}`
- [ ] No CSS `@keyframes` used

## Image Checklist Before Finishing
- [ ] Hero image uses `<Image priority>` (WebP)
- [ ] All below-fold images use `<Image>` (no `priority`)
- [ ] No raw `<img>` tags anywhere
- [ ] All alt text in English
