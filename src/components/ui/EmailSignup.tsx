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
        setMessage("You're already on the list — so glad you're here.")
      } else {
        setStatus('success')
        setMessage("You're in. I'll send the useful things, not inbox noise.")
        setEmail('')
      }
    } catch {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

  return (
    <div className="editorial-card grid gap-8 p-7 sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:p-12">
      <div>
        <p className="section-label mb-6">The letter</p>
        <h2 className="dani-display text-5xl sm:text-6xl">
          Notes for the <em>middle</em> of the week.
        </h2>
      </div>

      <div className="flex flex-col justify-center">
        <p className="font-sans text-sm leading-7 text-[color:var(--dani-cocoa)]">
          Simple homeschool rhythms, favorite finds, and honest encouragement for the days
          that do not look like a Pinterest board.
        </p>

        {status === 'success' ? (
          <p className="mt-6 font-sans text-sm font-semibold text-[color:var(--dani-blush-deep)]">{message}</p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="min-h-[48px] flex-1 border border-[color:var(--dani-rule)] bg-[color:var(--dani-paper)] px-4 py-3 font-sans text-sm text-[color:var(--dani-espresso)] outline-none transition-colors placeholder:text-[color:var(--dani-cocoa)] focus:border-[color:var(--dani-blush-deep)]"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="editorial-button shrink-0 disabled:opacity-60"
            >
              {status === 'loading' ? 'Sending' : 'Subscribe'}
            </button>
          </form>
        )}

        {status === 'error' && (
          <p className="mt-3 font-sans text-xs text-[color:var(--dani-blush-deep)]">{message}</p>
        )}
      </div>
    </div>
  )
}
