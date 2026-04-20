import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ABROAD_SLUGS, getCountryData } from '@/lib/abroadData'
import CountryContent from './CountryContent'

interface Props {
  params: Promise<{ country: string }>
}

export function generateStaticParams() {
  return ABROAD_SLUGS.map((slug) => ({ country: slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country } = await params
  const data = getCountryData(country)
  if (!data) return {}

  return {
    title: data.metaTitle,
    description: data.metaDesc,
    keywords: data.keywords,
    openGraph: {
      title: data.metaTitle,
      description: data.metaDesc,
      url: `https://careerambition.com/study-abroad/${data.slug}`,
      images: [
        {
          url: `/og/mbbs-${data.slug}.webp`,
          width: 1200,
          height: 630,
          alt: `Study MBBS in ${data.name} - Career Ambition Education`,
        },
      ],
    },
  }
}

export default async function CountryPage({ params }: Props) {
  const { country } = await params
  const data = getCountryData(country)
  if (!data) notFound()

  return <CountryContent data={data} />
}

// Force static generation
export const dynamic = 'force-static'
