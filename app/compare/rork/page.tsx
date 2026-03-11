import { Metadata } from 'next'
import { ComparisonPage } from '@/components/comparison-page'

export const metadata: Metadata = {
  title: 'ProductOS vs Rork | Full Platform vs Mobile-Only',
  description: 'Compare ProductOS and Rork. ProductOS builds web and mobile apps with shared context. Rork focuses exclusively on mobile app generation.',
  keywords: [
    'ProductOS vs Rork',
    'Rork alternative',
    'AI mobile app builder comparison',
    'ProductOS mobile',
    'ProductOS',
    'mobile app generator'
  ],
  openGraph: {
    title: 'ProductOS vs Rork | Detailed Comparison',
    description: 'ProductOS does web + mobile. Rork is mobile-only. See the complete comparison.',
  },
  alternates: {
    canonical: 'https://www.productos.dev/compare/rork',
  },
}

const features = [
  { name: 'Mobile App Generation', productos: true, competitor: true },
  { name: 'Web App Generation', productos: true, competitor: false, highlight: true },
  { name: 'Shared Context (Web + Mobile)', productos: true, competitor: false, highlight: true },
  { name: 'PRD/Requirements Generation', productos: true, competitor: false, highlight: true },
  { name: 'Market Research Agent', productos: true, competitor: false, highlight: true },
  { name: 'AI Design Generation', productos: true, competitor: true },
  { name: 'React Native/Expo', productos: true, competitor: true },
  { name: 'QR Code Preview', productos: true, competitor: true },
  { name: 'Companion App', productos: true, competitor: true },
  { name: 'App Store Submission', productos: 'Coming soon', competitor: true },
  { name: 'RevenueCat Integration', productos: 'Coming soon', competitor: true },
  { name: 'External API Integration', productos: true, competitor: true },
  { name: 'Free Tier', productos: true, competitor: true },
]

const summary = {
  productosStrengths: [
    'Complete platform: web + mobile in one place',
    'Shared context between web and mobile projects',
    'Full product lifecycle (PRD → Design → Code)',
    'Research and requirements before mobile development',
    'Build web dashboard + mobile app together',
    '5 specialized AI agents across all stages'
  ],
  competitorStrengths: [
    'Laser-focused on mobile apps',
    'Direct App Store submission workflow',
    'RevenueCat monetization built-in',
    'Polished mobile preview experience',
    'Established mobile-first documentation'
  ],
  bestFor: {
    productos: 'Building products that need both web and mobile presence. You want requirements and design stages before code. Your mobile app connects to a web backend.',
    competitor: 'Building a mobile-only product. You want the fastest path from idea to App Store. Mobile monetization is a priority.'
  }
}

const verdict = `Rork is excellent for mobile-first builders who want the fastest path to the App Store. It's focused, polished, and purpose-built for mobile. ProductOS takes a broader view — it's for building complete products that might include web apps, mobile apps, or both. The unique advantage of ProductOS is shared context: build your web dashboard and mobile app from the same PRD, with the same design system, and consistent functionality. If you're building a mobile-only app and want App Store submission handled, Rork is solid. If you're building a product ecosystem that includes mobile, or you want the full development lifecycle, ProductOS provides that integrated experience.`

export default function RorkComparisonPage() {
  return (
    <ComparisonPage
      competitor={{
        name: 'Rork',
        tagline: 'Rork does mobile-only. ProductOS does web + mobile.',
        description: 'An AI-powered mobile app builder that generates React Native apps and helps submit to app stores.',
        website: 'rork.app'
      }}
      features={features}
      summary={summary}
      verdict={verdict}
    />
  )
}
