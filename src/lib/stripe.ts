import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
  typescript: true,
})

export async function createCheckoutSession({
  productId,
  productTitle,
  productPrice,
  productCoverUrl,
  productSlug,
}: {
  productId: string
  productTitle: string
  productPrice: number
  productCoverUrl: string | null
  productSlug: string
}) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL!

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: productTitle,
            images: productCoverUrl ? [productCoverUrl] : [],
          },
          unit_amount: productPrice,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${appUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl}/shop/${productSlug}`,
    metadata: {
      productId,
    },
  })

  return session
}
