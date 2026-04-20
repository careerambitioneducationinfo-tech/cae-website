'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowRight, CheckCircle, GraduationCap, Phone, MessageCircle,
  ClipboardList, Stethoscope, IndianRupee, BadgeCheck,
  type LucideIcon,
} from 'lucide-react'
import SectionWrapper from '@/components/shared/SectionWrapper'
import LeadForm from '@/components/forms/LeadForm'
import {
  fadeInUp, fadeInLeft, fadeInRight,
  staggerContainer, scaleIn, viewportOnce, buttonTap,
} from '@/lib/animations'
import { SITE } from '@/lib/constants'
import { ABROAD_COUNTRIES } from '@/lib/abroadData'

const WHY_CAE: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: GraduationCap,  title: 'Expert Guidance',     desc: '17+ साल का experience — सही university सही budget में।' },
  { icon: ClipboardList,  title: 'End-to-End Support',  desc: 'Application, documents, visa, travel — सब CAE handle करती है।' },
  { icon: Stethoscope,    title: 'FMGE Coaching',       desc: 'MBBS के बाद India return पर FMGE/NEXT coaching भी available।' },
  { icon: IndianRupee,    title: 'BSCC Loan Help',      desc: 'Bihar सरकार की 0% loan scheme — CAE free में process करती है।' },
  { icon: BadgeCheck,     title: 'NMC Approved Only',   desc: 'हम सिर्फ NMC और WHO approved universities में admission दिलाते हैं।' },
  { icon: Phone,          title: '24/7 Support',        desc: 'Emergency में भी CAE team available — parents को peace of mind।' },
]

const COMPARISON = [
  { feature: 'Total Cost (MBBS)', india: '₹50–1.5 Crore', abroad: '₹20–40 Lakh' },
  { feature: 'Donation / Capitation', india: 'हाँ, often lakhs', abroad: 'नहीं' },
  { feature: 'NMC Recognition', india: 'Yes', abroad: 'Yes (approved univ.)' },
  { feature: 'Medium of Instruction', india: 'English', abroad: 'English' },
  { feature: 'NEET Requirement', india: 'High cutoff', abroad: 'Qualify enough' },
  { feature: 'Duration', india: '5.5 Years', abroad: '6 Years' },
]

export default function StudyAbroadContent() {
  const waMsg = encodeURIComponent('Namaste! मैं MBBS Abroad के बारे में जानकारी चाहता/चाहती हूँ।')

  return (
    <>
      {/* ── HERO — matches homepage bg-dk style ── */}
      <section
        className="relative min-h-[80vh] sm:min-h-[85vh] flex items-center overflow-hidden bg-dk"
        aria-label="MBBS Abroad hero"
      >
        {/* Subtle glow — same as homepage */}
        <div
          className="absolute top-0 left-1/4 w-[600px] h-[300px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(100,74,158,0.18) 0%, transparent 70%)' }}
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-brand px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-3xl">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 bg-white/8 backdrop-blur-sm border border-white/15 text-white/80 text-xs font-semibold px-4 py-1.5 rounded-full mb-6"
            >
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              MBBS Abroad — NMC Approved Destinations
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.08 }}
              className="font-hindi font-bold text-white leading-tight mb-4"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
            >
              विदेश में MBBS करें —
              <span className="text-yel"> India से कम खर्च में!</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.12 }}
              className="text-white/55 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl font-hindi"
            >
              Russia, Kyrgyzstan, Kazakhstan, और Uzbekistan में NMC approved universities से MBBS करें।
              English medium, affordable fees, और India में valid degree — CAE की free guidance के साथ।
            </motion.p>

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.16 }}
              className="flex flex-wrap gap-3"
            >
              <motion.a
                href="#countries"
                whileTap={buttonTap}
                className="inline-flex items-center gap-2 bg-yel text-dk font-bold px-7 py-3.5 rounded-full text-sm sm:text-base hover:bg-yel/90 transition-colors font-hindi shadow-lg shadow-yel/20"
              >
                <GraduationCap className="w-4 h-4" />
                Destination देखें →
              </motion.a>
              <motion.a
                href={`tel:${SITE.phone}`}
                whileTap={buttonTap}
                className="inline-flex items-center gap-2 border border-white/25 text-white font-semibold px-7 py-3.5 rounded-full text-sm hover:bg-white/8 transition-colors"
              >
                <Phone className="w-4 h-4" />
                अभी Call करें
              </motion.a>
              <motion.a
                href={`https://wa.me/${SITE.whatsapp}?text=${waMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                whileTap={buttonTap}
                className="inline-flex items-center gap-2 bg-wa text-white font-semibold px-6 py-3 rounded-full text-sm hover:bg-wa/90 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp करें
              </motion.a>
            </motion.div>
          </div>
        </div>

      </section>

      {/* ── COUNTRY CARDS ── */}
      <SectionWrapper id="countries" outerClassName="bg-[#F5F5F8]" className="py-16 sm:py-20">
        <div className="text-center mb-10">
          <h2 className="font-hindi font-bold text-2xl sm:text-3xl lg:text-4xl text-ind">
            MBBS Abroad के Top Destinations
          </h2>
          <p className="mt-3 text-gray-500 text-sm sm:text-base max-w-xl mx-auto font-hindi">
            सभी NMC और WHO approved। English medium। Affordable fees। CAE की complete guidance।
          </p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5"
        >
          {ABROAD_COUNTRIES.map((country) => (
            <motion.div key={country.slug} variants={scaleIn}>
              <Link
                href={`/study-abroad/${country.slug}`}
                className="group flex flex-col bg-white rounded-2xl border border-bdr shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 overflow-hidden h-full"
                aria-label={`Learn about MBBS in ${country.name}`}
              >
                {/* Card header */}
                <div className="bg-gradient-to-br from-ind to-[#3d2f8f] p-5 text-white">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-4xl" role="img" aria-label={`${country.name} flag`}>{country.flag}</span>
                    <div>
                      <p className="font-bold text-base leading-tight">{country.name}</p>
                      <p className="font-hindi text-white/70 text-xs">{country.nameHi}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {country.recognition.slice(0, 2).map((r) => (
                      <span key={r} className="text-[10px] bg-white/15 border border-white/20 text-white/80 px-2 py-0.5 rounded-full">
                        ✓ {r}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card body */}
                <div className="flex-1 p-5 space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[#F5F5F8] rounded-xl p-3 text-center">
                      <p className="font-bold text-ind text-base">{country.totalFee}</p>
                      <p className="text-gray-400 text-[10px] mt-0.5">Total Cost</p>
                    </div>
                    <div className="bg-[#F5F5F8] rounded-xl p-3 text-center">
                      <p className="font-bold text-ind text-base">{country.duration}</p>
                      <p className="text-gray-400 text-[10px] mt-0.5">Duration</p>
                    </div>
                  </div>

                  <p className="text-gray-600 text-xs font-hindi leading-relaxed line-clamp-3">
                    {country.heroSubtitle}
                  </p>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs text-gray-400 font-hindi">English Medium</span>
                    <span className="inline-flex items-center gap-1 text-ind text-xs font-semibold group-hover:gap-2 transition-all">
                      Details देखें <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </SectionWrapper>

      {/* ── INDIA vs ABROAD COMPARISON ── */}
      <SectionWrapper outerClassName="bg-white" className="py-16 sm:py-20">
        <div className="text-center mb-10">
          <h2 className="font-hindi font-bold text-2xl sm:text-3xl text-ind">
            India Private MBBS vs MBBS Abroad
          </h2>
          <p className="mt-3 text-gray-500 text-sm max-w-xl mx-auto font-hindi">
            एक honest comparison — आप खुद decide करें
          </p>
        </div>
        <div className="max-w-2xl mx-auto overflow-hidden rounded-2xl border border-bdr shadow-sm">
          {/* Header */}
          <div className="grid grid-cols-3 bg-ind text-white text-xs sm:text-sm font-semibold">
            <div className="p-4">Feature</div>
            <div className="p-4 text-center border-x border-white/20">India Private</div>
            <div className="p-4 text-center text-yel">MBBS Abroad ✓</div>
          </div>
          {/* Rows */}
          {COMPARISON.map((row, i) => (
            <div
              key={row.feature}
              className={`grid grid-cols-3 text-xs sm:text-sm ${i % 2 === 0 ? 'bg-[#F5F5F8]' : 'bg-white'}`}
            >
              <div className="p-4 font-hindi font-medium text-gray-700">{row.feature}</div>
              <div className="p-4 text-center text-gray-500 border-x border-bdr font-hindi">{row.india}</div>
              <div className="p-4 text-center font-semibold text-ind font-hindi">{row.abroad}</div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* ── WHY CAE ── */}
      <SectionWrapper outerClassName="bg-[#F5F5F8]" className="py-16 sm:py-20">
        <div className="text-center mb-10">
          <h2 className="font-hindi font-bold text-2xl sm:text-3xl text-ind">
            CAE के साथ MBBS Abroad क्यों?
          </h2>
          <p className="mt-3 text-gray-500 text-sm max-w-xl mx-auto font-hindi">
            17+ साल का experience — 10,000+ students की success story
          </p>
        </div>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {WHY_CAE.map((item) => (
            <motion.div
              key={item.title}
              variants={scaleIn}
              className="bg-white rounded-2xl border border-bdr p-5 hover:shadow-md hover:-translate-y-1 transition-all duration-200"
            >
              <div className="w-10 h-10 bg-ind/10 rounded-xl flex items-center justify-center mb-3">
                <item.icon className="w-6 h-6 text-ind" aria-hidden="true" />
              </div>
              <p className="font-hindi font-semibold text-ind mb-1">{item.title}</p>
              <p className="text-gray-600 text-sm font-hindi">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </SectionWrapper>

      {/* ── CTA BANNER ── */}
      <section className="bg-dk py-14 sm:py-16" aria-label="CTA banner">
        <div className="mx-auto max-w-brand px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="flex flex-col lg:flex-row items-center justify-between gap-6"
          >
            <div className="text-white text-center lg:text-left">
              <p className="font-hindi font-bold text-2xl sm:text-3xl mb-2">
                MBBS Abroad की journey आज शुरू करें!
              </p>
              <p className="font-hindi text-white/70 text-base">
                Free counseling लें — NEET score, budget, और preference share करें।
              </p>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              <motion.a
                href="#counseling"
                whileTap={buttonTap}
                className="inline-flex items-center gap-2 bg-yel text-dk font-bold px-7 py-3 rounded-full text-sm hover:bg-yel/90 transition-colors font-hindi whitespace-nowrap shadow-lg shadow-yel/20"
              >
                <GraduationCap className="w-4 h-4" />
                Free Counseling लें
              </motion.a>
              <motion.a
                href={`tel:${SITE.phone}`}
                whileTap={buttonTap}
                className="inline-flex items-center gap-2 border border-white/25 text-white font-semibold px-7 py-3 rounded-full text-sm hover:bg-white/8 transition-colors whitespace-nowrap"
              >
                <Phone className="w-4 h-4" />
                {SITE.phone}
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── LEAD FORM ── */}
      <SectionWrapper
        id="counseling"
        outerClassName="bg-dk"
        className="py-16 sm:py-20"
        animate={false}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="text-white"
          >
            <span className="inline-flex items-center gap-2 bg-yel/15 border border-yel/30 text-yel text-xs font-semibold px-4 py-1.5 rounded-full mb-5">
              🎓 Free Counseling
            </span>
            <h2 className="font-hindi font-bold text-3xl sm:text-4xl mb-4 leading-tight">
              अभी Form भरें —
              <span className="text-yel"> Expert आपको Call करेगा!</span>
            </h2>
            <p className="font-hindi text-white/65 text-base leading-relaxed mb-6">
              MBBS Abroad का सपना है? CAE के experts आपकी NEET rank और budget के basis पर best destination और university suggest करेंगे। 2 घंटे में call back guarantee।
            </p>
            <ul className="space-y-3">
              {[
                '100% Free consultation — कोई charges नहीं',
                'All 4 countries में best university matching',
                'Visa, documents, travel — complete support',
                'FMGE/NEXT coaching — India return के बाद',
              ].map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-yel shrink-0 mt-0.5" />
                  <span className="text-white/80 text-sm font-hindi">{p}</span>
                </li>
              ))}
            </ul>
          </motion.div>

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
                  MBBS Abroad Counseling Book करें 🌍
                </h3>
                <p className="text-gray-400 text-sm mb-5 font-hindi">
                  हमारे experts 2 घंटे में call करेंगे।
                </p>
                <LeadForm sourcePage="study-abroad-index" compact={false} />
              </div>
            </div>
          </motion.div>
        </div>
      </SectionWrapper>
    </>
  )
}
