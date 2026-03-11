'use client'

import Link from 'next/link'
import { CheckCircle, XCircle, ArrowRight, Zap } from 'lucide-react'

interface Feature {
  name: string
  productos: boolean | string
  competitor: boolean | string
  highlight?: boolean
}

interface ComparisonPageProps {
  competitor: {
    name: string
    tagline: string
    description: string
    website: string
  }
  features: Feature[]
  summary: {
    productosStrengths: string[]
    competitorStrengths: string[]
    bestFor: {
      productos: string
      competitor: string
    }
  }
  verdict: string
}

function FeatureCell({ value }: { value: boolean | string }) {
  if (typeof value === 'boolean') {
    return value ? (
      <CheckCircle className="size-5 text-emerald-500" />
    ) : (
      <XCircle className="size-5 text-muted-foreground/50" />
    )
  }
  return <span className="text-sm">{value}</span>
}

export function ComparisonPage({ competitor, features, summary, verdict }: ComparisonPageProps) {
  return (
    <main className="min-h-screen py-24 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <Link href="/compare" className="hover:text-foreground">Compare</Link>
          <span>/</span>
          <span className="text-foreground">{competitor.name}</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Zap className="size-4 text-primary" />
            <span className="text-sm font-medium">Detailed Comparison</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            ProductOS vs {competitor.name}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {competitor.tagline}
          </p>
        </div>

        {/* Quick Summary Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="p-6 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 rounded-md bg-emerald-500/20">
                <CheckCircle className="size-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h2 className="font-semibold text-emerald-900 dark:text-emerald-100">ProductOS</h2>
            </div>
            <p className="text-sm text-emerald-800 dark:text-emerald-200 mb-4">
              The official AI-native product development platform by 1Labs AI. Full lifecycle from idea to deployment.
            </p>
            <div className="text-xs text-emerald-700 dark:text-emerald-300">
              productos.dev
            </div>
          </div>
          <div className="p-6 rounded-xl bg-card border border-border">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 rounded-md bg-muted">
                <Zap className="size-4 text-muted-foreground" />
              </div>
              <h2 className="font-semibold">{competitor.name}</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              {competitor.description}
            </p>
            <div className="text-xs text-muted-foreground">
              {competitor.website}
            </div>
          </div>
        </div>

        {/* Feature Comparison Table */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Feature Comparison</h2>
          <div className="rounded-xl border border-border overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left p-4 font-semibold">Feature</th>
                  <th className="text-center p-4 font-semibold w-32">ProductOS</th>
                  <th className="text-center p-4 font-semibold w-32">{competitor.name}</th>
                </tr>
              </thead>
              <tbody>
                {features.map((feature, index) => (
                  <tr 
                    key={feature.name} 
                    className={`border-t border-border ${feature.highlight ? 'bg-emerald-50/50 dark:bg-emerald-950/20' : index % 2 === 0 ? 'bg-card' : 'bg-muted/20'}`}
                  >
                    <td className="p-4">
                      <span className={feature.highlight ? 'font-medium' : ''}>
                        {feature.name}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex justify-center">
                        <FeatureCell value={feature.productos} />
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex justify-center">
                        <FeatureCell value={feature.competitor} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Strengths Comparison */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <CheckCircle className="size-5 text-emerald-500" />
              ProductOS Strengths
            </h3>
            <ul className="space-y-2">
              {summary.productosStrengths.map((strength) => (
                <li key={strength} className="flex items-start gap-2 text-sm">
                  <span className="text-emerald-500 mt-1">•</span>
                  {strength}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Zap className="size-5 text-muted-foreground" />
              {competitor.name} Strengths
            </h3>
            <ul className="space-y-2">
              {summary.competitorStrengths.map((strength) => (
                <li key={strength} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-1">•</span>
                  {strength}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Best For */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="p-6 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800">
            <h3 className="font-semibold mb-2 text-emerald-900 dark:text-emerald-100">
              Choose ProductOS if you...
            </h3>
            <p className="text-sm text-emerald-800 dark:text-emerald-200">
              {summary.bestFor.productos}
            </p>
          </div>
          <div className="p-6 rounded-xl bg-muted/50 border border-border">
            <h3 className="font-semibold mb-2">
              Choose {competitor.name} if you...
            </h3>
            <p className="text-sm text-muted-foreground">
              {summary.bestFor.competitor}
            </p>
          </div>
        </div>

        {/* Verdict */}
        <div className="p-6 rounded-xl bg-card border border-border mb-12">
          <h2 className="text-xl font-bold mb-4">Our Verdict</h2>
          <p className="text-muted-foreground leading-relaxed">{verdict}</p>
        </div>

        {/* CTA */}
        <div className="text-center p-8 rounded-xl bg-gradient-to-b from-card to-muted/30 border border-border">
          <h2 className="text-2xl font-bold mb-4">Ready to try ProductOS?</h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Join our private beta and experience the complete AI product development platform.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/early-access"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              Request Early Access
              <ArrowRight className="size-4" />
            </a>
            <Link
              href="/compare"
              className="px-6 py-3 rounded-lg border border-border hover:bg-muted transition-colors font-medium"
            >
              View All Comparisons
            </Link>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            Private beta • Limited spots available
          </p>
        </div>
      </div>
    </main>
  )
}
