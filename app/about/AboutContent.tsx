'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  GraduationCap, CheckCircle, Phone, Trophy, Target, Lightbulb,
  Gift, Users, Leaf, School, Landmark, Building2, Globe, MapPin,
  BrainCircuit, FileText, Bot, Clock, MessageCircle, Newspaper,
  Medal, ArrowRight,
} from 'lucide-react'
import type { LucideProps } from 'lucide-react'

type IconComp = React.ComponentType<LucideProps>

const ICON_MAP: Record<string, IconComp> = {
  GraduationCap, Gift, CheckCircle, Users, Leaf,
  School, Landmark, Building2, Globe, MapPin, Trophy,
  BrainCircuit, FileText, Bot,
}
import SectionWrapper from '@/components/shared/SectionWrapper'
import AnimatedStat from '@/components/shared/AnimatedStat'
import LeadForm from '@/components/forms/LeadForm'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { SITE, TAGLINES } from '@/lib/constants'
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  staggerContainer,
  viewportOnce,
  buttonTap,
} from '@/lib/animations'
import {
  FOUNDER,
  TIMELINE,
  OFFICES,
  CORE_VALUES,
  TESTIMONIALS,
  SERVICES_BRIEF,
  TRUST_POINTS,
  ABOUT_STATS,
} from '@/lib/aboutData'

// ─── Shared sub-components ───────────────────────────────────────────────────

function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <Badge className="bg-[#eeedf8] text-ind border-0 mb-3 font-hindi font-semibold">
      {children}
    </Badge>
  )
}

// ─── Section 1: Hero ─────────────────────────────────────────────────────────

const ABOUT_SLIDES = [
  {
    id: 0,
    tag: 'Since 2009',
    title: '17+ Years of Trusted Guidance',
    sub: 'Bihar का सबसे trusted नाम — Champaran से शुरू, पूरे Bihar में',
    gradient: 'from-[#1e1b4b] via-[#2e2567] to-[#3730a3]',
    accent: '#818cf8',
    img: '/icons/careerambitionexperince.png',
  },
  {
    id: 1,
    tag: '10,000+ Students',
    title: 'Students का सपना, हमारा संकल्प',
    sub: 'Engineering · MBBS · MBA · Nursing और भी बहुत कुछ',
    gradient: 'from-[#064e3b] via-[#065f46] to-[#047857]',
    accent: '#34d399',
    img: '/icons/collag.png',
  },
]

const slideVariants = {
  enter: { x: '100%', opacity: 0 },
  center: { x: 0, opacity: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit: { x: '-80%', opacity: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
}

function HeroSection() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const t = setInterval(() => {
      setActive((prev) => (prev + 1) % ABOUT_SLIDES.length)
    }, 3500)
    return () => clearInterval(t)
  }, [])

  const slide = ABOUT_SLIDES[active]

  return (
    <section
      className="overflow-hidden"
      style={{ background: '#1A183E' }}
      aria-label="About CAE hero"
    >
      <div className="mx-auto max-w-brand px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ── Left — Content ── */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            animate="visible"
            className="text-white"
          >
            {/* Live badge */}
            <div className="inline-flex items-center gap-2 bg-white/8 border border-white/15 rounded-full px-4 py-1.5 text-xs text-white/75 mb-6">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shrink-0" />
              17+ Years · 10,000+ Students · Bihar&apos;s Most Trusted
            </div>

            {/* H1 — T2 taglines */}
            <h1
              className="font-hindi font-black text-white leading-snug mb-4"
              style={{ fontSize: 'clamp(1.6rem, 4vw, 2.75rem)' }}
            >
              <span className="block">{TAGLINES.T2_line1}</span>
            </h1>
            <p
              className="font-hindi font-bold text-[#FBD207] mb-5"
              style={{ fontSize: 'clamp(0.95rem, 2vw, 1.1rem)' }}
            >
              {TAGLINES.T2_line2}
            </p>

            {/* Subtext */}
            <p className="text-white/60 text-sm leading-relaxed mb-8 font-hindi max-w-md">
              2009 में Motihari से शुरू हुई CAE की journey Bihar की सबसे
              trusted education consultancy बन चुकी है। Free counseling,
              honest guidance, और complete support — यही हमारा वादा है।
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <motion.a
                href="#lead-form"
                whileTap={buttonTap}
                className="inline-flex items-center gap-2 bg-[#FBD207] text-[#2E2567] font-bold px-6 py-3 rounded-xl text-sm"
                aria-label="Book free counseling"
              >
                <GraduationCap className="w-4 h-4" /> Free Counseling लें
              </motion.a>
              <motion.a
                href="#founder"
                whileTap={buttonTap}
                className="inline-flex items-center gap-2 border border-white/25 text-white font-semibold px-6 py-3 rounded-xl text-sm hover:bg-white/8 transition-colors"
              >
                हमारी कहानी जानें <ArrowRight className="w-4 h-4" />
              </motion.a>
            </div>
          </motion.div>

          {/* ── Right — 16:9 photo slideshow ── */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            animate="visible"
          >
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden w-full">
              <div className="relative w-full aspect-video overflow-hidden">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={slide.id}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute inset-0 bg-[#1A183E]"
                  >
                    <Image
                      src={slide.img}
                      alt={slide.title}
                      fill
                      className="object-cover object-center"
                    />
                    <div
                      className="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full"
                      style={{
                        background: `${slide.accent}22`,
                        color: slide.accent,
                        border: `1px solid ${slide.accent}44`,
                      }}
                    >
                      {slide.tag}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Dot indicators */}
              <div className="flex items-center justify-center gap-2 py-3">
                {ABOUT_SLIDES.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => setActive(i)}
                    aria-label={`Go to slide ${i + 1}`}
                  >
                    <span
                      className={`block rounded-full transition-all duration-300 ${
                        i === active ? 'w-5 h-2 bg-[#FBD207]' : 'w-2 h-2 bg-white/25'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

// ─── Section 2: Stats Bar ─────────────────────────────────────────────────────

function StatsBar() {
  return (
    <section className="bg-ind py-6 overflow-hidden" aria-label="CAE key statistics">
      <div className="mx-auto max-w-brand px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6"
        >
          {ABOUT_STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={fadeInUp}
              className={cn(
                'border-white/10',
                i < ABOUT_STATS.length - 1 && 'border-b lg:border-b-0 lg:border-r',
                (i % 2 === 0 && i < ABOUT_STATS.length - 2) && 'sm:border-r lg:border-r-0',
              )}
            >
              <AnimatedStat
                value={stat.value}
                label={stat.label}
                labelHi={stat.labelHi}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─── Section 3: Founder Story ────────────────────────────────────────────────

function FounderSection() {
  return (
    <SectionWrapper
      id="founder"
      outerClassName="bg-white"
      className="py-16 md:py-24"
      animate={false}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">

        {/* Left — video */}
        <motion.div
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="flex justify-center md:justify-start"
        >
          <div className="w-[220px] sm:w-[260px] rounded-2xl overflow-hidden bg-[#1A1840] shadow-xl border border-white/10">
            {/* Video — portrait */}
            <div className="relative w-full aspect-[9/16]">
              <video
                src="/images/team/caevideo.mp4"
                controls
                playsInline
                preload="metadata"
                className="absolute inset-0 w-full h-full object-cover"
                aria-label="Career Ambition Education — founder and student success story"
              />

            </div>

            {/* Caption strip */}
            <div className="flex items-center gap-3 px-4 py-3 bg-[#1A1840]">
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm leading-tight truncate">{FOUNDER.name}</p>
                <p className="text-white/50 text-xs truncate">{FOUNDER.title}</p>
              </div>
              <span className="shrink-0 bg-yel text-ind font-bold text-xs px-2.5 py-1 rounded-full">
                17+ Years
              </span>
            </div>
          </div>
        </motion.div>

        {/* Right — story */}
        <motion.div
          variants={fadeInRight}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="flex flex-col justify-center"
        >
          <SectionTag>संस्थापक की कहानी</SectionTag>

          <h2
            className="font-hindi font-black text-[#1A1840] leading-snug mb-4"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}
          >
            2009 से Bihar के<br />
            <span className="text-ind">Students का सपना पूरा करते हैं</span>
          </h2>

          <blockquote className="border-l-4 border-[#FBD207] pl-4 mb-6 font-hindi italic text-pur text-base leading-relaxed">
            {FOUNDER.quote}
            <footer className="text-sm text-[#8B88AA] mt-1 not-italic">
              — {FOUNDER.name}, Founder
            </footer>
          </blockquote>

          <ul className="space-y-3 mb-8">
            {FOUNDER.bio.map((point, i) => (
              <li key={i} className="flex items-start gap-3 text-[#4A4570] text-sm leading-relaxed font-hindi">
                <span className="text-ind font-bold mt-0.5 flex-shrink-0">◆</span>
                {point}
              </li>
            ))}
          </ul>

          {/* Contact strip */}
          <div className="bg-[#F5F5F8] rounded-xl p-4 flex flex-col sm:flex-row gap-3">
            <motion.a
              href={`tel:${SITE.phone}`}
              whileTap={buttonTap}
              className="flex-1 flex items-center justify-center gap-2 bg-ind text-white font-bold px-4 py-2.5 rounded-lg text-sm"
              aria-label="Call CAE"
            >
              <Phone className="w-4 h-4" /> अभी Call करें
            </motion.a>
            <motion.a
              href={SOCIAL_WA}
              target="_blank"
              rel="noopener noreferrer"
              whileTap={buttonTap}
              className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold px-4 py-2.5 rounded-lg text-sm"
              aria-label="WhatsApp CAE"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp करें
            </motion.a>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}

const SOCIAL_WA = `https://wa.me/${SITE.whatsapp}`

// ─── Section 4: Mission / Vision / Values ────────────────────────────────────

function MissionSection() {
  return (
    <SectionWrapper outerClassName="bg-[#F5F5F8]" className="py-16" animate={false}>
      {/* Section header */}
      <div className="text-center mb-10">
        <SectionTag>हमारी सोच</SectionTag>
        <h2
          className="font-hindi font-black text-ind"
          style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
        >
          Mission, Vision और Values
        </h2>
      </div>

      {/* Mission + Vision row */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5"
      >
        <motion.div
          variants={fadeInLeft}
          className="bg-white rounded-2xl border border-bdr p-7 border-t-4 border-t-ind"
        >
          <div className="w-10 h-10 rounded-xl bg-[#eeedf8] flex items-center justify-center mb-3">
            <Target className="w-5 h-5 text-ind" />
          </div>
          <h3 className="font-hindi font-bold text-ind text-xl mb-3">हमारा Mission</h3>
          <p className="text-[#4A4570] leading-relaxed font-hindi text-sm">
            Bihar के हर student को quality education guidance मिले —
            free में, honest तरीके से, और बिना किसी obligation के।
            Financial background कभी education का barrier न बने।
          </p>
        </motion.div>

        <motion.div
          variants={fadeInRight}
          className="bg-ind rounded-2xl p-7"
        >
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-3">
            <Lightbulb className="w-5 h-5 text-[#FBD207]" />
          </div>
          <h3 className="font-hindi font-bold text-[#FBD207] text-xl mb-3">हमारा Vision</h3>
          <p className="text-white/80 leading-relaxed font-hindi text-sm">
            Champaran और Bihar का सबसे trusted education brand —
            pan-India recognition के साथ। हर Bihar के student तक पहुंचना
            जो सही guidance की तलाश में है।
          </p>
        </motion.div>
      </motion.div>

      {/* Core values grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        {CORE_VALUES.map((value) => (
          <motion.div
            key={value.title}
            variants={fadeInUp}
            whileHover={{ y: -4, scale: 1.02 }}
            className="bg-white rounded-xl border border-bdr p-6 hover:border-ind hover:shadow-md transition-all cursor-default"
          >
            <div className="w-10 h-10 rounded-xl bg-[#eeedf8] flex items-center justify-center mb-3">
              {(() => { const I = ICON_MAP[value.icon]; return I ? <I className="w-5 h-5 text-ind" /> : null })()}
            </div>
            <h4 className="font-hindi font-bold text-[#1A1840] text-base mb-1">
              {value.titleHindi}
            </h4>
            <p className="text-sm text-[#4A4570] leading-relaxed font-hindi">{value.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  )
}

// ─── Section 5: Journey Timeline ─────────────────────────────────────────────

function TimelineSection() {
  return (
    <SectionWrapper
      id="journey"
      outerClassName="bg-white"
      className="py-16"
      animate={false}
    >
      <div className="text-center mb-12">
        <SectionTag>हमारा सफर</SectionTag>
        <h2
          className="font-hindi font-black text-ind"
          style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
        >
          2009 से 2025 तक — एक शानदार Journey
        </h2>
      </div>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-5 top-2 bottom-2 w-px bg-bdr md:left-1/2 md:-translate-x-px" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {TIMELINE.map((item, i) => {
            const isEven = i % 2 === 0

            const dotNode = (
              <div className="flex flex-col items-center relative z-10">
                <div
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center shadow-md',
                    item.highlight
                      ? 'bg-[#FBD207] ring-4 ring-[#FBD207]/30'
                      : 'bg-ind',
                  )}
                >
                  {(() => { const I = ICON_MAP[item.icon]; return I ? <I className={cn('w-4 h-4', item.highlight ? 'text-ind' : 'text-white')} /> : null })()}
                </div>
                <span
                  className={cn(
                    'mt-1.5 text-[10px] font-black px-2 py-0.5 rounded-full whitespace-nowrap',
                    item.highlight ? 'bg-[#FBD207] text-ind' : 'bg-[#eeedf8] text-ind',
                  )}
                >
                  {item.year}
                </span>
              </div>
            )

            const cardNode = (
              <div
                className={cn(
                  'rounded-xl border p-4 md:p-5',
                  item.highlight ? 'border-[#FBD207] bg-[#fffbdf]' : 'border-bdr bg-white',
                )}
              >
                <h4 className="font-hindi font-bold text-[#1A1840] text-sm md:text-base mb-1">
                  {item.title}
                </h4>
                <p className="text-xs md:text-sm text-[#4A4570] leading-relaxed font-hindi">
                  {item.desc}
                </p>
              </div>
            )

            return (
              <motion.div
                key={item.year}
                variants={isEven ? fadeInLeft : fadeInRight}
                className="relative mb-8 md:mb-10"
              >
                {/* Mobile layout */}
                <div className="flex gap-4 md:hidden">
                  <div className="flex-shrink-0">{dotNode}</div>
                  <div className="flex-1 pt-0.5">{cardNode}</div>
                </div>

                {/* Desktop layout — 3-col grid */}
                <div className="hidden md:grid md:grid-cols-[1fr_5rem_1fr] md:gap-4 md:items-start">
                  {/* Left slot */}
                  <div>
                    {isEven ? cardNode : null}
                  </div>
                  {/* Center dot */}
                  <div className="flex justify-center">{dotNode}</div>
                  {/* Right slot */}
                  <div>
                    {!isEven ? cardNode : null}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </SectionWrapper>
  )
}

// ─── Section 6: Services Overview ────────────────────────────────────────────

function ServicesSection() {
  return (
    <SectionWrapper outerClassName="bg-[#F5F5F8]" className="py-16" animate={false}>
      <div className="text-center mb-10">
        <SectionTag>हमारे Services</SectionTag>
        <h2
          className="font-hindi font-black text-ind"
          style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
        >
          हम क्या करते हैं — Complete Support
        </h2>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {SERVICES_BRIEF.map((service) => (
          <motion.a
            key={service.name}
            href={service.href}
            variants={fadeInUp}
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white rounded-xl border border-bdr p-6 hover:border-ind hover:shadow-md transition-all flex flex-col group cursor-pointer"
            aria-label={`Learn about ${service.name}`}
          >
            <div className="w-10 h-10 rounded-xl bg-[#eeedf8] flex items-center justify-center mb-3">
              {(() => { const I = ICON_MAP[service.icon]; return I ? <I className="w-5 h-5 text-ind" /> : null })()}
            </div>
            <h4 className="font-bold text-[#1A1840] text-sm mb-1">{service.name}</h4>
            <p className="text-xs text-[#8B88AA] leading-relaxed flex-1">{service.desc}</p>
            <motion.span
              whileHover={{ x: 4 }}
              className="text-ind text-xs font-semibold mt-3 flex items-center gap-1"
            >
              और जानें <ArrowRight className="w-3 h-3" />
            </motion.span>
          </motion.a>
        ))}
      </motion.div>
    </SectionWrapper>
  )
}

// ─── Section 7: 20 Offices ────────────────────────────────────────────────────

function OfficesSection() {
  const hq = OFFICES.find((o) => o.tag === 'HQ')!
  const branches = OFFICES.filter((o) => o.tag !== 'HQ')

  return (
    <SectionWrapper outerClassName="bg-white" className="py-16" animate={false}>
      <div className="text-center mb-10">
        <SectionTag>हमारे Offices</SectionTag>
        <h2
          className="font-hindi font-black text-ind mb-2"
          style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
        >
          Bihar में 20 Offices — आपके पास
        </h2>
        <p className="text-[#4A4570] text-sm font-hindi">
          Motihari से Bhagalpur तक — CAE har district mein hai।
          Nearest office visit karo ya call karo।
        </p>
      </div>

      {/* HQ card */}
      <motion.div
        variants={scaleIn}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="bg-ind rounded-2xl p-6 mb-6 flex flex-col md:flex-row md:items-center gap-4"
      >
        <div className="flex-1">
          <Badge className="bg-[#FBD207] text-ind font-bold border-0 mb-2 inline-flex items-center gap-1">
            <Building2 className="w-3.5 h-3.5" /> Headquarters
          </Badge>
          <h3 className="font-hindi text-white font-bold text-xl mb-1">
            {hq.city} — Main Office
          </h3>
          <p className="text-white/70 text-sm">{SITE.address}</p>
          <p className="text-white/60 text-xs mt-1 flex items-center gap-1"><Clock className="w-3 h-3" /> {SITE.hours}</p>
        </div>
        <div className="flex gap-3 flex-wrap">
          <motion.a
            href={`tel:${SITE.phone}`}
            whileTap={buttonTap}
            className="bg-white text-ind font-bold px-4 py-2.5 rounded-xl text-sm flex items-center gap-2"
            aria-label="Call CAE headquarters"
          >
            <Phone className="w-3.5 h-3.5" />
            Call करें
          </motion.a>
          <motion.a
            href={SOCIAL_WA}
            target="_blank"
            rel="noopener noreferrer"
            whileTap={buttonTap}
            className="bg-[#25D366] text-white font-bold px-4 py-2.5 rounded-xl text-sm flex items-center gap-2"
            aria-label="WhatsApp CAE"
          >
            <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
          </motion.a>
        </div>
      </motion.div>

      {/* Branch offices */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
      >
        {branches.map((office) => (
          <motion.div
            key={office.city}
            variants={fadeInUp}
            whileHover={{ scale: 1.05, borderColor: '#2E2567' }}
            className="border border-bdr rounded-xl p-3 text-center cursor-pointer transition-colors hover:bg-[#eeedf8]"
          >
            <p className="text-xs font-bold text-[#1A1840] flex items-center justify-center gap-1"><MapPin className="w-3 h-3 text-ind" />{office.city}</p>
            <p className="text-[10px] text-[#8B88AA] mt-0.5">{office.district}</p>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-5 text-center">
        <motion.a
          href={`tel:${SITE.phone}`}
          whileTap={buttonTap}
          className="inline-flex items-center gap-2 bg-[#eeedf8] text-ind font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-ind hover:text-white transition-colors"
          aria-label="Call CAE for more office info"
        >
          <Phone className="w-4 h-4" /> Nearest Office के लिए Call करें
        </motion.a>
      </div>
    </SectionWrapper>
  )
}

// ─── Section 8: Why Choose CAE ───────────────────────────────────────────────

function WhyCAESection() {
  return (
    <SectionWrapper outerClassName="bg-[#F5F5F8]" className="py-16" animate={false}>
      <div className="text-center mb-10">
        <SectionTag>क्यों CAE?</SectionTag>
        <h2
          className="font-hindi font-black text-ind"
          style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
        >
          CAE क्यों choose करें?
        </h2>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="space-y-4 max-w-3xl mx-auto"
      >
        {TRUST_POINTS.map((point) => (
          <motion.div
            key={point.num}
            variants={fadeInUp}
            whileHover={{ x: 4 }}
            className="bg-white rounded-xl border border-bdr p-5 flex gap-4 hover:border-ind hover:shadow-sm transition-all"
          >
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-xl bg-[#eeedf8] flex items-center justify-center">
                {(() => { const I = ICON_MAP[point.icon]; return I ? <I className="w-5 h-5 text-ind" /> : null })()}
              </div>
            </div>
            <div>
              <h4 className="font-hindi font-bold text-[#1A1840] text-base mb-1">
                {point.titleHindi}
              </h4>
              <p className="text-sm text-[#4A4570] leading-relaxed font-hindi">{point.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  )
}

// ─── Section 9: Testimonials ─────────────────────────────────────────────────

function TestimonialsSection() {
  return (
    <SectionWrapper outerClassName="bg-white" className="py-16" animate={false}>
      <div className="text-center mb-10">
        <SectionTag>Student Reviews</SectionTag>
        <h2
          className="font-hindi font-black text-ind mb-2"
          style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
        >
          हमारे Students क्या कहते हैं?
        </h2>
        <p className="text-[#4A4570] text-sm font-hindi">
          10,000+ success stories में से कुछ — real students, real results।
        </p>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {TESTIMONIALS.map((t) => (
          <motion.div
            key={t.name}
            variants={fadeInUp}
            whileHover={{ y: -3 }}
            className="bg-[#F5F5F8] rounded-xl border border-bdr p-5"
          >
            {/* Stars */}
            <div className="text-[#ECA121] text-sm mb-3 tracking-wider">
              {'★'.repeat(t.stars)}
            </div>

            {/* Quote */}
            <p className="font-hindi text-[#4A4570] text-sm leading-relaxed italic mb-4">
              &ldquo;{t.text}&rdquo;
            </p>

            {/* Author */}
            <div className="flex items-center gap-3 pt-3 border-t border-bdr">
              <div className="w-9 h-9 rounded-full bg-ind flex items-center justify-center text-white text-xs font-black flex-shrink-0">
                {t.initials}
              </div>
              <div>
                <p className="text-sm font-bold text-[#1A1840]">{t.name}</p>
                <p className="text-xs text-[#8B88AA]">
                  {t.course} · {t.college}
                </p>
                <p className="text-[10px] text-[#8B88AA] flex items-center gap-0.5"><MapPin className="w-2.5 h-2.5" />{t.city}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Trust CTA */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mt-8 bg-[#eeedf8] rounded-xl p-4 text-center"
      >
        <p className="text-ind font-bold font-hindi text-sm">
          Join 10,000+ students who trusted CAE →
        </p>
      </motion.div>
    </SectionWrapper>
  )
}

// ─── Section 10: Media / Recognition (placeholder) ───────────────────────────

function MediaSection() {
  const items: { Icon: IconComp; label: string }[] = [
    { Icon: Newspaper, label: 'Local Media Coverage' },
    { Icon: Medal,     label: 'Bihar Education Award' },
    { Icon: Users,     label: '10,000+ Student Community' },
  ]

  return (
    <SectionWrapper outerClassName="bg-[#F5F5F8]" className="py-12" animate={false}>
      <div className="text-center mb-8">
        <SectionTag>Recognition</SectionTag>
        <h2 className="font-hindi font-black text-ind text-xl sm:text-2xl">
          Media &amp; Recognition
        </h2>
        <p className="text-[#4A4570] text-sm mt-2 font-hindi">
          CAE Bihar ke education landscape mein ek trusted naam hai।
        </p>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid grid-cols-1 md:grid-cols-3 gap-5"
      >
        {items.map(({ Icon, label }) => (
          <motion.div
            key={label}
            variants={fadeInUp}
            className="bg-white rounded-xl border border-bdr p-6 text-center"
          >
            <div className="w-12 h-12 rounded-xl bg-[#eeedf8] flex items-center justify-center mx-auto mb-3">
              <Icon className="w-6 h-6 text-ind" />
            </div>
            <p className="text-sm font-medium text-[#4A4570]">{label}</p>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  )
}

// ─── Section 11: Lead Form ────────────────────────────────────────────────────

function LeadFormSection() {
  const trustPoints = [
    'Free counseling — कोई charges नहीं',
    'Honest guidance — सिर्फ आपके benefit के लिए',
    'BSCC loan में complete help',
    'MBBS Abroad expert guidance',
    '20 offices — आपके पास',
  ]

  return (
    <section id="lead-form" className="bg-ind py-16 overflow-hidden" aria-label="Book free counseling">
      <div className="mx-auto max-w-brand px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Left — context */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <h2
              className="font-hindi font-bold text-white mb-4"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
            >
              CAE से जुड़ें — एक ही Free Counseling लें!
            </h2>
            <p className="font-hindi text-white/70 text-sm leading-relaxed mb-7">
              17 साल का experience, 10,000+ successful admissions।
              आपकी education journey में सबसे पहला और सबसे सही कदम।
            </p>

            <ul className="space-y-3 mb-8">
              {trustPoints.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 text-white/80 text-sm font-hindi"
                >
                  <CheckCircle className="w-4 h-4 text-[#FBD207] shrink-0 mt-0.5" />
                  {point}
                </li>
              ))}
            </ul>

            {/* Founder mini quote */}
            <div className="bg-white/10 border border-white/15 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 bg-[#FBD207] rounded-full flex items-center justify-center text-ind font-black text-xs shrink-0">
                  CS
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">{FOUNDER.name}, Founder</p>
                  <p className="text-[#FBD207] text-xs mb-1.5">★★★★★</p>
                  <p className="font-hindi text-white/70 text-xs leading-relaxed">
                    &ldquo;हम आपके बच्चे का future seriously लेते हैं।&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="bg-white rounded-2xl p-6 md:p-8 shadow-xl"
          >
            <h3 className="font-hindi font-bold text-ind text-xl mb-5">
              <span className="flex items-center gap-2">
                <GraduationCap size={20} />
                Free में बात करें
              </span>
            </h3>
            <LeadForm sourcePage="/about" compact={false} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─── Section 12: Contact Quick Links ─────────────────────────────────────────

function ContactLinksSection() {
  return (
    <SectionWrapper outerClassName="bg-white" className="py-12" animate={false}>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid grid-cols-1 md:grid-cols-3 gap-5"
      >
        {/* Call */}
        <motion.div
          variants={fadeInUp}
          className="bg-[#F5F5F8] rounded-xl p-5 text-center flex flex-col items-center"
        >
          <div className="w-12 h-12 rounded-xl bg-[#eeedf8] flex items-center justify-center mb-3">
            <Phone className="w-5 h-5 text-ind" />
          </div>
          <p className="font-bold text-[#1A1840] mb-1">Call करें</p>
          <p className="text-xs text-[#8B88AA] mb-3">{SITE.hours}</p>
          <motion.a
            href={`tel:${SITE.phone}`}
            whileTap={buttonTap}
            className="inline-flex items-center gap-2 bg-ind text-white font-bold px-4 py-2 rounded-lg text-sm"
            aria-label="Call CAE"
          >
            <Phone className="w-3.5 h-3.5" /> अभी Call करें
          </motion.a>
        </motion.div>

        {/* WhatsApp */}
        <motion.div
          variants={fadeInUp}
          className="bg-[#E1F5EE] rounded-xl p-5 text-center flex flex-col items-center"
        >
          <div className="w-12 h-12 rounded-xl bg-[#25D366]/10 flex items-center justify-center mb-3">
            <MessageCircle className="w-5 h-5 text-[#25D366]" />
          </div>
          <p className="font-bold text-[#1A1840] mb-3">WhatsApp करें</p>
          <motion.a
            href={SOCIAL_WA}
            target="_blank"
            rel="noopener noreferrer"
            whileTap={buttonTap}
            className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold px-4 py-2 rounded-lg text-sm"
            aria-label="WhatsApp CAE"
          >
            <MessageCircle className="w-3.5 h-3.5" /> Chat शुरू करें
          </motion.a>
        </motion.div>

        {/* Visit */}
        <motion.div
          variants={fadeInUp}
          className="bg-[#eeedf8] rounded-xl p-5 text-center flex flex-col items-center"
        >
          <div className="w-12 h-12 rounded-xl bg-[#2E2567]/10 flex items-center justify-center mb-3">
            <MapPin className="w-5 h-5 text-ind" />
          </div>
          <p className="font-bold text-[#1A1840] mb-1">Office Visit करें</p>
          <p className="text-xs text-[#4A4570] font-hindi">
            Ram Saraan Gate, Chandmari<br />
            Motihari, Bihar 845401
          </p>
        </motion.div>
      </motion.div>
    </SectionWrapper>
  )
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function AboutContent() {
  return (
    <main>
      <HeroSection />
      <StatsBar />
      <FounderSection />
      <MissionSection />
      <TimelineSection />
      <ServicesSection />
      <OfficesSection />
      <WhyCAESection />
      <TestimonialsSection />
      <MediaSection />
      <LeadFormSection />
      <ContactLinksSection />
    </main>
  )
}
