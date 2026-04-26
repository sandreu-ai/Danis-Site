'use client'

import { motion } from 'framer-motion'
import { BouncyButton } from './BouncyButton'

export function QuizCalloutCard() {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="rounded-2xl p-6 sm:p-8 text-center"
      style={{ backgroundColor: '#2A3E2B' }}
    >
      <div className="text-4xl mb-3">🧭</div>
      <h3
        className="text-xl mb-2"
        style={{ fontFamily: 'var(--font-fredoka)', color: '#F6FAF4', fontWeight: 600 }}
      >
        Overwhelmed by curriculum choices?
      </h3>
      <p className="font-sans text-sm leading-relaxed mb-5 max-w-sm mx-auto" style={{ color: 'rgba(246,250,244,0.8)' }}>
        The Curriculum Compass has a free 5-minute quiz that matches your family to the perfect
        curriculum — covering 40+ options across every approach, faith, and budget.
      </p>
      <BouncyButton
        href="https://thecurriculumcompass.com/quiz"
        external
        className="inline-block font-sans font-bold px-6 py-3 rounded-xl text-sm"
        style={{ backgroundColor: '#F5C430', color: '#2A3E2B' }}
      >
        Take the Free Quiz →
      </BouncyButton>
      <p className="font-sans text-xs mt-3" style={{ color: 'rgba(246,250,244,0.5)' }}>
        Free · No email required · Results in minutes
      </p>
    </motion.div>
  )
}
