import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Zap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'ProductOS Comparisons | How We Compare to Alternatives',
  description: 'Compare ProductOS to other AI development tools. See how ProductOS stacks up against Lovable, Bolt.new, v0, Cursor, and more.',
  keywords: [
    'ProductOS vs Lovable',
    'ProductOS vs Bolt',
    'ProductOS vs v0',
    'ProductOS vs Cursor',
    'ProductOS alternatives',
    'Lovable alternative',
    'Bolt.new alternative',
    'AI code generator comparison'
  ],
  openGraph: {
    title: 'ProductOS Comparisons | AI Development Tool Comparison',
    description: 'See how ProductOS compares to Lovable, Bolt.new, v0, Cursor, and other AI tools.',
  },
  alternates: {
    canonical: 'https://www.productos.dev/compare',
  },
}

const comparisons = [
  {
    name: 'Lovable',
    slug: 'lovable',
    tagline: 'Full lifecycle vs code-only',
    description: 'Lovable generates code. ProductOS handles the entire product journey from PRD to deployment.',
    keyDiff: 'ProductOS includes PRD, research, and design stages'
  },
  {
    name: 'Bolt.new',
    slug: 'bolt-new',
    tagline: 'Platform vs sandbox',
    description: 'Bolt.new is a code sandbox. ProductOS is a complete product development platform.',
    keyDiff: 'ProductOS preserves context across all stages'
  },
  {
    name: 'v0 by Vercel',
    slug: 'v0',
    tagline: 'Components vs complete products',
    description: 'v0 generates UI components. ProductOS builds entire products from idea to launch.',
    keyDiff: 'ProductOS generates full apps, not just components'
  },
  {
    name: 'Cursor',
    slug: 'cursor',
    tagline: 'IDE vs no-code platform',
    description: 'Cursor is an AI IDE for developers. ProductOS is for founders who want to ship without coding.',
    keyDiff: 'ProductOS requires no coding knowledge'
  },
  {
    name: 'Rork',
    slug: 'rork',
    tagline: 'Mobile-only vs full platform',
    description: 'Rork focuses on mobile apps. ProductOS builds web apps, mobile apps, and everything in between.',
    keyDiff: 'ProductOS covers web + mobile with shared context'
  },
]

export default function ComparePage() {
  return (
    <main className="min-h-screen py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Zap className="size-4 text-primary" />
            <span className="text-sm font-medium">Honest Comparisons</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            How ProductOS Compares
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We believe in transparency. See how <strong>ProductOS</strong> stacks up 
            against other AI development tools.
          </p>
        </div>

        {/* Key Differentiator */}
        <div className="p-6 rounded-xl bg-card border border-border mb-12">
          <h2 className="text-lg font-semibold mb-4">What Makes ProductOS Different</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="size-5 text-emerald-500 mt-0.5 shrink-0" />
              <div>
                <div className="font-medium">Full Product Lifecycle</div>
                <div className="text-sm text-muted-foreground">From idea → PRD → design → code → deploy</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="size-5 text-emerald-500 mt-0.5 shrink-0" />
              <div>
                <div className="font-medium">Context Preservation</div>
                <div className="text-sm text-muted-foreground">Research flows into PRD, PRD into design, design into code</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="size-5 text-emerald-500 mt-0.5 shrink-0" />
              <div>
                <div className="font-medium">5 Specialized Agents</div>
                <div className="text-sm text-muted-foreground">Each stage has an AI expert, not one generic model</div>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Cards */}
        <div className="grid gap-6">
          {comparisons.map((comp) => (
            <Link
              key={comp.slug}
              href={`/compare/${comp.slug}`}
              className="group p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-xl font-semibold">ProductOS vs {comp.name}</h2>
                    <span className="px-2 py-0.5 rounded-full bg-muted text-xs text-muted-foreground">
                      {comp.tagline}
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-3">{comp.description}</p>
                  <div className="inline-flex items-center gap-2 text-sm text-primary">
                    <CheckCircle className="size-4" />
                    {comp.keyDiff}
                  </div>
                </div>
                <ArrowRight className="size-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0 mt-1" />
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to try the complete platform?</h2>
          <p className="text-muted-foreground mb-6">
            Join our private beta — the AI-native product development platform.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/early-access"
              className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              Request Early Access
            </a>
            <Link
              href="mailto:founders@productos.dev"
              className="px-6 py-3 rounded-lg border border-border hover:bg-muted transition-colors font-medium"
            >
              Talk to Founders
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
