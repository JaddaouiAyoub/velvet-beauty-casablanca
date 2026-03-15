import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Lato } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { LanguageProvider } from '@/context/language-context'
import { ThemeProvider } from '@/context/theme-context'
import './globals.css'

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
})

const lato = Lato({ 
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: 'Beauté Élégance | Salon de Beauté au Maroc',
  description: 'Salon de coiffure et soins du visage pour femmes au Maroc. Révélez votre beauté naturelle avec nos services professionnels.',
  keywords: ['salon de beauté', 'coiffure', 'soins du visage', 'Maroc', 'Casablanca', 'beauté femme'],
  icons: {
    icon: '/placeholder-logo.png',
    apple: '/placeholder-logo.png',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f9f5f2' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1817' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${playfair.variable} ${lato.variable} font-sans antialiased`}>
        <ThemeProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
