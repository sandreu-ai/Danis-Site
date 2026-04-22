import Stripe from 'stripe'
import { stripe } from '@/lib/stripe'
import { createAdminClient } from '@/lib/supabase/admin'
import { generateSignedDownloadUrl } from '@/lib/utils'
import { sendPurchaseConfirmation } from '@/lib/resend'

type ProductRecord = {
  id: string
  title: string
  file_url: string
}

type PurchaseRecord = {
  id: string
  email: string
  product_id: string | null
  stripe_session_id: string | null
  stripe_payment_intent_id: string | null
  amount: number
  created_at: string
  product?: ProductRecord | ProductRecord[] | null
}

function getSingleProduct(product: PurchaseRecord['product']): ProductRecord | null {
  if (!product) return null
  return Array.isArray(product) ? (product[0] ?? null) : product
}

async function findPurchaseBySessionId(sessionId: string): Promise<PurchaseRecord | null> {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('purchases')
    .select('*, product:products(id, title, file_url)')
    .eq('stripe_session_id', sessionId)
    .maybeSingle()

  if (error) {
    throw new Error(`Failed to load purchase: ${error.message}`)
  }

  return (data as PurchaseRecord | null) ?? null
}

export async function fulfillCheckoutSession(session: Stripe.Checkout.Session) {
  const existingPurchase = await findPurchaseBySessionId(session.id)
  const existingProduct = getSingleProduct(existingPurchase?.product)

  if (existingPurchase && existingProduct) {
    return {
      purchase: existingPurchase,
      product: existingProduct,
      created: false,
      emailSent: false,
    }
  }

  if (session.payment_status !== 'paid') {
    throw new Error(`Checkout session ${session.id} is not paid`)
  }

  const email = session.customer_details?.email ?? session.customer_email
  const productId = session.metadata?.productId

  if (!email || !productId) {
    throw new Error('Missing email or productId on checkout session')
  }

  const supabase = createAdminClient()

  const { data: product, error: productError } = await supabase
    .from('products')
    .select('id, title, file_url')
    .eq('id', productId)
    .single()

  if (productError || !product) {
    throw new Error(productError?.message ?? 'Product not found')
  }

  const { data: insertedPurchase, error: purchaseError } = await supabase
    .from('purchases')
    .insert({
      email,
      product_id: productId,
      stripe_session_id: session.id,
      stripe_payment_intent_id: typeof session.payment_intent === 'string' ? session.payment_intent : null,
      amount: session.amount_total ?? 0,
    })
    .select('*, product:products(id, title, file_url)')
    .single()

  let purchaseRecord = insertedPurchase as PurchaseRecord | null
  let purchaseWasCreated = true

  if (purchaseError) {
    if (purchaseError.code !== '23505') {
      throw new Error(purchaseError.message)
    }

    purchaseRecord = await findPurchaseBySessionId(session.id)
    purchaseWasCreated = false
  }

  if (!purchaseRecord) {
    throw new Error(`Purchase record missing for checkout session ${session.id}`)
  }

  let emailSent = false

  if (purchaseWasCreated) {
    try {
      const downloadUrl = await generateSignedDownloadUrl(product.file_url, 86400)
      await sendPurchaseConfirmation({
        to: email,
        productName: product.title,
        downloadUrl,
      })
      emailSent = true
    } catch (error) {
      console.error('Failed to send purchase email:', error)
    }
  }

  return {
    purchase: purchaseRecord,
    product,
    created: purchaseWasCreated,
    emailSent,
  }
}

export async function fulfillCheckoutSessionById(sessionId: string) {
  const existingPurchase = await findPurchaseBySessionId(sessionId)
  const existingProduct = getSingleProduct(existingPurchase?.product)

  if (existingPurchase && existingProduct) {
    return {
      purchase: existingPurchase,
      product: existingProduct,
      created: false,
      emailSent: false,
    }
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId)
  return fulfillCheckoutSession(session)
}
