'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface BouncyButtonProps {
  href?: string
  onClick?: () => void
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  type?: 'button' | 'submit'
  disabled?: boolean
  external?: boolean
}

export function BouncyButton({
  href,
  onClick,
  children,
  className,
  style,
  type = 'button',
  disabled = false,
  external = false,
}: BouncyButtonProps) {
  const spring = { type: 'spring' as const, stiffness: 400, damping: 17 }
  const hoverStyle = { scale: 1.05, y: -2 }
  const tapStyle = { scale: 0.96 }

  if (href && external) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        style={style}
        whileHover={hoverStyle}
        whileTap={tapStyle}
        transition={spring}
      >
        {children}
      </motion.a>
    )
  }

  if (href) {
    return (
      <motion.div whileHover={hoverStyle} whileTap={tapStyle} transition={spring} className="inline-block">
        <Link href={href} className={className} style={style}>
          {children}
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
      style={style}
      whileHover={disabled ? {} : hoverStyle}
      whileTap={disabled ? {} : tapStyle}
      transition={spring}
    >
      {children}
    </motion.button>
  )
}
