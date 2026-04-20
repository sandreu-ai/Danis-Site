'use client'

import { useState } from 'react'

export function EmailSignup() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (!res.ok) {
        setStatus('error')
        setMessage(data.error ?? 'Something went wrong.')
        return
      }

      if (data.status === 'already_subscribed') {
        setStatus('success')
        setMessage("You're already on the list — so glad you're here!")
      } else {
        setStatus('success')
        setMessage("You're in! Can't wait to show up in your inbox.")
        setEmail('')
      }
    } catch {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

  return (
    <div className="text-center">
      <p className="section-label mb-3" style={{ color: 'rgba(255,255,255,0.9)' }}>
        join the community
      </p>
      <h2
        className="text-3xl sm:text-4xl mb-4 text-white"
        style={{ fontFamily: 'var(--font-fredoka)', fontWeight: 600 }}
      >
        We&apos;re All in This Together
      </h2>
      <div className="divider" />
      <p className="font-sans text-sm mt-5 mb-8 max-w-sm mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>
        A community of real moms, figuring it out one day at a time. Get honest
        tips, simple resources, and a reminder that you&apos;re never doing this alone.
      </p>

      {status === 'success' ? (
        <p className="font-sans font-semibold" style={{ color: '#F5C430' }}>{message}</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="flex-1 px-4 py-3 font-sans text-sm rounded-full focus:outline-none transition-colors min-h-[44px]"
            style={{
              backgroundColor: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.4)',
              color: 'white',
            }}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="shrink-0 font-sans text-xs font-semibold tracking-wider uppercase px-6 py-3 rounded-full transition-colors disabled:opacity-60 min-h-[44px]"
            style={{ backgroundColor: '#F5C430', color: '#2A3E2B' }}
          >
            {status === 'loading' ? '...' : 'Subscribe'}
          </button>
        </form>
      )}

      {status === 'error' && (
        <p className="mt-3 font-sans text-xs text-red-300">{message}</p>
      )}
    </div>
  )
}
