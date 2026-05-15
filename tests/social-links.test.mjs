import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

const socialUrls = {
  instagram: 'https://www.instagram.com/thedanicerrato',
  facebook: 'https://www.facebook.com/thedanicerrato',
  tiktok: 'https://www.tiktok.com/@thedanicerrato',
}

test('sitewide structured data lists Daniela social profiles', () => {
  const layout = read('src/app/layout.tsx')

  for (const url of Object.values(socialUrls)) {
    assert.match(layout, new RegExp(url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), `sameAs should include ${url}`)
  }
})

test('footer exposes Instagram, Facebook, and TikTok profile links', () => {
  const footer = read('src/components/ui/Footer.tsx')

  for (const url of Object.values(socialUrls)) {
    assert.match(footer, new RegExp(url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), `Footer should link to ${url}`)
  }
})

test('about page points visitors to Daniela social profiles', () => {
  const about = read('src/app/about/page.tsx')

  assert.match(about, /Find me online|Follow along/i, 'About page should introduce the broader social profile list')
  for (const url of Object.values(socialUrls)) {
    assert.match(about, new RegExp(url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), `About page should link to ${url}`)
  }
})

test('purchase confirmation keeps the post-purchase social CTA Instagram-only', () => {
  const email = read('emails/purchase-confirmation.tsx')

  assert.match(email, /follow along on Instagram/i, 'Purchase email should point buyers to Instagram')
  assert.match(email, new RegExp(socialUrls.instagram.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), 'Purchase email should include Daniela Instagram')
  assert.doesNotMatch(email, new RegExp(socialUrls.facebook.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), 'Purchase email should not include Facebook')
  assert.doesNotMatch(email, new RegExp(socialUrls.tiktok.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), 'Purchase email should not include TikTok')
  assert.doesNotMatch(email, /threads\.net|Threads/i, 'Purchase email should not include Threads')
})
