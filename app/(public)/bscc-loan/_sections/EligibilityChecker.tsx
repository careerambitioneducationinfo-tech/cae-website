'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, BookOpen, GraduationCap, Clock, CheckCircle, FileText } from 'lucide-react'
import { scaleIn, viewportOnce } from '@/lib/animations'
import { ELIGIBILITY } from '@/lib/bsccData'

const ICONS = {
  domicile:  MapPin,
  class12:   BookOpen,
  admission: GraduationCap,
  age:       Clock,
  noother:   CheckCircle,
  income:    FileText,
} as const

export default function EligibilityChecker() {
  const [checked, setChecked] = useState<Set<string>>(new Set())
  const count = checked.size
  const total = ELIGIBILITY.length

  const toggle = (id: string) => {
    setChecked((prev) => {
      const next = new Set(prev)
      if (next.has(id)) { next.delete(id) } else { next.add(id) }
      return next
    })
  }

  const progressPct = (count / total) * 100

  const statusColor =
    count === total ? 'bg-emerald-500' :
    count >= 4      ? 'bg-amb' :
    'bg-ind'

  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="bg-white rounded-2xl border border-bdr shadow-sm p-6 sm:p-8 max-w-2xl mx-auto"
    >
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-mu uppercase tracking-wider">
            Eligibility Progress
          </span>
          <span className="text-xs font-bold text-ind">{count}/{total} criteria</span>
        </div>
        <div className="h-2.5 bg-[#eeedf8] rounded-full overflow-hidden">
          <motion.div
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={`h-full rounded-full ${statusColor}`}
          />
        </div>
      </div>

      {/* Criteria list */}
      <ul className="space-y-3 mb-6">
        {ELIGIBILITY.map((item) => {
          const Icon = ICONS[item.id as keyof typeof ICONS]
          const isChecked = checked.has(item.id)
          return (
            <li key={item.id}>
              <label
                className={[
                  'flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-colors border',
                  isChecked
                    ? 'bg-[#eeedf8] border-ind/30'
                    : 'bg-[#F5F5F8] border-transparent hover:border-bdr',
                ].join(' ')}
              >
                {/* Native checkbox hidden, custom style */}
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={isChecked}
                  onChange={() => toggle(item.id)}
                  aria-label={item.label}
                />
                {/* Custom checkbox box */}
                <span
                  className={[
                    'shrink-0 mt-0.5 w-5 h-5 rounded flex items-center justify-center border-2 transition-colors',
                    isChecked
                      ? 'bg-ind border-ind'
                      : 'border-gray-300 bg-white',
                  ].join(' ')}
                  aria-hidden="true"
                >
                  {isChecked && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 12 12">
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>

                <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${isChecked ? 'text-ind' : 'text-mu'}`} />

                <div>
                  <p className={`text-sm font-semibold leading-tight ${isChecked ? 'text-ind' : 'text-gray-700'}`}>
                    {item.label}
                  </p>
                  <p className="text-xs text-mu mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
              </label>
            </li>
          )
        })}
      </ul>

      {/* Status message */}
      <AnimatePresence mode="wait">
        {count === total ? (
          <motion.div
            key="success"
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-[#E1F5EE] border border-green-200 rounded-xl p-5 text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              <p className="font-hindi font-bold text-emerald-700 text-base">
                आप BSCC के लिए Eligible हैं!
              </p>
            </div>
            <p className="font-hindi text-emerald-600 text-sm mb-4">
              CAE free में आपकी complete application process handle करेगा। अभी apply करें!
            </p>
            <motion.a
              href="#apply-now"
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 bg-ind text-white font-bold text-sm px-6 py-2.5 rounded-xl font-hindi"
            >
              Free में Apply करवाएं →
            </motion.a>
          </motion.div>
        ) : count >= 4 ? (
          <motion.div
            key="almost"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-3"
          >
            <p className="font-hindi text-amb font-semibold text-sm">
              Almost eligible! Last {total - count} criteria बाकी हैं।
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="neutral"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-3"
          >
            <p className="text-mu text-sm">
              और criteria check करें →
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
