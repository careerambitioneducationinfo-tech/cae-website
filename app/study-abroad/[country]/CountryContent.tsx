'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  CheckCircle, FileText, GraduationCap, IndianRupee,
  ClipboardList, Star, HelpCircle, ArrowRight, Phone, Search,
  MessageCircle, ChevronDown, ChevronUp,
  Globe, BookOpen, Stethoscope, Users, Shield,
  Sun, Utensils, Building2, Plane, Landmark, Sparkles,
  type LucideIcon,
} from 'lucide-react'
import { useState } from 'react'
import SectionWrapper from '@/components/shared/SectionWrapper'
import LeadForm from '@/components/forms/LeadForm'
import {
  fadeInUp, fadeInLeft, fadeInRight,
  staggerContainer, scaleIn, viewportOnce, buttonTap,
} from '@/lib/animations'
import { SITE, SOCIAL } from '@/lib/constants'
import type { CountryData } from '@/lib/abroadData'

interface Props {
  data: CountryData
}

/* ─── Icon name → Lucide component map ─── */
const ICON_MAP: Record<string, LucideIcon> = {
  GraduationCap,
  IndianRupee,
  Globe,
  BookOpen,
  Stethoscope,
  Users,
  Shield,
  Sun,
  Utensils,
  Building2,
  Plane,
  Landmark,
  Sparkles,
  Star,
}

function BenefitIcon({ name }: { name: string }) {
  const Icon = ICON_MAP[name] ?? GraduationCap
  return <Icon className="w-6 h-6 text-ind" aria-hidden="true" />
}

/* ─── Section heading ─── */
function SectionHeading({ hi, en, sub }: { hi: string; en?: string; sub?: string }) {
  return (
    <div className="mb-10 text-center">
      <h2 className="font-hindi font-bold text-2xl sm:text-3xl lg:text-4xl text-ind leading-tight">
        {hi}
        {en && <span className="block text-pur text-xl sm:text-2xl mt-1">{en}</span>}
      </h2>
      {sub && <p className="mt-3 text-gray-500 text-sm sm:text-base max-w-2xl mx-auto font-hindi">{sub}</p>}
    </div>
  )
}

export default function CountryContent({ data }: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const waMsg = encodeURIComponent(`Namaste! मैं ${data.name} में MBBS के बारे में जानकारी चाहता/चाहती हूँ।`)

  return (
    <>
      {/* ══════════════════════════════════════════════
          1. HERO — matches homepage bg-dk style
      ══════════════════════════════════════════════ */}
      <section
        className="relative min-h-[88vh] sm:min-h-screen flex items-center overflow-hidden bg-dk"
        aria-label={`Study MBBS in ${data.name} hero`}
      >
        {/* Subtle glow — same as homepage */}
        <div
          className="absolute top-0 left-1/4 w-[600px] h-[300px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(100,74,158,0.18) 0%, transparent 70%)' }}
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-brand px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-3xl">
            {/* Live badge — like homepage */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 bg-white/8 backdrop-blur-sm border border-white/15 rounded-full px-4 py-1.5 text-xs text-white/80 mb-6"
            >
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              {data.recognition.slice(0, 2).join(' · ')}
            </motion.div>

            {/* Flag + country */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.05 }}
              className="flex items-center gap-3 mb-4"
            >
              <span className="text-4xl" role="img" aria-label={`${data.name} flag`}>{data.flag}</span>
              <span className="text-white/60 text-sm font-medium uppercase tracking-widest">MBBS Abroad</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 }}
              className="font-hindi font-bold text-white leading-tight mb-2"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
            >
              {data.nameHi} में MBBS करें
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.15 }}
              className="text-yel font-bold text-lg sm:text-xl mb-5 font-hindi"
            >
              {data.tagline.split('—')[1]?.trim() ?? data.tagline}
            </motion.p>

            {/* Subtitle */}
            <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.18 }}
              className="text-white/55 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl font-hindi"
            >
              {data.heroSubtitle}
            </motion.p>

            {/* Key stats strip */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-3 gap-3 mb-8 max-w-md"
            >
              {[
                { label: 'Total Fees', val: data.totalFee },
                { label: 'Duration', val: data.duration },
                { label: 'Medium', val: 'English' },
              ].map((s) => (
                <motion.div
                  key={s.label}
                  variants={scaleIn}
                  className="bg-white/8 backdrop-blur-sm border border-white/10 rounded-xl p-3 text-center"
                >
                  <p className="text-yel font-bold text-lg sm:text-xl leading-none">{s.val}</p>
                  <p className="text-white/60 text-[11px] mt-1">{s.label}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.25 }}
              className="flex flex-wrap gap-3"
            >
              <motion.a
                href="#counseling"
                whileTap={buttonTap}
                className="inline-flex items-center gap-2 bg-yel text-dk font-bold px-7 py-3.5 rounded-full text-sm sm:text-base hover:bg-yel/90 transition-colors font-hindi shadow-lg shadow-yel/20"
                aria-label="Free counseling"
              >
                <GraduationCap className="w-4 h-4" />
                Free Counseling लें
              </motion.a>
              <motion.a
                href={`tel:${SITE.phone}`}
                whileTap={buttonTap}
                className="inline-flex items-center gap-2 border border-white/25 text-white font-semibold px-7 py-3.5 rounded-full text-sm hover:bg-white/8 transition-colors"
                aria-label={`Call ${SITE.phone}`}
              >
                <Phone className="w-4 h-4" />
                अभी Call करें
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          2. OVERVIEW
      ══════════════════════════════════════════════ */}
      <SectionWrapper outerClassName="bg-[#F5F5F8]" className="py-16 sm:py-20">
        <SectionHeading
          hi={`${data.nameHi} में MBBS — Overview`}
          sub="सब कुछ जानें जो आपको decision लेने के लिए चाहिए"
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left — text */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <p className="text-gray-600 leading-relaxed text-base font-hindi mb-6">{data.overview}</p>
            <h3 className="font-hindi font-bold text-ind text-lg mb-4">{data.nameHi} क्यों चुनें?</h3>
            <ul className="space-y-3">
              {data.whyChoose.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-yel shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm font-hindi">{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right — highlights grid */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <div className="grid grid-cols-2 gap-4">
              {data.highlights.map((h) => (
                <div key={h.label} className="bg-white rounded-2xl border border-bdr p-5 shadow-sm text-center">
                  <p className="font-bold text-ind text-xl sm:text-2xl leading-none">{h.value}</p>
                  <p className="text-gray-500 text-xs sm:text-sm mt-1">{h.label}</p>
                </div>
              ))}
            </div>

            {/* CTA card */}
            <div className="mt-5 bg-ind rounded-2xl p-5 text-white">
              <p className="font-hindi font-bold text-base mb-1">अपना सही Course खोजें!</p>
              <p className="font-hindi text-white/70 text-sm mb-4">
                हमारे Course Finder से अपने लिए best college और course चुनें।
              </p>
              <a
                href="/courses"
                className="inline-flex items-center gap-2 bg-yel text-ind font-bold text-sm px-5 py-2.5 rounded-lg hover:bg-yel/90 transition-colors font-hindi"
              >
                <Search className="w-4 h-4" /> Course Finder खोलें →
              </a>
            </div>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* ══════════════════════════════════════════════
          3. ELIGIBILITY
      ══════════════════════════════════════════════ */}
      <SectionWrapper outerClassName="bg-white" className="py-16 sm:py-20">
        <SectionHeading
          hi="Eligibility Criteria"
          sub="कौन apply कर सकता है? जरूरी requirements देखें"
        />
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              { Icon: ClipboardList, label: 'NEET', val: 'Qualified', sub: 'Mandatory' },
              { Icon: IndianRupee,   label: 'General/OBC', val: '50% PCB', sub: '40% SC/ST' },
              { Icon: Star,          label: 'Age Limit', val: '17–25 yrs', sub: 'As of Dec 31' },
            ].map((item) => (
              <div key={item.label} className="bg-[#F5F5F8] rounded-2xl p-5 text-center border border-bdr">
                <div className="flex justify-center mb-2">
                  <item.Icon className="w-8 h-8 text-ind" aria-hidden="true" />
                </div>
                <p className="font-bold text-ind text-lg leading-none">{item.val}</p>
                <p className="text-gray-500 text-xs mt-1">{item.sub}</p>
                <p className="text-gray-400 text-[10px] mt-0.5 uppercase tracking-wide">{item.label}</p>
              </div>
            ))}
          </div>

          <div className="bg-[#F5F5F8] rounded-2xl border border-bdr p-6">
            <h3 className="font-hindi font-semibold text-ind mb-4 flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-yel" />
              Detailed Eligibility
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-gray-700 font-hindi">
                <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                {data.eligibility.neet}
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-700 font-hindi">
                <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                {data.eligibility.marksGeneral}
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-700 font-hindi">
                <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                {data.eligibility.marksOBC}
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-700 font-hindi">
                <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                {data.eligibility.ageLimit}
              </li>
            </ul>
          </div>
        </div>
      </SectionWrapper>

      {/* ══════════════════════════════════════════════
          4. FEE STRUCTURE
      ══════════════════════════════════════════════ */}
      <SectionWrapper outerClassName="bg-[#F5F5F8]" className="py-16 sm:py-20">
        <SectionHeading
          hi={`${data.nameHi} MBBS — Fees Structure`}
          sub="Transparent breakdown — कोई hidden charges नहीं"
        />
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-bdr overflow-hidden">
            <div className="h-1.5 bg-gradient-to-r from-ind to-pur" />
            <div className="divide-y divide-bdr">
              {data.feeTable.map((row, i) => (
                <div
                  key={row.label}
                  className={`flex items-center justify-between px-6 py-4 ${i === data.feeTable.length - 1 ? 'bg-ind/5' : ''}`}
                >
                  <div>
                    <p className={`text-sm font-hindi ${i === data.feeTable.length - 1 ? 'font-bold text-ind' : 'font-medium text-gray-700'}`}>
                      {row.label}
                    </p>
                    {row.note && <p className="text-[11px] text-gray-400 mt-0.5">{row.note}</p>}
                  </div>
                  <p className={`font-bold ${i === data.feeTable.length - 1 ? 'text-ind text-lg' : 'text-gray-900'}`}>
                    {row.amount}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <p className="text-center text-xs text-gray-400 font-hindi mt-4">{data.feeTotalNote}</p>

          {/* BSCC loan nudge */}
          <div className="mt-6 bg-yel/10 border border-yel/30 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <IndianRupee className="w-8 h-8 text-yel shrink-0" />
            <div>
              <p className="font-hindi font-bold text-ind text-sm">Fees की tension? BSCC Loan लें!</p>
              <p className="font-hindi text-gray-600 text-xs mt-0.5">
                Bihar सरकार की 0% interest loan scheme — up to ₹4 Lakh। CAE free में process करती है।
              </p>
            </div>
            <Link
              href="/bscc-loan"
              className="shrink-0 inline-flex items-center gap-1.5 bg-ind text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-ind/90 transition-colors font-hindi"
            >
              BSCC Loan जानें <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </SectionWrapper>

      {/* ══════════════════════════════════════════════
          5. ADMISSION PROCESS
      ══════════════════════════════════════════════ */}
      <SectionWrapper outerClassName="bg-white" className="py-16 sm:py-20">
        <SectionHeading
          hi="Admission Process"
          sub="6 आसान steps में अपना MBBS abroad का सफर शुरू करें"
        />
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-bdr hidden sm:block" aria-hidden="true" />
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="space-y-5"
            >
              {data.admissionSteps.map((s) => (
                <motion.div
                  key={s.step}
                  variants={fadeInLeft}
                  className="flex gap-4 sm:gap-5 items-start"
                >
                  <div className="shrink-0 w-12 h-12 bg-ind text-white rounded-full flex items-center justify-center font-bold text-base z-10 shadow-md">
                    {s.step}
                  </div>
                  <div className="flex-1 bg-[#F5F5F8] border border-bdr rounded-2xl p-4 sm:p-5">
                    <p className="font-hindi font-semibold text-ind mb-1">{s.title}</p>
                    <p className="text-gray-600 text-sm font-hindi leading-relaxed">{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </SectionWrapper>

      {/* ══════════════════════════════════════════════
          6. DOCUMENTS
      ══════════════════════════════════════════════ */}
      <SectionWrapper outerClassName="bg-[#F5F5F8]" className="py-16 sm:py-20">
        <SectionHeading
          hi="Documents Required"
          sub="पहले से तैयार रखें — process fast होगी"
        />
        <div className="max-w-2xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {data.documents.map((doc, i) => (
              <motion.div
                key={doc}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                transition={{ delay: i * 0.04 }}
                className="flex items-start gap-3 bg-white rounded-xl border border-bdr p-4 shadow-sm"
              >
                <FileText className="w-4 h-4 text-yel shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700 font-hindi">{doc}</span>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-xs text-gray-400 font-hindi mt-5">
            * Document checklist university-wise vary हो सकती है। CAE exact list provide करती है।
          </p>
        </div>
      </SectionWrapper>

      {/* ══════════════════════════════════════════════
          7. BENEFITS
      ══════════════════════════════════════════════ */}
      <SectionWrapper outerClassName="bg-white" className="py-16 sm:py-20">
        <SectionHeading
          hi={`${data.nameHi} में MBBS के फायदे`}
          en="Why This Is a Smart Choice"
        />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {data.benefits.map((b) => (
            <motion.div
              key={b.title}
              variants={scaleIn}
              className="bg-[#F5F5F8] rounded-2xl border border-bdr p-5 hover:shadow-md hover:-translate-y-1 transition-all duration-200"
            >
              <div className="w-10 h-10 bg-ind/10 rounded-xl flex items-center justify-center mb-3">
                <BenefitIcon name={b.icon} />
              </div>
              <p className="font-hindi font-semibold text-ind mb-1">{b.title}</p>
              <p className="text-gray-600 text-sm font-hindi leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </SectionWrapper>

      {/* ══════════════════════════════════════════════
          8. COLLEGE FINDER CTA
      ══════════════════════════════════════════════ */}
      <section className="bg-dk py-16 sm:py-20" aria-label="College finder CTA">
        <div className="mx-auto max-w-brand px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <div className="inline-flex items-center gap-2 bg-white/8 border border-white/15 text-white/70 text-xs font-semibold px-4 py-1.5 rounded-full mb-5">
              <Star className="w-3.5 h-3.5 text-yel" />
              College Finder
            </div>
            <h2 className="font-hindi font-bold text-white text-2xl sm:text-3xl lg:text-4xl mb-4">
              {data.nameHi} में Best MBBS Colleges खोजें
            </h2>
            <p className="font-hindi text-white/55 text-base sm:text-lg max-w-xl mx-auto mb-8">
              CAE के experts आपकी NEET rank, budget, और preference के basis पर {data.name} की best NMC-approved universities recommend करेंगे — बिल्कुल FREE।
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="#counseling"
                whileTap={buttonTap}
                className="inline-flex items-center justify-center gap-2 bg-yel text-dk font-bold px-8 py-3.5 rounded-full text-base hover:bg-yel/90 transition-colors font-hindi shadow-lg shadow-yel/20"
                aria-label="Explore colleges"
              >
                <GraduationCap className="w-5 h-5" />
                Colleges Explore करें →
              </motion.a>
              <motion.a
                href={`tel:${SITE.phone}`}
                whileTap={buttonTap}
                className="inline-flex items-center justify-center gap-2 border border-white/25 text-white font-semibold px-8 py-3.5 rounded-full text-base hover:bg-white/8 transition-colors"
                aria-label={`Call ${SITE.phone}`}
              >
                <Phone className="w-5 h-5" />
                अभी Call करें
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          9. FAQ
      ══════════════════════════════════════════════ */}
      <SectionWrapper outerClassName="bg-[#F5F5F8]" className="py-16 sm:py-20">
        <SectionHeading
          hi="Frequently Asked Questions"
          sub="सबसे ज़्यादा पूछे जाने वाले सवाल — हिंदी में जवाब"
        />
        <div className="max-w-2xl mx-auto space-y-3">
          {data.faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-2xl border border-bdr overflow-hidden shadow-sm">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
                aria-expanded={openFaq === i}
              >
                <span className="flex items-start gap-3 font-hindi font-semibold text-ind text-sm pr-4">
                  <HelpCircle className="w-4 h-4 text-yel shrink-0 mt-0.5" />
                  {faq.q}
                </span>
                {openFaq === i
                  ? <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" />
                  : <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                }
              </button>
              {openFaq === i && (
                <div className="px-5 pb-4">
                  <p className="text-gray-600 text-sm font-hindi leading-relaxed border-t border-bdr pt-3 ml-7">
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* ══════════════════════════════════════════════
          10. FINAL CTA + LEAD FORM
      ══════════════════════════════════════════════ */}
      <SectionWrapper
        id="counseling"
        outerClassName="bg-dk"
        className="py-16 sm:py-20"
        animate={false}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left copy */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="text-white"
          >
            <div className="inline-flex items-center gap-2 bg-white/8 border border-white/15 text-white/70 text-xs font-semibold px-4 py-1.5 rounded-full mb-5">
              <GraduationCap className="w-3.5 h-3.5 text-yel" />
              Free Counseling — आज ही शुरू करें
            </div>
            <h2 className="font-hindi font-bold text-3xl sm:text-4xl mb-4 leading-tight">
              {data.nameHi} में MBBS का
              <span className="text-yel"> सफर शुरू करें</span>
            </h2>
            <p className="font-hindi text-white/55 text-base leading-relaxed mb-8">
              CAE के expert counselors आपकी NEET rank, budget, और goals के basis पर {data.name} की best universities suggest करेंगे। 17+ साल का experience, 10,000+ successful admissions।
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'Free counseling — कोई hidden charges नहीं',
                `${data.name} की best NMC-approved universities`,
                'Visa process में complete support',
                'FMGE/NEXT coaching भी available',
              ].map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-yel shrink-0 mt-0.5" />
                  <span className="text-white/80 text-sm font-hindi">{point}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3">
              <a
                href={`tel:${SITE.phone}`}
                className="inline-flex items-center gap-2 bg-white/8 border border-white/20 text-white text-sm font-semibold px-4 py-2.5 rounded-full hover:bg-white/15 transition-colors"
                aria-label={`Call ${SITE.phone}`}
              >
                <Phone className="w-4 h-4" /> {SITE.phone}
              </a>
              <a
                href={`${SOCIAL.whatsapp}?text=${waMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-wa text-white text-sm font-semibold px-4 py-2.5 rounded-full hover:bg-wa/90 transition-colors font-hindi"
                aria-label="WhatsApp us"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp करें
              </a>
            </div>
          </motion.div>

          {/* Right — lead form */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="w-full max-w-lg mx-auto lg:max-w-none"
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="h-1.5 bg-gradient-to-r from-yel to-amb" />
              <div className="p-6 sm:p-8">
                <h3 className="font-hindi font-bold text-ind text-xl mb-1">
                  Form भरें — 2 घंटे में Call Back!
                </h3>
                <p className="text-gray-400 text-sm mb-5 font-hindi">
                  {data.name} MBBS के बारे में free guidance पाएं।
                </p>
                <LeadForm sourcePage={`study-abroad-${data.slug}`} compact={false} />
              </div>
            </div>
          </motion.div>
        </div>
      </SectionWrapper>
    </>
  )
}
