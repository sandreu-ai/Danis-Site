import type { Metadata } from 'next'
import { Suspense } from 'react'
import { NavBar } from '@/components/ui/NavBar'
import { Footer } from '@/components/ui/Footer'
import { PostCard } from '@/components/blog/PostCard'
import { CategoryFilter } from '@/components/blog/CategoryFilter'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Homeschooling encouragement, tips, and resources from a Catholic homeschool mom. Read articles on curriculum, faith, and family learning.',
}

export const revalidate = 3600

const PER_PAGE = 9

interface PageProps {
  searchParams: Promise<{ category?: string; page?: string }>
}

async function BlogContent({ searchParams }: PageProps) {
  const { category, page } = await searchParams
  const currentPage = Number(page ?? 1)
  const offset = (currentPage - 1) * PER_PAGE

  const supabase = await createClient()

  let query = supabase
    .from('posts')
    .select('*', { count: 'exact' })
    .eq('published', true)
    .order('created_at', { ascending: false })
    .range(offset, offset + PER_PAGE - 1)

  if (category) {
    query = query.eq('category', category)
  }

  const { data: posts, count } = await query

  const { data: allPosts } = await supabase
    .from('posts')
    .select('category')
    .eq('published', true)
    .not('category', 'is', null)

  const categories = [
    ...new Set((allPosts ?? []).map((p) => p.category).filter(Boolean)),
  ] as string[]

  const totalPages = Math.ceil((count ?? 0) / PER_PAGE)

  return (
    <div>
      {/* Category filter */}
      {categories.length > 0 && (
        <div className="mb-10">
          <CategoryFilter
            categories={categories}
            selectedCategory={category}
          />
        </div>
      )}

      {/* Posts grid */}
      {posts && posts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="font-serif text-2xl text-charcoal mb-2">No posts yet</p>
          <p className="font-sans text-charcoal-light">Check back soon for new content!</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-12">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
            <a
              key={pg}
              href={`/blog?${category ? `category=${encodeURIComponent(category)}&` : ''}page=${pg}`}
              className={`w-10 h-10 flex items-center justify-center rounded-lg font-sans text-sm font-medium transition-all
                ${pg === currentPage ? 'bg-sage text-white' : 'bg-white text-charcoal hover:bg-linen border border-sage/20'}`}
            >
              {pg}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

export default function BlogPage(props: PageProps) {
  return (
    <>
      <NavBar />
      <main className="flex-1">
        <div className="bg-linen py-14">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-charcoal mb-3">
              The Blog
            </h1>
            <p className="font-sans text-charcoal-light text-lg max-w-xl">
              Encouragement, ideas, and practical tips for your homeschool journey.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
          <Suspense fallback={<div className="font-sans text-charcoal-light">Loading…</div>}>
            <BlogContent searchParams={props.searchParams} />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  )
}
