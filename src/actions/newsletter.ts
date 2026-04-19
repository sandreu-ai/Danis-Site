'use server'

import { z } from 'zod'
import { createAdminClient } from '@/lib/supabase/admin'
import { subscribeToAudience } from '@/lib/resend'
import type { ActionResult } from '@/types'

const EmailSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

export async function subscribeEmail(
  formData: FormData
): Promise<ActionResult> {
  const raw = { email: formData.get('email') as string }
  const parsed = EmailSchema.safeParse(raw)

  if (!parsed.success) {
    return { success: false, error: parsed.error.errors[0].message }
  }

  const { email } = parsed.data
  const supabase = createAdminClient()

  const { data: existing } = await supabase
    .from('subscribers')
    .select('id, active')
    .eq('email', email)
    .single()

  if (existing) {
    if (existing.active) return { success: true }
    await supabase
      .from('subscribers')
      .update({ active: true })
      .eq('email', email)
    return { success: true }
  }

  await supabase.from('subscribers').insert({ email })

  try {
    await subscribeToAudience(email)
  } catch {
    // Resend subscription failure is non-blocking
  }

  return { success: true }
}
