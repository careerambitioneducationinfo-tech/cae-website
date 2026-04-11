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
import CoursesContent from './CoursesContent'

export const metadata: Metadata = {
  title: 'Engineering, MBBS, MBA, Law Courses | Career Ambition Education Bihar',
  description:
    'Find the right course after 12th in Bihar. B.Tech, MBBS India & Abroad, MBA, LLB, B.Pharma, Nursing. BSCC loan eligible colleges. Free admission guidance.',
  keywords:
    'engineering admission bihar, MBBS admission, MBA colleges bihar, courses after 12th, BSCC eligible colleges',
  openGraph: {
    title: 'Courses & College Finder | Career Ambition Education',
    description: 'Find the right course and college. Filter by stream, state, BSCC eligibility.',
    url: 'https://careerambition.com/courses',
  },
}

const FAQS = [
  {
    q: '12th ke baad kaun sa course best hai?',
    a: 'Ye aapke interest aur marks pe depend karta hai। Science mein acche ho to Engineering ya Medical। Commerce mein ho to MBA/BBA/BCA। CAE ke expert free mein aapki aptitude test karke sahi direction denge।',
  },
  {
    q: 'Engineering ke liye JEE Main zaroori hai?',
    a: 'JEE Main se acha college milta hai, lekin GNIOT, SRM, LPU jaise top colleges 12th board marks pe bhi direct admission dete hain। CAE aapko JEE score ke hisaab se best option batayega।',
  },
  {
    q: 'BSCC loan se kaun se courses cover hote hain?',
    a: 'B.Tech, MBA, BBA, BCA, B.Pharma, B.Sc Nursing, B.Sc Agriculture, LLB — almost sabhi professional courses BSCC eligible hain। ₹4 Lakh tak loan, 0% interest, CAE free mein apply karwata hai।',
  },
  {
    q: 'MBBS India aur MBBS Abroad mein kya difference hai?',
    a: 'MBBS India mein NEET mandatory hai aur fees zyada hoti hai। MBBS Abroad mein fees kam hai (₹20–40L total), NMC approved universities hain, aur FMGE/NEXT clear karne ke baad India mein practice kar sakte hain।',
  },
  {
    q: 'Gap year ke baad bhi admission mil sakta hai?',
    a: 'Haan! CAE gap year students ki bhi full help karta hai। Most colleges gap year accept karte hain। Free counseling mein options discuss karo।',
  },
]

export default function CoursesPage() {
  return (
    <>
      {/* Sections 1–7: Hero, Stream Picks, Finder, Categories, BSCC, Colleges, Exams */}
      <Suspense fallback={<div className="min-h-screen bg-[#F5F5F8]" />}>
        <CoursesContent />
      </Suspense>

      {/* ── Section 8: Lead Form ── */}
      <section id="lead-form" className="bg-ind py-16">
        <div className="mx-auto max-w-brand px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="font-hindi font-bold text-white text-3xl sm:text-4xl mb-6">
                अभी Apply करें — Expert 2 घंटे में Call करेगा!
              </h2>
              <ul className="space-y-3">
                {[
                  'Free counseling — कोई fees नहीं',
                  'College shortlisting based on marks',
                  'BSCC loan application में help',
                  'Admission form filling assistance',
                  '17+ years experience',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-white/80 text-sm">
                    <CheckCircle className="w-5 h-5 text-yel shrink-0 mt-0.5" />
                    <span className="font-hindi">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl">
              <h3 className="font-hindi font-bold text-ind text-xl mb-5">
                <span className="flex items-center gap-2"><GraduationCap size={20} /> Free Counseling बुक करें</span>
              </h3>
              <LeadForm sourcePage="/courses" compact={false} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 9: FAQ ── */}
      <SectionWrapper outerClassName="bg-[#F5F5F8]" className="py-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <Badge className="bg-[#eeedf8] text-ind border-0 mb-3">FAQ</Badge>
            <h2 className="font-hindi font-bold text-ind text-3xl sm:text-4xl">
              Courses ke baare mein Common Questions
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
        </div>
      </SectionWrapper>
    </>
  )
}
