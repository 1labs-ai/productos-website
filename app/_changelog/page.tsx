"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AnimatedSection } from "@/components/ui/animated-section"
import {
  ArrowRight,
  Bell,
  Calendar,
  Sparkles,
  Tag,
  Rocket,
  CheckCircle2,
  Wrench,
} from "lucide-react"
import {
  changelogEntries,
  getCategoryColor,
  getCategoryLabel,
  formatDate,
  type ChangeCategory,
} from "@/lib/changelog-data"

const CategoryIcon = ({ category }: { category: ChangeCategory }) => {
  switch (category) {
    case "new":
      return <Sparkles className="w-3.5 h-3.5" />
    case "improved":
      return <Rocket className="w-3.5 h-3.5" />
    case "fixed":
      return <Wrench className="w-3.5 h-3.5" />
    default:
      return <CheckCircle2 className="w-3.5 h-3.5" />
  }
}

export default function ChangelogPage() {
  return (
    <>
      
      {/* Hero */}
      <section className="relative pt-32 pb-16 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <AnimatedSection>
            <Badge
              variant="secondary"
              className="mb-6 px-4 py-2 bg-muted/50 border border-border"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Product Updates
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6" style={{ letterSpacing: '-0.025em' }}>
              Changelog
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Follow our journey as we build the future of AI-native product
              development. New features, improvements, and fixes—shipped weekly.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8"
              >
                <Bell className="w-4 h-4 mr-2" />
                Subscribe to Updates
              </Button>
              <Link href="https://twitter.com/productos_dev" target="_blank">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8 border-border bg-background/50 hover:bg-muted"
                >
                  Follow on X
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Category Legend */}
      <section className="py-8 border-b border-border px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <span className="text-sm text-muted-foreground">Categories:</span>
            {(["new", "improved", "fixed"] as ChangeCategory[]).map(
              (category) => (
                <Badge
                  key={category}
                  className={`${getCategoryColor(category)} flex items-center gap-1.5`}
                >
                  <CategoryIcon category={category} />
                  {getCategoryLabel(category)}
                </Badge>
              )
            )}
          </div>
        </div>
      </section>

      {/* Changelog Timeline */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-blue-500 to-cyan-500 opacity-30" />

            {changelogEntries.map((entry, entryIndex) => (
              <AnimatedSection
                key={entry.slug}
                delay={entryIndex * 0.1}
                className="relative mb-16 last:mb-0"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-8 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-primary to-blue-500 border-4 border-background z-10" />

                <div className="ml-8 md:ml-20" id={entry.slug}>
                  {/* Version Header */}
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <Badge className="bg-gradient-to-r from-primary/20 to-blue-500/20 text-foreground border-primary/30 text-sm font-mono">
                      <Tag className="w-3 h-3 mr-1.5" />v{entry.version}
                    </Badge>
                    <span className="text-muted-foreground text-sm">
                      {formatDate(entry.date)}
                    </span>
                  </div>

                  {/* Title */}
                  <Link href={`#${entry.slug}`}>
                    <h2 className="text-2xl md:text-3xl font-bold mb-3 text-foreground hover:text-primary transition-colors cursor-pointer">
                      {entry.title}
                    </h2>
                  </Link>

                  {/* Summary */}
                  <p className="text-muted-foreground mb-6 text-lg">{entry.summary}</p>

                  {/* Changes */}
                  <div className="space-y-4">
                    {entry.changes.map((change, changeIndex) => (
                      <Card
                        key={changeIndex}
                        className="p-5 bg-card/50 border-border hover:border-border/80 hover:bg-card/80 transition-all group"
                      >
                        <div className="flex items-start gap-4">
                          <Badge
                            className={`${getCategoryColor(change.category)} flex items-center gap-1.5 shrink-0`}
                          >
                            <CategoryIcon category={change.category} />
                            {getCategoryLabel(change.category)}
                          </Badge>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                              {change.title}
                            </h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                              {change.description}
                            </p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe CTA */}
      <section className="py-24 bg-gradient-to-b from-transparent via-primary/5 to-transparent px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <Card className="relative overflow-hidden p-8 md:p-16 bg-gradient-to-r from-primary/10 via-blue-500/10 to-cyan-500/10 border-border">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(var(--primary),0.1),transparent_50%)]" />
              <div className="relative text-center max-w-2xl mx-auto">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary/20 to-blue-500/20 flex items-center justify-center">
                  <Bell className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                  Never miss an update
                </h2>
                <p className="text-muted-foreground mb-8">
                  Subscribe to our changelog and get notified when we ship new
                  features, improvements, and fixes. We respect your inbox—only
                  the important stuff.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 w-full px-6 py-3 rounded-full bg-background/50 border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-foreground placeholder:text-muted-foreground"
                  />
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 whitespace-nowrap"
                  >
                    Subscribe
                  </Button>
                </div>
                <p className="text-muted-foreground text-sm mt-4">
                  No spam, unsubscribe anytime
                </p>
              </div>
            </Card>
          </AnimatedSection>
        </div>
      </section>

      {/* Back to Home CTA */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <AnimatedSection>
            <p className="text-muted-foreground mb-6">
              Want to see ProductOS in action?
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8"
                >
                  Explore ProductOS <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/#pricing">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8 border-border bg-background/50 hover:bg-muted"
                >
                  View Pricing
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
