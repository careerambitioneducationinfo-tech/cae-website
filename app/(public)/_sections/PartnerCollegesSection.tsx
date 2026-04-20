'use client'

import Image from 'next/image'

const LOGOS = [
  { name: 'Amity University',         file: 'amity.webp' },
  { name: 'Bennett University',       file: 'bennetuni.webp' },
  { name: 'Chandigarh University',    file: 'chandigarhni.webp' },
  { name: 'GNIOT',                    file: 'gniot.webp' },
  { name: 'IIMT University',          file: 'iimt.webp' },
  { name: 'Jain University',          file: 'jain.webp' },
  { name: 'Kalinga University',       file: 'kalinga.webp' },
  { name: 'Parul University',         file: 'parul.webp' },
  { name: 'Sharda University',        file: 'shardha uni.webp' },
  { name: 'SRM University',           file: 'srm.webp' },
]

// Duplicate for seamless infinite loop
const DOUBLED = [...LOGOS, ...LOGOS]

export default function PartnerCollegesSection() {
  return (
    <section className="bg-white py-12 overflow-hidden" aria-label="Partner colleges">
      {/* Heading */}
      <div className="mx-auto max-w-brand px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <h2 className="font-hindi font-bold text-ind text-2xl sm:text-3xl mb-1">
          100+ Partner Colleges
        </h2>
        <p className="text-gray-500 text-sm font-hindi">
          India के top NAAC accredited colleges में direct admission — BSCC Eligible
        </p>
      </div>

      {/* Marquee */}
      <div className="relative w-full overflow-hidden">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div
          className="flex items-center gap-4 w-max animate-marquee"
          style={{ willChange: 'transform' }}
          aria-hidden="true"
        >
          {DOUBLED.map((college, i) => (
            <div
              key={`${college.file}-${i}`}
              className="flex items-center justify-center shrink-0 w-40 h-20 bg-white border border-bdr rounded-2xl px-5 py-3 shadow-sm hover:shadow-md hover:border-ind/20 transition-all"
            >
              <Image
                src={`/icons/${college.file}`}
                alt={`${college.name} logo`}
                width={120}
                height={48}
                className="object-contain max-h-12 w-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
