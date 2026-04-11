'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Laptop, Stethoscope, Plane, Briefcase,
  Scale, Leaf, Pill, Heart,
  CreditCard, BookOpen,
} from 'lucide-react'
import SectionWrapper from '@/components/shared/SectionWrapper'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { staggerContainer, scaleIn, cardHover } from '@/lib/animations'

interface CourseCard {
  name: string
  category: 'Engineering' | 'Medical' | 'Management' | 'Other'
  icon: React.ElementType
  fee: string
  duration: string
  highlight?: string
}

const COURSES: CourseCard[] = [
  { name: 'B.Tech / Engineering', category: 'Engineering', icon: Laptop, fee: '₹3–12L/yr', duration: '4 Years' },
  { name: 'MBBS India', category: 'Medical', icon: Stethoscope, fee: '₹5–20L/yr', duration: '5.5 Years' },
  { name: 'MBBS Abroad', category: 'Medical', icon: Plane, fee: '₹3–7L/yr', duration: '6 Years', highlight: 'NMC ✅' },
  { name: 'MBA', category: 'Management', icon: Briefcase, fee: '₹2–8L/yr', duration: '2 Years' },
  { name: 'BBA', category: 'Management', icon: BookOpen, fee: '₹1–3L/yr', duration: '3 Years' },
  { name: 'BCA / MCA', category: 'Engineering', icon: Laptop, fee: '₹1–3L/yr', duration: '3 Years' },
  { name: 'BAMS / BDS', category: 'Medical', icon: Stethoscope, fee: '₹3–8L/yr', duration: '5 Years' },
  { name: 'B.Pharma', category: 'Medical', icon: Pill, fee: '₹1–4L/yr', duration: '4 Years' },
  { name: 'B.Sc Nursing', category: 'Medical', icon: Heart, fee: '₹1–3L/yr', duration: '4 Years' },
  { name: 'B.Sc Agriculture', category: 'Other', icon: Leaf, fee: '₹50K–2L/yr', duration: '4 Years' },
  { name: 'LLB', category: 'Other', icon: Scale, fee: '₹1–3L/yr', duration: '3–5 Years' },
  { name: 'BSCC Loan', category: 'Other', icon: CreditCard, fee: '₹4L total', duration: '0% Interest', highlight: 'Bihar Govt' },
]

const TABS = ['All', 'Engineering', 'Medical', 'Management', 'Other'] as const
type TabType = (typeof TABS)[number]

export default function CoursesSection() {
  const [activeTab, setActiveTab] = useState<TabType>('All')

  const filtered = activeTab === 'All'
    ? COURSES
    : COURSES.filter((c) => c.category === activeTab)

  return (
    <SectionWrapper
      id="courses"
      outerClassName="bg-[#F5F5F8]"
      className="py-16"
      animate={false}
    >
      {/* Header */}
      <div className="text-center mb-8">
        <span className="inline-block bg-il text-ind text-xs font-semibold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
          हमारे Courses
        </span>
        <h2 className="font-hindi font-bold text-ind text-3xl sm:text-4xl mb-3">
          कौन सा Course सही है आपके लिए?
        </h2>
        <p className="text-gray-500 text-base font-hindi">
          12th के बाद सभी major courses में expert guidance।
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center mb-8">
        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as TabType)}
          className="w-auto"
        >
          <TabsList className="flex gap-2 bg-transparent h-auto flex-wrap justify-center p-0">
            {TABS.map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="px-4 py-2 text-sm rounded-full border border-bdr bg-white data-active:bg-ind data-active:text-white data-active:border-ind hover:border-ind/40 transition-all h-auto"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Course cards grid */}
      <AnimatePresence>
        <motion.div
          key={activeTab}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
        >
          {filtered.map((course) => (
            <motion.a
              key={course.name}
              href="/courses"
              variants={scaleIn}
              whileHover={cardHover.hover}
              whileTap={{ scale: 0.97 }}
              className="bg-white rounded-brand p-4 shadow-sm border border-gray-100 cursor-pointer block group"
              aria-label={course.name}
            >
              <div className="w-10 h-10 bg-il rounded-lg flex items-center justify-center mb-3">
                <course.icon className="w-5 h-5 text-ind" />
              </div>
              <h3 className="font-semibold text-ind text-sm leading-tight mb-1">{course.name}</h3>
              <p className="text-gray-400 text-xs">{course.fee}</p>
              <p className="text-gray-400 text-xs">{course.duration}</p>
              {course.highlight && (
                <span className="inline-block mt-2 bg-green-50 text-green-700 text-[11px] px-2 py-0.5 rounded-full font-medium">
                  {course.highlight}
                </span>
              )}
            </motion.a>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* CTA */}
      <div className="text-center mt-8">
        <a
          href="/courses"
          className="inline-flex items-center gap-2 bg-ind text-white font-semibold px-8 py-3 rounded-full text-sm hover:bg-ind/90 transition-colors font-hindi"
          aria-label="View all courses"
        >
          सभी Courses देखें →
        </a>
      </div>
    </SectionWrapper>
  )
}
