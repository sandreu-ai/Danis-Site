import type { Metadata } from 'next'
import { Fredoka, Nunito, Caveat } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'

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

const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://danielacerrato.com'

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    default: 'Daniela Cerrato — Homeschooling Made Simple',
    template: '%s | Daniela Cerrato',
  },
  description:
    'Homeschooling resources, printables, and real-life encouragement from a mom who gets it. You can do this — and you don\'t have to figure it out alone.',
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
        alt: 'Daniela Cerrato — Faith-Filled Homeschooling Resources',
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
    <html lang="en" className={`${fredoka.variable} ${nunito.variable} ${caveat.variable}`}>
      <body className="flex flex-col min-h-screen bg-cream font-sans antialiased">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
