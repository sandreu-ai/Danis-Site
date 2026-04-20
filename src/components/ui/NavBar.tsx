'use client'

import Link from 'next/link'
import { useState } from 'react'

const navLinks = [
  { href: '/blog', label: 'Blog' },
  { href: '/shop', label: 'Shop' },
  { href: '/library', label: "Dani's Picks" },
  { href: '/about', label: 'About' },
]

export function NavBar() {
  const [open, setOpen] = useState(false)

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-sm border-b"
      style={{ backgroundColor: 'rgba(255,255,255,0.97)', borderColor: '#EDF5E1' }}
    >
      <nav className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
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
          <ul className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-sans text-sm tracking-wider uppercase transition-colors"
                  style={{ color: '#8A9E8B' }}
                  onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#4A8C4E' }}
                  onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#8A9E8B' }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
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
        {open && (
          <div className="md:hidden border-t py-6" style={{ borderColor: '#EDF5E1' }}>
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block px-2 py-3 font-sans text-sm tracking-wider uppercase transition-colors min-h-[44px] flex items-center"
                    style={{ color: '#8A9E8B' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  )
}
