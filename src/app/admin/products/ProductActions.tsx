'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { deleteProduct } from '@/actions/products'
import { DeleteButton } from '@/components/admin/DeleteButton'
import { Button } from '@/components/ui/Button'

interface ProductActionsProps {
  product: { id: string }
}

export function ProductActions({ product }: ProductActionsProps) {
  const router = useRouter()

  return (
    <div className="flex items-center gap-2">
      <Link href={`/admin/products/${product.id}/edit`}>
        <Button variant="secondary" size="sm">Edit</Button>
      </Link>
      <DeleteButton
        onDelete={async () => {
          await deleteProduct(product.id)
          router.refresh()
        }}
      />
    </div>
  )
}
