import type { MetadataRoute } from 'next'
import { createAdminClient } from '@/lib/supabase/admin'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://danielacerrato.com'
  const supabase = createAdminClient()

  const [{ data: posts }, { data: products }] = await Promise.all([
    supabase.from('posts').select('slug, updated_at').eq('published', true),
    supabase.from('products').select('slug, updated_at'),
  ])

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: appUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${appUrl}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${appUrl}/shop`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${appUrl}/library`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${appUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ]

  const postRoutes: MetadataRoute.Sitemap = (posts ?? []).map((p) => ({
    url: `${appUrl}/blog/${p.slug}`,
    lastModified: new Date(p.updated_at),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const productRoutes: MetadataRoute.Sitemap = (products ?? []).map((p) => ({
    url: `${appUrl}/shop/${p.slug}`,
    lastModified: new Date(p.updated_at),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticRoutes, ...postRoutes, ...productRoutes]
}
