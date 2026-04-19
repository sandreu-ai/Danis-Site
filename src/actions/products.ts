'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { slugify } from '@/lib/utils'
import type { ActionResult, Product } from '@/types'

const ProductSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  slug: z.string().min(1, 'Slug is required').max(200),
  description: z.record(z.unknown()).optional().default({}),
  description_html: z.string().optional().default(''),
  price: z.number().int().positive('Price must be a positive number'),
  file_url: z.string().min(1, 'Product file is required'),
  cover_image_url: z.string().url().optional().or(z.literal('')).default(''),
})

export async function createProduct(
  formData: FormData
): Promise<ActionResult<Product>> {
  const supabase = await createClient()

  const priceInDollars = parseFloat(formData.get('price') as string)
  const priceInCents = Math.round(priceInDollars * 100)

  const raw = {
    title: formData.get('title') as string,
    slug: formData.get('slug') as string || slugify(formData.get('title') as string),
    description: JSON.parse((formData.get('description') as string) || '{}'),
    description_html: formData.get('description_html') as string,
    price: priceInCents,
    file_url: formData.get('file_url') as string,
    cover_image_url: formData.get('cover_image_url') as string,
  }

  const parsed = ProductSchema.safeParse(raw)
  if (!parsed.success) {
    return { success: false, error: parsed.error.errors[0].message }
  }

  const { data, error } = await supabase
    .from('products')
    .insert(parsed.data)
    .select()
    .single()

  if (error) {
    if (error.code === '23505') return { success: false, error: 'A product with this slug already exists.' }
    return { success: false, error: error.message }
  }

  revalidatePath('/shop')
  revalidatePath('/')
  return { success: true, data }
}

export async function updateProduct(
  id: string,
  formData: FormData
): Promise<ActionResult<Product>> {
  const supabase = await createClient()

  const priceInDollars = parseFloat(formData.get('price') as string)
  const priceInCents = Math.round(priceInDollars * 100)

  const raw = {
    title: formData.get('title') as string,
    slug: formData.get('slug') as string,
    description: JSON.parse((formData.get('description') as string) || '{}'),
    description_html: formData.get('description_html') as string,
    price: priceInCents,
    file_url: formData.get('file_url') as string,
    cover_image_url: formData.get('cover_image_url') as string,
  }

  const parsed = ProductSchema.safeParse(raw)
  if (!parsed.success) {
    return { success: false, error: parsed.error.errors[0].message }
  }

  const { data, error } = await supabase
    .from('products')
    .update(parsed.data)
    .eq('id', id)
    .select()
    .single()

  if (error) return { success: false, error: error.message }

  revalidatePath('/shop')
  revalidatePath(`/shop/${raw.slug}`)
  revalidatePath('/')
  return { success: true, data }
}

export async function deleteProduct(id: string): Promise<ActionResult> {
  const supabase = await createClient()

  const { error } = await supabase.from('products').delete().eq('id', id)
  if (error) return { success: false, error: error.message }

  revalidatePath('/shop')
  revalidatePath('/')
  revalidatePath('/admin/products')
  return { success: true }
}
