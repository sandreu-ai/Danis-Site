import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'

interface PurchaseConfirmationProps {
  productName: string
  downloadUrl: string
  toEmail: string
}

export function PurchaseConfirmation({
  productName,
  downloadUrl,
  toEmail,
}: PurchaseConfirmationProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>Your download is ready — {productName}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={logo}>Daniela Cerrato</Heading>
            <Text style={tagline}>Faith-Filled Homeschooling Resources</Text>
          </Section>

          {/* Main content */}
          <Section style={content}>
            <Heading style={h1}>Thank you for your purchase! 🌿</Heading>

            <Text style={paragraph}>
              Your download for <strong>{productName}</strong> is ready. Click
              the button below to download your file. This link is valid for 24
              hours.
            </Text>

            <Section style={buttonContainer}>
              <Button style={button} href={downloadUrl}>
                Download Your File
              </Button>
            </Section>

            <Text style={paragraph}>
              If the button above doesn&apos;t work, copy and paste this link
              into your browser:
            </Text>
            <Link style={linkStyle} href={downloadUrl}>
              {downloadUrl}
            </Link>

            <Hr style={hr} />

            <Text style={paragraph}>
              If you have any questions or issues with your download, simply
              reply to this email and I&apos;ll be happy to help.
            </Text>

            <Text style={paragraph}>
              Thank you for supporting our homeschool journey. I hope this
              resource blesses your family!
            </Text>

            <Text style={paragraph}>
              For updates and the real, everyday side of our homeschool life,
              follow along on Instagram:{' '}
              <Link
                style={linkStyle}
                href="https://www.instagram.com/thedanicerrato"
              >
                @thedanicerrato
              </Link>
            </Text>

            <Text style={signature}>
              With love & grace,
              <br />
              <strong>Daniela Cerrato</strong>
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              You&apos;re receiving this email because you purchased{' '}
              {productName} from danielacerrato.com.
            </Text>
            <Text style={footerText}>
              This email was sent to {toEmail} •{' '}
              <Link style={footerLink} href="https://danielacerrato.com">
                danielacerrato.com
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export default PurchaseConfirmation

const main = {
  backgroundColor: '#FDF8F0',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
}

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  maxWidth: '580px',
}

const header = {
  backgroundColor: '#2C2C2C',
  borderRadius: '12px 12px 0 0',
  padding: '32px 40px',
  textAlign: 'center' as const,
}

const logo = {
  color: '#FDF8F0',
  fontSize: '24px',
  fontWeight: '700',
  margin: '0 0 4px',
  letterSpacing: '0.5px',
}

const tagline = {
  color: '#B4CAB1',
  fontSize: '13px',
  margin: '0',
}

const content = {
  backgroundColor: '#FFFFFF',
  padding: '40px',
}

const h1 = {
  color: '#2C2C2C',
  fontSize: '24px',
  fontWeight: '600',
  margin: '0 0 24px',
}

const paragraph = {
  color: '#5C5C5C',
  fontSize: '16px',
  lineHeight: '1.7',
  margin: '0 0 16px',
}

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
}

const button = {
  backgroundColor: '#8FAE8B',
  borderRadius: '8px',
  color: '#FFFFFF',
  fontSize: '16px',
  fontWeight: '600',
  padding: '14px 32px',
  textDecoration: 'none',
  display: 'inline-block',
}

const linkStyle = {
  color: '#8FAE8B',
  wordBreak: 'break-all' as const,
  fontSize: '14px',
}

const signature = {
  color: '#2C2C2C',
  fontSize: '16px',
  lineHeight: '1.7',
  margin: '24px 0 0',
}

const hr = {
  border: 'none',
  borderTop: '1px solid #F5F0EB',
  margin: '32px 0',
}

const footer = {
  backgroundColor: '#F5F0EB',
  borderRadius: '0 0 12px 12px',
  padding: '24px 40px',
}

const footerText = {
  color: '#5C5C5C',
  fontSize: '12px',
  lineHeight: '1.5',
  margin: '0 0 4px',
  textAlign: 'center' as const,
}

const footerLink = {
  color: '#8FAE8B',
  textDecoration: 'none',
}
