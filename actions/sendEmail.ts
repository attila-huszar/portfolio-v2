'use server'

import { createElement } from 'react'
import { Resend } from 'resend'
import ContactFormEmail from '@/email/contact-form-email'

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendEmail = async (formData: FormData) => {
  const senderEmail = formData.get('senderEmail')
  const message = formData.get('message')

  if (!/[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/gim.test(String(senderEmail))) {
    throw new Error('Invalid email address')
  }

  if (!message || typeof message !== 'string' || message.length > 5000) {
    throw new Error('Invalid message')
  }

  try {
    await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: 'attila.huszar@outlook.com',
      subject: 'Message from portfolio contact form',
      replyTo: String(senderEmail),
      react: createElement(ContactFormEmail, {
        message: message,
        senderEmail: String(senderEmail),
      }),
    })
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error))
  }
}

function getErrorMessage(error: unknown): string {
  let message: string

  if (error instanceof Error) {
    message = error.message
  } else if (error && typeof error === 'object' && 'message' in error) {
    message = String(error.message)
  } else if (typeof error === 'string') {
    message = error
  } else {
    message = 'Something went wrong'
  }

  return message
}
