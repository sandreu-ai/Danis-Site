import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { formatDate } from '@/lib/utils'

export default async function AdminDashboard() {
  const supabase = await createClient()

  const [
    { count: postCount },
    { count: productCount },
    { count: libraryCount },
    { count: subscriberCount },
    { data: recentPosts },
    { data: recentProducts },
  ] = await Promise.all([
    supabase.from('posts').select('*', { count: 'exact', head: true }),
    supabase.from('products').select('*', { count: 'exact', head: true }),
    supabase.from('recommended_products').select('*', { count: 'exact', head: true }),
    supabase.from('subscribers').select('*', { count: 'exact', head: true }).eq('active', true),
    supabase.from('posts').select('id, title, published, updated_at').order('updated_at', { ascending: false }).limit(5),
    supabase.from('products').select('id, title, updated_at').order('updated_at', { ascending: false }).limit(5),
  ])

  const stats = [
    { label: 'Blog Posts', value: postCount ?? 0, href: '/admin/posts', color: 'bg-sage/10 text-sage' },
    { label: 'Products', value: productCount ?? 0, href: '/admin/products', color: 'bg-rose/10 text-rose-dark' },
    { label: 'Library Items', value: libraryCount ?? 0, href: '/admin/library', color: 'bg-linen text-charcoal' },
    { label: 'Email Subscribers', value: subscriberCount ?? 0, href: '/admin/subscribers', color: 'bg-blue-50 text-blue-700' },
  ]

  const quickActions = [
    { href: '/admin/posts/new', label: '+ New Post' },
    { href: '/admin/products/new', label: '+ New Product' },
    { href: '/admin/library/new', label: '+ New Pick' },
    { href: '/admin/subscribers', label: 'View Email List' },
  ]

  return (
    <div className="p-4 sm:p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-charcoal">Dashboard</h1>
        <p className="font-sans text-charcoal-light mt-1">Welcome back, Daniela!</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white rounded-xl p-5 shadow-card hover:shadow-card-hover transition-all"
          >
            <p className={`font-sans text-3xl font-bold mb-1 ${stat.color.split(' ')[1]}`}>
              {stat.value}
            </p>
            <p className="font-sans text-xs text-charcoal-light">{stat.label}</p>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="flex flex-wrap gap-3 mb-10">
        {quickActions.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="inline-flex items-center gap-1 bg-sage text-white font-sans font-semibold rounded-xl px-5 py-3 text-sm hover:bg-sage-dark transition-colors min-h-[44px]"
          >
            {action.label}
          </Link>
        ))}
      </div>

      {/* Recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-card p-5">
          <h2 className="font-sans text-sm font-semibold text-charcoal-light uppercase tracking-widest mb-4">
            Recent Posts
          </h2>
          <ul className="space-y-3">
            {(recentPosts ?? []).map((post) => (
              <li key={post.id} className="flex items-center justify-between gap-3">
                <Link
                  href={`/admin/posts/${post.id}/edit`}
                  className="font-sans text-sm text-charcoal hover:text-sage transition-colors flex-1 truncate"
                >
                  {post.title}
                </Link>
                <span className={`shrink-0 font-sans text-xs px-2 py-1 rounded-full ${post.published ? 'bg-sage/10 text-sage' : 'bg-linen text-charcoal-light'}`}>
                  {post.published ? 'Published' : 'Draft'}
                </span>
              </li>
            ))}
            {(!recentPosts || recentPosts.length === 0) && (
              <li className="font-sans text-sm text-charcoal-light">No posts yet.</li>
            )}
          </ul>
          <Link href="/admin/posts" className="mt-4 block font-sans text-xs font-semibold text-sage">
            View all →
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-card p-5">
          <h2 className="font-sans text-sm font-semibold text-charcoal-light uppercase tracking-widest mb-4">
            Recent Products
          </h2>
          <ul className="space-y-3">
            {(recentProducts ?? []).map((product) => (
              <li key={product.id}>
                <Link
                  href={`/admin/products/${product.id}/edit`}
                  className="font-sans text-sm text-charcoal hover:text-sage transition-colors block"
                >
                  {product.title}
                  <span className="text-charcoal-light ml-2 text-xs">
                    {formatDate(product.updated_at)}
                  </span>
                </Link>
              </li>
            ))}
            {(!recentProducts || recentProducts.length === 0) && (
              <li className="font-sans text-sm text-charcoal-light">No products yet.</li>
            )}
          </ul>
          <Link href="/admin/products" className="mt-4 block font-sans text-xs font-semibold text-sage">
            View all →
          </Link>
        </div>
      </div>
    </div>
  )
}
