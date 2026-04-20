'use client'

import { motion } from 'framer-motion'
import { Phone, MessageCircle } from 'lucide-react'
import SectionWrapper from '@/components/shared/SectionWrapper'
import { scaleIn, staggerContainer, buttonTap, viewportOnce } from '@/lib/animations'
import { TAGLINES, SITE, SOCIAL } from '@/lib/constants'

export default function FinalCTABanner() {
  return (
    <SectionWrapper
      outerClassName="bg-gradient-to-r from-ind to-pur"
      className="py-16 text-center"
      animate={false}
    >
      <motion.h2
        variants={scaleIn}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="font-hindi font-black text-white text-3xl sm:text-5xl mb-3"
      >
        आज ही Free Counseling लें!
      </motion.h2>

      <p className="font-hindi text-white/70 text-base mb-2 max-w-xl mx-auto">
        {TAGLINES.T2_line2}
      </p>
      <p className="text-white/50 text-sm mb-8">
        Free counseling · Expert guidance · 17+ years experience
      </p>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="flex flex-col sm:flex-row items-center justify-center gap-3"
      >
        <motion.a
          href="#hero-form"
          variants={scaleIn}
          whileTap={buttonTap}
          className="inline-flex items-center gap-2 bg-yel text-dk font-bold px-7 py-3 rounded-full text-sm hover:bg-yel/90 transition-colors font-hindi"
          aria-label="Free counseling form"
        >
          🎓 Free Counseling बुक करें
        </motion.a>

        <motion.a
          href={SOCIAL.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          variants={scaleIn}
          whileTap={buttonTap}
          className="inline-flex items-center gap-2 bg-wa text-white font-bold px-7 py-3 rounded-full text-sm hover:bg-wa/90 transition-colors font-hindi"
          aria-label="WhatsApp us"
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp करें
        </motion.a>

        <motion.a
          href={`tel:${SITE.phone}`}
          variants={scaleIn}
          whileTap={buttonTap}
          className="inline-flex items-center gap-2 border-2 border-white/50 text-white font-bold px-7 py-3 rounded-full text-sm hover:bg-white/10 transition-colors"
          aria-label={`Call ${SITE.phone}`}
        >
          <Phone className="w-4 h-4" />
          {SITE.phone}
        </motion.a>
      </motion.div>
    </SectionWrapper>
  )
}
