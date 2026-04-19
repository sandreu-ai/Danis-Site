export const runtime = 'nodejs'

import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { stripe } from '@/lib/stripe'
import { createAdminClient } from '@/lib/supabase/admin'
import { generateSignedDownloadUrl } from '@/lib/utils'
import { sendPurchaseConfirmation } from '@/lib/resend'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Webhook verification failed'
    return NextResponse.json({ error: message }, { status: 400 })
  }

  if (event.type !== 'checkout.session.completed') {
    return NextResponse.json({ received: true })
  }

  const session = event.data.object as Stripe.Checkout.Session

  const email = session.customer_details?.email
  const productId = session.metadata?.productId

  if (!email || !productId) {
    return NextResponse.json({ error: 'Missing email or productId' }, { status: 400 })
  }

  const supabase = createAdminClient()

  const { data: product, error: productError } = await supabase
    .from('products')
    .select('*')
    .eq('id', productId)
    .single()

  if (productError || !product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 })
  }

  const { error: purchaseError } = await supabase.from('purchases').insert({
    email,
    product_id: productId,
    stripe_session_id: session.id,
    stripe_payment_intent_id: session.payment_intent as string | null,
    amount: session.amount_total ?? product.price,
  })

  if (purchaseError && purchaseError.code !== '23505') {
    return NextResponse.json({ error: purchaseError.message }, { status: 500 })
  }

  try {
    const downloadUrl = await generateSignedDownloadUrl(product.file_url, 86400)
    await sendPurchaseConfirmation({
      to: email,
      productName: product.title,
      downloadUrl,
    })
  } catch (err) {
    // Email failure should not fail the webhook response
    console.error('Failed to send purchase email:', err)
  }

  return NextResponse.json({ received: true })
}
