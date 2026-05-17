'use client'

import Image from 'next/image'
import Link from 'next/link'
import { formatDate, truncate, stripHtml } from '@/lib/utils'
import type { Post } from '@/types'

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  const excerpt = post.content_html ? truncate(stripHtml(post.content_html), 140) : ''

  return (
    <article className="group h-full border border-[color:var(--dani-rule)] bg-[color:var(--dani-paper)]">
      <Link href={`/blog/${post.slug}`} className="block h-full">
        {post.cover_image_url ? (
          <div className="relative aspect-[5/3] overflow-hidden bg-[color:var(--dani-sand)]">
            <Image
              src={post.cover_image_url}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ) : null}
        <div className="p-6">
          <div className="mb-5 flex items-center gap-3">
            {post.category && <span className="mono-label">{post.category}</span>}
            <span className="text-[color:var(--dani-rule)]">·</span>
            <time dateTime={post.created_at} className="font-sans text-xs text-[color:var(--dani-cocoa)]">
              {formatDate(post.created_at)}
            </time>
          </div>
          <h3 className="font-display text-3xl leading-tight text-[color:var(--dani-espresso)] transition-colors group-hover:text-[color:var(--dani-blush-deep)]">
            {post.title}
          </h3>
          {excerpt && <p className="mt-4 font-sans text-sm leading-7 text-[color:var(--dani-cocoa)]">{excerpt}</p>}
          <p className="mt-6 font-sans text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-[color:var(--dani-blush-deep)]">
            Read more →
          </p>
        </div>
      </Link>
    </article>
  )
}
