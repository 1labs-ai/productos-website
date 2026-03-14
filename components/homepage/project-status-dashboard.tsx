"use client"

import { motion } from "framer-motion"
import { 
  Check, 
  Clock, 
  FileText, 
  Palette, 
  Code, 
  Search,
  Users,
  Layers,
  GitBranch,
  BarChart3,
  Rocket
} from "lucide-react"
import { cn } from "@/lib/utils"

// Project stats - using warm brand accents (amber/orange/teal) consistent with rest of page
const projectStats = [
  { label: "Competitors Analyzed", value: "12", icon: Search, accentClass: "text-amber-400", bgClass: "bg-amber-500/10" },
  { label: "UI Screens Generated", value: "24", icon: Layers, accentClass: "text-orange-400", bgClass: "bg-orange-500/10" },
  { label: "User Stories Created", value: "18", icon: Users, accentClass: "text-teal-400", bgClass: "bg-teal-500/10" },
  { label: "Code Components", value: "47", icon: Code, accentClass: "text-emerald-400", bgClass: "bg-emerald-500/10" },
]

// Key deliverables with consistent brand colors
const deliverables = [
  { 
    name: "Market Research Report", 
    description: "12 competitors, 3 market gaps identified",
    status: "complete", 
    icon: Search,
    accentClass: "text-amber-400",
    bgClass: "bg-amber-500/10"
  },
  { 
    name: "Product Requirements Doc", 
    description: "18 user stories, 6 epics defined",
    status: "complete", 
    icon: FileText,
    accentClass: "text-teal-400",
    bgClass: "bg-teal-500/10"
  },
  { 
    name: "UI Design System", 
    description: "24 screens, 47 components",
    status: "complete", 
    icon: Palette,
    accentClass: "text-orange-400",
    bgClass: "bg-orange-500/10"
  },
  { 
    name: "Production Codebase", 
    description: "Next.js app with full test coverage",
    status: "in-progress", 
    icon: Code,
    accentClass: "text-emerald-400",
    bgClass: "bg-emerald-500/10",
    progress: 75
  },
]

// Recent activity with matching colors
const recentActivity = [
  { time: "2m ago", action: "Completed dashboard wireframes", agent: "Design Agent", icon: Palette, accentClass: "text-orange-400", bgClass: "bg-orange-500/10" },
  { time: "15m ago", action: "Generated 4 new UI screens", agent: "Design Agent", icon: Layers, accentClass: "text-orange-400", bgClass: "bg-orange-500/10" },
  { time: "1h ago", action: "Finalized PRD v2.0", agent: "PRD Agent", icon: FileText, accentClass: "text-teal-400", bgClass: "bg-teal-500/10" },
  { time: "2h ago", action: "Found 3 new competitor insights", agent: "Research Agent", icon: Search, accentClass: "text-amber-400", bgClass: "bg-amber-500/10" },
]

export function ProjectStatusDashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative"
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
          
          {/* Subtle ambient glow with warm tint */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse 70% 40% at 50% 0%, rgba(255, 255, 255, 0.04) 0%, transparent 50%),
                radial-gradient(ellipse 40% 25% at 50% 0%, rgba(245, 158, 11, 0.03) 0%, transparent 40%)
              `
            }}
          />

      {/* Header Bar */}
      <div className="relative flex items-center justify-between px-6 py-4 border-b border-white/[0.06] bg-white/[0.02]">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span className="text-sm font-medium text-white">AI Voice Assistant</span>
          <span className="text-xs text-amber-400 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20">
            Ready to ship
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-white/50">
            <Clock className="size-4" />
            <span>Est. ship: <span className="text-white font-medium">3 days</span></span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 border-b border-white/[0.06]">
        {projectStats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 + 0.3 }}
              className="group p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.03] transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110", stat.bgClass)}>
                  <Icon className={cn("size-4", stat.accentClass)} />
                </div>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-xs text-white/40">{stat.label}</div>
            </motion.div>
          )
        })}
      </div>

      <div className="relative grid lg:grid-cols-[1fr_320px] divide-x divide-white/[0.06]">
        {/* Left: Key Deliverables */}
        <div className="p-6">
          <h4 className="text-sm font-medium text-white mb-4 flex items-center gap-2">
            <Rocket className="size-4 text-amber-400" />
            Key Deliverables
          </h4>
          <div className="space-y-3">
            {deliverables.map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 + 0.4 }}
                  className="group flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 border border-white/[0.06] hover:border-white/[0.1]"
                >
                  {/* Icon */}
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105", item.bgClass)}>
                    <Icon className={cn("size-5", item.accentClass)} />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-white">{item.name}</span>
                      {item.status === "complete" && (
                        <div className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
                          <Check className="size-2.5 text-emerald-400" />
                        </div>
                      )}
                      {item.status === "in-progress" && item.progress && (
                        <span className="text-xs text-amber-400 font-medium">{item.progress}%</span>
                      )}
                    </div>
                    <span className="text-xs text-white/40">{item.description}</span>
                  </div>
                  
                  {/* Progress bar for in-progress items */}
                  {item.status === "in-progress" && item.progress && (
                    <div className="w-20 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.progress}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="h-full bg-gradient-to-r from-amber-500/60 to-orange-500/60 rounded-full"
                      />
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Right: Activity Feed */}
        <div className="p-6 bg-white/[0.01]">
          <h4 className="text-sm font-medium text-white mb-4 flex items-center gap-2">
            <BarChart3 className="size-4 text-teal-400" />
            Recent Activity
          </h4>
          <div className="space-y-4">
            {recentActivity.map((activity, i) => {
              const Icon = activity.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.5 }}
                  className="flex gap-3 group"
                >
                  <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105", activity.bgClass)}>
                    <Icon className={cn("size-4", activity.accentClass)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white/80">{activity.action}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-white/40">{activity.agent}</span>
                      <span className="text-xs text-white/20">•</span>
                      <span className="text-xs text-white/40">{activity.time}</span>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
          
          {/* Project readiness indicator - using amber/orange consistent with brand */}
          <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-amber-500/5 to-orange-500/5 border border-amber-500/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 flex items-center justify-center">
                <GitBranch className="size-5 text-amber-400" />
              </div>
              <div>
                <div className="text-sm font-medium text-white">Deploy Ready</div>
                <div className="text-xs text-white/40">All tests passing • Production build ready</div>
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
