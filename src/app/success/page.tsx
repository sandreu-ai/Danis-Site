import type { Metadata } from 'next'
import Link from 'next/link'
import { NavBar } from '@/components/ui/NavBar'
import { Footer } from '@/components/ui/Footer'
import { createAdminClient } from '@/lib/supabase/admin'
import { generateSignedDownloadUrl } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Purchase Successful',
  description: 'Your purchase is complete. Download your file below.',
}

interface PageProps {
  searchParams: Promise<{ session_id?: string }>
}

export default async function SuccessPage({ searchParams }: PageProps) {
  const { session_id } = await searchParams

  if (!session_id) {
    return (
      <>
        <NavBar />
        <main className="flex-1 flex items-center justify-center py-20">
          <div className="text-center px-4">
            <h1 className="font-serif text-3xl font-bold text-charcoal mb-4">
              Something went wrong
            </h1>
            <p className="font-sans text-charcoal-light mb-8">
              We couldn&apos;t find your purchase. Please check your email for a
              download link, or contact us.
            </p>
            <Link href="/shop" className="font-sans font-semibold text-sage hover:underline">
              Back to shop →
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const supabase = createAdminClient()

  const { data: purchase } = await supabase
    .from('purchases')
    .select('*, product:products(*)')
    .eq('stripe_session_id', session_id)
    .single()

  if (!purchase || !purchase.product) {
    return (
      <>
        <NavBar />
        <main className="flex-1 flex items-center justify-center py-20">
          <div className="text-center px-4">
            <h1 className="font-serif text-3xl font-bold text-charcoal mb-4">
              Purchase not found
            </h1>
            <p className="font-sans text-charcoal-light mb-4">
              Your payment may still be processing. Check your email in a few
              minutes for your download link.
            </p>
            <Link href="/shop" className="font-sans font-semibold text-sage hover:underline">
              Back to shop →
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  let downloadUrl: string | null = null
  try {
    downloadUrl = await generateSignedDownloadUrl(purchase.product.file_url, 3600)
  } catch {
    downloadUrl = null
  }

  return (
    <>
      <NavBar />
      <main className="flex-1 flex items-center justify-center py-20 bg-cream">
        <div className="max-w-lg w-full mx-auto px-4 sm:px-6 text-center">
          {/* Success icon */}
          <div className="w-20 h-20 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg className="w-10 h-10 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="font-serif text-4xl font-bold text-charcoal mb-3">
            Thank you! 🌿
          </h1>
          <p className="font-sans text-charcoal-light mb-2 leading-relaxed">
            Your purchase of{' '}
            <strong className="text-charcoal">{purchase.product.title}</strong>{' '}
            is complete.
          </p>
          <p className="font-sans text-sm text-charcoal-light mb-10">
            A download link was also sent to{' '}
            <strong>{purchase.email}</strong>.
          </p>

          {downloadUrl ? (
            <a
              href={downloadUrl}
              download
              className="inline-flex items-center justify-center gap-2 bg-sage text-white font-sans font-semibold rounded-xl px-8 py-4 text-base hover:bg-sage-dark transition-colors min-h-[52px] mb-4 w-full sm:w-auto"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Your File
            </a>
          ) : (
            <div className="bg-linen border border-sage/20 rounded-xl p-4 mb-6">
              <p className="font-sans text-sm text-charcoal-light">
                Your download link has been sent to your email. Please check your
                inbox (and spam folder).
              </p>
            </div>
          )}

          <div className="mt-6">
            <Link
              href="/shop"
              className="font-sans text-sm font-semibold text-sage hover:text-sage-dark transition-colors"
            >
              Continue browsing the shop →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
