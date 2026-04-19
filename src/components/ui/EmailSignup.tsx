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
      <p className="section-label mb-3">join the community</p>
      <h2 className="font-serif text-3xl text-charcoal mb-4">
        We&apos;re All in This Together
      </h2>
      <div className="divider" />
      <p className="font-sans text-sm mt-5 mb-8 max-w-sm mx-auto leading-relaxed" style={{color: '#8A8178'}}>
        A community of real moms, figuring it out one day at a time. Get honest
        tips, simple resources, and a reminder that you&apos;re never doing this alone.
      </p>

      {status === 'success' ? (
        <p className="font-sans text-sage font-medium">{message}</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="flex-1 border border-charcoal/20 bg-white px-4 py-3 font-sans text-sm text-charcoal placeholder:text-stone/50 focus:outline-none focus:border-sage transition-colors min-h-[44px]"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="shrink-0 bg-sage text-white font-sans text-xs tracking-widest uppercase px-6 py-3 hover:bg-sage-dark transition-colors disabled:opacity-60 min-h-[44px]"
          >
            {status === 'loading' ? '...' : 'Subscribe'}
          </button>
        </form>
      )}

      {status === 'error' && (
        <p className="mt-3 font-sans text-xs text-red-400">{message}</p>
      )}
    </div>
  )
}
