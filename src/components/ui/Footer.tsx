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
                  className="flex items-center gap-2 font-sans text-sm transition-colors"
                  style={{ color: 'rgba(246,250,244,0.7)' }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#4A8C4E')}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(246,250,244,0.7)')}
                >
                  <span className="font-semibold">{social.label}</span>
                  <span>{social.handle}</span>
                </a>
              ))}
            </div>
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
