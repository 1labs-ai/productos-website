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

// Project stats - Linear-style monochrome with minimal accents
const projectStats = [
  { label: "Competitors Analyzed", value: "12", icon: Search },
  { label: "UI Screens Generated", value: "24", icon: Layers },
  { label: "User Stories Created", value: "18", icon: Users },
  { label: "Code Components", value: "47", icon: Code },
]

// Key deliverables - Linear-style monochrome, status colors only
const deliverables = [
  { 
    name: "Market Research Report", 
    description: "12 competitors, 3 market gaps identified",
    status: "complete", 
    icon: Search,
    progress: undefined
  },
  { 
    name: "Product Requirements Doc", 
    description: "18 user stories, 6 epics defined",
    status: "complete", 
    icon: FileText,
    progress: undefined
  },
  { 
    name: "UI Design System", 
    description: "24 screens, 47 components",
    status: "complete", 
    icon: Palette,
    progress: undefined
  },
  { 
    name: "Production Codebase", 
    description: "Next.js app with full test coverage",
    status: "in-progress", 
    icon: Code,
    progress: 75
  },
]

// Recent activity - Linear-style monochrome
const recentActivity = [
  { time: "2m ago", action: "Completed dashboard wireframes", agent: "Design Agent", icon: Palette },
  { time: "15m ago", action: "Generated 4 new UI screens", agent: "Design Agent", icon: Layers },
  { time: "1h ago", action: "Finalized PRD v2.0", agent: "PRD Agent", icon: FileText },
  { time: "2h ago", action: "Found 3 new competitor insights", agent: "Research Agent", icon: Search },
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
          
          {/* Inner ambient glow - diffuse lighting */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse 100% 50% at 50% -20%, rgba(255, 255, 255, 0.03) 0%, transparent 50%),
                radial-gradient(ellipse 60% 40% at 100% 0%, rgba(255, 255, 255, 0.02) 0%, transparent 40%)
              `
            }}
          />

      {/* Header Bar */}
      <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-4 sm:px-6 py-4 border-b border-border/50 dark:border-white/[0.06] bg-muted/20 dark:bg-white/[0.02]">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-sm font-medium text-foreground dark:text-white">AI Voice Assistant</span>
          <span className="text-xs text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            Ready to ship
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground dark:text-white/50">
            <Clock className="size-4" />
            <span>Est. ship: <span className="text-foreground dark:text-white font-medium">3 days</span></span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-6 border-b border-border/50 dark:border-white/[0.06]">
        {projectStats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 + 0.3 }}
              className="group p-3 sm:p-4 rounded-xl bg-muted/30 dark:bg-white/[0.02] border border-border/50 dark:border-white/[0.06] hover:border-border dark:hover:border-white/[0.12] hover:bg-muted/50 dark:hover:bg-white/[0.03] transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-muted dark:bg-white/[0.04] flex items-center justify-center transition-transform group-hover:scale-110">
                  <Icon className="size-4 text-muted-foreground dark:text-white/50" />
                </div>
              </div>
              <div className="text-xl sm:text-2xl font-bold text-foreground dark:text-white mb-1">{stat.value}</div>
              <div className="text-xs text-muted-foreground dark:text-white/40">{stat.label}</div>
            </motion.div>
          )
        })}
      </div>

      <div className="relative grid lg:grid-cols-[1fr_320px] divide-y lg:divide-y-0 lg:divide-x divide-border/50 dark:divide-white/[0.06]">
        {/* Left: Key Deliverables */}
        <div className="p-4 sm:p-6">
          <h4 className="text-sm font-medium text-foreground dark:text-white mb-4 flex items-center gap-2">
            <Rocket className="size-4 text-muted-foreground dark:text-white/50" />
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
                  className="group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-muted/30 dark:bg-white/[0.02] hover:bg-muted/50 dark:hover:bg-white/[0.04] transition-all duration-300 border border-border/50 dark:border-white/[0.06] hover:border-border dark:hover:border-white/[0.1]"
                >
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-xl bg-muted dark:bg-white/[0.04] flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105">
                    <Icon className="size-5 text-muted-foreground dark:text-white/50" />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-foreground dark:text-white">{item.name}</span>
                      {item.status === "complete" && (
                        <div className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
                          <Check className="size-2.5 text-emerald-500 dark:text-emerald-400" />
                        </div>
                      )}
                      {item.status === "in-progress" && item.progress && (
                        <span className="text-xs text-muted-foreground dark:text-white/50 font-medium">{item.progress}%</span>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground dark:text-white/40">{item.description}</span>
                  </div>
                  
                  {/* Progress bar for in-progress items */}
                  {item.status === "in-progress" && item.progress && (
                    <div className="w-20 h-1.5 bg-muted dark:bg-white/[0.06] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.progress}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="h-full bg-foreground/30 dark:bg-white/30 rounded-full"
                      />
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Right: Activity Feed */}
        <div className="p-4 sm:p-6 bg-muted/10 dark:bg-white/[0.01]">
          <h4 className="text-sm font-medium text-foreground dark:text-white mb-4 flex items-center gap-2">
            <BarChart3 className="size-4 text-muted-foreground dark:text-white/50" />
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
                  <div className="w-8 h-8 rounded-lg bg-muted dark:bg-white/[0.04] flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105">
                    <Icon className="size-4 text-muted-foreground dark:text-white/50" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground/80 dark:text-white/80">{activity.action}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-muted-foreground dark:text-white/40">{activity.agent}</span>
                      <span className="text-xs text-muted-foreground/40 dark:text-white/20">•</span>
                      <span className="text-xs text-muted-foreground dark:text-white/40">{activity.time}</span>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
          
          {/* Project readiness indicator */}
          <div className="mt-6 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <GitBranch className="size-5 text-emerald-500 dark:text-emerald-400" />
              </div>
              <div>
                <div className="text-sm font-medium text-foreground dark:text-white">Deploy Ready</div>
                <div className="text-xs text-muted-foreground dark:text-white/40">All tests passing • Production build ready</div>
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
