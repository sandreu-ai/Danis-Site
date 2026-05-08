import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { NavBar } from '@/components/ui/NavBar'
import { Footer } from '@/components/ui/Footer'
import { EmailSignup } from '@/components/ui/EmailSignup'

export const metadata: Metadata = {
  title: 'About Daniela Cerrato — Homeschool Mom Encouragement',
  description:
    'Meet Daniela Cerrato, a homeschool mom sharing real-life encouragement, practical resources, and faith-grounded support for families learning at home.',
  alternates: {
    canonical: '/about',
  },
}

export default function AboutPage() {
  return (
    <>
      <NavBar />
      <main className="flex-1">

        {/* Hero */}
        <div className="decorative-bg py-16 sm:py-20" style={{ backgroundColor: '#F6FAF4' }}>
          <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-8">
            <p className="section-label mb-3">about me</p>
            <h1 className="text-4xl sm:text-5xl" style={{ color: '#2A3E2B' }}>
              Hi, I&apos;m Daniela
            </h1>
            <div className="divider" style={{ margin: '1rem 0' }} />
          </div>
        </div>

        <div className="mx-auto max-w-4xl px-6 lg:px-8 py-14 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-14">

            {/* Photo column */}
            <div className="lg:col-span-1 flex flex-col items-center lg:items-start gap-6">
              {/* Headshot — circular with sun border */}
              <div
                className="relative w-52 h-52 rounded-full overflow-hidden flex-shrink-0 border-4"
                style={{ borderColor: '#F5C430', boxShadow: '0 8px 40px rgba(42,62,43,0.15)' }}
              >
                <Image
                  src="/Daniela.jpg"
                  alt="Daniela Cerrato headshot"
                  fill
                  className="object-cover"
                  sizes="208px"
                />
              </div>

              {/* Family photo below */}
              <div
                className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden"
                style={{ boxShadow: '0 4px 20px rgba(42,62,43,0.08)' }}
              >
                <Image
                  src="/family.jpg"
                  alt="Daniela and her family"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 90vw, 300px"
                />
              </div>

              {/* Social links */}
              <div className="mt-2">
                <p
                  className="font-sans text-xs tracking-widest uppercase mb-3"
                  style={{ color: '#8A9E8B' }}
                >
                  Find me online
                </p>
                <div className="flex flex-col gap-2">
                  {[
                    { href: 'https://www.instagram.com/thedanicerrato', label: 'Instagram', handle: '@thedanicerrato' },
                    { href: 'https://www.facebook.com/thedanicerrato', label: 'Facebook', handle: '@thedanicerrato' },
                    { href: 'https://www.tiktok.com/@thedanicerrato', label: 'TikTok', handle: '@thedanicerrato' },
                  ].map((social) => (
                    <a
                      key={social.href}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-sans text-sm transition-colors"
                      style={{ color: '#2A3E2B' }}
                    >
                      <span className="font-semibold">{social.label}</span>
                      <span>{social.handle}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="lg:col-span-2 space-y-5 font-sans leading-relaxed" style={{ color: '#8A9E8B' }}>
              <p style={{ color: '#2A3E2B' }}>
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
                  className="underline underline-offset-2 transition-colors"
                  style={{ color: '#4A8C4E' }}
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
                  className="inline-flex items-center justify-center font-sans text-sm font-semibold tracking-wider uppercase px-8 py-4 rounded-full text-white transition-colors duration-300 min-h-[52px]"
                  style={{ backgroundColor: '#4A8C4E' }}
                >
                  Browse Resources
                </Link>
                <Link
                  href="/blog"
                  className="inline-flex items-center justify-center font-sans text-sm font-semibold tracking-wider uppercase px-8 py-4 rounded-full border-2 transition-all duration-300 min-h-[52px]"
                  style={{ borderColor: '#4A8C4E', color: '#4A8C4E' }}
                >
                  Read the Blog
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Email signup */}
        <section className="py-16 sm:py-20" style={{ backgroundColor: '#2A3E2B' }}>
          <div className="mx-auto max-w-xl px-6">
            <EmailSignup />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
