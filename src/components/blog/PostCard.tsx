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
      className="group block bg-white rounded-[16px] overflow-hidden transition-all duration-300"
      style={{ boxShadow: '0 4px 20px rgba(42,62,43,0.08)' }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 40px rgba(42,62,43,0.15)'
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(42,62,43,0.08)'
      }}
    >
      {post.cover_image_url && (
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={post.cover_image_url}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          {post.category && (
            <span
              className="text-sm"
              style={{ fontFamily: 'var(--font-caveat)', color: '#4A8C4E', fontSize: '1.1rem' }}
            >
              {post.category}
            </span>
          )}
          <span style={{ color: 'rgba(138,158,139,0.4)' }}>·</span>
          <time
            dateTime={post.created_at}
            className="font-sans text-xs"
            style={{ color: '#8A9E8B' }}
          >
            {formatDate(post.created_at)}
          </time>
        </div>
        <h3
          className="text-lg mb-3 leading-snug line-clamp-2 group-hover:opacity-80 transition-opacity duration-200"
          style={{ fontFamily: 'var(--font-fredoka)', color: '#2A3E2B', fontWeight: 600 }}
        >
          {post.title}
        </h3>
        {excerpt && (
          <p className="font-sans text-sm leading-relaxed line-clamp-3" style={{ color: '#8A9E8B' }}>
            {excerpt}
          </p>
        )}
        <p
          className="mt-5 font-sans text-xs font-semibold tracking-wider uppercase transition-colors duration-200"
          style={{ color: '#4A8C4E' }}
        >
          Read more →
        </p>
      </div>
    </Link>
  )
}
