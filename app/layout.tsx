import type { Metadata, Viewport } from 'next'
import { DM_Sans, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'AMFPR - Amicale des Femmes de la Présidence de la République',
    template: '%s | AMFPR',
  },
  description:
    "Site officiel de l'Amicale des Femmes de la Présidence de la République. Engagées pour le bien-être social, l'éducation et l'autonomisation des femmes.",
  keywords: [
    'Amicale des Femmes',
    'Présidence de la République',
    'femmes',
    'social',
    'éducation',
    'autonomisation',
  ],
  generator: 'v0.app',
  icons: {
    icon: '/images/logo.png',
    apple: '/images/logo.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#0E3B2E',
  width: 'device-width',
  initialScale: 1,
}

import { Toaster } from 'sonner'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body
        className={`${dmSans.variable} ${playfair.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <main>{children}</main>
        <Toaster position="top-center" richColors />
        <Analytics />
      </body>
    </html>
  )
}
