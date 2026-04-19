'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import { ImageUpload } from '@/components/admin/ImageUpload'
import { createLibraryItem, updateLibraryItem } from '@/actions/library'
import type { RecommendedProduct } from '@/types'

interface LibraryFormProps {
  item?: RecommendedProduct
}

export function LibraryForm({ item }: LibraryFormProps) {
  const router = useRouter()
  const [title, setTitle] = useState(item?.title ?? '')
  const [description, setDescription] = useState(item?.description ?? '')
  const [category, setCategory] = useState(item?.category ?? '')
  const [imageUrl, setImageUrl] = useState(item?.image_url ?? '')
  const [affiliateUrl, setAffiliateUrl] = useState(item?.affiliate_url ?? '')
  const [featured, setFeatured] = useState(item?.featured ?? false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSave() {
    setSaving(true)
    setError(null)

    const fd = new FormData()
    fd.set('title', title)
    fd.set('description', description)
    fd.set('category', category)
    fd.set('image_url', imageUrl)
    fd.set('affiliate_url', affiliateUrl)
    fd.set('featured', String(featured))

    const result = item
      ? await updateLibraryItem(item.id, fd)
      : await createLibraryItem(fd)

    setSaving(false)

    if (!result.success) {
      setError(result.error ?? 'Something went wrong.')
      return
    }

    router.push('/admin/library')
    router.refresh()
  }

  return (
    <div className="p-4 sm:p-8 max-w-2xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl font-bold text-charcoal">
          {item ? 'Edit Pick' : 'New Pick'}
        </h1>
        <Button onClick={handleSave} loading={saving}>
          {item ? 'Update' : 'Save'}
        </Button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl font-sans text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="space-y-5">
        <Input
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="The Well-Trained Mind"
          required
        />

        <Textarea
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Why I love this and how we use it…"
          rows={4}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g. Curriculum, Books, Supplies, Faith"
          />
          <Input
            label="Affiliate URL"
            type="url"
            value={affiliateUrl}
            onChange={(e) => setAffiliateUrl(e.target.value)}
            placeholder="https://amazon.com/..."
            required
          />
        </div>

        <ImageUpload
          label="Product Image"
          value={imageUrl}
          onChange={setImageUrl}
        />

        {/* Featured toggle */}
        <div className="flex items-center gap-3 p-4 bg-linen rounded-xl">
          <button
            type="button"
            onClick={() => setFeatured(!featured)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${featured ? 'bg-rose' : 'bg-charcoal-light/30'}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${featured ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
          <span className="font-sans text-sm text-charcoal">
            {featured ? '★ Featured on homepage' : 'Standard listing'}
          </span>
        </div>

        <div className="sm:hidden">
          <Button onClick={handleSave} loading={saving} className="w-full">
            {item ? 'Update Pick' : 'Save Pick'}
          </Button>
        </div>
      </div>
    </div>
  )
}
