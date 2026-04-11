'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Bot } from 'lucide-react'
import { SITE, SOCIAL } from '@/lib/constants'
import { useNav } from '@/lib/nav-context'

function WhatsAppIcon({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.68 4.61 1.857 6.497L4 29l7.765-1.82A11.94 11.94 0 0 0 16 27c6.627 0 12-5.373 12-12S22.627 3 16 3z" fill="white" />
      <path d="M16 5.5c-5.238 0-9.5 4.262-9.5 9.5 0 2.1.685 4.044 1.843 5.618l-1.2 4.439 4.573-1.167A9.46 9.46 0 0 0 16 24.5c5.238 0 9.5-4.262 9.5-9.5S21.238 5.5 16 5.5zm4.703 13.118c-.196.551-1.14 1.055-1.567 1.12-.4.06-.906.085-1.462-.092a13.5 13.5 0 0 1-1.325-.49c-2.33-1.006-3.853-3.35-3.97-3.507-.117-.156-.95-1.263-.95-2.41 0-1.148.602-1.713.815-1.946.214-.234.466-.292.622-.292l.446.008c.143.006.334-.054.523.4.196.47.664 1.622.722 1.74.058.117.097.254.02.41-.078.155-.117.252-.234.389-.117.136-.246.304-.351.408-.117.117-.239.244-.103.478.136.234.605.997 1.299 1.614.893.795 1.647 1.041 1.88 1.159.234.117.37.097.506-.058.136-.156.584-.682.74-.916.155-.234.311-.195.526-.117.214.078 1.362.642 1.596.76.234.117.39.175.447.272.058.098.058.565-.138 1.116z" fill="#25D366" />
    </svg>
  )
}

export default function FloatingWidget() {
  const { drawerOpen } = useNav()

  return (
    <>
      {/* ══ DESKTOP — 3 stacked buttons, bottom-right ══ */}
      <div className="hidden lg:flex fixed bottom-6 right-5 z-[9999] flex-col items-center gap-3">

        {/* 1. Chatbot — Railway script renders its own button; this triggers it */}
        <motion.button
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1, transition: { delay: 0, duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.93 }}
          aria-label="Open AI chatbot"
          className="w-14 h-14 bg-gradient-to-br from-pur to-ind rounded-full flex items-center justify-center shadow-xl shadow-pur/40"
        >
          <span className="flex flex-col items-center justify-center gap-0.5">
            <Bot className="w-6 h-6 text-white" />
            <span className="text-[9px] font-bold text-yel leading-none">AI</span>
          </span>
        </motion.button>

        {/* 2. WhatsApp */}
        <motion.a
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1, transition: { delay: 0.08, duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
          href={SOCIAL.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp us"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.93 }}
          className="w-14 h-14 bg-wa rounded-full flex items-center justify-center shadow-lg shadow-wa/30"
        >
          <WhatsAppIcon size={26} />
        </motion.a>

        {/* 3. Call */}
        <motion.a
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1, transition: { delay: 0.16, duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
          href={`tel:${SITE.phone}`}
          aria-label={`Call ${SITE.phone}`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.93 }}
          className="w-14 h-14 bg-ind rounded-full flex items-center justify-center shadow-lg shadow-ind/30"
        >
          <Phone className="w-6 h-6 text-yel" />
        </motion.a>
      </div>

      {/* ══ MOBILE — pill bar only (Railway script renders its own chatbot button) ══ */}
      <div className="lg:hidden">
        <AnimatePresence>
          {!drawerOpen && (
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }}
              exit={{ y: 80, opacity: 0, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } }}
              className="fixed bottom-0 left-0 right-0 z-[9999] bg-white/95 backdrop-blur-sm border-t border-gray-200 px-3 py-3"
            >
              <div className="flex gap-2">
                <a
                  href={`tel:${SITE.phone}`}
                  aria-label="Call us now"
                  className="flex-1 flex items-center justify-center gap-2 bg-ind text-white font-bold text-sm py-3.5 rounded-full"
                >
                  <Phone className="w-4 h-4 text-yel shrink-0" />
                  Call Now
                </a>
                <a
                  href={SOCIAL.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp us"
                  className="flex-1 flex items-center justify-center gap-2 bg-wa text-white font-bold text-sm py-3.5 rounded-full"
                >
                  <WhatsAppIcon size={18} />
                  WhatsApp
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
