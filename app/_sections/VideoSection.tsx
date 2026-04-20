'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, X, Volume2, VolumeX } from 'lucide-react'
import SectionWrapper from '@/components/shared/SectionWrapper'
import { fadeInUp, viewportOnce } from '@/lib/animations'

export default function VideoSection() {
  const [open, setOpen]       = useState(false)
  const [muted, setMuted]     = useState(false)
  const modalRef              = useRef<HTMLVideoElement>(null)

  function handleOpen() {
    setOpen(true)
  }

  function handleClose() {
    setOpen(false)
    if (modalRef.current) {
      modalRef.current.pause()
      modalRef.current.currentTime = 0
    }
  }

  return (
    <>
      <SectionWrapper
        id="our-story"
        outerClassName="bg-[#2D2563]"
        className="py-16"
        animate={false}
      >
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

          {/* Left — text */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="flex-1 text-center lg:text-left"
          >
            <span className="inline-block bg-white/10 text-white/70 text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
              हमारी Story
            </span>
            <h2 className="font-hindi font-bold text-white text-3xl sm:text-4xl mb-4">
              17 साल की मेहनत,<br />
              <span className="text-yel">एक Video में</span>
            </h2>
            <p className="text-white/60 text-base font-hindi max-w-md mx-auto lg:mx-0 leading-relaxed">
              देखिए कैसे CAE ने 10,000+ students की ज़िंदगी बदली।
              Click करके पूरी story जानें।
            </p>
          </motion.div>

          {/* Right — small portrait card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
            viewport={viewportOnce}
            className="shrink-0"
          >
            {/* Small portrait frame — click to expand */}
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleOpen}
              role="button"
              tabIndex={0}
              aria-label="Play CAE story video"
              onKeyDown={(e) => e.key === 'Enter' && handleOpen()}
              className="relative cursor-pointer rounded-[24px] overflow-hidden shadow-2xl shadow-black/50 border border-white/15"
              style={{ width: 140, aspectRatio: '9/16' }}
            >
              {/* Muted autoplay preview */}
              <video
                src="/images/team/caevideo.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                aria-hidden="true"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 bg-yel rounded-full flex items-center justify-center shadow-lg">
                  <Play className="w-4 h-4 text-dk fill-dk ml-0.5" />
                </div>
              </div>

              {/* Bottom label */}
              <div className="absolute bottom-3 left-0 right-0 text-center">
                <p className="text-white text-[10px] font-semibold tracking-wide">हमारी Story</p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </SectionWrapper>

      {/* Portrait modal — not fullscreen */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="video-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-6"
            onClick={handleClose}
          >
            <motion.div
              key="video-modal"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
              exit={{ scale: 0.75, opacity: 0, transition: { duration: 0.2 } }}
              onClick={(e) => e.stopPropagation()}
              className="relative rounded-[28px] overflow-hidden shadow-2xl border border-white/10 bg-black"
              style={{ width: 'min(340px, 80vw)', aspectRatio: '9/16' }}
            >
              <video
                ref={modalRef}
                src="/images/team/caevideo.mp4"
                autoPlay
                muted={muted}
                loop
                playsInline
                className="w-full h-full object-cover"
                aria-label="Career Ambition Education story video"
              />

              {/* Top controls */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                {/* Mute toggle */}
                <button
                  onClick={() => setMuted((m) => !m)}
                  aria-label={muted ? 'Unmute video' : 'Mute video'}
                  className="w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors"
                >
                  {muted
                    ? <VolumeX className="w-4 h-4 text-white" />
                    : <Volume2 className="w-4 h-4 text-white" />
                  }
                </button>

                {/* Close */}
                <button
                  onClick={handleClose}
                  aria-label="Close video"
                  className="w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
