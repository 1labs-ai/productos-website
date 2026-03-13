"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Lightbulb, 
  Search, 
  FileText, 
  Palette, 
  Code,
  Sun,
  Moon,
  Monitor,
  ChevronDown,
  Plus,
  ArrowUp,
  Sparkles
} from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

// Typing animation component
function TypingText({ text, className }: { text: string; className?: string }) {
  const [displayedText, setDisplayedText] = useState("")
  const [showCursor, setShowCursor] = useState(true)
  
  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      if (index <= text.length) {
        setDisplayedText(text.slice(0, index))
        index++
      } else {
        // Reset after a pause
        setTimeout(() => {
          setDisplayedText("")
          index = 0
        }, 2000)
      }
    }, 50)
    
    return () => clearInterval(interval)
  }, [text])
  
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 530)
    return () => clearInterval(cursorInterval)
  }, [])
  
  return (
    <span className={className}>
      {displayedText}
      <span className={cn("inline-block w-0.5 h-4 bg-foreground/50 ml-0.5 align-middle", showCursor ? "opacity-100" : "opacity-0")} />
    </span>
  )
}

// Stage icons mapping
const stageIcons = {
  Ideate: Lightbulb,
  Discover: Search,
  Define: FileText,
  Design: Palette,
  Develop: Code,
}

// Quick actions
const quickActions = [
  { icon: "🔍", label: "Research a market" },
  { icon: "📝", label: "Write a PRD" },
  { icon: "📊", label: "Create roadmap" },
  { icon: "⚔️", label: "Analyze competitors" },
]

interface ProductOSDashboardProps {
  className?: string
}

export function ProductOSDashboard({ className }: ProductOSDashboardProps) {
  const [activeStage, setActiveStage] = useState<string | null>(null)
  const [hoveredAction, setHoveredAction] = useState<number | null>(null)
  
  const stages = ["Ideate", "Discover", "Define", "Design", "Develop"]
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={cn(
        "relative rounded-2xl border border-border/50 dark:border-white/10 overflow-hidden shadow-2xl",
        "bg-background dark:bg-[#0a0a0a]",
        className
      )}
    >
      <div className="flex min-h-[520px]">
        {/* Left Sidebar */}
        <div className="w-[240px] border-r border-border/30 dark:border-white/10 bg-card/50 dark:bg-[#111111] flex-shrink-0 hidden lg:flex flex-col">
          {/* Logo & Workspace */}
          <div className="p-4 border-b border-border/30 dark:border-white/10">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 relative">
                <Image 
                  src="/logo-gradient.svg" 
                  alt="ProductOS" 
                  fill 
                  className="object-contain"
                />
              </div>
              <div className="flex items-center gap-1">
                <span className="font-semibold text-sm text-foreground">ProductOS</span>
                <ChevronDown className="size-3 text-muted-foreground" />
              </div>
            </div>
            <span className="text-xs text-muted-foreground">Workspace</span>
          </div>
          
          {/* Create New Button */}
          <div className="p-3">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-foreground text-background text-sm font-medium transition-colors"
            >
              Create New
            </motion.button>
          </div>
          
          {/* Stages */}
          <div className="px-3 py-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Stages</span>
              <ChevronDown className="size-3 text-muted-foreground" />
            </div>
            <nav className="space-y-0.5">
              {stages.map((stage) => {
                const Icon = stageIcons[stage as keyof typeof stageIcons]
                return (
                  <motion.button
                    key={stage}
                    onHoverStart={() => setActiveStage(stage)}
                    onHoverEnd={() => setActiveStage(null)}
                    whileHover={{ x: 2 }}
                    className={cn(
                      "w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-sm transition-colors",
                      activeStage === stage 
                        ? "bg-foreground/5 dark:bg-white/5 text-foreground" 
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Icon className="size-4" />
                    {stage}
                  </motion.button>
                )
              })}
            </nav>
          </div>
          
          {/* Theme Toggle */}
          <div className="px-3 py-3 mt-auto border-t border-border/30 dark:border-white/10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-muted-foreground">Theme</span>
              <div className="flex items-center gap-1 p-0.5 rounded-md bg-muted/50 dark:bg-white/5">
                <button className="p-1 rounded text-muted-foreground hover:text-foreground transition-colors">
                  <Sun className="size-3.5" />
                </button>
                <button className="p-1 rounded text-muted-foreground hover:text-foreground transition-colors">
                  <Monitor className="size-3.5" />
                </button>
                <button className="p-1 rounded bg-foreground/10 dark:bg-white/10 text-foreground">
                  <Moon className="size-3.5" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Credits */}
          <div className="px-3 py-3 border-t border-border/30 dark:border-white/10">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Credits</span>
              <span className="text-sm font-semibold text-foreground">50</span>
            </div>
            <span className="text-xs text-muted-foreground">left this month</span>
            <div className="mt-2 h-1 rounded-full bg-muted/50 dark:bg-white/10 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "60%" }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full bg-sky-500 rounded-full"
              />
            </div>
            <div className="flex items-center gap-1.5 mt-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-xs text-muted-foreground">Monthly workspace credits</span>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <span className="text-xs text-muted-foreground">You're on a Free plan</span>
              <button className="px-2 py-0.5 rounded-md border border-border/50 dark:border-white/10 text-xs text-foreground/80 hover:bg-muted/50 transition-colors">
                Upgrade
              </button>
            </div>
          </div>
          
          {/* User */}
          <div className="px-3 py-3 border-t border-border/30 dark:border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-xs font-bold text-white">
                A
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-foreground truncate">Ariv</div>
                <div className="text-xs text-muted-foreground truncate">ariv@1labs.ai</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Back Button Area */}
          <div className="p-4">
            <button className="w-8 h-8 rounded-lg border border-border/30 dark:border-white/10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
              <ChevronDown className="size-4 -rotate-90" />
            </button>
          </div>
          
          {/* Hero Content */}
          <div className="flex-1 flex flex-col items-center justify-center px-8 pb-8">
            {/* Headline */}
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-3xl md:text-4xl lg:text-5xl font-medium text-center mb-4"
              style={{ fontStyle: 'italic', letterSpacing: '-0.02em' }}
            >
              <span className="text-foreground">What would you like to</span>
              <br />
              <span className="text-foreground">build?</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-muted-foreground text-center mb-8"
            >
              AI-native product development from idea to launch
            </motion.p>
            
            {/* Quick Actions */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-2 mb-8"
            >
              {quickActions.map((action, i) => (
                <motion.button
                  key={action.label}
                  onHoverStart={() => setHoveredAction(i)}
                  onHoverEnd={() => setHoveredAction(null)}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-200",
                    "border-border/50 dark:border-white/10 bg-card/50 dark:bg-white/[0.03]",
                    hoveredAction === i && "border-foreground/20 dark:border-white/20 bg-muted/50 dark:bg-white/5"
                  )}
                >
                  <span>{action.icon}</span>
                  <span className="text-sm text-foreground/80">{action.label}</span>
                </motion.button>
              ))}
            </motion.div>
            
            {/* Chat Input */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="w-full max-w-2xl"
            >
              <div className="rounded-xl border border-border/50 dark:border-white/10 bg-card/50 dark:bg-white/[0.02] p-4">
                {/* Input Text */}
                <div className="min-h-[60px] mb-4">
                  <TypingText 
                    text="Create an AI voice cloning platform where creators can generate realistic voiceovers in multiple languages and accents..."
                    className="text-foreground/80 text-sm leading-relaxed"
                  />
                </div>
                
                {/* Input Controls */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button className="w-7 h-7 rounded-md border border-border/30 dark:border-white/10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
                      <Plus className="size-4" />
                    </button>
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-muted/50 dark:hover:bg-white/5 cursor-pointer transition-colors">
                      <Sparkles className="size-3.5 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Claude Sonnet 4.6</span>
                      <ChevronDown className="size-3 text-muted-foreground" />
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button className="w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                      <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 20V4M4 12l8-8 8 8" />
                      </svg>
                    </button>
                    <button className="w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                      <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <path d="M8 12h8M12 8v8" />
                      </svg>
                    </button>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-foreground text-background text-sm font-medium"
                    >
                      Send
                      <ArrowUp className="size-3.5" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
