'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { SisterSitesBanner } from './SisterSitesBanner'

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
    <footer className="mt-auto" style={{ backgroundColor: '#2A3E2B', color: '#F6FAF4' }}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">
          <motion.div
            custom={0}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={colVariants}
          >
            <p className="text-xl font-bold mb-2" style={{ fontFamily: 'var(--font-fredoka)' }}>
              Daniela Cerrato
            </p>
            <p className="font-sans text-sm leading-relaxed" style={{ color: 'rgba(246,250,244,0.7)' }}>
              Simple homeschooling resources and real encouragement for moms who are figuring it out
              as they go — just like me.
            </p>
          </motion.div>

          <motion.div
            custom={1}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={colVariants}
          >
            <p className="font-sans text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgba(246,250,244,0.5)' }}>
              Explore
            </p>
            <ul className="space-y-2">
              {[
                { href: '/blog', label: 'Blog' },
                { href: '/shop', label: 'Shop' },
                { href: '/library', label: "Dani's Picks" },
                { href: '/about', label: 'About' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm py-1 inline-block transition-colors"
                    style={{ color: 'rgba(246,250,244,0.7)' }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#4A8C4E')}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(246,250,244,0.7)')}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            custom={2}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={colVariants}
          >
            <p className="font-sans text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgba(246,250,244,0.5)' }}>
              Connect
            </p>
            <a
              href="https://www.instagram.com/thedanicerrato"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-sans text-sm transition-colors"
              style={{ color: 'rgba(246,250,244,0.7)' }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#4A8C4E')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(246,250,244,0.7)')}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              @thedanicerrato
            </a>
          </motion.div>
        </div>

        <SisterSitesBanner />

        <div className="border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-2" style={{ borderColor: 'rgba(246,250,244,0.1)' }}>
          <p className="font-sans text-xs" style={{ color: 'rgba(246,250,244,0.4)' }}>
            © {new Date().getFullYear()} Daniela Cerrato. All rights reserved.
          </p>
          <p className="font-sans text-xs" style={{ color: 'rgba(246,250,244,0.4)' }}>
            Made with love for homeschool families
          </p>
        </div>
      </div>
    </footer>
  )
}
