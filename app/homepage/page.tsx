"use client"

import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { 
  ArrowRight, 
  Sparkles, 
  Lightbulb, 
  Search, 
  FileText, 
  Palette, 
  Code,
  Check,
  Zap,
  Brain,
  Rocket,
  GitBranch,
  Users,
  Clock
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { InteractiveDashboard } from "@/components/homepage/interactive-dashboard"
import { ProductOSDashboard } from "@/components/homepage/productos-dashboard"
import { AgentWorkflowDemo } from "@/components/homepage/agent-workflow-demo"
import { ProjectStatusDashboard } from "@/components/homepage/project-status-dashboard"
import { WorkflowNodesIcon, GrowthGraphIcon, NetworkHubIcon } from "@/components/animated-icons"
import { IsometricAgentsVisual } from "@/components/isometric-agents-visual"
import { LayeredCubeIllustration } from "@/components/linear-illustrations"
import { AgentFigure } from "@/components/homepage/agent-figure"
import { ShipSpeed } from "@/components/homepage/ship-speed"
import { CursorStyleIDE } from "@/components/sections/production-ready/variants/cursor-style-ide"
import { AnimatedStats } from "@/components/homepage/animated-stats"
import { TestimonialsFlow } from "@/components/homepage/testimonials-flow"

// Section animation wrapper
function AnimatedSection({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Company logos for social proof - 8 logos, all white, Linear-style
const companies = [
  { name: "Google", logo: "/logos/google.svg" },
  { name: "Microsoft", logo: "/logos/microsoft.svg" },
  { name: "Amazon", logo: "/logos/amazon.svg" },
  { name: "Vercel", logo: "/logos/vercel.svg" },
  { name: "OpenAI", logo: "/logos/openai.svg" },
  { name: "Stripe", logo: "/logos/stripe.svg" },
  { name: "Coinbase", logo: "/logos/coinbase.svg" },
  { name: "Airbnb", logo: "/logos/airbnb.svg" },
]

export default function LinearInspiredHomepage() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100])

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section - Linear Style */}
      <section ref={heroRef} className="relative pt-28 sm:pt-32 pb-24">
        {/* GRADIENT GLOW BACKGROUND - Subtle grey like Linear */}
        <div 
          className="absolute inset-0 pointer-events-none dark:opacity-100 opacity-50"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 50% 100%, rgba(120, 120, 120, 0.15) 0%, transparent 50%),
              radial-gradient(ellipse 60% 40% at 70% 95%, rgba(100, 100, 100, 0.1) 0%, transparent 40%),
              radial-gradient(ellipse 60% 40% at 30% 95%, rgba(140, 140, 140, 0.1) 0%, transparent 40%)
            `
          }}
        />
        
        {/* Content container with Linear-style spacing */}
        <div className="relative z-10 max-w-[1436px] mx-auto px-6 lg:px-[50px]">
          {/* Hero Content - Linear-style layout */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            {/* Badge - Simple text like Linear */}
            <div className="inline-flex items-center gap-2 mb-6">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-sm text-muted-foreground font-medium">AI-Native Product Development</span>
            </div>
            
            <h1 className="mb-6">
              <span 
                className="block text-4xl sm:text-5xl lg:text-[64px] font-medium text-foreground"
                style={{ lineHeight: 1.05, letterSpacing: '-0.022em' }}
              >
                From idea to production
              </span>
              <span 
                className="block text-4xl sm:text-5xl lg:text-[64px] font-medium text-foreground/40"
                style={{ lineHeight: 1.05, letterSpacing: '-0.022em' }}
              >
                in days, not months
              </span>
            </h1>

            {/* Paragraph + CTAs inline - Linear style */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-8">
              {/* Supporting paragraph */}
              <p className="text-lg text-muted-foreground">
                Five AI agents that research, document, design, and code your product.
              </p>

              {/* Link-style CTAs - inline on desktop */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="flex items-center gap-6 shrink-0"
              >
                <Link 
                  href="/early-access"
                  className="inline-flex items-center gap-2 text-foreground hover:text-foreground/80 font-medium transition-colors group"
                >
                  Request Early Access
                  <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link 
                  href="#features"
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground font-medium transition-colors group"
                >
                  See How It Works
                  <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Product Dashboard UI - Interactive */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <InteractiveDashboard />
          </motion.div>
        </div>
      </section>

      {/* Logo Cloud */}
      <section className="py-12 border-y border-border/30">
        <div className="max-w-[1436px] mx-auto px-6 lg:px-[50px]">
          <div className="flex items-center justify-center gap-12 sm:gap-16 md:gap-20 lg:gap-24">
            {companies.map((company) => (
              <div 
                key={company.name} 
                className="flex items-center justify-center"
                title={company.name}
              >
                <Image
                  src={company.logo}
                  alt={`${company.name} logo`}
                  width={100}
                  height={20}
                  className="h-5 w-auto object-contain opacity-60 dark:brightness-0 dark:invert dark:opacity-80"
                  style={{ maxWidth: '90px' }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Props - Linear style */}
      <section className="py-24">
        <div className="max-w-[1436px] mx-auto px-6 lg:px-[50px]">
          <AnimatedSection>
            <p className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">
              Your AI product team
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-medium max-w-4xl mb-16" style={{ lineHeight: 1, letterSpacing: '-0.022em' }}>
              <span className="text-foreground">Five agents. One workflow.</span>{" "}
              <span className="text-muted-foreground">
                Ideate, research, document, design, and code — orchestrated by AI.
              </span>
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1: Built for AI workflows */}
            <AnimatedSection delay={0}>
              <motion.div 
                className="group relative p-8 rounded-2xl bg-card/30 border border-border/20 cursor-pointer overflow-hidden"
                whileHover={{ 
                  y: -8,
                  scale: 1.02,
                }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {/* Hover glow effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-b from-foreground/[0.03] to-transparent" />
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
                </div>
                
                {/* Animated agent figure visualization */}
                <AgentFigure className="mb-4 relative z-10" />
                
                <h3 className="text-lg font-semibold text-foreground mb-3 relative z-10 group-hover:text-foreground transition-colors duration-300">Agents that collaborate</h3>
                <p className="text-muted-foreground leading-relaxed text-sm relative z-10 group-hover:text-muted-foreground/80 transition-colors duration-300">Each agent specializes in one stage. Context flows automatically from ideation to production code.</p>
                
                {/* Border glow on hover */}
                <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-foreground/10 transition-colors duration-300" />
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_30px_-5px_rgba(255,255,255,0.1)]" />
              </motion.div>
            </AnimatedSection>

            {/* Card 2: 10x faster shipping */}
            <AnimatedSection delay={0.1}>
              <motion.div 
                className="group relative p-8 rounded-2xl bg-card/30 border border-border/20 cursor-pointer overflow-hidden"
                whileHover={{ 
                  y: -8,
                  scale: 1.02,
                }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {/* Hover glow effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-b from-foreground/[0.03] to-transparent" />
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
                </div>
                
                {/* Ship speed pipeline visualization */}
                <ShipSpeed className="mb-4 relative z-10" />
                
                <h3 className="text-lg font-semibold text-foreground mb-3 relative z-10 group-hover:text-foreground transition-colors duration-300">Ship in days, not months</h3>
                <p className="text-muted-foreground leading-relaxed text-sm relative z-10 group-hover:text-muted-foreground/80 transition-colors duration-300">Go from conversation to deployed product in 3-12 days. Real code, real tests, real infrastructure.</p>
                
                {/* Border glow on hover */}
                <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-foreground/10 transition-colors duration-300" />
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_30px_-5px_rgba(255,255,255,0.1)]" />
              </motion.div>
            </AnimatedSection>

            {/* Card 3: Made for founders */}
            <AnimatedSection delay={0.2}>
              <motion.div 
                className="group relative p-8 rounded-2xl bg-card/30 border border-border/20 cursor-pointer overflow-hidden"
                whileHover={{ 
                  y: -8,
                  scale: 1.02,
                }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {/* Hover glow effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-b from-foreground/[0.03] to-transparent" />
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
                </div>
                
                {/* Linear-style layered cube illustration */}
                <LayeredCubeIllustration className="mb-4 relative z-10 h-48" />
                
                <h3 className="text-lg font-semibold text-foreground mb-3 relative z-10 group-hover:text-foreground transition-colors duration-300">Built for founders</h3>
                <p className="text-muted-foreground leading-relaxed text-sm relative z-10 group-hover:text-muted-foreground/80 transition-colors duration-300">No dev team needed. Build like you have a full product org — PM, researcher, designer, and engineers.</p>
                
                {/* Border glow on hover */}
                <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-foreground/10 transition-colors duration-300" />
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_30px_-5px_rgba(255,255,255,0.1)]" />
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Feature Section 1 - Talk to ProductOS (Linear-style layout) */}
      <section id="features" className="py-24 bg-card/30 dark:bg-transparent">
        <div className="max-w-[1436px] mx-auto px-6 lg:px-[50px]">
          {/* Top: Heading left, Text right - Linear style */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start mb-12">
            <AnimatedSection>
              <h2 className="text-3xl sm:text-4xl lg:text-[56px] font-medium" style={{ lineHeight: 1.05, letterSpacing: '-0.022em' }}>
                Talk to ProductOS<br />
                <span className="text-muted-foreground">like a co-founder</span>
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed mb-6">
                Describe your product idea in plain language. ProductOS researches the market, 
                writes your PRD, generates UI designs, and ships production code — all automatically.
              </p>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground/60">1.0</span>
                <Link href="/features" className="inline-flex items-center text-sm font-medium text-foreground hover:text-foreground/80 transition-colors">
                  See all features <ArrowRight className="ml-2 size-4" />
                </Link>
              </div>
            </AnimatedSection>
          </div>

          {/* Agent Workflow Demo - Shows agents working after user prompt */}
          <AgentWorkflowDemo />
        </div>
      </section>

      {/* Feature Section 2 - Project Status Dashboard (Linear-style layout) */}
      <section className="py-24">
        <div className="max-w-[1436px] mx-auto px-6 lg:px-[50px]">
          {/* Top: Heading left, Text + CTA right - Linear style */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start mb-12">
            <AnimatedSection>
              <p className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">
                Project Intelligence
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-[56px] font-medium" style={{ lineHeight: 1.05, letterSpacing: '-0.022em' }}>
                See what your agents<br />
                <span className="text-muted-foreground">have built</span>
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={0.1} className="lg:pt-8">
              <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed mb-6">
                Every deliverable, every insight, every line of code — tracked in real-time. 
                Know exactly what's ready and when you ship.
              </p>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground/60">2.0</span>
                <Link href="/features" className="inline-flex items-center text-sm font-medium text-foreground hover:text-foreground/80 transition-colors">
                  Learn more <ArrowRight className="ml-2 size-4" />
                </Link>
              </div>
            </AnimatedSection>
          </div>

          {/* Dashboard below - full width */}
          <ProjectStatusDashboard />
        </div>
      </section>

      {/* Feature Section 3 - Production Ready (Cursor-style IDE) */}
      <section className="py-24 bg-card/30">
        <div className="max-w-[1436px] mx-auto px-6 lg:px-[50px]">
          {/* Header - Linear style layout */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start mb-12">
            <AnimatedSection>
              <p className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">
                Real code. Real products.
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-[56px] font-medium" style={{ lineHeight: 1.05, letterSpacing: '-0.022em' }}>
                Production-ready<br />
                <span className="text-muted-foreground">from day one</span>
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={0.1} className="lg:pt-8">
              <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed mb-6">
                No prototypes. No throwaway code. ProductOS generates tested, deployable code 
                that goes straight to Vercel, Netlify, or your own infrastructure.
              </p>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground/60">3.0</span>
                <Link href="/features" className="inline-flex items-center text-sm font-medium text-foreground hover:text-foreground/80 transition-colors">
                  See the code <ArrowRight className="ml-2 size-4" />
                </Link>
              </div>
            </AnimatedSection>
          </div>

          {/* IDE below - full width */}
          <AnimatedSection delay={0.2}>
            <CursorStyleIDE />
          </AnimatedSection>
        </div>
      </section>

      {/* Stats Section - with count-up animation */}
      <AnimatedStats />

      {/* Testimonials - Flowing cards */}
      <TestimonialsFlow />

      {/* Final CTA */}
      <section className="py-32">
        <div className="max-w-[1436px] mx-auto px-6 lg:px-[50px]">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-medium mb-6" style={{ lineHeight: 1, letterSpacing: '-0.022em' }}>
              <span className="text-foreground">Your next product</span><br />
              <span className="text-muted-foreground">starts here.</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              Join founders building with ProductOS. Describe your idea, and watch five AI agents bring it to life.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-foreground text-background hover:bg-foreground/90 rounded-md px-8 h-12 text-base font-medium shadow-lg"
                asChild
              >
                <Link href="/early-access">
                  Request Early Access
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-md px-8 h-12 text-base font-medium border-border/50 hover:bg-card hover:border-border"
                asChild
              >
                <Link href="/contact">
                  Contact Sales
                </Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
        </div>
      </section>
    </main>
  )
}
