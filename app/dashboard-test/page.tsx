"use client"

import { DeploymentPipeline } from "@/components/sections/production-ready/variants/deployment-pipeline"
import { GitActivityFeed } from "@/components/sections/production-ready/variants/git-activity-feed"
import { CodeQualityScorecard } from "@/components/sections/production-ready/variants/code-quality-scorecard"
import { SplitPreview } from "@/components/sections/production-ready/variants/split-preview"
import { AnimatedCodeFlow } from "@/components/sections/production-ready/variants/animated-code-flow"
import { TerminalDeploy } from "@/components/sections/production-ready/variants/terminal-deploy"
import { FloatingCodeCards } from "@/components/sections/production-ready/variants/floating-code-cards"
import { AgentCodeStream } from "@/components/sections/production-ready/variants/agent-code-stream"

export default function DashboardTestPage() {
  return (
    <main className="min-h-screen bg-background py-12">
      <div className="max-w-[1436px] mx-auto px-6 lg:px-[50px]">
        {/* Page Header */}
        <div className="mb-16 text-center">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-sm font-medium mb-4">
            Production-Ready Section
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Dashboard Variants
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Design concepts for the "Production-ready from day one" section.
          </p>
        </div>

        {/* NEW LINEAR-INSPIRED VARIANTS */}
        <div className="mb-24">
          <div className="flex items-center gap-3 mb-12">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
            <span className="px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium">
              ✨ New Linear-Inspired Variants
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
          </div>

          {/* Variant A: Animated Code Flow */}
          <section className="mb-20">
            <div className="mb-8 pb-4 border-b border-border/50">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-violet-500/10 text-violet-400 text-sm font-medium mb-3">
                Variant A
              </span>
              <h2 className="text-2xl font-semibold text-foreground">Animated Code Flow</h2>
              <p className="text-muted-foreground mt-2">
                Code typing animation with real-time deploy status. Clean editor-style presentation.
              </p>
            </div>
            <AnimatedCodeFlow />
          </section>

          {/* Variant B: Terminal Deploy */}
          <section className="mb-20">
            <div className="mb-8 pb-4 border-b border-border/50">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-violet-500/10 text-violet-400 text-sm font-medium mb-3">
                Variant B
              </span>
              <h2 className="text-2xl font-semibold text-foreground">Terminal Deploy</h2>
              <p className="text-muted-foreground mt-2">
                Minimal terminal with typed deploy log. Shows the full deployment journey.
              </p>
            </div>
            <TerminalDeploy />
          </section>

          {/* Variant C: Floating Code Cards */}
          <section className="mb-20">
            <div className="mb-8 pb-4 border-b border-border/50">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-violet-500/10 text-violet-400 text-sm font-medium mb-3">
                Variant C
              </span>
              <h2 className="text-2xl font-semibold text-foreground">Floating Code Cards</h2>
              <p className="text-muted-foreground mt-2">
                3D perspective cards showing generated files. Hover for interaction.
              </p>
            </div>
            <FloatingCodeCards />
          </section>

          {/* Variant D: Agent Code Stream */}
          <section className="mb-20">
            <div className="mb-8 pb-4 border-b border-border/50">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-violet-500/10 text-violet-400 text-sm font-medium mb-3">
                Variant D
              </span>
              <h2 className="text-2xl font-semibold text-foreground">Agent Code Stream</h2>
              <p className="text-muted-foreground mt-2">
                Shows the AI agent working alongside real-time code generation.
              </p>
            </div>
            <AgentCodeStream />
          </section>
        </div>

        {/* ORIGINAL VARIANTS */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-12">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
            <span className="px-4 py-2 rounded-full bg-muted/50 border border-border/50 text-muted-foreground text-sm font-medium">
              Original Variants
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>

          {/* Variant 1: Deployment Pipeline */}
          <section className="mb-20">
            <div className="mb-8 pb-4 border-b border-border/50">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-sm font-medium mb-3">
                Variant 1
              </span>
              <h2 className="text-2xl font-semibold text-foreground">Deployment Pipeline</h2>
              <p className="text-muted-foreground mt-2">
                Visual pipeline: Code → Tests → Build → Deploy
              </p>
            </div>
            <div className="p-6 sm:p-8 rounded-xl bg-card/30 border border-border/30">
              <DeploymentPipeline />
            </div>
          </section>

          {/* Variant 2: Git Activity Feed */}
          <section className="mb-20">
            <div className="mb-8 pb-4 border-b border-border/50">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-purple-500/10 text-purple-500 text-sm font-medium mb-3">
                Variant 2
              </span>
              <h2 className="text-2xl font-semibold text-foreground">Git Activity Feed</h2>
              <p className="text-muted-foreground mt-2">
                Timeline of commits generated by ProductOS
              </p>
            </div>
            <div className="p-6 sm:p-8 rounded-xl bg-card/30 border border-border/30">
              <GitActivityFeed />
            </div>
          </section>

          {/* Variant 3: Code Quality Scorecard */}
          <section className="mb-20">
            <div className="mb-8 pb-4 border-b border-border/50">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-sm font-medium mb-3">
                Variant 3
              </span>
              <h2 className="text-2xl font-semibold text-foreground">Code Quality Scorecard</h2>
              <p className="text-muted-foreground mt-2">
                Build metrics and quality indicators
              </p>
            </div>
            <div className="p-6 sm:p-8 rounded-xl bg-card/30 border border-border/30">
              <CodeQualityScorecard />
            </div>
          </section>

          {/* Variant 4: Split Preview */}
          <section className="mb-20">
            <div className="mb-8 pb-4 border-b border-border/50">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-sm font-medium mb-3">
                Variant 4
              </span>
              <h2 className="text-2xl font-semibold text-foreground">Code + Live Preview</h2>
              <p className="text-muted-foreground mt-2">
                Side-by-side code and rendered output
              </p>
            </div>
            <div className="p-6 sm:p-8 rounded-xl bg-card/30 border border-border/30">
              <SplitPreview />
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="text-center py-8 border-t border-border/50">
          <p className="text-sm text-muted-foreground">
            Internal test page — pick the best variant for the homepage
          </p>
        </div>
      </div>
    </main>
  )
}
