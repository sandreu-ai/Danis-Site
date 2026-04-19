import Image from 'next/image'
import Link from 'next/link'
import { formatDate, truncate, stripHtml } from '@/lib/utils'
import type { Post } from '@/types'

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  const excerpt = post.content_html
    ? truncate(stripHtml(post.content_html), 140)
    : ''

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block bg-white shadow-card hover:shadow-card-hover transition-all duration-300"
    >
      {post.cover_image_url && (
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={post.cover_image_url}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-103 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          {post.category && (
            <span className="font-sans text-xs tracking-widest uppercase text-stone">{post.category}</span>
          )}
          <span className="text-stone/30">·</span>
          <time
            dateTime={post.created_at}
            className="font-sans text-xs text-stone"
          >
            {formatDate(post.created_at)}
          </time>
        </div>
        <h3 className="font-serif text-lg text-charcoal mb-3 group-hover:text-sage transition-colors duration-200 leading-snug line-clamp-2">
          {post.title}
        </h3>
        {excerpt && (
          <p className="font-sans text-sm text-stone leading-relaxed line-clamp-3">
            {excerpt}
          </p>
        )}
        <p className="mt-5 font-sans text-xs tracking-widest uppercase text-stone/60 group-hover:text-sage transition-colors duration-200">
          Read more
        </p>
      </div>
    </Link>
  )
}
