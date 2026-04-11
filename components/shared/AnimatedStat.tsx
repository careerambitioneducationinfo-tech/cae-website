'use client'

import { useRef, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useInView } from 'framer-motion'
import { counterSpring } from '@/lib/animations'

interface AnimatedStatProps {
  /** e.g. "10,000+" | "90%+" | "17+" | "20" */
  value: string
  label: string
  labelHi: string
}

/** Parses a stat string like "10,000+" into { num: 10000, suffix: "+" } */
function parseStat(value: string): { num: number; suffix: string } {
  // Match leading digits (possibly with commas), then capture the rest as suffix
  const match = value.match(/^([\d,]+)(.*)$/)
  if (!match) return { num: 0, suffix: value }
  const num = parseInt(match[1].replace(/,/g, ''), 10)
  const suffix = match[2] ?? ''
  return { num, suffix }
}

export default function AnimatedStat({ value, label, labelHi }: AnimatedStatProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const { num, suffix } = parseStat(value)

  const mv = useMotionValue(0)
  const spring = useSpring(mv, counterSpring)
  const display = useTransform(spring, (v) => {
    const rounded = Math.round(v)
    // Format with commas for thousands
    return rounded >= 1000
      ? rounded.toLocaleString('en-IN')
      : String(rounded)
  })

  useEffect(() => {
    if (isInView) mv.set(num)
  }, [isInView, mv, num])

  return (
    <div ref={ref} className="flex flex-col items-center text-center px-4 py-2">
      <div className="text-2xl sm:text-3xl font-black text-white leading-none">
        <motion.span>{display}</motion.span>
        <span>{suffix}</span>
      </div>
      <p className="font-hindi text-white/70 text-xs mt-1 leading-tight">{labelHi}</p>
      <p className="text-white/50 text-[11px] leading-tight hidden sm:block">{label}</p>
    </div>
  )
}
