import type { Metadata } from 'next'
import { Cormorant_Garamond, Outfit, JetBrains_Mono } from 'next/font/google'
import { calcExpYears } from '@/lib/expYears'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-outfit',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-jetbrains',
  display: 'swap',
})

const expYears = calcExpYears()

export const metadata: Metadata = {
  metadataBase: new URL('https://viswabnath.github.io'),
  title: 'Viswanath Bodasakurthi — Senior Software Engineer',
  description: `Senior Software Engineer with ${expYears}+ years experience. Co-Founder of Onemark Digital. Angular expert, AI agent builder, clinical tech specialist.`,
  openGraph: {
    title: 'Viswanath Bodasakurthi — Senior Software Engineer & Co-Founder',
    description: `${expYears} years of engineering craft. Co-Founder of Onemark Digital.`,
    images: ['/api/og'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Viswanath Bodasakurthi — Senior Software Engineer',
    images: ['/api/og'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${outfit.variable} ${jetbrains.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Viswanath Bodasakurthi',
              jobTitle: 'Senior Frontend Engineer & Co-Founder OneMark',
              email: 'viswanathbodasakurthi@gmail.com',
              url: 'https://viswabnath.github.io',
              sameAs: [
                'https://github.com/viswabnath',
                'https://linkedin.com/in/viswabnath',
                'https://twitter.com/viswabnath',
              ],
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
