'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { slugify } from '@/lib/utils'
import type { ActionResult, Post } from '@/types'

const PostSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  slug: z.string().min(1, 'Slug is required').max(200),
  category: z.string().max(100).optional().default(''),
  content: z.record(z.unknown()).optional().default({}),
  content_html: z.string().optional().default(''),
  cover_image_url: z.string().url().optional().or(z.literal('')).default(''),
  published: z.boolean().default(false),
})

export async function createPost(
  formData: FormData
): Promise<ActionResult<Post>> {
  const supabase = await createClient()

  const raw = {
    title: formData.get('title') as string,
    slug: formData.get('slug') as string || slugify(formData.get('title') as string),
    category: formData.get('category') as string,
    content: JSON.parse((formData.get('content') as string) || '{}'),
    content_html: formData.get('content_html') as string,
    cover_image_url: formData.get('cover_image_url') as string,
    published: formData.get('published') === 'true',
  }

  const parsed = PostSchema.safeParse(raw)
  if (!parsed.success) {
    return { success: false, error: parsed.error.errors[0].message }
  }

  const { data, error } = await supabase
    .from('posts')
    .insert(parsed.data)
    .select()
    .single()

  if (error) {
    if (error.code === '23505') return { success: false, error: 'A post with this slug already exists.' }
    return { success: false, error: error.message }
  }

  revalidatePath('/blog')
  revalidatePath('/')
  return { success: true, data }
}

export async function updatePost(
  id: string,
  formData: FormData
): Promise<ActionResult<Post>> {
  const supabase = await createClient()

  const raw = {
    title: formData.get('title') as string,
    slug: formData.get('slug') as string,
    category: formData.get('category') as string,
    content: JSON.parse((formData.get('content') as string) || '{}'),
    content_html: formData.get('content_html') as string,
    cover_image_url: formData.get('cover_image_url') as string,
    published: formData.get('published') === 'true',
  }

  const parsed = PostSchema.safeParse(raw)
  if (!parsed.success) {
    return { success: false, error: parsed.error.errors[0].message }
  }

  const { data, error } = await supabase
    .from('posts')
    .update(parsed.data)
    .eq('id', id)
    .select()
    .single()

  if (error) return { success: false, error: error.message }

  revalidatePath('/blog')
  revalidatePath(`/blog/${raw.slug}`)
  revalidatePath('/')
  return { success: true, data }
}

export async function deletePost(id: string): Promise<ActionResult> {
  const supabase = await createClient()

  const { error } = await supabase.from('posts').delete().eq('id', id)
  if (error) return { success: false, error: error.message }

  revalidatePath('/blog')
  revalidatePath('/')
  revalidatePath('/admin/posts')
  return { success: true }
}

export async function togglePublish(
  id: string,
  published: boolean
): Promise<ActionResult> {
  const supabase = await createClient()

  const { error } = await supabase
    .from('posts')
    .update({ published })
    .eq('id', id)

  if (error) return { success: false, error: error.message }

  revalidatePath('/blog')
  revalidatePath('/')
  revalidatePath('/admin/posts')
  return { success: true }
}
