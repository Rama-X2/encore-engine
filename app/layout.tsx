import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ToastProvider from '../components/ui/ToastProvider'
import ErrorBoundary from '../components/ui/ErrorBoundary'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TopUp Game Premium - Website Top Up Game Terpercaya Indonesia',
  description: 'Platform top up game terlengkap di Indonesia! Mobile Legends, Free Fire, Genshin Impact, PUBG Mobile, dan 100+ game lainnya. Harga murah, proses instant, aman & terpercaya. Bonus pulsa & paket data untuk semua operator.',
  keywords: 'top up game, mobile legends, free fire, genshin impact, pubg mobile, diamond ml, voucher game, pulsa murah, paket data, topup game indonesia, game online',
  authors: [{ name: 'TopUp Game Premium' }],
  creator: 'TopUp Game Premium',
  publisher: 'TopUp Game Premium',
  robots: 'index, follow',
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#6366f1',
  colorScheme: 'dark',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    title: 'TopUp Game Premium - Website Top Up Game Terpercaya Indonesia',
    description: 'Platform top up game terlengkap di Indonesia! Mobile Legends, Free Fire, Genshin Impact, PUBG Mobile, dan 100+ game lainnya. Harga murah, proses instant, aman & terpercaya.',
    siteName: 'TopUp Game Premium',
    images: [
      {
        url: '/images/banners/banner.jpg',
        width: 1200,
        height: 630,
        alt: 'TopUp Game Premium - Website Top Up Game Terpercaya',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TopUp Game Premium - Top Up Game Terpercaya',
    description: 'Platform top up game terlengkap! Mobile Legends, Free Fire, Genshin Impact & 100+ game lainnya. Harga murah, proses instant!',
    images: ['/images/banners/banner.jpg'],
    creator: '@topupgamepremium',
  },
  alternates: {
    canonical: 'https://topupgame-premium.vercel.app',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "TopUp Game Premium",
    "description": "Platform top up game terlengkap di Indonesia",
    "url": "https://topupgame-premium.vercel.app",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://topupgame-premium.vercel.app/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "sameAs": [
      "https://instagram.com/topupgamepremium",
      "https://facebook.com/topupgamepremium",
      "https://twitter.com/topupgamepremium"
    ]
  }

  return (
    <html lang="id">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#6366f1" />
        <meta name="color-scheme" content="dark" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={inter.className}>
        <ErrorBoundary>
          <ToastProvider>
            {children}
          </ToastProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}