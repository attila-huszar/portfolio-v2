'use server'

import { env } from 'cloudflare:workers'

type SendEmailResult = { ok: true } | { ok: false; error: string }

const deliveryError = 'Failed to send email, please try again later.'

export const sendEmail = async (formData: FormData): Promise<SendEmailResult> => {
  const senderEmail = formData.get('senderEmail')
  const message = formData.get('message')

  if (
    typeof senderEmail !== 'string' ||
    senderEmail.length > 500 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(senderEmail)
  ) {
    return { ok: false, error: 'Invalid email address' }
  }

  if (!message || typeof message !== 'string' || message.length > 5000) {
    return { ok: false, error: 'Invalid message' }
  }

  if (!env.CONTACT_EMAIL?.trim() || !env.RESEND_API_KEY?.trim()) {
    console.error({
      event: 'contact_email_configuration_missing',
    })
    return { ok: false, error: deliveryError }
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Contact Form <onboarding@resend.dev>',
        to: env.CONTACT_EMAIL,
        reply_to: senderEmail,
        subject: 'Message from portfolio contact form',
        text: `From: ${senderEmail}\n\nMessage: ${message}`,
      }),
    })

    if (!response.ok) {
      console.error({ event: 'contact_email_rejected', status: response.status })
      return { ok: false, error: deliveryError }
    }
    return { ok: true }
  } catch {
    console.error({ event: 'contact_email_request_failed' })
    return { ok: false, error: deliveryError }
  }
}
