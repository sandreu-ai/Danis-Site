import Link from 'next/link'
import { NavBar } from '@/components/ui/NavBar'
import { Footer } from '@/components/ui/Footer'
import { PostCard } from '@/components/blog/PostCard'
import { ProductCard } from '@/components/shop/ProductCard'
import { LibraryCard } from '@/components/library/LibraryCard'
import { EmailSignup } from '@/components/ui/EmailSignup'
import { createClient } from '@/lib/supabase/server'

export const revalidate = 3600

async function getData() {
  const supabase = await createClient()

  const [postsRes, productsRes, libraryRes] = await Promise.all([
    supabase
      .from('posts')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(3),
    supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(4),
    supabase
      .from('recommended_products')
      .select('*')
      .eq('featured', true)
      .order('created_at', { ascending: false })
      .limit(4),
  ])

  return {
    posts: postsRes.data ?? [],
    products: productsRes.data ?? [],
    library: libraryRes.data ?? [],
  }
}

export default async function HomePage() {
  const { posts, products, library } = await getData()

  return (
    <>
      <NavBar />
      <main className="flex-1">

        {/* Hero */}
        <section className="bg-cream py-24 sm:py-32 lg:py-40">
          <div className="mx-auto max-w-2xl px-6 text-center">
            <p className="section-label mb-3">you belong here</p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.5rem] text-charcoal leading-tight mb-6">
              Homeschooling Is Simpler<br className="hidden sm:block" /> Than You Think
            </h1>
            <div className="divider" />
            <p className="font-sans text-base text-stone leading-relaxed mt-6 mb-10 max-w-md mx-auto">
              Real resources, honest encouragement, and a community of moms
              who get it. You can do this — and you don&apos;t have to figure it out alone.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center bg-sage text-white font-sans text-sm tracking-widest uppercase px-10 py-4 hover:bg-sage-dark transition-colors duration-300 min-h-[52px]"
              >
                Get the Resources
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center justify-center border border-charcoal/30 text-charcoal font-sans text-sm tracking-widest uppercase px-10 py-4 hover:border-sage hover:text-sage transition-all duration-300 min-h-[52px]"
              >
                Read the Blog
              </Link>
            </div>
          </div>
        </section>

        {/* Thin accent bar */}
        <div className="h-px bg-linen" />

        {/* Featured Products */}
        {products.length > 0 && (
          <section className="py-20 sm:py-28 bg-white">
            <div className="mx-auto max-w-6xl px-6 lg:px-8">
              <div className="text-center mb-14">
                <p className="section-label mb-2">the shop</p>
                <h2 className="font-serif text-3xl text-charcoal">Tools to Make It Easier</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <div className="text-center mt-12">
                <Link
                  href="/shop"
                  className="font-sans text-xs tracking-widest uppercase text-stone border-b border-stone/40 pb-0.5 hover:text-sage hover:border-sage transition-colors"
                >
                  View all resources
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Latest Posts */}
        {posts.length > 0 && (
          <section className="py-20 sm:py-28 bg-cream">
            <div className="mx-auto max-w-6xl px-6 lg:px-8">
              <div className="text-center mb-14">
                <p className="section-label mb-2">from the blog</p>
                <h2 className="font-serif text-3xl text-charcoal">Real Talk from a Real Mom</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
              <div className="text-center mt-12">
                <Link
                  href="/blog"
                  className="font-sans text-xs tracking-widest uppercase text-stone border-b border-stone/40 pb-0.5 hover:text-sage hover:border-sage transition-colors"
                >
                  Read all posts
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Dani's Picks */}
        {library.length > 0 && (
          <section className="py-20 sm:py-28 bg-linen">
            <div className="mx-auto max-w-6xl px-6 lg:px-8">
              <div className="text-center mb-14">
                <p className="section-label mb-2">my favorites</p>
                <h2 className="font-serif text-3xl text-charcoal">Dani&apos;s Picks</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {library.map((item) => (
                  <LibraryCard key={item.id} item={item} />
                ))}
              </div>
              <div className="text-center mt-12">
                <Link
                  href="/library"
                  className="font-sans text-xs tracking-widest uppercase text-stone border-b border-stone/40 pb-0.5 hover:text-sage hover:border-sage transition-colors"
                >
                  View all picks
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* About section */}
        <section className="py-20 sm:py-28 bg-white">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative aspect-[4/5] max-w-xs mx-auto lg:mx-0 overflow-hidden bg-linen flex items-center justify-center">
                <svg className="w-20 h-20 text-stone/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="absolute bottom-4 font-sans text-xs text-stone/40 tracking-wider uppercase">Photo coming soon</span>
              </div>
              <div>
                <p className="section-label mb-3">meet daniela</p>
                <h2 className="font-serif text-3xl sm:text-4xl text-charcoal mt-1 mb-6 leading-snug">
                  Growing With My Kids,<br /> Not Apart from Them
                </h2>
                <div className="w-8 h-px bg-blush mb-6" style={{backgroundColor: '#C9A49C'}} />
                <p className="font-sans text-stone leading-relaxed mb-4">
                  Hi! I&apos;m Daniela — a homeschool mom who stumbled into this journey
                  and never looked back. Homeschooling isn&apos;t about having all the
                  answers. It&apos;s about being present, being curious, and growing
                  right alongside your kids.
                </p>
                <p className="font-sans text-stone leading-relaxed mb-8">
                  If you&apos;re wondering whether you can really do this — you can.
                  Follow along on Instagram{' '}
                  <a
                    href="https://www.instagram.com/learnlivelovejourney"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-charcoal underline underline-offset-2 hover:text-sage transition-colors"
                  >
                    @learnlivelovejourney
                  </a>{' '}
                  for the real, unfiltered side of our homeschool life.
                </p>
                <Link
                  href="/about"
                  className="font-sans text-xs tracking-widest uppercase text-stone border-b border-stone/40 pb-0.5 hover:text-sage hover:border-sage transition-colors"
                >
                  Learn more about me
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Email signup */}
        <section className="py-20 sm:py-28 bg-cream">
          <div className="mx-auto max-w-xl px-6">
            <EmailSignup />
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
