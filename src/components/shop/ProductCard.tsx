import Image from 'next/image'
import Link from 'next/link'
import { formatPrice } from '@/lib/utils'
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group bg-white rounded-card shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col">
      <Link href={`/shop/${product.slug}`}>
        {product.cover_image_url ? (
          <div className="relative aspect-[4/3] overflow-hidden rounded-t-card">
            <Image
              src={product.cover_image_url}
              alt={product.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ) : (
          <div className="aspect-[4/3] rounded-t-card bg-linen flex items-center justify-center">
            <svg className="w-12 h-12 text-sage/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        )}
        <div className="p-5 flex-1 flex flex-col">
          <h3 className="font-serif text-base font-bold text-charcoal mb-2 group-hover:text-sage transition-colors line-clamp-2">
            {product.title}
          </h3>
          <p className="font-sans text-lg font-bold text-sage mt-auto">
            {formatPrice(product.price)}
          </p>
        </div>
      </Link>
      <div className="px-5 pb-5">
        <Link
          href={`/shop/${product.slug}`}
          className="block w-full text-center bg-sage text-white font-sans font-semibold rounded-lg py-2.5 text-sm hover:bg-sage-dark transition-colors min-h-[44px] flex items-center justify-center"
        >
          View Details
        </Link>
      </div>
    </div>
  )
}
