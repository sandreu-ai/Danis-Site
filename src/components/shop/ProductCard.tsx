'use client'

import Image from 'next/image'
import Link from 'next/link'
import { formatPrice } from '@/lib/utils'
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group flex h-full flex-col border border-[color:var(--dani-rule)] bg-[color:var(--dani-paper)]">
      <Link href={`/shop/${product.slug}`} className="block">
        {product.cover_image_url ? (
          <div className="relative aspect-[5/4] overflow-hidden bg-[color:var(--dani-sand)]">
            <Image
              src={product.cover_image_url}
              alt={product.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          </div>
        ) : (
          <div className="flex aspect-[5/4] items-center justify-center bg-[color:var(--dani-sand)] p-6 text-center">
            <span className="mono-label">Digital resource</span>
          </div>
        )}
        <div className="flex flex-1 flex-col p-5">
          <p className="mono-label mb-4">Resource</p>
          <h3 className="font-display text-3xl leading-none text-[color:var(--dani-espresso)] transition-colors group-hover:text-[color:var(--dani-blush-deep)]">
            {product.title}
          </h3>
          <p className="mt-5 font-sans text-sm font-semibold text-[color:var(--dani-cocoa)]">
            {formatPrice(product.price)}
          </p>
        </div>
      </Link>
      <div className="mt-auto px-5 pb-5">
        <Link href={`/shop/${product.slug}`} className="editorial-button secondary w-full">
          View Details
        </Link>
      </div>
    </article>
  )
}
