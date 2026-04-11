'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { fadeInUp, viewportOnce } from '@/lib/animations'

interface SectionWrapperProps {
  children: React.ReactNode
  /** Classes applied to the inner max-w container */
  className?: string
  /** Classes applied to the outer <section> element */
  outerClassName?: string
  id?: string
  /** Whether to apply fadeInUp scroll reveal. Default: true */
  animate?: boolean
}

export default function SectionWrapper({
  children,
  className,
  outerClassName,
  id,
  animate = true,
}: SectionWrapperProps) {
  const inner = (
    <div className={cn('mx-auto max-w-brand px-4 sm:px-6 lg:px-8', className)}>
      {children}
    </div>
  )

  return (
    <section id={id} className={cn('overflow-hidden', outerClassName)}>
      {animate ? (
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          style={{ willChange: 'opacity, transform' }}
        >
          {inner}
        </motion.div>
      ) : (
        inner
      )}
    </section>
  )
}
