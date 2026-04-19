import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createCheckoutSession } from '@/lib/stripe'

const Schema = z.object({
  productId: z.string().uuid(),
  productTitle: z.string().min(1),
  productPrice: z.number().int().positive(),
  productCoverUrl: z.string().url().nullable().optional(),
  productSlug: z.string().min(1),
})

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}))
  const parsed = Schema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  try {
    const session = await createCheckoutSession(parsed.data)
    return NextResponse.json({ url: session.url })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to create checkout session'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
