'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import {
  Phone, MessageCircle, Mail, MapPin, Clock, Send,
  Share2, Camera, ArrowRight, Headphones, Building2,
  Loader2, CheckCircle,
} from 'lucide-react'
import SectionWrapper from '@/components/shared/SectionWrapper'
import { Badge } from '@/components/ui/badge'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { cn } from '@/lib/utils'
import { SITE } from '@/lib/constants'
import {
  fadeInUp, fadeInLeft, fadeInRight,
  staggerContainer, viewportOnce, buttonTap,
} from '@/lib/animations'
import { contactSchema, type ContactFormData } from '@/lib/validations'
import {
  CONTACT_CHANNELS, NEARBY_OFFICES, FAQS_CONTACT,
  SOCIAL_CHANNELS, SUBJECT_OPTIONS, type ContactChannel,
} from '@/lib/contactData'

// ─── Icon map ─────────────────────────────────────────────────────────────────

import type { LucideProps } from 'lucide-react'
type IconComp = React.ComponentType<LucideProps>

const ICON_MAP: Record<string, IconComp> = {
  Phone, MessageCircle, Mail, MapPin, Share2, Camera,
}

function DynIcon({ name, ...props }: { name: string } & LucideProps) {
  const I = ICON_MAP[name]
  return I ? <I {...props} /> : null
}

// ─── Shared ───────────────────────────────────────────────────────────────────

function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <Badge className="bg-[#eeedf8] text-ind border-0 mb-3 font-hindi font-semibold">
      {children}
    </Badge>
  )
}

const inputCls =
  'w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-ind/40 focus:border-ind transition-colors'
const errorCls = 'mt-1 text-xs text-red-500 font-hindi'

// ─── Section 1: Hero ──────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section
      className="overflow-hidden py-14 md:py-20"
      style={{ background: '#1A183E' }}
      aria-label="Contact page hero"
    >
      <div className="mx-auto max-w-brand px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          {/* Badge */}
          <motion.div variants={fadeInUp}>
            <span className="inline-flex items-center gap-2 bg-[#FBD207]/15 text-[#FBD207] border border-[#FBD207]/30 rounded-full px-4 py-1.5 text-sm font-semibold mb-6">
              <Headphones className="w-4 h-4" /> हम यहाँ हैं — आपकी help के लिए
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            variants={fadeInUp}
            className="font-hindi font-black text-white leading-snug mb-4"
            style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)' }}
          >
            हमसे बात करें —{' '}
            <span className="text-[#FBD207]">Free Counseling लें!</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={fadeInUp}
            className="text-white/70 text-sm sm:text-base leading-relaxed max-w-xl mx-auto mb-8 font-hindi"
          >
            Phone, WhatsApp, email, या office visit — जो आपको easy लगे।
            हमारे experts Mon–Sat 9AM–7PM available हैं।
            कोई hidden charges नहीं, कोई obligation नहीं।
          </motion.p>

          {/* Quick-action pills */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap gap-3 justify-center"
          >
            <motion.a
              href={`tel:${SITE.phone}`}
              whileTap={buttonTap}
              className="inline-flex items-center gap-2 bg-white/10 border border-white/25 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-white/15 transition-colors"
              aria-label="Call CAE"
            >
              <Phone className="w-4 h-4" /> Call करें
            </motion.a>
            <motion.a
              href={`https://wa.me/${SITE.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              whileTap={buttonTap}
              className="inline-flex items-center gap-2 bg-[#25D366] text-white px-5 py-2.5 rounded-full text-sm font-medium"
              aria-label="WhatsApp CAE"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </motion.a>
            <motion.a
              href={`mailto:${SITE.email}`}
              whileTap={buttonTap}
              className="inline-flex items-center gap-2 bg-white/10 border border-white/25 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-white/15 transition-colors"
              aria-label="Email CAE"
            >
              <Mail className="w-4 h-4" /> Email
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Section 2: 4 Channel Cards ───────────────────────────────────────────────

function ChannelCard({ ch }: { ch: ContactChannel }) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -5, scale: 1.02 }}
      className={cn(
        'rounded-2xl border-2 p-6 flex flex-col items-center text-center gap-4',
        ch.bg,
      )}
      style={{ borderColor: ch.borderColor }}
    >
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center"
        style={{ background: `${ch.borderColor}18` }}
      >
        <DynIcon name={ch.iconName} className="w-6 h-6" style={{ color: ch.borderColor }} />
      </div>

      <div>
        <p className="font-bold text-[#1A1840] text-base font-hindi">{ch.label}</p>
        <p className="text-xs text-[#8B88AA] mt-1">{ch.subtext}</p>
      </div>

      <motion.a
        href={ch.href}
        target={ch.external ? '_blank' : undefined}
        rel={ch.external ? 'noopener noreferrer' : undefined}
        whileHover={{ scale: 1.04 }}
        whileTap={buttonTap}
        className={cn(
          'font-bold text-sm px-5 py-2.5 rounded-xl w-full text-center mt-auto font-hindi',
          ch.ctaBg,
        )}
        aria-label={ch.label}
      >
        {ch.ctaText}
      </motion.a>
    </motion.div>
  )
}

function ChannelsSection() {
  return (
    <SectionWrapper outerClassName="bg-white" className="py-14" animate={false}>
      <div className="text-center mb-10">
        <SectionTag>Contact करें</SectionTag>
        <h2
          className="font-hindi font-black text-ind"
          style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
        >
          कैसे Contact करें?
        </h2>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        {CONTACT_CHANNELS.map((ch) => (
          <ChannelCard key={ch.id} ch={ch} />
        ))}
      </motion.div>
    </SectionWrapper>
  )
}

// ─── Section 3: Contact Form + Map ────────────────────────────────────────────

function ContactFormCard() {
  const [submitted, setSubmitted] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({ resolver: zodResolver(contactSchema) })

  const onSubmit = async (data: ContactFormData) => {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed')
      toast.success(`धन्यवाद ${data.name}! हम 24 घंटे में reply करेंगे। 📨`)
      setSubmitted(true)
      reset()
    } catch {
      toast.error(`कुछ गड़बड़ हुआ। Please WhatsApp करें।`)
    }
  }

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-sm flex flex-col items-center justify-center text-center gap-4 min-h-[400px]">
        <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-green-500" />
        </div>
        <h3 className="font-hindi font-bold text-ind text-xl">Message मिल गया!</h3>
        <p className="text-[#4A4570] text-sm font-hindi">हम 24 घंटे में reply करेंगे।</p>
        <motion.button
          whileTap={buttonTap}
          onClick={() => setSubmitted(false)}
          className="text-ind text-sm font-semibold underline underline-offset-2"
        >
          एक और message भेजें
        </motion.button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      {/* Accent bar */}
      <div className="h-1 bg-gradient-to-r from-ind to-pur" />
      <div className="p-6 md:p-8">
        <h3 className="font-hindi font-bold text-ind text-xl mb-1">
          Message भेजें — हम जवाब देंगे
        </h3>
        <p className="text-[#8B88AA] text-xs mb-5 font-hindi">
          Free में पूछें — college, MBBS, BSCC loan, कुछ भी।
        </p>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
          {/* Name + Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <input
                {...register('name')}
                placeholder="आपका नाम *"
                className={inputCls}
                aria-label="Your name"
              />
              {errors.name && <p className={errorCls}>{errors.name.message}</p>}
            </div>
            <div>
              <input
                {...register('phone')}
                placeholder="Phone Number *"
                type="tel"
                inputMode="numeric"
                maxLength={10}
                className={inputCls}
                aria-label="Phone number"
              />
              {errors.phone && <p className={errorCls}>{errors.phone.message}</p>}
            </div>
          </div>

          {/* Email */}
          <div>
            <input
              {...register('email')}
              placeholder="Email (optional)"
              type="email"
              className={inputCls}
              aria-label="Email address"
            />
          </div>

          {/* Subject */}
          <div>
            <select
              {...register('subject')}
              defaultValue=""
              className={cn(inputCls, 'appearance-none cursor-pointer')}
              aria-label="Subject"
            >
              <option value="" disabled>किस बारे में पूछना है? *</option>
              {SUBJECT_OPTIONS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            {errors.subject && <p className={errorCls}>{errors.subject.message}</p>}
          </div>

          {/* Message */}
          <div>
            <textarea
              {...register('message')}
              placeholder="आपका Message *"
              rows={4}
              className={cn(inputCls, 'resize-none')}
              aria-label="Your message"
            />
            {errors.message && <p className={errorCls}>{errors.message.message}</p>}
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileTap={buttonTap}
            className="w-full bg-ind text-white font-bold py-3 rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-ind/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed font-hindi"
            aria-label="Send message"
          >
            {isSubmitting ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</>
            ) : (
              <><Send className="w-4 h-4" /> Message भेजें →</>
            )}
          </motion.button>

          <p className="text-center text-[11px] text-gray-400">
            🔒 आपकी जानकारी safe है। Spam नहीं होगा।
          </p>
        </form>
      </div>
    </div>
  )
}

function MapColumn() {
  return (
    <div className="flex flex-col gap-4">
      {/* Map iframe */}
      <div className="rounded-2xl overflow-hidden h-[260px] md:h-[300px] border border-bdr">
        <iframe
          src="https://maps.google.com/maps?q=Motihari+Bihar+845401&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          title="Career Ambition Education Motihari office location"
          aria-label="Google Map showing CAE office in Motihari Bihar"
        />
      </div>

      {/* HQ info card */}
      <div className="bg-white rounded-xl border border-bdr p-5 space-y-3">
        <div className="flex items-start gap-3">
          <Building2 className="w-4 h-4 text-ind shrink-0 mt-0.5" />
          <p className="text-sm font-bold text-[#1A1840]">{SITE.name}</p>
        </div>
        <div className="flex items-start gap-3">
          <MapPin className="w-4 h-4 text-ind shrink-0 mt-0.5" />
          <p className="text-sm text-[#4A4570]">{SITE.address}</p>
        </div>
        <div className="flex items-center gap-3">
          <Clock className="w-4 h-4 text-ind shrink-0" />
          <p className="text-sm text-[#4A4570]">{SITE.hours}</p>
        </div>
        <div className="flex items-center gap-3">
          <Mail className="w-4 h-4 text-ind shrink-0" />
          <p className="text-sm text-[#4A4570] break-all">{SITE.email}</p>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 pt-1">
          <motion.a
            href={`tel:${SITE.phone}`}
            whileTap={buttonTap}
            className="flex-1 flex items-center justify-center gap-1.5 bg-ind text-white font-bold text-xs px-3 py-2 rounded-lg"
            aria-label="Call CAE"
          >
            <Phone className="w-3.5 h-3.5" /> Call करें
          </motion.a>
          <motion.a
            href={`https://wa.me/${SITE.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            whileTap={buttonTap}
            className="flex-1 flex items-center justify-center gap-1.5 bg-[#25D366] text-white font-bold text-xs px-3 py-2 rounded-lg"
            aria-label="WhatsApp CAE"
          >
            <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
          </motion.a>
        </div>

        <motion.a
          href="https://maps.google.com/?q=Motihari+Bihar+845401"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ x: 4 }}
          className="inline-flex items-center gap-1 text-ind text-xs font-semibold"
          aria-label="Open in Google Maps"
        >
          Google Maps में खोलें <ArrowRight className="w-3 h-3" />
        </motion.a>
      </div>
    </div>
  )
}

function FormMapSection() {
  return (
    <SectionWrapper outerClassName="bg-[#F5F5F8]" className="py-16" animate={false}>
      <div className="text-center mb-10">
        <SectionTag>Message करें</SectionTag>
        <h2
          className="font-hindi font-black text-ind"
          style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
        >
          Form भरें या हमें ढूंढें
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <motion.div
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <ContactFormCard />
        </motion.div>

        <motion.div
          variants={fadeInRight}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <MapColumn />
        </motion.div>
      </div>
    </SectionWrapper>
  )
}

// ─── Section 4: Nearby Offices ────────────────────────────────────────────────

function OfficesSection() {
  return (
    <SectionWrapper outerClassName="bg-white" className="py-14" animate={false}>
      <div className="text-center mb-10">
        <SectionTag>हमारे Offices</SectionTag>
        <h2
          className="font-hindi font-black text-ind mb-2"
          style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
        >
          हमारे Nearby Offices
        </h2>
        <p className="text-[#4A4570] text-sm font-hindi">
          20 offices across Bihar — aapke nearest office se bhi contact kar sakte ho।
        </p>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6"
      >
        {NEARBY_OFFICES.map((office) => (
          <motion.div
            key={office.city}
            variants={fadeInUp}
            whileHover={{ scale: 1.05, borderColor: '#2E2567', backgroundColor: '#eeedf8' }}
            className="border border-bdr rounded-xl p-4 text-center cursor-pointer transition-colors"
          >
            {office.tag && (
              <Badge className="bg-yel text-ind text-[10px] font-bold mb-1 border-0 block w-fit mx-auto">
                {office.tag}
              </Badge>
            )}
            <p className="font-bold text-[#1A1840] text-sm flex items-center justify-center gap-1">
              <MapPin className="w-3 h-3 text-ind shrink-0" /> {office.city}
            </p>
            <p className="text-[11px] text-[#8B88AA] mt-0.5">{office.note}</p>
          </motion.div>
        ))}
      </motion.div>

      <div className="text-center">
        <motion.a
          href={`tel:${SITE.phone}`}
          whileTap={buttonTap}
          className="inline-flex items-center gap-2 bg-[#eeedf8] text-ind font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-ind hover:text-white transition-colors"
          aria-label="Call for all office info"
        >
          <Phone className="w-4 h-4" /> All 20 offices की details के लिए Call करें
        </motion.a>
      </div>
    </SectionWrapper>
  )
}

// ─── Section 5: Social Media ──────────────────────────────────────────────────

function SocialSection() {
  return (
    <SectionWrapper outerClassName="bg-[#F5F5F8]" className="py-12" animate={false}>
      <div className="text-center mb-10">
        <SectionTag>Social Media</SectionTag>
        <h2
          className="font-hindi font-black text-ind mb-2"
          style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
        >
          Social Media पर Follow करें
        </h2>
        <p className="text-[#4A4570] text-sm font-hindi">
          Latest updates, success stories, aur college guidance tips।
        </p>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid grid-cols-1 md:grid-cols-3 gap-5"
      >
        {SOCIAL_CHANNELS.map((social) => (
          <motion.a
            key={social.platform}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            variants={fadeInUp}
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className={cn('border-2 rounded-2xl p-6 flex flex-col gap-3', social.color)}
            style={{ borderColor: social.borderColor }}
            aria-label={`${social.platform} — ${social.handle}`}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: `${social.borderColor}18` }}
            >
              <DynIcon name={social.iconName} className="w-6 h-6" style={{ color: social.borderColor }} />
            </div>
            <div>
              <p className={cn('font-bold text-base', social.textColor)}>{social.platform}</p>
              <p className="text-sm text-[#4A4570] font-medium">{social.handle}</p>
              <p className="text-xs text-[#8B88AA] mt-1">{social.desc}</p>
            </div>
            <motion.span
              whileHover={{ x: 4 }}
              className={cn('text-sm font-bold flex items-center gap-1 mt-auto', social.textColor)}
            >
              {social.cta} <ArrowRight className="w-3.5 h-3.5" />
            </motion.span>
          </motion.a>
        ))}
      </motion.div>
    </SectionWrapper>
  )
}

// ─── Section 6: FAQ + Final CTA ───────────────────────────────────────────────

function FaqSection() {
  return (
    <SectionWrapper outerClassName="bg-white" className="py-14" animate={false}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <SectionTag>FAQ</SectionTag>
          <h2
            className="font-hindi font-black text-ind"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
          >
            Contact से जुड़े Common Questions
          </h2>
        </div>

        <Accordion multiple={false} className="space-y-3 mb-10">
          {FAQS_CONTACT.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="bg-white rounded-[14px] border border-bdr px-5 shadow-sm"
            >
              <AccordionTrigger className="font-hindi text-ind font-semibold text-sm text-left hover:no-underline py-4">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="font-hindi text-gray-600 text-sm pb-4 leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Final CTA */}
        <div className="bg-[#eeedf8] rounded-2xl p-6 text-center">
          <p className="font-hindi font-bold text-ind text-lg mb-2">
            अभी भी कोई सवाल है?
          </p>
          <p className="text-pur text-sm mb-5 font-hindi">
            WhatsApp पर पूछें — 30 minutes में reply मिलेगी।
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <motion.a
              href={`https://wa.me/${SITE.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              whileTap={buttonTap}
              className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold px-6 py-3 rounded-xl text-sm font-hindi"
              aria-label="WhatsApp CAE"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp करें →
            </motion.a>
            <motion.a
              href={`tel:${SITE.phone}`}
              whileTap={buttonTap}
              className="inline-flex items-center gap-2 bg-ind text-white font-bold px-6 py-3 rounded-xl text-sm font-hindi"
              aria-label="Call CAE"
            >
              <Phone className="w-4 h-4" /> Call करें →
            </motion.a>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function ContactContent() {
  return (
    <main>
      <HeroSection />
      <ChannelsSection />
      <FormMapSection />
      <OfficesSection />
      <SocialSection />
      <FaqSection />
    </main>
  )
}
