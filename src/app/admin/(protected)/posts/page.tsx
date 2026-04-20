import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { formatDate } from '@/lib/utils'
import { PostActions } from './PostActions'

export default async function AdminPostsPage() {
  const supabase = await createClient()
  const { data: posts } = await supabase
    .from('posts')
    .select('id, title, published, category, created_at, updated_at')
    .order('updated_at', { ascending: false })

  return (
    <div className="p-4 sm:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-charcoal">Blog Posts</h1>
          <p className="font-sans text-charcoal-light mt-1">{posts?.length ?? 0} posts total</p>
        </div>
        <Link
          href="/admin/posts/new"
          className="bg-sage text-white font-sans font-semibold rounded-xl px-5 py-3 text-sm hover:bg-sage-dark transition-colors min-h-[44px] inline-flex items-center"
        >
          + New Post
        </Link>
      </div>

      {posts && posts.length > 0 ? (
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
                    Status
                  </th>
                  <th className="text-left px-6 py-3 font-sans text-xs font-semibold text-charcoal-light uppercase tracking-wider hidden md:table-cell">
                    Updated
                  </th>
                  <th className="px-6 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-linen">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-cream/50 transition-colors">
                    <td className="px-6 py-4">
                      <Link
                        href={`/admin/posts/${post.id}/edit`}
                        className="font-sans text-sm font-medium text-charcoal hover:text-sage transition-colors line-clamp-1"
                      >
                        {post.title}
                      </Link>
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <span className="font-sans text-sm text-charcoal-light">
                        {post.category ?? '—'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-block font-sans text-xs px-2.5 py-1 rounded-full font-medium ${post.published ? 'bg-sage/15 text-sage-dark' : 'bg-linen text-charcoal-light'}`}>
                        {post.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <span className="font-sans text-sm text-charcoal-light">
                        {formatDate(post.updated_at)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <PostActions post={post} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-card p-12 text-center">
          <p className="font-serif text-xl text-charcoal mb-2">No posts yet</p>
          <p className="font-sans text-charcoal-light mb-6">Create your first blog post to get started.</p>
          <Link
            href="/admin/posts/new"
            className="inline-flex items-center bg-sage text-white font-sans font-semibold rounded-xl px-6 py-3 hover:bg-sage-dark transition-colors"
          >
            + New Post
          </Link>
        </div>
      )}
    </div>
  )
}
