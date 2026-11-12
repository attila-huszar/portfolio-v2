function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

export function createContactEmail(senderEmail: string, message: string) {
  const emailHref = `mailto:${senderEmail.split('@').map(encodeURIComponent).join('@')}`

  return {
    subject: `Portfolio message from ${senderEmail}`,
    text: `From: ${senderEmail}\n\nMessage: ${message}`,
    html: `
      <div style="background-color: #f5f5f4; padding: 24px 12px; font-family: Arial, Helvetica, sans-serif; color: #1c1917;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e7e5e4; border-radius: 12px;">
          <tr>
            <td style="padding: 28px;">
              <p style="margin: 0 0 8px; font-size: 12px; color: #78716c; letter-spacing: 1px; text-transform: uppercase;">Portfolio contact</p>
              <h1 style="margin: 0 0 24px; font-size: 24px; line-height: 1.3;">New message</h1>

              <p style="margin: 0 0 8px; font-size: 12px; color: #78716c;">From</p>
              <a href="${escapeHtml(emailHref)}" style="color: #475569; font-size: 16px; line-height: 1.6; word-break: break-all; text-decoration: underline;">${escapeHtml(senderEmail)}</a>

              <hr style="margin: 24px 0; border: 0; border-top: 1px solid #e7e5e4;" />

              <p style="margin: 0 0 12px; font-size: 12px; color: #78716c;">Message</p>
              <p style="margin: 0; font-size: 16px; line-height: 1.7; overflow-wrap: anywhere;">${escapeHtml(message).replace(/\r\n|\r|\n/g, '<br />')}</p>
            </td>
          </tr>
        </table>
        <p style="margin: 16px 0 0; text-align: center; font-size: 12px; color: #78716c;">Sent from your portfolio contact form.</p>
      </div>
    `,
  }
}
