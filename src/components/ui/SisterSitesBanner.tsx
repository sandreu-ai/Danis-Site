'use client'

import { motion } from 'framer-motion'

export function SisterSitesBanner() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="border-t pt-8 mb-8"
      style={{ borderColor: 'rgba(255,255,255,0.1)' }}
    >
      <p className="font-sans text-xs uppercase tracking-widest text-center mb-4" style={{ color: 'rgba(246,250,244,0.4)' }}>
        Also from us
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="flex items-start gap-3 rounded-xl p-4"
          style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
        >
          <span className="text-2xl">🌿</span>
          <div>
            <p className="font-sans text-sm font-semibold" style={{ color: '#F6FAF4' }}>Daniela Cerrato</p>
            <p className="font-sans text-xs mt-0.5" style={{ color: 'rgba(246,250,244,0.6)' }}>
              You&apos;re here — homeschool blog, shop & picks
            </p>
          </div>
        </motion.div>
        <motion.a
          href="https://thecurriculumcompass.com"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="flex items-start gap-3 rounded-xl p-4 transition-colors"
          style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.1)')}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.06)')}
        >
          <span className="text-2xl">🧭</span>
          <div>
            <p className="font-sans text-sm font-semibold" style={{ color: '#F6FAF4' }}>The Curriculum Compass</p>
            <p className="font-sans text-xs mt-0.5" style={{ color: 'rgba(246,250,244,0.6)' }}>
              Free curriculum quiz · 40+ reviews → thecurriculumcompass.com
            </p>
          </div>
        </motion.a>
        <motion.a
          href="https://statehomeschoollaws.com"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="flex items-start gap-3 rounded-xl p-4 transition-colors"
          style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.1)')}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.06)')}
        >
          <span className="text-2xl">📋</span>
          <div>
            <p className="font-sans text-sm font-semibold" style={{ color: '#F6FAF4' }}>State Homeschool Laws</p>
            <p className="font-sans text-xs mt-0.5" style={{ color: 'rgba(246,250,244,0.6)' }}>
              Plain-English law guides · All 50 states → statehomeschoollaws.com
            </p>
          </div>
        </motion.a>
      </div>
    </motion.div>
  )
}
