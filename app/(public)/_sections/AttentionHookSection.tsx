'use client'

import SectionWrapper from '@/components/shared/SectionWrapper'
import { TAGLINES } from '@/lib/constants'

export default function AttentionHookSection() {
  return (
    <SectionWrapper
      outerClassName="bg-dk"
      className="py-16 text-center"
      animate={true}
    >
      <p className="font-hindi text-white/60 text-base font-medium tracking-wide mb-2">
        {TAGLINES.T3_hook}
      </p>
      <h2 className="font-hindi font-black text-yel text-5xl sm:text-6xl md:text-7xl leading-none">
        12<sup className="text-[0.45em] align-super">वीं</sup> के बाद क्या ?
      </h2>
      <p className="text-white/60 mt-5 max-w-xl mx-auto text-base leading-relaxed font-hindi">
        Engineering, MBBS, MBA, Law — हर field में CAE आपको guide करेगा।
        बिल्कुल Free!
      </p>
      <a
        href="#courses"
        className="inline-flex items-center gap-2 mt-7 bg-yel text-dk font-bold px-8 py-3 rounded-full text-sm hover:bg-yel/90 transition-colors font-hindi"
        aria-label="Explore courses"
      >
        College खोजें →
      </a>
    </SectionWrapper>
  )
}
