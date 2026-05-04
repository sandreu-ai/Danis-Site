import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import test from 'node:test'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')
const exists = (path) => existsSync(new URL(`../${path}`, import.meta.url))

test("Dani's Picks page checks for email access before rendering affiliate picks", () => {
  const page = read('src/app/library/page.tsx')

  assert.match(page, /cookies\(\)/, 'Library page should read cookies server-side')
  assert.match(page, /dani_picks_email_access/, 'Library access should be remembered with a dedicated cookie')
  assert.match(page, /LibraryEmailGate/, 'Library page should render an email gate for visitors without access')
  assert.match(page, /hasEmailAccess/, 'Library page should branch on email access')
  assert.match(page, /hasEmailAccess[\s\S]*<LibraryContent|LibraryContent[\s\S]*hasEmailAccess/, 'Affiliate picks should only render behind the access branch')
})

test("Dani's Picks email gate collects an email and explains the unlock", () => {
  const page = read('src/app/library/page.tsx')

  assert.match(page, /action=\{unlockDaniPicks\}/, 'Gate form should submit to unlock server action')
  assert.match(page, /name=['"]email['"]/, 'Gate should collect an email field')
  assert.match(page, /type=['"]email['"]/, 'Gate should use an email input')
  assert.match(page, /required/, 'Email field should be required')
  assert.match(page, /Get the list|Unlock|Send me Dani/, 'CTA should make the email-for-access exchange clear')
})

test('Dani picks unlock action subscribes the email and sets access cookie', () => {
  const actionPath = 'src/actions/library-access.ts'
  assert.equal(exists(actionPath), true, 'Library access action should exist')

  const action = read(actionPath)
  assert.match(action, /'use server'/, 'Unlock action should be server-only')
  assert.match(action, /z\.string\(\)\.email/, 'Unlock action should validate email')
  assert.match(action, /from\(['"]subscribers['"]\)/, 'Unlock action should add/reactivate the subscriber')
  assert.match(action, /subscribeToAudience/, 'Unlock action should also sync to Resend audience when configured')
  assert.match(action, /cookies\(\)/, 'Unlock action should set a cookie after successful email capture')
  assert.match(action, /dani_picks_email_access/, 'Unlock action should set the dedicated library access cookie')
  assert.match(action, /httpOnly:\s*true/, 'Access cookie should be httpOnly')
  assert.match(action, /sameSite:\s*['"]lax['"]/, 'Access cookie should use lax SameSite')
  assert.match(action, /redirect\(['"]\/library/, 'Unlock action should return visitors to Dani’s Picks')
})
