'use client'

import { motion } from 'framer-motion'
import { AnimatedSection } from './AnimatedSection'
import { BouncyButton } from './BouncyButton'

const badges = [
  '40+ curricula reviewed',
  '50 state laws covered',
  'Always free',
]

export function CompassSiteSection() {
  return (
    <AnimatedSection className="mx-auto max-w-6xl px-6 lg:px-8 py-16 sm:py-20">
      <motion.div
        className="rounded-2xl p-8 sm:p-12 text-center"
        style={{ backgroundColor: '#2A3E2B' }}
        whileHover={{ boxShadow: '0 20px 60px rgba(42,62,43,0.25)' }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-5xl mb-4">🧭</div>
        <h2
          className="text-2xl sm:text-3xl mb-4 leading-snug"
          style={{ fontFamily: 'var(--font-fredoka)', color: '#F6FAF4', fontWeight: 600 }}
        >
          Overwhelmed by Curriculum Choices?
        </h2>
        <p className="font-sans leading-relaxed mb-6 max-w-xl mx-auto" style={{ color: 'rgba(246,250,244,0.8)' }}>
          We built a free 20-question quiz that matches your family to the perfect homeschool
          curriculum — covering every approach, faith background, and budget. Takes 5 minutes.
        </p>
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {badges.map((badge) => (
            <span
              key={badge}
              className="font-sans text-xs px-3 py-1.5 rounded-full"
              style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'rgba(246,250,244,0.8)' }}
            >
              ✓ {badge}
            </span>
          ))}
        </div>
        <BouncyButton
          href="https://thecurriculumcompass.com/quiz"
          external
          className="inline-block font-sans font-bold px-8 py-4 rounded-xl text-base"
          style={{ backgroundColor: '#F5C430', color: '#2A3E2B' }}
        >
          Take the Free Quiz →
        </BouncyButton>
      </motion.div>
    </AnimatedSection>
  )
}
