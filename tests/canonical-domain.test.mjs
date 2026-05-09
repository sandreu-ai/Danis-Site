import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'

const layout = readFileSync('src/app/layout.tsx', 'utf8')
const sitemap = readFileSync('src/app/sitemap.ts', 'utf8')
const robots = readFileSync('src/app/robots.ts', 'utf8')

test('SEO canonical domain uses the live www host consistently', () => {
  for (const source of [layout, sitemap, robots]) {
    assert.match(source, /https:\/\/www\.danielacerrato\.com/)
  }

  assert.doesNotMatch(layout, /NEXT_PUBLIC_APP_URL \?\? 'https:\/\/danielacerrato\.com'/)
  assert.doesNotMatch(sitemap, /NEXT_PUBLIC_APP_URL \?\? 'https:\/\/danielacerrato\.com'/)
  assert.doesNotMatch(robots, /NEXT_PUBLIC_APP_URL \?\? 'https:\/\/danielacerrato\.com'/)
})
