'use client'

import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import SectionWrapper from '@/components/shared/SectionWrapper'
import LeadForm from '@/components/forms/LeadForm'
import { fadeInLeft, fadeInRight, viewportOnce } from '@/lib/animations'
import { TAGLINES } from '@/lib/constants'

const TRUST_POINTS = [
  'Free counseling — कोई hidden charges नहीं',
  '17+ years का experience',
  '2 घंटे में call back guarantee',
  'MBBS, Engineering, MBA — सभी courses',
]

export default function CTAFormSection() {
  return (
    <SectionWrapper
      id="counseling"
      outerClassName="bg-dk"
      className="py-16"
      animate={false}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

        {/* Left — copy */}
        <motion.div
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="text-white"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-yel/15 border border-yel/30 rounded-full px-4 py-1.5 text-xs text-yel font-semibold mb-5">
            🎓 Free Counseling
          </div>

          <h2 className="font-hindi font-bold text-3xl sm:text-4xl lg:text-5xl mb-4">
            {TAGLINES.T1.split(' — ')[0]}
            <br />
            <span className="text-yel">— हम करेंगे आसान!</span>
          </h2>

          <p className="font-hindi text-white/65 text-base leading-relaxed mb-8 max-w-md">
            Bihar की सबसे trusted education consultancy से free guidance लें।
            Expert counselors आपको सही college और course चुनने में help करेंगे।
          </p>

          <ul className="space-y-3">
            {TRUST_POINTS.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-yel shrink-0 mt-0.5" />
                <span className="text-white/80 text-sm font-hindi">{point}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Right — form card */}
        <motion.div
          variants={fadeInRight}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="w-full max-w-lg mx-auto lg:max-w-none"
        >
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Accent bar */}
            <div className="h-1.5 bg-gradient-to-r from-yel to-amb" />
            <div className="p-6 sm:p-8">
              <h3 className="font-hindi font-bold text-ind text-xl mb-1">
                अभी Form भरें — Free है! 🎓
              </h3>
              <p className="text-gray-400 text-sm mb-5 font-hindi">
                हमारे experts 2 घंटे में call करेंगे।
              </p>
              <LeadForm sourcePage="cta-section" compact={false} />
            </div>
          </div>
        </motion.div>

      </div>
    </SectionWrapper>
  )
}
