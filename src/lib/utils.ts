import { createAdminClient } from './supabase/admin'

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(cents / 100)
}

export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateString))
}

export function truncate(text: string, length = 150): string {
  if (text.length <= length) return text
  return text.slice(0, length).trim() + '…'
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '')
}

export async function generateSignedDownloadUrl(
  filePath: string,
  expiresInSeconds = 86400
): Promise<string> {
  const supabase = createAdminClient()
  const { data, error } = await supabase.storage
    .from('products')
    .createSignedUrl(filePath, expiresInSeconds)

  if (error || !data) {
    throw new Error(`Failed to generate signed URL: ${error?.message}`)
  }

  return data.signedUrl
}

export function getPublicImageUrl(path: string): string {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  return `${supabaseUrl}/storage/v1/object/public/images/${path}`
}
