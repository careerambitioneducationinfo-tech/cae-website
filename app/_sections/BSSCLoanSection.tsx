'use client'

import { motion } from 'framer-motion'
import SectionWrapper from '@/components/shared/SectionWrapper'
import type { Variants } from 'framer-motion'
import { staggerContainer, fadeInLeft, fadeInRight, viewportOnce, buttonTap } from '@/lib/animations'

const stepVariant: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
}
import { BSCC, TAGLINES } from '@/lib/constants'

const LOAN_FACTS = [
  { value: BSCC.maxAmount, label: 'Loan Amount' },
  { value: BSCC.interest, label: 'Interest Rate' },
  { value: BSCC.loansProcessed, label: 'Loans Processed' },
  { value: BSCC.approvalRate, label: 'Approval Rate' },
]

const STEPS = [
  { num: '01', title: 'Free Eligibility Check', desc: 'Online form भरें या office आएं' },
  { num: '02', title: 'Documents Submit', desc: 'Marksheet, Aadhaar, Bank details' },
  { num: '03', title: 'Verification', desc: '3–5 working days में verify होगा' },
  { num: '04', title: 'Amount Disbursed ✅', desc: 'Directly college account में — 10–15 days' },
]

export default function BSSCLoanSection() {
  return (
    <SectionWrapper
      id="bscc"
      className="py-16"
      animate={false}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

        {/* Left — Key facts */}
        <motion.div
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          style={{ willChange: 'opacity, transform' }}
        >
          <h2 className="font-hindi font-black text-ind text-3xl sm:text-4xl mb-2">
            {TAGLINES.T4.split('जब')[0]}
            <br />
            <span className="text-yel">जब DRCC है साथ में!</span>
          </h2>
          <p className="font-hindi text-gray-500 text-base mb-7 max-w-md">
            Bihar Student Credit Card Scheme — सरकार देती है 0% interest पर education loan।
            CAE free में सारी process handle करता है।
          </p>

          {/* Key fact cards */}
          <div className="grid grid-cols-2 gap-3">
            {LOAN_FACTS.map((fact) => (
              <div
                key={fact.label}
                className="bg-white rounded-brand p-4 border-l-4 border-ind shadow-sm"
              >
                <p className="font-black text-ind text-xl sm:text-2xl leading-none">{fact.value}</p>
                <p className="text-gray-500 text-xs mt-1">{fact.label}</p>
              </div>
            ))}
          </div>

          <motion.a
            href="/bscc-loan"
            whileTap={buttonTap}
            className="inline-flex items-center gap-2 mt-7 bg-ind text-white font-bold px-7 py-3 rounded-full text-sm hover:bg-ind/90 transition-colors font-hindi"
            aria-label="BSCC loan details"
          >
            BSCC Loan जानें →
          </motion.a>
        </motion.div>

        {/* Right — 4-step process */}
        <motion.div
          variants={fadeInRight}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          style={{ willChange: 'opacity, transform' }}
        >
          <h3 className="font-hindi font-bold text-ind text-2xl mb-6">
            Loan मिलने के 4 आसान Steps:
          </h3>

          <motion.div
            variants={staggerContainer}
            className="space-y-4"
          >
            {STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                variants={stepVariant}
                custom={i}
                whileHover={{ x: 4 }}
                className="flex gap-4 items-start group cursor-default"
              >
                {/* Step number + connector */}
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-ind text-white font-black text-sm flex items-center justify-center shrink-0 group-hover:bg-yel group-hover:text-dk transition-colors">
                    {step.num}
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className="w-0.5 h-5 bg-ind/20 mt-1" />
                  )}
                </div>
                <div className="pt-1">
                  <h4 className="font-semibold text-ind text-sm">{step.title}</h4>
                  <p className="text-gray-500 text-xs mt-0.5 font-hindi">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

      </div>
    </SectionWrapper>
  )
}
