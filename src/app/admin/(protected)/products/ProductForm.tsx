'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { ImageUpload } from '@/components/admin/ImageUpload'
import { FileUpload } from '@/components/admin/FileUpload'
import { TiptapEditor } from '@/components/editor/TiptapEditor'
import { createProduct, updateProduct } from '@/actions/products'
import { slugify } from '@/lib/utils'
import type { Product } from '@/types'

interface ProductFormProps {
  product?: Product
}

export function ProductForm({ product }: ProductFormProps) {
  const router = useRouter()
  const [title, setTitle] = useState(product?.title ?? '')
  const [slug, setSlug] = useState(product?.slug ?? '')
  const [price, setPrice] = useState(product ? String(product.price / 100) : '')
  const [coverImageUrl, setCoverImageUrl] = useState(product?.cover_image_url ?? '')
  const [fileUrl, setFileUrl] = useState(product?.file_url ?? '')
  const [description, setDescription] = useState<Record<string, unknown>>(product?.description ?? {})
  const [descriptionHtml, setDescriptionHtml] = useState(product?.description_html ?? '')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newTitle = e.target.value
    setTitle(newTitle)
    if (!product) setSlug(slugify(newTitle))
  }

  async function handleSave() {
    setSaving(true)
    setError(null)

    const fd = new FormData()
    fd.set('title', title)
    fd.set('slug', slug)
    fd.set('price', price)
    fd.set('description', JSON.stringify(description))
    fd.set('description_html', descriptionHtml)
    fd.set('cover_image_url', coverImageUrl)
    fd.set('file_url', fileUrl)

    const result = product
      ? await updateProduct(product.id, fd)
      : await createProduct(fd)

    setSaving(false)

    if (!result.success) {
      setError(result.error ?? 'Something went wrong.')
      return
    }

    router.push('/admin/products')
    router.refresh()
  }

  return (
    <div className="p-4 sm:p-8 max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl font-bold text-charcoal">
          {product ? 'Edit Product' : 'New Product'}
        </h1>
        <Button onClick={handleSave} loading={saving}>
          {product ? 'Update' : 'Save Product'}
        </Button>
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
          placeholder="Homeschool Planning Bundle"
          required
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            hint="Auto-generated from title"
          />
          <Input
            label="Price (USD)"
            type="number"
            min="0.01"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="9.99"
            hint="Enter in dollars (e.g. 9.99)"
            required
          />
        </div>

        <ImageUpload
          label="Cover Image"
          value={coverImageUrl}
          onChange={setCoverImageUrl}
        />

        <FileUpload
          label="Product File (PDF, ZIP, etc.)"
          value={fileUrl}
          onChange={setFileUrl}
        />

        <div>
          <label className="block text-sm font-semibold text-charcoal font-sans mb-1.5">
            Description
          </label>
          <TiptapEditor
            content={description}
            placeholder="Describe what's included in this product…"
            onChange={(json, html) => {
              setDescription(json)
              setDescriptionHtml(html)
            }}
          />
        </div>

        <div className="sm:hidden">
          <Button onClick={handleSave} loading={saving} className="w-full">
            {product ? 'Update Product' : 'Save Product'}
          </Button>
        </div>
      </div>
    </div>
  )
}
