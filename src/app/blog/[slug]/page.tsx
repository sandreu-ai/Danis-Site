import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { NavBar } from '@/components/ui/NavBar'
import { Footer } from '@/components/ui/Footer'
import { PostCard } from '@/components/blog/PostCard'
import { Badge } from '@/components/ui/Badge'
import { createClient } from '@/lib/supabase/server'
import { formatDate } from '@/lib/utils'

export const revalidate = 3600

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('posts')
    .select('slug')
    .eq('published', true)

  return (data ?? []).map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data: post } = await supabase
    .from('posts')
    .select('title, content_html, cover_image_url, category, created_at')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (!post) return {}

  const description = post.content_html
    ? post.content_html.replace(/<[^>]*>/g, '').slice(0, 160)
    : ''

  return {
    title: post.title,
    description,
    openGraph: {
      title: post.title,
      description,
      type: 'article',
      publishedTime: post.created_at,
      images: post.cover_image_url ? [post.cover_image_url] : [],
    },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (!post) notFound()

  const { data: morePosts } = await supabase
    .from('posts')
    .select('*')
    .eq('published', true)
    .neq('id', post.id)
    .order('created_at', { ascending: false })
    .limit(3)

  return (
    <>
      <NavBar />
      <main className="flex-1">
        <article className="mx-auto max-w-prose px-4 sm:px-6 py-12 sm:py-16">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            {post.category && <Badge>{post.category}</Badge>}
            <time
              dateTime={post.created_at}
              className="font-sans text-sm text-charcoal-light"
            >
              {formatDate(post.created_at)}
            </time>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal mb-8 leading-tight">
            {post.title}
          </h1>

          {post.cover_image_url && (
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-10">
              <Image
                src={post.cover_image_url}
                alt={post.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 720px) 100vw, 720px"
              />
            </div>
          )}

          {post.content_html && (
            <div
              className="prose-content"
              dangerouslySetInnerHTML={{ __html: post.content_html }}
            />
          )}
        </article>

        {/* More posts */}
        {morePosts && morePosts.length > 0 && (
          <section className="bg-linen py-14">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <h2 className="font-serif text-2xl font-bold text-charcoal mb-8">
                More Posts
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {morePosts.map((p) => (
                  <PostCard key={p.id} post={p} />
                ))}
              </div>
              <div className="mt-8 text-center">
                <Link
                  href="/blog"
                  className="font-sans text-sm font-semibold text-sage hover:text-sage-dark transition-colors"
                >
                  View all posts →
                </Link>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}
