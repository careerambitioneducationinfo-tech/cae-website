'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  Landmark, IndianRupee, Percent, Gift, TrendingUp,
  ExternalLink, Phone, GraduationCap,
  School, Home, Laptop, Bus, FlaskConical, Wrench,
  CreditCard, MapPin, FileText, Building, Camera,
  Monitor, ClipboardList, FolderOpen, Building2, ShieldCheck, BadgeCheck,
  Handshake, AlertTriangle,
  Cpu, Stethoscope, Briefcase, BookOpen, Scale, Wheat, Pill, Hotel,
  Info, Heart, Newspaper,
  CheckCircle, XCircle,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import SectionWrapper from '@/components/shared/SectionWrapper'
import EligibilityChecker from './_sections/EligibilityChecker'
import {
  fadeInUp, fadeInLeft, fadeInRight,
  staggerContainer, scaleIn,
  viewportOnce, buttonTap, cardHover,
} from '@/lib/animations'
import { SOCIAL } from '@/lib/constants'
import {
  BSCC_SCHEME, LOAN_USAGE, DOCUMENTS, PROCESS_STEPS,
  ELIGIBLE_COURSES, DRCC_DISTRICTS,
} from '@/lib/bsccData'

// ── Icon maps (no emojis) ──────────────────────────────────────────────────

const LOAN_USAGE_ICONS = [School, Home, Laptop, Bus, FlaskConical, Wrench]

const DOC_ICONS = [CreditCard, MapPin, FileText, GraduationCap, Building, Camera]

const STEP_ICONS = [Monitor, ClipboardList, FolderOpen, Building2, ShieldCheck, BadgeCheck]

const STREAM_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  'Engineering':    Cpu,
  'Medical':        Stethoscope,
  'Management':     Briefcase,
  'Arts & Science': BookOpen,
  'Law':            Scale,
  'Agriculture':    Wheat,
  'Pharmacy':       Pill,
  'Hotel & Others': Hotel,
}

// ── Comparison data ────────────────────────────────────────────────────────

const SELF_CONS = [
  'Documents format पता नहीं',
  'DRCC process confusing',
  'Rejection का डर',
  'Follow-up खुद करना पड़ता है',
  'Time waste — multiple visits',
]

const CAE_PROS = [
  'Correct documents format',
  'DRCC visit में साथ आता है',
  '90%+ approval rate',
  'Complete follow-up CAE करेगा',
  '10–15 days में done',
  'Completely FREE service',
]

// ══════════════════════════════════════════════════════════════════════════════

export default function BsccContent() {
  return (
    <>
      {/* ── SECTION 1: HERO ─────────────────────────────────────────────── */}
      <section
        className="bg-gradient-to-br from-[#2E2567] via-[#3d318a] to-[#644A9E] py-14 md:py-20"
        aria-label="BSCC Loan Hero"
      >
        <div className="mx-auto max-w-brand px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left — content */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="text-white"
            >
              {/* Govt badge */}
              <motion.div variants={fadeInUp}>
                <Badge className="bg-yel/15 text-yel border border-yel/30 mb-5 gap-1.5">
                  <Landmark className="w-3.5 h-3.5" />
                  Bihar Govt Scheme · Since October 2, 2016
                </Badge>
              </motion.div>

              {/* T4 Tagline — H1 */}
              <motion.h1
                variants={fadeInUp}
                className="font-hindi font-black text-3xl sm:text-4xl lg:text-[2.75rem] mb-4"
              >
                अब fees की{' '}
                <span className="text-yel">tension</span> क्यों
                <br />
                जब{' '}
                <span className="text-yel">DRCC</span> है साथ में!
              </motion.h1>

              {/* Sub-tagline */}
              <motion.p variants={fadeInUp} className="font-hindi font-bold text-white/80 text-base mb-3">
                Bihar Student Credit Card — ₹4 Lakh तक, 0% Effective Interest
              </motion.p>

              {/* Subtext */}
              <motion.p variants={fadeInUp} className="font-hindi text-white/65 text-sm leading-relaxed mb-7 max-w-md">
                Bihar Government की scheme। 12th के बाद engineering, MBBS, MBA, nursing —
                किसी भी course के लिए ₹4 lakh loan।
                CAE <strong>free</strong> में complete process handle करेगा।
              </motion.p>

              {/* Trust badges */}
              <motion.div
                variants={staggerContainer}
                className="flex flex-wrap gap-3 mb-8"
              >
                {[
                  { Icon: IndianRupee,  text: '₹4,00,000 max loan' },
                  { Icon: Percent,      text: '0% Effective Interest' },
                  { Icon: Gift,         text: 'CAE Service Free' },
                  { Icon: TrendingUp,   text: '3,000+ loans processed' },
                ].map(({ Icon, text }) => (
                  <motion.div
                    key={text}
                    variants={fadeInUp}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-1.5 bg-white/10 border border-white/15 rounded-full px-3 py-1.5 text-white/75 text-xs font-medium"
                  >
                    <Icon className="w-3.5 h-3.5 text-yel shrink-0" />
                    {text}
                  </motion.div>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div variants={fadeInUp} className="flex flex-wrap gap-3">
                <motion.a
                  href="#eligibility-check"
                  whileTap={buttonTap}
                  className="inline-flex items-center gap-2 bg-yel text-dk font-bold px-6 py-3.5 rounded-xl text-sm hover:bg-yel/90 transition-colors font-hindi shadow-lg shadow-yel/20"
                  aria-label="Apply for BSCC Loan"
                >
                  BSCC Loan Apply करें →
                </motion.a>
                <motion.a
                  href={SOCIAL.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileTap={buttonTap}
                  className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold px-6 py-3.5 rounded-xl text-sm hover:bg-white/8 transition-colors"
                  aria-label="WhatsApp us about BSCC loan"
                >
                  WhatsApp से जानें
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Right — scheme image card */}
            <motion.div
              variants={fadeInRight}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                {/* Accent bar */}
                <div className="h-1.5 bg-gradient-to-r from-yel to-amb" />

                {/* Scheme image */}
                <div className="relative w-full">
                  <Image
                    src="/icons/drcc_scheme.webp"
                    alt="Bihar Student Credit Card DRCC scheme details"
                    width={600}
                    height={400}
                    className="w-full h-auto object-contain"
                    priority
                  />
                </div>

                {/* CTA strip */}
                <div className="px-5 pb-5">
                  <motion.a
                    href="#apply-now"
                    whileTap={buttonTap}
                    className="flex items-center justify-center w-full bg-ind text-white font-hindi font-bold text-sm py-3 rounded-xl hover:bg-ind/90 transition-colors"
                  >
                    Free में Apply करवाएं →
                  </motion.a>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── SECTION 2: WHAT IS BSCC ─────────────────────────────────────── */}
      <section className="bg-white py-14" aria-label="What is BSCC">
        <div className="mx-auto max-w-brand px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* Left — text */}
            <motion.div
              variants={fadeInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <Badge className="bg-il text-ind border-0 mb-4">Bihar Govt Scheme</Badge>
              <h2 className="font-hindi font-bold text-ind text-3xl sm:text-4xl mb-5">
                BSCC क्या है — सरल भाषा में
              </h2>
              <div className="space-y-4 text-gray-600 text-sm leading-relaxed font-hindi">
                <p>
                  Bihar Student Credit Card (BSCC) Bihar Government की एक flagship scheme है
                  जो 12th pass students को higher education के लिए ₹4 lakh तक का loan देती है।
                  Mukhyamantri Nishchay Yojana के तहत October 2, 2016 को launch हुई।
                </p>
                <p>
                  Loan से tuition fees, hostel, laptop, books — सब cover होता है।
                  Repayment course complete होने के 1 साल बाद शुरू — 15 साल तक की flexibility।
                  Girl students और Divyang students के लिए सिर्फ 1% interest।
                </p>
              </div>

              {/* Official links */}
              <div className="mt-6 space-y-2.5">
                <motion.a
                  href={BSCC_SCHEME.officialSite}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-2 text-pur text-sm font-medium"
                  aria-label="Official BSCC portal"
                >
                  <ExternalLink className="w-4 h-4 shrink-0" />
                  Official Portal: {BSCC_SCHEME.officialSite.replace('https://', '')}
                </motion.a>
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <Phone className="w-4 h-4 shrink-0 text-yel" />
                  Helpline: {BSCC_SCHEME.helpline} (Toll Free)
                </div>
              </div>
            </motion.div>

            {/* Right — loan usage card */}
            <motion.div
              variants={fadeInRight}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <div className="bg-il rounded-2xl p-6">
                <h3 className="font-hindi font-bold text-ind text-lg mb-5">
                  ₹4 Lakh Loan — क्या-क्या cover होता है?
                </h3>
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                  className="grid grid-cols-2 gap-3 mb-5"
                >
                  {LOAN_USAGE.map((item, i) => {
                    const Icon = LOAN_USAGE_ICONS[i]
                    return (
                      <motion.div
                        key={item.label}
                        variants={fadeInUp}
                        className="bg-white rounded-xl p-3.5 border border-bdr"
                      >
                        <Icon className="w-5 h-5 text-ind mb-2" />
                        <p className="font-semibold text-ind text-xs">{item.label}</p>
                        <p className="text-mu text-[11px] mt-0.5 leading-snug">{item.desc}</p>
                      </motion.div>
                    )
                  })}
                </motion.div>
                <div className="bg-yel/20 text-ind text-xs font-hindi font-semibold px-4 py-2.5 rounded-xl text-center">
                  Repayment सिर्फ job मिलने के बाद!
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── SECTION 3: ELIGIBILITY CHECKER ──────────────────────────────── */}
      <section id="eligibility-check" className="bg-[#F5F5F8] py-16" aria-label="Eligibility check">
        <div className="mx-auto max-w-brand px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <Badge className="bg-il text-ind border-0 mb-3">Eligibility</Badge>
            <h2 className="font-hindi font-bold text-ind text-3xl sm:text-4xl mb-2">
              क्या आप BSCC के लिए eligible हैं?
            </h2>
            <p className="text-mu text-sm">5 simple criteria check karo — 2 minutes mein pata chalega।</p>
          </div>
          <EligibilityChecker />
        </div>
      </section>

      {/* ── SECTION 4: DOCUMENTS ────────────────────────────────────────── */}
      <section className="bg-white py-16" aria-label="Required documents">
        <div className="mx-auto max-w-brand px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <Badge className="bg-il text-ind border-0 mb-3">Documents</Badge>
            <h2 className="font-hindi font-bold text-ind text-3xl sm:text-4xl mb-2">
              कौन से Documents चाहिए?
            </h2>
            <p className="font-hindi text-mu text-sm">CAE free में documents checklist aur format explain karta hai।</p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8"
          >
            {DOCUMENTS.map((doc, i) => {
              const Icon = DOC_ICONS[i]
              return (
                <motion.div
                  key={doc.category}
                  variants={fadeInUp}
                  whileHover={cardHover}
                >
                  <Card className="h-full border-bdr rounded-[14px]">
                    <CardContent className="p-5">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-il rounded-xl flex items-center justify-center shrink-0">
                          <Icon className="w-5 h-5 text-ind" />
                        </div>
                        <h3 className="font-bold text-ind text-sm">{doc.category}</h3>
                      </div>
                      <ol className="space-y-1.5">
                        {doc.items.map((item, idx) => (
                          <li key={item} className="flex items-start gap-2 text-gray-600 text-xs">
                            <span className="shrink-0 w-4 h-4 bg-[#eeedf8] text-ind rounded-full flex items-center justify-center text-[10px] font-bold mt-0.5">
                              {idx + 1}
                            </span>
                            {item}
                          </li>
                        ))}
                      </ol>
                      <div className="mt-4 text-[10px] font-semibold text-ind bg-il px-2.5 py-1 rounded-full w-fit">
                        Self-attested copies लें
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Warning note */}
          <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl p-4 max-w-2xl mx-auto">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
            <p className="font-hindi text-sm leading-relaxed">
              <strong>ध्यान दें:</strong> Documents online upload नहीं होते — DRCC office में
              physically जाना पड़ता है। CAE साथ जाएगा!
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: PROCESS STEPS ────────────────────────────────────── */}
      <SectionWrapper outerClassName="bg-[#F5F5F8]" className="py-16">
        <div className="text-center mb-10">
          <Badge className="bg-il text-ind border-0 mb-3">Process</Badge>
          <h2 className="font-hindi font-bold text-ind text-3xl sm:text-4xl mb-2">
            BSCC Loan मिलने के 6 Steps
          </h2>
          <p className="font-hindi text-mu text-sm">CAE आपके साथ हर step पर है — 10–15 दिन में loan sanctioned।</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="relative"
          >
            {/* Vertical connecting line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-bdr" aria-hidden="true" />

            {PROCESS_STEPS.map((step, i) => {
              const StepIcon = STEP_ICONS[i]
              return (
                <motion.div
                  key={step.step}
                  variants={fadeInUp}
                  className="relative flex gap-4 pb-7 last:pb-0"
                >
                  {/* Step circle */}
                  <div className="relative z-10 w-12 h-12 rounded-full bg-ind flex items-center justify-center shrink-0 text-white font-black text-base shadow-md">
                    {step.step}
                  </div>

                  {/* Card */}
                  <div className="flex-1 bg-white rounded-xl border border-bdr p-5 hover:border-ind/30 transition-colors">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <p className="text-[10px] font-semibold text-mu uppercase tracking-wider mb-1">
                          {step.time}
                        </p>
                        <h4 className="font-hindi font-bold text-dk text-sm mb-1.5">
                          {step.titleHindi}
                        </h4>
                        <p className="font-hindi text-xs text-gray-500 leading-relaxed">{step.desc}</p>
                      </div>
                      <StepIcon className="w-7 h-7 text-ind/30 shrink-0" />
                    </div>

                    {/* CAE help badge */}
                    <div className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-medium text-ind bg-il px-3 py-1.5 rounded-lg">
                      <Handshake className="w-3.5 h-3.5 shrink-0" />
                      <span className="font-hindi">{step.caeHelp}</span>
                    </div>

                    {/* External link for step 1 */}
                    {step.link && (
                      <motion.a
                        href={step.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ x: 4 }}
                        className="mt-2 flex items-center gap-1 text-[11px] text-pur font-medium"
                        aria-label="Open official BSCC portal"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Official Portal जाएं
                      </motion.a>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Completion banner */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mt-6 bg-[#E1F5EE] border border-green-200 rounded-xl p-4 text-center"
          >
            <p className="font-hindi text-emerald-700 font-semibold text-sm leading-relaxed">
              Loan Sanctioned! College fees directly pay होती है।
              Repayment course + 1 year baad — 15 saal ki flexibility।
            </p>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* ── SECTION 6: ELIGIBLE COURSES ─────────────────────────────────── */}
      <section className="bg-white py-16" aria-label="BSCC eligible courses">
        <div className="mx-auto max-w-brand px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <Badge className="bg-il text-ind border-0 mb-3">Courses</Badge>
            <h2 className="font-hindi font-bold text-ind text-3xl sm:text-4xl mb-2">
              कौन से Courses BSCC Eligible हैं?
            </h2>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          >
            {ELIGIBLE_COURSES.map((stream) => {
              const Icon = STREAM_ICONS[stream.stream] ?? BookOpen
              return (
                <motion.div
                  key={stream.stream}
                  variants={fadeInUp}
                  whileHover={{ y: -3 }}
                >
                  <Card className="h-full border-bdr rounded-[14px]">
                    <CardContent className="p-4">
                      <div className="w-9 h-9 bg-il rounded-lg flex items-center justify-center mb-3">
                        <Icon className="w-4.5 h-4.5 text-ind" />
                      </div>
                      <h3 className="font-bold text-ind text-xs mb-2.5">{stream.stream}</h3>
                      <div className="flex flex-wrap gap-1">
                        {stream.courses.map((c) => (
                          <span
                            key={c}
                            className="text-[10px] bg-[#F5F5F8] text-mu px-2 py-0.5 rounded-full border border-bdr"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Info banner + CTA row */}
          <div className="flex flex-col sm:flex-row items-center gap-4 max-w-2xl mx-auto">
            <div className="flex items-start gap-3 bg-[#F5F5F8] border border-bdr rounded-xl p-4 flex-1">
              <Info className="w-4 h-4 text-ind shrink-0 mt-0.5" />
              <p className="font-hindi text-xs text-gray-600 leading-relaxed">
                Is list ke alawa bhi kuch courses eligible hain। Official complete course list:{' '}
                <a
                  href={BSCC_SCHEME.officialSite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pur font-medium underline"
                >
                  7nishchay-yuvaupmission.bihar.gov.in
                </a>
              </p>
            </div>
            <motion.a
              href="/courses#course-finder"
              whileTap={buttonTap}
              className="shrink-0 inline-flex items-center gap-2 bg-ind text-white font-hindi font-bold text-sm px-5 py-3 rounded-xl hover:bg-ind/90 transition-colors whitespace-nowrap"
              aria-label="Find BSCC eligible colleges"
            >
              <GraduationCap className="w-4 h-4" />
              College खोजें →
            </motion.a>
          </div>
        </div>
      </section>

      {/* ── SECTION 7: INTEREST RATE ─────────────────────────────────────── */}
      <section className="bg-dk py-14" aria-label="Interest rate details">
        <div className="mx-auto max-w-brand px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-hindi font-bold text-white text-3xl sm:text-4xl mb-2">
              Interest Rate — सच क्या है?
            </h2>
            <p className="font-hindi text-white/50 text-sm">September 2025 ke cabinet decision ke baad practically interest-free</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {[
              {
                variant: fadeInLeft,
                Icon:    Info,
                title:   'General Students',
                rate:    '4% p.a.',
                note:    'Government subsidy के बाद practically 0% effective',
                highlight: 'Bihar Govt pays interest for you',
              },
              {
                variant: fadeInUp,
                Icon:    Heart,
                title:   'Girl / Divyang / Transgender',
                rate:    '1% p.a. only',
                note:    'Special extra benefit for girl students',
                highlight: 'Female students को special rate',
              },
              {
                variant: fadeInRight,
                Icon:    Newspaper,
                title:   'Sept 2025 Update',
                rate:    '0% Effective',
                note:    'Cabinet decision Sept 18, 2025 — Gazette No. 127/2025-FD',
                highlight: 'Latest govt update',
              },
            ].map(({ variant, Icon, title, rate, note, highlight }) => (
              <motion.div
                key={title}
                variants={variant}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                whileHover={{ borderColor: '#FBD207', backgroundColor: 'rgba(255,255,255,0.12)' }}
                className="bg-white/8 border border-white/15 rounded-xl p-6 transition-colors"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-yel" />
                  </div>
                  <h3 className="font-bold text-white text-sm">{title}</h3>
                </div>
                <p className="font-black text-yel text-3xl mb-1">{rate}</p>
                <p className="text-white/60 text-xs leading-relaxed mb-3">{note}</p>
                <div className="text-[10px] font-semibold text-yel bg-yel/10 border border-yel/20 px-2.5 py-1 rounded-full w-fit">
                  {highlight}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex items-start gap-2 max-w-xl mx-auto">
            <AlertTriangle className="w-4 h-4 text-white/40 shrink-0 mt-0.5" />
            <p className="font-hindi text-white/50 text-xs leading-relaxed">
              Loan ₹4L लेते हो, graduation के baad ₹4L hi repay karte ho —
              no interest accumulation during study! (moratorium period)
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 8: CAE VS SELF-APPLY ────────────────────────────────── */}
      <section className="bg-[#F5F5F8] py-16" aria-label="CAE vs self apply comparison">
        <div className="mx-auto max-w-brand px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <Badge className="bg-il text-ind border-0 mb-3">Comparison</Badge>
            <h2 className="font-hindi font-bold text-ind text-3xl sm:text-4xl">
              CAE से Apply करें vs खुद Apply करें
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Self-apply */}
            <motion.div
              variants={fadeInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <Card className="h-full border-bdr rounded-[14px]">
                <CardContent className="p-6">
                  <h3 className="font-hindi font-bold text-gray-500 text-base mb-4">
                    खुद Apply करने में
                  </h3>
                  <ul className="space-y-3 mb-5">
                    {SELF_CONS.map((con) => (
                      <li key={con} className="flex items-start gap-2.5 text-gray-500 text-sm font-hindi">
                        <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                        {con}
                      </li>
                    ))}
                  </ul>
                  <div className="text-amber-600 font-semibold text-xs bg-amber-50 border border-amber-200 px-3 py-2 rounded-lg">
                    Average approval: 60–70%
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* CAE — featured */}
            <motion.div
              variants={fadeInRight}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <Card className="h-full border-2 border-ind rounded-[14px] shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-hindi font-bold text-ind text-base">
                      CAE के साथ Apply करें
                    </h3>
                    <Badge className="bg-ind text-white border-0 text-[10px]">Recommended</Badge>
                  </div>
                  <ul className="space-y-3 mb-5">
                    {CAE_PROS.map((pro) => (
                      <li key={pro} className="flex items-start gap-2.5 text-gray-700 text-sm font-hindi">
                        <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        {pro}
                      </li>
                    ))}
                  </ul>
                  <div className="text-ind font-bold text-xs bg-il px-3 py-2 rounded-lg mb-4">
                    CAE Approval Rate: 90%+
                  </div>
                  <motion.a
                    href="#apply-now"
                    whileTap={buttonTap}
                    className="flex items-center justify-center w-full bg-ind text-white font-hindi font-bold text-sm py-2.5 rounded-xl hover:bg-ind/90 transition-colors"
                  >
                    Free में Apply करवाएं →
                  </motion.a>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SECTION 11: DRCC DISTRICTS ──────────────────────────────────── */}
      <section className="bg-white py-14" aria-label="DRCC district offices">
        <div className="mx-auto max-w-brand px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <Badge className="bg-il text-ind border-0 mb-3">DRCC Offices</Badge>
            <h2 className="font-hindi font-bold text-ind text-3xl sm:text-4xl mb-2">
              आपके जिले का DRCC Office
            </h2>
            <p className="font-hindi text-mu text-sm">
              Har district mein DRCC office hai। CAE aapko sahi office aur date bataega।
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-8"
          >
            {DRCC_DISTRICTS.map((district) => (
              <motion.div
                key={district}
                variants={fadeInUp}
                whileHover={{ scale: 1.05, borderColor: '#2E2567' }}
                className="flex items-center gap-2 bg-[#F5F5F8] border border-bdr rounded-xl px-4 py-3 cursor-default transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-ind shrink-0" />
                <span className="text-sm font-medium text-gray-700">{district}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Info tip */}
          <div className="flex items-start gap-3 bg-[#F5F5F8] border border-bdr rounded-xl p-4 max-w-lg mx-auto mb-6">
            <Info className="w-4 h-4 text-ind shrink-0 mt-0.5" />
            <p className="font-hindi text-xs text-gray-600 leading-relaxed">
              DRCC contact details aur office timings ke liye official portal visit karein।
              CAE free mein guide karega।
            </p>
          </div>

          {/* CTA */}
          <div className="bg-il rounded-xl p-5 max-w-lg mx-auto text-center">
            <p className="font-hindi text-ind font-semibold text-sm mb-4">
              अपने जिले का DRCC Date लेने में help चाहिए?
              <br />
              <span className="font-normal text-mu">CAE free में guide करेगा —</span>
            </p>
            <motion.a
              href="#apply-now"
              whileTap={buttonTap}
              className="inline-flex items-center gap-2 bg-ind text-white font-hindi font-bold text-sm px-6 py-2.5 rounded-xl hover:bg-ind/90 transition-colors"
            >
              Free Guidance लें →
            </motion.a>
          </div>
        </div>
      </section>
    </>
  )
}
