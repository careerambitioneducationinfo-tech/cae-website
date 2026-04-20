'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu, X, Phone, MessageCircle,
  Home, BookOpen, Stethoscope, CreditCard,
  Info, Mail, Newspaper, ChevronRight, ChevronDown,
} from 'lucide-react'
import { SITE, SOCIAL } from '@/lib/constants'
import { buttonTap } from '@/lib/animations'
import { useNav } from '@/lib/nav-context'
import { ABROAD_COUNTRIES } from '@/lib/abroadData'

const MBBS_MOBILE_LINKS = ABROAD_COUNTRIES.map((c) => ({
  label: `${c.flag} ${c.name}`,
  href: `/study-abroad/${c.slug}`,
  fee: c.totalFee,
}))

const NAV_LINKS = [
  { label: 'Home',        href: '/',            icon: Home,        hasDropdown: false },
  { label: 'Courses',     href: '/courses',      icon: BookOpen,    hasDropdown: false },
  { label: 'MBBS Abroad', href: '/study-abroad', icon: Stethoscope, hasDropdown: true  },
  { label: 'BSCC Loan',   href: '/bscc-loan',   icon: CreditCard,  hasDropdown: false },
  { label: 'About',       href: '/about',       icon: Info,        hasDropdown: false },
  { label: 'Contact',     href: '/contact',     icon: Mail,        hasDropdown: false },
  { label: 'Blog',        href: '/blog',        icon: Newspaper,   hasDropdown: false },
]

const dropdownVariants = {
  hidden:  { opacity: 0, y: -6, scale: 0.97 },
  visible: { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.18, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, y: -4, scale: 0.97, transition: { duration: 0.13, ease: 'easeIn' } },
}

const drawerVariants = {
  hidden: { x: '-100%', opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] } },
  exit:   { x: '-100%', opacity: 0, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } },
}

const backdropVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit:    { opacity: 0, transition: { duration: 0.2 } },
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mbbsDropdownOpen, setMbbsDropdownOpen] = useState(false)
  const [mobileMbbsOpen, setMobileMbbsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { setDrawerOpen } = useNav()

  const openDrawer = () => { setMobileOpen(true); setDrawerOpen(true) }
  const closeDrawer = () => { setMobileOpen(false); setDrawerOpen(false); setMobileMbbsOpen(false) }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setMbbsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      {/* ── Sticky header ── */}
      <header
        className={[
          'sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-ind/10 transition-shadow',
          scrolled ? 'shadow-md' : '',
        ].join(' ')}
      >
        <div className="mx-auto max-w-brand px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label="Career Ambition Education home">
              <Image
                src="/icons/cae logo.webp"
                alt="Career Ambition Education logo"
                width={40}
                height={40}
                className="h-10 w-10 object-contain shrink-0"
                priority
              />
              <div className="leading-tight">
                <p className="font-bold text-ind text-sm leading-none">Career Ambition Education</p>
                <p className="text-[11px] text-gray-500 leading-none mt-0.5">Bihar&apos;s #1 College Counseling</p>
              </div>
            </Link>

            {/* Desktop nav links */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
              {NAV_LINKS.map((link) =>
                link.hasDropdown ? (
                  /* MBBS Abroad — with hover dropdown */
                  <div
                    key={link.href}
                    ref={dropdownRef}
                    className="relative"
                    onMouseEnter={() => setMbbsDropdownOpen(true)}
                    onMouseLeave={() => setMbbsDropdownOpen(false)}
                  >
                    <button
                      onClick={() => setMbbsDropdownOpen((v) => !v)}
                      className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:text-ind hover:bg-ind/5 rounded-md transition-colors font-medium"
                      aria-haspopup="true"
                      aria-expanded={mbbsDropdownOpen}
                    >
                      {link.label}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${mbbsDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                      {mbbsDropdownOpen && (
                        <motion.div
                          key="mbbs-dropdown"
                          variants={dropdownVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 w-[440px] bg-white rounded-2xl shadow-xl border border-bdr z-50 overflow-hidden"
                          role="menu"
                        >
                          {/* Dropdown header */}
                          <div className="bg-ind px-5 py-3">
                            <p className="text-white font-hindi font-semibold text-sm">🌍 MBBS Abroad Destinations</p>
                            <p className="text-white/60 text-xs mt-0.5">NMC & WHO Approved · English Medium</p>
                          </div>

                          {/* Country grid */}
                          <div className="grid grid-cols-2 gap-2 p-3">
                            {ABROAD_COUNTRIES.map((country) => (
                              <Link
                                key={country.slug}
                                href={`/study-abroad/${country.slug}`}
                                onClick={() => setMbbsDropdownOpen(false)}
                                role="menuitem"
                                className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#F5F5F8] transition-colors group"
                              >
                                <span className="text-2xl shrink-0" aria-hidden="true">{country.flag}</span>
                                <div className="min-w-0">
                                  <p className="font-semibold text-ind text-sm leading-none group-hover:text-pur transition-colors">
                                    {country.name}
                                  </p>
                                  <p className="text-gray-400 text-[11px] mt-0.5">{country.totalFee} · {country.duration}</p>
                                </div>
                              </Link>
                            ))}
                          </div>

                          {/* Footer link */}
                          <div className="border-t border-bdr px-4 py-3">
                            <Link
                              href="/study-abroad"
                              onClick={() => setMbbsDropdownOpen(false)}
                              className="flex items-center justify-center gap-1.5 text-ind text-xs font-semibold hover:text-pur transition-colors"
                            >
                              सभी destinations देखें →
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-3 py-1.5 text-sm text-gray-600 hover:text-ind hover:bg-ind/5 rounded-md transition-colors font-medium"
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden md:flex items-center gap-2 shrink-0">
              <motion.a
                href={`tel:${SITE.phone}`}
                whileTap={buttonTap}
                className="flex items-center gap-1.5 text-sm font-medium text-ind border border-ind/20 hover:bg-ind/5 px-3 py-1.5 rounded-lg transition-colors"
                aria-label={`Call ${SITE.phone}`}
              >
                <Phone className="w-3.5 h-3.5" />
                Call Now
              </motion.a>
              <motion.a
                href="#counseling"
                whileTap={buttonTap}
                className="flex items-center gap-1.5 text-sm font-semibold bg-ind text-white px-4 py-1.5 rounded-lg hover:bg-ind/90 transition-colors font-hindi"
                aria-label="Free counseling"
              >
                Free Counseling लें
              </motion.a>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={openDrawer}
              aria-label="Open menu"
              className="lg:hidden p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-ind hover:bg-ind/5 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>

          </div>
        </div>
      </header>

      {/* ── Mobile drawer — rendered OUTSIDE header to escape z-index stacking context ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="nav-backdrop"
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={closeDrawer}
              className="fixed inset-0 bg-black/50 z-50"
              aria-hidden="true"
            />

            {/* Drawer panel */}
            <motion.nav
              key="nav-drawer"
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 left-0 bottom-0 w-[min(280px,85vw)] bg-white z-50 shadow-2xl flex flex-col"
              aria-label="Mobile navigation"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-white">
                <div className="flex items-center gap-2.5">
                  <Image
                    src="/icons/cae logo.webp"
                    alt="Career Ambition Education logo"
                    width={36}
                    height={36}
                    className="h-9 w-9 object-contain shrink-0"
                  />
                  <div className="leading-tight">
                    <p className="font-bold text-ind text-sm leading-none">Career Ambition Education</p>
                    <p className="text-[10px] text-gray-400 leading-none mt-0.5">Bihar&apos;s #1 Counseling</p>
                  </div>
                </div>
                <button
                  onClick={closeDrawer}
                  aria-label="Close menu"
                  className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-gray-400 hover:text-ind rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Nav links */}
              <div className="flex-1 overflow-y-auto py-3">
                <p className="px-5 pb-2 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                  Navigation
                </p>
                {NAV_LINKS.map((link) =>
                  link.hasDropdown ? (
                    <div key={link.href}>
                      {/* MBBS Abroad accordion toggle */}
                      <button
                        onClick={() => setMobileMbbsOpen((v) => !v)}
                        className="w-full flex items-center justify-between px-5 py-3 text-sm font-medium text-gray-700 hover:text-ind hover:bg-ind/5 transition-colors group"
                        aria-expanded={mobileMbbsOpen}
                      >
                        <div className="flex items-center gap-3">
                          <link.icon className="w-4 h-4 text-gray-400 group-hover:text-ind transition-colors shrink-0" />
                          {link.label}
                        </div>
                        <ChevronDown className={`w-3.5 h-3.5 text-gray-300 transition-transform duration-200 ${mobileMbbsOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {/* Country sub-links */}
                      <AnimatePresence>
                        {mobileMbbsOpen && (
                          <motion.div
                            key="mobile-mbbs"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1, transition: { duration: 0.22 } }}
                            exit={{ height: 0, opacity: 0, transition: { duration: 0.16 } }}
                            className="overflow-hidden bg-[#F5F5F8]"
                          >
                            {/* All destinations link */}
                            <Link
                              href="/study-abroad"
                              onClick={closeDrawer}
                              className="flex items-center gap-3 px-8 py-2.5 text-xs font-semibold text-ind hover:bg-ind/5 transition-colors"
                            >
                              🌍 All MBBS Abroad Destinations
                            </Link>
                            {MBBS_MOBILE_LINKS.map((ml) => (
                              <Link
                                key={ml.href}
                                href={ml.href}
                                onClick={closeDrawer}
                                className="flex items-center justify-between px-8 py-2.5 text-xs text-gray-600 hover:text-ind hover:bg-ind/5 transition-colors"
                              >
                                <span>{ml.label}</span>
                                <span className="text-gray-400">{ml.fee}</span>
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeDrawer}
                      className="flex items-center justify-between px-5 py-3 text-sm font-medium text-gray-700 hover:text-ind hover:bg-ind/5 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <link.icon className="w-4 h-4 text-gray-400 group-hover:text-ind transition-colors shrink-0" />
                        {link.label}
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-ind transition-colors" />
                    </Link>
                  )
                )}
              </div>

              {/* Bottom CTAs */}
              <div className="p-4 border-t border-gray-100 space-y-2.5 bg-white">
                <a
                  href={`tel:${SITE.phone}`}
                  className="flex items-center justify-center gap-2 w-full py-2.5 border border-ind text-ind rounded-xl text-sm font-semibold hover:bg-ind/5 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Call Us Now
                </a>
                <a
                  href={SOCIAL.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 bg-wa text-white rounded-xl text-sm font-semibold hover:bg-wa/90 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp करें
                </a>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
