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

// Company logos for social proof
const companies = [
  { name: "Microsoft", logo: "M" },
  { name: "Google", logo: "G" },
  { name: "Meta", logo: "f" },
  { name: "OpenAI", logo: "◐" },
  { name: "Stripe", logo: "S" },
  { name: "Vercel", logo: "▲" },
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
        {/* GRADIENT GLOW BACKGROUND - Linear style, covers full section */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 50% 100%, rgba(124, 58, 237, 0.25) 0%, transparent 50%),
              radial-gradient(ellipse 60% 50% at 70% 90%, rgba(99, 102, 241, 0.2) 0%, transparent 40%),
              radial-gradient(ellipse 60% 50% at 30% 90%, rgba(168, 85, 247, 0.2) 0%, transparent 40%)
            `
          }}
        />
        
        {/* Content container with Linear-style spacing */}
        <div className="relative z-10 max-w-[1280px] mx-auto px-8 sm:px-12 lg:px-20">
          {/* Main Headline - Left Aligned like Linear */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <h1 className="mb-8">
              <span 
                className="block text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-bold text-foreground"
                style={{ lineHeight: 1.08, letterSpacing: '-0.03em' }}
              >
                The product development
              </span>
              <span 
                className="block text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-bold text-foreground/40"
                style={{ lineHeight: 1.08, letterSpacing: '-0.03em' }}
              >
                system for founders and agents
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

          {/* Product Dashboard UI */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            
            {/* Dashboard container - Theme aware */}
            <div 
              className="relative rounded-xl overflow-hidden border border-border/50 dark:border-white/[0.08] bg-card dark:bg-[#0a0a0b]"
              style={{
                boxShadow: `
                  0 0 0 1px rgba(0, 0, 0, 0.03),
                  0 25px 50px -12px rgba(0, 0, 0, 0.25),
                  0 50px 100px -20px rgba(0, 0, 0, 0.2)
                `
              }}
            >
              {/* Dashboard UI built with HTML/CSS - Theme aware */}
              <div className="flex h-[450px] sm:h-[500px] lg:h-[520px]">
                {/* Sidebar - Theme aware */}
                <div className="w-56 lg:w-64 border-r border-border/50 dark:border-white/[0.06] bg-muted/30 dark:bg-[#0f0f10] flex-shrink-0 hidden sm:flex flex-col">
                  {/* Logo */}
                  <div className="p-4 border-b border-border/50 dark:border-white/[0.06]">
                    <div className="flex items-center gap-2.5">
                      <svg viewBox="0 0 36 36" fill="none" className="w-7 h-7">
                        <path d="M4 32 L18 4 L32 32 Z" className="fill-foreground/80 dark:fill-[#E5E5E5]"/>
                        <path d="M18 4 L4 32 L18 32 Z" className="fill-foreground/60 dark:fill-[#B3B3B3]"/>
                        <path d="M18 4 L18 32 L32 4 Z" className="fill-foreground/40 dark:fill-[#808080]"/>
                      </svg>
                      <div>
                        <div className="font-semibold text-sm text-foreground dark:text-white">ProductOS</div>
                        <div className="text-[10px] text-muted-foreground dark:text-white/40">Workspace</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Create button */}
                  <div className="p-3">
                    <div className="flex items-center gap-2">
                      <button className="flex-1 h-9 rounded-lg bg-foreground dark:bg-white text-background dark:text-black text-sm font-medium">
                        Create New
                      </button>
                      <button className="h-9 w-9 rounded-lg border border-border dark:border-white/10 flex items-center justify-center">
                        <Search className="w-4 h-4 text-muted-foreground dark:text-white/50" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Stages */}
                  <div className="px-3 py-2">
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground/70 dark:text-white/30 font-medium mb-2 px-2">Stages</div>
                    <nav className="space-y-0.5">
                      {[
                        { name: "Ideate", icon: Lightbulb, color: "text-sky-500 dark:text-sky-400" },
                        { name: "Discover", icon: Search, color: "text-violet-500 dark:text-violet-400" },
                        { name: "Define", icon: FileText, color: "text-teal-500 dark:text-teal-400" },
                        { name: "Design", icon: Palette, color: "text-purple-500 dark:text-purple-400" },
                        { name: "Develop", icon: Code, color: "text-amber-500 dark:text-amber-400" },
                      ].map((stage) => (
                        <div 
                          key={stage.name}
                          className="flex items-center gap-3 px-2 py-2 rounded-md text-sm text-foreground/70 dark:text-white/60 hover:bg-muted dark:hover:bg-white/[0.04] transition-colors"
                        >
                          <stage.icon className={`w-4 h-4 ${stage.color}`} />
                          <span>{stage.name}</span>
                        </div>
                      ))}
                    </nav>
                  </div>
                  
                  {/* Theme toggle */}
                  <div className="mt-auto p-3 border-t border-border/50 dark:border-white/[0.06]">
                    <div className="flex items-center justify-between px-2 mb-3">
                      <span className="text-xs text-muted-foreground dark:text-white/40">Theme</span>
                      <div className="flex items-center gap-1 p-1 rounded-full bg-muted dark:bg-white/[0.04]">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center text-muted-foreground dark:text-white/30 dark:hidden bg-background shadow-sm">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd"/></svg>
                        </div>
                        <div className="hidden dark:flex w-5 h-5 rounded-full items-center justify-center text-white/30">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd"/></svg>
                        </div>
                        <div className="w-5 h-5 rounded-full flex items-center justify-center text-muted-foreground dark:text-white/30">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.321A1 1 0 0113 17H7a1 1 0 01-.293-1.956l.804-.32.122-.49H5a2 2 0 01-2-2V5zm14 0H3v8h14V5z" clipRule="evenodd"/></svg>
                        </div>
                        <div className="hidden dark:flex w-5 h-5 rounded-full bg-white/10 items-center justify-center text-white">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/></svg>
                        </div>
                      </div>
                    </div>
                    
                    {/* Credits */}
                    <div className="px-2 py-2 rounded-lg bg-muted/50 dark:bg-white/[0.02] border border-border/50 dark:border-white/[0.04]">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] uppercase tracking-wider text-muted-foreground/70 dark:text-white/30 font-medium">Credits</span>
                        <span className="text-sm font-semibold text-foreground dark:text-white">50</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-muted dark:bg-white/[0.06] overflow-hidden">
                        <div className="h-full w-1/2 rounded-full bg-gradient-to-r from-sky-500 to-violet-500" />
                      </div>
                    </div>
                    
                    {/* User */}
                    <div className="flex items-center gap-2.5 mt-3 px-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-xs font-bold text-white">
                        A
                      </div>
                      <div>
                        <div className="text-sm text-foreground dark:text-white font-medium">Ariv</div>
                        <div className="text-[10px] text-muted-foreground dark:text-white/40">ariv@1labs.ai</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Main content - Theme aware */}
                <div className="flex-1 flex flex-col bg-background dark:bg-[#0a0a0b]">
                  {/* Top bar */}
                  <div className="flex items-center justify-between px-6 py-3 border-b border-border/50 dark:border-white/[0.06]">
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-medium text-foreground dark:text-white">Dashboard</span>
                      <span className="text-xs text-muted-foreground dark:text-white/40">3 active projects</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-500 text-xs">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span>AI Active</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content area */}
                  <div className="flex-1 p-6 lg:p-8 overflow-hidden">
                    {/* Recent Projects Grid */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-medium text-foreground dark:text-white/80">Recent Projects</h3>
                        <button className="text-xs text-muted-foreground dark:text-white/40 hover:text-foreground dark:hover:text-white/60">View all</button>
                      </div>
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                        {[
                          { name: "Analytics Dashboard", stage: "Design", color: "purple", progress: 65 },
                          { name: "Mobile App Redesign", stage: "Develop", color: "amber", progress: 40 },
                          { name: "AI Chat Widget", stage: "Define", color: "teal", progress: 85 },
                        ].map((project) => (
                          <div 
                            key={project.name}
                            className="p-3 rounded-lg border border-border/50 dark:border-white/[0.06] bg-muted/20 dark:bg-white/[0.02] hover:bg-muted/40 dark:hover:bg-white/[0.04] transition-colors"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-foreground dark:text-white/90">{project.name}</span>
                              <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                                project.color === 'purple' ? 'bg-purple-500/10 text-purple-400' :
                                project.color === 'amber' ? 'bg-amber-500/10 text-amber-400' :
                                'bg-teal-500/10 text-teal-400'
                              }`}>{project.stage}</span>
                            </div>
                            <div className="h-1 rounded-full bg-muted dark:bg-white/[0.06] overflow-hidden">
                              <div 
                                className={`h-full rounded-full ${
                                  project.color === 'purple' ? 'bg-purple-500' :
                                  project.color === 'amber' ? 'bg-amber-500' :
                                  'bg-teal-500'
                                }`}
                                style={{ width: `${project.progress}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* New Project Input */}
                    <div className="rounded-xl border border-border dark:border-white/10 bg-muted/30 dark:bg-white/[0.02] p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <Sparkles className="w-5 h-5 text-violet-400" />
                        <h2 className="text-lg font-semibold text-foreground dark:text-white">Start a new project</h2>
                      </div>
                      <div className="text-muted-foreground/60 dark:text-white/40 text-sm mb-10">Describe your product idea and AI agents will help you build it...</div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-muted dark:hover:bg-white/[0.05] text-muted-foreground dark:text-white/50 text-sm">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Claude Sonnet 4.6</span>
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                          </button>
                        </div>
                        <button className="px-4 py-2 rounded-lg bg-foreground dark:bg-white text-background dark:text-black text-sm font-medium flex items-center gap-2 hover:opacity-90 transition-opacity">
                          Send
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Logo Cloud */}
      <section className="py-16 border-y border-border/30">
        <div className="max-w-[1280px] mx-auto px-8 sm:px-12 lg:px-20">
          <p className="text-center text-sm text-muted-foreground mb-8">
            Trusted by founders and teams from
          </p>
          <div className="flex items-center justify-center gap-12 sm:gap-16 flex-wrap">
            {companies.map((company) => (
              <div 
                key={company.name} 
                className="text-2xl font-bold text-muted-foreground/40 hover:text-muted-foreground/60 transition-colors"
              >
                {company.logo}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Props - Linear style */}
      <section className="py-24">
        <div className="max-w-[1280px] mx-auto px-8 sm:px-12 lg:px-20">
          <AnimatedSection>
            <p className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">
              A new way to build products
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold max-w-4xl mb-16" style={{ letterSpacing: '-0.02em' }}>
              <span className="text-foreground">Purpose-built for the AI era.</span>{" "}
              <span className="text-muted-foreground">
                Five specialized agents work together to take you from idea to production.
              </span>
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "Built for AI workflows",
                description: "Designed for humans and agents to work together. Context flows seamlessly between stages."
              },
              {
                icon: Zap,
                title: "10x faster shipping",
                description: "What used to take months now takes days. Ship production-ready products in 3-12 days."
              },
              {
                icon: Users,
                title: "Made for founders",
                description: "No dev team required. Solo founders and small teams can build like a full product org."
              }
            ].map((prop, i) => (
              <AnimatedSection key={prop.title} delay={i * 0.1}>
                <div className="p-6 rounded-xl bg-card/50 border border-border/30 hover:border-border/60 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center mb-4">
                    <prop.icon className="size-5 text-foreground/60" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{prop.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{prop.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Section 1 - Self-driving operations */}
      <section id="features" className="py-24 bg-card/30">
        <div className="max-w-[1280px] mx-auto px-8 sm:px-12 lg:px-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <p className="text-sm font-medium text-amber-500 mb-4 uppercase tracking-wider">
                AI-Powered Workflow
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6" style={{ letterSpacing: '-0.02em' }}>
                Make product development<br />
                <span className="text-muted-foreground">self-driving</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Turn conversations into products. AI agents analyze your input, conduct research, 
                write documentation, generate designs, and ship production code — all automatically.
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
        <div className="max-w-[1280px] mx-auto px-8 sm:px-12 lg:px-20">
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
                End-to-end Visibility
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6" style={{ letterSpacing: '-0.02em' }}>
                Define the<br />
                <span className="text-muted-foreground">product direction</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Track progress across all five stages. Know exactly where your product stands, 
                what's being worked on, and when you'll ship.
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
        <div className="max-w-[1280px] mx-auto px-8 sm:px-12 lg:px-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <p className="text-sm font-medium text-emerald-400 mb-4 uppercase tracking-wider">
                Production Ready
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6" style={{ letterSpacing: '-0.02em' }}>
                Ship production code,<br />
                <span className="text-muted-foreground">not prototypes</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Every project ships with real code, real tests, and real deployments. 
                Push to Vercel, Netlify, or your own infrastructure with one click.
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
        <div className="max-w-[1280px] mx-auto px-8 sm:px-12 lg:px-20">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4" style={{ letterSpacing: '-0.02em' }}>
              Built for speed.<br />
              <span className="text-muted-foreground">Measured in days, not months.</span>
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
        <div className="max-w-[1280px] mx-auto px-8 sm:px-12 lg:px-20">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ letterSpacing: '-0.02em' }}>
              What founders are saying
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                quote: "ProductOS let me ship my MVP in 5 days instead of 3 months. The AI agents actually understand product context.",
                author: "Sarah Chen",
                role: "Founder, DataFlow",
                avatar: "S"
              },
              {
                quote: "Finally, a tool that thinks like a product team. From research to code, everything stays connected.",
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
        <div className="max-w-[1280px] mx-auto px-8 sm:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6" style={{ letterSpacing: '-0.02em' }}>
              <span className="text-foreground">Built for the future.</span><br />
              <span className="text-muted-foreground">Available today.</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              Join the founders shipping products 10x faster with AI-native workflows.
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
