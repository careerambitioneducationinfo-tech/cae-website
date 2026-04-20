'use client'

import { motion } from 'framer-motion'
import SectionWrapper from '@/components/shared/SectionWrapper'
import { staggerContainer, fadeInUp, viewportOnce } from '@/lib/animations'

interface Testimonial {
  name: string
  city: string
  course: string
  college: string
  quote: string
  initials: string
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Rahul Kumar',
    city: 'Motihari',
    course: 'B.Tech',
    college: 'NIT Patna',
    initials: 'RK',
    quote: 'CAE की guidance से मुझे NIT Patna में admission मिला। Counselors बहुत helpful थे। हर step पर support मिला।',
  },
  {
    name: 'Priya Singh',
    city: 'Bettiah',
    course: 'MBBS',
    college: 'Tashkent, Uzbekistan',
    initials: 'PS',
    quote: 'MBBS Abroad के लिए CAE ने सब कुछ handle किया — visa, college, accommodation। Fees भी बहुत reasonable थी।',
  },
  {
    name: 'Amit Mahato',
    city: 'Muzaffarpur',
    course: 'MBA + BSCC Loan',
    college: 'LPU Punjab',
    initials: 'AM',
    quote: 'BSCC loan के बारे में CAE ने detail में बताया। Sirf 12 din mein loan mil gaya। Bilkul free service!',
  },
]

const Stars = () => (
  <div className="flex gap-0.5 mb-3" aria-label="5 star rating">
    {[...Array(5)].map((_, i) => (
      <span key={i} className="text-amb text-base">★</span>
    ))}
  </div>
)

export default function TestimonialsSection() {
  return (
    <SectionWrapper
      className="py-16"
      animate={false}
    >
      <div className="text-center mb-10">
        <span className="inline-block bg-il text-ind text-xs font-semibold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
          Testimonials
        </span>
        <h2 className="font-hindi font-bold text-ind text-3xl sm:text-4xl">
          हमारे Students क्या कहते हैं?
        </h2>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid grid-cols-1 sm:grid-cols-3 gap-5"
      >
        {TESTIMONIALS.map((t) => (
          <motion.div
            key={t.name}
            variants={fadeInUp}
            className="bg-white rounded-brand p-6 shadow-sm border border-gray-100 flex flex-col"
          >
            <Stars />
            <blockquote className="font-hindi text-gray-600 text-sm leading-relaxed italic flex-1 mb-4">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full bg-ind text-white font-bold text-sm flex items-center justify-center shrink-0"
                aria-hidden="true"
              >
                {t.initials}
              </div>
              <div>
                <p className="font-semibold text-ind text-sm">{t.name}</p>
                <p className="text-gray-400 text-xs">{t.course} · {t.college}</p>
                <p className="text-gray-400 text-xs">{t.city}, Bihar</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  )
}
