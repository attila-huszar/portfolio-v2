'use server'

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
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Contact Form <onboarding@resend.dev>',
        to: 'attila.huszar@outlook.com',
        reply_to: String(senderEmail),
        subject: 'Message from portfolio contact form',
        html: `<p>Email: ${String(senderEmail)}</p><p>Message: ${message}</p>`,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to send email, please try again later.')
    }
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
