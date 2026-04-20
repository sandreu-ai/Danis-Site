import Image from 'next/image'
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

        {/* Hero — full screen with hero.jpeg */}
        <section className="relative min-h-screen flex items-end">
          <Image
            src="/hero.jpeg"
            alt="Daniela and her boys at a creek"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Gradient overlay: dark at bottom, fading to transparent at top */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          {/* Text overlay */}
          <div className="relative z-10 w-full pb-16 sm:pb-24 px-6 lg:px-8 max-w-4xl mx-auto text-white">
            <p className="section-label text-white/90 mb-3" style={{ color: 'rgba(255,255,255,0.9)' }}>
              welcome, mama
            </p>
            <h1
              style={{ fontFamily: 'var(--font-fredoka)', fontWeight: 600 }}
              className="text-5xl sm:text-6xl lg:text-7xl leading-tight mb-6"
            >
              Homeschooling Is Simpler Than You Think
            </h1>
            <p className="font-sans text-lg mb-8 max-w-lg" style={{ color: 'rgba(255,255,255,0.8)' }}>
              Real resources, honest encouragement, and a community of moms who get it.
              You can do this — and you don&apos;t have to figure it out alone.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center font-sans text-sm font-semibold tracking-wider uppercase px-10 py-4 rounded-full transition-colors duration-300 min-h-[52px]"
                style={{ backgroundColor: '#F5C430', color: '#2A3E2B' }}
              >
                Get the Resources
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center justify-center font-sans text-sm font-semibold tracking-wider uppercase px-10 py-4 rounded-full border-2 text-white transition-all duration-300 min-h-[52px] hover:bg-white/10"
                style={{ borderColor: 'rgba(255,255,255,0.6)' }}
              >
                Read the Blog
              </Link>
            </div>
          </div>
        </section>

        {/* Email signup */}
        <section className="py-16 sm:py-20" style={{ backgroundColor: '#2A3E2B' }}>
          <div className="mx-auto max-w-xl px-6">
            <EmailSignup />
          </div>
        </section>

        {/* Featured Products */}
        {products.length > 0 && (
          <section className="py-20 sm:py-28 bg-white decorative-bg">
            <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8">
              <div className="text-center mb-14">
                <p className="section-label mb-2">the shop</p>
                <h2 className="text-3xl sm:text-4xl mb-4" style={{ color: '#2A3E2B' }}>
                  Tools to Make It Easier
                </h2>
                <div className="divider" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <div className="text-center mt-12">
                <Link
                  href="/shop"
                  className="font-sans text-sm font-semibold tracking-wider uppercase border-b-2 pb-0.5 transition-colors"
                  style={{ color: '#4A8C4E', borderColor: '#4A8C4E' }}
                >
                  View all resources
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Latest Posts */}
        {posts.length > 0 && (
          <section className="py-20 sm:py-28" style={{ backgroundColor: '#F6FAF4' }}>
            <div className="mx-auto max-w-6xl px-6 lg:px-8">
              <div className="text-center mb-14">
                <p className="section-label mb-2">from the blog</p>
                <h2 className="text-3xl sm:text-4xl mb-4" style={{ color: '#2A3E2B' }}>
                  Real Talk from a Real Mom
                </h2>
                <div className="divider" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
              <div className="text-center mt-12">
                <Link
                  href="/blog"
                  className="font-sans text-sm font-semibold tracking-wider uppercase border-b-2 pb-0.5 transition-colors"
                  style={{ color: '#4A8C4E', borderColor: '#4A8C4E' }}
                >
                  Read all posts
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Dani's Picks */}
        {library.length > 0 && (
          <section className="py-20 sm:py-28 decorative-bg" style={{ backgroundColor: '#EDF5E1' }}>
            <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8">
              <div className="text-center mb-14">
                <p className="section-label mb-2">my favorites</p>
                <h2 className="text-3xl sm:text-4xl mb-4" style={{ color: '#2A3E2B' }}>
                  Dani&apos;s Picks
                </h2>
                <div className="divider" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {library.map((item) => (
                  <LibraryCard key={item.id} item={item} />
                ))}
              </div>
              <div className="text-center mt-12">
                <Link
                  href="/library"
                  className="font-sans text-sm font-semibold tracking-wider uppercase border-b-2 pb-0.5 transition-colors"
                  style={{ color: '#4A8C4E', borderColor: '#4A8C4E' }}
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Photo — about.jpeg */}
              <div className="relative aspect-[3/4] max-w-sm mx-auto lg:mx-0 overflow-hidden rounded-2xl shadow-[0_8px_40px_rgba(42,62,43,0.15)]">
                <Image
                  src="/about.jpeg"
                  alt="Daniela with her son at their homeschool desk"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 90vw, 40vw"
                />
              </div>

              {/* Text content */}
              <div>
                <p className="section-label mb-3">meet daniela</p>
                <h2
                  className="text-3xl sm:text-4xl mt-1 mb-5 leading-snug"
                  style={{ color: '#2A3E2B' }}
                >
                  Growing With My Kids,<br /> Not Apart from Them
                </h2>
                <div className="divider" style={{ margin: '0 0 1.5rem 0' }} />
                <p className="font-sans leading-relaxed mb-4" style={{ color: '#8A9E8B' }}>
                  Hi! I&apos;m Daniela — a homeschool mom who stumbled into this journey
                  and never looked back. Homeschooling isn&apos;t about having all the
                  answers. It&apos;s about being present, being curious, and growing
                  right alongside your kids.
                </p>
                <p className="font-sans leading-relaxed mb-8" style={{ color: '#8A9E8B' }}>
                  If you&apos;re wondering whether you can really do this — you can.
                  Follow along on Instagram{' '}
                  <a
                    href="https://www.instagram.com/thedanicerrato"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 transition-colors"
                    style={{ color: '#4A8C4E' }}
                  >
                    @thedanicerrato
                  </a>{' '}
                  for the real, unfiltered side of our homeschool life.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/about"
                    className="inline-flex items-center justify-center font-sans text-sm font-semibold tracking-wider uppercase px-8 py-4 rounded-full text-white transition-colors duration-300 min-h-[52px]"
                    style={{ backgroundColor: '#4A8C4E' }}
                  >
                    Learn More About Me
                  </Link>
                  <Link
                    href="/shop"
                    className="inline-flex items-center justify-center font-sans text-sm font-semibold tracking-wider uppercase px-8 py-4 rounded-full border-2 transition-all duration-300 min-h-[52px]"
                    style={{ borderColor: '#4A8C4E', color: '#4A8C4E' }}
                  >
                    Browse Resources
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>


      </main>
      <Footer />
    </>
  )
}
