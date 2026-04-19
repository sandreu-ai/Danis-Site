'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import type { ActionResult, RecommendedProduct } from '@/types'

const LibrarySchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().max(1000).optional().default(''),
  category: z.string().max(100).optional().default(''),
  image_url: z.string().url().optional().or(z.literal('')).default(''),
  affiliate_url: z.string().url('Affiliate URL must be a valid URL'),
  featured: z.boolean().default(false),
})

export async function createLibraryItem(
  formData: FormData
): Promise<ActionResult<RecommendedProduct>> {
  const supabase = await createClient()

  const raw = {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    category: formData.get('category') as string,
    image_url: formData.get('image_url') as string,
    affiliate_url: formData.get('affiliate_url') as string,
    featured: formData.get('featured') === 'true',
  }

  const parsed = LibrarySchema.safeParse(raw)
  if (!parsed.success) {
    return { success: false, error: parsed.error.errors[0].message }
  }

  const { data, error } = await supabase
    .from('recommended_products')
    .insert(parsed.data)
    .select()
    .single()

  if (error) return { success: false, error: error.message }

  revalidatePath('/library')
  revalidatePath('/')
  return { success: true, data }
}

export async function updateLibraryItem(
  id: string,
  formData: FormData
): Promise<ActionResult<RecommendedProduct>> {
  const supabase = await createClient()

  const raw = {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    category: formData.get('category') as string,
    image_url: formData.get('image_url') as string,
    affiliate_url: formData.get('affiliate_url') as string,
    featured: formData.get('featured') === 'true',
  }

  const parsed = LibrarySchema.safeParse(raw)
  if (!parsed.success) {
    return { success: false, error: parsed.error.errors[0].message }
  }

  const { data, error } = await supabase
    .from('recommended_products')
    .update(parsed.data)
    .eq('id', id)
    .select()
    .single()

  if (error) return { success: false, error: error.message }

  revalidatePath('/library')
  revalidatePath('/')
  revalidatePath('/admin/library')
  return { success: true, data }
}

export async function deleteLibraryItem(id: string): Promise<ActionResult> {
  const supabase = await createClient()

  const { error } = await supabase
    .from('recommended_products')
    .delete()
    .eq('id', id)

  if (error) return { success: false, error: error.message }

  revalidatePath('/library')
  revalidatePath('/')
  revalidatePath('/admin/library')
  return { success: true }
}

export async function toggleFeatured(
  id: string,
  featured: boolean
): Promise<ActionResult> {
  const supabase = await createClient()

  const { error } = await supabase
    .from('recommended_products')
    .update({ featured })
    .eq('id', id)

  if (error) return { success: false, error: error.message }

  revalidatePath('/library')
  revalidatePath('/')
  revalidatePath('/admin/library')
  return { success: true }
}
