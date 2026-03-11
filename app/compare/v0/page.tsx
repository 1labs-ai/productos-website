import { Metadata } from 'next'
import { ComparisonPage } from '@/components/comparison-page'

export const metadata: Metadata = {
  title: 'ProductOS vs v0 | Complete Apps vs UI Components',
  description: 'Compare ProductOS and v0 by Vercel. ProductOS builds complete products from idea to deployment. v0 generates individual UI components.',
  keywords: [
    'ProductOS vs v0',
    'ProductOS vs v0 Vercel',
    'v0 alternative',
    'v0.dev alternative',
    'AI UI component generator',
    'ProductOS'
  ],
  openGraph: {
    title: 'ProductOS vs v0 | Detailed Comparison',
    description: 'ProductOS builds complete products. v0 generates components. See the full comparison.',
  },
  alternates: {
    canonical: 'https://www.productos.dev/compare/v0',
  },
}

const features = [
  { name: 'AI UI Generation', productos: true, competitor: true },
  { name: 'Complete App Generation', productos: true, competitor: false, highlight: true },
  { name: 'PRD/Requirements Generation', productos: true, competitor: false, highlight: true },
  { name: 'Market Research Agent', productos: true, competitor: false, highlight: true },
  { name: 'Backend/API Generation', productos: true, competitor: false, highlight: true },
  { name: 'Database Schema Generation', productos: true, competitor: false },
  { name: 'Component Library Output', productos: true, competitor: true },
  { name: 'shadcn/ui Integration', productos: true, competitor: true },
  { name: 'Tailwind CSS', productos: true, competitor: true },
  { name: 'One-Click Deployment', productos: true, competitor: false },
  { name: 'Mobile App Generation', productos: true, competitor: false },
  { name: 'Context Preservation', productos: true, competitor: false, highlight: true },
  { name: 'Free Tier', productos: true, competitor: true },
]

const summary = {
  productosStrengths: [
    'Generates complete applications, not just components',
    'Full product lifecycle: research → PRD → design → code',
    'Backend and API generation included',
    'Database schema and setup',
    'One-click deployment to production',
    'Context preserved across the entire project'
  ],
  competitorStrengths: [
    'Best-in-class UI component generation',
    'Native Vercel ecosystem integration',
    'Excellent shadcn/ui output quality',
    'Great for adding components to existing projects',
    'Simple, focused interface'
  ],
  bestFor: {
    productos: 'Building complete applications from scratch. You need the full stack — requirements, design, frontend, backend, database, and deployment.',
    competitor: 'Adding UI components to an existing project. You\'re a developer who needs beautiful, production-ready components to copy into your codebase.'
  }
}

const verdict = `v0 by Vercel is excellent at generating UI components — arguably the best in the market. If you're a developer adding components to an existing project, v0 is hard to beat. But v0 generates components, not applications. ProductOS is designed for building complete products. When you use ProductOS, you're not just getting UI — you're getting the full stack from validated requirements through to deployed application. The comparison isn't really apples-to-apples: v0 is a component generator, ProductOS is a product development platform. Use v0 when you need components, use ProductOS when you need to ship a product.`

export default function V0ComparisonPage() {
  return (
    <ComparisonPage
      competitor={{
        name: 'v0',
        tagline: 'v0 generates components. ProductOS builds complete products.',
        description: 'An AI-powered UI component generator by Vercel that creates React components from text descriptions.',
        website: 'v0.dev'
      }}
      features={features}
      summary={summary}
      verdict={verdict}
    />
  )
}
