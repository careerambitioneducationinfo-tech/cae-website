import type { Metadata } from 'next'
import { Suspense } from 'react'
import { SEED_POSTS } from '@/lib/blog-seed'
import type { BlogPost } from '@/types'
import BlogContent from './BlogContent'

export const metadata: Metadata = {
  title: 'Education Blog | Career Ambition Education',
  description:
    'Expert guidance on college admission in Bihar, MBBS abroad, BSCC loans, and career planning after 12th. Read articles by CAE counselors.',
  keywords:
    'college admission bihar, mbbs abroad bihar, bscc loan guide, 12th ke baad kya kare, engineering admission bihar, career counseling motihari',
  openGraph: {
    title: 'Education Blog | Career Ambition Education',
    description:
      'Expert guidance on college admission in Bihar, MBBS abroad, BSCC loans, and career planning after 12th.',
    url: 'https://careerambition.com/blog',
    images: [
      {
        url: '/og/blog.webp',
        width: 1200,
        height: 630,
        alt: 'CAE Education Blog — college admission guidance Bihar',
      },
    ],
  },
  alternates: {
    canonical: 'https://careerambition.com/blog',
  },
}

async function getPosts(): Promise<BlogPost[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return SEED_POSTS
  try {
    const { supabase } = await import('@/lib/supabase')
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })
    if (error || !data?.length) return SEED_POSTS
    return data as BlogPost[]
  } catch {
    return SEED_POSTS
  }
}

export default async function BlogPage() {
  const posts = await getPosts()
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F5F5F8]" />}>
      <BlogContent posts={posts} />
    </Suspense>
  )
}
