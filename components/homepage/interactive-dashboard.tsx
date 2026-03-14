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
  Target,
  Users,
  BarChart3,
  Layers,
  Play,
  Terminal,
  TrendingUp,
  Settings,
  ChevronRight,
  Zap,
  Globe,
  Mic,
  Video,
  Plus,
  ChevronDown,
  Clock,
  Download,
  Share2,
  Send,
  Home,
  Bot
} from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { AnimatedLogo } from "@/components/animated-logo"

type Stage = "home" | "ideate" | "discover" | "define" | "design" | "develop"

// Stages with subtle brand colors
const stages = [
  { id: "ideate" as Stage, name: "Ideate", icon: Lightbulb, accent: "sky", accentClass: "text-sky-400", bgClass: "bg-sky-500/10", borderClass: "border-sky-500/20" },
  { id: "discover" as Stage, name: "Discover", icon: Search, accent: "violet", accentClass: "text-violet-400", bgClass: "bg-violet-500/10", borderClass: "border-violet-500/20" },
  { id: "define" as Stage, name: "Define", icon: FileText, accent: "teal", accentClass: "text-teal-400", bgClass: "bg-teal-500/10", borderClass: "border-teal-500/20" },
  { id: "design" as Stage, name: "Design", icon: Palette, accent: "purple", accentClass: "text-purple-400", bgClass: "bg-purple-500/10", borderClass: "border-purple-500/20" },
  { id: "develop" as Stage, name: "Develop", icon: Code, accent: "amber", accentClass: "text-amber-400", bgClass: "bg-amber-500/10", borderClass: "border-amber-500/20" },
]

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

// Starting Screen Component
function StartingScreen({ onStartProject }: { onStartProject: (idea: string) => void }) {
  const [idea, setIdea] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [typingComplete, setTypingComplete] = useState(false)
  
  const demoPrompt = "Create an AI voice cloning platform where creators can generate realistic voiceovers in multiple languages and accents."

  useEffect(() => {
    if (!isTyping) return
    
    let currentIndex = 0
    const typingInterval = setInterval(() => {
      if (currentIndex < demoPrompt.length) {
        setIdea(demoPrompt.slice(0, currentIndex + 1))
        currentIndex++
      } else {
        clearInterval(typingInterval)
        setIsTyping(false)
        setTypingComplete(true)
      }
    }, 35)

    return () => clearInterval(typingInterval)
  }, [isTyping])

  const quickActions = [
    { icon: Search, label: "Research a market" },
    { icon: FileText, label: "Write a PRD" },
    { icon: Clock, label: "Create roadmap" },
    { icon: BarChart3, label: "Analyze competitors" },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIdea(e.target.value)
    setIsTyping(false)
    setTypingComplete(e.target.value.length > 0)
  }

  return (
    <div className="h-full flex flex-col items-center justify-center px-4 sm:px-8">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-center mb-2">
        What would you like to build?
      </h1>
      <p className="text-sm sm:text-base text-white/50 text-center mb-6">
        AI-native product development from idea to launch
      </p>

      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {quickActions.map((action) => (
          <button
            key={action.label}
            onClick={() => {
              setIdea(action.label.toLowerCase())
              setIsTyping(false)
              setTypingComplete(true)
            }}
            className="flex items-center gap-2 px-3 py-2 rounded-full border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05] transition-colors text-sm text-white/70"
          >
            <action.icon className="w-4 h-4 text-white/40" />
            <span>{action.label}</span>
          </button>
        ))}
      </div>

      <div className="w-full max-w-2xl">
        <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-3">
          <div className="relative">
            <div className="w-full h-16 text-sm text-white">
              {idea}
              {(isTyping || typingComplete) && (
                <span className="animate-blink text-white font-normal">|</span>
              )}
            </div>
            <textarea
              value={idea}
              onChange={handleInputChange}
              placeholder="Describe your product idea..."
              className="absolute inset-0 w-full h-16 bg-transparent text-sm text-transparent caret-transparent resize-none outline-none"
              style={{ caretColor: 'transparent' }}
            />
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-white/[0.04]">
            <div className="flex items-center gap-2">
              <Plus className="w-4 h-4 text-white/30" />
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-white/[0.03] cursor-pointer transition-colors">
                <Sparkles className="w-4 h-4 text-amber-400/60" />
                <span className="text-sm text-white/70">Claude Sonnet 4.6</span>
                <ChevronDown className="w-3 h-3 text-white/30" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-md hover:bg-white/[0.03] transition-colors">
                <Settings className="w-4 h-4 text-white/30" />
              </button>
              <button 
                onClick={() => idea.trim() && onStartProject(idea)}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-md transition-all text-sm font-medium",
                  typingComplete 
                    ? "bg-white text-black hover:bg-white/90" 
                    : "bg-white/[0.06] text-white hover:bg-white/[0.08]"
                )}
              >
                Send <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Product Preview Component
function ProductPreview() {
  return (
    <div className="h-full flex flex-col bg-[#0c0c0d] rounded-lg overflow-hidden border border-white/[0.06]">
      <div className="flex items-center justify-between px-3 py-2 border-b border-white/[0.04] bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-violet-500/30 to-purple-500/30 flex items-center justify-center">
            <Bot className="w-3.5 h-3.5 text-violet-400" />
          </div>
          <span className="text-xs font-semibold text-white">VoiceAI Studio</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
        </div>
      </div>

      <div className="flex-1 p-3 flex flex-col gap-2 overflow-hidden">
        <div className="grid grid-cols-3 gap-1.5">
          {[
            { name: "Emma", accent: "US English", selected: true },
            { name: "James", accent: "British", selected: false },
            { name: "Aria", accent: "Australian", selected: false },
          ].map((voice) => (
            <div
              key={voice.name}
              className={cn(
                "p-2 rounded-lg border transition-all",
                voice.selected 
                  ? "bg-violet-500/10 border-violet-500/20" 
                  : "bg-white/[0.02] border-white/[0.04] hover:border-white/[0.08]"
              )}
            >
              <div className={cn("w-6 h-6 rounded-full mb-1.5", voice.selected ? "bg-gradient-to-br from-violet-500/40 to-purple-500/40" : "bg-white/10")} />
              <div className="text-[10px] font-medium text-white">{voice.name}</div>
              <div className="text-[8px] text-white/40">{voice.accent}</div>
            </div>
          ))}
        </div>

        <div className="flex-1 rounded-lg bg-white/[0.02] border border-white/[0.04] p-3 flex items-center justify-center">
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
                className="w-1 bg-gradient-to-t from-violet-500/40 to-purple-400/30 rounded-full"
              />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-3">
          <button className="w-8 h-8 rounded-full bg-white/[0.04] flex items-center justify-center hover:bg-white/[0.06] transition-colors">
            <Download className="w-3.5 h-3.5 text-white/50" />
          </button>
          <button className="w-10 h-10 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 flex items-center justify-center hover:opacity-90 transition-opacity">
            <Play className="w-4 h-4 text-white ml-0.5" />
          </button>
          <button className="w-8 h-8 rounded-full bg-white/[0.04] flex items-center justify-center hover:bg-white/[0.06] transition-colors">
            <Share2 className="w-3.5 h-3.5 text-white/50" />
          </button>
        </div>

        <div className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02] border border-white/[0.04]">
          <Mic className="w-4 h-4 text-violet-400/60" />
          <span className="flex-1 text-[10px] text-white/30">Type or speak your text...</span>
          <Send className="w-4 h-4 text-violet-400/60" />
        </div>
      </div>
    </div>
  )
}

export function InteractiveDashboard() {
  const [activeStage, setActiveStage] = useState<Stage>("home")
  const [ideateStep, setIdeateStep] = useState(0)
  const currentStage = activeStage === "home" ? null : stages.find(s => s.id === activeStage)!

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

  const handleCreateNew = () => {
    setActiveStage("home")
  }

  const handleStartProject = (idea: string) => {
    setActiveStage("ideate")
  }

  return (
    <div className="relative">
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
        {/* Inner frame with slightly lighter bg */}
        <div className="relative rounded-xl overflow-hidden bg-[#0c0c0d]">
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
      <div className="flex h-[520px] sm:h-[580px] lg:h-[620px]">
        {/* Sidebar */}
        <div className="w-56 lg:w-64 border-r border-white/[0.04] bg-[#0f0f10] flex-shrink-0 hidden sm:flex flex-col">
          <div className="p-4 border-b border-white/[0.04]">
            <div className="flex items-center gap-2.5">
              <AnimatedLogo size={28} className="text-white" />
              <div>
                <div className="font-semibold text-sm text-white">ProductOS</div>
                <div className="text-[10px] text-white/40">Workspace</div>
              </div>
            </div>
          </div>
          
          <div className="p-3">
            <div className="flex items-center gap-2">
              <button 
                onClick={handleCreateNew}
                className="flex-1 h-9 rounded-lg bg-white text-black text-sm font-medium hover:bg-white/90 transition-opacity"
              >
                Create New
              </button>
              <button className="h-9 w-9 rounded-lg border border-white/[0.08] flex items-center justify-center hover:bg-white/[0.03] transition-colors">
                <Search className="w-4 h-4 text-white/50" />
              </button>
            </div>
          </div>
          
          <div className="px-3 py-2">
            <div className="text-[10px] uppercase tracking-wider text-white/30 font-medium mb-2 px-2">Stages</div>
            <nav className="space-y-0.5">
              {stages.map((stage) => {
                const isActive = activeStage === stage.id
                return (
                  <button 
                    key={stage.id}
                    onClick={() => setActiveStage(stage.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-2 py-2 rounded-md text-sm transition-all duration-200 cursor-pointer",
                      isActive 
                        ? cn(stage.bgClass, stage.accentClass, "font-medium") 
                        : "text-white/50 hover:bg-white/[0.03] hover:text-white/70"
                    )}
                  >
                    <stage.icon className={cn("w-4 h-4", isActive ? stage.accentClass : "text-white/40")} />
                    <span>{stage.name}</span>
                    {isActive && (
                      <div className={cn("ml-auto w-1.5 h-1.5 rounded-full", stage.accentClass.replace("text-", "bg-"))} />
                    )}
                  </button>
                )
              })}
            </nav>
          </div>
          
          <div className="mt-auto p-3 border-t border-white/[0.04]">
            <div className="px-2 py-2 rounded-lg bg-white/[0.02] border border-white/[0.04] mb-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase tracking-wider text-white/30 font-medium">Credits</span>
                <span className="text-sm font-semibold text-white">50</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                <div className="h-full w-1/2 rounded-full bg-gradient-to-r from-sky-500/50 to-violet-500/50" />
              </div>
            </div>
            
            <div className="flex items-center gap-2.5 px-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center text-xs font-bold text-amber-400/80">
                A
              </div>
              <div>
                <div className="text-sm text-white font-medium">Ariv</div>
                <div className="text-[10px] text-white/40">ariv@1labs.ai</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="flex-1 flex flex-col bg-[#0a0a0b] overflow-hidden">
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/[0.04]">
            <div className="flex items-center gap-3">
              {activeStage !== "home" && currentStage ? (
                <>
                  <span className={cn("px-2 py-1 rounded-md text-xs font-medium", currentStage.bgClass, currentStage.accentClass)}>
                    {currentStage.name}
                  </span>
                  <span className="text-sm font-medium text-white hidden sm:inline">{projectName}</span>
                </>
              ) : (
                <span className="text-sm font-medium text-white/50">New Project</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-xs">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>AI Active</span>
              </div>
            </div>
          </div>
          
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
                {/* HOME */}
                {activeStage === "home" && (
                  <StartingScreen onStartProject={handleStartProject} />
                )}

                {/* IDEATE */}
                {activeStage === "ideate" && (
                  <div className="h-full flex flex-col">
                    <div className="flex-1 rounded-xl border border-white/[0.04] bg-white/[0.01] p-4 flex flex-col">
                      <div className="flex-1 space-y-4 overflow-hidden">
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: ideateStep >= 1 ? 1 : 0, x: ideateStep >= 1 ? 0 : 20 }}
                          className="flex items-start gap-3 justify-end"
                        >
                          <div className="max-w-[85%] p-3 rounded-xl bg-sky-500/10 border border-sky-500/20">
                            <p className="text-sm text-white/80">
                              {ideateStep >= 1 && (
                                <TypingText text={projectIdea} speed={18} />
                              )}
                            </p>
                          </div>
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center text-xs font-bold text-amber-400/80 flex-shrink-0">
                            H
                          </div>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: ideateStep >= 2 ? 1 : 0, x: ideateStep >= 2 ? 0 : -20 }}
                          className="flex items-start gap-3"
                        >
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-500/20 to-blue-500/20 flex items-center justify-center flex-shrink-0">
                            <Sparkles className="w-4 h-4 text-sky-400" />
                          </div>
                          <div className="max-w-[85%] p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                            {ideateStep >= 2 && (
                              <div className="space-y-3 text-sm">
                                <TypingText 
                                  text="This is a brilliant idea with huge market potential! Here's my analysis:"
                                  speed={12}
                                  className="text-white/80"
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

                      <div className="mt-4 flex items-center gap-2 p-3 rounded-lg border border-white/[0.06] bg-white/[0.02]">
                        <input type="text" placeholder="Refine your idea..." className="flex-1 bg-transparent text-sm text-white placeholder:text-white/30 outline-none" />
                        <button className="px-3 py-1.5 rounded-md bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium flex items-center gap-1 transition-colors">
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    
                    {ideateStep >= 3 && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        className="mt-3 grid grid-cols-3 gap-2"
                      >
                        {[
                          { label: "Market Size", value: "$2.4B", icon: TrendingUp, accent: "emerald" },
                          { label: "Target Users", value: "50M+", icon: Users, accent: "sky" },
                          { label: "Confidence", value: "High", icon: Zap, accent: "amber" },
                        ].map((stat, i) => (
                          <div key={stat.label} className={cn("p-2.5 rounded-lg border bg-white/[0.02]", `border-${stat.accent}-500/20`)}>
                            <div className="flex items-center gap-1.5 mb-1">
                              <stat.icon className={cn("w-3 h-3", `text-${stat.accent}-400`)} />
                              <span className="text-[10px] text-white/40 uppercase">{stat.label}</span>
                            </div>
                            <div className={cn("text-sm font-semibold", `text-${stat.accent}-400`)}>{stat.value}</div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </div>
                )}

                {/* DISCOVER */}
                {activeStage === "discover" && (
                  <div className="h-full grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="lg:col-span-2 space-y-4">
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { label: "TAM", value: 2.4, prefix: "$", suffix: "B", accent: "violet" },
                          { label: "Competitors", value: 8, prefix: "", suffix: "", accent: "sky" },
                          { label: "Opportunity", value: 9.1, prefix: "", suffix: "/10", accent: "emerald" },
                        ].map((stat, i) => (
                          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className={cn("p-3 rounded-lg border bg-white/[0.02]", `border-${stat.accent}-500/20`)}>
                            <div className="text-[10px] uppercase tracking-wider text-white/40 mb-1">{stat.label}</div>
                            <div className={cn("text-xl font-bold", `text-${stat.accent}-400`)}>
                              {stat.prefix}<AnimatedNumber value={stat.value * 10} />{stat.value % 1 !== 0 ? `.${Math.round((stat.value % 1) * 10)}` : ''}{stat.suffix}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      <div className="p-4 rounded-lg border border-white/[0.04] bg-white/[0.01]">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-medium text-white">Competitor Analysis</span>
                          <span className="text-[10px] text-violet-400">Live Research</span>
                        </div>
                        <div className="space-y-2">
                          {[
                            { name: "ElevenLabs", price: "$22/mo", users: "1M+", gap: "No accent control" },
                            { name: "Murf.ai", price: "$29/mo", users: "500K", gap: "Limited languages" },
                            { name: "Play.ht", price: "$39/mo", users: "300K", gap: "No voice cloning" },
                          ].map((comp, i) => (
                            <motion.div key={comp.name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.1 }} className="flex items-center justify-between p-2 rounded-md bg-white/[0.02] text-xs">
                              <span className="font-medium text-white">{comp.name}</span>
                              <span className="text-white/50">{comp.price}</span>
                              <span className="text-white/50">{comp.users}</span>
                              <span className="text-amber-400">{comp.gap}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                      
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ delay: 0.6 }}
                        className="p-3 rounded-lg border border-white/[0.04] bg-white/[0.01]"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium text-white">Market Trends</span>
                          <span className="text-[10px] text-emerald-400">↑ Growing</span>
                        </div>
                        <div className="flex items-end gap-1 h-12">
                          {[25, 35, 30, 45, 55, 50, 65, 75, 70, 85, 90, 95].map((h, i) => (
                            <motion.div
                              key={i}
                              initial={{ height: 0 }}
                              animate={{ height: `${h}%` }}
                              transition={{ delay: 0.7 + i * 0.05, duration: 0.3 }}
                              className="flex-1 rounded-t bg-gradient-to-t from-violet-500/40 to-violet-400/20"
                            />
                          ))}
                        </div>
                        <div className="flex justify-between mt-1.5 text-[9px] text-white/30">
                          <span>2022</span>
                          <span>2027 (projected)</span>
                        </div>
                      </motion.div>
                    </div>
                    <div className="space-y-3">
                      <div className="text-xs font-medium text-white/40 uppercase tracking-wider">Key Insights</div>
                      {[
                        { icon: Target, title: "Market Gap", desc: "Multi-accent voice cloning for creators", accent: "violet" },
                        { icon: TrendingUp, title: "Growth Vector", desc: "YouTube, TikTok, podcast creators", accent: "emerald" },
                        { icon: Users, title: "ICP Match", desc: "Content creators, agencies, educators", accent: "sky" },
                      ].map((insight, i) => (
                        <motion.div key={insight.title} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.15 }} className={cn("p-3 rounded-lg border", `bg-${insight.accent}-500/5 border-${insight.accent}-500/20`)}>
                          <div className="flex items-center gap-2 mb-1">
                            <insight.icon className={cn("w-4 h-4", `text-${insight.accent}-400`)} />
                            <span className={cn("text-sm font-medium", `text-${insight.accent}-400`)}>{insight.title}</span>
                          </div>
                          <p className="text-xs text-white/50">{insight.desc}</p>
                        </motion.div>
                      ))}
                      <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} onClick={() => setActiveStage("define")} className="w-full mt-2 p-2 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-medium flex items-center justify-center gap-1 hover:bg-violet-500/20 transition-colors">
                        Continue to Define <ChevronRight className="w-3 h-3" />
                      </motion.button>
                    </div>
                  </div>
                )}

                {/* DEFINE */}
                {activeStage === "define" && (
                  <div className="h-full grid grid-cols-1 lg:grid-cols-5 gap-4">
                    <div className="lg:col-span-2 space-y-2">
                      <div className="text-xs font-medium text-white/40 uppercase tracking-wider mb-2">PRD Sections</div>
                      {[
                        { name: "Executive Summary", status: "complete" },
                        { name: "Problem Statement", status: "complete" },
                        { name: "User Personas", status: "complete" },
                        { name: "Feature List", status: "active" },
                        { name: "Technical Spec", status: "pending" },
                      ].map((section, i) => (
                        <motion.div key={section.name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }} className={cn("flex items-center gap-3 p-2 rounded-md text-sm transition-colors", section.status === "active" ? "bg-teal-500/10 text-teal-400" : section.status === "complete" ? "text-emerald-400" : "text-white/30")}>
                          {section.status === "complete" ? <Check className="w-4 h-4" /> : section.status === "active" ? <FileText className="w-4 h-4" /> : <div className="w-4 h-4 rounded-full border border-current" />}
                          <span>{section.name}</span>
                          {section.status === "active" && (
                            <div className="ml-auto w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
                          )}
                        </motion.div>
                      ))}
                      <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} onClick={() => setActiveStage("design")} className="w-full mt-3 p-2 rounded-lg bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-medium flex items-center justify-center gap-1 hover:bg-teal-500/20 transition-colors">
                        Continue to Design <ChevronRight className="w-3 h-3" />
                      </motion.button>
                    </div>
                    <div className="lg:col-span-3 flex flex-col gap-3">
                      <div className="p-4 rounded-lg border border-white/[0.04] bg-white/[0.01]">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-sm font-medium text-white">Core Features</span>
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
                            <motion.div key={feature.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.08 }} className="flex items-center justify-between p-2 rounded-md bg-white/[0.02] text-sm">
                              <div className="flex items-center gap-2">
                                <Check className="w-3.5 h-3.5 text-teal-400" />
                                <span className="text-white/80">{feature.name}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className={cn("px-1.5 py-0.5 rounded text-[10px] font-medium", feature.priority === "P0" ? "bg-red-500/10 text-red-400" : feature.priority === "P1" ? "bg-amber-500/10 text-amber-400" : "bg-white/[0.06] text-white/50")}>{feature.priority}</span>
                                <span className="text-xs text-white/40">{feature.effort}</span>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                      
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ delay: 0.7 }}
                        className="grid grid-cols-3 gap-2"
                      >
                        {[
                          { label: "Total Effort", value: "21 days", accent: "teal" },
                          { label: "P0 Features", value: "3", accent: "red" },
                          { label: "MVP Ready", value: "Week 3", accent: "emerald" },
                        ].map((stat) => (
                          <div key={stat.label} className={cn("p-2.5 rounded-lg border bg-white/[0.02]", `border-${stat.accent}-500/20`)}>
                            <div className="text-[10px] text-white/40 uppercase mb-0.5">{stat.label}</div>
                            <div className={cn("text-sm font-semibold", `text-${stat.accent}-400`)}>{stat.value}</div>
                          </div>
                        ))}
                      </motion.div>
                    </div>
                  </div>
                )}

                {/* DESIGN */}
                {activeStage === "design" && (
                  <div className="h-full flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-white/50">Generating UI for</span>
                        <span className="text-sm font-medium text-purple-400">{projectName}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-emerald-400">6/6 screens ready</span>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      </div>
                    </div>

                    <div className="flex-1 grid grid-cols-2 lg:grid-cols-3 gap-2.5 overflow-hidden">
                      {[
                        { name: "Dashboard", icon: Home },
                        { name: "Voice Library", icon: Mic },
                        { name: "Studio", icon: Video },
                        { name: "Projects", icon: Layers },
                        { name: "Analytics", icon: BarChart3 },
                        { name: "Settings", icon: Settings },
                      ].map((screen, i) => (
                        <motion.div
                          key={screen.name}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.08 }}
                          className="rounded-lg border border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-transparent overflow-hidden group hover:border-purple-500/40 transition-colors cursor-pointer"
                        >
                          <div className="p-2 bg-[#0c0c0d] h-full flex flex-col">
                            <div className="flex items-center gap-1.5 mb-1.5 pb-1.5 border-b border-white/[0.04]">
                              <div className="flex gap-0.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                                <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                                <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                              </div>
                              <div className="flex-1" />
                              <screen.icon className="w-2.5 h-2.5 text-purple-400" />
                            </div>
                            <div className="flex-1 space-y-1">
                              <div className="h-2 w-3/4 bg-white/10 rounded" />
                              <div className="h-2 w-1/2 bg-white/[0.06] rounded" />
                              <div className="h-6 w-full bg-purple-500/5 rounded mt-2" />
                              <div className="grid grid-cols-2 gap-1 mt-1">
                                <div className="h-4 bg-white/[0.04] rounded" />
                                <div className="h-4 bg-white/[0.04] rounded" />
                              </div>
                            </div>
                          </div>
                          <div className="px-2 py-1 bg-white/[0.02] border-t border-white/[0.04] flex items-center justify-between">
                            <span className="text-[9px] font-medium text-white/70">{screen.name}</span>
                            <Check className="w-3 h-3 text-emerald-400" />
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} onClick={() => setActiveStage("develop")} className="w-full p-2.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium flex items-center justify-center gap-2 hover:bg-purple-500/20 transition-colors">
                      Continue to Develop <ChevronRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                )}

                {/* DEVELOP */}
                {activeStage === "develop" && (
                  <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-3">
                      <div className="flex-1 rounded-lg bg-[#0d0d0e] border border-white/[0.04] overflow-hidden font-mono text-xs">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-white/[0.02] border-b border-white/[0.04]">
                          <div className="flex items-center gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                          </div>
                          <span className="text-white/40 ml-2">terminal</span>
                        </div>
                        <div className="p-3 space-y-1 text-[11px]">
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-white/50">$ npx create-next-app voiceai-studio</motion.div>
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-emerald-400">✓ Created project structure</motion.div>
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-emerald-400">✓ Installing dependencies (47 packages)</motion.div>
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="text-emerald-400">✓ Generating components from designs</motion.div>
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="text-emerald-400">✓ Adding API routes & database schema</motion.div>
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className="text-sky-400">ℹ Running tests... 24/24 passed</motion.div>
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }} className="text-emerald-400">✓ Build complete in 2.4s</motion.div>
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="text-white/50">$ <span className="animate-pulse">_</span></motion.div>
                        </div>
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        {[{ label: "Files", value: "47" }, { label: "Tests", value: "24" }, { label: "Coverage", value: "94%" }, { label: "Size", value: "142KB" }].map((stat, i) => (
                          <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 + i * 0.1 }} className="p-2 rounded-lg border border-white/[0.04] bg-white/[0.02] text-center">
                            <div className="text-sm font-bold text-white">{stat.value}</div>
                            <div className="text-[9px] text-white/40 uppercase">{stat.label}</div>
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
                        <span className="text-xs text-white/40">localhost:3000</span>
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
      </div>
    </div>
  )
}
