"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Search, 
  FileText, 
  Palette, 
  Code,
  Check,
  ArrowRight,
  Sparkles,
  Plus,
  ArrowUp,
  ChevronDown,
  Loader2
} from "lucide-react"
import { cn } from "@/lib/utils"

// Agent data - Linear-style monochrome with status colors only
const agents = [
  {
    id: "ideation",
    name: "Ideation Agent",
    icon: Sparkles,
    status: "Refining your idea...",
    result: "Vision crystallized. 3 unique value props identified.",
    metric: "Ready for discovery"
  },
  {
    id: "discovery",
    name: "Discovery Agent",
    icon: Search,
    status: "Analyzing market...",
    result: "Found 12 competitors. Market size: $4.2B.",
    metric: "Opportunity Score: 8.4/10"
  },
  {
    id: "define",
    name: "Define Agent", 
    icon: FileText,
    status: "Writing specifications...",
    result: "PRD generated with 8 user stories.",
    metric: "Est: 5 days to ship"
  },
  {
    id: "design",
    name: "Design Agent",
    icon: Palette,
    status: "Creating UI designs...",
    result: "5 UI screens with responsive layouts.",
    metric: "Figma sync ready"
  },
  {
    id: "develop",
    name: "Develop Agent",
    icon: Code,
    status: "Generating code...",
    result: "Next.js app with 24 passing tests.",
    metric: "Deploy ready"
  }
]

// Typing animation
function TypingText({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState("")
  const [isComplete, setIsComplete] = useState(false)
  
  useEffect(() => {
    let index = 0
    setDisplayedText("")
    setIsComplete(false)
    
    const interval = setInterval(() => {
      if (index <= text.length) {
        setDisplayedText(text.slice(0, index))
        index++
      } else {
        setIsComplete(true)
        clearInterval(interval)
      }
    }, 25)
    
    return () => clearInterval(interval)
  }, [text])
  
  return (
    <span>
      {displayedText}
      {!isComplete && <span className="inline-block w-0.5 h-4 bg-foreground/60 ml-0.5 animate-pulse align-middle" />}
    </span>
  )
}

interface AgentWorkflowDemoProps {
  className?: string
}

export function AgentWorkflowDemo({ className }: AgentWorkflowDemoProps) {
  const [phase, setPhase] = useState<"typing" | "processing" | "complete">("typing")
  const [activeAgentIndex, setActiveAgentIndex] = useState(-1)
  const [completedAgents, setCompletedAgents] = useState<string[]>([])
  
  // Auto-advance the demo
  useEffect(() => {
    const timer = setTimeout(() => {
      if (phase === "typing") {
        setPhase("processing")
        setActiveAgentIndex(0)
      }
    }, 3000)
    return () => clearTimeout(timer)
  }, [phase])
  
  // Process agents sequentially
  useEffect(() => {
    if (phase === "processing" && activeAgentIndex >= 0 && activeAgentIndex < agents.length) {
      const timer = setTimeout(() => {
        setCompletedAgents(prev => [...prev, agents[activeAgentIndex].id])
        if (activeAgentIndex < agents.length - 1) {
          setActiveAgentIndex(prev => prev + 1)
        } else {
          setPhase("complete")
        }
      }, 1200)
      return () => clearTimeout(timer)
    }
  }, [phase, activeAgentIndex])
  
  // Reset and loop
  useEffect(() => {
    if (phase === "complete") {
      const timer = setTimeout(() => {
        setPhase("typing")
        setActiveAgentIndex(-1)
        setCompletedAgents([])
      }, 3500)
      return () => clearTimeout(timer)
    }
  }, [phase])
  
  const getAgentState = (agentId: string, index: number) => {
    if (completedAgents.includes(agentId)) return "complete"
    if (activeAgentIndex === index) return "active"
    return "pending"
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={cn("relative", className)}
    >
      {/* Main dashboard container - theme-aware with dark mode premium finish */}
      <div 
        className="relative rounded-2xl overflow-hidden bg-card border border-border shadow-lg dark:bg-[#09090a] dark:border-white/[0.08]"
      >
        {/* Inner frame */}
        <div className="relative rounded-xl overflow-hidden bg-muted/30 dark:bg-[#0a0a0a]">
          {/* Dark mode glossy effects */}
          <div 
            className="absolute inset-0 pointer-events-none z-10 hidden dark:block"
            style={{
              background: `
                radial-gradient(ellipse 300px 150px at 15% 0%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 30%, transparent 70%),
                radial-gradient(ellipse 200px 100px at 85% 5%, rgba(255,255,255,0.04) 0%, transparent 60%)
              `,
            }}
          />
          <div 
            className="absolute inset-0 pointer-events-none z-10 hidden dark:block"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 10%, transparent 25%)',
            }}
          />
          {/* Top edge highlight */}
          <div className="absolute inset-x-0 top-0 h-px pointer-events-none z-10 bg-gradient-to-r from-transparent via-black/5 to-transparent dark:via-white/20" />
      
      {/* FIXED HEIGHT CONTAINER */}
      <div className="flex flex-col lg:flex-row h-[520px]">
        {/* Left: Chat Input Panel */}
        <div className="lg:w-[460px] border-b lg:border-b-0 lg:border-r border-white/[0.06] flex flex-col">
          {/* Chat Area */}
          <div className="flex-1 p-6 flex flex-col">
            {/* User Avatar & Label */}
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center">
                <span className="text-xs font-bold text-amber-400/80">H</span>
              </div>
              <div>
                <div className="text-sm font-medium text-white">You</div>
                <div className="text-xs text-white/40">Founder</div>
              </div>
              {phase !== "typing" && (
                <div className="ml-auto flex items-center gap-1.5 text-xs text-emerald-400/80">
                  <Check className="size-3" />
                  Sent
                </div>
              )}
            </div>
            
            {/* Message Content - Fixed height */}
            <div className="flex-1 flex flex-col justify-center">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] min-h-[100px]">
                <p className="text-white/80 text-sm leading-relaxed">
                  {phase === "typing" ? (
                    <TypingText text="Build me an analytics dashboard for tracking user engagement metrics with real-time charts and exportable reports." />
                  ) : (
                    "Build me an analytics dashboard for tracking user engagement metrics with real-time charts and exportable reports."
                  )}
                </p>
              </div>
            </div>
          </div>
          
          {/* Chat Input */}
          <div className="p-4 border-t border-white/[0.06]">
            <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] overflow-hidden">
              {/* Text Area */}
              <div className="p-4 min-h-[60px]">
                <span className="text-white/30 text-sm">Describe your product idea...</span>
              </div>
              
              {/* Bottom Controls */}
              <div className="px-4 py-3 flex items-center justify-between border-t border-white/[0.04]">
                <div className="flex items-center gap-3">
                  {/* Plus Button */}
                  <button className="w-7 h-7 rounded-md border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-white/60 hover:bg-white/[0.04] transition-colors">
                    <Plus className="size-4" />
                  </button>
                  
                  {/* Model Selector - Linear-style */}
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.06] cursor-pointer transition-colors shrink-0">
                    <Sparkles className="size-3.5 text-white/40 shrink-0" />
                    <span className="text-sm text-white/50 whitespace-nowrap">Claude Sonnet 4.6</span>
                    <ChevronDown className="size-3 text-white/30 shrink-0" />
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {/* Send Button */}
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-black text-sm font-medium">
                    Send
                    <ArrowUp className="size-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right: Agent Workflow */}
        <div className="flex-1 flex flex-col bg-white/[0.01] overflow-hidden">
          {/* Header - Linear-style */}
          <div className="px-6 py-4 border-b border-white/[0.04] flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-white/50" />
              <span className="text-sm font-medium text-white">ProductOS Agents</span>
            </div>
            {phase === "complete" && (
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium">
                Complete
              </span>
            )}
          </div>
          
          {/* Agent Cards - Linear-style monochrome */}
          <div className="flex-1 p-3 overflow-hidden">
            <div className="space-y-2 h-full">
              {agents.map((agent, index) => {
                const state = getAgentState(agent.id, index)
                const Icon = agent.icon
                
                return (
                  <div
                    key={agent.id}
                    className={cn(
                      "p-2.5 rounded-xl border transition-all duration-300 h-[64px] flex items-center",
                      state === "complete" && "bg-white/[0.02] border-emerald-500/20",
                      state === "active" && "bg-white/[0.03] border-white/[0.08]",
                      state === "pending" && "bg-white/[0.01] border-white/[0.04] opacity-40"
                    )}
                  >
                    {/* Agent Icon - monochrome with status colors */}
                    <div className={cn(
                      "w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mr-3",
                      state === "complete" && "bg-emerald-500/10",
                      state === "active" && "bg-white/[0.06]",
                      state === "pending" && "bg-white/[0.03]"
                    )}>
                      {state === "active" ? (
                        <Loader2 className="size-4 animate-spin text-white/70" />
                      ) : state === "complete" ? (
                        <Check className="size-4 text-emerald-400" />
                      ) : (
                        <Icon className="size-4 text-white/30" />
                      )}
                    </div>
                    
                    {/* Agent Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          "text-sm font-medium",
                          state === "active" && "text-white",
                          state === "complete" && "text-white/90",
                          state === "pending" && "text-white/40"
                        )}>
                          {agent.name}
                        </span>
                        {state === "active" && (
                          <span className="text-xs text-white/50">
                            {agent.status}
                          </span>
                        )}
                      </div>
                      
                      {state === "complete" && (
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-white/50">{agent.result}</span>
                          <span className="text-xs text-emerald-400/80 font-medium">{agent.metric}</span>
                        </div>
                      )}
                      
                      {state === "active" && (
                        <div className="flex items-center gap-1 mt-1">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              animate={{ opacity: [0.3, 1, 0.3] }}
                              transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                              className="w-1.5 h-1.5 rounded-full bg-white/50"
                            />
                          ))}
                        </div>
                      )}
                      
                      {state === "pending" && (
                        <span className="text-xs text-white/20">Waiting...</span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          
          {/* Completion Footer */}
          <div className="px-4 pb-4 flex-shrink-0">
            <div className={cn(
              "p-3 rounded-xl border transition-all duration-500",
              phase === "complete" 
                ? "bg-emerald-500/5 border-emerald-500/20 opacity-100" 
                : "bg-transparent border-transparent opacity-0"
            )}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <Check className="size-4 text-emerald-400" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-white">Ready to deploy!</div>
                  <div className="text-xs text-white/40">Complete in 5 days</div>
                </div>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 text-white text-xs font-medium hover:bg-emerald-600 transition-colors">
                  Deploy <ArrowRight className="size-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
        </div>
      </div>
    </motion.div>
  )
}
