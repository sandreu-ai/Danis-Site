import type { Metadata } from 'next'
import { Caveat, Cormorant_Garamond, Fredoka, Inter, JetBrains_Mono, Nunito } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans-brand',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono-brand',
  weight: ['400', '500'],
  display: 'swap',
})

const fredoka = Fredoka({
  subsets: ['latin'],
  variable: '--font-fredoka',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  weight: ['300', '400', '500', '600'],
  display: 'swap',
})

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
  weight: ['400', '500', '600'],
  display: 'swap',
})

const appUrl = 'https://www.danielacerrato.com'

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Daniela Cerrato',
  url: appUrl,
  image: `${appUrl}/Daniela.jpg`,
  sameAs: [
    'https://www.instagram.com/thedanicerrato',
    'https://www.facebook.com/thedanicerrato',
    'https://www.tiktok.com/@thedanicerrato',
  ],
  description:
    'Homeschool mom sharing real rhythms, intentional learning, and practical resources for families learning at home.',
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Daniela Cerrato',
  url: appUrl,
}

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    default: 'Daniela Cerrato — Raise Them on Purpose',
    template: '%s | Daniela Cerrato',
  },
  description:
    'Warm, practical homeschool rhythms, family resources, and honest encouragement from Daniela Cerrato for intentional homes and curious kids.',
  keywords: [
    'Daniela Cerrato',
    'homeschool mom',
    'intentional parenting',
    'homeschool encouragement',
    'homeschool resources',
    'family rhythms',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: appUrl,
    siteName: 'Daniela Cerrato',
    images: [
      {
        url: '/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Daniela Cerrato — Raise them on purpose',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} ${jetbrains.variable} ${fredoka.variable} ${nunito.variable} ${caveat.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="flex min-h-screen flex-col antialiased">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
