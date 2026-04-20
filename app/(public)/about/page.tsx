import type { Metadata } from 'next'
import { Suspense } from 'react'
import AboutContent from './AboutContent'

export const metadata: Metadata = {
  title: 'About Career Ambition Education | Bihar Since 2009',
  description:
    'Career Ambition Education founded by Chandan Sawan in 2009. 17+ years, 490+ counselors, 20 offices in Bihar, 10,000+ students helped with free college admissions and BSCC loan guidance in Motihari.',
  keywords:
    'career ambition education about, CAE motihari, Chandan Sawan education consultant, education consultancy bihar 2009',
  openGraph: {
    title: "About CAE | Bihar's #1 Education Consultancy Since 2009",
    description: '17+ years · 10,000+ admissions · 20 offices · Free guidance.',
    url: 'https://careerambition.com/about',
    images: [
      {
        url: '/og/about.webp',
        width: 1200,
        height: 630,
        alt: 'Career Ambition Education team Motihari Bihar',
      },
    ],
  },
}

export default function AboutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F5F5F8]" />}>
      <AboutContent />
    </Suspense>
  )
}
