'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const colVariants = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 260, damping: 26, delay: i * 0.1 },
  }),
}

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[rgba(245,237,227,0.22)] bg-[color:var(--dani-espresso)] text-[color:var(--dani-cream)]">
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-[1.3fr_0.7fr_0.8fr]">
          <motion.div custom={0} initial="hidden" whileInView="show" viewport={{ once: true }} variants={colVariants}>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center border border-[rgba(245,237,227,0.7)] font-display text-xl leading-none">
                dc
              </span>
              <p className="font-display text-3xl leading-none">Daniela Cerrato</p>
            </div>
            <p className="mt-5 max-w-md font-sans text-sm leading-7 text-[rgba(245,237,227,0.68)]">
              Real rhythms for real families — homeschool resources, intentional parenting notes,
              and honest encouragement for the middle of motherhood.
            </p>
          </motion.div>

          <motion.div custom={1} initial="hidden" whileInView="show" viewport={{ once: true }} variants={colVariants}>
            <p className="mono-label mb-5 text-[rgba(245,237,227,0.55)]">Explore</p>
            <ul className="space-y-3">
              {[
                { href: '/blog', label: 'Journal' },
                { href: '/shop', label: 'Resources' },
                { href: '/library', label: "Dani's Picks" },
                { href: '/about', label: 'About' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-[rgba(245,237,227,0.72)] transition-colors hover:text-[color:var(--dani-cream)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div custom={2} initial="hidden" whileInView="show" viewport={{ once: true }} variants={colVariants}>
            <p className="mono-label mb-5 text-[rgba(245,237,227,0.55)]">Connect</p>
            <div className="space-y-3">
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
                  className="flex items-center gap-2 font-sans text-sm text-[rgba(245,237,227,0.72)] transition-colors hover:text-[color:var(--dani-cream)]"
                >
                  <span className="font-semibold">{social.label}</span>
                  <span>{social.handle}</span>
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="mt-8 border-t border-[rgba(245,237,227,0.13)] pt-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-sans text-xs text-[rgba(245,237,227,0.44)]">
            © {new Date().getFullYear()} Daniela Cerrato. All rights reserved.
          </p>
          <p className="font-sans text-xs text-[rgba(245,237,227,0.44)]">
            Warm, practical, and built for real homes.
          </p>
        </div>
      </div>
    </footer>
  )
}
