"use client";

import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  ArrowRight,
  Lightbulb,
  Search,
  FileText,
  Palette,
  Code,
  Sparkles,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  PageHero,
  SectionHeader,
  CTASection,
  StatsGrid,
} from "@/components/shared";

// Stage colors matching sticky-stages design system
const stageColors = {
  ideate: {
    bg: "bg-sky-950/50",
    border: "border-sky-800",
    text: "text-sky-400",
    icon: "text-sky-400",
    dot: "bg-sky-500",
    activeBg: "bg-sky-500/10",
  },
  discover: {
    bg: "bg-violet-950/50",
    border: "border-violet-800",
    text: "text-violet-400",
    icon: "text-violet-400",
    dot: "bg-violet-500",
    activeBg: "bg-violet-500/10",
  },
  define: {
    bg: "bg-teal-950/50",
    border: "border-teal-800",
    text: "text-teal-400",
    icon: "text-teal-400",
    dot: "bg-teal-500",
    activeBg: "bg-teal-500/10",
  },
  design: {
    bg: "bg-purple-950/50",
    border: "border-purple-800",
    text: "text-purple-400",
    icon: "text-purple-400",
    dot: "bg-purple-500",
    activeBg: "bg-purple-500/10",
  },
  develop: {
    bg: "bg-amber-950/50",
    border: "border-amber-800",
    text: "text-amber-400",
    icon: "text-amber-400",
    dot: "bg-amber-500",
    activeBg: "bg-amber-500/10",
  },
};

const agents = [
  {
    id: "ideate",
    icon: Lightbulb,
    name: "Ideation Agent",
    tagline: "Turn sparks into strategies",
    description:
      "Generate innovative ideas, refine concepts, and craft compelling positioning that resonates with your target market.",
    capabilities: [
      "AI-powered brainstorming",
      "Concept refinement",
      "Value proposition crafting",
      "Market positioning",
    ],
    demo: {
      input: '"I want to build a tool for remote teams"',
      output:
        "AsyncFlow: A context-aware communication platform that reduces meeting fatigue by 60% through intelligent async-first workflows.",
    },
  },
  {
    id: "discover",
    icon: Search,
    name: "Discovery Agent",
    tagline: "Know your market inside out",
    description:
      "Conduct deep market research, analyze competitors, and uncover opportunities that others miss.",
    capabilities: [
      "Market research in minutes",
      "Competitor deep-dives",
      "Trend detection",
      "User insight analysis",
    ],
    demo: {
      input: '"Analyze the no-code website builder market"',
      output:
        "Market size: $13.2B by 2026. Key players: Webflow, Framer. Gap: AI-native builders for non-technical founders.",
    },
  },
  {
    id: "define",
    icon: FileText,
    name: "Define Agent",
    tagline: "From vision to specification",
    description:
      "Create comprehensive PRDs, user stories, and technical requirements that your team can actually build from.",
    capabilities: [
      "PRD generation",
      "User story creation",
      "Roadmap planning",
      "Technical specifications",
    ],
    demo: {
      input: '"Create a PRD for task management"',
      output:
        "PRD: Smart Task Prioritization — AI-ranked queue, context-aware deadlines, team workload balancing. 12 user stories generated.",
    },
  },
  {
    id: "design",
    icon: Palette,
    name: "Design Agent",
    tagline: "Vision meets pixels",
    description:
      "Generate stunning wireframes, UI mockups, and complete design systems that bring your product to life.",
    capabilities: [
      "Rapid wireframing",
      "UI component generation",
      "Design system creation",
      "Responsive layouts",
    ],
    demo: {
      input: '"Design a modern analytics dashboard"',
      output:
        "Generated: Dashboard with 6 metric cards, trend charts, activity feed, dark mode variants. Exported to Figma.",
    },
  },
  {
    id: "develop",
    icon: Code,
    name: "Develop Agent",
    tagline: "Code that ships",
    description:
      "Transform designs into production-ready code with intelligent scaffolding, API generation, and deployment automation.",
    capabilities: [
      "Clean code generation",
      "API endpoint design",
      "Test suite creation",
      "One-click deployment",
    ],
    demo: {
      input: '"Build a user authentication system"',
      output:
        "Generated: Auth module with OAuth, email/password, MFA. 14 components, 8 API routes, 23 tests. Ready for review.",
    },
  },
];

// Stats data
const stats = [
  { value: "10x", label: "Faster ideation to launch" },
  { value: "500+", label: "Products built" },
  { value: "70%", label: "Time saved on docs" },
  { value: "99%", label: "Customer satisfaction" },
];

export default function FeaturesPage() {
  const [activeAgent, setActiveAgent] = useState("ideate");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const currentAgent = agents.find((a) => a.id === activeAgent) || agents[0];
  const colors = stageColors[activeAgent as keyof typeof stageColors];

  return (
    <>
      {/* Hero Section */}
      <PageHero
        badge={{ icon: Sparkles, text: "5 Specialized AI Agents" }}
        title="Meet Your"
        titleHighlight="AI Product Team"
        description="Five specialized AI agents work together to take your product from idea to launch. Each agent is an expert in its domain."
        className="min-h-0 pt-24 pb-16"
      >
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            className="bg-foreground text-background hover:bg-foreground/90 rounded-md px-8 h-12 text-base font-medium"
            asChild
          >
            <a href="https://build.productos.dev/sign-up">
              Try the Agents
              <ArrowRight className="ml-2 size-4" />
            </a>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-md px-8 h-12 text-base font-medium border-border/50 hover:bg-card hover:border-border"
            asChild
          >
            <a href="#agents">See How They Work</a>
          </Button>
        </div>
      </PageHero>

      {/* Agent Flow - Quick Navigation */}
      <section className="py-8 border-y border-border/50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {agents.map((agent, index) => {
              const agentColors =
                stageColors[agent.id as keyof typeof stageColors];
              return (
                <div key={agent.id} className="flex items-center">
                  <button
                    onClick={() => {
                      setActiveAgent(agent.id);
                      document
                        .getElementById("agents")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all border",
                      agentColors.bg,
                      agentColors.border,
                      agentColors.text,
                      "hover:opacity-80"
                    )}
                  >
                    <agent.icon className="size-4" strokeWidth={1.5} />
                    <span>{agent.name.split(" ")[0]}</span>
                  </button>
                  {index < agents.length - 1 && (
                    <ArrowRight className="size-4 text-muted-foreground mx-2 hidden md:block" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Agents Detail Section */}
      <section ref={ref} id="agents" className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2
              className="text-4xl sm:text-5xl font-bold text-foreground mb-4"
              style={{ letterSpacing: "-0.02em" }}
            >
              Five Agents.
              <br />
              <span className="text-muted-foreground">One Unified Team.</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mt-6 text-lg leading-relaxed">
              Each AI agent specializes in a critical phase of product
              development. Together, they form an unstoppable team.
            </p>
          </motion.div>

          {/* Agent Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-wrap gap-2 mb-10"
          >
            {agents.map((agent) => {
              const agentColors =
                stageColors[agent.id as keyof typeof stageColors];
              const isActive = activeAgent === agent.id;
              return (
                <button
                  key={agent.id}
                  onClick={() => setActiveAgent(agent.id)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all border",
                    isActive
                      ? cn(agentColors.bg, agentColors.border, agentColors.text)
                      : "bg-card text-muted-foreground hover:text-foreground border-border hover:border-border"
                  )}
                >
                  {agent.name.split(" ")[0]}
                </button>
              );
            })}
          </motion.div>

          {/* Content Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Left Sidebar - Agents List */}
            <div className="space-y-2">
              {agents.map((agent) => {
                const Icon = agent.icon;
                const agentColors =
                  stageColors[agent.id as keyof typeof stageColors];
                const isActive = activeAgent === agent.id;
                return (
                  <button
                    key={agent.id}
                    onClick={() => setActiveAgent(agent.id)}
                    className={cn(
                      "w-full flex items-center gap-4 p-4 rounded-lg transition-all text-left",
                      isActive
                        ? cn("bg-card border", agentColors.border)
                        : "hover:bg-card/50 border border-transparent"
                    )}
                  >
                    <div
                      className={cn(
                        "p-2.5 rounded-lg transition-colors",
                        isActive ? agentColors.activeBg : "bg-muted/50"
                      )}
                    >
                      <Icon
                        className={cn(
                          "size-5",
                          isActive ? agentColors.icon : "text-muted-foreground"
                        )}
                        strokeWidth={1.5}
                      />
                    </div>
                    <div>
                      <div
                        className={cn(
                          "font-semibold transition-colors",
                          isActive ? "text-foreground" : "text-foreground/80"
                        )}
                      >
                        {agent.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {agent.tagline}
                      </div>
                    </div>
                  </button>
                );
              })}

              {/* Active Agent Description */}
              <motion.div
                key={activeAgent}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "mt-4 p-4 rounded-lg border",
                  colors.bg,
                  colors.border
                )}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={cn("size-2 rounded-full", colors.dot)} />
                  <span className={cn("text-xs font-medium", colors.text)}>
                    Active Agent
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {currentAgent.description}
                </p>
              </motion.div>
            </div>

            {/* Right Content - Agent Card */}
            <div className="lg:col-span-2">
              <motion.div
                key={activeAgent}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="p-6 rounded-xl bg-card border border-border"
              >
                {/* Badge */}
                <div
                  className={cn(
                    "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-4",
                    colors.bg,
                    colors.border,
                    colors.text
                  )}
                >
                  <span className={cn("size-1.5 rounded-full", colors.dot)} />
                  {currentAgent.name}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-foreground mb-1">
                  {currentAgent.name}
                  <span className="text-muted-foreground font-normal">
                    : {currentAgent.tagline}
                  </span>
                </h3>

                {/* Description */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {currentAgent.description}
                </p>

                {/* Capabilities */}
                <div className="p-4 rounded-lg bg-muted/50 border border-border/50 mb-4">
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mb-3 font-medium">
                    Capabilities
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {currentAgent.capabilities.map((cap) => (
                      <div
                        key={cap}
                        className="flex items-center gap-2 text-sm text-foreground/80"
                      >
                        <Check
                          className="size-4 text-emerald-500 shrink-0"
                          strokeWidth={1.5}
                        />
                        {cap}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Demo */}
                <div className="p-4 rounded-lg bg-muted/50 border border-border/50">
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mb-3 font-medium">
                    Live Demo
                  </div>
                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row items-start gap-2">
                      <span
                        className={cn(
                          "text-xs font-mono mt-1 shrink-0",
                          colors.text
                        )}
                      >
                        INPUT
                      </span>
                      <code className="text-sm text-foreground/80 bg-background/50 px-3 py-2 rounded-lg w-full sm:flex-1 border border-border/50">
                        {currentAgent.demo.input}
                      </code>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start gap-2">
                      <span className="text-xs text-emerald-400 font-mono mt-1 shrink-0">
                        OUTPUT
                      </span>
                      <code className="text-sm text-foreground/80 bg-background/50 px-3 py-2 rounded-lg w-full sm:flex-1 whitespace-pre-wrap border border-border/50">
                        {currentAgent.demo.output}
                      </code>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Orchestration Section */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeader
                badge={{ icon: Sparkles, text: "Intelligent Orchestration" }}
                title="Agents That Collaborate"
                description="Our agents don't work in silos. They share context, hand off tasks seamlessly, and adapt to your feedback in real-time."
                align="left"
                className="mb-8"
              />

              <div className="space-y-4">
                {[
                  {
                    title: "Shared Context",
                    desc: "Every agent knows what the others have done",
                  },
                  {
                    title: "Smart Handoffs",
                    desc: "Seamless transitions between development phases",
                  },
                  {
                    title: "Real-time Sync",
                    desc: "Changes propagate instantly across all agents",
                  },
                  {
                    title: "Human in the Loop",
                    desc: "You stay in control at every step",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <div className="p-1 rounded-full bg-emerald-500/20 shrink-0 mt-0.5">
                      <Check
                        className="size-4 text-emerald-500"
                        strokeWidth={2}
                      />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {item.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Agent Communication Card */}
            <div className="p-6 rounded-xl bg-card border border-border">
              <div className="space-y-4">
                {/* Simulated Agent Communication */}
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      "p-2 rounded-lg",
                      stageColors.ideate.activeBg
                    )}
                  >
                    <Lightbulb
                      className={cn("size-4", stageColors.ideate.icon)}
                      strokeWidth={1.5}
                    />
                  </div>
                  <div className="flex-1 bg-muted/50 rounded-lg p-3 border border-border/50">
                    <p
                      className={cn(
                        "text-xs mb-1 font-medium",
                        stageColors.ideate.text
                      )}
                    >
                      Ideation Agent
                    </p>
                    <p className="text-sm text-foreground/80">
                      Concept validated. Passing to Discovery for market
                      analysis...
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      "p-2 rounded-lg",
                      stageColors.discover.activeBg
                    )}
                  >
                    <Search
                      className={cn("size-4", stageColors.discover.icon)}
                      strokeWidth={1.5}
                    />
                  </div>
                  <div className="flex-1 bg-muted/50 rounded-lg p-3 border border-border/50">
                    <p
                      className={cn(
                        "text-xs mb-1 font-medium",
                        stageColors.discover.text
                      )}
                    >
                      Discovery Agent
                    </p>
                    <p className="text-sm text-foreground/80">
                      Found 3 market gaps. Generating requirements for Define...
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      "p-2 rounded-lg",
                      stageColors.define.activeBg
                    )}
                  >
                    <FileText
                      className={cn("size-4", stageColors.define.icon)}
                      strokeWidth={1.5}
                    />
                  </div>
                  <div className="flex-1 bg-muted/50 rounded-lg p-3 border border-border/50">
                    <p
                      className={cn(
                        "text-xs mb-1 font-medium",
                        stageColors.define.text
                      )}
                    >
                      Define Agent
                    </p>
                    <p className="text-sm text-foreground/80">
                      PRD complete with 24 user stories. Ready for Design...
                    </p>
                  </div>
                </div>

                <div className="h-px bg-border" />

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>3 agents active</span>
                  <span className="flex items-center gap-1">
                    <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                    Processing...
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            title="Results That Speak"
            description="Built for speed and quality"
          />
          <StatsGrid stats={stats} columns={4} />
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Ready to Meet Your AI Team?"
        description="Start building your product today with the most advanced AI agents in the industry."
        primaryAction={{
          label: "Get Started Free",
          href: "https://build.productos.dev/sign-up",
        }}
        secondaryAction={{
          label: "View Pricing",
          href: "/pricing",
        }}
      />
    </>
  );
}
