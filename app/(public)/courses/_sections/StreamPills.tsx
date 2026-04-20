'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Cpu, Stethoscope, Briefcase, Scale, Pill, Wheat, HeartPulse } from 'lucide-react'

const STREAMS = [
  { label: 'Engineering', Icon: Cpu,          course: 'B.Tech / Engineering' },
  { label: 'Medical',     Icon: Stethoscope,  course: 'MBBS India' },
  { label: 'Management',  Icon: Briefcase,    course: 'MBA' },
  { label: 'Law',         Icon: Scale,        course: 'LLB' },
  { label: 'Pharmacy',    Icon: Pill,         course: 'B.Pharma' },
  { label: 'Agriculture', Icon: Wheat,        course: 'B.Sc Agriculture' },
  { label: 'Nursing',     Icon: HeartPulse,   course: 'B.Sc Nursing' },
]

export default function StreamPills() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeCourse = searchParams.get('course') ?? ''

  const handleClick = (course: string) => {
    router.push(`/courses?course=${encodeURIComponent(course)}`, { scroll: false })
    setTimeout(() => {
      document.getElementById('course-finder')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x">
      {STREAMS.map((stream) => {
        const isActive = activeCourse === stream.course
        return (
          <motion.button
            key={stream.course}
            onClick={() => handleClick(stream.course)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            aria-label={`Find ${stream.label} colleges`}
            className={`shrink-0 snap-start rounded-full border px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              isActive
                ? 'bg-ind text-white border-ind'
                : 'bg-white border-bdr text-ind hover:bg-ind hover:text-white hover:border-ind'
            }`}
          >
            <stream.Icon size={14} />
            {stream.label}
          </motion.button>
        )
      })}
    </div>
  )
}
