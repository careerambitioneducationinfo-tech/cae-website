'use client'

import SectionWrapper from '@/components/shared/SectionWrapper'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'

const FAQS = [
  {
    q: 'CAE ki counseling fees kitni hai?',
    a: 'CAE ki basic counseling bilkul free hai। Koi hidden charges nahi। Hum students ki help ke liye yahan hain।',
  },
  {
    q: 'MBBS Abroad India mein valid hai?',
    a: 'Haan, bilkul valid hai। CAE jin universities mein admission dilata hai, wo sab NMC (National Medical Commission) approved hain। FMGE/NEXT exam clear karna hoga India mein practice ke liye।',
  },
  {
    q: 'BSCC loan ke liye kya documents chahiye?',
    a: 'Aadhaar Card, Income Certificate, Domicile Certificate, 10th/12th Marksheet, Admission Letter, Bank Passbook aur passport size photos. CAE free mein help karta hai in sab documents ke saath।',
  },
  {
    q: '12th ke baad NEET ke bina MBBS ho sakta hai?',
    a: 'India mein MBBS ke liye NEET mandatory hai। MBBS Abroad mein kuch countries (Russia, Uzbekistan, Kyrgyzstan) mein NEET score required nahi hota। CAE se free guidance lo।',
  },
  {
    q: 'CAE ke kitne offices hain?',
    a: '20 offices hain — Motihari (main), Patna, Muzaffarpur, Darbhanga, Bettiah, Sugauli, Hajipur aur aur bhi Bihar ke locations mein। Nearest office visit karo ya call karo।',
  },
  {
    q: 'Engineering ke baad placement milti hai?',
    a: 'Haan, LPU, SRM, Chandigarh University ka placement record bahut strong hai। CAE sirf wahi colleges suggest karta hai jahan placements acchi hoti hain।',
  },
]

export default function FAQSection() {
  return (
    <SectionWrapper
      id="faq"
      outerClassName="bg-[#F5F5F8]"
      className="py-16"
      animate={true}
    >
      <div className="text-center mb-10">
        <span className="inline-block bg-il text-ind text-xs font-semibold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
          FAQ
        </span>
        <h2 className="font-hindi font-bold text-ind text-3xl sm:text-4xl">
          अक्सर पूछे जाने वाले सवाल
        </h2>
      </div>

      <div className="max-w-3xl mx-auto">
        <Accordion multiple={false} className="space-y-2">
          {FAQS.map((faq, i) => (
            <AccordionItem
              key={i}
              value={String(i)}
              className="bg-white rounded-brand border border-gray-100 shadow-sm px-5 not-last:border-b-0"
            >
              <AccordionTrigger className="py-4 text-ind font-semibold text-sm hover:no-underline hover:text-ind/80">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 font-hindi pb-4">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </SectionWrapper>
  )
}
