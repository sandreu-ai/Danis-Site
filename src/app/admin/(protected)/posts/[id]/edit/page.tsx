import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { PostForm } from '../../PostForm'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function EditPostPage({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single()

  if (!post) notFound()

  return <PostForm post={post} />
}
