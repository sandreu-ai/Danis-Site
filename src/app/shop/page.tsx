import type { Metadata } from 'next'
import { NavBar } from '@/components/ui/NavBar'
import { Footer } from '@/components/ui/Footer'
import { ProductCard } from '@/components/shop/ProductCard'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Shop',
  description:
    'Printables, curriculum guides, and homeschool resources from Daniela Cerrato. Instant digital downloads.',
}

export const revalidate = 3600

export default async function ShopPage() {
  const supabase = await createClient()
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <>
      <NavBar />
      <main className="flex-1">
        <div className="bg-linen py-14">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-charcoal mb-3">
              Shop Resources
            </h1>
            <p className="font-sans text-charcoal-light text-lg max-w-xl">
              Printables, curriculum guides, and planning tools — designed for
              Catholic homeschool families.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
          {products && products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="font-serif text-2xl text-charcoal mb-2">Coming soon!</p>
              <p className="font-sans text-charcoal-light">
                New resources are on the way. Sign up below to be the first to know.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
