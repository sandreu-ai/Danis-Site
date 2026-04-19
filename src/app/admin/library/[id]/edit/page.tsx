import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { LibraryForm } from '../../LibraryForm'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function EditLibraryPage({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data: item } = await supabase
    .from('recommended_products')
    .select('*')
    .eq('id', id)
    .single()

  if (!item) notFound()

  return <LibraryForm item={item} />
}
