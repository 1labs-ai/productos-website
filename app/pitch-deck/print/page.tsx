"use client";

import { useState, useEffect } from "react";
import {
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
} from "lucide-react";

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
    <div className="slide flex flex-col items-center justify-center h-full text-center px-20 bg-black text-white">
      <Logo className="size-24 mb-8" />
      <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-4">
        ProductOS
      </h1>
      <p className="text-2xl sm:text-3xl font-medium mb-4">
        Cursor for Product Managers
      </p>
      <p className="text-lg sm:text-xl text-gray-400 mb-8 max-w-2xl">
        From idea to deployed product in days, not months.
      </p>
      <div className="text-sm text-gray-500">
        www.productos.dev
      </div>
    </div>
  );
}

function ProblemSlide() {
  const problems = [
    {
      icon: Building2,
      title: "Product Managers got left behind",
      description:
        "Developers got Cursor. Designers got AI tools. PMs still juggle 5+ disconnected apps.",
    },
    {
      icon: TrendingUp,
      title: "$50K+ to build an MVP",
      description:
        "Hiring developers, designers, and PMs costs a fortune. Most startups can't afford it.",
    },
    {
      icon: Target,
      title: "6+ months to launch",
      description:
        "Traditional product development is slow. By the time you ship, the market has moved.",
    },
  ];

  return (
    <div className="slide flex flex-col h-full px-16 py-12 bg-black text-white">
      <div className="flex items-center gap-3 mb-8">
        <div className="size-10 rounded-xl bg-red-500/20 flex items-center justify-center">
          <Target className="size-5 text-red-400" />
        </div>
        <h2 className="text-3xl font-bold">The Problem</h2>
      </div>
      <div className="flex-1 grid grid-cols-1 gap-6">
        {problems.map((problem, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl bg-gray-900 border border-gray-800"
          >
            <div className="flex items-start gap-4">
              <div className="size-12 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0">
                <problem.icon className="size-6 text-red-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{problem.title}</h3>
                <p className="text-gray-400">{problem.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SolutionSlide() {
  const steps = [
    { label: "Discover", desc: "AI research & ideation" },
    { label: "Define", desc: "PRD generation" },
    { label: "Design", desc: "UI/UX screens" },
    { label: "Develop", desc: "Production code" },
  ];

  return (
    <div className="slide flex flex-col h-full px-16 py-12 bg-black text-white">
      <div className="flex items-center gap-3 mb-8">
        <div className="size-10 rounded-xl bg-green-500/20 flex items-center justify-center">
          <Rocket className="size-5 text-green-400" />
        </div>
        <h2 className="text-3xl font-bold">The Solution</h2>
      </div>
      <div className="flex-1 flex flex-col justify-center">
        <div className="text-center mb-12">
          <h3 className="text-4xl font-bold mb-4">
            Your AI Product Team
          </h3>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            5 specialized AI agents that take you from idea to deployed product.
            10x faster. 90% cheaper.
          </p>
        </div>
        <div className="flex justify-center gap-4">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center">
              <div className="text-center">
                <div className="size-16 rounded-2xl bg-green-500/10 flex items-center justify-center mb-2 mx-auto">
                  <span className="text-2xl font-bold text-green-400">{i + 1}</span>
                </div>
                <div className="font-semibold">{step.label}</div>
                <div className="text-sm text-gray-500">{step.desc}</div>
              </div>
              {i < steps.length - 1 && (
                <div className="w-12 h-0.5 bg-gray-700 mx-2" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductSlide() {
  const surfaces = [
    { name: "Build", desc: "Ideation & PRD", color: "blue" },
    { name: "Design", desc: "UI Generation", color: "purple" },
    { name: "Develop", desc: "Code Generation", color: "green" },
    { name: "Mobile", desc: "App Builder", color: "orange" },
  ];

  return (
    <div className="slide flex flex-col h-full px-16 py-12 bg-black text-white">
      <div className="flex items-center gap-3 mb-8">
        <div className="size-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
          <Layers className="size-5 text-blue-400" />
        </div>
        <h2 className="text-3xl font-bold">The Product</h2>
      </div>
      <div className="flex-1 grid grid-cols-2 gap-6">
        {surfaces.map((surface, i) => (
          <div
            key={i}
            className={`p-8 rounded-2xl border bg-gray-900 border-gray-800`}
          >
            <h3 className="text-2xl font-bold mb-2">{surface.name}</h3>
            <p className="text-gray-400 mb-4">{surface.desc}</p>
            <div className="text-sm text-gray-500">
              {surface.name.toLowerCase()}.productos.dev
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MarketSlide() {
  const markets = [
    { label: "TAM", value: "$580B", desc: "Global software dev" },
    { label: "SAM", value: "$45B", desc: "AI dev tools" },
    { label: "SOM", value: "$2B", desc: "AI product platforms" },
  ];

  return (
    <div className="slide flex flex-col h-full px-16 py-12 bg-black text-white">
      <div className="flex items-center gap-3 mb-8">
        <div className="size-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
          <TrendingUp className="size-5 text-purple-400" />
        </div>
        <h2 className="text-3xl font-bold">Market Opportunity</h2>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="flex gap-12">
          {markets.map((m, i) => (
            <div key={i} className="text-center">
              <div className="text-sm text-gray-500 mb-2">{m.label}</div>
              <div className="text-5xl font-bold mb-2">{m.value}</div>
              <div className="text-gray-400">{m.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BusinessModelSlide() {
  const tiers = [
    { name: "Free", price: "$0", features: ["1 project", "5 generations/day"] },
    { name: "Pro", price: "$49/mo", features: ["Unlimited projects", "All AI agents"] },
    { name: "Team", price: "$199/mo", features: ["5 seats", "Priority support"] },
    { name: "Enterprise", price: "Custom", features: ["SSO", "Dedicated support"] },
  ];

  return (
    <div className="slide flex flex-col h-full px-16 py-12 bg-black text-white">
      <div className="flex items-center gap-3 mb-8">
        <div className="size-10 rounded-xl bg-yellow-500/20 flex items-center justify-center">
          <DollarSign className="size-5 text-yellow-400" />
        </div>
        <h2 className="text-3xl font-bold">Business Model</h2>
      </div>
      <div className="flex-1 grid grid-cols-4 gap-4">
        {tiers.map((tier, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl bg-gray-900 border border-gray-800 flex flex-col"
          >
            <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
            <div className="text-2xl font-bold mb-4">{tier.price}</div>
            <ul className="text-sm text-gray-400 space-y-2">
              {tier.features.map((f, j) => (
                <li key={j}>• {f}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function TractionSlide() {
  const metrics = [
    { label: "Beta Users", value: "500+" },
    { label: "Projects Created", value: "2,000+" },
    { label: "AI Generations", value: "50,000+" },
    { label: "NPS Score", value: "72" },
  ];

  return (
    <div className="slide flex flex-col h-full px-16 py-12 bg-black text-white">
      <div className="flex items-center gap-3 mb-8">
        <div className="size-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
          <Trophy className="size-5 text-emerald-400" />
        </div>
        <h2 className="text-3xl font-bold">Traction</h2>
      </div>
      <div className="flex-1 grid grid-cols-4 gap-6">
        {metrics.map((m, i) => (
          <div
            key={i}
            className="p-8 rounded-2xl bg-gray-900 border border-gray-800 flex flex-col items-center justify-center text-center"
          >
            <div className="text-4xl font-bold mb-2">{m.value}</div>
            <div className="text-gray-400">{m.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CompetitionSlide() {
  const competitors = [
    { name: "Lovable/Bolt/v0", weakness: "Code only, no product context" },
    { name: "Notion + Figma + Jira", weakness: "Disconnected, manual handoff" },
    { name: "Traditional Dev", weakness: "Slow, expensive, hard to scale" },
  ];

  return (
    <div className="slide flex flex-col h-full px-16 py-12 bg-black text-white">
      <div className="flex items-center gap-3 mb-8">
        <div className="size-10 rounded-xl bg-orange-500/20 flex items-center justify-center">
          <Swords className="size-5 text-orange-400" />
        </div>
        <h2 className="text-3xl font-bold">Competition</h2>
      </div>
      <div className="flex-1 flex flex-col justify-center">
        <div className="text-center mb-8">
          <p className="text-xl text-gray-400">
            ProductOS is the only platform covering the <strong>full product lifecycle</strong>
          </p>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {competitors.map((c, i) => (
            <div key={i} className="p-6 rounded-2xl bg-gray-900 border border-gray-800">
              <h3 className="font-bold mb-2">{c.name}</h3>
              <p className="text-sm text-gray-500">{c.weakness}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 p-6 rounded-2xl bg-green-500/10 border border-green-500/30 text-center">
          <p className="text-lg font-semibold text-green-400">
            ProductOS: Full lifecycle AI platform — Ideation → PRD → Design → Code → Deploy
          </p>
        </div>
      </div>
    </div>
  );
}

function TeamSlide() {
  const team = [
    {
      name: "Heemang Parmar",
      role: "Co-founder & CEO",
      bio: "10+ yrs Product. MBA IIM Lucknow. Ex-TCS. Built 150+ products.",
    },
    {
      name: "Shreyash Singh",
      role: "Co-founder & CTO",
      bio: "AI/ML expert. 10 hackathon wins. B.Tech AI & Data Science.",
    },
  ];

  return (
    <div className="slide flex flex-col h-full px-16 py-12 bg-black text-white">
      <div className="flex items-center gap-3 mb-8">
        <div className="size-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
          <Users className="size-5 text-indigo-400" />
        </div>
        <h2 className="text-3xl font-bold">Team</h2>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="grid grid-cols-2 gap-12">
          {team.map((t, i) => (
            <div key={i} className="text-center">
              <div className="size-24 rounded-full bg-gray-800 mx-auto mb-4 flex items-center justify-center text-3xl font-bold">
                {t.name[0]}
              </div>
              <h3 className="text-xl font-bold">{t.name}</h3>
              <p className="text-gray-400 mb-2">{t.role}</p>
              <p className="text-sm text-gray-500 max-w-xs">{t.bio}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="text-center text-gray-500 text-sm">
        Battle-tested: Built AlphaSense competitor for $20M ARR client in 5 months, just the two of us.
      </div>
    </div>
  );
}

function AskSlide() {
  return (
    <div className="slide flex flex-col items-center justify-center h-full text-center px-20 bg-black text-white">
      <div className="size-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-8">
        <Mail className="size-6 text-blue-400" />
      </div>
      <h2 className="text-4xl font-bold mb-6">The Ask</h2>
      <div className="text-6xl font-bold mb-4">$1.5M Seed</div>
      <p className="text-xl text-gray-400 mb-8 max-w-xl">
        18 months runway to reach $1M ARR and Series A readiness
      </p>
      <div className="grid grid-cols-3 gap-8 mb-12">
        <div>
          <div className="text-2xl font-bold">60%</div>
          <div className="text-sm text-gray-500">Product & Engineering</div>
        </div>
        <div>
          <div className="text-2xl font-bold">25%</div>
          <div className="text-sm text-gray-500">Go-to-Market</div>
        </div>
        <div>
          <div className="text-2xl font-bold">15%</div>
          <div className="text-sm text-gray-500">Operations</div>
        </div>
      </div>
      <div className="text-gray-400">
        founders@productos.dev | www.productos.dev
      </div>
    </div>
  );
}

export default function PrintPitchDeck() {
  return (
    <div className="print-deck">
      <style jsx global>{`
        @media print {
          @page {
            size: 1920px 1080px;
            margin: 0;
          }
          body {
            margin: 0;
            padding: 0;
          }
          .slide {
            page-break-after: always;
            width: 1920px;
            height: 1080px;
            overflow: hidden;
          }
          .slide:last-child {
            page-break-after: auto;
          }
        }
        .slide {
          width: 1920px;
          height: 1080px;
          overflow: hidden;
        }
        .print-deck {
          background: black;
        }
      `}</style>
      <CoverSlide />
      <ProblemSlide />
      <SolutionSlide />
      <ProductSlide />
      <MarketSlide />
      <BusinessModelSlide />
      <TractionSlide />
      <CompetitionSlide />
      <TeamSlide />
      <AskSlide />
    </div>
  );
}
