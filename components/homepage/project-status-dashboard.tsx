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
      {/* Main dashboard container - clean Linear-style */}
      <div 
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(to bottom, #0c0c0e 0%, #09090a 100%)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: `
            inset 0 1px 0 0 rgba(255, 255, 255, 0.06),
            0 0 0 1px rgba(0, 0, 0, 0.2),
            0 4px 16px rgba(0, 0, 0, 0.12),
            0 16px 48px rgba(0, 0, 0, 0.08)
          `
        }}
      >
        {/* Inner frame with surface depth */}
        <div 
          className="relative rounded-xl overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, #0b0b0c 0%, #0a0a0a 100%)',
          }}
        >
          {/* Primary glossy shine - top left light source */}
          <div 
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background: `
                radial-gradient(ellipse 300px 150px at 15% 0%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 30%, transparent 70%),
                radial-gradient(ellipse 200px 100px at 85% 5%, rgba(255,255,255,0.04) 0%, transparent 60%)
              `,
            }}
          />
          
          {/* Secondary shine - creates dimension */}
          <div 
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 10%, transparent 25%)',
            }}
          />
          
          {/* Top edge highlight - sharp reflection line */}
          <div 
            className="absolute inset-x-0 top-0 h-px pointer-events-none z-10"
            style={{
              background: 'linear-gradient(90deg, transparent 5%, rgba(255,255,255,0.12) 20%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.12) 80%, transparent 95%)'
            }}
          />
          
          {/* Left edge subtle highlight */}
          <div 
            className="absolute inset-y-0 left-0 w-px pointer-events-none z-10"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.03) 30%, transparent 60%)'
            }}
          />
          
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

      {/* Header Bar - Linear-style with subtle status */}
      <div className="relative flex items-center justify-between px-6 py-4 border-b border-white/[0.06] bg-white/[0.02]">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-sm font-medium text-white">AI Voice Assistant</span>
          <span className="text-xs text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
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

      {/* Stats Grid - Linear-style monochrome */}
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
                <div className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center transition-transform group-hover:scale-110">
                  <Icon className="size-4 text-white/50" />
                </div>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-xs text-white/40">{stat.label}</div>
            </motion.div>
          )
        })}
      </div>

      <div className="relative grid lg:grid-cols-[1fr_320px] divide-x divide-white/[0.06]">
        {/* Left: Key Deliverables - Linear-style */}
        <div className="p-6">
          <h4 className="text-sm font-medium text-white mb-4 flex items-center gap-2">
            <Rocket className="size-4 text-white/50" />
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
                  {/* Icon - monochrome */}
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105">
                    <Icon className="size-5 text-white/50" />
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
                        <span className="text-xs text-white/50 font-medium">{item.progress}%</span>
                      )}
                    </div>
                    <span className="text-xs text-white/40">{item.description}</span>
                  </div>
                  
                  {/* Progress bar for in-progress items - subtle */}
                  {item.status === "in-progress" && item.progress && (
                    <div className="w-20 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.progress}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="h-full bg-white/30 rounded-full"
                      />
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Right: Activity Feed - Linear-style */}
        <div className="p-6 bg-white/[0.01]">
          <h4 className="text-sm font-medium text-white mb-4 flex items-center gap-2">
            <BarChart3 className="size-4 text-white/50" />
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
                  <div className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105">
                    <Icon className="size-4 text-white/50" />
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
          
          {/* Project readiness indicator - subtle emerald for positive status */}
          <div className="mt-6 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <GitBranch className="size-5 text-emerald-400" />
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
