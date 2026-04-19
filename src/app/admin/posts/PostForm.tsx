'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { ImageUpload } from '@/components/admin/ImageUpload'
import { TiptapEditor } from '@/components/editor/TiptapEditor'
import { createPost, updatePost } from '@/actions/posts'
import { slugify } from '@/lib/utils'
import type { Post } from '@/types'

interface PostFormProps {
  post?: Post
}

export function PostForm({ post }: PostFormProps) {
  const router = useRouter()
  const [title, setTitle] = useState(post?.title ?? '')
  const [slug, setSlug] = useState(post?.slug ?? '')
  const [category, setCategory] = useState(post?.category ?? '')
  const [coverImageUrl, setCoverImageUrl] = useState(post?.cover_image_url ?? '')
  const [content, setContent] = useState<Record<string, unknown>>(post?.content ?? {})
  const [contentHtml, setContentHtml] = useState(post?.content_html ?? '')
  const [published, setPublished] = useState(post?.published ?? false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newTitle = e.target.value
    setTitle(newTitle)
    if (!post) {
      setSlug(slugify(newTitle))
    }
  }

  async function handleSave(publish?: boolean) {
    setSaving(true)
    setError(null)

    const fd = new FormData()
    fd.set('title', title)
    fd.set('slug', slug)
    fd.set('category', category)
    fd.set('content', JSON.stringify(content))
    fd.set('content_html', contentHtml)
    fd.set('cover_image_url', coverImageUrl)
    fd.set('published', String(publish ?? published))

    const result = post
      ? await updatePost(post.id, fd)
      : await createPost(fd)

    setSaving(false)

    if (!result.success) {
      setError(result.error ?? 'Something went wrong.')
      return
    }

    router.push('/admin/posts')
    router.refresh()
  }

  return (
    <div className="p-4 sm:p-8 max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl font-bold text-charcoal">
          {post ? 'Edit Post' : 'New Post'}
        </h1>
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            onClick={() => handleSave(false)}
            loading={saving && !published}
          >
            Save Draft
          </Button>
          <Button
            onClick={() => handleSave(true)}
            loading={saving && published}
          >
            {post?.published ? 'Update' : 'Publish'}
          </Button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl font-sans text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="space-y-6">
        <Input
          label="Title"
          value={title}
          onChange={handleTitleChange}
          placeholder="My Amazing Post"
          required
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            hint="Auto-generated from title — edit if needed"
          />
          <Input
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g. Curriculum, Faith, Planning"
          />
        </div>

        <ImageUpload
          label="Cover Image"
          value={coverImageUrl}
          onChange={setCoverImageUrl}
        />

        <div>
          <label className="block text-sm font-semibold text-charcoal font-sans mb-1.5">
            Content
          </label>
          <TiptapEditor
            content={content}
            placeholder="Start writing your post…"
            onChange={(json, html) => {
              setContent(json)
              setContentHtml(html)
            }}
          />
        </div>

        {/* Status */}
        <div className="flex items-center gap-3 p-4 bg-linen rounded-xl">
          <button
            type="button"
            onClick={() => setPublished(!published)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${published ? 'bg-sage' : 'bg-charcoal-light/30'}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${published ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
          <span className="font-sans text-sm text-charcoal">
            {published ? 'Published — visible to visitors' : 'Draft — hidden from visitors'}
          </span>
        </div>

        {/* Mobile save buttons */}
        <div className="flex gap-3 sm:hidden">
          <Button variant="secondary" onClick={() => handleSave(false)} className="flex-1" loading={saving}>
            Save Draft
          </Button>
          <Button onClick={() => handleSave(true)} className="flex-1" loading={saving}>
            Publish
          </Button>
        </div>
      </div>
    </div>
  )
}
