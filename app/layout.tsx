import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const siteUrl = 'https://hannkey.digital'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'HannKey Digital — Marketplace Akun & Layanan Digital Premium',
    template: '%s | HannKey Digital',
  },
  description:
    'HannKey Digital adalah marketplace akun & layanan digital premium dengan aktivasi instan, pembayaran aman, akun resmi bergaransi 30 hari, dan harga terbaik di Indonesia.',
  applicationName: 'HannKey Digital',
  generator: 'v0.app',
  keywords: [
    'HannKey Digital',
    'marketplace digital',
    'akun premium',
    'Netflix Premium',
    'ChatGPT Plus',
    'Canva Pro',
    'Spotify Premium',
    'layanan digital',
    'aktivasi instan',
  ],
  authors: [{ name: 'HannKey Digital' }],
  creator: 'HannKey Digital',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: siteUrl,
    siteName: 'HannKey Digital',
    title: 'HannKey Digital — Digital Premium Access For Everyone',
    description:
      'Nikmati akses layanan digital premium dengan aktivasi instan, pembayaran aman, akun resmi, dan harga terbaik.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HannKey Digital — Digital Premium Access For Everyone',
    description:
      'Marketplace akun & layanan digital premium. Aktivasi instan, pembayaran aman, harga terbaik.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#070B1A',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" className={`dark bg-background ${inter.variable}`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
