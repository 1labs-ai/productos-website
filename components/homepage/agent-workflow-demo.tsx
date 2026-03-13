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

// Agent data - 5 ProductOS agents
const agents = [
  {
    id: "ideation",
    name: "Ideation Agent",
    icon: Sparkles,
    color: "amber",
    bgColor: "bg-amber-500/10",
    textColor: "text-amber-500",
    borderColor: "border-amber-500/20",
    status: "Refining your idea...",
    result: "Vision crystallized. 3 unique value props identified.",
    metric: "Ready for discovery"
  },
  {
    id: "discovery",
    name: "Discovery Agent",
    icon: Search,
    color: "sky",
    bgColor: "bg-sky-500/10",
    textColor: "text-sky-500",
    borderColor: "border-sky-500/20",
    status: "Analyzing market...",
    result: "Found 12 competitors. Market size: $4.2B.",
    metric: "Opportunity Score: 8.4/10"
  },
  {
    id: "define",
    name: "Define Agent", 
    icon: FileText,
    color: "teal",
    bgColor: "bg-teal-500/10",
    textColor: "text-teal-500",
    borderColor: "border-teal-500/20",
    status: "Writing specifications...",
    result: "PRD generated with 8 user stories.",
    metric: "Est: 5 days to ship"
  },
  {
    id: "design",
    name: "Design Agent",
    icon: Palette,
    color: "purple",
    bgColor: "bg-purple-500/10",
    textColor: "text-purple-500",
    borderColor: "border-purple-500/20",
    status: "Creating UI designs...",
    result: "5 UI screens with responsive layouts.",
    metric: "Figma sync ready"
  },
  {
    id: "develop",
    name: "Develop Agent",
    icon: Code,
    color: "emerald",
    bgColor: "bg-emerald-500/10",
    textColor: "text-emerald-500",
    borderColor: "border-emerald-500/20",
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
      className={cn(
        "relative rounded-2xl border border-border/50 dark:border-white/10 overflow-hidden",
        "bg-background dark:bg-[#0a0a0a] shadow-2xl",
        className
      )}
    >
      {/* FIXED HEIGHT CONTAINER */}
      <div className="flex flex-col lg:flex-row h-[520px]">
        {/* Left: Chat Input Panel - Matches build.productos.dev */}
        <div className="lg:w-[460px] border-b lg:border-b-0 lg:border-r border-border/30 dark:border-white/10 flex flex-col">
          {/* Chat Area */}
          <div className="flex-1 p-6 flex flex-col">
            {/* User Avatar & Label */}
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center">
                <span className="text-xs font-bold text-white">H</span>
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">You</div>
                <div className="text-xs text-muted-foreground">Founder</div>
              </div>
              {phase !== "typing" && (
                <div className="ml-auto flex items-center gap-1.5 text-xs text-emerald-500">
                  <Check className="size-3" />
                  Sent
                </div>
              )}
            </div>
            
            {/* Message Content - Fixed height */}
            <div className="flex-1 flex flex-col justify-center">
              <div className="p-4 rounded-xl bg-muted/50 dark:bg-white/[0.03] border border-border/30 dark:border-white/10 min-h-[100px]">
                <p className="text-foreground/90 text-sm leading-relaxed">
                  {phase === "typing" ? (
                    <TypingText text="Build me an analytics dashboard for tracking user engagement metrics with real-time charts and exportable reports." />
                  ) : (
                    "Build me an analytics dashboard for tracking user engagement metrics with real-time charts and exportable reports."
                  )}
                </p>
              </div>
            </div>
          </div>
          
          {/* Chat Input - Exact match of build.productos.dev */}
          <div className="p-4 border-t border-border/30 dark:border-white/10">
            <div className="rounded-xl border border-border/50 dark:border-white/10 bg-card/50 dark:bg-white/[0.02] overflow-hidden">
              {/* Text Area */}
              <div className="p-4 min-h-[60px]">
                <span className="text-muted-foreground/50 text-sm">Describe your product idea...</span>
              </div>
              
              {/* Bottom Controls - Matches build.productos.dev exactly */}
              <div className="px-4 py-3 flex items-center justify-between border-t border-border/20 dark:border-white/5">
                <div className="flex items-center gap-3">
                  {/* Plus Button */}
                  <button className="w-7 h-7 rounded-md border border-border/30 dark:border-white/10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
                    <Plus className="size-4" />
                  </button>
                  
                  {/* Model Selector */}
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-muted/50 dark:bg-white/5 hover:bg-muted dark:hover:bg-white/10 cursor-pointer transition-colors shrink-0">
                    <Sparkles className="size-3.5 text-muted-foreground shrink-0" />
                    <span className="text-sm text-muted-foreground whitespace-nowrap">Claude Sonnet 4.6</span>
                    <ChevronDown className="size-3 text-muted-foreground shrink-0" />
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {/* Icon Buttons */}
                  <button className="w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 3v18M3 12h18" />
                    </svg>
                  </button>
                  <button className="w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="7" height="7" />
                      <rect x="14" y="3" width="7" height="7" />
                      <rect x="3" y="14" width="7" height="7" />
                      <rect x="14" y="14" width="7" height="7" />
                    </svg>
                  </button>
                  
                  {/* Send Button */}
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-foreground text-background text-sm font-medium">
                    Send
                    <ArrowUp className="size-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right: Agent Workflow - Fixed height with scroll */}
        <div className="flex-1 flex flex-col bg-muted/20 dark:bg-white/[0.01] overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b border-border/20 dark:border-white/5 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-amber-500" />
              <span className="text-sm font-medium text-foreground">ProductOS Agents</span>
            </div>
            {phase === "complete" && (
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-medium">
                Complete
              </span>
            )}
          </div>
          
          {/* Agent Cards - Fixed height container */}
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
                      state === "complete" && "bg-card dark:bg-white/[0.03] border-emerald-500/30",
                      state === "active" && cn(agent.bgColor, agent.borderColor, "border"),
                      state === "pending" && "bg-card/30 dark:bg-white/[0.01] border-border/10 dark:border-white/5 opacity-50"
                    )}
                  >
                    {/* Agent Icon */}
                    <div className={cn(
                      "w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mr-3",
                      state === "complete" && "bg-emerald-500/10",
                      state === "active" && agent.bgColor,
                      state === "pending" && "bg-muted/30 dark:bg-white/5"
                    )}>
                      {state === "active" ? (
                        <Loader2 className={cn("size-4 animate-spin", agent.textColor)} />
                      ) : state === "complete" ? (
                        <Check className="size-4 text-emerald-500" />
                      ) : (
                        <Icon className="size-4 text-muted-foreground/50" />
                      )}
                    </div>
                    
                    {/* Agent Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          "text-sm font-medium",
                          state === "active" && agent.textColor,
                          state === "complete" && "text-foreground",
                          state === "pending" && "text-muted-foreground/50"
                        )}>
                          {agent.name}
                        </span>
                        {state === "active" && (
                          <span className={cn("text-xs", agent.textColor, "opacity-70")}>
                            {agent.status}
                          </span>
                        )}
                      </div>
                      
                      {state === "complete" && (
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-foreground/70">{agent.result}</span>
                          <span className="text-xs text-emerald-500 font-medium">{agent.metric}</span>
                        </div>
                      )}
                      
                      {state === "active" && (
                        <div className="flex items-center gap-1 mt-1">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              animate={{ opacity: [0.3, 1, 0.3] }}
                              transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                              className={cn("w-1.5 h-1.5 rounded-full", agent.textColor.replace("text-", "bg-"))}
                            />
                          ))}
                        </div>
                      )}
                      
                      {state === "pending" && (
                        <span className="text-xs text-muted-foreground/30">Waiting...</span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          
          {/* Completion Footer - Fixed at bottom */}
          <div className="px-4 pb-4 flex-shrink-0">
            <div className={cn(
              "p-3 rounded-xl border transition-all duration-500",
              phase === "complete" 
                ? "bg-emerald-500/5 border-emerald-500/20 opacity-100" 
                : "bg-transparent border-transparent opacity-0"
            )}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <Check className="size-4 text-emerald-500" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-foreground">Ready to deploy!</div>
                  <div className="text-xs text-muted-foreground">Complete in 5 days</div>
                </div>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 text-white text-xs font-medium hover:bg-emerald-600 transition-colors">
                  Deploy <ArrowRight className="size-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
