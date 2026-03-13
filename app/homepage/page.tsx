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

// Company logos for social proof - SVG paths for real brand logos
const companies = [
  { 
    name: "Vercel", 
    logo: (
      <svg className="h-5 w-auto" viewBox="0 0 76 65" fill="currentColor">
        <path d="M37.5274 0L75.0548 65H0L37.5274 0Z"/>
      </svg>
    )
  },
  { 
    name: "OpenAI", 
    logo: (
      <svg className="h-5 w-auto" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.8956zm16.5963 3.8558L13.1038 8.364l2.0201-1.1638a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.4046-.6813zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/>
      </svg>
    )
  },
  { 
    name: "Coinbase", 
    logo: (
      <svg className="h-5 w-auto" viewBox="0 0 100 100" fill="currentColor">
        <path d="M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm0 78c-15.5 0-28-12.5-28-28s12.5-28 28-28c13 0 24 8.8 27.2 21H61.5c-2.5-5.5-8-9-14.5-9-8.8 0-16 7.2-16 16s7.2 16 16 16c6.5 0 12-3.5 14.5-9h15.7c-3.2 12.2-14.2 21-27.2 21z"/>
      </svg>
    )
  },
  { 
    name: "Stripe", 
    logo: (
      <svg className="h-5 w-auto" viewBox="0 0 60 25" fill="currentColor">
        <path d="M59.64 14.28h-8.06c.19 1.93 1.6 2.55 3.2 2.55 1.64 0 2.96-.37 4.05-.95v3.32a8.33 8.33 0 0 1-4.56 1.1c-4.01 0-6.83-2.5-6.83-7.48 0-4.19 2.39-7.52 6.3-7.52 3.92 0 5.96 3.28 5.96 7.5 0 .4-.02.96-.06 1.48zm-5.92-5.62c-1.03 0-2.17.73-2.17 2.58h4.25c0-1.85-1.07-2.58-2.08-2.58zM40.95 20.3c-1.44 0-2.32-.6-2.9-1.04l-.02 4.63-4.12.87V5.57h3.76l.08 1.02a4.7 4.7 0 0 1 3.23-1.29c2.9 0 5.62 2.6 5.62 7.4 0 5.23-2.7 7.6-5.65 7.6zM40 8.95c-.95 0-1.54.34-1.97.81l.02 6.12c.4.44.98.78 1.95.78 1.52 0 2.54-1.65 2.54-3.87 0-2.15-1.04-3.84-2.54-3.84zM28.24 5.57h4.13v14.44h-4.13V5.57zm0-5.13L32.37 0v3.77l-4.13.88V.44zm-4.32 9.35v10.22H19.8V5.57h3.7l.12 1.22c1-1.77 3.07-1.41 3.62-1.22v3.79c-.52-.17-2.29-.43-3.32.43zm-8.55 4.72c0 2.43 2.6 1.68 3.12 1.46v3.36c-.55.3-1.54.54-2.89.54a4.15 4.15 0 0 1-4.27-4.24l.01-13.17 4.02-.86v3.54h3.14V9.1h-3.13v5.41zm-4.91.7c0 3.05-2.84 5.22-6.14 5.22-2.47 0-4.74-.86-5.74-1.97l1.52-2.93c1.38 1.08 3.44 1.66 4.7 1.66.96 0 1.47-.32 1.47-.81 0-1.6-7.06-.67-7.06-5.52 0-3.05 2.58-5.17 5.9-5.17 2.14 0 4.04.64 5.33 1.67l-1.6 2.88c-1.18-.82-3-1.3-4.02-1.3-.9 0-1.4.31-1.4.76 0 1.5 7.04.54 7.04 5.51z"/>
      </svg>
    )
  },
  { 
    name: "Linear", 
    logo: (
      <svg className="h-5 w-auto" viewBox="0 0 100 100" fill="currentColor">
        <path d="M1.22 61.5a2.4 2.4 0 0 1-.03-3.4L59.61.69a2.4 2.4 0 0 1 3.44.04l36.22 37.84a2.4 2.4 0 0 1 .03 3.4L40.88 99.4a2.4 2.4 0 0 1-3.44-.04L1.22 61.52zM19.7 51.08 48.88 80.8l31.32-30.72L51 19.36 19.7 51.08z"/>
      </svg>
    )
  },
  { 
    name: "Notion", 
    logo: (
      <svg className="h-5 w-auto" viewBox="0 0 100 100" fill="currentColor">
        <path d="M6.017 4.313l55.333-4.087c6.797-.583 8.543-.19 12.817 2.917l17.663 12.443c2.913 2.14 3.883 2.723 3.883 5.053v68.243c0 4.277-1.553 6.807-6.99 7.193L24.467 99.967c-4.08.193-6.023-.39-8.16-3.113L3.3 79.94c-2.333-3.113-3.3-5.443-3.3-8.167V11.113c0-3.497 1.553-6.413 6.017-6.8z"/>
        <path fill="var(--background, white)" d="M61.35 15.813L25.403 18.49c-3.107.193-3.883.583-5.633 1.943L8.897 29.403c-.777.583-.583 1.167.583 1.167l37.107-2.333c3.107-.193 4.857.39 4.857 2.917v49.5c0 1.167.39 1.75 1.167 1.557 1.167-.193 2.14-.39 3.5-.97l2.527-1.363c1.167-.583 1.553-1.363 1.553-3.113V25.173c0-3.107.39-4.857-1.553-6.417l-4.083-2.943z"/>
        <path fill="var(--background, white)" d="M22.103 34.063V88.3c0 2.917 1.553 4.083 4.857 3.887l48.013-2.917c3.303-.193 3.883-1.943 3.883-4.47V35.037c0-2.527-.777-3.887-3.107-3.693l-50.153 3.107c-2.527.193-3.493 1.167-3.493 3.612z"/>
      </svg>
    )
  },
  { 
    name: "Figma", 
    logo: (
      <svg className="h-5 w-auto" viewBox="0 0 38 57" fill="currentColor">
        <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z"/>
        <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z"/>
        <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z"/>
        <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z"/>
        <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z"/>
      </svg>
    )
  },
  { 
    name: "Ramp", 
    logo: (
      <svg className="h-5 w-auto" viewBox="0 0 80 24" fill="currentColor">
        <path d="M10.5 0L0 24h6l1.8-4.5h9L15 24h6L10.5 0zm0 8.5l2.5 6h-5l2.5-6zM32 6c-5 0-9 4-9 9s4 9 9 9 9-4 9-9-4-9-9-9zm0 13c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4zM56 6c-2.5 0-4.5 1-6 2.5V6h-5v18h5v-9c0-2.2 1.8-4 4-4s4 1.8 4 4v9h5v-9c0-5-3-9-7-9zm19 0c-2.5 0-4.5 1-6 2.5V6h-5v18h5v-9c0-2.2 1.8-4 4-4s4 1.8 4 4v9h5v-9c0-5-3-9-7-9z"/>
      </svg>
    )
  },
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
                The product development
              </span>
              <span 
                className="block text-4xl sm:text-5xl lg:text-[64px] font-medium text-foreground/40"
                style={{ lineHeight: 1, letterSpacing: '-0.022em' }}
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
      <section className="py-16 border-y border-border/30">
        <div className="max-w-[1436px] mx-auto px-6 lg:px-[50px]">
          <p className="text-center text-sm text-muted-foreground mb-8">
            Trusted by founders and teams from
          </p>
          <div className="flex items-center justify-center gap-10 sm:gap-12 lg:gap-16 flex-wrap">
            {companies.map((company) => (
              <div 
                key={company.name} 
                className="text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors flex items-center gap-2"
                title={company.name}
              >
                {company.logo}
                <span className="text-sm font-medium hidden sm:inline">{company.name}</span>
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
              A new way to build products
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-medium max-w-4xl mb-16" style={{ lineHeight: 1, letterSpacing: '-0.022em' }}>
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
        <div className="max-w-[1436px] mx-auto px-6 lg:px-[50px]">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <p className="text-sm font-medium text-amber-500 mb-4 uppercase tracking-wider">
                AI-Powered Workflow
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-medium mb-6" style={{ lineHeight: 1, letterSpacing: '-0.022em' }}>
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
                End-to-end Visibility
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-medium mb-6" style={{ lineHeight: 1, letterSpacing: '-0.022em' }}>
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
        <div className="max-w-[1436px] mx-auto px-6 lg:px-[50px]">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <p className="text-sm font-medium text-emerald-400 mb-4 uppercase tracking-wider">
                Production Ready
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-medium mb-6" style={{ lineHeight: 1, letterSpacing: '-0.022em' }}>
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
        <div className="max-w-[1436px] mx-auto px-6 lg:px-[50px]">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-medium mb-4" style={{ lineHeight: 1, letterSpacing: '-0.022em' }}>
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
        <div className="max-w-[1436px] mx-auto px-6 lg:px-[50px]">
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
        <div className="max-w-[1436px] mx-auto px-6 lg:px-[50px]">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-medium mb-6" style={{ lineHeight: 1, letterSpacing: '-0.022em' }}>
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
