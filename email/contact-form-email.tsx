import { Tailwind } from '@react-email/tailwind'
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Text,
  Hr,
} from '@react-email/components'

export default function ContactFormEmail({
  message,
  senderEmail,
}: {
  message: string
  senderEmail: string
}) {
  return (
    <Html>
      <Tailwind>
        <Head />
        <Preview>New message from your portfolio site</Preview>
        <Body className="bg-gray-100 text-black">
          <Container>
            <Section className="borderBlack my-10 rounded-md bg-white px-10 py-4">
              <Text>
                You received the following message from the contact form
              </Text>
              <Hr />
              <Text>{message}</Text>
              <Hr />
              <Text>
                {"The sender's email is: "}
                <a href={`mailto:${senderEmail}`}>{senderEmail}</a>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
