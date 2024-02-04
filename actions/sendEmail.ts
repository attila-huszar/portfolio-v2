'use server'

import { createElement } from 'react'
import { Resend } from 'resend'
import { validateString, getErrorMessage } from '@/lib/utils'
import ContactFormEmail from '@/email/contact-form-email'

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendEmail = async (formData: FormData) => {
  const senderEmail = formData.get('senderEmail')
  const message = formData.get('message')

  if (!validateString(senderEmail, 500)) {
    return 'Invalid sender email'
  }
  if (!validateString(message, 5000)) {
    return 'Invalid message'
  }

  try {
    await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: 'attila.huszar@outlook.com',
      subject: 'Message from contact form',
      reply_to: senderEmail,
      react: createElement(ContactFormEmail, {
        message: message,
        senderEmail: senderEmail,
      }),
    })
  } catch (error: unknown) {
    return getErrorMessage(error)
  }
}
