'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { BouncyButton } from './BouncyButton'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
}

const slideLeft = {
  hidden: { opacity: 0, x: -24 },
  show: { opacity: 1, x: 0, transition: { type: 'spring' as const, stiffness: 220, damping: 24 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 200, damping: 22 } },
}

export function DaniHeroText() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="relative z-10 w-full pb-16 sm:pb-24 px-6 lg:px-8 max-w-7xl mx-auto text-white"
    >
      <motion.p
        variants={slideLeft}
        className="section-label mb-3"
        style={{ color: 'rgba(255,255,255,0.9)' }}
      >
        welcome, mama
      </motion.p>
      <motion.h1
        variants={fadeUp}
        style={{ fontFamily: 'var(--font-fredoka)', fontWeight: 600 }}
        className="max-w-2xl text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6"
      >
        Homeschooling Is Simpler Than You Think
      </motion.h1>
      <motion.p variants={fadeUp} className="font-sans text-lg mb-8 max-w-lg" style={{ color: 'rgba(255,255,255,0.8)' }}>
        Real resources, honest encouragement, and a community of moms who get it.
        You can do this — and you don&apos;t have to figure it out alone.
      </motion.p>
      <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3">
        <BouncyButton
          href="/shop"
          className="inline-flex items-center justify-center font-sans text-sm font-semibold tracking-wider uppercase px-10 py-4 rounded-full transition-colors duration-300 min-h-[52px]"
          style={{ backgroundColor: '#F5C430', color: '#2A3E2B' }}
        >
          Get the Resources
        </BouncyButton>
        <BouncyButton
          href="/blog"
          className="inline-flex items-center justify-center font-sans text-sm font-semibold tracking-wider uppercase px-10 py-4 rounded-full border-2 text-white transition-all duration-300 min-h-[52px] hover:bg-white/10"
          style={{ borderColor: 'rgba(255,255,255,0.6)' }}
        >
          Read the Blog
        </BouncyButton>
      </motion.div>
    </motion.div>
  )
}
