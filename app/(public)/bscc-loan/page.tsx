import type { Metadata } from 'next'
import { Suspense } from 'react'
import { CheckCircle, GraduationCap } from 'lucide-react'
import SectionWrapper from '@/components/shared/SectionWrapper'
import LeadForm from '@/components/forms/LeadForm'
import { Badge } from '@/components/ui/badge'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import BsccContent from './BsccContent'
import { FAQS } from '@/lib/bsccData'

export const metadata: Metadata = {
  title: 'BSCC Loan Bihar — ₹4 Lakh 0% Interest | Career Ambition Education',
  description:
    'Apply for Bihar Student Credit Card (BSCC/DRCC) loan. ₹4 lakh at 0% effective interest. CAE has processed 3,000+ loans with 90%+ approval rate. Free service for students.',
  keywords:
    'BSCC loan bihar, DRCC loan apply, Bihar Student Credit Card, education loan bihar 0 interest, bscc loan motihari',
  openGraph: {
    title: 'BSCC Loan Bihar — ₹4 Lakh Free Education Loan | CAE',
    description: '3,000+ loans processed. 90%+ approval rate. Free service.',
    url: 'https://careerambition.com/bscc-loan',
  },
}

const BENEFITS = [
  'Free eligibility check',
  'Complete document checklist',
  'Form fill karne mein help',
  'DRCC visit mein saath',
  'Bank documentation support',
  '3,000+ successful loans processed',
]

export default function BsccLoanPage() {
  return (
    <>
      {/* Sections 1–8 + 11 */}
      <Suspense fallback={<div className="min-h-screen bg-[#F5F5F8]" />}>
        <BsccContent />
      </Suspense>

      {/* ── Section 9: Lead Form ── */}
      <section id="apply-now" className="bg-ind py-16" aria-label="Apply for BSCC loan">
        <div className="mx-auto max-w-brand px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* Left — benefits */}
            <div>
              <h2 className="font-hindi font-bold text-white text-3xl sm:text-4xl mb-4">
                Free में BSCC Apply करवाएं — अभी!
              </h2>
              <p className="font-hindi text-white/70 text-sm leading-relaxed mb-7">
                CAE ke expert 2 ghante mein call karenge.
                Eligibility check se DRCC visit tak — sab free.
              </p>
              <ul className="space-y-3 mb-8">
                {BENEFITS.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3 text-white/80 text-sm font-hindi">
                    <CheckCircle className="w-4 h-4 text-yel shrink-0 mt-0.5" />
                    {benefit}
                  </li>
                ))}
              </ul>

              {/* Testimonial mini-card */}
              <div className="bg-white/10 border border-white/15 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-yel rounded-full flex items-center justify-center text-dk font-black text-xs shrink-0">
                    AK
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">Amit Kumar, Motihari</p>
                    <p className="text-yel text-xs mb-1.5">★★★★★</p>
                    <p className="font-hindi text-white/70 text-xs leading-relaxed">
                      CAE ki help se 12 din mein ₹4 lakh loan mil gaya. Thank you!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — Lead Form */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl">
              <h3 className="font-hindi font-bold text-ind text-xl mb-5">
                <span className="flex items-center gap-2">
                  <GraduationCap size={20} />
                  BSCC Loan के लिए Free Counseling
                </span>
              </h3>
              <LeadForm sourcePage="/bscc-loan" compact={false} />
            </div>

          </div>
        </div>
      </section>

      {/* ── Section 10: FAQ ── */}
      <SectionWrapper outerClassName="bg-[#F5F5F8]" className="py-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <Badge className="bg-[#eeedf8] text-ind border-0 mb-3">FAQ</Badge>
            <h2 className="font-hindi font-bold text-ind text-3xl sm:text-4xl">
              BSCC Loan के बारे में Common Questions
            </h2>
          </div>
          <Accordion multiple={false} className="space-y-3">
            {FAQS.map((faq, i) => (
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

          {/* Official resource links */}
          <div className="mt-8 bg-white border border-bdr rounded-xl p-5 space-y-2.5">
            <p className="font-semibold text-ind text-sm mb-3">Official Resources</p>
            <a
              href="https://www.7nishchay-yuvaupmission.bihar.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-pur text-sm hover:underline"
            >
              <span className="w-1.5 h-1.5 bg-pur rounded-full shrink-0" />
              Official BSCC Portal: 7nishchay-yuvaupmission.bihar.gov.in
            </a>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <span className="w-1.5 h-1.5 bg-gray-300 rounded-full shrink-0" />
              Helpline: 1800-3456-444 (Mon–Sat 9AM–6PM, Free)
            </div>
          </div>
        </div>
      </SectionWrapper>
    </>
  )
}
