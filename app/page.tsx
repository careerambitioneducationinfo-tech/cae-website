import type { Metadata } from 'next'
import HeroSection from './_sections/HeroSection'
import StatsBar from './_sections/StatsBar'
import AttentionHookSection from './_sections/AttentionHookSection'
import ServicesSection from './_sections/ServicesSection'
import CoursesSection from './_sections/CoursesSection'
import MBBSAbroadSection from './_sections/MBBSAbroadSection'
import BSSCLoanSection from './_sections/BSSCLoanSection'
import CTAFormSection from './_sections/CTAFormSection'
import PartnerCollegesSection from './_sections/PartnerCollegesSection'
import TestimonialsSection from './_sections/TestimonialsSection'
import AboutSection from './_sections/AboutSection'
import FAQSection from './_sections/FAQSection'
import FinalCTABanner from './_sections/FinalCTABanner'

export const metadata: Metadata = {
  title: 'Free College Admission Guidance in Bihar | Career Ambition Education',
  description:
    "Bihar's #1 education consultancy since 2009. Free college admission counseling, MBBS Abroad, BSCC Loan. 10,000+ students helped. Motihari.",
  keywords:
    'college admission bihar, career counseling motihari, MBBS abroad bihar, BSCC loan bihar',
}

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <StatsBar />
      <AttentionHookSection />
      <ServicesSection />
      <CoursesSection />
      <MBBSAbroadSection />
      <BSSCLoanSection />
      <CTAFormSection />
      <PartnerCollegesSection />
      <TestimonialsSection />
      <AboutSection />
      <FAQSection />
      <FinalCTABanner />
    </main>
  )
}
