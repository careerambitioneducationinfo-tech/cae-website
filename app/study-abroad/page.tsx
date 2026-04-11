import type { Metadata } from 'next'
import StudyAbroadContent from './StudyAbroadContent'

export const metadata: Metadata = {
  title: 'MBBS Abroad | Russia, Kyrgyzstan, Kazakhstan, Uzbekistan | Career Ambition Education',
  description:
    'Study MBBS abroad from NMC & WHO approved universities in Russia, Kyrgyzstan, Kazakhstan, and Uzbekistan. Total cost ₹20–40L, English medium, free counseling from CAE Bihar.',
  keywords:
    'MBBS abroad Bihar, study medicine abroad India, MBBS Russia, MBBS Kyrgyzstan, MBBS Kazakhstan, MBBS Uzbekistan, NMC approved MBBS abroad',
  openGraph: {
    title: 'MBBS Abroad | Career Ambition Education Bihar',
    description:
      'NMC approved MBBS in Russia, Kyrgyzstan, Kazakhstan & Uzbekistan. Affordable fees, English medium. Free counseling.',
    url: 'https://careerambition.com/study-abroad',
    images: [
      {
        url: '/og/mbbs-abroad.webp',
        width: 1200,
        height: 630,
        alt: 'MBBS Abroad study destinations - Career Ambition Education',
      },
    ],
  },
}

export default function StudyAbroadPage() {
  return <StudyAbroadContent />
}
