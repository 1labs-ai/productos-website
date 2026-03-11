import { Metadata } from 'next'
import { ComparisonPage } from '@/components/comparison-page'

export const metadata: Metadata = {
  title: 'ProductOS vs Bolt.new | Platform vs Code Sandbox',
  description: 'Compare ProductOS and Bolt.new. ProductOS is a complete product development platform, while Bolt.new is a browser-based code sandbox.',
  keywords: [
    'ProductOS vs Bolt.new',
    'ProductOS vs Bolt',
    'Bolt.new alternative',
    'Bolt alternative',
    'AI code sandbox comparison',
    'ProductOS'
  ],
  openGraph: {
    title: 'ProductOS vs Bolt.new | Detailed Comparison',
    description: 'ProductOS is a platform. Bolt.new is a sandbox. See why the difference matters.',
  },
  alternates: {
    canonical: 'https://www.productos.dev/compare/bolt-new',
  },
}

const features = [
  { name: 'AI Code Generation', productos: true, competitor: true },
  { name: 'Browser-Based IDE', productos: true, competitor: true },
  { name: 'PRD/Requirements Generation', productos: true, competitor: false, highlight: true },
  { name: 'Market Research Agent', productos: true, competitor: false, highlight: true },
  { name: 'AI Design Generation', productos: true, competitor: false, highlight: true },
  { name: 'Project Persistence', productos: true, competitor: 'Session-based' },
  { name: 'Context Across Sessions', productos: true, competitor: false, highlight: true },
  { name: 'GitHub Integration', productos: true, competitor: true },
  { name: 'One-Click Deployment', productos: true, competitor: true },
  { name: 'Mobile App Generation', productos: true, competitor: false },
  { name: 'Live Preview', productos: true, competitor: true },
  { name: 'Multi-Framework Support', productos: 'React/Next.js', competitor: 'Multiple' },
  { name: 'Free Tier', productos: true, competitor: true },
]

const summary = {
  productosStrengths: [
    'Complete product development platform, not just a sandbox',
    'Projects persist with full history and context',
    'PRD and research stages before code generation',
    'AI Design generation integrated into workflow',
    'Context preservation: research → PRD → design → code',
    '5 specialized AI agents for each stage'
  ],
  competitorStrengths: [
    'Extremely fast for quick prototypes',
    'Supports multiple frameworks (Vue, Svelte, etc.)',
    'Great for experimenting with code ideas',
    'Simple, no-account-needed experience',
    'Good for learning and demos'
  ],
  bestFor: {
    productos: 'Building real products that need proper requirements, design, and maintainable code. Your projects need to persist and evolve over time.',
    competitor: 'Quick experiments, learning to code, or building throwaway prototypes. You need something running in minutes without signing up.'
  }
}

const verdict = `Bolt.new is fantastic for what it is — a fast, browser-based code sandbox powered by AI. It's perfect for quick experiments and prototypes. But it's designed for ephemeral, session-based work. ProductOS is built for building real products. Your projects persist, context is preserved across sessions, and you get the full product development lifecycle. If you're exploring an idea for 30 minutes, Bolt.new is great. If you're building a product you want to launch and maintain, ProductOS provides the structure and persistence you need.`

export default function BoltComparisonPage() {
  return (
    <ComparisonPage
      competitor={{
        name: 'Bolt.new',
        tagline: 'Bolt.new is a sandbox. ProductOS is a platform.',
        description: 'A browser-based AI code sandbox by StackBlitz for quickly generating and running web applications.',
        website: 'bolt.new'
      }}
      features={features}
      summary={summary}
      verdict={verdict}
    />
  )
}
