'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import Image from 'next/image'
import LeadForm from '@/components/forms/LeadForm'
import { markPopupShown, markLeadSubmitted, hasSubmittedLead } from '@/lib/popup'
import { popupEntry, overlayVariants } from '@/lib/animations'
import { TAGLINES } from '@/lib/constants'

const LOGOS = [
  { name: 'Amity University',      file: 'amity.png' },
  { name: 'Bennett University',    file: 'bennetuni.png' },
  { name: 'Chandigarh University', file: 'chandigarhni.png' },
  { name: 'GNIOT',                 file: 'gniot.png' },
  { name: 'IIMT University',       file: 'iimt.png' },
  { name: 'Jain University',       file: 'jain.png' },
  { name: 'Kalinga University',    file: 'kalinga.png' },
  { name: 'Parul University',      file: 'parul.png' },
  { name: 'Sharda University',     file: 'shardha uni.png' },
  { name: 'SRM University',        file: 'srm.png' },
]

const DOUBLED = [...LOGOS, ...LOGOS]

export default function PopupController() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // Homepage: ALWAYS show on every page load — no exceptions
    if (pathname === '/') {
      const timer = setTimeout(() => setIsOpen(true), 500)
      return () => clearTimeout(timer)
    }

    // Other pages: show once per 24h (skip if lead already submitted)
    if (hasSubmittedLead()) return
    const raw = localStorage.getItem('cae_popup_shown')
    const shownAt = raw ? parseInt(raw, 10) : 0
    const ttl = 24 * 60 * 60 * 1000
    if (!raw || Date.now() - shownAt > ttl) {
      const timer = setTimeout(() => setIsOpen(true), 2000)
      return () => clearTimeout(timer)
    }
  }, [pathname])

  const handleClose = () => {
    setIsOpen(false)
    markPopupShown()
  }

  const handleSuccess = () => {
    setIsOpen(false)
    markLeadSubmitted()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="popup-backdrop"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={handleClose}
            className="fixed inset-0 bg-black/65 backdrop-blur-sm z-[60]"
            aria-hidden="true"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[61] flex items-center justify-center pointer-events-none"
            style={{ padding: '1rem 1rem calc(1rem + 80px)', paddingBottom: 'max(1rem, calc(80px + env(safe-area-inset-bottom)))' }}
          >
            <motion.div
              key="popup-modal"
              variants={popupEntry}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="pointer-events-auto bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:max-h-[calc(100dvh-2rem)]"
              style={{ maxHeight: 'calc(100dvh - 100px)' }}
            >
              {/* ── Header ── */}
              <div className="bg-dk px-5 pt-5 pb-4 shrink-0">
                {/* Close */}
                <div className="flex items-start justify-between mb-4">
                  {/* CAE Logo */}
                  <div className="flex items-center gap-2.5">
                    <Image
                      src="/icons/cae logo.png"
                      alt="Career Ambition Education logo"
                      width={40}
                      height={40}
                      className="h-10 w-10 object-contain shrink-0"
                    />
                    <div>
                      <p className="font-bold text-white text-sm leading-none">Career Ambition Education</p>
                      <p className="text-white/50 text-[10px] leading-none mt-0.5">Bihar&apos;s #1 Counseling</p>
                    </div>
                  </div>
                  <button
                    onClick={handleClose}
                    aria-label="Close popup"
                    className="p-1.5 text-white/50 hover:text-white transition-colors rounded-lg hover:bg-white/10 shrink-0 mt-0.5"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* T2 taglines */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-yel rounded-full shrink-0" />
                    <p className="font-hindi text-white/85 text-sm">{TAGLINES.T2_line1}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-yel rounded-full shrink-0" />
                    <p className="font-hindi text-white/85 text-sm">{TAGLINES.T2_line2}</p>
                  </div>
                </div>
              </div>

              {/* ── College logo marquee ── */}
              <div className="bg-white border-b border-gray-100 py-3 overflow-hidden shrink-0 relative">
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
                <motion.div
                  animate={{ x: ['0%', '-50%'] }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="flex items-center gap-3 w-max"
                  aria-hidden="true"
                >
                  {DOUBLED.map((logo, i) => (
                    <div
                      key={`${logo.file}-${i}`}
                      className="shrink-0 w-20 h-10 flex items-center justify-center"
                    >
                      <Image
                        src={`/icons/${logo.file}`}
                        alt={`${logo.name} logo`}
                        width={80}
                        height={40}
                        className="object-contain max-h-9 w-full"
                      />
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* ── Form ── */}
              <div className="flex-1 overflow-y-auto px-5 py-4">
                <h2 className="font-hindi font-bold text-ind text-lg leading-tight mb-0.5">
                  Free Counseling बुक करें 🎓
                </h2>
                <p className="text-gray-400 text-xs mb-4 font-hindi">
                  हमारे experts 2 घंटे में call करेंगे।
                </p>
                <LeadForm
                  sourcePage="popup"
                  compact={true}
                  onSuccess={handleSuccess}
                />
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
