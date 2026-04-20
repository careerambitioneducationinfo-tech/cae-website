'use client'

import { motion } from 'framer-motion'
import AnimatedStat from '@/components/shared/AnimatedStat'
import { staggerContainer, fadeInUp, viewportOnce } from '@/lib/animations'
import { STATS } from '@/lib/constants'

// 6 stats only — even 2-col grid on mobile (3 rows × 2 cols)
const DISPLAY_STATS = STATS.slice(0, 6)

export default function StatsBar() {
  return (
    <section className="bg-ind py-10" aria-label="Key statistics">
      <div className="mx-auto max-w-brand px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6"
        >
          {DISPLAY_STATS.map((stat, i) => {
            // Border logic:
            // Right border: all except last in each row
            //   mobile (2-col): odd indices (0,2,4) get border-r
            //   sm    (3-col): indices not at position 2,5 get border-r
            //   lg    (6-col): all except last get border-r
            // Bottom border: all except last row
            //   mobile: first 4 items (rows 0–1 of 3)
            //   sm:     first 3 items (row 0 of 2)
            //   lg:     none (single row)
            return (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                className={[
                  'py-6 px-2',
                  // right borders
                  i % 2 === 0       ? 'border-r border-white/20' : '',
                  i % 2 !== 0       ? 'sm:border-r sm:border-white/20' : '',
                  i % 3 !== 2       ? 'sm:border-r sm:border-white/20' : 'sm:border-r-0',
                  i !== DISPLAY_STATS.length - 1 ? 'lg:border-r lg:border-white/20' : 'lg:border-r-0',
                  // bottom borders
                  i < 4             ? 'border-b border-white/20' : '',
                  i < 3             ? 'sm:border-b sm:border-white/20' : 'sm:border-b-0',
                  'lg:border-b-0',
                ].join(' ')}
              >
                <AnimatedStat
                  value={stat.value}
                  label={stat.label}
                  labelHi={stat.labelHi}
                />
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
