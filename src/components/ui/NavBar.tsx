'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { OurSitesDropdown } from './OurSitesDropdown'

const navLinks = [
  { href: '/blog', label: 'Journal' },
  { href: '/shop', label: 'Resources' },
  { href: '/library', label: "Dani's Picks" },
  { href: '/about', label: 'About' },
]

export function NavBar() {
  const [open, setOpen] = useState(false)

  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 28 }}
      className="sticky top-0 z-50 border-b backdrop-blur-md"
      style={{ backgroundColor: 'rgba(250,246,240,0.94)', borderColor: 'rgba(230,216,199,0.92)' }}
    >
      <nav className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex h-16 items-center justify-between sm:h-[72px]">
          <Link href="/" className="group flex items-center gap-3 transition-colors">
            <span className="flex h-9 w-9 items-center justify-center border border-[color:var(--dani-gold)] font-display text-xl italic leading-none text-[color:var(--dani-espresso)]">
              DC
            </span>
            <span className="font-display text-2xl italic leading-none tracking-[-0.03em] text-[color:var(--dani-espresso)]">
              Daniela Cerrato
            </span>
          </Link>

          <ul className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[color:var(--dani-cocoa)] transition-colors hover:text-[color:var(--dani-espresso)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <OurSitesDropdown />
            </li>
          </ul>

          <button
            onClick={() => setOpen(!open)}
            className="flex min-h-[48px] min-w-[48px] items-center justify-center p-2 text-[color:var(--dani-espresso)] transition-colors md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              className="overflow-hidden border-t md:hidden"
              style={{ borderColor: 'rgba(226,211,194,0.9)' }}
            >
              <ul className="flex flex-col gap-1 py-4">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex min-h-[48px] items-center px-2 py-3 font-sans text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--dani-cocoa)] transition-colors hover:text-[color:var(--dani-espresso)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li className="mt-1 border-t pt-3" style={{ borderColor: 'rgba(226,211,194,0.9)' }}>
                  <p className="mono-label px-2 mb-2">Our Sites</p>
                  <a
                    href="https://thecurriculumcompass.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-[48px] items-center gap-2 px-2 py-3 font-sans text-sm text-[color:var(--dani-cocoa)] transition-colors hover:text-[color:var(--dani-espresso)]"
                  >
                    The Curriculum Compass
                  </a>
                  <a
                    href="https://statehomeschoollaws.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-[48px] items-center gap-2 px-2 py-3 font-sans text-sm text-[color:var(--dani-cocoa)] transition-colors hover:text-[color:var(--dani-espresso)]"
                  >
                    State Homeschool Laws
                  </a>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}
