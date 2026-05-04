import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import test from 'node:test'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')
const exists = (path) => existsSync(new URL(`../${path}`, import.meta.url))

test('admin navigation exposes the email list to logged-in admins', () => {
  const nav = read('src/components/admin/AdminNav.tsx')

  assert.match(nav, /href:\s*['"]\/admin\/subscribers['"]/, 'Admin nav should link to /admin/subscribers')
  assert.match(nav, /Email List|Subscribers/, 'Admin nav should label the email list clearly')
})

test('admin dashboard summarizes subscribers and links to the list', () => {
  const dashboard = read('src/app/admin/(protected)/page.tsx')

  assert.match(dashboard, /from\(['"]subscribers['"]\)/, 'Dashboard should query subscriber count')
  assert.match(dashboard, /Subscriber|Email List/, 'Dashboard should show subscriber stats')
  assert.match(dashboard, /\/admin\/subscribers/, 'Dashboard should link to subscriber admin page')
})

test('protected subscriber admin page lists email signups with status and export action', () => {
  const pagePath = 'src/app/admin/(protected)/subscribers/page.tsx'
  assert.equal(exists(pagePath), true, 'Subscriber admin page should exist')

  const page = read(pagePath)
  assert.match(page, /Email List|Subscribers/, 'Page should be titled for Daniela’s email list')
  assert.match(page, /from\(['"]subscribers['"]\)/, 'Page should read from subscribers table')
  assert.match(page, /select\(['"]id, email, subscribed_at, active['"]\)/, 'Page should select safe subscriber fields')
  assert.match(page, /order\(['"]subscribed_at['"],\s*\{\s*ascending:\s*false\s*\}\)/, 'Page should show newest signups first')
  assert.match(page, /mailto:/, 'Page should make subscriber emails easy to contact')
  assert.match(page, /Active|Inactive/, 'Page should show subscription status')
  assert.match(page, /\/admin\/subscribers\/export/, 'Page should expose CSV export')
})

test('subscriber CSV export is authenticated and uses service role only after session check', () => {
  const routePath = 'src/app/admin/(protected)/subscribers/export/route.ts'
  assert.equal(exists(routePath), true, 'Subscriber export route should exist')

  const route = read(routePath)
  assert.match(route, /auth\.getSession\(\)/, 'Export must check the logged-in admin session')
  assert.match(route, /status:\s*401|redirect\(/, 'Export must reject unauthenticated requests')
  assert.match(route, /createAdminClient\(\)/, 'Export can use service role only after auth check')
  assert.match(route, /from\(['"]subscribers['"]\)/, 'Export should read subscribers table')
  assert.match(route, /text\/csv/, 'Export should return CSV content type')
  assert.match(route, /Content-Disposition/, 'Export should download as an attachment')
})
