'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { createAdminClient } from '@/lib/supabase/admin'
import { subscribeToAudience } from '@/lib/resend'

const EmailSchema = z.object({
  email: z.string().email(),
})

export async function unlockDaniPicks(formData: FormData) {
  const parsed = EmailSchema.safeParse({
    email: formData.get('email'),
  })

  if (!parsed.success) {
    redirect('/library?email=invalid')
  }

  const email = parsed.data.email.toLowerCase().trim()
  const supabase = createAdminClient()

  const { data: existing } = await supabase
    .from('subscribers')
    .select('id, active')
    .eq('email', email)
    .single()

  if (existing) {
    if (!existing.active) {
      await supabase
        .from('subscribers')
        .update({ active: true })
        .eq('email', email)
    }
  } else {
    await supabase.from('subscribers').insert({ email })
  }

  try {
    await subscribeToAudience(email)
  } catch {
    // Resend sync is non-blocking so the gate still unlocks if audience sync is unavailable.
  }

  const cookieStore = await cookies()
  cookieStore.set('dani_picks_email_access', '1', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
  })

  redirect('/library?unlocked=1')
}
