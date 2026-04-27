'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

export function OurSitesDropdown() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="font-sans text-sm tracking-wider uppercase transition-colors flex items-center gap-1"
        style={{ color: '#8A9E8B' }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#4A8C4E')}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = '#8A9E8B')}
      >
        Our Sites
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          className="w-3.5 h-3.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="absolute right-0 top-8 w-72 bg-white rounded-2xl border shadow-lg overflow-hidden z-50"
            style={{ borderColor: '#EDF5E1' }}
          >
            <div className="p-2">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="flex items-start gap-3 p-3 rounded-xl transition-colors duration-150 group"
                style={{ color: '#2A3E2B' }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = '#F6FAF4')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = 'transparent')}
              >
                <span className="text-2xl mt-0.5">🌿</span>
                <div>
                  <p className="font-heading text-sm" style={{ color: '#2A3E2B', fontFamily: 'var(--font-fredoka)' }}>
                    Daniela Cerrato
                  </p>
                  <p className="font-sans text-xs mt-0.5" style={{ color: '#8A9E8B' }}>
                    Blog · Shop · Dani&apos;s Picks
                  </p>
                </div>
              </Link>
              <a
                href="https://thecurriculumcompass.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-start gap-3 p-3 rounded-xl transition-colors duration-150"
                style={{ color: '#2A3E2B' }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = '#F6FAF4')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = 'transparent')}
              >
                <span className="text-2xl mt-0.5">🧭</span>
                <div>
                  <p className="font-heading text-sm" style={{ color: '#2A3E2B', fontFamily: 'var(--font-fredoka)' }}>
                    The Curriculum Compass
                  </p>
                  <p className="font-sans text-xs mt-0.5" style={{ color: '#8A9E8B' }}>
                    Free quiz · 40+ curricula · 50 state laws
                  </p>
                </div>
              </a>
              <a
                href="https://statehomeschoollaws.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-start gap-3 p-3 rounded-xl transition-colors duration-150"
                style={{ color: '#2A3E2B' }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = '#F6FAF4')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = 'transparent')}
              >
                <span className="text-2xl mt-0.5">📋</span>
                <div>
                  <p className="font-heading text-sm" style={{ color: '#2A3E2B', fontFamily: 'var(--font-fredoka)' }}>
                    State Homeschool Laws
                  </p>
                  <p className="font-sans text-xs mt-0.5" style={{ color: '#8A9E8B' }}>
                    Plain-English guides · All 50 states
                  </p>
                </div>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
