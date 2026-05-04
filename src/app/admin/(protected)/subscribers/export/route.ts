import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'

type SubscriberExportRow = {
  email: string
  subscribed_at: string
  active: boolean
}

function escapeCsvValue(value: string | boolean) {
  const text = String(value)
  if (/[",\n\r]/.test(text)) {
    return `"${text.replaceAll('"', '""')}"`
  }
  return text
}

function toCsv(rows: SubscriberExportRow[]) {
  const header = ['email', 'subscribed_at', 'active']
  const body = rows.map((row) =>
    [row.email, row.subscribed_at, row.active].map(escapeCsvValue).join(',')
  )

  return [header.join(','), ...body].join('\n')
}

export async function GET() {
  const sessionClient = await createClient()
  const { data: { session } } = await sessionClient.auth.getSession()

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('subscribers')
    .select('email, subscribed_at, active')
    .order('subscribed_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: 'Failed to export subscribers' }, { status: 500 })
  }

  const csv = toCsv((data ?? []) as SubscriberExportRow[])
  const date = new Date().toISOString().slice(0, 10)

  return new NextResponse(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="daniela-email-list-${date}.csv"`,
      'Cache-Control': 'private, no-store',
    },
  })
}
