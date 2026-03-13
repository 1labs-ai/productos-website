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
import { WorkflowNodesIcon, GrowthGraphIcon, NetworkHubIcon } from "@/components/animated-icons"

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
          {/* Main Headline - Left Aligned like Linear */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 dark:border-white/10 bg-card/50 dark:bg-white/[0.03] mb-6">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-sm text-foreground/80 dark:text-white/70">AI-Native Product Development Platform</span>
            </div>
            
            <h1 className="mb-8">
              <span 
                className="block text-4xl sm:text-5xl lg:text-[64px] font-medium text-foreground"
                style={{ lineHeight: 1, letterSpacing: '-0.022em' }}
              >
                From idea to production
              </span>
              <span 
                className="block text-4xl sm:text-5xl lg:text-[64px] font-medium text-foreground/40"
                style={{ lineHeight: 1, letterSpacing: '-0.022em' }}
              >
                in days, not months
              </span>
            </h1>

            {/* CTAs - Left aligned */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex flex-col sm:flex-row items-start gap-3"
            >
              <Button
                size="lg"
                className="bg-foreground text-background hover:bg-foreground/90 rounded-md px-6 h-11 text-sm font-medium"
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
                className="rounded-md px-6 h-11 text-sm font-medium border-border/60 hover:bg-card"
                asChild
              >
                <Link href="#features">
                  See How It Works
                </Link>
              </Button>
            </motion.div>
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
                  className="h-5 w-auto object-contain brightness-0 invert opacity-80"
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
                
                {/* Animated illustration */}
                <WorkflowNodesIcon className="mb-6 relative z-10" />
                
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
                
                {/* Animated illustration */}
                <GrowthGraphIcon className="mb-6 relative z-10" />
                
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
                
                {/* Animated illustration */}
                <NetworkHubIcon className="mb-6 relative z-10" />
                
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

      {/* Feature Section 1 - Self-driving operations */}
      <section id="features" className="py-24 bg-card/30">
        <div className="max-w-[1436px] mx-auto px-6 lg:px-[50px]">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <p className="text-sm font-medium text-amber-500 mb-4 uppercase tracking-wider">
                Describe it. Build it.
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-medium mb-6" style={{ lineHeight: 1, letterSpacing: '-0.022em' }}>
                Talk to ProductOS<br />
                <span className="text-muted-foreground">like a co-founder</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Describe your product idea in plain language. ProductOS researches the market, 
                writes your PRD, generates UI designs, and ships production code — automatically.
              </p>
              <Button variant="ghost" className="text-foreground hover:text-foreground p-0 h-auto font-medium">
                Learn more <ArrowRight className="ml-2 size-4" />
              </Button>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              {/* Agent conversation mockup */}
              <div className="rounded-xl border border-border/50 bg-card p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-xs font-bold text-white">
                    H
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium mb-1">You</div>
                    <div className="p-3 rounded-lg bg-muted/50 text-sm text-foreground/80">
                      Build me an analytics dashboard for tracking user engagement metrics
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center">
                    <Search className="size-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-sky-400 mb-1">Research Agent</div>
                    <div className="p-3 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sm text-foreground/80">
                      <p className="mb-2">Analyzing market: Found 12 competitors including Mixpanel, Amplitude...</p>
                      <div className="flex items-center gap-2 text-xs text-sky-400">
                        <Check className="size-3" /> Research complete • Opportunity score: 8.4/10
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center">
                    <FileText className="size-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-teal-400 mb-1">PRD Agent</div>
                    <div className="p-3 rounded-lg bg-teal-500/10 border border-teal-500/20 text-sm text-foreground/80">
                      <p className="mb-2">Generated PRD with 8 user stories and success metrics...</p>
                      <div className="flex items-center gap-2 text-xs text-teal-400">
                        <Clock className="size-3" /> Estimated build time: 5 days
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Feature Section 2 - Define product direction */}
      <section className="py-24">
        <div className="max-w-[1436px] mx-auto px-6 lg:px-[50px]">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection delay={0.2} className="order-2 lg:order-1">
              {/* Timeline/Roadmap mockup */}
              <div className="rounded-xl border border-border/50 bg-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="font-semibold">Project Timeline</h4>
                  <span className="text-xs text-muted-foreground">Day 1 → Day 7</span>
                </div>
                
                <div className="space-y-4">
                  {[
                    { stage: "Ideate", color: "sky", days: "Day 1", status: "complete" },
                    { stage: "Discover", color: "violet", days: "Day 1-2", status: "complete" },
                    { stage: "Define", color: "teal", days: "Day 2-3", status: "complete" },
                    { stage: "Design", color: "purple", days: "Day 3-5", status: "active" },
                    { stage: "Develop", color: "amber", days: "Day 5-7", status: "pending" },
                  ].map((item) => (
                    <div key={item.stage} className="flex items-center gap-4">
                      <div className={cn(
                        "w-24 text-xs font-medium",
                        item.status === "active" ? `text-${item.color}-400` : "text-muted-foreground"
                      )}>
                        {item.days}
                      </div>
                      <div className={cn(
                        "flex-1 h-8 rounded-md flex items-center px-3 text-sm font-medium",
                        item.status === "complete" && "bg-muted/50 text-foreground/60",
                        item.status === "active" && `bg-${item.color}-500/10 text-${item.color}-400 border border-${item.color}-500/20`,
                        item.status === "pending" && "bg-muted/30 text-muted-foreground/50"
                      )}>
                        {item.stage}
                        {item.status === "complete" && <Check className="size-3.5 ml-auto" />}
                        {item.status === "active" && <span className="ml-auto text-xs">In Progress</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection className="order-1 lg:order-2">
              <p className="text-sm font-medium text-purple-400 mb-4 uppercase tracking-wider">
                Five stages. Zero chaos.
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-medium mb-6" style={{ lineHeight: 1, letterSpacing: '-0.022em' }}>
                Watch your product<br />
                <span className="text-muted-foreground">come to life</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Follow every stage: Ideate → Discover → Define → Design → Develop. 
                See exactly where your project stands and when it ships.
              </p>
              <Button variant="ghost" className="text-foreground hover:text-foreground p-0 h-auto font-medium">
                Learn more <ArrowRight className="ml-2 size-4" />
              </Button>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Feature Section 3 - Deploy anywhere */}
      <section className="py-24 bg-card/30">
        <div className="max-w-[1436px] mx-auto px-6 lg:px-[50px]">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <p className="text-sm font-medium text-emerald-400 mb-4 uppercase tracking-wider">
                Real code. Real products.
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-medium mb-6" style={{ lineHeight: 1, letterSpacing: '-0.022em' }}>
                Production-ready<br />
                <span className="text-muted-foreground">from day one</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                No prototypes. No throwaway code. ProductOS generates tested, deployable code 
                that goes straight to Vercel, Netlify, or your own infrastructure.
              </p>
              <Button variant="ghost" className="text-foreground hover:text-foreground p-0 h-auto font-medium">
                Learn more <ArrowRight className="ml-2 size-4" />
              </Button>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              {/* Code/Deploy mockup */}
              <div className="rounded-xl border border-border/50 bg-card overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-2 bg-muted/40 border-b border-border/50">
                  <GitBranch className="size-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">main</span>
                  <span className="ml-auto px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium">
                    ✓ All checks passed
                  </span>
                </div>
                <div className="p-4 font-mono text-sm">
                  <pre className="text-muted-foreground">
{`// Generated by ProductOS Code Agent
export async function Dashboard() {
  const metrics = await getMetrics()
  
  return (
    <div className="grid gap-4">
      <StatsCard data={metrics.users} />
      <EngagementChart data={metrics.events} />
      <ActivityFeed items={metrics.recent} />
    </div>
  )
}`}
                  </pre>
                </div>
                <div className="px-4 py-3 bg-muted/20 border-t border-border/50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">24 tests passing</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">TypeScript</span>
                  </div>
                  <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white h-7 text-xs">
                    <Rocket className="size-3 mr-1" /> Deploy to Vercel
                  </Button>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24">
        <div className="max-w-[1436px] mx-auto px-6 lg:px-[50px]">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-medium mb-4" style={{ lineHeight: 1, letterSpacing: '-0.022em' }}>
              The numbers speak.<br />
              <span className="text-muted-foreground">ProductOS delivers.</span>
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { value: "3-12", label: "Days to ship", suffix: "days" },
              { value: "80", label: "Less development cost", suffix: "%" },
              { value: "5", label: "AI agents working together", suffix: "" },
              { value: "∞", label: "Ideas you can build", suffix: "" },
            ].map((stat, i) => (
              <AnimatedSection key={stat.label} delay={i * 0.1}>
                <div className="text-center p-6 rounded-xl bg-card/50 border border-border/30">
                  <div className="text-4xl sm:text-5xl font-bold text-foreground mb-2">
                    {stat.value}<span className="text-2xl text-muted-foreground">{stat.suffix}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-card/30">
        <div className="max-w-[1436px] mx-auto px-6 lg:px-[50px]">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ letterSpacing: '-0.02em' }}>
              Founders shipping faster
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                quote: "I went from idea to live product in 6 days. ProductOS handled research, PRD, designs, and code. I just guided it.",
                author: "Sarah Chen",
                role: "Founder, DataFlow",
                avatar: "S"
              },
              {
                quote: "It's like having a product team on demand. The agents actually build on each other's work — research informs the PRD, PRD shapes the design.",
                author: "Marcus Johnson",
                role: "Solo Founder",
                avatar: "M"
              }
            ].map((testimonial, i) => (
              <AnimatedSection key={testimonial.author} delay={i * 0.1}>
                <div className="p-8 rounded-xl bg-card border border-border/50">
                  <blockquote className="text-lg text-foreground/90 mb-6 leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-muted to-muted-foreground/20 flex items-center justify-center font-semibold text-foreground/60">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{testimonial.author}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

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
