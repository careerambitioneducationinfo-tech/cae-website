'use client'

import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import SectionWrapper from '@/components/shared/SectionWrapper'
import { staggerSlow, scaleIn, fadeInLeft, fadeInRight, viewportOnce, buttonTap } from '@/lib/animations'
import { MBBS_COUNTRIES, TAGLINES } from '@/lib/constants'

const COUNTRY_FLAGS: Record<string, string> = {
  Russia:     '🇷🇺',
  Uzbekistan: '🇺🇿',
  Kyrgyzstan: '🇰🇬',
  Kazakhstan: '🇰🇿',
  Bangladesh: '🇧🇩',
  Nepal:      '🇳🇵',
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
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-2 bg-white/10 text-2xl">
                  {COUNTRY_FLAGS[country.name] ?? '🌍'}
                </div>
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
