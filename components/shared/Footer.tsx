import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react'
import { SITE, SOCIAL, TAGLINES } from '@/lib/constants'

const QUICK_LINKS = [
  { label: 'होम', href: '/' },
  { label: 'Courses', href: '/courses' },
  { label: 'MBBS Abroad', href: '/study-abroad' },
  { label: 'BSCC Loan', href: '/bscc-loan' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Blog', href: '/blog' },
]

const COURSES = [
  'B.Tech / Engineering',
  'MBBS India',
  'MBBS Abroad',
  'MBA / BBA',
  'B.Sc Nursing',
  'B.Pharma',
  'LLB',
]

export default function Footer() {
  return (
    <footer className="bg-dk text-white">
      <div className="mx-auto max-w-brand px-4 sm:px-6 lg:px-8 pt-14 pb-6">
        {/* 4-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-white/10">
          {/* Col 1 — Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <Image
                src="/icons/cae logo.png"
                alt="Career Ambition Education logo"
                width={40}
                height={40}
                className="h-10 w-10 object-contain shrink-0"
              />
              <div>
                <p className="font-bold text-white text-sm leading-tight">{SITE.name}</p>
                <p className="text-white/50 text-[11px]">Bihar&apos;s #1 College Counseling</p>
              </div>
            </div>
            <p className="font-hindi text-white/70 text-sm leading-relaxed mb-4">
              {TAGLINES.T2_line1}
            </p>
            <div className="flex items-center gap-3 text-white/60 text-sm">
              <a
                href={SOCIAL.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yel transition-colors"
                aria-label="Facebook"
              >
                FB
              </a>
              <span className="text-white/20">·</span>
              <a
                href={SOCIAL.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yel transition-colors"
                aria-label="Instagram"
              >
                IG
              </a>
              <span className="text-white/20">·</span>
              <a
                href={SOCIAL.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yel transition-colors"
                aria-label="WhatsApp"
              >
                WA
              </a>
            </div>
          </div>

          {/* Col 2 — Quick Links */}
          <div>
            <h3 className="font-semibold text-white text-sm mb-3 uppercase tracking-wider text-white/60">
              Quick Links
            </h3>
            <ul className="space-y-1.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 text-sm hover:text-yel transition-colors font-hindi"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Courses */}
          <div>
            <h3 className="font-semibold text-sm mb-3 uppercase tracking-wider text-white/60">
              Popular Courses
            </h3>
            <ul className="space-y-1.5">
              {COURSES.map((course) => (
                <li key={course}>
                  <Link
                    href="/courses"
                    className="text-white/60 text-sm hover:text-yel transition-colors"
                  >
                    {course}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <h3 className="font-semibold text-sm mb-3 uppercase tracking-wider text-white/60">
              Contact Us
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-white/60 text-sm">
                <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0 text-yel" />
                {SITE.address}
              </li>
              <li>
                <a
                  href={`tel:${SITE.phone}`}
                  className="flex items-center gap-2 text-white/60 text-sm hover:text-yel transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 shrink-0 text-yel" />
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-center gap-2 text-white/60 text-sm hover:text-yel transition-colors break-all"
                >
                  <Mail className="w-3.5 h-3.5 shrink-0 text-yel" />
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-center gap-2 text-white/60 text-sm">
                <Clock className="w-3.5 h-3.5 shrink-0 text-yel" />
                {SITE.hours}
              </li>
              <li className="pt-1">
                <a
                  href={SOCIAL.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-wa text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-wa/90 transition-colors"
                  aria-label="WhatsApp us"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp करें
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-white/40 text-xs">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p>Made with ❤️ for Bihar&apos;s students</p>
        </div>
      </div>
    </footer>
  )
}
