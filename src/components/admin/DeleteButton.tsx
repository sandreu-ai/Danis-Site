'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'

interface DeleteButtonProps {
  onDelete: () => Promise<void>
  label?: string
}

export function DeleteButton({ onDelete, label = 'Delete' }: DeleteButtonProps) {
  const [confirming, setConfirming] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    setLoading(true)
    try {
      await onDelete()
    } finally {
      setLoading(false)
      setConfirming(false)
    }
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-2">
        <span className="font-sans text-xs text-charcoal-light">Sure?</span>
        <Button
          variant="danger"
          size="sm"
          onClick={handleDelete}
          loading={loading}
        >
          Yes, delete
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setConfirming(false)}
        >
          Cancel
        </Button>
      </div>
    )
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setConfirming(true)}
      className="text-red-400 hover:text-red-600 hover:bg-red-50"
    >
      {label}
    </Button>
  )
}
