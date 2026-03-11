import { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, AlertTriangle, ExternalLink, Shield } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Official ProductOS Website Verification | productos.dev',
  description: 'Verify you are on the official ProductOS website. ProductOS is the AI-native product development platform. Official domain: productos.dev',
  keywords: [
    'official ProductOS',
    'ProductOS verification',
    'real ProductOS',
    'authentic ProductOS',
    'productos.dev official'
  ],
  openGraph: {
    title: 'Official ProductOS Website | productos.dev',
    description: 'This is the official ProductOS website. Verify authenticity.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.productos.dev/official',
  },
}

const officialDomains = [
  { name: 'Main Website', url: 'www.productos.dev', description: 'Marketing site and documentation' },
  { name: 'Build Surface', url: 'build.productos.dev', description: 'PRD generation and requirements' },
  { name: 'Design Surface', url: 'design.productos.dev', description: 'AI UI/UX design generation' },
  { name: 'Develop Surface', url: 'develop.productos.dev', description: 'AI code generation' },
  { name: 'Mobile Surface', url: 'mobile.productos.dev', description: 'Mobile app builder' },
]

const officialSocials = [
  { name: 'Twitter/X', handle: '@productos_dev', url: 'https://twitter.com/productos_dev' },
  { name: 'LinkedIn', handle: '/company/productos', url: 'https://linkedin.com/company/productos' },
  { name: 'GitHub', handle: '/productos', url: 'https://github.com/productos' },
]

export default function OfficialPage() {
  return (
    <main className="min-h-screen py-24 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 mb-6">
            <Shield className="size-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Verified Official Website</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Official ProductOS Website
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            You are on the authentic ProductOS platform.
          </p>
        </div>

        {/* Verification Badge */}
        <div className="p-6 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 mb-12">
          <div className="flex items-start gap-4">
            <CheckCircle className="size-8 text-emerald-600 dark:text-emerald-400 shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-semibold text-emerald-900 dark:text-emerald-100 mb-2">
                ✓ You&apos;re in the right place
              </h2>
              <p className="text-emerald-800 dark:text-emerald-200">
                This website (<strong>productos.dev</strong>) is the official home of ProductOS, 
                the AI-native product development platform.
              </p>
            </div>
          </div>
        </div>

        {/* Official Domains */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Official ProductOS Domains</h2>
          <div className="grid gap-4">
            {officialDomains.map((domain) => (
              <div 
                key={domain.url}
                className="flex items-center justify-between p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle className="size-5 text-emerald-500" />
                  <div>
                    <div className="font-medium">{domain.name}</div>
                    <div className="text-sm text-muted-foreground">{domain.description}</div>
                  </div>
                </div>
                <a 
                  href={`https://${domain.url}`}
                  className="flex items-center gap-1 text-sm text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {domain.url}
                  <ExternalLink className="size-3" />
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Official Social Channels */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Official Social Channels</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {officialSocials.map((social) => (
              <a 
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors text-center"
              >
                <div className="font-medium mb-1">{social.name}</div>
                <div className="text-sm text-primary">{social.handle}</div>
              </a>
            ))}
          </div>
        </section>

        {/* Warning Section */}
        <section className="mb-12">
          <div className="p-6 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
            <div className="flex items-start gap-4">
              <AlertTriangle className="size-8 text-amber-600 dark:text-amber-400 shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-semibold text-amber-900 dark:text-amber-100 mb-2">
                  ⚠️ Beware of Imitations
                </h2>
                <p className="text-amber-800 dark:text-amber-200 mb-4">
                  There may be other websites using similar names or branding. The only official 
                  ProductOS platform is hosted on the <strong>productos.dev</strong> domain.
                </p>
                <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-2">
                  <li>• We are <strong>NOT</strong> affiliated with any other website using &quot;ProductOS&quot;</li>
                  <li>• Always check the URL before entering any information</li>
                  <li>• Our official email domain is <strong>@productos.dev</strong></li>
                  <li>• When in doubt, contact us at <a href="mailto:founders@productos.dev" className="underline">founders@productos.dev</a></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">About ProductOS</h2>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>
              ProductOS is the AI-native product development platform that helps founders and 
              product teams ship products 10x faster. Our platform provides 5 specialized AI 
              agents covering the complete product development lifecycle:
            </p>
            <ul>
              <li><strong>Ideation Agent</strong> — Generate product concepts and positioning</li>
              <li><strong>Research Agent</strong> — Market research and competitor analysis</li>
              <li><strong>PRD Agent</strong> — Automated requirement documents</li>
              <li><strong>Design Agent</strong> — AI-generated UI/UX mockups</li>
              <li><strong>Code Agent</strong> — Production-ready React/Next.js code</li>
            </ul>
          </div>
        </section>

        {/* Contact */}
        <section className="text-center">
          <h2 className="text-2xl font-bold mb-4">Questions?</h2>
          <p className="text-muted-foreground mb-6">
            If you have questions about ProductOS authenticity or need to report a suspicious website, 
            please contact us.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="mailto:founders@productos.dev"
              className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              Email Us
            </a>
            <Link 
              href="/"
              className="px-6 py-3 rounded-lg border border-border hover:bg-muted transition-colors font-medium"
            >
              Back to Homepage
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}
