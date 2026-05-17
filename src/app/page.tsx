import Image from 'next/image'
import Link from 'next/link'
import { NavBar } from '@/components/ui/NavBar'
import { Footer } from '@/components/ui/Footer'
import { PostCard } from '@/components/blog/PostCard'
import { ProductCard } from '@/components/shop/ProductCard'
import { LibraryCard } from '@/components/library/LibraryCard'
import { EmailSignup } from '@/components/ui/EmailSignup'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { DaniHeroText } from '@/components/ui/DaniHeroText'
import { createClient } from '@/lib/supabase/server'

export const revalidate = 3600

const brandPhotos = [
  { src: '/dani-brand/family-yellow.jpg', alt: 'Daniela with her family in warm natural light' },
  { src: '/dani-brand/kitchen-experiment.jpg', alt: 'Hands-on homeschool kitchen experiment' },
  { src: '/dani-brand/microscope.jpg', alt: 'Child exploring with a microscope during homeschool' },
]

const ventures = [
  {
    title: 'State Homeschool Laws',
    copy: 'Clear, state-by-state starting points for families who need the legal basics without the spiral.',
    href: 'https://statehomeschoollaws.com',
    label: 'Legal basics',
  },
  {
    title: 'The Curriculum Compass',
    copy: 'Curriculum notes, comparisons, and practical direction for choosing what actually fits your family.',
    href: 'https://thecurriculumcompass.com',
    label: 'Curriculum help',
  },
  {
    title: 'HomeBiz Kids',
    copy: 'A family-first project about raising capable kids through real-world responsibility and small business thinking.',
    label: 'In progress',
  },
]

async function getData() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return { posts: [], products: [], library: [] }
  }

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

function SectionHeader({ label, title, copy }: { label: string; title: React.ReactNode; copy?: string }) {
  return (
    <div className="mb-10 grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
      <div>
        <p className="section-label mb-5">{label}</p>
        <h2 className="dani-display text-5xl sm:text-6xl lg:text-7xl">{title}</h2>
      </div>
      {copy && <p className="max-w-xl font-sans text-sm leading-7 text-[color:var(--dani-cocoa)]">{copy}</p>}
    </div>
  )
}

export default async function HomePage() {
  const { posts, products, library } = await getData()

  return (
    <>
      <NavBar />
      <main className="editorial-shell flex-1">
        <section className="relative overflow-hidden px-3 py-4 sm:px-5 sm:py-6">
          <div className="relative mx-auto min-h-[calc(100vh-104px)] max-w-7xl overflow-hidden border border-[color:var(--dani-rule)] bg-[color:var(--dani-sand)]">
            <Image
              src="/dani-brand/family-sunset.jpg"
              alt="Daniela Cerrato family moment in warm sunset light"
              fill
              priority
              className="object-cover object-center opacity-45 mix-blend-multiply"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[rgba(245,237,227,0.92)] via-[rgba(245,237,227,0.74)] to-[rgba(184,155,130,0.62)]" />
            <DaniHeroText />
          </div>
        </section>

        <section className="px-3 pb-4 sm:px-5 sm:pb-6">
          <div className="mx-auto max-w-7xl bg-[color:var(--dani-mocha-deep)] p-4 sm:p-6 lg:p-10">
            <EmailSignup />
          </div>
        </section>

        <section className="px-3 pb-4 sm:px-5 sm:pb-6">
          <div className="mx-auto max-w-7xl bg-[color:var(--dani-cream)] p-6 sm:p-10 lg:p-14">
            <SectionHeader
              label="A real-life homeschool note"
              title={<>Intentional parenting, meaningful <em>learning.</em></>}
              copy="Daniela's world should feel like a thoughtful editorial home base: warm, useful, and grounded in real family rhythms rather than loud influencer energy."
            />

            <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
              <AnimatedSection direction="left" className="grid gap-4 sm:grid-cols-2">
                <div className="relative min-h-[320px] overflow-hidden bg-[color:var(--dani-sand)] sm:col-span-2 lg:min-h-[360px]">
                  <Image
                    src="/dani-brand/mom-boys.jpg"
                    alt="Daniela with her boys"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                {brandPhotos.slice(1).map((photo) => (
                  <div key={photo.src} className="relative min-h-[180px] overflow-hidden bg-[color:var(--dani-sand)]">
                    <Image src={photo.src} alt={photo.alt} fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
                  </div>
                ))}
              </AnimatedSection>

              <AnimatedSection direction="right" className="border border-[color:var(--dani-rule)] bg-[color:var(--dani-paper)] p-7 sm:p-10">
                <p className="mono-label">Meet Daniela</p>
                <h3 className="mt-8 font-display text-4xl leading-tight sm:text-5xl">
                  A home can be gentle and still raise capable kids.
                </h3>
                <p className="mt-6 font-sans text-sm leading-7 text-[color:var(--dani-cocoa)]">
                  Hi, I&apos;m Daniela — a homeschool mom sharing the practical middle: what we try,
                  what helps, what flops, and what keeps our days moving with more peace and less noise.
                </p>
                <p className="mt-4 font-sans text-sm leading-7 text-[color:var(--dani-cocoa)]">
                  If you&apos;re wondering whether you can really do this, you can. The goal is not a perfect schoolroom.
                  The goal is a life of curiosity, faithfulness, and steady growth together.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link href="/about" className="editorial-button">About Daniela</Link>
                  <a href="https://www.instagram.com/thedanicerrato" target="_blank" rel="noopener noreferrer" className="editorial-button secondary">
                    Instagram
                  </a>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {products.length > 0 && (
          <section className="px-3 pb-4 sm:px-5 sm:pb-6">
            <div className="mx-auto max-w-7xl bg-[color:var(--dani-sand)] p-6 sm:p-10 lg:p-14">
              <AnimatedSection>
                <SectionHeader
                  label="The shop"
                  title={<>Tools for calmer <em>days.</em></>}
                  copy="Resources should feel useful first: less clutter, more clarity, and a clear next step for the family using them."
                />
              </AnimatedSection>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {products.map((product, i) => (
                  <AnimatedSection key={product.id} delay={i * 0.08}>
                    <ProductCard product={product} />
                  </AnimatedSection>
                ))}
              </div>
              <div className="mt-10">
                <Link href="/shop" className="editorial-button secondary">View all resources</Link>
              </div>
            </div>
          </section>
        )}

        {posts.length > 0 && (
          <section className="px-3 pb-4 sm:px-5 sm:pb-6">
            <div className="mx-auto max-w-7xl bg-[color:var(--dani-cream)] p-6 sm:p-10 lg:p-14">
              <AnimatedSection>
                <SectionHeader
                  label="The journal"
                  title={<>Real talk from a real <em>mom.</em></>}
                  copy="Editorial, warm, and specific — posts should feel like a note from a friend who is a few steps ahead."
                />
              </AnimatedSection>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post, i) => (
                  <AnimatedSection key={post.id} delay={i * 0.1}>
                    <PostCard post={post} />
                  </AnimatedSection>
                ))}
              </div>
              <div className="mt-10">
                <Link href="/blog" className="editorial-button secondary">Read all posts</Link>
              </div>
            </div>
          </section>
        )}

        {library.length > 0 && (
          <section className="px-3 pb-4 sm:px-5 sm:pb-6">
            <div className="decorative-bg mx-auto max-w-7xl bg-[color:var(--dani-paper)] p-6 sm:p-10 lg:p-14">
              <div className="relative z-10">
                <AnimatedSection>
                  <SectionHeader
                    label="Dani's picks"
                    title={<>Favorites with a <em>reason.</em></>}
                    copy="A tighter, more premium shelf for the books, tools, and finds Daniela can actually stand behind."
                  />
                </AnimatedSection>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {library.map((item, i) => (
                    <AnimatedSection key={item.id} delay={i * 0.08}>
                      <LibraryCard item={item} />
                    </AnimatedSection>
                  ))}
                </div>
                <div className="mt-10">
                  <Link href="/library" className="editorial-button secondary">View all picks</Link>
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="px-3 pb-4 sm:px-5 sm:pb-6">
          <div className="mx-auto max-w-7xl bg-[color:var(--dani-mocha-deep)] p-6 text-[color:var(--dani-cream)] sm:p-10 lg:p-14">
            <div className="mb-10 grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div>
                <p className="mb-5 flex items-center gap-3 font-sans text-[0.58rem] font-semibold uppercase tracking-[0.3em] text-[rgba(245,237,227,0.78)] after:h-px after:flex-1 after:bg-[rgba(245,237,227,0.28)]">Ventures</p>
                <h2 className="dani-display text-5xl text-[color:var(--dani-cream)] sm:text-6xl lg:text-7xl">A family of useful <em>projects.</em></h2>
              </div>
              <p className="max-w-xl font-sans text-sm leading-7 text-[rgba(245,237,227,0.82)]">
                The site now has a clearer place to route people into the broader ecosystem without making the homepage feel like a link farm.
              </p>
            </div>
            <div className="grid gap-4 lg:grid-cols-3">
              {ventures.map((venture) => {
                const card = (
                  <>
                    <p className="mono-label text-[rgba(245,237,227,0.72)]">{venture.label}</p>
                    <h3 className="mt-8 font-display text-4xl leading-none text-[color:var(--dani-cream)]">{venture.title}</h3>
                    <p className="mt-5 font-sans text-sm leading-7 text-[rgba(245,237,227,0.74)]">{venture.copy}</p>
                    <p className="mt-8 font-sans text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[color:var(--dani-cream)]">
                      {venture.href ? 'Visit →' : 'Coming soon'}
                    </p>
                  </>
                )

                return venture.href ? (
                  <a
                    key={venture.title}
                    href={venture.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group border border-[rgba(245,237,227,0.32)] p-6 transition-colors hover:bg-[rgba(245,237,227,0.08)]"
                  >
                    {card}
                  </a>
                ) : (
                  <div
                    key={venture.title}
                    className="border border-[rgba(245,237,227,0.24)] p-6 opacity-80"
                  >
                    {card}
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
