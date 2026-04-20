import type { Metadata } from 'next'
import { Suspense } from 'react'
import { NavBar } from '@/components/ui/NavBar'
import { Footer } from '@/components/ui/Footer'
import { LibraryCard } from '@/components/library/LibraryCard'
import { CategoryFilter } from '@/components/blog/CategoryFilter'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: "Dani's Picks",
  description:
    "Products I use and love in our homeschool — curriculum, books, supplies, and faith resources recommended by Daniela Cerrato.",
}

export const revalidate = 3600

interface PageProps {
  searchParams: Promise<{ category?: string }>
}

async function LibraryContent({ searchParams }: PageProps) {
  const { category } = await searchParams
  const supabase = await createClient()

  let query = supabase
    .from('recommended_products')
    .select('*')
    .order('featured', { ascending: false })
    .order('created_at', { ascending: false })

  if (category) {
    query = query.eq('category', category)
  }

  const { data: items } = await query

  const { data: allItems } = await supabase
    .from('recommended_products')
    .select('category')
    .not('category', 'is', null)

  const categories = [
    ...new Set((allItems ?? []).map((i) => i.category).filter(Boolean)),
  ] as string[]

  return (
    <div>
      {categories.length > 0 && (
        <div className="mb-10">
          <CategoryFilter categories={categories} selectedCategory={category} />
        </div>
      )}

      {items && items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <LibraryCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="font-serif text-2xl text-charcoal mb-2">Coming soon!</p>
          <p className="font-sans text-charcoal-light">
            I&apos;m working on my list of favorites. Check back soon!
          </p>
        </div>
      )}
    </div>
  )
}

export default function LibraryPage(props: PageProps) {
  return (
    <>
      <NavBar />
      <main className="flex-1">
        <div className="bg-linen py-14">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-charcoal mb-3">
              Dani&apos;s Picks
            </h1>
            <p className="font-sans text-charcoal-light text-lg max-w-xl">
              Products I personally use and love in our homeschool — tried, tested,
              and mom-approved.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
          <Suspense fallback={<div className="font-sans text-charcoal-light">Loading…</div>}>
            <LibraryContent searchParams={props.searchParams} />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  )
}
