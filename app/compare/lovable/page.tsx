import { Metadata } from 'next'
import { ComparisonPage } from '@/components/comparison-page'

export const metadata: Metadata = {
  title: 'ProductOS vs Lovable | Full Lifecycle vs Code Generation',
  description: 'Compare ProductOS and Lovable. See why ProductOS offers complete product development (PRD → Design → Code) while Lovable focuses on code generation only.',
  keywords: [
    'ProductOS vs Lovable',
    'Lovable alternative',
    'Lovable comparison',
    'AI code generator comparison',
    'ProductOS',
    'better than Lovable'
  ],
  openGraph: {
    title: 'ProductOS vs Lovable | Detailed Comparison',
    description: 'ProductOS offers full product lifecycle. Lovable does code only. See the complete comparison.',
  },
  alternates: {
    canonical: 'https://www.productos.dev/compare/lovable',
  },
}

const features = [
  { name: 'AI Code Generation', productos: true, competitor: true },
  { name: 'PRD/Requirements Generation', productos: true, competitor: false, highlight: true },
  { name: 'Market Research Agent', productos: true, competitor: false, highlight: true },
  { name: 'AI Design Generation', productos: true, competitor: false, highlight: true },
  { name: 'Context Preservation Across Stages', productos: true, competitor: false, highlight: true },
  { name: 'GitHub Integration', productos: true, competitor: true },
  { name: 'Vercel Deployment', productos: true, competitor: true },
  { name: 'Mobile App Generation', productos: true, competitor: false },
  { name: 'Live Preview', productos: true, competitor: true },
  { name: 'React/Next.js Output', productos: true, competitor: true },
  { name: 'Free Tier', productos: true, competitor: true },
  { name: 'API Access', productos: 'Pro plan', competitor: 'Enterprise' },
]

const summary = {
  productosStrengths: [
    'Complete product development lifecycle (5 stages)',
    'Dedicated agents for each stage (research, PRD, design, code)',
    'Context flows automatically between stages',
    'Includes market research and competitor analysis',
    'Generates PRDs that feed directly into design and code',
    'Mobile app generation with ProductOS Mobile'
  ],
  competitorStrengths: [
    'Established brand recognition',
    'Simple, focused interface for code generation',
    'Good for developers who just need code output',
    'Fast iteration on code changes'
  ],
  bestFor: {
    productos: 'Want the complete journey from idea to deployed product. You need PRDs, research, design, and code — all connected. Ideal for founders and product teams.',
    competitor: 'Already have your requirements and designs ready, and just need AI to generate the code. You\'re a developer comfortable defining specs yourself.'
  }
}

const verdict = `ProductOS and Lovable serve different needs. Lovable is excellent at what it does — generating code from prompts. But ProductOS is designed for the complete product development journey. If you're a founder or product team who needs to go from "I have an idea" to "I have a deployed product," ProductOS covers stages that Lovable simply doesn't address. The research agent, PRD generation, and design stages in ProductOS mean your code is built on a solid foundation of validated requirements. For pure code generation, both tools work well. For building products end-to-end, ProductOS is the more complete solution.`

export default function LovableComparisonPage() {
  return (
    <ComparisonPage
      competitor={{
        name: 'Lovable',
        tagline: 'Lovable generates code. ProductOS builds complete products.',
        description: 'An AI-powered code generation tool that creates web applications from natural language prompts.',
        website: 'lovable.dev'
      }}
      features={features}
      summary={summary}
      verdict={verdict}
    />
  )
}
