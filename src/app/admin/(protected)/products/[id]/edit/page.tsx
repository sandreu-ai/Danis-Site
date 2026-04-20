import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { ProductForm } from '../../ProductForm'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function EditProductPage({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (!product) notFound()

  return <ProductForm product={product} />
}
