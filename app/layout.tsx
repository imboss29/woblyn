import './globals.css'
import type { Metadata } from 'next'
import { Providers } from './providers'
import { Analytics } from '@vercel/analytics/react'

export const metadata: Metadata = {
  title: 'Woblyn — Créez votre business plan professionnel en 5 minutes',
  description: 'Vous avez un projet ? Woblyn génère votre business plan complet en 5 minutes : analyse de marché, projections financières, stratégie. À partir de 97€.',
  keywords: 'business plan, IA, intelligence artificielle, entrepreneur, startup, financement, banque, investisseur, BPI, incubateur',
  openGraph: {
    title: 'Woblyn — Créez votre business plan professionnel en 5 minutes',
    description: 'Vous avez un projet ? Woblyn génère votre business plan complet en 5 minutes : analyse de marché, projections financières, stratégie. À partir de 97€.',
    url: 'https://woblyn.com',
    siteName: 'Woblyn',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Woblyn — Créez votre business plan professionnel en 5 minutes',
    description: 'Vous avez un projet ? Woblyn génère votre business plan complet en 5 minutes.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;700;900&family=IBM+Plex+Sans:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  )
}