'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'

interface BuyButtonProps {
  productId: string
  productTitle: string
  productPrice: number
  productCoverUrl: string | null
  productSlug: string
}

export function BuyButton({
  productId,
  productTitle,
  productPrice,
  productCoverUrl,
  productSlug,
}: BuyButtonProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleBuy() {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId,
          productTitle,
          productPrice,
          productCoverUrl,
          productSlug,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? 'Something went wrong. Please try again.')
        return
      }

      window.location.href = data.url
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Button
        onClick={handleBuy}
        loading={loading}
        size="lg"
        className="w-full sm:w-auto"
      >
        {loading ? 'Redirecting…' : 'Buy Now'}
      </Button>
      {error && (
        <p className="mt-2 text-sm text-red-500 font-sans">{error}</p>
      )}
    </div>
  )
}
