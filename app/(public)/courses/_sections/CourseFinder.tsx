'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, GraduationCap, Star, Search, Loader2, Ticket } from 'lucide-react'
import { COLLEGES, DOMESTIC_LOCATIONS, MBBS_ABROAD_COUNTRIES, type College } from '@/lib/collegeData'
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/animations'
import { SITE } from '@/lib/constants'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'

const COURSE_OPTIONS = [
  'B.Tech / Engineering',
  'MBBS India',
  'MBBS Abroad',
  'MBA',
  'BBA',
  'BCA/MCA',
  'BAMS/BDS',
  'B.Pharma',
  'B.Sc Nursing',
  'B.Sc Agriculture',
  'LLB',
]

const naacColors: Record<string, string> = {
  'A++': 'bg-[#eeedf8] text-ind',
  'A+': 'bg-[#E1F5EE] text-[#085041]',
  'A': 'bg-[#E6F1FB] text-[#0C447C]',
  '-': 'bg-[#F1EFE8] text-[#444441]',
}

function CollegeCard({ college }: { college: College }) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{ willChange: 'opacity, transform' }}
      className="bg-white rounded-[14px] border border-bdr p-5 hover:border-ind hover:shadow-md transition-all cursor-default"
    >
      {/* Badges row */}
      <div className="flex items-start justify-between mb-3 gap-2 flex-wrap">
        <div className="flex items-center gap-1.5 flex-wrap">
          <Badge className={`text-xs font-bold px-2 py-0.5 border-0 ${naacColors[college.naac] ?? naacColors['-']}`}>
            {college.naac !== '-' ? `NAAC ${college.naac}` : 'Recognized'}
          </Badge>
          {college.featured && (
            <Badge className="bg-yel text-dk text-[10px] font-bold border-0 flex items-center gap-1">
              ⭐ Recommended
            </Badge>
          )}
        </div>
        {college.bsccEligible && (
          <Badge className="bg-[#fffbdf] text-[#633806] text-xs font-bold border-0 shrink-0 flex items-center gap-1">
            <Ticket size={10} /> BSCC
          </Badge>
        )}
      </div>

      {/* Name */}
      <h4 className="font-bold text-dk text-[15px] mb-1 leading-snug">{college.name}</h4>

      {/* Location */}
      <div className="flex items-center gap-1 text-gray-400 text-xs mb-3">
        <MapPin size={11} />
        <span>{college.city}, {college.state}</span>
      </div>

      {/* Course pills */}
      <div className="flex flex-wrap gap-1 mb-3">
        {college.courses.slice(0, 3).map((c) => (
          <span
            key={c}
            className="text-[10px] bg-[#F5F5F8] text-pur px-2 py-0.5 rounded-full font-medium"
          >
            {c}
          </span>
        ))}
        {college.courses.length > 3 && (
          <span className="text-[10px] text-gray-400 px-1">+{college.courses.length - 3} more</span>
        )}
      </div>

      {/* Highlights */}
      <ul className="space-y-1 mb-4">
        {college.highlights.map((h) => (
          <li key={h} className="text-xs text-[#4A4570] flex items-start gap-1.5">
            <Star size={10} className="text-amb mt-0.5 shrink-0" />
            {h}
          </li>
        ))}
      </ul>

      {/* Fees + CTA */}
      <div className="flex items-center justify-between pt-3 border-t border-bdr">
        <div>
          <div className="text-xs text-gray-400">Approx Fees</div>
          <div className="text-sm font-bold text-ind">{college.fees}</div>
        </div>
        <motion.a
          href="#lead-form"
          whileTap={{ scale: 0.96 }}
          aria-label={`Apply to ${college.name}`}
          className="flex items-center gap-1.5 bg-ind text-white text-xs font-bold px-3 py-2 rounded-lg hover:bg-ind/90 transition-colors"
        >
          <GraduationCap size={12} /> Apply करें
        </motion.a>
      </div>
    </motion.div>
  )
}

export default function CourseFinder() {
  const searchParams = useSearchParams()
  const [course, setCourse] = useState('')
  const [location, setLocation] = useState('')
  const [bscc, setBscc] = useState<'yes' | 'no' | ''>('')

  const isMbbsAbroad = course === 'MBBS Abroad'
  const locationOptions = isMbbsAbroad ? MBBS_ABROAD_COUNTRIES : DOMESTIC_LOCATIONS
  const locationLabel = isMbbsAbroad ? 'Country' : 'City / State'
  const locationPlaceholder = isMbbsAbroad ? '-- Country चुनें --' : '-- City / State चुनें --'
  const [results, setResults] = useState<College[]>([])
  const [searched, setSearched] = useState(false)
  const [loading, setLoading] = useState(false)

  // Pre-fill course from URL param (set by StreamPills)
  useEffect(() => {
    const urlCourse = searchParams.get('course')
    if (urlCourse) setCourse(urlCourse)
  }, [searchParams])

  const handleFind = () => {
    setLoading(true)
    setTimeout(() => {
      const filtered = COLLEGES.filter((c) => {
        const matchCourse = !course || c.courses.includes(course)
        const matchLocation = !location || location === 'All Locations'
          || c.city === location || c.state === location
        const matchBscc =
          bscc === '' || (bscc === 'yes' ? c.bsccEligible : !c.bsccEligible)
        return matchCourse && matchLocation && matchBscc
      })
      // Featured colleges appear first
      const sorted = [...filtered].sort((a, b) => {
        if (a.featured === b.featured) return 0
        return a.featured ? -1 : 1
      })
      setResults(sorted)
      setSearched(true)
      setLoading(false)
      document.getElementById('college-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 600)
  }

  return (
    <div>
      {/* Filter Form */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        style={{ willChange: 'opacity, transform' }}
        className="bg-white rounded-2xl border border-bdr p-6 md:p-8 shadow-sm"
      >
        {/* Row 1: Course + State */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          <div>
            <Label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">
              Course चुनें *
            </Label>
            <Select value={course} onValueChange={(v) => { setCourse(v ?? ''); setLocation(''); setBscc('') }}>
              <SelectTrigger className="h-12 border-bdr focus:border-ind" aria-label="Select course">
                <SelectValue placeholder="-- Course Select करें --" />
              </SelectTrigger>
              <SelectContent>
                {COURSE_OPTIONS.map((opt) => (
                  <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">
              {locationLabel}
            </Label>
            <Select value={location} onValueChange={(v) => setLocation(v ?? '')}>
              <SelectTrigger className="h-12 border-bdr focus:border-ind" aria-label={`Select ${locationLabel}`}>
                <SelectValue placeholder={locationPlaceholder} />
              </SelectTrigger>
              <SelectContent>
                {locationOptions.map((loc) => (
                  <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Row 2: BSCC Toggle — hidden for MBBS Abroad */}
        {!isMbbsAbroad && <div className="mb-6">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            BSCC Loan Eligible College चाहिए?
          </p>
          <button
            type="button"
            role="switch"
            aria-checked={bscc === 'yes'}
            onClick={() => setBscc(bscc === 'yes' ? '' : 'yes')}
            className={`relative inline-flex items-center gap-2.5 px-4 py-2 rounded-full border text-sm font-semibold font-hindi transition-all duration-200 cursor-pointer select-none ${
              bscc === 'yes'
                ? 'bg-ind text-white border-ind shadow-md'
                : 'bg-white text-gray-600 border-bdr hover:border-ind hover:text-ind'
            }`}
          >
            <span
              className={`w-8 h-4 rounded-full flex items-center transition-colors duration-200 shrink-0 ${
                bscc === 'yes' ? 'bg-yel' : 'bg-gray-200'
              }`}
            >
              <span
                className={`w-3 h-3 rounded-full bg-white shadow transition-transform duration-200 ${
                  bscc === 'yes' ? 'translate-x-4' : 'translate-x-0.5'
                }`}
              />
            </span>
            BSCC Loan Eligible
          </button>
        </div>}

        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleFind}
          disabled={loading}
          aria-label="Find matching colleges"
          className="w-full bg-ind hover:bg-pur text-white font-bold text-base rounded-xl transition-colors py-3.5 flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {loading ? (
            <><Loader2 size={18} className="animate-spin" /> College ढूंढ रहे हैं...</>
          ) : (
            <><GraduationCap size={18} /> College ढूंढें →</>
          )}
        </motion.button>
      </motion.div>

      {/* Results */}
      <AnimatePresence>
        {searched && (
          <motion.div
            id="college-results"
            key="results"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-10"
          >
            {/* Result header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div>
                <h3 className="text-lg font-bold text-ind font-hindi">
                  {results.length > 0
                    ? `${results.length} Colleges मिले`
                    : 'कोई college नहीं मिला'}
                </h3>
                {results.length > 0 && (
                  <p className="text-sm text-gray-400">
                    {[course, location && location !== 'All Locations' ? location : '', bscc === 'yes' ? 'BSCC Eligible' : '']
                      .filter(Boolean)
                      .join(' · ')}
                  </p>
                )}
              </div>
              {results.length === 0 && (
                <p className="text-sm text-gray-400">
                  Filter change करें या{' '}
                  <a
                    href={`https://wa.me/${SITE.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ind font-semibold underline"
                  >
                    WhatsApp करें
                  </a>
                </p>
              )}
            </div>

            {/* Grid */}
            {results.length > 0 && (
              <>
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
                >
                  {results.map((college) => (
                    <CollegeCard key={college.id} college={college} />
                  ))}
                </motion.div>

                {/* Bottom CTA */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mt-10 text-center p-6 bg-[#eeedf8] rounded-2xl"
                >
                  <p className="font-hindi font-bold text-ind text-lg mb-2">
                    सही college मिल गया? Expert से बात करें!
                  </p>
                  <p className="text-pur text-sm mb-4">
                    Free counseling में admission process, fees, BSCC loan — सब discuss करें।
                  </p>
                  <motion.a
                    href="#lead-form"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="inline-flex items-center gap-2 bg-ind text-white font-bold px-8 py-3 rounded-xl hover:bg-pur transition-colors"
                    aria-label="Get free counseling"
                  >
                    <Search size={16} /> Free Counseling लें →
                  </motion.a>
                </motion.div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
