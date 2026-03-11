import type React from "react"
import type { Metadata } from "next"
import Script from "next/script"
import { Inter, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
// import { GeometricBackground } from "@/components/geometric-background"
import { OrganizationSchema, SoftwareApplicationSchema, WebSiteSchema } from "@/components/structured-data"
import "./globals.css"

const GA_MEASUREMENT_ID = "G-XEFK3N9Y95"
const GOOGLE_ADS_ID = "AW-17995076533"

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
  description: 'ProductOS is the AI-native product development platform. 5 specialized AI agents take you from idea to launch in days, not months.',
  keywords: [
    'ProductOS',
    'ProductOS AI',
    'ProductOS',
    'productos.dev',
    'official ProductOS',
    'AI product development',
    'product management tool',
    'AI PRD generator',
    'AI design tool',
    'AI code generator',
    'startup tools',
    'product roadmap',
    'MVP builder',
    'no-code AI'
  ],
  authors: [{ name: 'ProductOS', url: 'https://productos.dev' }],
  creator: 'ProductOS',
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
  verification: {
    google: 'EtWoauwhaTFvxCkiAAntsExFtgIZNETAGdzfHiO9p8s',
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
        {/* Google Analytics 4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
            gtag('config', '${GOOGLE_ADS_ID}');
          `}
        </Script>
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
          {/* Geometric background removed */}
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
