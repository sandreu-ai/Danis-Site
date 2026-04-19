'use client'

import { useCallback, useRef, useState } from 'react'

interface FileUploadProps {
  value?: string
  onChange: (path: string) => void
  label?: string
}

const MAX_SIZE = 100 * 1024 * 1024 // 100 MB
const ALLOWED_TYPES = [
  'application/pdf',
  'application/zip',
  'application/x-zip-compressed',
  'application/epub+zip',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]

export function FileUpload({ value, onChange, label = 'Product File' }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(
    value ? value.split('/').pop() ?? null : null
  )

  const upload = useCallback(
    async (file: File) => {
      if (!ALLOWED_TYPES.includes(file.type) && !file.name.match(/\.(pdf|zip|epub|docx)$/i)) {
        setError('Allowed types: PDF, ZIP, EPUB, DOCX')
        return
      }

      if (file.size > MAX_SIZE) {
        setError('File too large. Maximum size is 100 MB.')
        return
      }

      setUploading(true)
      setError(null)

      const formData = new FormData()
      formData.append('file', file)
      formData.append('bucket', 'products')

      try {
        const res = await fetch('/api/upload', { method: 'POST', body: formData })
        const data = await res.json()

        if (!res.ok) {
          setError(data.error ?? 'Upload failed')
          return
        }

        setFileName(file.name)
        onChange(data.path)
      } catch {
        setError('Upload failed. Please try again.')
      } finally {
        setUploading(false)
      }
    },
    [onChange]
  )

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-charcoal font-sans">{label}</label>

      <div
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-sage/30 hover:border-sage/60 rounded-xl p-6 text-center cursor-pointer transition-all hover:bg-linen/50"
      >
        {fileName ? (
          <div className="flex items-center gap-3 justify-center">
            <svg className="w-8 h-8 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <div className="text-left">
              <p className="font-sans text-sm font-medium text-charcoal">{fileName}</p>
              <p className="font-sans text-xs text-charcoal-light">Click to replace</p>
            </div>
          </div>
        ) : (
          <div className="py-2">
            <svg className="w-8 h-8 text-sage/50 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="font-sans text-sm text-charcoal-light">
              Click to upload product file
            </p>
            <p className="font-sans text-xs text-charcoal-light/60 mt-1">
              PDF, ZIP, EPUB, DOCX — max 100 MB
            </p>
          </div>
        )}

        {uploading && (
          <div className="mt-3 flex items-center justify-center gap-2">
            <svg className="w-4 h-4 animate-spin text-sage" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span className="font-sans text-sm text-charcoal">Uploading…</span>
          </div>
        )}
      </div>

      {error && <p className="text-xs text-red-500 font-sans">{error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.zip,.epub,.docx"
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
