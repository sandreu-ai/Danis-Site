import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { LibraryActions } from './LibraryActions'

export default async function AdminLibraryPage() {
  const supabase = await createClient()
  const { data: items } = await supabase
    .from('recommended_products')
    .select('id, title, category, featured, affiliate_url')
    .order('created_at', { ascending: false })

  return (
    <div className="p-4 sm:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-charcoal">Dani&apos;s Picks</h1>
          <p className="font-sans text-charcoal-light mt-1">{items?.length ?? 0} items</p>
        </div>
        <Link
          href="/admin/library/new"
          className="bg-sage text-white font-sans font-semibold rounded-xl px-5 py-3 text-sm hover:bg-sage-dark transition-colors min-h-[44px] inline-flex items-center"
        >
          + New Pick
        </Link>
      </div>

      {items && items.length > 0 ? (
        <div className="bg-white rounded-xl shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-linen">
                  <th className="text-left px-6 py-3 font-sans text-xs font-semibold text-charcoal-light uppercase tracking-wider">
                    Title
                  </th>
                  <th className="text-left px-6 py-3 font-sans text-xs font-semibold text-charcoal-light uppercase tracking-wider hidden sm:table-cell">
                    Category
                  </th>
                  <th className="text-left px-6 py-3 font-sans text-xs font-semibold text-charcoal-light uppercase tracking-wider">
                    Featured
                  </th>
                  <th className="px-6 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-linen">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-cream/50 transition-colors">
                    <td className="px-6 py-4">
                      <Link
                        href={`/admin/library/${item.id}/edit`}
                        className="font-sans text-sm font-medium text-charcoal hover:text-sage transition-colors"
                      >
                        {item.title}
                      </Link>
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <span className="font-sans text-sm text-charcoal-light">
                        {item.category ?? '—'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-block font-sans text-xs px-2.5 py-1 rounded-full font-medium ${item.featured ? 'bg-rose/15 text-rose-dark' : 'bg-linen text-charcoal-light'}`}>
                        {item.featured ? '★ Featured' : 'Standard'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <LibraryActions item={item} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-card p-12 text-center">
          <p className="font-serif text-xl text-charcoal mb-2">No picks yet</p>
          <p className="font-sans text-charcoal-light mb-6">Add your first recommended product.</p>
          <Link
            href="/admin/library/new"
            className="inline-flex items-center bg-sage text-white font-sans font-semibold rounded-xl px-6 py-3 hover:bg-sage-dark transition-colors"
          >
            + New Pick
          </Link>
        </div>
      )}
    </div>
  )
}
