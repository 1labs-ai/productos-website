import { Metadata } from 'next'
import { ComparisonPage } from '@/components/comparison-page'

export const metadata: Metadata = {
  title: 'ProductOS vs Cursor | No-Code Platform vs AI IDE',
  description: 'Compare ProductOS and Cursor. ProductOS is a no-code product platform for founders. Cursor is an AI-powered IDE for developers.',
  keywords: [
    'ProductOS vs Cursor',
    'Cursor alternative',
    'Cursor AI comparison',
    'no-code vs IDE',
    'ProductOS',
    'AI coding assistant'
  ],
  openGraph: {
    title: 'ProductOS vs Cursor | Detailed Comparison',
    description: 'ProductOS is for founders. Cursor is for developers. See which is right for you.',
  },
  alternates: {
    canonical: 'https://www.productos.dev/compare/cursor',
  },
}

const features = [
  { name: 'AI Code Assistance', productos: true, competitor: true },
  { name: 'No Coding Required', productos: true, competitor: false, highlight: true },
  { name: 'PRD/Requirements Generation', productos: true, competitor: false, highlight: true },
  { name: 'Market Research Agent', productos: true, competitor: false, highlight: true },
  { name: 'AI Design Generation', productos: true, competitor: false, highlight: true },
  { name: 'Full IDE Features', productos: false, competitor: true },
  { name: 'Multi-Language Support', productos: 'JS/TS focused', competitor: 'All languages' },
  { name: 'Code Completion', productos: true, competitor: true },
  { name: 'Codebase Context', productos: 'Per project', competitor: true },
  { name: 'One-Click Deployment', productos: true, competitor: false },
  { name: 'GitHub Integration', productos: true, competitor: true },
  { name: 'Mobile App Generation', productos: true, competitor: false },
  { name: 'Team Collaboration', productos: true, competitor: 'Via Git' },
  { name: 'Free Tier', productos: true, competitor: true },
]

const summary = {
  productosStrengths: [
    'No coding knowledge required',
    'Complete product development workflow',
    'From idea to deployed product in one platform',
    'PRD generation, research, and design included',
    'Built for founders and product managers',
    'One-click deployment without DevOps knowledge'
  ],
  competitorStrengths: [
    'Full-featured IDE (VS Code fork)',
    'Works with any programming language',
    'Deep codebase understanding',
    'Tab completion and inline suggestions',
    'Perfect for existing codebases',
    'Powerful for experienced developers'
  ],
  bestFor: {
    productos: 'A founder or product person who wants to build products without being a developer. You care about the product, not the code.',
    competitor: 'A developer who wants AI assistance while coding. You\'re comfortable in an IDE and want AI to speed up your existing workflow.'
  }
}

const verdict = `Cursor and ProductOS serve completely different users. Cursor is an AI-powered IDE — it's VS Code supercharged with AI. It's brilliant for developers who want to code faster. ProductOS is a product development platform — it's for people who want to build products without necessarily knowing how to code. A founder using ProductOS doesn't need to understand React or databases; they describe what they want and get a working product. A developer using Cursor gets AI assistance while they write code. Neither is "better" — they're tools for different people with different goals. If you code, consider Cursor. If you want to ship products without coding, use ProductOS.`

export default function CursorComparisonPage() {
  return (
    <ComparisonPage
      competitor={{
        name: 'Cursor',
        tagline: 'Cursor is for developers. ProductOS is for founders.',
        description: 'An AI-first code editor built on VS Code that provides intelligent code completion and AI chat.',
        website: 'cursor.sh'
      }}
      features={features}
      summary={summary}
      verdict={verdict}
    />
  )
}
