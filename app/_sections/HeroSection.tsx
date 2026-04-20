'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, Phone, GraduationCap } from 'lucide-react'
import Image from 'next/image'
import { fadeInLeft, fadeInRight, buttonTap, viewportOnce } from '@/lib/animations'
import { TAGLINES, SITE, COURSE_OPTIONS } from '@/lib/constants'

const TRUST_BADGES = [
  { icon: CheckCircle, text: 'Free Counseling' },
  { icon: CheckCircle, text: '10,000+ Students' },
  { icon: CheckCircle, text: 'Trusted Since 2009' },
  { icon: CheckCircle, text: '20 Offices Bihar' },
]

const SLIDES = [
  {
    id: 0,
    tag: 'Experience',
    title: '17+ Years of Trust',
    sub: 'Bihar\'s Most Trusted Counseling Since 2009',
    image: '/icons/careerambitionexperince.webp',
    accent: '#818cf8',
  },
  {
    id: 1,
    tag: 'All Courses',
    title: 'Every Course Covered',
    sub: 'B.Tech · MBBS · MBA · Law · Nursing & More',
    image: '/icons/allcourses.webp',
    accent: '#34d399',
  },
  {
    id: 2,
    tag: 'DRCC Scheme',
    title: 'BSCC Loan — 0% Interest',
    sub: '₹4L · Bihar Govt · 3,000+ Loans Processed',
    image: '/icons/drcc_scheme.webp',
    accent: '#fbd207',
  },
]

// Duplicate course list for seamless marquee
const COURSE_PILLS = [...COURSE_OPTIONS, ...COURSE_OPTIONS]

const slideVariants = {
  enter: { x: '100%', opacity: 0 },
  center: { x: 0, opacity: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit: { x: '-80%', opacity: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
}

export default function HeroSection() {
  const [active, setActive] = useState(0)

  // Auto-advance every 3.5 s
  useEffect(() => {
    const t = setInterval(() => {
      setActive((prev) => (prev + 1) % SLIDES.length)
    }, 3500)
    return () => clearInterval(t)
  }, [])

  const slide = SLIDES[active]

  return (
    <section
      className="relative min-h-[calc(100vh-6rem)] lg:min-h-0 bg-dk overflow-hidden"
      aria-label="Hero section"
    >
      {/* Subtle top glow matching MBBSAbroadSection feel */}
      <div
        className="absolute top-0 left-1/4 w-[600px] h-[300px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(100,74,158,0.18) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-brand px-4 sm:px-6 lg:px-8 py-14 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Left — Content ── */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="text-white"
          >
            {/* Live badge */}
            <div className="inline-flex items-center gap-2 bg-white/8 backdrop-blur-sm border border-white/15 rounded-full px-4 py-1.5 text-xs text-white/80 mb-6">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              17+ Years · 10,000+ Students · Bihar&apos;s Most Trusted
            </div>

            {/* T3 hook */}
            <p className="font-hindi text-white/50 text-base font-medium mb-1 tracking-wide">
              {TAGLINES.T3_hook}
            </p>

            {/* T1 — main headline */}
            <h1 className="font-hindi font-bold text-3xl sm:text-4xl lg:text-[2.1rem] xl:text-[2.6rem] mb-5">
              <span className="block mb-2"><span className="text-yel">आपके सपनों</span> के College में</span>
              <span className="block"><span className="text-yel">Admission</span> — हम करेंगे <span className="text-yel">आसान!</span></span>
            </h1>

            {/* Subtext */}
            <p className="text-white/55 text-base leading-relaxed mb-8 max-w-md font-hindi">
              <strong>17 वर्षों से</strong> चंपारण की सबसे विश्वसनीय संस्था
              <br />
              <strong>10,000+ छात्रों</strong> का विभिन्न पाठ्यकर्मों में सफल नामांकन
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap sm:flex-row gap-3 mb-8">
              <motion.a
                href="#counseling"
                whileTap={buttonTap}
                className="inline-flex items-center justify-center gap-2 bg-yel text-dk font-bold px-7 py-3.5 rounded-full text-sm hover:bg-yel/90 transition-colors font-hindi shadow-lg shadow-yel/20"
                aria-label="Free counseling"
              >
                <GraduationCap className="w-4 h-4" /> Free Counseling लें
              </motion.a>
              <motion.a
                href={`tel:${SITE.phone}`}
                whileTap={buttonTap}
                className="inline-flex items-center justify-center gap-2 border border-white/25 text-white font-semibold px-7 py-3.5 rounded-full text-sm hover:bg-white/8 transition-colors"
                aria-label={`Call ${SITE.phone}`}
              >
                <Phone className="w-4 h-4" />
                अभी Call करें
              </motion.a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4">
              {TRUST_BADGES.map((badge) => (
                <div key={badge.text} className="flex items-center gap-1.5 text-white/50 text-xs">
                  <badge.icon className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  {badge.text}
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Right — Sliding Card ── */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-sm">

              {/* ── Image Slider ── */}
              <div className="relative h-56 sm:h-64 overflow-hidden">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={slide.id}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute inset-0"
                  >
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      className="object-cover"
                      priority={slide.id === 0}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* ── Dot indicators ── */}
              <div className="flex items-center justify-center gap-2 py-3 border-b border-white/8">
                {SLIDES.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => setActive(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className="transition-all duration-300"
                  >
                    <span
                      className={`block rounded-full transition-all duration-300 ${i === active
                        ? 'w-5 h-2 bg-yel'
                        : 'w-2 h-2 bg-white/25'
                        }`}
                    />
                  </button>
                ))}
              </div>

              {/* ── Course pill marquee ── */}
              <div className="relative overflow-hidden py-3.5">
                {/* Fade edges */}
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#1a1840]/80 to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#1a1840]/80 to-transparent z-10 pointer-events-none" />

                <div
                  className="flex gap-2 w-max animate-marquee-fast"
                  style={{ willChange: 'transform' }}
                  aria-hidden="true"
                >
                  {COURSE_PILLS.map((course, i) => (
                    <span
                      key={`${course}-${i}`}
                      className="shrink-0 text-[11px] font-medium text-white/70 bg-white/8 border border-white/10 rounded-full px-3 py-1 whitespace-nowrap"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
