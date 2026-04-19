'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: '⊞' },
  { href: '/admin/posts', label: 'Blog Posts', icon: '✏️' },
  { href: '/admin/products', label: 'Products', icon: '📦' },
  { href: '/admin/library', label: "Dani's Picks", icon: '🌿' },
]

export function AdminNav() {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [signingOut, setSigningOut] = useState(false)

  async function signOut() {
    setSigningOut(true)
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  function isActive(href: string) {
    if (href === '/admin') return pathname === '/admin'
    return pathname.startsWith(href)
  }

  const NavContent = () => (
    <>
      <div className="p-6 border-b border-linen">
        <p className="font-serif text-lg font-bold text-charcoal">Daniela Cerrato</p>
        <p className="font-sans text-xs text-charcoal-light mt-0.5">Admin Dashboard</p>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-sans text-sm font-medium transition-all min-h-[44px]
                  ${isActive(item.href)
                    ? 'bg-sage text-white'
                    : 'text-charcoal hover:bg-linen'
                  }`}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-linen">
        <button
          onClick={signOut}
          disabled={signingOut}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl font-sans text-sm font-medium text-charcoal-light hover:bg-linen hover:text-red-500 transition-all min-h-[44px] disabled:opacity-50"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          {signingOut ? 'Signing out…' : 'Sign Out'}
        </button>
      </div>
    </>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 min-h-screen bg-white border-r border-linen shrink-0">
        <NavContent />
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden sticky top-0 z-50 bg-white border-b border-linen px-4 py-3 flex items-center justify-between">
        <p className="font-serif text-base font-bold text-charcoal">Admin</p>
        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded-lg text-charcoal hover:bg-linen transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Toggle menu"
        >
          {open ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute top-0 left-0 w-72 h-full bg-white flex flex-col shadow-xl">
            <NavContent />
          </div>
        </div>
      )}
    </>
  )
}
