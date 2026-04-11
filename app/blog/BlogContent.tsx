'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  BookOpen, Clock, Calendar, User, ArrowRight,
  Tag, MessageCircle, Phone,
} from 'lucide-react'
import SectionWrapper from '@/components/shared/SectionWrapper'
import LeadForm from '@/components/forms/LeadForm'
import {
  fadeInUp, staggerContainer, staggerSlow, viewportOnce, buttonTap,
} from '@/lib/animations'
import { SITE } from '@/lib/constants'
import type { BlogPost, BlogCategory } from '@/types'

// ─── Types ────────────────────────────────────────────────────────────────────

interface BlogContentProps {
  posts: BlogPost[]
}

type CategoryFilter = BlogCategory | 'All'

// ─── Constants ────────────────────────────────────────────────────────────────

const CATEGORIES: { label: string; value: CategoryFilter }[] = [
  { label: 'सभी Articles', value: 'All' },
  { label: 'Engineering',     value: 'Engineering' },
  { label: 'MBBS India',      value: 'MBBS India' },
  { label: 'MBBS Abroad',     value: 'MBBS Abroad' },
  { label: 'MBA & Management', value: 'MBA & Management' },
  { label: 'BSCC Loan',       value: 'BSCC Loan' },
  { label: 'Career Guidance', value: 'Career Guidance' },
  { label: 'Study Abroad',    value: 'Study Abroad' },
  { label: 'Nursing & Pharma', value: 'Nursing & Pharma' },
]

const TOPIC_TAGS = [
  { label: '12th ke baad kya kare', category: 'Career Guidance' as BlogCategory },
  { label: 'MBBS Abroad Fees',       category: 'MBBS Abroad' as BlogCategory },
  { label: 'BSCC Loan Guide',        category: 'BSCC Loan' as BlogCategory },
  { label: 'JEE ke baad Engineering', category: 'Engineering' as BlogCategory },
  { label: 'Bihar College Admission', category: 'Career Guidance' as BlogCategory },
  { label: 'NEET ke baad MBBS',      category: 'MBBS India' as BlogCategory },
  { label: 'MBA vs Job',             category: 'MBA & Management' as BlogCategory },
  { label: 'Nursing Admission',      category: 'Nursing & Pharma' as BlogCategory },
  { label: 'Study Abroad Tips',      category: 'Study Abroad' as BlogCategory },
  { label: 'Career Counseling',      category: 'Career Guidance' as BlogCategory },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(iso?: string) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
  })
}

function CategoryBadge({ category }: { category: string }) {
  return (
    <span className="inline-block bg-yel text-ind text-[.62rem] font-bold px-2.5 py-1
                     rounded-full uppercase tracking-wider shrink-0">
      {category}
    </span>
  )
}

// ─── Blog Card ────────────────────────────────────────────────────────────────

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <motion.article
      variants={fadeInUp}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
      className="bg-white border border-bdr rounded-[14px] overflow-hidden
                 flex flex-col cursor-pointer group"
    >
      <Link href={`/blog/${post.slug}`} className="flex flex-col flex-1">
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden bg-il">
          <Image
            src={post.image_url}
            alt={post.image_alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <span className="absolute top-3 left-3">
            <CategoryBadge category={post.category} />
          </span>
        </div>

        {/* Body */}
        <div className="p-5 flex flex-col flex-1">
          <h3 className="font-devanagari text-dk text-base font-bold
                         leading-snug mb-2 line-clamp-2 flex-1">
            {post.title}
          </h3>
          <p className="font-poppins text-mu text-xs leading-relaxed mb-4 line-clamp-2">
            {post.excerpt}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-bdr">
            <div className="flex items-center gap-3 text-[.7rem] text-mu font-poppins">
              <span className="flex items-center gap-1">
                <Calendar size={11} />
                {formatDate(post.created_at)}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={11} />
                {post.read_time} min
              </span>
            </div>
            <span className="font-poppins text-xs font-semibold text-ind
                             flex items-center gap-1 group-hover:gap-2 transition-all">
              पढ़ें <ArrowRight size={12} />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

// ─── Featured Card ────────────────────────────────────────────────────────────

function FeaturedCard({ post }: { post: BlogPost }) {
  return (
    <motion.article
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
      className="bg-white border border-bdr rounded-[14px] overflow-hidden
                 grid grid-cols-1 md:grid-cols-[3fr_2fr] cursor-pointer group"
    >
      <Link href={`/blog/${post.slug}`} className="contents">
        {/* Image */}
        <div className="relative aspect-video md:aspect-auto min-h-[220px] bg-il">
          <Image
            src={post.image_url}
            alt={post.image_alt}
            fill
            priority
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 60vw"
          />
          <span className="absolute top-3 left-3">
            <CategoryBadge category={post.category} />
          </span>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 flex flex-col justify-between gap-4">
          <div>
            <span className="font-poppins text-pur text-xs font-bold uppercase
                             tracking-[.1em] mb-3 block">
              Featured Article
            </span>
            <h2 className="font-devanagari text-dk text-xl md:text-2xl font-bold
                           leading-snug mb-3 line-clamp-3">
              {post.title}
            </h2>
            <p className="font-poppins text-mu text-sm leading-relaxed line-clamp-3">
              {post.excerpt}
            </p>
          </div>

          {/* Meta + CTA */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-4 text-xs text-mu font-poppins flex-wrap">
              <span className="flex items-center gap-1.5">
                <User size={12} />
                {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={12} />
                {post.read_time} min read
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={12} />
                {formatDate(post.created_at)}
              </span>
            </div>
            <span className="font-poppins text-sm font-semibold text-ind
                             flex items-center gap-1.5 group-hover:gap-3 transition-all w-fit">
              पढ़ें पूरा Article <ArrowRight size={14} />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function BlogContent({ posts }: BlogContentProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('All')
  const gridRef = useRef<HTMLDivElement>(null)

  const filtered = activeCategory === 'All'
    ? posts
    : posts.filter(p => p.category === activeCategory)

  const [featured, ...rest] = filtered

  function handleTagClick(category: BlogCategory) {
    setActiveCategory(category)
    setTimeout(() => {
      gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }

  return (
    <main className="min-h-screen">

      {/* ── 1. Hero ── */}
      <section
        className="pt-28 pb-16 px-4"
        style={{ background: '#1A183E' }}
      >
        <div className="max-w-[1240px] mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-2xl"
          >
            {/* Badge */}
            <motion.div variants={fadeInUp} className="mb-5">
              <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20
                               text-yel text-xs font-bold px-4 py-2 rounded-full
                               uppercase tracking-[.1em]">
                <BookOpen size={14} className="text-yel" />
                CAE Knowledge Hub
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              variants={fadeInUp}
              className="font-devanagari text-white text-3xl sm:text-4xl md:text-5xl
                         font-bold leading-tight mb-4"
            >
              ज्ञान के बदलें आपका{' '}
              <span className="text-yel">Future</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={fadeInUp}
              className="font-poppins text-white/70 text-base sm:text-lg max-w-xl mb-8"
            >
              College admission, MBBS abroad, BSCC loan — हर topic पर expert guidance,
              बिल्कुल free। CAE के counselors की knowledge, अब आपके screen पर।
            </motion.p>

            {/* Stat pills */}
            <motion.div variants={fadeInUp} className="flex gap-4 flex-wrap">
              {[
                { val: '50+', label: 'Articles' },
                { val: '8',   label: 'Categories' },
                { val: '17+', label: 'Years Experience' },
              ].map(s => (
                <div
                  key={s.label}
                  className="bg-white/10 border border-white/20 rounded-full
                             px-4 py-2 text-sm font-poppins"
                >
                  <span className="text-white font-bold">{s.val}</span>
                  <span className="text-white/60 ml-1">{s.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── 2. Category Filter ── */}
      <div
        ref={gridRef}
        className="bg-white border-b border-bdr sticky top-[64px] z-20"
      >
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex gap-2 py-3 overflow-x-auto scrollbar-hide">
            {CATEGORIES.map(cat => (
              <motion.button
                key={cat.value}
                whileTap={buttonTap}
                onClick={() => setActiveCategory(cat.value)}
                aria-label={`Filter by ${cat.label}`}
                className={[
                  'shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold font-poppins',
                  'border transition-all duration-200 whitespace-nowrap',
                  activeCategory === cat.value
                    ? 'bg-ind text-white border-ind'
                    : 'bg-white text-mu border-bdr hover:border-ind hover:text-ind',
                ].join(' ')}
              >
                {cat.label}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* ── 3 + 4. Featured + Grid ── */}
      <section className="bg-[#F5F5F8] py-12">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">

          {/* Featured */}
          {featured ? (
            <div className="mb-8">
              <FeaturedCard post={featured} />
            </div>
          ) : (
            <p className="font-poppins text-mu text-center py-16">
              इस category में अभी कोई article नहीं है।
            </p>
          )}

          {/* Grid */}
          {rest.length > 0 && (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {rest.map(post => (
                <BlogCard key={post.id ?? post.slug} post={post} />
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* ── 5. CTA Strip ── */}
      <SectionWrapper outerClassName="bg-[#F5F5F8] pb-12">
        <motion.div
          variants={fadeInUp}
          className="bg-ind rounded-[14px] px-6 py-8 md:px-10 md:py-10
                     flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <p className="font-poppins text-yel text-xs font-bold uppercase tracking-[.1em] mb-2">
              Expert Help Available
            </p>
            <h3 className="font-devanagari text-white text-xl md:text-2xl font-bold mb-1">
              College के बारे में confused हो?
            </h3>
            <p className="font-poppins text-white/65 text-sm">
              हमारे counselors आपके सवालों का जवाब देंगे — बिल्कुल free।
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <motion.a
              whileTap={buttonTap}
              href={`https://wa.me/${SITE.whatsapp.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp CAE for free counseling"
              className="flex items-center gap-2 bg-[#25D366] text-white font-bold
                         text-sm px-5 py-3 rounded-full whitespace-nowrap"
            >
              <MessageCircle size={16} />
              WhatsApp करें
            </motion.a>
            <motion.a
              whileTap={buttonTap}
              href={`tel:${SITE.phone}`}
              aria-label="Call CAE for free counseling"
              className="flex items-center gap-2 bg-yel text-ind font-bold
                         text-sm px-5 py-3 rounded-full whitespace-nowrap"
            >
              <Phone size={16} />
              Call करें
            </motion.a>
          </div>
        </motion.div>
      </SectionWrapper>

      {/* ── 6. Lead Capture ── */}
      <SectionWrapper outerClassName="bg-[#F5F5F8] pb-14">
        <motion.div
          variants={staggerContainer}
          className="bg-white rounded-[20px] px-6 py-12 md:px-12 text-center
                     max-w-2xl mx-auto"
        >
          <motion.span
            variants={fadeInUp}
            className="font-poppins text-pur text-xs font-bold uppercase tracking-[.1em] mb-2 block"
          >
            Free Expert Guidance
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="font-devanagari text-ind text-2xl md:text-3xl font-bold mt-1 mb-3"
          >
            आपका अगला कदम — हमसे बात करें
          </motion.h2>
          <motion.p variants={fadeInUp} className="font-poppins text-mu text-sm mb-8 max-w-md mx-auto">
            Article पढ़ने के बाद भी confusion है? हमारे expert 2 घंटे में
            आपको call करेंगे — कोई fees नहीं।
          </motion.p>
          <motion.div variants={fadeInUp} className="max-w-lg mx-auto text-left">
            <LeadForm sourcePage="/blog" />
          </motion.div>
        </motion.div>
      </SectionWrapper>

      {/* ── 7. Tag Cloud ── */}
      <SectionWrapper outerClassName="bg-white" className="py-12">
        <motion.div variants={fadeInUp} className="text-center mb-8">
          <span className="font-poppins text-pur text-xs font-bold uppercase tracking-[.1em] mb-2 block">
            Topics
          </span>
          <h2 className="font-devanagari text-ind text-2xl md:text-3xl font-bold">
            और Topics खोजें
          </h2>
        </motion.div>

        <motion.div
          variants={staggerSlow}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="flex flex-wrap gap-3 justify-center"
        >
          {TOPIC_TAGS.map(tag => (
            <motion.button
              key={tag.label}
              variants={fadeInUp}
              whileHover={{ scale: 1.05, borderColor: '#2E2567' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleTagClick(tag.category)}
              aria-label={`Filter articles by topic: ${tag.label}`}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-bdr
                         rounded-full text-sm font-poppins text-mu cursor-pointer
                         hover:text-ind hover:border-ind transition-colors duration-200"
            >
              <Tag size={13} className="shrink-0" />
              {tag.label}
            </motion.button>
          ))}
        </motion.div>
      </SectionWrapper>

    </main>
  )
}
