import { Resend } from 'resend'
import { PurchaseConfirmation } from '../../emails/purchase-confirmation'

let resendClient: Resend | null = null

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not set')
  }

  resendClient ??= new Resend(apiKey)
  return resendClient
}

export async function sendPurchaseConfirmation({
  to,
  productName,
  downloadUrl,
}: {
  to: string
  productName: string
  downloadUrl: string
}) {
  const resend = getResendClient()
  const { data, error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL ?? 'hello@danielacerrato.com',
    to,
    subject: `Your download is ready — ${productName}`,
    react: PurchaseConfirmation({ productName, downloadUrl, toEmail: to }),
  })

  if (error) throw new Error(`Failed to send email: ${error.message}`)
  return data
}

export async function subscribeToAudience(email: string) {
  const audienceId = process.env.RESEND_AUDIENCE_ID
  if (!audienceId) throw new Error('RESEND_AUDIENCE_ID is not set')

  const resend = getResendClient()
  const { data, error } = await resend.contacts.create({
    audienceId,
    email,
    unsubscribed: false,
  })

  if (error) {
    if (error.message?.toLowerCase().includes('already exists')) {
      return { alreadySubscribed: true }
    }
    throw new Error(`Failed to subscribe: ${error.message}`)
  }

  return { data, alreadySubscribed: false }
}
