'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { deletePost, togglePublish } from '@/actions/posts'
import { DeleteButton } from '@/components/admin/DeleteButton'
import { Button } from '@/components/ui/Button'

interface PostActionsProps {
  post: {
    id: string
    published: boolean
  }
}

export function PostActions({ post }: PostActionsProps) {
  const router = useRouter()
  const [toggling, setToggling] = useState(false)

  async function handleToggle() {
    setToggling(true)
    await togglePublish(post.id, !post.published)
    router.refresh()
    setToggling(false)
  }

  return (
    <div className="flex items-center gap-2">
      <Link href={`/admin/posts/${post.id}/edit`}>
        <Button variant="secondary" size="sm">Edit</Button>
      </Link>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleToggle}
        loading={toggling}
        className="text-charcoal-light hover:text-charcoal"
      >
        {post.published ? 'Unpublish' : 'Publish'}
      </Button>
      <DeleteButton
        onDelete={async () => {
          await deletePost(post.id)
          router.refresh()
        }}
      />
    </div>
  )
}
