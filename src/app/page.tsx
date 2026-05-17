import Image from 'next/image'
import Link from 'next/link'
import { NavBar } from '@/components/ui/NavBar'
import { Footer } from '@/components/ui/Footer'
import { PostCard } from '@/components/blog/PostCard'
import { ProductCard } from '@/components/shop/ProductCard'
import { LibraryCard } from '@/components/library/LibraryCard'
import { EmailSignup } from '@/components/ui/EmailSignup'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { createClient } from '@/lib/supabase/server'

export const revalidate = 3600

const brandPhotos = [
  {
    src: '/dani-brand/craft-table.jpg',
    alt: 'Daniela smiling with her children during a hands-on home activity',
    eyebrow: 'Real mornings',
    caption: 'Hands-on days that feel useful, human, and doable.',
  },
  {
    src: '/dani-brand/family-beach.jpg',
    alt: 'Daniela with her family under a beach palapa',
    eyebrow: 'Family rhythms',
    caption: 'A life of learning that leaves room for delight.',
  },
  {
    src: '/dani-brand/kitchen-lab-new.jpg',
    alt: 'Daniela guiding a kitchen science activity with her children',
    eyebrow: 'Curious kids',
    caption: 'Simple experiments, practical guidance, and wonder at the table.',
  },
  {
    src: '/dani-brand/creek-day.jpg',
    alt: 'Daniela and her children exploring rocks near a creek',
    eyebrow: 'Outside the page',
    caption: 'Learning that moves through the home, the trail, and the ordinary day.',
  },
]

const pillars = [
  {
    number: '01',
    title: 'Slow mornings',
    copy: 'Gentle structure for days that need peace, not pressure.',
  },
  {
    number: '02',
    title: 'Capable kids',
    copy: 'Practical rhythms that help children become curious, helpful, and steady.',
  },
  {
    number: '03',
    title: 'Intentional homes',
    copy: 'Encouragement, resources, and real examples for families learning together.',
  },
]

const ventures = [
  {
    title: 'State Homeschool Laws',
    copy: 'Clear state-by-state starting points for families who need the legal basics without the spiral.',
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
    <div className="mb-10 grid gap-5 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
      <div>
        <p className="section-label mb-5">{label}</p>
        <h2 className="dani-display text-5xl sm:text-6xl lg:text-7xl">{title}</h2>
      </div>
      {copy && <p className="max-w-2xl font-sans text-sm leading-7 text-[color:var(--dani-cocoa)] sm:text-base">{copy}</p>}
    </div>
  )
}

function SafePhoto({
  src,
  alt,
  className = '',
  priority = false,
  sizes = '(max-width: 1024px) 100vw, 50vw',
}: {
  src: string
  alt: string
  className?: string
  priority?: boolean
  sizes?: string
}) {
  return (
    <div className={`safe-photo-frame ${className}`}>
      <Image src={src} alt={alt} fill priority={priority} className="object-contain" sizes={sizes} />
    </div>
  )
}

export default async function HomePage() {
  const { posts, products, library } = await getData()

  return (
    <>
      <NavBar />
      <main className="editorial-shell flex-1">
        <section className="px-3 py-4 sm:px-5 sm:py-6">
          <div className="mx-auto grid max-w-7xl overflow-hidden border border-[color:var(--dani-rule)] bg-[color:var(--dani-paper)] lg:min-h-[calc(100vh-112px)] lg:grid-cols-[0.93fr_1.07fr]">
            <div className="relative z-10 flex flex-col justify-between p-7 sm:p-10 lg:p-14 xl:p-16">
              <div>
                <p className="section-label mb-8">Daniela Cerrato</p>
                <h1 className="dani-display max-w-4xl text-[4.4rem] sm:text-[6.4rem] lg:text-[7.7rem] xl:text-[8.4rem]">
                  Raise them <em>on purpose.</em>
                </h1>
                <p className="mt-8 max-w-xl font-sans text-base leading-8 text-[color:var(--dani-cocoa)]">
                  Real homeschool rhythms, curriculum guidance, and family-centered encouragement from a former teacher turned mom of four.
                </p>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <Link href="/blog" className="editorial-button">Read the Journal</Link>
                  <Link href="/library" className="editorial-button secondary">Dani&apos;s Picks</Link>
                </div>
              </div>

              <div className="mt-12 grid gap-4 border-t border-[color:var(--dani-rule)] pt-6 sm:grid-cols-3">
                {pillars.map((pillar) => (
                  <div key={pillar.number}>
                    <p className="font-display text-3xl leading-none text-[color:var(--dani-gold)]">{pillar.number}</p>
                    <h2 className="mt-3 font-display text-2xl leading-none text-[color:var(--dani-espresso)]">{pillar.title}</h2>
                    <p className="mt-3 font-sans text-xs leading-6 text-[color:var(--dani-cocoa)]">{pillar.copy}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative min-h-[660px] bg-[color:var(--dani-sand)] p-3 sm:p-5 lg:min-h-full lg:p-7">
              <div className="absolute inset-0 opacity-70 [background:radial-gradient(circle_at_25%_10%,rgba(255,255,255,0.78),transparent_34%),linear-gradient(145deg,rgba(250,246,240,0.22),rgba(184,153,104,0.20))]" />
              <SafePhoto
                src="/dani-brand/bookshelf-hero.jpg"
                alt="Daniela Cerrato standing in front of family bookshelves"
                priority
                className="relative h-full min-h-[630px] border border-[rgba(184,153,104,0.42)] bg-[color:var(--dani-ivory)] shadow-[0_30px_80px_-45px_rgba(31,26,23,0.6)]"
                sizes="(max-width: 1024px) 100vw, 54vw"
              />
            </div>
          </div>
        </section>

        <section className="px-3 pb-4 sm:px-5 sm:pb-6">
          <div className="mx-auto max-w-7xl bg-[color:var(--dani-espresso)] p-4 sm:p-6 lg:p-10">
            <EmailSignup />
          </div>
        </section>

        <section className="px-3 pb-4 sm:px-5 sm:pb-6">
          <div className="mx-auto max-w-7xl bg-[color:var(--dani-cream)] p-6 sm:p-10 lg:p-14">
            <SectionHeader
              label="The heart of the work"
              title={<>Curious children, intentional <em>homes.</em></>}
              copy="The site should feel like Daniela herself: tender, grounded, useful, and quietly confident. Not over-produced. Not noisy. Just clear guidance and real family rhythms with an editorial finish."
            />

            <div className="grid gap-4 lg:grid-cols-[0.88fr_1.12fr]">
              <AnimatedSection direction="left" className="border border-[color:var(--dani-rule)] bg-[color:var(--dani-paper)] p-7 sm:p-10">
                <p className="mono-label">Meet Daniela</p>
                <h3 className="mt-8 font-display text-4xl leading-tight sm:text-5xl">
                  A home can be gentle and still raise capable kids.
                </h3>
                <p className="mt-6 font-sans text-sm leading-7 text-[color:var(--dani-cocoa)]">
                  Hi, I&apos;m Daniela — a homeschool mom sharing the practical middle: what we try, what helps, what flops, and what keeps our days moving with more peace and less noise.
                </p>
                <p className="mt-4 font-sans text-sm leading-7 text-[color:var(--dani-cocoa)]">
                  If you&apos;re wondering whether you can really do this, you can. The goal is not a perfect schoolroom. The goal is a life of curiosity, faithfulness, and steady growth together.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link href="/about" className="editorial-button">About Daniela</Link>
                  <a href="https://www.instagram.com/thedanicerrato" target="_blank" rel="noopener noreferrer" className="editorial-button secondary">
                    Instagram
                  </a>
                </div>
              </AnimatedSection>

              <AnimatedSection direction="right" className="grid gap-4 sm:grid-cols-2">
                {brandPhotos.map((photo, index) => (
                  <figure key={photo.src} className={`${index === 0 ? 'sm:col-span-2' : ''} border border-[color:var(--dani-rule)] bg-[color:var(--dani-paper)] p-3`}>
                    <SafePhoto
                      src={photo.src}
                      alt={photo.alt}
                      className={index === 0 ? 'h-[440px]' : 'h-[300px]'}
                      sizes={index === 0 ? '(max-width: 1024px) 100vw, 55vw' : '(max-width: 768px) 100vw, 27vw'}
                    />
                    <figcaption className="px-2 pb-1 pt-4">
                      <p className="mono-label">{photo.eyebrow}</p>
                      <p className="mt-2 font-sans text-sm leading-6 text-[color:var(--dani-cocoa)]">{photo.caption}</p>
                    </figcaption>
                  </figure>
                ))}
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
                  title={<>Real rhythms for real <em>families.</em></>}
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
          <div className="mx-auto max-w-7xl bg-[color:var(--dani-espresso)] p-6 text-[color:var(--dani-cream)] sm:p-10 lg:p-14">
            <div className="mb-10 grid gap-5 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
              <div>
                <p className="mb-5 flex items-center gap-3 font-sans text-[0.58rem] font-semibold uppercase tracking-[0.3em] text-[rgba(250,246,240,0.74)] after:h-px after:flex-1 after:bg-[rgba(250,246,240,0.22)]">Ventures</p>
                <h2 className="dani-display text-5xl text-[color:var(--dani-cream)] sm:text-6xl lg:text-7xl">A family of useful <em>projects.</em></h2>
              </div>
              <p className="max-w-2xl font-sans text-sm leading-7 text-[rgba(250,246,240,0.78)] sm:text-base">
                A clean pathway into Daniela&apos;s broader ecosystem — helpful tools without turning the homepage into a link farm.
              </p>
            </div>
            <div className="grid gap-4 lg:grid-cols-3">
              {ventures.map((venture) => {
                const card = (
                  <>
                    <p className="mono-label text-[rgba(250,246,240,0.68)]">{venture.label}</p>
                    <h3 className="mt-8 font-display text-4xl leading-none text-[color:var(--dani-cream)]">{venture.title}</h3>
                    <p className="mt-5 font-sans text-sm leading-7 text-[rgba(250,246,240,0.72)]">{venture.copy}</p>
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
                    className="group border border-[rgba(250,246,240,0.24)] p-6 transition-colors hover:bg-[rgba(250,246,240,0.07)]"
                  >
                    {card}
                  </a>
                ) : (
                  <div key={venture.title} className="border border-[rgba(250,246,240,0.18)] p-6 opacity-80">
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
