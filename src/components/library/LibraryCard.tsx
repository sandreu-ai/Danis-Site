'use client'

import Image from 'next/image'
import { Badge } from '@/components/ui/Badge'
import type { RecommendedProduct } from '@/types'

interface LibraryCardProps {
  item: RecommendedProduct
}

export function LibraryCard({ item }: LibraryCardProps) {
  return (
    <article className="flex h-full flex-col border border-[color:var(--dani-rule)] bg-[color:var(--dani-cream)]">
      {item.image_url ? (
        <div className="relative aspect-[5/4] overflow-hidden bg-[color:var(--dani-sand)]">
          <Image
            src={item.image_url}
            alt={item.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </div>
      ) : (
        <div className="flex aspect-[5/4] items-center justify-center bg-[color:var(--dani-sand)] p-6 text-center">
          <span className="mono-label">Dani's pick</span>
        </div>
      )}

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-4 flex items-start gap-2">
          <h3 className="flex-1 font-display text-3xl leading-none text-[color:var(--dani-espresso)]">
            {item.title}
          </h3>
          {item.category && (
            <Badge variant="neutral" className="mt-0.5 shrink-0">
              {item.category}
            </Badge>
          )}
        </div>

        {item.description && (
          <p className="mb-5 font-sans text-sm leading-7 text-[color:var(--dani-cocoa)]">
            {item.description}
          </p>
        )}

        <a
          href={item.affiliate_url}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="editorial-button secondary mt-auto w-full"
        >
          Check it out →
        </a>
      </div>
    </article>
  )
}
