export interface Post {
  id: string
  title: string
  slug: string
  content: Record<string, unknown> | null
  content_html: string | null
  cover_image_url: string | null
  category: string | null
  published: boolean
  created_at: string
  updated_at: string
}

export interface Product {
  id: string
  title: string
  slug: string
  description: Record<string, unknown> | null
  description_html: string | null
  price: number
  file_url: string
  cover_image_url: string | null
  created_at: string
  updated_at: string
}

export interface Purchase {
  id: string
  email: string
  product_id: string | null
  stripe_session_id: string | null
  stripe_payment_intent_id: string | null
  amount: number
  created_at: string
  product?: Product
}

export interface RecommendedProduct {
  id: string
  title: string
  description: string | null
  category: string | null
  image_url: string | null
  affiliate_url: string
  featured: boolean
  created_at: string
  updated_at: string
}

export interface Subscriber {
  id: string
  email: string
  subscribed_at: string
  active: boolean
}

export type PostStatus = 'draft' | 'published'

export interface PostFormData {
  title: string
  slug: string
  category: string
  content: Record<string, unknown>
  content_html: string
  cover_image_url: string
  published: boolean
}

export interface ProductFormData {
  title: string
  slug: string
  description: Record<string, unknown>
  description_html: string
  price: number
  cover_image_url: string
  file_url: string
}

export interface LibraryFormData {
  title: string
  description: string
  category: string
  image_url: string
  affiliate_url: string
  featured: boolean
}

export interface ActionResult<T = undefined> {
  success: boolean
  error?: string
  data?: T
}
