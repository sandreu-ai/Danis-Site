import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { NavBar } from '@/components/ui/NavBar'
import { Footer } from '@/components/ui/Footer'
import { BuyButton } from '@/components/shop/BuyButton'
import { createClient } from '@/lib/supabase/server'
import { formatPrice } from '@/lib/utils'

export const revalidate = 3600

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const supabase = await createClient()
  const { data } = await supabase.from('products').select('slug')
  return (data ?? []).map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data: product } = await supabase
    .from('products')
    .select('title, description_html, cover_image_url, price')
    .eq('slug', slug)
    .single()

  if (!product) return {}

  const description = product.description_html
    ? product.description_html.replace(/<[^>]*>/g, '').slice(0, 160)
    : `${product.title} — ${formatPrice(product.price)}`

  return {
    title: product.title,
    description,
    openGraph: {
      title: product.title,
      description,
      images: product.cover_image_url ? [product.cover_image_url] : [],
    },
  }
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!product) notFound()

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://danielacerrato.com'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description_html?.replace(/<[^>]*>/g, '') ?? '',
    image: product.cover_image_url ?? undefined,
    offers: {
      '@type': 'Offer',
      price: (product.price / 100).toFixed(2),
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: `${appUrl}/shop/${slug}`,
    },
  }

  return (
    <>
      <NavBar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Image */}
            <div className="lg:sticky lg:top-24">
              {product.cover_image_url ? (
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-card">
                  <Image
                    src={product.cover_image_url}
                    alt={product.title}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              ) : (
                <div className="aspect-[4/3] rounded-2xl bg-linen flex items-center justify-center">
                  <svg className="w-16 h-16 text-sage/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              )}
            </div>

            {/* Details */}
            <div>
              <Link
                href="/shop"
                className="font-sans text-sm text-charcoal-light hover:text-sage transition-colors mb-6 inline-block"
              >
                ← Back to shop
              </Link>

              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal mb-4">
                {product.title}
              </h1>

              <p className="font-sans text-3xl font-bold text-sage mb-6">
                {formatPrice(product.price)}
              </p>

              {product.description_html && (
                <div
                  className="prose-content mb-8"
                  dangerouslySetInnerHTML={{ __html: product.description_html }}
                />
              )}

              {/* Trust signals */}
              <div className="flex flex-col gap-2 mb-8 p-4 bg-linen rounded-xl">
                <div className="flex items-center gap-2 font-sans text-sm text-charcoal-light">
                  <svg className="w-4 h-4 text-sage shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Instant digital download after purchase
                </div>
                <div className="flex items-center gap-2 font-sans text-sm text-charcoal-light">
                  <svg className="w-4 h-4 text-sage shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Secure checkout powered by Stripe
                </div>
                <div className="flex items-center gap-2 font-sans text-sm text-charcoal-light">
                  <svg className="w-4 h-4 text-sage shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Download link sent to your email
                </div>
              </div>

              <BuyButton
                productId={product.id}
                productTitle={product.title}
                productPrice={product.price}
                productCoverUrl={product.cover_image_url}
                productSlug={product.slug}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
