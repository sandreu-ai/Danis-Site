'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { deleteLibraryItem, toggleFeatured } from '@/actions/library'
import { DeleteButton } from '@/components/admin/DeleteButton'
import { Button } from '@/components/ui/Button'

interface LibraryActionsProps {
  item: {
    id: string
    featured: boolean
  }
}

export function LibraryActions({ item }: LibraryActionsProps) {
  const router = useRouter()
  const [toggling, setToggling] = useState(false)

  async function handleToggle() {
    setToggling(true)
    await toggleFeatured(item.id, !item.featured)
    router.refresh()
    setToggling(false)
  }

  return (
    <div className="flex items-center gap-2">
      <Link href={`/admin/library/${item.id}/edit`}>
        <Button variant="secondary" size="sm">Edit</Button>
      </Link>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleToggle}
        loading={toggling}
        className="text-charcoal-light hover:text-charcoal"
      >
        {item.featured ? 'Unfeature' : 'Feature'}
      </Button>
      <DeleteButton
        onDelete={async () => {
          await deleteLibraryItem(item.id)
          router.refresh()
        }}
      />
    </div>
  )
}
