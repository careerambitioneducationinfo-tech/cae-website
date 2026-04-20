'use client'

import { motion } from 'framer-motion'
import {
  GraduationCap, Stethoscope, Plane,
  TrendingUp, Banknote, Users, ArrowRight,
} from 'lucide-react'
import SectionWrapper from '@/components/shared/SectionWrapper'
import { staggerContainer, fadeInUp, cardHover } from '@/lib/animations'

interface ServiceCard {
  icon: React.ElementType
  title: string
  desc: string
  href: string
}

const SERVICES: ServiceCard[] = [
  {
    icon: GraduationCap,
    title: 'College Admission',
    desc: 'B.Tech, MBBS, MBA — marks और budget के हिसाब से best college shortlist। Complete support।',
    href: '/courses',
  },
  {
    icon: Stethoscope,
    title: 'MBBS India',
    desc: 'Government & Private Medical Colleges। NEET counseling experts। Direct admission support।',
    href: '/courses',
  },
  {
    icon: Plane,
    title: 'MBBS Abroad',
    desc: 'Russia, Uzbekistan, Kazakhstan — NMC/WHO approved। Visa, travel, hostel सब CAE handle करेगा।',
    href: '/study-abroad',
  },
  {
    icon: Banknote,
    title: 'BSCC Loan',
    desc: '₹4 Lakh तक — 0% interest। Bihar Student Credit Card। CAE free में process करता है।',
    href: '/bscc-loan',
  },
  {
    icon: TrendingUp,
    title: 'MBA / Management',
    desc: 'Top management colleges — CAT/MAT/CMAT guidance। IIM, XLRI, private MBA programs।',
    href: '/courses',
  },
  {
    icon: Users,
    title: 'Career Counseling',
    desc: 'Expert counselors — aptitude test, career mapping, college shortlisting। Bilkul free।',
    href: '/contact',
  },
]

export default function ServicesSection() {
  return (
    <SectionWrapper id="services" className="py-16" animate={false}>
      {/* Section header */}
      <div className="text-center mb-10">
        <span className="inline-block bg-il text-ind text-xs font-semibold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
          हमारी Services
        </span>
        <h2 className="font-hindi font-bold text-ind text-3xl sm:text-4xl mb-3">
          हम क्या करते हैं आपके लिए?
        </h2>
        <p className="text-gray-500 max-w-xl mx-auto text-base font-hindi">
          12th के बाद हर step पर CAE आपके साथ है — college से लेकर career तक।
        </p>
      </div>

      {/* Cards grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {SERVICES.map((service) => (
          <motion.a
            key={service.title}
            href={service.href}
            variants={fadeInUp}
            whileHover={cardHover.hover}
            whileTap={{ scale: 0.98 }}
            className="bg-white rounded-brand p-6 shadow-sm border border-gray-100 border-t-4 border-t-ind cursor-pointer block group"
            aria-label={service.title}
          >
            <div className="w-11 h-11 bg-il rounded-xl flex items-center justify-center mb-4">
              <service.icon className="w-5 h-5 text-ind" />
            </div>
            <h3 className="font-bold text-ind text-base mb-2">{service.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed font-hindi mb-3">{service.desc}</p>
            <span className="inline-flex items-center gap-1 text-ind text-xs font-semibold group-hover:gap-2 transition-all">
              और जानें <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </motion.a>
        ))}
      </motion.div>
    </SectionWrapper>
  )
}
