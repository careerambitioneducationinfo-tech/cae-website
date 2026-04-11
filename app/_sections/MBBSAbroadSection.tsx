'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Globe, Mountain, MapPin, Sun, Droplets, Snowflake } from 'lucide-react'
import type { LucideProps } from 'lucide-react'
import SectionWrapper from '@/components/shared/SectionWrapper'
import { staggerSlow, scaleIn, fadeInLeft, fadeInRight, viewportOnce, buttonTap } from '@/lib/animations'
import { MBBS_COUNTRIES, TAGLINES } from '@/lib/constants'

type CountryMeta = { icon: React.ComponentType<LucideProps>; color: string; bg: string }

const COUNTRY_ICONS: Record<string, CountryMeta> = {
  Russia:     { icon: Snowflake, color: '#60a5fa', bg: 'rgba(96,165,250,0.15)' },
  Uzbekistan: { icon: Sun,       color: '#fbbf24', bg: 'rgba(251,191,36,0.15)' },
  Kyrgyzstan: { icon: Mountain,  color: '#34d399', bg: 'rgba(52,211,153,0.15)' },
  Kazakhstan: { icon: MapPin,    color: '#f97316', bg: 'rgba(249,115,22,0.15)' },
  Bangladesh: { icon: Droplets,  color: '#38bdf8', bg: 'rgba(56,189,248,0.15)' },
  Nepal:      { icon: Globe,     color: '#c084fc', bg: 'rgba(192,132,252,0.15)' },
}

const HIGHLIGHTS = [
  'NMC + WHO Approved Universities',
  'End-to-End Support (Visa, Travel, Hostel)',
  'FMGE/NEXT Coaching Included',
  'English Medium Teaching',
]

export default function MBBSAbroadSection() {
  return (
    <SectionWrapper
      id="mbbs"
      outerClassName="bg-dk"
      className="py-16"
      animate={false}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

        {/* Left — Country cards */}
        <motion.div
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          style={{ willChange: 'opacity, transform' }}
        >
          <h2 className="font-hindi font-bold text-white text-3xl sm:text-4xl mb-2">
            MBBS Abroad
          </h2>
          <p className="font-hindi text-white/60 text-base mb-6">
            Affordable medical education — NMC approved universities
          </p>

          <motion.div
            variants={staggerSlow}
            className="grid grid-cols-2 sm:grid-cols-3 gap-3"
          >
            {MBBS_COUNTRIES.map((country) => (
              <motion.div
                key={country.name}
                variants={scaleIn}
                whileHover={{ borderColor: '#FBD207', backgroundColor: 'rgba(255,255,255,0.1)' }}
                className="bg-white/5 border border-white/15 rounded-brand p-4 cursor-pointer transition-colors"
              >
                {(() => {
                  const meta = COUNTRY_ICONS[country.name] ?? { icon: Globe, color: '#94a3b8', bg: 'rgba(148,163,184,0.15)' }
                  const Icon = meta.icon
                  return (
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center mb-2"
                      style={{ background: meta.bg }}
                    >
                      <Icon className="w-5 h-5" style={{ color: meta.color }} />
                    </div>
                  )
                })()}
                <h3 className="text-white font-bold text-sm mb-1">{country.name}</h3>
                <p className="text-yel font-black text-base leading-none">{country.fee}</p>
                <p className="text-white/50 text-xs mt-0.5">{country.duration}</p>
                <span className="inline-block mt-2 bg-green-500/20 text-green-400 text-[10px] px-1.5 py-0.5 rounded font-medium">
                  ✅ NMC Approved
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right — Info */}
        <motion.div
          variants={fadeInRight}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="lg:pt-14"
          style={{ willChange: 'opacity, transform' }}
        >
          <p className="font-hindi text-white/60 text-base mb-1">{TAGLINES.T2_line1}</p>
          <p className="font-hindi text-white font-bold text-xl mb-6">{TAGLINES.T2_line2}</p>

          {/* Highlights */}
          <ul className="space-y-3 mb-8">
            {HIGHLIGHTS.map((h) => (
              <li key={h} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-yel shrink-0 mt-0.5" />
                <span className="text-white/80 text-sm">{h}</span>
              </li>
            ))}
          </ul>

          <motion.a
            href="/study-abroad"
            whileTap={buttonTap}
            className="inline-flex items-center gap-2 bg-yel text-dk font-bold px-7 py-3 rounded-full text-sm hover:bg-yel/90 transition-colors font-hindi"
            aria-label="Learn about MBBS abroad"
          >
            MBBS Abroad जानें →
          </motion.a>
        </motion.div>

      </div>
    </SectionWrapper>
  )
}
