import assert from 'node:assert/strict'
import { registerHooks } from 'node:module'
import { afterEach, beforeEach, mock, test } from 'node:test'
import type { Mock } from 'node:test'

// Provide Worker bindings locally; every delivery request is mocked.
registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier === 'cloudflare:workers') {
      return {
        url: 'data:text/javascript,export const env = {}',
        shortCircuit: true,
      }
    }
    return nextResolve(specifier, context)
  },
})

const { env } = await import('cloudflare:workers')
const { sendEmail } = await import('../actions/sendEmail.ts')

let fetchMock: Mock<typeof fetch>
let errorMock: Mock<typeof console.error>

function contactForm(senderEmail = 'sender@example.com', message = 'Hello!') {
  const data = new FormData()
  data.set('senderEmail', senderEmail)
  data.set('message', message)
  return data
}

beforeEach(() => {
  env.CONTACT_EMAIL = 'recipient@example.com'
  env.RESEND_API_KEY = 'test-api-key'
  const successfulFetch: typeof fetch = async () =>
    Response.json({ id: 'test-id' })
  fetchMock = mock.method(globalThis, 'fetch', successfulFetch)
  errorMock = mock.method(console, 'error', () => {})
})

afterEach(() => mock.restoreAll())

test('invalid input returns a readable error without attempting delivery', async () => {
  for (const sender of [
    '',
    'invalid',
    'sender@example.com\nother@example.com',
  ]) {
    assert.deepEqual(await sendEmail(contactForm(sender)), {
      ok: false,
      error: 'Invalid email address',
    })
  }
  for (const message of ['', 'a'.repeat(5001)]) {
    assert.deepEqual(
      await sendEmail(contactForm('sender@example.com', message)),
      {
        ok: false,
        error: 'Invalid message',
      },
    )
  }
  assert.equal(fetchMock.mock.callCount(), 0)
})

for (const binding of ['CONTACT_EMAIL', 'RESEND_API_KEY'] as const) {
  test(`missing ${binding} is handled without a rejected action or delivery request`, async () => {
    env[binding] = ' '
    const result = await sendEmail(contactForm())
    assert.ok(!result.ok)
    assert.match(result.error, /Failed to send email/)
    assert.equal(fetchMock.mock.callCount(), 0)
    assert.equal(errorMock.mock.callCount(), 1)
    assert.deepEqual(errorMock.mock.calls[0].arguments, [
      { event: 'contact_email_configuration_missing' },
    ])
  })
}

test('provider rejection returns a public error and logs only its status', async () => {
  fetchMock.mock.mockImplementation(async () =>
    Response.json({ message: 'Private provider details' }, { status: 403 }),
  )
  const result = await sendEmail(contactForm())
  assert.ok(!result.ok)
  assert.doesNotMatch(result.error, /Private provider details/)
  assert.deepEqual(errorMock.mock.calls[0].arguments, [
    { event: 'contact_email_rejected', status: 403 },
  ])
})

test('network failure returns a public error rather than throwing', async () => {
  fetchMock.mock.mockImplementation(async () => {
    throw new Error('Private connection details')
  })
  const result = await sendEmail(contactForm())
  assert.ok(!result.ok)
  assert.match(result.error, /Failed to send email/)
  assert.doesNotMatch(result.error, /Private connection details/)
})

test('successful delivery uses the runtime recipient and preserves message text', async () => {
  const result = await sendEmail(
    contactForm('sender@example.com', '<b>Hello!</b>'),
  )
  assert.deepEqual(result, { ok: true })
  assert.equal(fetchMock.mock.callCount(), 1)
  const [url, options] = fetchMock.mock.calls[0].arguments
  assert.equal(url, 'https://api.resend.com/emails')
  assert.ok(options)
  assert.equal(options.method, 'POST')
  assert.equal(
    new Headers(options.headers).get('Authorization'),
    'Bearer test-api-key',
  )
  assert.ok(typeof options.body === 'string')
  const body = JSON.parse(options.body)
  assert.equal(body.to, 'recipient@example.com')
  assert.equal(body.reply_to, 'sender@example.com')
  assert.match(body.text, /<b>Hello!<\/b>/)
  assert.equal(body.html, undefined)
})
