'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

interface CategoryFilterProps {
  categories: string[]
  selectedCategory?: string
}

export function CategoryFilter({ categories, selectedCategory }: CategoryFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const setCategory = useCallback(
    (category: string | null) => {
      const params = new URLSearchParams(searchParams.toString())
      if (category) {
        params.set('category', category)
      } else {
        params.delete('category')
      }
      params.delete('page')
      router.push(`/blog?${params.toString()}`)
    },
    [router, searchParams]
  )

  if (categories.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => setCategory(null)}
        className={`rounded-full px-4 py-2 font-sans text-sm font-medium transition-all min-h-[44px] ${
          !selectedCategory
            ? 'bg-sage text-white'
            : 'bg-linen text-charcoal hover:bg-sage/10 hover:text-sage'
        }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setCategory(cat)}
          className={`rounded-full px-4 py-2 font-sans text-sm font-medium transition-all min-h-[44px] ${
            selectedCategory === cat
              ? 'bg-sage text-white'
              : 'bg-linen text-charcoal hover:bg-sage/10 hover:text-sage'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}
