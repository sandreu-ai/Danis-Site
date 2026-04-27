'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { OurSitesDropdown } from './OurSitesDropdown'

const navLinks = [
  { href: '/blog', label: 'Blog' },
  { href: '/shop', label: 'Shop' },
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
      className="sticky top-0 z-50 backdrop-blur-sm border-b"
      style={{ backgroundColor: 'rgba(255,255,255,0.97)', borderColor: '#EDF5E1' }}
    >
      <nav className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-[72px]">
          {/* Logo */}
          <Link
            href="/"
            className="transition-colors"
            style={{
              fontFamily: 'var(--font-fredoka)',
              fontSize: '1.25rem',
              fontWeight: 600,
              color: '#2A3E2B',
            }}
          >
            Daniela Cerrato
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-sans text-sm tracking-wider uppercase transition-colors"
                  style={{ color: '#8A9E8B' }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#4A8C4E')}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#8A9E8B')}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <OurSitesDropdown />
            </li>
          </ul>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center"
            style={{ color: '#2A3E2B' }}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              className="md:hidden border-t overflow-hidden"
              style={{ borderColor: '#EDF5E1' }}
            >
              <ul className="flex flex-col gap-1 py-4">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block px-2 py-3 font-sans text-sm tracking-wider uppercase transition-colors min-h-[48px] flex items-center"
                      style={{ color: '#8A9E8B' }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#4A8C4E')}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = '#8A9E8B')}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li className="border-t pt-3 mt-1" style={{ borderColor: '#EDF5E1' }}>
                  <p className="px-2 font-sans text-xs uppercase tracking-widest mb-2" style={{ color: '#8A9E8B' }}>
                    Our Sites
                  </p>
                  <a
                    href="https://thecurriculumcompass.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-2 py-3 font-sans text-sm min-h-[48px] transition-colors"
                    style={{ color: '#8A9E8B' }}
                  >
                    🧭 The Curriculum Compass
                  </a>
                  <a
                    href="https://statehomeschoollaws.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-2 py-3 font-sans text-sm min-h-[48px] transition-colors"
                    style={{ color: '#8A9E8B' }}
                  >
                    📋 State Homeschool Laws
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
