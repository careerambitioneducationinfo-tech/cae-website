import { MapPin, Clock, Phone, Mail } from 'lucide-react'
import { SITE } from '@/lib/constants'

export default function Topbar() {
  return (
    <div className="bg-dk text-white/80 text-xs py-1.5">
      <div className="mx-auto max-w-brand px-4 sm:px-6 lg:px-8">
        {/* Desktop layout */}
        <div className="hidden sm:flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 shrink-0" />
              Motihari, Bihar
            </span>
            <span className="text-white/30">|</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 shrink-0" />
              {SITE.hours}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={`tel:${SITE.phone}`}
              className="flex items-center gap-1 hover:text-yel transition-colors"
            >
              <Phone className="w-3 h-3 shrink-0" />
              {SITE.phone}
            </a>
            <span className="text-white/30">|</span>
            <a
              href={`mailto:${SITE.email}`}
              className="flex items-center gap-1 hover:text-yel transition-colors"
            >
              <Mail className="w-3 h-3 shrink-0" />
              {SITE.email}
            </a>
          </div>
        </div>

        {/* Mobile layout — phone only */}
        <div className="flex sm:hidden items-center justify-center">
          <a
            href={`tel:${SITE.phone}`}
            className="flex items-center gap-1 hover:text-yel transition-colors"
          >
            <Phone className="w-3 h-3 shrink-0" />
            {SITE.phone} — Mon–Sat 9AM–7PM
          </a>
        </div>
      </div>
    </div>
  )
}
