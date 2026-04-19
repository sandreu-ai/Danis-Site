import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createAdminClient } from '@/lib/supabase/admin'
import { subscribeToAudience } from '@/lib/resend'

const Schema = z.object({
  email: z.string().email(),
})

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}))
  const parsed = Schema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
  }

  const { email } = parsed.data
  const supabase = createAdminClient()

  const { data: existing } = await supabase
    .from('subscribers')
    .select('id, active')
    .eq('email', email)
    .single()

  if (existing?.active) {
    return NextResponse.json({ status: 'already_subscribed' })
  }

  if (existing && !existing.active) {
    await supabase.from('subscribers').update({ active: true }).eq('email', email)
  } else {
    const { error } = await supabase.from('subscribers').insert({ email })
    if (error) {
      return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 })
    }
  }

  try {
    await subscribeToAudience(email)
  } catch {
    // Non-blocking
  }

  return NextResponse.json({ status: 'success' })
}
