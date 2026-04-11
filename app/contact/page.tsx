import type { Metadata } from 'next'
import { Suspense } from 'react'
import ContactContent from './ContactContent'

export const metadata: Metadata = {
  title: 'Contact Career Ambition Education | Motihari, Bihar',
  description:
    'Contact CAE for free college admission counseling in Bihar. Office in Motihari. Call or WhatsApp for free guidance Mon–Sat 9AM–7PM. 20 offices across Bihar.',
  keywords:
    'career ambition education contact, motihari education consultancy, college counseling contact bihar, CAE phone number',
  openGraph: {
    title: 'Contact CAE | Free College Counseling Bihar',
    description: 'Call, WhatsApp, or visit — free guidance, no obligation.',
    url: 'https://careerambition.com/contact',
    images: [
      {
        url: '/og/contact.webp',
        width: 1200,
        height: 630,
        alt: 'Contact Career Ambition Education Motihari Bihar office',
      },
    ],
  },
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F5F5F8]" />}>
      <ContactContent />
    </Suspense>
  )
}
