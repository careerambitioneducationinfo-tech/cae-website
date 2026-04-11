'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Maximize2, Volume2, VolumeX } from 'lucide-react'

type WidgetState = 'mini' | 'expanded' | 'hidden'

export default function VideoWidget() {
  const [state, setState] = useState<WidgetState>('mini')
  const [muted, setMuted] = useState(true)
  const miniRef = useRef<HTMLVideoElement>(null)
  const fullRef  = useRef<HTMLVideoElement>(null)

  // Sync time between mini and full video when expanding/collapsing
  const expand = () => {
    const t = miniRef.current?.currentTime ?? 0
    setMuted(false)
    setState('expanded')
    requestAnimationFrame(() => {
      if (fullRef.current) {
        fullRef.current.currentTime = t
        fullRef.current.play().catch(() => {})
      }
    })
  }

  const collapse = () => {
    const t = fullRef.current?.currentTime ?? 0
    setState('mini')
    setMuted(true)
    requestAnimationFrame(() => {
      if (miniRef.current) {
        miniRef.current.currentTime = t
        miniRef.current.muted = true
        miniRef.current.play().catch(() => {})
      }
    })
  }

  // Lock body scroll when expanded (mobile)
  useEffect(() => {
    if (state === 'expanded') {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [state])

  // Escape key closes popup
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && state === 'expanded') collapse()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [state])

  if (state === 'hidden') return null

  return (
    <>
      {/* ── Mini Card ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {state === 'mini' && (
          <motion.div
            key="mini"
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }}
            exit={{ opacity: 0, y: 20, scale: 0.9, transition: { duration: 0.25 } }}
            className="fixed bottom-20 left-3 sm:bottom-6 sm:left-5 z-50 group"
            style={{ willChange: 'transform' }}
          >
            {/* Card shell */}
            <div
              className="relative rounded-2xl overflow-hidden shadow-2xl cursor-pointer border-2 border-white/20
                         w-[110px] h-[155px] sm:w-[150px] sm:h-[210px]"
              style={{ background: '#1a1840' }}
              onClick={expand}
              role="button"
              aria-label="Expand video"
            >
              {/* Video */}
              <video
                ref={miniRef}
                src="/images/team/caevideo.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />

              {/* Gradient overlay — bottom label */}
              <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

              {/* Expand hint */}
              <div className="absolute bottom-2 left-0 right-0 flex items-center justify-center gap-1 pointer-events-none">
                <Maximize2 className="w-3 h-3 text-white/70" />
                <span className="text-white/70 text-[10px] font-semibold">Watch Video</span>
              </div>

              {/* Muted badge */}
              <div className="absolute top-2 left-2 bg-black/50 rounded-full p-1 pointer-events-none">
                <VolumeX className="w-2.5 h-2.5 text-white/60" />
              </div>
            </div>

            {/* Close (dismiss) button */}
            <button
              onClick={(e) => { e.stopPropagation(); setState('hidden') }}
              aria-label="Close video widget"
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gray-800 border border-white/20
                         flex items-center justify-center shadow-lg
                         opacity-0 group-hover:opacity-100 sm:opacity-100
                         transition-opacity duration-200 z-10"
            >
              <X className="w-3 h-3 text-white" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Expanded Popup ─────────────────────────────────────────── */}
      <AnimatePresence>
        {state === 'expanded' && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-black/80 z-[60] backdrop-blur-sm"
              onClick={collapse}
              aria-hidden="true"
            />

            {/* Video popup */}
            <motion.div
              key="popup"
              initial={{ opacity: 0, scale: 0.85, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }}
              exit={{ opacity: 0, scale: 0.9, y: 20, transition: { duration: 0.25 } }}
              className="fixed z-[70] inset-0 flex items-center justify-center p-4 sm:p-8 pointer-events-none"
            >
              <div
                className="relative pointer-events-auto rounded-2xl overflow-hidden shadow-2xl bg-black
                           w-full max-w-[320px] sm:max-w-[380px]"
                style={{ aspectRatio: '9/16' }}
                onClick={(e) => e.stopPropagation()}
              >
                <video
                  ref={fullRef}
                  src="/images/team/caevideo.mp4"
                  autoPlay
                  loop
                  playsInline
                  muted={muted}
                  className="w-full h-full object-cover"
                />

                {/* Top controls */}
                <div className="absolute top-3 right-3 flex items-center gap-2">
                  {/* Mute toggle */}
                  <button
                    onClick={() => setMuted((m) => !m)}
                    aria-label={muted ? 'Unmute video' : 'Mute video'}
                    className="w-8 h-8 rounded-full bg-black/60 border border-white/20 flex items-center justify-center"
                  >
                    {muted
                      ? <VolumeX className="w-4 h-4 text-white" />
                      : <Volume2 className="w-4 h-4 text-white" />
                    }
                  </button>

                  {/* Close popup → back to mini */}
                  <button
                    onClick={collapse}
                    aria-label="Minimize video"
                    className="w-8 h-8 rounded-full bg-black/60 border border-white/20 flex items-center justify-center"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
