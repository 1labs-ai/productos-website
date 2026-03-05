"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Building2,
  Rocket,
  Target,
  TrendingUp,
  Users,
  Layers,
  DollarSign,
  Trophy,
  Swords,
  Mail,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Slide data
const slides = [
  {
    id: "cover",
    type: "cover",
  },
  {
    id: "problem",
    type: "problem",
  },
  {
    id: "solution",
    type: "solution",
  },
  {
    id: "product",
    type: "product",
  },
  {
    id: "market",
    type: "market",
  },
  {
    id: "business-model",
    type: "business-model",
  },
  {
    id: "traction",
    type: "traction",
  },
  {
    id: "competition",
    type: "competition",
  },
  {
    id: "team",
    type: "team",
  },
  {
    id: "ask",
    type: "ask",
  },
];

// Logo Component
function Logo({ className = "size-12" }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 36" fill="none" className={className}>
      <path d="M4 32 L18 4 L32 32 Z" fill="#E5E5E5" />
      <path d="M18 4 L4 32 L18 32 Z" fill="#B3B3B3" />
      <path d="M18 4 L18 32 L32 4 Z" fill="#808080" />
    </svg>
  );
}

// Slide Components
function CoverSlide() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-20">
      <Logo className="size-24 mb-8" />
      <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-foreground mb-4">
        ProductOS
      </h1>
      <p className="text-2xl sm:text-3xl text-foreground/90 font-medium mb-4">
        Cursor for Product Managers
      </p>
      <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl">
        From idea to deployed product in days, not months.
      </p>
      <div className="text-sm text-muted-foreground/60">
        www.productos.dev
      </div>
    </div>
  );
}

function ProblemSlide() {
  const problems = [
    {
      stat: "90%",
      label: "of startups fail",
      detail: "Most never ship a working product",
    },
    {
      stat: "6-12 mo",
      label: "to build MVP",
      detail: "Traditional development timeline",
    },
    {
      stat: "$50-150K",
      label: "average MVP cost",
      detail: "Prohibitive for most founders",
    },
    {
      stat: "5+",
      label: "tools stitched together",
      detail: "Notion, Figma, Jira, GitHub, Copilot",
    },
  ];

  return (
    <div className="flex flex-col h-full px-20 py-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20">
          <Target className="size-5 text-red-400" />
        </div>
        <h2 className="text-3xl font-bold text-foreground">The Problem</h2>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <p className="text-xl text-muted-foreground mb-8 max-w-3xl">
          Developers got <span className="text-foreground font-semibold">Cursor</span> — AI-powered coding that 10x'd their productivity.
          <br /><br />
          <span className="text-foreground font-semibold">Product Managers and Founders?</span> Still juggling 5+ disconnected tools with manual handoffs at every step.
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, i) => (
            <div
              key={i}
              className="p-6 rounded-xl bg-card border border-border/50 hover:border-red-500/30 transition-colors"
            >
              <div className="text-4xl font-bold text-foreground mb-2">{problem.stat}</div>
              <div className="text-lg font-medium text-foreground/80 mb-1">{problem.label}</div>
              <div className="text-sm text-muted-foreground">{problem.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SolutionSlide() {
  return (
    <div className="flex flex-col h-full px-20 py-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/20">
          <Rocket className="size-5 text-green-400" />
        </div>
        <h2 className="text-3xl font-bold text-foreground">The Solution</h2>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <h3 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 leading-tight">
          ProductOS: Your AI Product Team
        </h3>

        <p className="text-xl text-muted-foreground mb-8 max-w-3xl">
          What Cursor is for developers, we are for Product Managers and Founders.
          <br /><br />
          One platform that replaces Notion + Figma + Jira + GitHub + Copilot with AI-orchestrated product development.
        </p>

        {/* 4D Framework */}
        <div className="flex items-center justify-center gap-4 mb-10">
          {[
            { label: "Discover", desc: "Research & Insights" },
            { label: "Define", desc: "PRDs & Specs" },
            { label: "Design", desc: "UI Generation" },
            { label: "Develop", desc: "Code & Deploy" },
          ].map((step, i) => (
            <div key={step.label} className="flex items-center">
              <div className="text-center">
                <div className="text-xl font-bold text-green-400 mb-1">{step.label}</div>
                <div className="text-xs text-muted-foreground">{step.desc}</div>
              </div>
              {i < 3 && <div className="mx-4 text-muted-foreground/50">→</div>}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-5xl font-bold text-green-400 mb-2">10x</div>
            <div className="text-muted-foreground">Faster to ship</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-green-400 mb-2">90%</div>
            <div className="text-muted-foreground">Cost reduction</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-green-400 mb-2">1</div>
            <div className="text-muted-foreground">Person can build</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductSlide() {
  const surfaces = [
    {
      num: "1",
      name: "BUILD",
      domain: "build.productos.dev",
      desc: "Requirements → PRDs",
      detail: "Describe what you want. AI generates structured specifications.",
      color: "amber",
    },
    {
      num: "2",
      name: "DESIGN",
      domain: "design.productos.dev",
      desc: "PRDs → UI Mockups",
      detail: "One click to generate screens. Iterate instantly.",
      color: "blue",
    },
    {
      num: "3",
      name: "DEVELOP",
      domain: "develop.productos.dev",
      desc: "Designs → Code",
      detail: "AI code agents build working React apps. Live preview.",
      color: "purple",
    },
    {
      num: "4",
      name: "MOBILE",
      domain: "mobile.productos.dev",
      desc: "Ideas → Mobile Apps",
      detail: "Describe your app. Preview on your phone via QR code.",
      color: "green",
    },
  ];

  const colorMap: Record<string, string> = {
    amber: "bg-amber-500/10 border-amber-500/30 text-amber-400",
    blue: "bg-blue-500/10 border-blue-500/30 text-blue-400",
    purple: "bg-purple-500/10 border-purple-500/30 text-purple-400",
    green: "bg-green-500/10 border-green-500/30 text-green-400",
  };

  return (
    <div className="flex flex-col h-full px-20 py-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
          <Layers className="size-5 text-purple-400" />
        </div>
        <h2 className="text-3xl font-bold text-foreground">The Product: 4 Surfaces</h2>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {surfaces.map((surface) => (
            <div
              key={surface.num}
              className="p-6 rounded-xl bg-card border border-border/50 hover:border-border transition-colors"
            >
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg border mb-4 font-bold ${colorMap[surface.color]}`}>
                {surface.num}
              </div>
              <div className="text-xl font-bold text-foreground mb-1">{surface.name}</div>
              <div className="text-sm text-muted-foreground mb-3">{surface.desc}</div>
              <div className="text-xs text-foreground/60 leading-relaxed">{surface.detail}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 rounded-lg bg-muted/30 border border-border/50 text-center">
          <p className="text-muted-foreground">
            <span className="text-foreground font-medium">All 4 surfaces share one context.</span>{" "}
            No more lost-in-translation between tools.
          </p>
        </div>
      </div>
    </div>
  );
}

function MarketSlide() {
  return (
    <div className="flex flex-col h-full px-20 py-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
          <TrendingUp className="size-5 text-blue-400" />
        </div>
        <h2 className="text-3xl font-bold text-foreground">Market Opportunity</h2>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-3 gap-8 mb-12">
          <div className="p-8 rounded-xl bg-card border border-border/50 text-center">
            <div className="text-sm text-muted-foreground mb-2">TAM</div>
            <div className="text-5xl font-bold text-foreground mb-2">$580B</div>
            <div className="text-sm text-muted-foreground">Global Software Dev Market</div>
          </div>
          <div className="p-8 rounded-xl bg-card border border-border/50 text-center">
            <div className="text-sm text-muted-foreground mb-2">SAM</div>
            <div className="text-5xl font-bold text-foreground mb-2">$45B</div>
            <div className="text-sm text-muted-foreground">AI Dev Tools + No-Code</div>
          </div>
          <div className="p-8 rounded-xl bg-card border border-border/50 text-center">
            <div className="text-sm text-muted-foreground mb-2">SOM</div>
            <div className="text-5xl font-bold text-foreground mb-2">$2B</div>
            <div className="text-sm text-muted-foreground">AI-Native Product Platforms</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="p-6 rounded-xl bg-muted/30 border border-border/50">
            <h4 className="text-lg font-semibold text-foreground mb-3">Why Now?</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-foreground/40">•</span>
                LLMs finally good enough for production code
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground/40">•</span>
                AI coding tools seeing explosive adoption
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground/40">•</span>
                Startup formation at all-time highs
              </li>
            </ul>
          </div>
          <div className="p-6 rounded-xl bg-muted/30 border border-border/50">
            <h4 className="text-lg font-semibold text-foreground mb-3">Target Users</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-foreground/40">•</span>
                Solo founders validating ideas
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground/40">•</span>
                Small teams (2-10 people) shipping fast
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground/40">•</span>
                Enterprises building internal tools
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function BusinessModelSlide() {
  const tiers = [
    { name: "Free", price: "$0", users: "Hobbyists", features: ["5 projects", "Community support"] },
    { name: "Pro", price: "$29/mo", users: "Solo founders", features: ["Unlimited projects", "Priority support", "Advanced AI"] },
    { name: "Team", price: "$99/mo", users: "Small teams", features: ["5 seats", "Collaboration", "API access"] },
    { name: "Enterprise", price: "Custom", users: "Organizations", features: ["SSO/SAML", "Dedicated support", "SLA"] },
  ];

  return (
    <div className="flex flex-col h-full px-20 py-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
          <DollarSign className="size-5 text-amber-400" />
        </div>
        <h2 className="text-3xl font-bold text-foreground">Business Model</h2>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <p className="text-xl text-muted-foreground mb-8">
          <span className="text-foreground font-semibold">SaaS subscription</span> with usage-based AI credits.
          Land with free tier, expand with Pro/Team.
        </p>

        <div className="grid grid-cols-4 gap-4 mb-8">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`p-6 rounded-xl border transition-colors ${
                tier.name === "Pro"
                  ? "bg-amber-500/5 border-amber-500/30"
                  : "bg-card border-border/50"
              }`}
            >
              <div className="text-lg font-bold text-foreground mb-1">{tier.name}</div>
              <div className="text-2xl font-bold text-foreground mb-1">{tier.price}</div>
              <div className="text-sm text-muted-foreground mb-4">{tier.users}</div>
              <ul className="space-y-1">
                {tier.features.map((f, i) => (
                  <li key={i} className="text-xs text-muted-foreground flex items-center gap-1">
                    <span className="text-green-400">✓</span> {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="p-4 rounded-lg bg-muted/30 border border-border/50 text-center">
            <div className="text-2xl font-bold text-foreground mb-1">85%</div>
            <div className="text-sm text-muted-foreground">Gross margin target</div>
          </div>
          <div className="p-4 rounded-lg bg-muted/30 border border-border/50 text-center">
            <div className="text-2xl font-bold text-foreground mb-1">{"<12 mo"}</div>
            <div className="text-sm text-muted-foreground">CAC payback</div>
          </div>
          <div className="p-4 rounded-lg bg-muted/30 border border-border/50 text-center">
            <div className="text-2xl font-bold text-foreground mb-1">120%</div>
            <div className="text-sm text-muted-foreground">Net revenue retention</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TractionSlide() {
  const milestones = [
    { date: "Jan 2026", event: "ProductOS Build launched" },
    { date: "Feb 2026", event: "Design + Develop surfaces live" },
    { date: "Mar 2026", event: "Mobile surface beta" },
    { date: "Q2 2026", event: "Public launch + paid plans" },
  ];

  return (
    <div className="flex flex-col h-full px-20 py-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/20">
          <Trophy className="size-5 text-green-400" />
        </div>
        <h2 className="text-3xl font-bold text-foreground">Traction</h2>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-4 gap-6 mb-12">
          <div className="p-6 rounded-xl bg-card border border-border/50 text-center">
            <div className="text-4xl font-bold text-green-400 mb-2">500+</div>
            <div className="text-muted-foreground">Beta users</div>
          </div>
          <div className="p-6 rounded-xl bg-card border border-border/50 text-center">
            <div className="text-4xl font-bold text-green-400 mb-2">2,000+</div>
            <div className="text-muted-foreground">Projects created</div>
          </div>
          <div className="p-6 rounded-xl bg-card border border-border/50 text-center">
            <div className="text-4xl font-bold text-green-400 mb-2">50K+</div>
            <div className="text-muted-foreground">AI generations</div>
          </div>
          <div className="p-6 rounded-xl bg-card border border-border/50 text-center">
            <div className="text-4xl font-bold text-green-400 mb-2">4.8/5</div>
            <div className="text-muted-foreground">User rating</div>
          </div>
        </div>

        <div className="p-6 rounded-xl bg-muted/30 border border-border/50">
          <h4 className="text-lg font-semibold text-foreground mb-4">Milestones</h4>
          <div className="flex items-center justify-between">
            {milestones.map((m, i) => (
              <div key={i} className="flex-1 relative">
                <div className="flex flex-col items-center">
                  <div className={`w-4 h-4 rounded-full ${i <= 2 ? "bg-green-400" : "bg-muted-foreground/30"} mb-2`} />
                  <div className="text-sm font-medium text-foreground">{m.date}</div>
                  <div className="text-xs text-muted-foreground text-center mt-1">{m.event}</div>
                </div>
                {i < milestones.length - 1 && (
                  <div className={`absolute top-2 left-1/2 w-full h-0.5 ${i < 2 ? "bg-green-400" : "bg-muted-foreground/30"}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CompetitionSlide() {
  const competitors = [
    { name: "Lovable/Bolt", focus: "Code generation", weakness: "No research, no PRD, no design system" },
    { name: "v0.dev", focus: "UI components", weakness: "Components, not complete products" },
    { name: "Cursor", focus: "Developer IDE", weakness: "Requires coding skills, not for PMs" },
    { name: "Notion + Figma + Jira", focus: "Separate tools", weakness: "Manual handoffs, no AI orchestration" },
  ];

  return (
    <div className="flex flex-col h-full px-20 py-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 rounded-lg bg-orange-500/10 border border-orange-500/20">
          <Swords className="size-5 text-orange-400" />
        </div>
        <h2 className="text-3xl font-bold text-foreground">Competition</h2>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-4">Fragmented Tools</h3>
            <div className="space-y-3">
              {competitors.map((c) => (
                <div key={c.name} className="p-4 rounded-lg bg-card border border-border/50">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium text-foreground">{c.name}</div>
                      <div className="text-sm text-muted-foreground">{c.focus}</div>
                    </div>
                    <div className="text-xs text-red-400 max-w-36 text-right">{c.weakness}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-foreground mb-4">ProductOS: Full Stack for PMs</h3>
            <div className="p-6 rounded-xl bg-green-500/5 border border-green-500/30 h-[calc(100%-2rem)]">
              <div className="text-xl font-bold text-foreground mb-4">
                4D Framework — Discover to Deploy
              </div>
              <ul className="space-y-2.5 text-muted-foreground text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  Multi-model Research Agent (GPT-4, Claude, Gemini)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  Upload interviews → "What should we build?"
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  PRD Agent generates full specs
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  Design Agent creates UI from prompts
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  Code Agent builds production Next.js
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  Mobile Agent with QR preview
                </li>
              </ul>
              <div className="mt-4 pt-3 border-t border-green-500/20">
                <div className="text-sm text-muted-foreground">
                  <span className="text-foreground font-medium">One AI-orchestrated platform</span> replaces the chaos of 5+ tools.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TeamSlide() {
  return (
    <div className="flex flex-col h-full px-20 py-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
          <Users className="size-5 text-purple-400" />
        </div>
        <h2 className="text-3xl font-bold text-foreground">Team</h2>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* CEO Card */}
          <div className="p-6 rounded-xl bg-card border border-border/50">
            <div className="flex items-center gap-4 mb-4">
              <img 
                src="/team/heemang.png" 
                alt="Heemang Parmar"
                className="w-16 h-16 rounded-full object-cover border-2 border-border/50"
              />
              <div>
                <div className="text-lg font-bold text-foreground">Heemang Parmar</div>
                <div className="text-sm text-muted-foreground">Co-Founder & CEO</div>
              </div>
            </div>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li>• IIM Lucknow MBA + CS Engineering</li>
              <li>• 10+ years product & technology</li>
              <li>• 150+ products shipped</li>
              <li>• Architected ProductOS, 60%+ initial code</li>
            </ul>
            <div className="flex gap-3 mt-4">
              <a href="https://linkedin.com/in/heemangparmar" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-foreground transition-colors">LinkedIn ↗</a>
              <a href="https://twitter.com/heemangparmar" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Twitter ↗</a>
            </div>
          </div>

          {/* CTO Card */}
          <div className="p-6 rounded-xl bg-card border border-border/50">
            <div className="flex items-center gap-4 mb-4">
              <img 
                src="/team/shreyash.png" 
                alt="Shreyash Singh"
                className="w-16 h-16 rounded-full object-cover border-2 border-border/50"
              />
              <div>
                <div className="text-lg font-bold text-foreground">Shreyash Singh</div>
                <div className="text-sm text-muted-foreground">Co-Founder & CTO</div>
              </div>
            </div>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li>• B.Tech AI & Data Science</li>
              <li>• 10x hackathon winner</li>
              <li>• AI Agents, RAG, LLM fine-tuning expert</li>
              <li>• Built multi-agent system architecture</li>
            </ul>
            <div className="flex gap-3 mt-4">
              <a href="https://linkedin.com/in/shreyash-singh-ai" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-foreground transition-colors">LinkedIn ↗</a>
            </div>
          </div>
        </div>

        {/* Proven collaboration */}
        <div className="mt-6 p-4 rounded-lg bg-muted/30 border border-border/50 max-w-4xl mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            <span className="text-foreground font-medium">Proven together:</span> Built Delve AI (AlphaSense competitor) for a $20M ARR healthcare client in 5 months — just the two of us.
          </p>
        </div>
      </div>
    </div>
  );
}

function AskSlide() {
  return (
    <div className="flex flex-col h-full px-20 py-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
          <Rocket className="size-5 text-amber-400" />
        </div>
        <h2 className="text-3xl font-bold text-foreground">The Ask</h2>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center text-center">
        <div className="text-6xl font-bold text-foreground mb-4">$1.5M</div>
        <div className="text-xl text-muted-foreground mb-12">Pre-Seed Round</div>

        <div className="grid grid-cols-3 gap-8 max-w-2xl mb-12">
          <div className="p-6 rounded-xl bg-card border border-border/50">
            <div className="text-2xl font-bold text-foreground mb-2">40%</div>
            <div className="text-sm text-muted-foreground">Engineering & AI</div>
          </div>
          <div className="p-6 rounded-xl bg-card border border-border/50">
            <div className="text-2xl font-bold text-foreground mb-2">35%</div>
            <div className="text-sm text-muted-foreground">Growth & GTM</div>
          </div>
          <div className="p-6 rounded-xl bg-card border border-border/50">
            <div className="text-2xl font-bold text-foreground mb-2">25%</div>
            <div className="text-sm text-muted-foreground">Ops & Runway</div>
          </div>
        </div>

        <div className="p-6 rounded-xl bg-amber-500/5 border border-amber-500/30 max-w-lg">
          <div className="text-lg font-semibold text-foreground mb-2">18-Month Runway Target</div>
          <div className="text-muted-foreground">
            Public launch → 10K users → $50K MRR → Series A ready
          </div>
        </div>

        <div className="mt-12 flex items-center gap-4">
          <a
            href="mailto:founders@productos.dev"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-foreground text-background font-medium hover:bg-foreground/90 transition-colors"
          >
            <Mail className="size-4" />
            founders@productos.dev
          </a>
          <a
            href="https://calendly.com/heemang-1labs/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors"
          >
            <ExternalLink className="size-4" />
            Schedule a Call
          </a>
        </div>
      </div>
    </div>
  );
}

// Slide renderer
function SlideContent({ type }: { type: string }) {
  switch (type) {
    case "cover":
      return <CoverSlide />;
    case "problem":
      return <ProblemSlide />;
    case "solution":
      return <SolutionSlide />;
    case "product":
      return <ProductSlide />;
    case "market":
      return <MarketSlide />;
    case "business-model":
      return <BusinessModelSlide />;
    case "traction":
      return <TractionSlide />;
    case "competition":
      return <CompetitionSlide />;
    case "team":
      return <TeamSlide />;
    case "ask":
      return <AskSlide />;
    default:
      return null;
  }
}

export function PitchDeckContent() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showArrows, setShowArrows] = useState(true);
  const arrowTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const slideStartTimeRef = useRef<number>(Date.now());
  const lastTrackedSlideRef = useRef<number>(-1);

  // Reset arrow visibility timer
  const resetArrowTimer = useCallback(() => {
    setShowArrows(true);
    if (arrowTimeoutRef.current) {
      clearTimeout(arrowTimeoutRef.current);
    }
    arrowTimeoutRef.current = setTimeout(() => {
      setShowArrows(false);
    }, 2000);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
    resetArrowTimer();
  }, [resetArrowTimer]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
    resetArrowTimer();
  }, [resetArrowTimer]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
    resetArrowTimer();
  }, [resetArrowTimer]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
    resetArrowTimer();
  }, [resetArrowTimer]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevSlide();
      } else if (e.key === "f") {
        toggleFullscreen();
      } else if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide, toggleFullscreen, isFullscreen]);

  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Auto-hide arrows after 2 seconds, show on mouse move
  useEffect(() => {
    const handleMouseMove = () => {
      resetArrowTimer();
    };
    
    // Start the initial timer
    resetArrowTimer();
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (arrowTimeoutRef.current) {
        clearTimeout(arrowTimeoutRef.current);
      }
    };
  }, [resetArrowTimer]);

  // Track slide views
  useEffect(() => {
    const trackSlide = async () => {
      // Calculate time spent on previous slide
      const timeSpentMs = Date.now() - slideStartTimeRef.current;
      const previousSlide = lastTrackedSlideRef.current;
      
      // Track previous slide's time if we're moving to a new slide
      if (previousSlide >= 0 && previousSlide !== currentSlide) {
        try {
          await fetch('/api/pitch-deck/track', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              slideIndex: previousSlide,
              slideName: slides[previousSlide]?.type || 'unknown',
              timeSpentMs,
            }),
          });
        } catch (error) {
          console.error('Failed to track slide:', error);
        }
      }
      
      // Reset timer for new slide
      slideStartTimeRef.current = Date.now();
      lastTrackedSlideRef.current = currentSlide;
    };

    trackSlide();
  }, [currentSlide]);

  // Track final slide on unmount
  useEffect(() => {
    return () => {
      const timeSpentMs = Date.now() - slideStartTimeRef.current;
      const finalSlide = lastTrackedSlideRef.current;
      if (finalSlide >= 0) {
        // Use sendBeacon for reliable tracking on page unload
        navigator.sendBeacon('/api/pitch-deck/track', JSON.stringify({
          slideIndex: finalSlide,
          slideName: slides[finalSlide]?.type || 'unknown',
          timeSpentMs,
        }));
      }
    };
  }, []);

  return (
    <div className={`bg-background flex flex-col ${isFullscreen ? "fixed inset-0 z-[100]" : "min-h-screen"}`}>
      {/* Header - Hidden in presenter mode */}
      {!isFullscreen && (
        <header className="flex items-center justify-between px-6 py-4 border-b border-border/50 print:hidden">
          <div className="flex items-center gap-3">
            <Logo className="size-8" />
            <span className="font-semibold text-foreground">ProductOS Pitch Deck</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleFullscreen}
              className="gap-2"
            >
              <Maximize2 className="size-4" />
              Present
            </Button>
          </div>
        </header>
      )}

      {/* Slide Container */}
      <div className="flex-1 relative overflow-hidden">
        {/* Logo watermark - top right on all slides except cover */}
        {currentSlide !== 0 && (
          <div className="absolute top-6 right-8 z-10 flex items-center gap-2 opacity-60">
            <Logo className="size-8" />
            <span className="text-sm font-medium text-foreground/80">ProductOS</span>
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <SlideContent type={slides[currentSlide].type} />
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows - auto-hide after 2s */}
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className={`absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-muted/50 border border-border/50 hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 print:hidden ${showArrows ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          <ChevronLeft className="size-6" />
        </button>
        <button
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className={`absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-muted/50 border border-border/50 hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 print:hidden ${showArrows ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          <ChevronRight className="size-6" />
        </button>
      </div>

      {/* Slide indicators - auto-hide with arrows */}
      <div className={`flex items-center justify-center gap-2 py-4 border-t border-border/50 print:hidden transition-opacity duration-300 ${showArrows ? "opacity-100" : "opacity-0"}`}>
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide
                ? "bg-foreground w-6"
                : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
          />
        ))}
        <span className="ml-4 text-sm text-muted-foreground">
          {currentSlide + 1} / {slides.length}
        </span>
      </div>

      {/* Print styles */}
      <style jsx global>{`
        @media print {
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
