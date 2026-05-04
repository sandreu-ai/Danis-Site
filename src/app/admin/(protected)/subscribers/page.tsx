import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { formatDate } from '@/lib/utils'

export default async function AdminSubscribersPage() {
  const supabase = await createClient()
  const { data: subscribers } = await supabase
    .from('subscribers')
    .select('id, email, subscribed_at, active')
    .order('subscribed_at', { ascending: false })

  const total = subscribers?.length ?? 0
  const activeCount = subscribers?.filter((subscriber) => subscriber.active).length ?? 0
  const inactiveCount = total - activeCount

  return (
    <div className="p-4 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-charcoal">Email List</h1>
          <p className="font-sans text-charcoal-light mt-1">
            {total} total subscribers · {activeCount} active · {inactiveCount} inactive
          </p>
        </div>
        <Link
          href="/admin/subscribers/export"
          className="bg-sage text-white font-sans font-semibold rounded-xl px-5 py-3 text-sm hover:bg-sage-dark transition-colors min-h-[44px] inline-flex items-center justify-center"
        >
          Export CSV
        </Link>
      </div>

      {subscribers && subscribers.length > 0 ? (
        <div className="bg-white rounded-xl shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-linen">
                  <th className="text-left px-6 py-3 font-sans text-xs font-semibold text-charcoal-light uppercase tracking-wider">
                    Email
                  </th>
                  <th className="text-left px-6 py-3 font-sans text-xs font-semibold text-charcoal-light uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left px-6 py-3 font-sans text-xs font-semibold text-charcoal-light uppercase tracking-wider hidden sm:table-cell">
                    Subscribed
                  </th>
                  <th className="px-6 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-linen">
                {subscribers.map((subscriber) => (
                  <tr key={subscriber.id} className="hover:bg-cream/50 transition-colors">
                    <td className="px-6 py-4">
                      <a
                        href={`mailto:${subscriber.email}`}
                        className="font-sans text-sm font-medium text-charcoal hover:text-sage transition-colors break-all"
                      >
                        {subscriber.email}
                      </a>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-block font-sans text-xs px-2.5 py-1 rounded-full font-medium ${subscriber.active ? 'bg-sage/15 text-sage-dark' : 'bg-linen text-charcoal-light'}`}>
                        {subscriber.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <span className="font-sans text-sm text-charcoal-light">
                        {formatDate(subscriber.subscribed_at)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <a
                        href={`mailto:${subscriber.email}`}
                        className="font-sans text-xs font-semibold text-sage hover:text-sage-dark transition-colors"
                      >
                        Email
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-card p-12 text-center">
          <p className="font-serif text-xl text-charcoal mb-2">No subscribers yet</p>
          <p className="font-sans text-charcoal-light">
            New signups from the site newsletter form will appear here after Daniela logs in.
          </p>
        </div>
      )}
    </div>
  )
}
