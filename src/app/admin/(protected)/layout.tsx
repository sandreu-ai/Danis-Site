import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { AdminNav } from '@/components/admin/AdminNav'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/admin/login')
  }

  return (
    <div className="flex min-h-screen bg-cream">
      <AdminNav />
      <div className="flex-1 flex flex-col min-w-0">
        {children}
      </div>
    </div>
  )
}
