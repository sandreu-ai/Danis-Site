import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { formatPrice, formatDate } from '@/lib/utils'
import { ProductActions } from './ProductActions'

export default async function AdminProductsPage() {
  const supabase = await createClient()
  const { data: products } = await supabase
    .from('products')
    .select('id, title, price, cover_image_url, created_at, updated_at')
    .order('updated_at', { ascending: false })

  return (
    <div className="p-4 sm:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-charcoal">Products</h1>
          <p className="font-sans text-charcoal-light mt-1">{products?.length ?? 0} products</p>
        </div>
        <Link
          href="/admin/products/new"
          className="bg-sage text-white font-sans font-semibold rounded-xl px-5 py-3 text-sm hover:bg-sage-dark transition-colors min-h-[44px] inline-flex items-center"
        >
          + New Product
        </Link>
      </div>

      {products && products.length > 0 ? (
        <div className="bg-white rounded-xl shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-linen">
                  <th className="text-left px-6 py-3 font-sans text-xs font-semibold text-charcoal-light uppercase tracking-wider">
                    Product
                  </th>
                  <th className="text-left px-6 py-3 font-sans text-xs font-semibold text-charcoal-light uppercase tracking-wider">
                    Price
                  </th>
                  <th className="text-left px-6 py-3 font-sans text-xs font-semibold text-charcoal-light uppercase tracking-wider hidden md:table-cell">
                    Added
                  </th>
                  <th className="px-6 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-linen">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-cream/50 transition-colors">
                    <td className="px-6 py-4">
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="font-sans text-sm font-medium text-charcoal hover:text-sage transition-colors"
                      >
                        {product.title}
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-sans text-sm font-semibold text-sage">
                        {formatPrice(product.price)}
                      </span>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <span className="font-sans text-sm text-charcoal-light">
                        {formatDate(product.created_at)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <ProductActions product={product} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-card p-12 text-center">
          <p className="font-serif text-xl text-charcoal mb-2">No products yet</p>
          <p className="font-sans text-charcoal-light mb-6">Add your first digital product to get started.</p>
          <Link
            href="/admin/products/new"
            className="inline-flex items-center bg-sage text-white font-sans font-semibold rounded-xl px-6 py-3 hover:bg-sage-dark transition-colors"
          >
            + New Product
          </Link>
        </div>
      )}
    </div>
  )
}
