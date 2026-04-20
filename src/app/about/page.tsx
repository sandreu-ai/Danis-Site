import type { Metadata } from 'next'
import Link from 'next/link'
import { NavBar } from '@/components/ui/NavBar'
import { Footer } from '@/components/ui/Footer'
import { EmailSignup } from '@/components/ui/EmailSignup'

export const metadata: Metadata = {
  title: 'About Daniela',
  description:
    'Meet Daniela — a homeschool mom who gets it. Real life, real kids, real encouragement. You are not alone in this journey.',
}

export default function AboutPage() {
  return (
    <>
      <NavBar />
      <main className="flex-1">
        {/* Hero */}
        <div className="bg-cream py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <p className="section-label mb-3">about me</p>
            <h1 className="font-serif text-4xl sm:text-5xl text-charcoal">
              Hi, I&apos;m Daniela
            </h1>
          </div>
        </div>

        <div className="mx-auto max-w-4xl px-6 lg:px-8 py-14 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-14">
            {/* Photo placeholder */}
            <div className="lg:col-span-1">
              <div className="aspect-[4/5] bg-linen flex flex-col items-center justify-center border border-linen">
                <svg className="w-14 h-14 text-stone/20 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <p className="font-sans text-xs tracking-widest uppercase" style={{color: '#8A8178'}}>Your photo here</p>
              </div>

              <div className="mt-8">
                <p className="font-sans text-xs tracking-widest uppercase mb-4" style={{color: '#8A8178'}}>Find me on Instagram</p>
                <a
                  href="https://www.instagram.com/thedanicerrato"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-sans text-sm text-charcoal hover:text-sage transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  @thedanicerrato
                </a>
              </div>
            </div>

            {/* Bio */}
            <div className="lg:col-span-2 space-y-5 font-sans leading-relaxed" style={{color: '#5A5A5A'}}>
              <p>
                I&apos;m a homeschool mom who never planned on homeschooling. Then one
                day I started, and everything changed — not because it was perfect,
                but because it was <em>ours</em>. We learned together, struggled
                together, and grew together in ways I never expected.
              </p>
              <p>
                Here&apos;s what I want you to know: homeschooling doesn&apos;t have to
                be complicated. It doesn&apos;t require a perfect schedule, an expensive
                curriculum, or a dedicated schoolroom. It requires showing up for
                your kids — and that&apos;s something you&apos;re already doing.
              </p>
              <p>
                I started sharing our journey on Instagram as
                {' '}<a
                  href="https://www.instagram.com/thedanicerrato"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-charcoal underline underline-offset-2 hover:text-sage transition-colors"
                >@thedanicerrato</a>{' '}
                because I wanted other moms to see the real version — the messy
                mornings, the unexpected breakthroughs, the days when everything
                clicks and the days when nothing does.
              </p>
              <p>
                The resources I create come from real experience in our home,
                tested by real kids. My picks in &ldquo;Dani&apos;s Picks&rdquo; are things
                we actually use and love — no fluff. And the blog is where I
                share the practical stuff: what&apos;s working, what I&apos;d do
                differently, and how to keep going on the hard days.
              </p>
              <p>
                Whether you&apos;re just starting to think about homeschooling or
                you&apos;re years in and hitting a wall — I&apos;m here. You are
                not alone, and you are more capable than you know. Let&apos;s
                do this together.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center bg-charcoal text-white font-sans text-sm tracking-widest uppercase px-8 py-4 hover:bg-sage transition-colors min-h-[44px]"
                >
                  Browse Resources
                </Link>
                <Link
                  href="/blog"
                  className="inline-flex items-center justify-center border border-charcoal/30 text-charcoal font-sans text-sm tracking-widest uppercase px-8 py-4 hover:border-sage hover:text-sage transition-all min-h-[44px]"
                >
                  Read the Blog
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Email signup */}
        <section className="bg-linen py-16 sm:py-20">
          <div className="mx-auto max-w-xl px-6">
            <EmailSignup />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
