'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Cpu,
  Stethoscope,
  Briefcase,
  Scale,
  Wheat,
  HeartPulse,
  Pill,
  GraduationCap,
  MapPin,
  Ticket,
  Clock,
  DollarSign,
  Target,
  CheckCircle,
  Users,
} from 'lucide-react'
import SectionWrapper from '@/components/shared/SectionWrapper'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { BSCC } from '@/lib/constants'
import { COLLEGES, type College } from '@/lib/collegeData'

// Featured (high priority) colleges appear first in default grid
const SORTED_COLLEGES = [...COLLEGES].sort((a, b) => {
  if (a.featured === b.featured) return 0
  return a.featured ? -1 : 1
})
import {
  fadeInUp,
  fadeInRight,
  staggerContainer,
  scaleIn,
  viewportOnce,
} from '@/lib/animations'
import CourseFinder from './_sections/CourseFinder'
import StreamPills from './_sections/StreamPills'

// ─── Hero right panel: slides ─────────────────────────────────────────────

const HERO_SLIDES = [
  {
    id: 0,
    image: '/icons/allcourses.png',
    alt: 'All courses available at Career Ambition Education',
  },
  {
    id: 1,
    image: '/icons/drcc_scheme.png',
    alt: 'DRCC BSCC loan scheme — Bihar government 0% interest loan',
  },
]

const slideVariants = {
  enter:  { x: '100%', opacity: 0 },
  center: { x: 0, opacity: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit:   { x: '-80%', opacity: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
}

// ─── College logos for marquee ────────────────────────────────────────────

const COLLEGE_LOGOS = [
  { src: '/icons/gniot.png',        name: 'GNIOT' },
  { src: '/icons/srm.png',          name: 'SRM University' },
  { src: '/icons/amity.png',        name: 'Amity University' },
  { src: '/icons/chandigarhni.png', name: 'Chandigarh University' },
  { src: '/icons/iimt.png',         name: 'IIMT' },
  { src: '/icons/jain.png',         name: 'Jain University' },
  { src: '/icons/kalinga.png',      name: 'Kalinga University' },
  { src: '/icons/bennetuni.png',    name: 'Bennett University' },
  { src: '/icons/parul.png',        name: 'Parul University' },
  { src: '/icons/shardha uni.png',  name: 'Sharda University' },
]
// Duplicate for seamless loop
const LOGO_MARQUEE = [...COLLEGE_LOGOS, ...COLLEGE_LOGOS]

// ─── Course category data ─────────────────────────────────────────────────

interface CourseCardData {
  id: string
  name: string
  stream: string
  Icon: React.ComponentType<{ size?: number; className?: string }>
  duration: string
  entrance: string
  topColleges: string[]
  bsccEligible: boolean
  avgFees: string
  scope: string
  ctaText: string
  ctaHref: string
}

const COURSE_CARDS: CourseCardData[] = [
  {
    id: 'btech',
    name: 'B.Tech / Engineering',
    stream: 'Engineering',
    Icon: Cpu,
    duration: '4 Years',
    entrance: 'JEE Main / 12th Board',
    topColleges: ['LPU', 'CU', 'SRM', 'GNIOT', 'IITM'],
    bsccEligible: true,
    avgFees: '₹60,000–₹1,50,000/year',
    scope: 'Software, AI, Robotics, Core Engineering',
    ctaText: 'Engineering में Apply करें →',
    ctaHref: '#lead-form',
  },
  {
    id: 'mbbs-india',
    name: 'MBBS India',
    stream: 'Medical',
    Icon: Stethoscope,
    duration: '5.5 Years',
    entrance: 'NEET-UG (mandatory)',
    topColleges: ['Govt Medical Colleges', 'AIIMS', 'JIPMER'],
    bsccEligible: true,
    avgFees: '₹5L–₹20L/year',
    scope: 'Doctor, Specialist, Research',
    ctaText: 'MBBS India Apply करें →',
    ctaHref: '#lead-form',
  },
  {
    id: 'mbbs-abroad',
    name: 'MBBS Abroad',
    stream: 'Medical',
    Icon: Stethoscope,
    duration: '6 Years',
    entrance: 'NEET + NMC Approved',
    topColleges: ['Russia', 'Uzbekistan', 'Kyrgyzstan', 'Kazakhstan'],
    bsccEligible: false,
    avgFees: '₹20–40L Total',
    scope: 'NMC Licensed Doctor after FMGE/NEXT',
    ctaText: 'MBBS Abroad जानें →',
    ctaHref: '/study-abroad',
  },
  {
    id: 'bds-bams',
    name: 'BDS / BAMS / BHMS',
    stream: 'Medical',
    Icon: Stethoscope,
    duration: '5 Years',
    entrance: 'NEET-UG',
    topColleges: ['Govt Dental', 'Ayurved Colleges'],
    bsccEligible: true,
    avgFees: '₹60,000–₹5L/year',
    scope: 'Dentistry, Ayurveda, Homeopathy',
    ctaText: 'BDS/BAMS Apply करें →',
    ctaHref: '#lead-form',
  },
  {
    id: 'mba',
    name: 'MBA',
    stream: 'Management',
    Icon: Briefcase,
    duration: '2 Years',
    entrance: 'CAT / MAT / Direct',
    topColleges: ['SIBM', 'Christ', 'LPU', 'Sharda'],
    bsccEligible: true,
    avgFees: '₹80,000–₹2L/year',
    scope: 'Corporate, Entrepreneurship, Finance',
    ctaText: 'MBA Apply करें →',
    ctaHref: '#lead-form',
  },
  {
    id: 'bba',
    name: 'BBA',
    stream: 'Management',
    Icon: Briefcase,
    duration: '3 Years',
    entrance: 'Direct / Merit',
    topColleges: ['LPU', 'CU', 'Sharda', 'Christ'],
    bsccEligible: true,
    avgFees: '₹60,000–₹1.2L/year',
    scope: 'Business, Marketing, HR',
    ctaText: 'BBA Apply करें →',
    ctaHref: '#lead-form',
  },
  {
    id: 'bca-mca',
    name: 'BCA / MCA',
    stream: 'Management',
    Icon: Cpu,
    duration: '3 Years',
    entrance: 'Direct / Entrance',
    topColleges: ['LPU', 'CU', 'Manipal', 'VIT'],
    bsccEligible: true,
    avgFees: '₹50,000–₹1L/year',
    scope: 'Software, Web Dev, Data Science',
    ctaText: 'BCA/MCA Apply करें →',
    ctaHref: '#lead-form',
  },
  {
    id: 'llb',
    name: 'LLB / BA LLB / BBA LLB',
    stream: 'Law',
    Icon: Scale,
    duration: '3–5 Years',
    entrance: 'CLAT / AILET / Direct',
    topColleges: ['RGNUL', 'Christ University', 'LPU'],
    bsccEligible: true,
    avgFees: '₹60,000–₹1.5L/year',
    scope: 'Advocate, Corporate Law, Judiciary',
    ctaText: 'LLB Apply करें →',
    ctaHref: '#lead-form',
  },
  {
    id: 'bpharma',
    name: 'B.Pharma / D.Pharma',
    stream: 'Pharmacy',
    Icon: Pill,
    duration: '2–4 Years',
    entrance: 'Direct / State Entrance',
    topColleges: ['LPU', 'CU', 'Invertis', 'Sandip'],
    bsccEligible: true,
    avgFees: '₹50,000–₹1L/year',
    scope: 'Pharmaceutical Industry, Research',
    ctaText: 'B.Pharma Apply करें →',
    ctaHref: '#lead-form',
  },
  {
    id: 'agriculture',
    name: 'B.Sc Agriculture',
    stream: 'Agriculture',
    Icon: Wheat,
    duration: '4 Years',
    entrance: 'Direct / State Entrance',
    topColleges: ['BAU Sabour', 'Mewar', 'Gokul Global'],
    bsccEligible: true,
    avgFees: '₹40,000–₹90,000/year',
    scope: 'Govt Jobs, Agri-Business, Research',
    ctaText: 'Agriculture Apply करें →',
    ctaHref: '#lead-form',
  },
  {
    id: 'nursing',
    name: 'B.Sc Nursing / GNM / ANM',
    stream: 'Nursing',
    Icon: HeartPulse,
    duration: '2–4 Years',
    entrance: 'Direct / State Entrance',
    topColleges: ['Invertis', 'Haridwar Univ', 'Top Private'],
    bsccEligible: true,
    avgFees: '₹40,000–₹80,000/year',
    scope: 'Gulf, UK, Canada, Hospital Jobs',
    ctaText: 'Nursing Apply करें →',
    ctaHref: '#lead-form',
  },
]

const STREAMS = ['All', 'Engineering', 'Medical', 'Management', 'Law', 'Pharmacy', 'Agriculture', 'Nursing']

// ─── Entrance Exams ───────────────────────────────────────────────────────

const EXAMS = [
  { exam: 'JEE Main', stream: 'B.Tech Engineering', eligibility: '12th PCM 75%+', when: 'Jan + Apr' },
  { exam: 'JEE Advanced', stream: 'IIT B.Tech', eligibility: 'JEE Main Top 2.5L', when: 'May' },
  { exam: 'NEET-UG', stream: 'MBBS/BDS/BAMS', eligibility: '12th PCB 50%+', when: 'May' },
  { exam: 'CAT', stream: 'MBA', eligibility: 'Graduation', when: 'Nov' },
  { exam: 'CLAT', stream: 'LLB/BA LLB', eligibility: '12th 45%+', when: 'Dec' },
  { exam: 'MAT', stream: 'MBA', eligibility: 'Graduation', when: 'Feb/May/Sep' },
  { exam: 'Direct', stream: 'BBA/BCA/B.Pharma/Nursing', eligibility: '12th Pass', when: 'Year-round' },
]

// ─── College card (compact mode for grid) ────────────────────────────────

const naacColors: Record<string, string> = {
  'A++': 'bg-[#eeedf8] text-ind',
  'A+': 'bg-[#E1F5EE] text-[#085041]',
  'A': 'bg-[#E6F1FB] text-[#0C447C]',
  '-': 'bg-[#F1EFE8] text-[#444441]',
}

function CompactCollegeCard({ college }: { college: College }) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -3, scale: 1.015 }}
      style={{ willChange: 'opacity, transform' }}
      className="bg-white rounded-[14px] border border-bdr p-4 hover:border-ind hover:shadow-sm transition-all"
    >
      <div className="flex items-start justify-between mb-2 gap-2">
        <Badge className={`text-xs font-bold px-2 py-0.5 border-0 ${naacColors[college.naac] ?? naacColors['-']}`}>
          {college.naac !== '-' ? `NAAC ${college.naac}` : 'Recognized'}
        </Badge>
        {college.bsccEligible && (
          <Badge className="bg-[#fffbdf] text-[#633806] text-[10px] font-bold border-0 shrink-0 flex items-center gap-0.5"><Ticket size={9} /> BSCC</Badge>
        )}
      </div>
      <h4 className="font-bold text-dk text-sm mb-1 leading-snug">{college.name}</h4>
      <div className="flex items-center gap-1 text-gray-400 text-xs mb-2">
        <MapPin size={10} />
        <span>{college.city}, {college.state}</span>
      </div>
      <div className="flex flex-wrap gap-1">
        {college.courses.slice(0, 2).map((c) => (
          <span key={c} className="text-[10px] bg-[#F5F5F8] text-pur px-2 py-0.5 rounded-full font-medium">
            {c}
          </span>
        ))}
        {college.courses.length > 2 && (
          <span className="text-[10px] text-gray-400">+{college.courses.length - 2}</span>
        )}
      </div>
    </motion.div>
  )
}

// ─── Course card ─────────────────────────────────────────────────────────

function CourseCard({ card }: { card: CourseCardData }) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{ willChange: 'opacity, transform' }}
      className="bg-white rounded-[14px] border border-bdr p-5 hover:border-ind hover:shadow-md transition-all flex flex-col"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-xl bg-[#eeedf8] flex items-center justify-center shrink-0">
          <card.Icon size={20} className="text-ind" />
        </div>
        <Badge className="bg-[#F5F5F8] text-pur border-0 text-xs">{card.stream}</Badge>
      </div>
      <h4 className="font-bold text-dk text-sm mb-1">{card.name}</h4>
      <div className="space-y-1 mb-3 flex-1">
        <p className="text-xs text-gray-500 flex items-center gap-1"><Clock size={11} /> {card.duration} · {card.entrance}</p>
        <p className="text-xs text-gray-500 flex items-center gap-1"><DollarSign size={11} /> {card.avgFees}</p>
        <p className="text-xs text-gray-500 flex items-center gap-1"><Target size={11} /> {card.scope}</p>
      </div>
      <div className="flex flex-wrap gap-1 mb-3">
        {card.topColleges.slice(0, 3).map((c) => (
          <span key={c} className="text-[10px] bg-[#F5F5F8] text-gray-500 px-2 py-0.5 rounded-full">{c}</span>
        ))}
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-bdr">
        {card.bsccEligible ? (
          <span className="text-xs text-emerald-600 font-medium flex items-center gap-1"><CheckCircle size={12} /> BSCC Eligible</span>
        ) : (
          <span className="text-xs text-gray-400">NEET Required</span>
        )}
        <motion.a
          href={card.ctaHref}
          whileTap={{ scale: 0.96 }}
          className="text-xs font-bold text-ind hover:text-pur transition-colors"
          aria-label={card.ctaText}
        >
          {card.ctaText}
        </motion.a>
      </div>
    </motion.div>
  )
}

// ─── Main client content ─────────────────────────────────────────────────

export default function CoursesContent() {
  const [showAll, setShowAll] = useState(false)
  const [activeSlide, setActiveSlide] = useState(0)
  const visibleColleges = showAll ? SORTED_COLLEGES : SORTED_COLLEGES.slice(0, 12)

  // Auto-advance hero slider every 3.5s
  useEffect(() => {
    const t = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length)
    }, 3500)
    return () => clearInterval(t)
  }, [])

  return (
    <>
      {/* ── Section 1: Hero ── */}
      <section className="py-14 md:py-20 overflow-hidden" style={{ backgroundColor: '#1A183E' }}>
        <div className="mx-auto max-w-brand px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="text-white"
            >
              <motion.div variants={fadeInUp}>
                <Badge className="bg-white/10 text-white/90 border border-white/20 mb-5 font-hindi flex items-center gap-1.5 w-fit">
                  <GraduationCap size={13} /> 100+ Partner Colleges · BSCC Eligible
                </Badge>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="font-hindi font-black text-3xl sm:text-4xl lg:text-5xl mb-4"
              >
                अपने सपनों का Course
                <br />
                <span className="text-yel">और College</span> — एक जगह ढूंढें!
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="font-hindi text-white/70 text-base mb-7 max-w-md leading-relaxed"
              >
                Engineering, MBBS, MBA, Law, Nursing, Agriculture —
                सभी streams में top colleges। Marks और budget के
                हिसाब से best options। BSCC loan eligible colleges भी।
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-wrap sm:flex-row gap-3 mb-7">
                <motion.a
                  href="#course-finder"
                  whileTap={{ scale: 0.96 }}
                  className="inline-flex items-center justify-center gap-2 bg-yel text-dk font-bold px-7 py-3.5 rounded-full text-sm hover:bg-yel/90 transition-colors shadow-lg shadow-yel/20 font-hindi"
                  aria-label="Find a college"
                >
                  College ढूंढें →
                </motion.a>
                <motion.a
                  href="#lead-form"
                  whileTap={{ scale: 0.96 }}
                  className="inline-flex items-center justify-center gap-2 border border-white/25 text-white font-semibold px-7 py-3.5 rounded-full text-sm hover:bg-white/8 transition-colors"
                  aria-label="Free counseling"
                >
                  <GraduationCap size={15} /> Free Counseling
                </motion.a>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                {[
                  { icon: Users,        text: '100+ Partner Colleges' },
                  { icon: Ticket,       text: 'BSCC Eligible' },
                  { icon: GraduationCap, text: 'Free Guidance' },
                ].map(({ icon: Icon, text }) => (
                  <span key={text} className="text-white/60 text-xs font-hindi flex items-center gap-1">
                    <Icon size={12} className="shrink-0" />{text}
                  </span>
                ))}
              </motion.div>
            </motion.div>

            {/* Right — Sliding Card + College Logo Marquee */}
            <motion.div variants={fadeInRight} initial="hidden" whileInView="visible" viewport={viewportOnce}>
              <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-sm">

                {/* ── Slide area ── */}
                <div className="relative h-56 sm:h-64 overflow-hidden">
                  <AnimatePresence mode="popLayout" initial={false}>
                    {HERO_SLIDES.map((slide, i) =>
                      i === activeSlide ? (
                        <motion.div
                          key={slide.id}
                          variants={slideVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          className="absolute inset-0"
                        >
                          <Image
                            src={slide.image}
                            alt={slide.alt}
                            fill
                            className="object-cover"
                            priority={slide.id === 0}
                          />
                        </motion.div>
                      ) : null
                    )}
                  </AnimatePresence>
                </div>

                {/* ── Dot indicators ── */}
                <div className="flex items-center justify-center gap-2 py-3 border-b border-white/8">
                  {HERO_SLIDES.map((s, i) => (
                    <button
                      key={s.id}
                      onClick={() => setActiveSlide(i)}
                      aria-label={`Go to slide ${i + 1}`}
                      className="transition-all duration-300"
                    >
                      <span className={`block rounded-full transition-all duration-300 ${i === activeSlide ? 'w-5 h-2 bg-yel' : 'w-2 h-2 bg-white/25'}`} />
                    </button>
                  ))}
                </div>

                {/* ── College logo marquee ── */}
                <div className="relative overflow-hidden py-3.5">
                  <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#1A183E]/80 to-transparent z-10 pointer-events-none" />
                  <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#1A183E]/80 to-transparent z-10 pointer-events-none" />
                  <div className="flex gap-4 w-max animate-marquee-fast" style={{ willChange: 'transform' }} aria-hidden="true">
                    {LOGO_MARQUEE.map((logo, i) => (
                      <div key={`${logo.name}-${i}`} className="shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 border border-white/10 p-1.5">
                        <Image
                          src={logo.src}
                          alt={logo.name}
                          width={40}
                          height={40}
                          className="object-contain w-full h-full"
                        />
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Section 2: Stream Quick Picks ── */}
      <section className="bg-white py-10 border-b border-bdr">
        <div className="mx-auto max-w-brand px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Stream चुनें — Jump to Course Finder
          </p>
          <StreamPills />
        </div>
      </section>

      {/* ── Section 3: Course Finder ── */}
      <section id="course-finder" className="bg-[#F5F5F8] py-16">
        <div className="mx-auto max-w-brand px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <Badge className="bg-[#eeedf8] text-ind border-0 mb-3 font-hindi">🔍 Course Finder</Badge>
            <h2 className="font-hindi font-bold text-ind text-3xl sm:text-4xl mb-2">
              सही College ढूंढें — अभी, Free में!
            </h2>
            <p className="font-hindi text-gray-500 text-base max-w-lg mx-auto">
              Course, state, aur BSCC eligibility choose karo — matching colleges instantly load honge।
            </p>
          </div>
          <CourseFinder />
        </div>
      </section>

      {/* ── Section 4: Course Categories ── */}
      <SectionWrapper outerClassName="bg-white" className="py-16" animate={false}>
        <div className="text-center mb-10">
          <h2 className="font-hindi font-bold text-ind text-3xl sm:text-4xl mb-2">
            सभी Courses — Complete जानकारी
          </h2>
          <p className="text-gray-500 text-sm font-hindi">
            Stream select करें और course details देखें
          </p>
        </div>

        <Tabs defaultValue="All" className="w-full">
          {/* Tab list — horizontal scroll on mobile */}
          <div className="overflow-x-auto pb-2 mb-8">
            <TabsList className="flex gap-2 bg-transparent p-0 w-max min-w-full">
              {STREAMS.map((stream) => (
                <TabsTrigger
                  key={stream}
                  value={stream}
                  className="shrink-0 rounded-full border border-bdr text-sm font-medium px-4 py-1.5 data-active:bg-ind data-active:text-white data-active:border-ind h-auto"
                >
                  {stream}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {STREAMS.map((stream) => {
            const cards = stream === 'All'
              ? COURSE_CARDS
              : COURSE_CARDS.filter((c) => c.stream === stream)
            return (
              <TabsContent key={stream} value={stream}>
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                >
                  {cards.map((card) => (
                    <CourseCard key={card.id} card={card} />
                  ))}
                </motion.div>
              </TabsContent>
            )
          })}
        </Tabs>
      </SectionWrapper>

      {/* ── Section 5: BSCC Banner ── */}
      <motion.section
        variants={scaleIn}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        style={{ willChange: 'opacity, transform' }}
        className="bg-yel py-10"
      >
        <div className="mx-auto max-w-brand px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-hindi font-black text-dk text-2xl sm:text-3xl mb-3 flex items-center justify-center gap-2">
            <Ticket size={28} className="shrink-0" /> अब fees की tension क्यों जब DRCC है साथ में!
          </h2>
          <p className="text-ind font-semibold text-sm sm:text-base mb-6 font-hindi">
            {BSCC.maxAmount} तक loan · {BSCC.interest} interest · {BSCC.loansProcessed} loans processed · Free service
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <motion.a
              href="/bscc-loan"
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center justify-center gap-2 bg-ind text-white font-bold px-7 py-3 rounded-full text-sm hover:bg-pur transition-colors font-hindi"
              aria-label="Apply for BSCC loan"
            >
              BSCC Loan Apply करें →
            </motion.a>
            <motion.a
              href="/bscc-loan"
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center justify-center gap-2 border-2 border-ind text-ind font-bold px-7 py-3 rounded-full text-sm hover:bg-ind/5 transition-colors font-hindi"
              aria-label="Learn more about BSCC loan"
            >
              और जानें
            </motion.a>
          </div>
        </div>
      </motion.section>

      {/* ── Section 6: Partner Colleges Grid ── */}
      <SectionWrapper outerClassName="bg-[#F5F5F8]" className="py-16">
        <div className="text-center mb-10">
          <h2 className="font-hindi font-bold text-ind text-3xl sm:text-4xl mb-2">
            हमारे 100+ Partner Colleges
          </h2>
          <p className="font-hindi text-gray-500 text-sm">
            NAAC accredited · BSCC eligible · Direct admission support
          </p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {visibleColleges.map((college) => (
            <CompactCollegeCard key={college.id} college={college} />
          ))}
          <AnimatePresence>
            {showAll &&
              SORTED_COLLEGES.slice(12).map((college) => (
                <CompactCollegeCard key={`extra-${college.id}`} college={college} />
              ))}
          </AnimatePresence>
        </motion.div>

        {!showAll && SORTED_COLLEGES.length > 12 && (
          <div className="text-center mt-8">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setShowAll(true)}
              aria-label="Show all partner colleges"
              className="inline-flex items-center gap-2 bg-white border border-bdr text-ind font-bold px-7 py-3 rounded-full text-sm hover:border-ind hover:shadow-sm transition-all font-hindi"
            >
              और colleges देखें → ({SORTED_COLLEGES.length - 12} more)
            </motion.button>
          </div>
        )}
      </SectionWrapper>

      {/* ── Section 7: Entrance Exams Guide ── */}
      <SectionWrapper outerClassName="bg-white" className="py-16">
        <div className="text-center mb-10">
          <h2 className="font-hindi font-bold text-ind text-3xl sm:text-4xl mb-2">
            कौन सा Entrance Exam देना होगा?
          </h2>
          <p className="font-hindi text-gray-500 text-sm">
            Stream के हिसाब से सही exam जानें
          </p>
        </div>

        {/* Scrollable table on mobile */}
        <div className="overflow-x-auto rounded-[14px] border border-bdr">
          <motion.table
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="w-full min-w-[600px] bg-white"
          >
            <thead className="bg-[#eeedf8]">
              <tr>
                {['Exam', 'Stream', 'Eligibility', 'When'].map((h) => (
                  <th
                    key={h}
                    className="text-left text-xs font-bold text-ind uppercase tracking-wider px-5 py-3"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-bdr">
              {EXAMS.map((row) => (
                <motion.tr
                  key={row.exam}
                  variants={fadeInUp}
                  className="hover:bg-[#F5F5F8] transition-colors"
                >
                  <td className="px-5 py-3.5 font-bold text-ind text-sm">{row.exam}</td>
                  <td className="px-5 py-3.5 text-sm text-gray-700 font-hindi">{row.stream}</td>
                  <td className="px-5 py-3.5 text-sm text-gray-500 font-hindi">{row.eligibility}</td>
                  <td className="px-5 py-3.5 text-sm text-gray-500">{row.when}</td>
                </motion.tr>
              ))}
            </tbody>
          </motion.table>
        </div>

        <div className="text-center mt-8">
          <p className="font-hindi text-gray-500 text-sm mb-4">
            Exam preparation mein help chahiye? Free counseling lo →
          </p>
          <motion.a
            href="#lead-form"
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-2 bg-ind text-white font-bold px-7 py-3 rounded-full text-sm hover:bg-pur transition-colors font-hindi"
            aria-label="Get free exam guidance"
          >
            <GraduationCap size={16} /> Free Guidance लें →
          </motion.a>
        </div>
      </SectionWrapper>
    </>
  )
}
