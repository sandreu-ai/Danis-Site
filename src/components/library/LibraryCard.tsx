import Image from 'next/image'
import { Badge } from '@/components/ui/Badge'
import type { RecommendedProduct } from '@/types'

interface LibraryCardProps {
  item: RecommendedProduct
}

export function LibraryCard({ item }: LibraryCardProps) {
  return (
    <div className="bg-white rounded-card shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col">
      {item.image_url ? (
        <div className="relative aspect-[4/3] overflow-hidden rounded-t-card">
          <Image
            src={item.image_url}
            alt={item.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      ) : (
        <div className="aspect-[4/3] rounded-t-card bg-linen flex items-center justify-center">
          <svg className="w-12 h-12 text-sage/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
      )}

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-start gap-2 mb-2">
          <h3 className="font-serif text-base font-bold text-charcoal flex-1 line-clamp-2">
            {item.title}
          </h3>
          {item.category && (
            <Badge variant="neutral" className="shrink-0 mt-0.5">
              {item.category}
            </Badge>
          )}
        </div>

        {item.description && (
          <p className="font-sans text-sm text-charcoal-light leading-relaxed line-clamp-3 mb-4">
            {item.description}
          </p>
        )}

        <a
          href={item.affiliate_url}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="mt-auto block w-full text-center border-2 border-sage text-sage font-sans font-semibold rounded-lg py-2.5 text-sm hover:bg-sage hover:text-white transition-all min-h-[44px] flex items-center justify-center"
        >
          Check it out →
        </a>
      </div>
    </div>
  )
}
