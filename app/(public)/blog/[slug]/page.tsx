import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ChevronLeft, Clock, Calendar, User, ArrowRight, Tag } from 'lucide-react'
import { SEED_POSTS } from '@/lib/blog-seed'
import LeadForm from '@/components/forms/LeadForm'
import type { BlogPost } from '@/types'

// ─── Data helpers ─────────────────────────────────────────────────────────────

async function getPost(slug: string): Promise<BlogPost | null> {
  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    try {
      const { supabase } = await import('@/lib/supabase')
      const { data } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single()
      if (data) return data as BlogPost
    } catch {
      // fall through to seed
    }
  }
  return SEED_POSTS.find(p => p.slug === slug) ?? null
}

async function getRelatedPosts(category: string, excludeSlug: string): Promise<BlogPost[]> {
  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    try {
      const { supabase } = await import('@/lib/supabase')
      const { data } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('category', category)
        .eq('published', true)
        .neq('slug', excludeSlug)
        .limit(3)
      if (data?.length) return data as BlogPost[]
    } catch {
      // fall through to seed
    }
  }
  return SEED_POSTS
    .filter(p => p.category === category && p.slug !== excludeSlug)
    .slice(0, 3)
}

// ─── Static params ────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    try {
      const { supabase } = await import('@/lib/supabase')
      const { data } = await supabase
        .from('blog_posts')
        .select('slug')
        .eq('published', true)
      if (data?.length) return data.map((p: { slug: string }) => ({ slug: p.slug }))
    } catch {
      // fall through to seed
    }
  }
  return SEED_POSTS.map(p => ({ slug: p.slug }))
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return { title: 'Article Not Found | Career Ambition Education' }
  return {
    title: `${post.title} | Career Ambition Education`,
    description: post.meta_desc ?? '',
    openGraph: {
      title: post.title,
      description: post.meta_desc ?? '',
      images: [
        {
          url: post.image_url,
          alt: post.image_alt,
        },
      ],
    },
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(iso?: string) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

function CategoryBadge({ category }: { category: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 bg-yel text-ind text-xs font-bold
                     px-3 py-1.5 rounded-full uppercase tracking-wider">
      <Tag size={11} />
      {category}
    </span>
  )
}

// ─── Related Card ─────────────────────────────────────────────────────────────

function RelatedCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group bg-white border border-bdr rounded-[14px] overflow-hidden
                 flex flex-col hover:-translate-y-1 transition-transform duration-200"
    >
      <div className="relative aspect-video bg-il overflow-hidden">
        <Image
          src={post.image_url}
          alt={post.image_alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h4 className="font-devanagari text-dk text-sm font-bold leading-snug mb-2 line-clamp-2 flex-1">
          {post.title}
        </h4>
        <div className="flex items-center justify-between pt-3 border-t border-bdr mt-auto">
          <span className="flex items-center gap-1 text-[.7rem] text-mu font-poppins">
            <Clock size={11} />
            {post.read_time} min
          </span>
          <span className="font-poppins text-xs font-semibold text-ind flex items-center gap-1
                           group-hover:gap-2 transition-all">
            पढ़ें <ArrowRight size={12} />
          </span>
        </div>
      </div>
    </Link>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function BlogArticlePage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  const related = await getRelatedPosts(post.category, post.slug)

  return (
    <main className="min-h-screen bg-[#F5F5F8]">

      {/* ── Hero banner ── */}
      <div style={{ background: '#1A183E' }} className="pt-24 pb-8 px-4">
        <div className="max-w-[1240px] mx-auto">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-white/50 text-xs font-poppins mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="flex items-center gap-1 hover:text-white transition-colors">
              <ChevronLeft size={12} />
              Blog
            </Link>
            <span>/</span>
            <span className="text-white/70 line-clamp-1">{post.title}</span>
          </nav>

          <CategoryBadge category={post.category} />

          <h1 className="font-devanagari text-white text-2xl sm:text-3xl md:text-4xl
                         font-bold leading-tight mt-4 mb-5 max-w-3xl">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-4 flex-wrap text-white/60 text-sm font-poppins">
            <span className="flex items-center gap-1.5">
              <User size={14} />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {post.read_time} min read
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {formatDate(post.created_at)}
            </span>
          </div>
        </div>
      </div>

      {/* ── Hero image ── */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8 -mt-0">
        <div className="relative aspect-video md:aspect-[21/7] w-full rounded-b-[14px]
                        overflow-hidden bg-il">
          <Image
            src={post.image_url}
            alt={post.image_alt}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1240px) 100vw, 1240px"
          />
        </div>
      </div>

      {/* ── Content + Sidebar ── */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-10 items-start">

          {/* Article body */}
          <article className="flex-1 min-w-0">
            {/* Excerpt as intro */}
            {post.excerpt && (
              <p className="font-poppins text-mu text-base leading-relaxed
                             bg-white border-l-4 border-ind rounded-r-[10px]
                             px-5 py-4 mb-8">
                {post.excerpt}
              </p>
            )}

            {/* Content */}
            {post.content ? (
              <div
                className="font-poppins text-dk text-base leading-relaxed prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            ) : (
              <div className="bg-white rounded-[14px] border border-bdr px-6 py-12 text-center">
                <p className="font-poppins text-mu text-sm">
                  Full article coming soon। अभी के लिए हमारे counselors से directly बात करें।
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 mt-4 bg-ind text-white
                             font-bold text-sm px-5 py-2.5 rounded-full
                             hover:bg-pur transition-colors duration-200"
                >
                  Contact करें <ArrowRight size={14} />
                </Link>
              </div>
            )}
          </article>

          {/* Sidebar */}
          <aside className="w-full lg:w-80 lg:sticky lg:top-24 shrink-0">
            <div className="bg-white rounded-[14px] border border-bdr p-6">
              <p className="font-poppins text-pur text-xs font-bold uppercase
                             tracking-[.1em] mb-2">
                Free Expert Guidance
              </p>
              <h3 className="font-devanagari text-ind text-lg font-bold mb-1">
                आपका अगला कदम
              </h3>
              <p className="font-poppins text-mu text-xs mb-4">
                Article के बाद confusion? हमारे expert 2 घंटे में call करेंगे।
              </p>
              <LeadForm sourcePage={`/blog/${slug}`} compact />
            </div>
          </aside>
        </div>
      </div>

      {/* ── Related posts ── */}
      {related.length > 0 && (
        <section className="bg-white py-12">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
            <div className="mb-6">
              <span className="font-poppins text-pur text-xs font-bold uppercase tracking-[.1em] mb-1 block">
                {post.category}
              </span>
              <h2 className="font-devanagari text-ind text-2xl font-bold">
                Related Articles
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map(r => (
                <RelatedCard key={r.id ?? r.slug} post={r} />
              ))}
            </div>
          </div>
        </section>
      )}

    </main>
  )
}
