'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 180, damping: 24 } },
}

export function DaniHeroText() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 px-6 py-10 sm:py-14 lg:grid-cols-[1.08fr_0.92fr] lg:px-8"
    >
      <motion.div variants={fadeUp} className="editorial-card p-7 sm:p-10 lg:p-12">
        <p className="section-label mb-8">Daniela Cerrato</p>
        <h1 className="dani-display max-w-3xl text-[4.6rem] sm:text-[6.5rem] lg:text-[7.9rem]">
          Raise them <em>on purpose.</em>
        </h1>
        <p className="mt-7 max-w-xl font-sans text-sm leading-7 text-[color:var(--dani-cocoa)] sm:text-base">
          Real rhythms for real families — homeschool encouragement, practical resources,
          and honest notes from the middle of motherhood.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/library" className="editorial-button">
            Dani&apos;s Picks
          </Link>
          <Link href="/blog" className="editorial-button secondary">
            Read the Journal
          </Link>
        </div>
      </motion.div>

      <motion.aside
        variants={fadeUp}
        className="border border-[color:var(--dani-rule)] bg-[color:var(--dani-sand)] p-6 lg:self-end"
      >
        <p className="mono-label">Current note</p>
        <p className="mt-6 font-display text-3xl leading-tight text-[color:var(--dani-espresso)] sm:text-4xl">
          Slow mornings, capable kids, and a home that leaves room for wonder.
        </p>
        <div className="mt-8 grid grid-cols-3 border-y border-[color:var(--dani-rule)] py-5 text-center">
          <div>
            <p className="font-display text-3xl leading-none">01</p>
            <p className="mono-label mt-2">Rhythms</p>
          </div>
          <div className="border-x border-[color:var(--dani-rule)]">
            <p className="font-display text-3xl leading-none">02</p>
            <p className="mono-label mt-2">Learning</p>
          </div>
          <div>
            <p className="font-display text-3xl leading-none">03</p>
            <p className="mono-label mt-2">Home</p>
          </div>
        </div>
        <p className="mt-6 font-sans text-xs leading-6 text-[color:var(--dani-cocoa)]">
          Warm, practical, never polished for the sake of looking polished.
        </p>
      </motion.aside>
    </motion.div>
  )
}
