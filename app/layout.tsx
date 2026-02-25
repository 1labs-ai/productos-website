import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { OrganizationSchema, SoftwareApplicationSchema, WebSiteSchema } from "@/components/structured-data"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.productos.dev'),
  title: {
    default: 'ProductOS - Ship Products 10x Faster with AI',
    template: '%s | ProductOS'
  },
  description: 'The AI-native product development platform. 5 specialized AI agents take you from idea to launch in days, not months. Used by 10,000+ founders.',
  keywords: [
    'AI product development',
    'product management tool',
    'AI PRD generator',
    'AI design tool',
    'AI code generator',
    'startup tools',
    'product roadmap',
    'MVP builder',
    'no-code AI',
    'ProductOS'
  ],
  authors: [{ name: 'ProductOS by 1Labs AI', url: 'https://1labs.ai' }],
  creator: '1Labs AI',
  publisher: 'ProductOS',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.productos.dev',
    siteName: 'ProductOS',
    title: 'ProductOS - Ship Products 10x Faster with AI',
    description: 'The AI-native product development platform. 5 specialized AI agents take you from idea to launch in days, not months.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ProductOS - AI-Native Product Development Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ProductOS - Ship Products 10x Faster with AI',
    description: 'The AI-native product development platform. 5 AI agents take you from idea to launch.',
    images: ['/og-image.png'],
    creator: '@productos_dev',
  },
  alternates: {
    canonical: 'https://www.productos.dev',
  },
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Structured Data for SEO & GEO */}
        <OrganizationSchema />
        <SoftwareApplicationSchema />
        <WebSiteSchema />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="min-h-screen bg-background pt-16">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
