"use client"

import { useState, useEffect } from "react"
import { 
  Lightbulb, 
  Search, 
  FileText, 
  Palette, 
  Code,
  ArrowRight,
  Sparkles,
  Check,
  MessageSquare,
  Target,
  Users,
  BarChart3,
  Layers,
  Play,
  GitBranch,
  Terminal,
  TrendingUp,
  Activity,
  Bell,
  Settings,
  ChevronRight,
  Zap,
  Globe,
  Shield,
  Smartphone,
  CreditCard,
  Calendar,
  Mail,
  PieChart,
  Home,
  Bot,
  Send,
  Mic,
  Video,
  X,
  Plus,
  ChevronDown,
  Heart,
  Star,
  Clock,
  Download,
  Share2
} from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

type Stage = "ideate" | "discover" | "define" | "design" | "develop"

const stages = [
  { id: "ideate" as Stage, name: "Ideate", icon: Lightbulb, color: "sky" },
  { id: "discover" as Stage, name: "Discover", icon: Search, color: "violet" },
  { id: "define" as Stage, name: "Define", icon: FileText, color: "teal" },
  { id: "design" as Stage, name: "Design", icon: Palette, color: "purple" },
  { id: "develop" as Stage, name: "Develop", icon: Code, color: "amber" },
]

const stageColors = {
  sky: { bg: "bg-sky-500/10", text: "text-sky-400", border: "border-sky-500/20", solid: "bg-sky-500" },
  violet: { bg: "bg-violet-500/10", text: "text-violet-400", border: "border-violet-500/20", solid: "bg-violet-500" },
  teal: { bg: "bg-teal-500/10", text: "text-teal-400", border: "border-teal-500/20", solid: "bg-teal-500" },
  purple: { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/20", solid: "bg-purple-500" },
  amber: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/20", solid: "bg-amber-500" },
}

// Typing animation component
function TypingText({ text, speed = 30, className, onComplete }: { text: string, speed?: number, className?: string, onComplete?: () => void }) {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    setDisplayedText("")
    setCurrentIndex(0)
  }, [text])

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, speed)
      return () => clearTimeout(timeout)
    } else if (onComplete) {
      onComplete()
    }
  }, [currentIndex, text, speed, onComplete])

  return (
    <span className={className}>
      {displayedText}
      {currentIndex < text.length && <span className="animate-pulse">|</span>}
    </span>
  )
}

// Animated counter
function AnimatedNumber({ value, duration = 1000 }: { value: number, duration?: number }) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    let startTime: number
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      setDisplayValue(Math.floor(progress * value))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [value, duration])

  return <span>{displayValue.toLocaleString()}</span>
}

// Create New Modal Component
function CreateNewModal({ isOpen, onClose, onSubmit }: { isOpen: boolean, onClose: () => void, onSubmit: (idea: string) => void }) {
  const [idea, setIdea] = useState("")

  if (!isOpen) return null

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-[90%] max-w-lg bg-card dark:bg-[#101012] rounded-xl border border-border/50 dark:border-white/[0.08] shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border/50 dark:border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <Plus className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground dark:text-white">Create New Project</h3>
              <p className="text-xs text-muted-foreground dark:text-white/40">Describe your product idea</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-muted dark:hover:bg-white/[0.04] transition-colors"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Textarea */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground dark:text-white/50">What do you want to build?</label>
            <textarea
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="E.g., A mobile app for fitness tracking with AI-powered workout recommendations..."
              className="w-full h-24 px-3 py-2.5 rounded-lg border border-border/50 dark:border-white/[0.08] bg-muted/30 dark:bg-white/[0.02] text-sm text-foreground dark:text-white placeholder:text-muted-foreground/50 resize-none outline-none focus:border-violet-500/50 transition-colors"
            />
          </div>

          {/* Quick suggestions */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground dark:text-white/50">Or try one of these</label>
            <div className="flex flex-wrap gap-2">
              {[
                "AI voice cloning platform",
                "SaaS analytics dashboard",
                "E-commerce marketplace",
                "Project management tool",
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setIdea(suggestion)}
                  className="px-2.5 py-1.5 rounded-lg text-xs bg-muted/50 dark:bg-white/[0.04] text-foreground/70 dark:text-white/60 hover:bg-muted dark:hover:bg-white/[0.08] transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          {/* Model selector */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 dark:bg-white/[0.02] border border-border/50 dark:border-white/[0.06]">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-violet-400" />
              <span className="text-sm text-foreground dark:text-white">Claude Sonnet 4</span>
            </div>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-border/50 dark:border-white/[0.06] bg-muted/20 dark:bg-white/[0.01]">
          <button 
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={() => { onSubmit(idea); onClose(); }}
            disabled={!idea.trim()}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Start Building
          </button>
        </div>
      </motion.div>
    </div>
  )
}

// Rich Product Preview Component (for Develop stage) - Immediately visible
function ProductPreview() {
  return (
    <div className="h-full flex flex-col bg-[#0c0c0d] rounded-lg overflow-hidden border border-white/[0.08]">
      {/* App header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-white/[0.06] bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
            <Bot className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-xs font-semibold text-white">VoiceAI Studio</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-3 flex flex-col gap-2 overflow-hidden">
        {/* Voice cards */}
        <div className="grid grid-cols-3 gap-1.5">
          {[
            { name: "Emma", accent: "US English", color: "from-pink-500 to-rose-500", selected: true },
            { name: "James", accent: "British", color: "from-blue-500 to-indigo-500", selected: false },
            { name: "Aria", accent: "Australian", color: "from-violet-500 to-purple-500", selected: false },
          ].map((voice) => (
            <div
              key={voice.name}
              className={cn(
                "p-2 rounded-lg border transition-all",
                voice.selected 
                  ? "bg-violet-500/10 border-violet-500/30" 
                  : "bg-white/[0.02] border-white/[0.06] hover:border-white/[0.12]"
              )}
            >
              <div className={cn("w-6 h-6 rounded-full bg-gradient-to-br mb-1.5", voice.color)} />
              <div className="text-[10px] font-medium text-white">{voice.name}</div>
              <div className="text-[8px] text-white/40">{voice.accent}</div>
            </div>
          ))}
        </div>

        {/* Waveform */}
        <div className="flex-1 rounded-lg bg-white/[0.02] border border-white/[0.06] p-3 flex items-center justify-center">
          <div className="flex items-center gap-0.5 h-10">
            {[...Array(32)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                  height: [4, Math.random() * 28 + 8, 4],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.04,
                }}
                className="w-1 bg-gradient-to-t from-violet-500 to-purple-400 rounded-full"
              />
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3">
          <button className="w-8 h-8 rounded-full bg-white/[0.04] flex items-center justify-center hover:bg-white/[0.08] transition-colors">
            <Download className="w-3.5 h-3.5 text-white/60" />
          </button>
          <button className="w-10 h-10 rounded-full bg-gradient-to-r from-violet-500 to-purple-600 flex items-center justify-center">
            <Play className="w-4 h-4 text-white ml-0.5" />
          </button>
          <button className="w-8 h-8 rounded-full bg-white/[0.04] flex items-center justify-center hover:bg-white/[0.08] transition-colors">
            <Share2 className="w-3.5 h-3.5 text-white/60" />
          </button>
        </div>

        {/* Input */}
        <div className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.03] border border-white/[0.06]">
          <Mic className="w-4 h-4 text-violet-400" />
          <span className="flex-1 text-[10px] text-white/40">Type or speak your text...</span>
          <Send className="w-4 h-4 text-violet-400" />
        </div>
      </div>
    </div>
  )
}

export function InteractiveDashboard() {
  const [activeStage, setActiveStage] = useState<Stage>("design")
  const [ideateStep, setIdeateStep] = useState(0)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const currentStage = stages.find(s => s.id === activeStage)!
  const colors = stageColors[currentStage.color as keyof typeof stageColors]

  // Reset ideate animation when switching to ideate
  useEffect(() => {
    if (activeStage === "ideate") {
      setIdeateStep(0)
      const timer1 = setTimeout(() => setIdeateStep(1), 500)
      const timer2 = setTimeout(() => setIdeateStep(2), 2500)
      const timer3 = setTimeout(() => setIdeateStep(3), 4500)
      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
        clearTimeout(timer3)
      }
    }
  }, [activeStage])

  const projectName = "VoiceAI Studio"
  const projectIdea = "Create an AI voice cloning platform where creators can generate realistic voiceovers in multiple languages and accents"

  const handleCreateSubmit = (idea: string) => {
    setActiveStage("ideate")
  }

  return (
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
      {/* Create New Modal */}
      <CreateNewModal 
        isOpen={showCreateModal} 
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateSubmit}
      />

      <div className="flex h-[520px] sm:h-[580px] lg:h-[620px]">
        {/* Sidebar */}
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
              <button 
                onClick={() => setShowCreateModal(true)}
                className="flex-1 h-9 rounded-lg bg-foreground dark:bg-white text-background dark:text-black text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Create New
              </button>
              <button className="h-9 w-9 rounded-lg border border-border dark:border-white/10 flex items-center justify-center hover:bg-muted dark:hover:bg-white/[0.04] transition-colors">
                <Search className="w-4 h-4 text-muted-foreground dark:text-white/50" />
              </button>
            </div>
          </div>
          
          {/* Stages */}
          <div className="px-3 py-2">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground/70 dark:text-white/30 font-medium mb-2 px-2">Stages</div>
            <nav className="space-y-0.5">
              {stages.map((stage) => {
                const isActive = activeStage === stage.id
                const stageColor = stageColors[stage.color as keyof typeof stageColors]
                return (
                  <button 
                    key={stage.id}
                    onClick={() => setActiveStage(stage.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-2 py-2 rounded-md text-sm transition-all duration-200 cursor-pointer",
                      isActive 
                        ? `${stageColor.bg} ${stageColor.text} font-medium` 
                        : "text-foreground/70 dark:text-white/60 hover:bg-muted dark:hover:bg-white/[0.04]"
                    )}
                  >
                    <stage.icon className={cn("w-4 h-4", isActive ? stageColor.text : `text-${stage.color}-500 dark:text-${stage.color}-400`)} />
                    <span>{stage.name}</span>
                    {isActive && (
                      <div className={cn("ml-auto w-1.5 h-1.5 rounded-full", stageColor.solid)} />
                    )}
                  </button>
                )
              })}
            </nav>
          </div>
          
          {/* Bottom section */}
          <div className="mt-auto p-3 border-t border-border/50 dark:border-white/[0.06]">
            {/* Credits */}
            <div className="px-2 py-2 rounded-lg bg-muted/50 dark:bg-white/[0.02] border border-border/50 dark:border-white/[0.04] mb-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground/70 dark:text-white/30 font-medium">Credits</span>
                <span className="text-sm font-semibold text-foreground dark:text-white">50</span>
              </div>
              <div className="h-1.5 rounded-full bg-muted dark:bg-white/[0.06] overflow-hidden">
                <div className="h-full w-1/2 rounded-full bg-gradient-to-r from-sky-500 to-violet-500" />
              </div>
            </div>
            
            {/* User */}
            <div className="flex items-center gap-2.5 px-2">
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
        
        {/* Main content */}
        <div className="flex-1 flex flex-col bg-background dark:bg-[#0a0a0b] overflow-hidden">
          {/* Top bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-border/50 dark:border-white/[0.06]">
            <div className="flex items-center gap-3">
              <span className={cn("px-2 py-1 rounded-md text-xs font-medium", colors.bg, colors.text)}>
                {currentStage.name}
              </span>
              <span className="text-sm font-medium text-foreground dark:text-white hidden sm:inline">{projectName}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-500 text-xs">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>AI Active</span>
              </div>
            </div>
          </div>
          
          {/* Stage content */}
          <div className="flex-1 p-4 sm:p-5 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStage}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                {/* ===== IDEATE STAGE ===== */}
                {activeStage === "ideate" && (
                  <div className="h-full flex flex-col">
                    <div className="flex-1 rounded-xl border border-border/50 dark:border-white/[0.06] bg-muted/10 dark:bg-white/[0.01] p-4 flex flex-col">
                      <div className="flex-1 space-y-4 overflow-hidden">
                        {/* User message */}
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: ideateStep >= 1 ? 1 : 0, x: ideateStep >= 1 ? 0 : 20 }}
                          className="flex items-start gap-3 justify-end"
                        >
                          <div className="max-w-[85%] p-3 rounded-xl bg-sky-500/10 border border-sky-500/20">
                            <p className="text-sm text-foreground dark:text-white">
                              {ideateStep >= 1 && (
                                <TypingText text={projectIdea} speed={18} />
                              )}
                            </p>
                          </div>
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                            H
                          </div>
                        </motion.div>

                        {/* AI Response */}
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: ideateStep >= 2 ? 1 : 0, x: ideateStep >= 2 ? 0 : -20 }}
                          className="flex items-start gap-3"
                        >
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                            <Sparkles className="w-4 h-4 text-white" />
                          </div>
                          <div className="max-w-[85%] p-4 rounded-xl bg-muted/50 dark:bg-white/[0.03] border border-border/50 dark:border-white/[0.06]">
                            {ideateStep >= 2 && (
                              <div className="space-y-3 text-sm">
                                <TypingText 
                                  text="This is a brilliant idea with huge market potential! Here's my analysis:"
                                  speed={12}
                                  className="text-foreground dark:text-white"
                                />
                                {ideateStep >= 3 && (
                                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2 mt-3">
                                    <div className="flex items-center gap-2 text-emerald-400">
                                      <Check className="w-4 h-4" /><span>$2.4B market by 2027 (Voice AI)</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-emerald-400">
                                      <Check className="w-4 h-4" /><span>Creator economy = 50M+ users</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sky-400">
                                      <Zap className="w-4 h-4" /><span>Differentiator: Multi-language + accent control</span>
                                    </div>
                                    <div className="mt-3 p-2 rounded-lg bg-sky-500/10 border border-sky-500/20">
                                      <button onClick={() => setActiveStage("discover")} className="text-sky-400 text-xs font-medium flex items-center gap-1 hover:gap-2 transition-all">
                                        → Proceed to Discovery <ChevronRight className="w-3 h-3" />
                                      </button>
                                    </div>
                                  </motion.div>
                                )}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      </div>

                      {/* Input */}
                      <div className="mt-4 flex items-center gap-2 p-3 rounded-lg border border-border/50 dark:border-white/[0.08] bg-muted/30 dark:bg-white/[0.02]">
                        <input type="text" placeholder="Refine your idea..." className="flex-1 bg-transparent text-sm text-foreground dark:text-white placeholder:text-muted-foreground/50 outline-none" />
                        <button className="px-3 py-1.5 rounded-md bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium flex items-center gap-1 transition-colors">
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* ===== DISCOVER STAGE ===== */}
                {activeStage === "discover" && (
                  <div className="h-full grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="lg:col-span-2 space-y-4">
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { label: "TAM", value: 2.4, prefix: "$", suffix: "B", color: "violet" },
                          { label: "Competitors", value: 8, prefix: "", suffix: "", color: "sky" },
                          { label: "Opportunity", value: 9.1, prefix: "", suffix: "/10", color: "emerald" },
                        ].map((stat, i) => (
                          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="p-3 rounded-lg border border-border/50 dark:border-white/[0.06] bg-muted/20 dark:bg-white/[0.02]">
                            <div className="text-[10px] uppercase tracking-wider text-muted-foreground dark:text-white/40 mb-1">{stat.label}</div>
                            <div className={cn("text-xl font-bold", `text-${stat.color}-400`)}>
                              {stat.prefix}<AnimatedNumber value={stat.value * 10} />{stat.value % 1 !== 0 ? `.${Math.round((stat.value % 1) * 10)}` : ''}{stat.suffix}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      <div className="p-4 rounded-lg border border-border/50 dark:border-white/[0.06] bg-muted/10 dark:bg-white/[0.01]">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-medium text-foreground dark:text-white">Competitor Analysis</span>
                          <span className="text-[10px] text-violet-400">Live Research</span>
                        </div>
                        <div className="space-y-2">
                          {[
                            { name: "ElevenLabs", price: "$22/mo", users: "1M+", gap: "No accent control" },
                            { name: "Murf.ai", price: "$29/mo", users: "500K", gap: "Limited languages" },
                            { name: "Play.ht", price: "$39/mo", users: "300K", gap: "No voice cloning" },
                          ].map((comp, i) => (
                            <motion.div key={comp.name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.1 }} className="flex items-center justify-between p-2 rounded-md bg-muted/30 dark:bg-white/[0.02] text-xs">
                              <span className="font-medium text-foreground dark:text-white">{comp.name}</span>
                              <span className="text-muted-foreground">{comp.price}</span>
                              <span className="text-muted-foreground">{comp.users}</span>
                              <span className="text-amber-400">{comp.gap}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="text-xs font-medium text-muted-foreground dark:text-white/40 uppercase tracking-wider">Key Insights</div>
                      {[
                        { icon: Target, title: "Market Gap", desc: "Multi-accent voice cloning for creators", color: "violet" },
                        { icon: TrendingUp, title: "Growth Vector", desc: "YouTube, TikTok, podcast creators", color: "emerald" },
                        { icon: Users, title: "ICP Match", desc: "Content creators, agencies, educators", color: "sky" },
                      ].map((insight, i) => (
                        <motion.div key={insight.title} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.15 }} className={cn("p-3 rounded-lg border", `bg-${insight.color}-500/5 border-${insight.color}-500/20`)}>
                          <div className="flex items-center gap-2 mb-1">
                            <insight.icon className={cn("w-4 h-4", `text-${insight.color}-400`)} />
                            <span className={cn("text-sm font-medium", `text-${insight.color}-400`)}>{insight.title}</span>
                          </div>
                          <p className="text-xs text-muted-foreground dark:text-white/60">{insight.desc}</p>
                        </motion.div>
                      ))}
                      <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} onClick={() => setActiveStage("define")} className="w-full mt-2 p-2 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-medium flex items-center justify-center gap-1 hover:bg-violet-500/20 transition-colors">
                        Continue to Define <ChevronRight className="w-3 h-3" />
                      </motion.button>
                    </div>
                  </div>
                )}

                {/* ===== DEFINE STAGE ===== */}
                {activeStage === "define" && (
                  <div className="h-full grid grid-cols-1 lg:grid-cols-5 gap-4">
                    <div className="lg:col-span-2 space-y-2">
                      <div className="text-xs font-medium text-muted-foreground dark:text-white/40 uppercase tracking-wider mb-2">PRD Sections</div>
                      {[
                        { name: "Executive Summary", status: "complete" },
                        { name: "Problem Statement", status: "complete" },
                        { name: "User Personas", status: "complete" },
                        { name: "Feature List", status: "active" },
                        { name: "Technical Spec", status: "pending" },
                      ].map((section, i) => (
                        <motion.div key={section.name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }} className={cn("flex items-center gap-3 p-2 rounded-md text-sm transition-colors", section.status === "active" ? "bg-teal-500/10 text-teal-400" : section.status === "complete" ? "text-emerald-400" : "text-muted-foreground/50")}>
                          {section.status === "complete" ? <Check className="w-4 h-4" /> : section.status === "active" ? <FileText className="w-4 h-4" /> : <div className="w-4 h-4 rounded-full border border-current" />}
                          <span>{section.name}</span>
                          {section.status === "active" && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />}
                        </motion.div>
                      ))}
                      <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} onClick={() => setActiveStage("design")} className="w-full mt-3 p-2 rounded-lg bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-medium flex items-center justify-center gap-1 hover:bg-teal-500/20 transition-colors">
                        Continue to Design <ChevronRight className="w-3 h-3" />
                      </motion.button>
                    </div>
                    <div className="lg:col-span-3 p-4 rounded-lg border border-border/50 dark:border-white/[0.06] bg-muted/10 dark:bg-white/[0.01]">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-medium text-foreground dark:text-white">Core Features</span>
                        <span className="text-xs text-teal-400">6 features defined</span>
                      </div>
                      <div className="space-y-2">
                        {[
                          { name: "Voice cloning from samples", priority: "P0", effort: "5d" },
                          { name: "Multi-language support (20+)", priority: "P0", effort: "4d" },
                          { name: "Accent customization", priority: "P0", effort: "3d" },
                          { name: "Real-time preview", priority: "P1", effort: "2d" },
                          { name: "API for developers", priority: "P1", effort: "4d" },
                          { name: "Team collaboration", priority: "P2", effort: "3d" },
                        ].map((feature, i) => (
                          <motion.div key={feature.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.08 }} className="flex items-center justify-between p-2 rounded-md bg-muted/30 dark:bg-white/[0.02] text-sm">
                            <div className="flex items-center gap-2">
                              <Check className="w-3.5 h-3.5 text-teal-400" />
                              <span className="text-foreground dark:text-white">{feature.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={cn("px-1.5 py-0.5 rounded text-[10px] font-medium", feature.priority === "P0" ? "bg-red-500/10 text-red-400" : feature.priority === "P1" ? "bg-amber-500/10 text-amber-400" : "bg-slate-500/10 text-slate-400")}>{feature.priority}</span>
                              <span className="text-xs text-muted-foreground">{feature.effort}</span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ===== DESIGN STAGE - RICH UI GRID ===== */}
                {activeStage === "design" && (
                  <div className="h-full flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Generating UI for</span>
                        <span className="text-sm font-medium text-purple-400">{projectName}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-emerald-400">6/6 screens ready</span>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      </div>
                    </div>

                    {/* Rich Grid of screen designs */}
                    <div className="flex-1 grid grid-cols-2 lg:grid-cols-3 gap-2.5 overflow-hidden">
                      {[
                        { 
                          name: "Dashboard", 
                          icon: Home,
                          content: (
                            <div className="space-y-1">
                              <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center gap-1">
                                  <div className="w-3 h-3 rounded bg-gradient-to-br from-violet-500 to-purple-600" />
                                  <div className="w-8 h-1.5 rounded bg-white/20" />
                                </div>
                                <div className="w-4 h-4 rounded-full bg-emerald-500/30" />
                              </div>
                              <div className="grid grid-cols-3 gap-1">
                                {[
                                  { value: "$12.4k", label: "Revenue", color: "emerald" },
                                  { value: "2,847", label: "Users", color: "sky" },
                                  { value: "94%", label: "Happy", color: "violet" },
                                ].map((stat) => (
                                  <div key={stat.label} className="p-1 rounded bg-white/[0.04]">
                                    <div className={cn("text-[8px] font-bold", `text-${stat.color}-400`)}>{stat.value}</div>
                                    <div className="text-[6px] text-white/30">{stat.label}</div>
                                  </div>
                                ))}
                              </div>
                              <div className="h-8 rounded bg-gradient-to-r from-violet-500/20 to-purple-500/10 flex items-end p-1 gap-0.5">
                                {[40, 65, 45, 80, 55, 70, 90, 60, 75, 85].map((h, i) => (
                                  <div key={i} className="flex-1 bg-violet-400/60 rounded-t" style={{ height: `${h}%` }} />
                                ))}
                              </div>
                            </div>
                          )
                        },
                        { 
                          name: "Voice Library", 
                          icon: Mic,
                          content: (
                            <div className="space-y-1">
                              <div className="flex items-center gap-1 mb-1">
                                <Search className="w-2.5 h-2.5 text-white/30" />
                                <div className="flex-1 h-3 rounded bg-white/[0.04]" />
                              </div>
                              <div className="grid grid-cols-3 gap-1">
                                {[
                                  { color: "from-pink-500 to-rose-500", name: "Emma" },
                                  { color: "from-blue-500 to-indigo-500", name: "James" },
                                  { color: "from-violet-500 to-purple-500", name: "Aria" },
                                  { color: "from-amber-500 to-orange-500", name: "Max" },
                                  { color: "from-emerald-500 to-teal-500", name: "Sophie" },
                                  { color: "from-cyan-500 to-blue-500", name: "Oliver" },
                                ].map((voice) => (
                                  <div key={voice.name} className="p-1 rounded bg-white/[0.03] flex flex-col items-center">
                                    <div className={cn("w-4 h-4 rounded-full bg-gradient-to-br mb-0.5", voice.color)} />
                                    <div className="text-[6px] text-white/60">{voice.name}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )
                        },
                        { 
                          name: "Studio", 
                          icon: Video,
                          content: (
                            <div className="space-y-1.5">
                              <div className="flex items-center gap-1">
                                {["Emma", "US"].map((tag) => (
                                  <span key={tag} className="px-1 py-0.5 rounded text-[6px] bg-violet-500/20 text-violet-300">{tag}</span>
                                ))}
                              </div>
                              <div className="h-8 rounded bg-white/[0.03] flex items-center justify-center px-1">
                                <div className="flex items-center gap-0.5 w-full">
                                  {[...Array(20)].map((_, i) => (
                                    <div key={i} className="flex-1 bg-gradient-to-t from-violet-500 to-purple-400 rounded-full" style={{ height: `${Math.random() * 16 + 4}px` }} />
                                  ))}
                                </div>
                              </div>
                              <div className="flex items-center justify-center gap-2">
                                <div className="w-4 h-4 rounded-full bg-white/[0.06]" />
                                <div className="w-5 h-5 rounded-full bg-violet-500 flex items-center justify-center">
                                  <Play className="w-2 h-2 text-white" />
                                </div>
                                <div className="w-4 h-4 rounded-full bg-white/[0.06]" />
                              </div>
                            </div>
                          )
                        },
                        { 
                          name: "Projects", 
                          icon: Layers,
                          content: (
                            <div className="space-y-1">
                              {[
                                { name: "Podcast Intro", time: "2m ago", color: "violet" },
                                { name: "YouTube Script", time: "1h ago", color: "blue" },
                                { name: "Ad Voiceover", time: "3h ago", color: "amber" },
                                { name: "Audiobook Ch1", time: "1d ago", color: "emerald" },
                              ].map((project) => (
                                <div key={project.name} className="flex items-center gap-1.5 p-1 rounded bg-white/[0.02]">
                                  <div className={cn("w-1.5 h-1.5 rounded-full", `bg-${project.color}-400`)} />
                                  <div className="flex-1">
                                    <div className="text-[7px] text-white/80">{project.name}</div>
                                  </div>
                                  <div className="text-[6px] text-white/30">{project.time}</div>
                                </div>
                              ))}
                            </div>
                          )
                        },
                        { 
                          name: "Analytics", 
                          icon: BarChart3,
                          content: (
                            <div className="space-y-1.5">
                              <div className="flex items-center justify-between">
                                <span className="text-[7px] text-white/50">Usage</span>
                                <span className="text-[7px] text-emerald-400">+24%</span>
                              </div>
                              <div className="h-10 flex items-end gap-0.5">
                                {[30, 50, 35, 70, 45, 80, 60, 90, 55, 75, 85, 95].map((h, i) => (
                                  <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-emerald-500/40 to-emerald-400/20" style={{ height: `${h}%` }} />
                                ))}
                              </div>
                              <div className="grid grid-cols-2 gap-1">
                                <div className="p-1 rounded bg-white/[0.03] text-center">
                                  <div className="text-[8px] font-bold text-sky-400">847</div>
                                  <div className="text-[5px] text-white/30">Generations</div>
                                </div>
                                <div className="p-1 rounded bg-white/[0.03] text-center">
                                  <div className="text-[8px] font-bold text-violet-400">12.4h</div>
                                  <div className="text-[5px] text-white/30">Audio</div>
                                </div>
                              </div>
                            </div>
                          )
                        },
                        { 
                          name: "Settings", 
                          icon: Settings,
                          content: (
                            <div className="space-y-1.5">
                              {[
                                { label: "HD Quality", enabled: true },
                                { label: "Auto-save", enabled: true },
                                { label: "Notifications", enabled: false },
                                { label: "API Access", enabled: true },
                              ].map((setting) => (
                                <div key={setting.label} className="flex items-center justify-between p-1 rounded bg-white/[0.02]">
                                  <span className="text-[7px] text-white/60">{setting.label}</span>
                                  <div className={cn("w-5 h-2.5 rounded-full flex items-center px-0.5", setting.enabled ? "bg-violet-500" : "bg-white/10")}>
                                    <div className={cn("w-1.5 h-1.5 rounded-full bg-white transition-transform", setting.enabled ? "translate-x-2" : "")} />
                                  </div>
                                </div>
                              ))}
                            </div>
                          )
                        },
                      ].map((screen, i) => (
                        <motion.div
                          key={screen.name}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.08 }}
                          className="rounded-lg border border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-transparent overflow-hidden group hover:border-purple-500/40 transition-colors cursor-pointer"
                        >
                          <div className="p-2 bg-[#0c0c0d] h-full flex flex-col">
                            <div className="flex items-center gap-1.5 mb-1.5 pb-1.5 border-b border-white/[0.06]">
                              <div className="flex gap-0.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-500/60" />
                                <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/60" />
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500/60" />
                              </div>
                              <div className="flex-1" />
                              <screen.icon className="w-2.5 h-2.5 text-purple-400" />
                            </div>
                            <div className="flex-1">{screen.content}</div>
                          </div>
                          <div className="px-2 py-1 bg-white/[0.02] border-t border-white/[0.06] flex items-center justify-between">
                            <span className="text-[9px] font-medium text-white/80">{screen.name}</span>
                            <Check className="w-3 h-3 text-emerald-400" />
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} onClick={() => setActiveStage("develop")} className="w-full p-2.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium flex items-center justify-center gap-2 hover:bg-purple-500/20 transition-colors">
                      Generate Code <Code className="w-4 h-4" />
                    </motion.button>
                  </div>
                )}

                {/* ===== DEVELOP STAGE ===== */}
                {activeStage === "develop" && (
                  <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-3">
                      <div className="flex-1 rounded-lg bg-[#0d0d0e] border border-white/[0.06] overflow-hidden font-mono text-xs">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-white/[0.02] border-b border-white/[0.06]">
                          <div className="flex items-center gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                          </div>
                          <span className="text-white/40 ml-2">terminal</span>
                        </div>
                        <div className="p-3 space-y-1 text-[11px]">
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-white/60">$ npx create-next-app voiceai-studio</motion.div>
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-emerald-400">✓ Created project structure</motion.div>
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-emerald-400">✓ Installing dependencies (47 packages)</motion.div>
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="text-emerald-400">✓ Generating components from designs</motion.div>
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="text-emerald-400">✓ Adding API routes & database schema</motion.div>
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className="text-sky-400">ℹ Running tests... 24/24 passed</motion.div>
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }} className="text-emerald-400">✓ Build complete in 2.4s</motion.div>
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="text-white/60">$ <span className="animate-pulse">_</span></motion.div>
                        </div>
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        {[{ label: "Files", value: "47" }, { label: "Tests", value: "24" }, { label: "Coverage", value: "94%" }, { label: "Size", value: "142KB" }].map((stat, i) => (
                          <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 + i * 0.1 }} className="p-2 rounded-lg border border-border/50 dark:border-white/[0.06] bg-muted/20 dark:bg-white/[0.02] text-center">
                            <div className="text-sm font-bold text-foreground dark:text-white">{stat.value}</div>
                            <div className="text-[9px] text-muted-foreground uppercase">{stat.label}</div>
                          </motion.div>
                        ))}
                      </div>
                      <button className="w-full py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-sm font-medium flex items-center justify-center gap-2 transition-colors">
                        <svg className="w-4 h-4" viewBox="0 0 76 65" fill="currentColor"><path d="M37.5274 0L75.0548 65H0L37.5274 0Z" /></svg>
                        Deploy to Vercel
                      </button>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4 text-emerald-400" />
                          <span className="text-sm font-medium text-emerald-400">Live Preview</span>
                        </div>
                        <span className="text-xs text-muted-foreground">localhost:3000</span>
                      </div>
                      <div className="flex-1 rounded-xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-transparent p-1">
                        <ProductPreview />
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
