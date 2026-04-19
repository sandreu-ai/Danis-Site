'use client'

import Image from 'next/image'
import { useCallback, useRef, useState } from 'react'

interface ImageUploadProps {
  value?: string
  onChange: (url: string) => void
  label?: string
  bucket?: 'images' | 'products'
}

export function ImageUpload({
  value,
  onChange,
  label = 'Cover Image',
  bucket = 'images',
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [dragging, setDragging] = useState(false)

  const upload = useCallback(
    async (file: File) => {
      setUploading(true)
      setError(null)

      const formData = new FormData()
      formData.append('file', file)
      formData.append('bucket', bucket)

      try {
        const res = await fetch('/api/upload', { method: 'POST', body: formData })
        const data = await res.json()

        if (!res.ok) {
          setError(data.error ?? 'Upload failed')
          return
        }

        onChange(data.url ?? data.path)
      } catch {
        setError('Upload failed. Please try again.')
      } finally {
        setUploading(false)
      }
    },
    [bucket, onChange]
  )

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-charcoal font-sans">{label}</label>

      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragging(false)
          const file = e.dataTransfer.files[0]
          if (file) upload(file)
        }}
        onClick={() => inputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all
          ${dragging ? 'border-sage bg-sage/5' : 'border-sage/30 hover:border-sage/60 hover:bg-linen/50'}`}
      >
        {value ? (
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <Image
              src={value}
              alt="Uploaded image"
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="py-4">
            <svg className="w-8 h-8 text-sage/50 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="font-sans text-sm text-charcoal-light">
              Drag & drop or <span className="text-sage font-medium">browse</span>
            </p>
            <p className="font-sans text-xs text-charcoal-light/60 mt-1">
              JPEG, PNG, WebP — max 10 MB
            </p>
          </div>
        )}

        {uploading && (
          <div className="absolute inset-0 bg-white/80 rounded-xl flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <svg className="w-6 h-6 animate-spin text-sage" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <span className="font-sans text-sm text-charcoal">Uploading…</span>
            </div>
          </div>
        )}
      </div>

      {value && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onChange('') }}
          className="self-start text-xs text-red-500 font-sans hover:underline"
        >
          Remove image
        </button>
      )}

      {error && <p className="text-xs text-red-500 font-sans">{error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) upload(file)
          e.target.value = ''
        }}
      />
    </div>
  )
}
