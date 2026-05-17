'use client'

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'left' | 'right' | 'none'
}

export function AnimatedSection({ children, className }: AnimatedSectionProps) {
  return <div className={className}>{children}</div>
}
