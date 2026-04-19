interface BadgeProps {
  children: React.ReactNode
  variant?: 'sage' | 'rose' | 'neutral'
  className?: string
}

export function Badge({ children, variant = 'sage', className = '' }: BadgeProps) {
  const variants = {
    sage: 'bg-sage/15 text-sage-dark',
    rose: 'bg-rose/15 text-rose-dark',
    neutral: 'bg-linen text-charcoal-light',
  }

  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold tracking-wide font-sans ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
