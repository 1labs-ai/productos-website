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

// Agent data - 5 ProductOS agents with subtle brand colors
const agents = [
  {
    id: "ideation",
    name: "Ideation Agent",
    icon: Sparkles,
    accentClass: "text-amber-400",
    bgClass: "bg-amber-500/10",
    status: "Refining your idea...",
    result: "Vision crystallized. 3 unique value props identified.",
    metric: "Ready for discovery"
  },
  {
    id: "discovery",
    name: "Discovery Agent",
    icon: Search,
    accentClass: "text-sky-400",
    bgClass: "bg-sky-500/10",
    status: "Analyzing market...",
    result: "Found 12 competitors. Market size: $4.2B.",
    metric: "Opportunity Score: 8.4/10"
  },
  {
    id: "define",
    name: "Define Agent", 
    icon: FileText,
    accentClass: "text-teal-400",
    bgClass: "bg-teal-500/10",
    status: "Writing specifications...",
    result: "PRD generated with 8 user stories.",
    metric: "Est: 5 days to ship"
  },
  {
    id: "design",
    name: "Design Agent",
    icon: Palette,
    accentClass: "text-purple-400",
    bgClass: "bg-purple-500/10",
    status: "Creating UI designs...",
    result: "5 UI screens with responsive layouts.",
    metric: "Figma sync ready"
  },
  {
    id: "develop",
    name: "Develop Agent",
    icon: Code,
    accentClass: "text-emerald-400",
    bgClass: "bg-emerald-500/10",
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
      {/* Linear-style reflection gradient beneath dashboard */}
      <div 
        className="absolute inset-x-3 inset-y-0 rounded-2xl pointer-events-none"
        style={{
          background: `
            radial-gradient(52% 58% at 50% 100%, rgba(10, 10, 11, 0) 0%, rgba(10, 10, 11, 0.6) 100%),
            linear-gradient(to bottom, rgb(10, 10, 11) 10%, rgb(45, 50, 58) 100%)
          `
        }}
      />
      
      {/* Main dashboard container */}
      <div 
        className="relative rounded-2xl overflow-hidden bg-[#09090a]"
        style={{
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: `
            rgba(0, 0, 0, 0.15) 0px 0px 0px 2px,
            0 25px 50px -12px rgba(0, 0, 0, 0.5),
            0 50px 100px -20px rgba(0, 0, 0, 0.4)
          `
        }}
      >
        {/* Inner frame */}
        <div className="relative rounded-xl overflow-hidden bg-[#0a0a0a]">
          {/* Glossy shine overlay - radial mask like Linear */}
          <div 
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 20%, transparent 40%)',
              mask: 'radial-gradient(180px 180px at 10% 0%, black 0%, rgba(0,0,0,0.5) 40%, transparent 70%)',
              WebkitMask: 'radial-gradient(180px 180px at 10% 0%, black 0%, rgba(0,0,0,0.5) 40%, transparent 70%)'
            }}
          />
          
          {/* Top edge highlight */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none z-10" />
          
          {/* Subtle ambient glow */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse 70% 40% at 50% 0%, rgba(255, 255, 255, 0.04) 0%, transparent 50%),
                radial-gradient(ellipse 50% 30% at 80% 10%, rgba(255, 255, 255, 0.025) 0%, transparent 40%)
              `
            }}
          />
      
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
                  
                  {/* Model Selector */}
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.06] cursor-pointer transition-colors shrink-0">
                    <Sparkles className="size-3.5 text-amber-400/60 shrink-0" />
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
          {/* Header */}
          <div className="px-6 py-4 border-b border-white/[0.04] flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-amber-400/70" />
              <span className="text-sm font-medium text-white">ProductOS Agents</span>
            </div>
            {phase === "complete" && (
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium">
                Complete
              </span>
            )}
          </div>
          
          {/* Agent Cards */}
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
                      state === "active" && cn(agent.bgClass, "border-white/[0.08]"),
                      state === "pending" && "bg-white/[0.01] border-white/[0.04] opacity-40"
                    )}
                  >
                    {/* Agent Icon */}
                    <div className={cn(
                      "w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mr-3",
                      state === "complete" && "bg-emerald-500/10",
                      state === "active" && agent.bgClass,
                      state === "pending" && "bg-white/[0.03]"
                    )}>
                      {state === "active" ? (
                        <Loader2 className={cn("size-4 animate-spin", agent.accentClass)} />
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
                          state === "active" && agent.accentClass,
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
                              className={cn("w-1.5 h-1.5 rounded-full", agent.accentClass.replace("text-", "bg-"))}
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
