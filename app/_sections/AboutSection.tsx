'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { MapPin, Users, Building2, GraduationCap } from 'lucide-react'
import SectionWrapper from '@/components/shared/SectionWrapper'
import { fadeInLeft, fadeInRight, viewportOnce } from '@/lib/animations'
import { TAGLINES, SITE } from '@/lib/constants'

const ABOUT_POINTS = [
  { icon: GraduationCap, text: '10,000+ students को successful admissions दिलाए हैं' },
  { icon: Building2,     text: '20 offices Bihar के अलग-अलग जिलों में — Motihari, Patna, Muzaffarpur और भी' },
  { icon: GraduationCap, text: 'NMC approved MBBS Abroad, BSCC Loan, Engineering — complete guidance' },
  { icon: Users,         text: '490+ expert counselors — हर student को personal attention' },
]

const SLIDES = [
  {
    id: 0,
    image: '/icons/careerambitionexperince.png',
    alt: 'Career Ambition Education — 17 years of experience and achievements',
  },
  {
    id: 1,
    image: '/icons/collag.png',
    alt: 'Career Ambition Education — college admissions and student success',
  },
]

const slideVariants = {
  enter: { x: '100%', opacity: 0 },
  center: { x: 0, opacity: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  exit:   { x: '-80%', opacity: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
}

export default function AboutSection() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setActive((p) => (p + 1) % SLIDES.length), 3500)
    return () => clearInterval(t)
  }, [])

  const slide = SLIDES[active]

  return (
    <SectionWrapper
      id="about"
      outerClassName="bg-[#F5F5F8]"
      className="py-16"
      animate={false}
    >
      <div className="text-center mb-10">
        <span className="inline-block bg-il text-ind text-xs font-semibold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
          About Us
        </span>
        <h2 className="font-hindi font-bold text-ind text-3xl sm:text-4xl">
          हमारे बारे में
        </h2>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">

          {/* ── Left panel ── */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-gray-100"
          >
            {/* Founder row */}
            <div className="flex items-start gap-4 mb-6 pb-6 border-b border-gray-100">
              <div className="w-16 h-16 rounded-full border-2 border-ind/20 overflow-hidden shrink-0">
                <Image
                  src="/images/team/chandanprofile.png"
                  alt="Chandan Sawan — Founder, Career Ambition Education"
                  width={64}
                  height={64}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-ind text-base leading-tight">Chandan Sawan</p>
                <p className="text-gray-500 text-sm mt-0.5">Founder — Career Ambition Education</p>
                <div className="flex items-center gap-1 mt-1.5">
                  <MapPin className="w-3 h-3 text-gray-400 shrink-0" />
                  <p className="text-gray-400 text-xs truncate">{SITE.address}</p>
                </div>
                <p className="font-hindi text-ind/70 text-xs mt-2 leading-snug">
                  {TAGLINES.T1.split(' — ')[0]} — हम करेंगे आसान!
                </p>
              </div>
            </div>

            {/* About bullet points */}
            <ul className="space-y-4">
              {ABOUT_POINTS.map((point) => (
                <li key={point.text} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-il flex items-center justify-center shrink-0 mt-0.5">
                    <point.icon className="w-4 h-4 text-ind" />
                  </div>
                  <p className="text-gray-600 text-sm font-hindi leading-relaxed">{point.text}</p>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ── Right panel — photo slider ── */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="p-6 sm:p-8 flex flex-col"
          >
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Our Journey
            </p>

            {/* Slide area */}
            <div className="relative flex-1 min-h-[220px] rounded-xl overflow-hidden bg-gray-50">
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
                    alt={slide.alt}
                    fill
                    className="object-cover"
                    priority={slide.id === 0}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dot indicators */}
            <div className="flex items-center justify-center gap-2 mt-4">
              {SLIDES.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setActive(i)}
                  aria-label={`View slide ${i + 1}`}
                  className="transition-all duration-300"
                >
                  <span
                    className={`block rounded-full transition-all duration-300 ${
                      i === active ? 'w-5 h-2 bg-ind' : 'w-2 h-2 bg-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </SectionWrapper>
  )
}
