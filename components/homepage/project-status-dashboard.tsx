"use client"

import { motion } from "framer-motion"
import { Check, Clock, Zap, FileText, Palette, Code, Lightbulb, Search, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

const stages = [
  { id: "ideate", name: "Ideate", icon: Lightbulb, status: "complete", color: "sky" },
  { id: "discover", name: "Discover", icon: Search, status: "complete", color: "violet" },
  { id: "define", name: "Define", icon: FileText, status: "complete", color: "teal" },
  { id: "design", name: "Design", icon: Palette, status: "active", color: "purple" },
  { id: "develop", name: "Develop", icon: Code, status: "pending", color: "amber" },
]

const deliverables = [
  { name: "Market Research Report", status: "complete", agent: "Research Agent" },
  { name: "Competitor Analysis", status: "complete", agent: "Research Agent" },
  { name: "Product Requirements Doc", status: "complete", agent: "PRD Agent" },
  { name: "User Flow Diagrams", status: "complete", agent: "Design Agent" },
  { name: "UI Screen Designs", status: "in-progress", agent: "Design Agent", progress: 75 },
  { name: "Production Code", status: "pending", agent: "Code Agent" },
]

const recentActivity = [
  { time: "2m ago", agent: "Design Agent", action: "Completed dashboard wireframes", icon: Palette, color: "purple" },
  { time: "15m ago", agent: "Design Agent", action: "Generated 4 UI screens", icon: Palette, color: "purple" },
  { time: "1h ago", agent: "PRD Agent", action: "Finalized requirements document", icon: FileText, color: "teal" },
  { time: "2h ago", agent: "Research Agent", action: "Added 3 competitor insights", icon: Search, color: "violet" },
]

export function ProjectStatusDashboard() {
  const completedStages = stages.filter(s => s.status === "complete").length
  const activeStage = stages.find(s => s.status === "active")
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden"
    >
      {/* Header Bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border/50 bg-muted/30">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
          <span className="text-sm font-medium text-foreground">AI Voice Assistant</span>
          <span className="text-xs text-muted-foreground px-2 py-0.5 rounded-full bg-muted">In Progress</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="size-4" />
            <span>Est. ship: <span className="text-foreground font-medium">3 days</span></span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] divide-x divide-border/50">
        {/* Left: Stage Progress + Deliverables */}
        <div className="p-6">
          {/* Stage Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-medium text-foreground">Stage Progress</h4>
              <span className="text-xs text-muted-foreground">{completedStages}/5 stages complete</span>
            </div>
            
            {/* Progress Pipeline */}
            <div className="relative">
              {/* Background track */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-muted/50 -translate-y-1/2 rounded-full" />
              
              {/* Progress fill */}
              <div 
                className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-sky-500 via-violet-500 to-purple-500 -translate-y-1/2 rounded-full transition-all duration-500"
                style={{ width: `${(completedStages / stages.length) * 100 + 10}%` }}
              />
              
              {/* Stage nodes */}
              <div className="relative flex items-center justify-between">
                {stages.map((stage, i) => {
                  const Icon = stage.icon
                  return (
                    <div key={stage.id} className="flex flex-col items-center gap-2">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 + 0.3, type: "spring" }}
                        className={cn(
                          "relative z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all",
                          stage.status === "complete" && "bg-gradient-to-br from-foreground to-foreground/80 text-background",
                          stage.status === "active" && "bg-purple-500 text-white ring-4 ring-purple-500/20",
                          stage.status === "pending" && "bg-muted border border-border/50 text-muted-foreground"
                        )}
                      >
                        {stage.status === "complete" ? (
                          <Check className="size-4" />
                        ) : (
                          <Icon className="size-4" />
                        )}
                        
                        {/* Active pulse */}
                        {stage.status === "active" && (
                          <motion.div
                            className="absolute inset-0 rounded-full bg-purple-500"
                            initial={{ scale: 1, opacity: 0.5 }}
                            animate={{ scale: 1.5, opacity: 0 }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                        )}
                      </motion.div>
                      <span className={cn(
                        "text-xs font-medium",
                        stage.status === "active" ? "text-purple-400" : "text-muted-foreground"
                      )}>
                        {stage.name}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Deliverables */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-4">Deliverables</h4>
            <div className="space-y-2">
              {deliverables.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 + 0.4 }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  {/* Status indicator */}
                  <div className={cn(
                    "w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0",
                    item.status === "complete" && "bg-emerald-500/20 text-emerald-400",
                    item.status === "in-progress" && "bg-purple-500/20 text-purple-400",
                    item.status === "pending" && "bg-muted text-muted-foreground"
                  )}>
                    {item.status === "complete" && <Check className="size-3" />}
                    {item.status === "in-progress" && <Zap className="size-3" />}
                    {item.status === "pending" && <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50" />}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        "text-sm font-medium truncate",
                        item.status === "pending" ? "text-muted-foreground" : "text-foreground"
                      )}>
                        {item.name}
                      </span>
                      {item.status === "in-progress" && item.progress && (
                        <span className="text-xs text-purple-400">{item.progress}%</span>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">{item.agent}</span>
                  </div>
                  
                  {/* Progress bar for in-progress items */}
                  {item.status === "in-progress" && item.progress && (
                    <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.progress}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="h-full bg-purple-500 rounded-full"
                      />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Activity Feed */}
        <div className="p-6 bg-muted/10">
          <h4 className="text-sm font-medium text-foreground mb-4">Recent Activity</h4>
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
                  className="flex gap-3"
                >
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                    activity.color === "purple" && "bg-purple-500/20 text-purple-400",
                    activity.color === "teal" && "bg-teal-500/20 text-teal-400",
                    activity.color === "violet" && "bg-violet-500/20 text-violet-400"
                  )}>
                    <Icon className="size-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">{activity.action}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-muted-foreground">{activity.agent}</span>
                      <span className="text-xs text-muted-foreground/50">•</span>
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
          
          {/* View all link */}
          <button className="mt-6 text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
            View all activity <ArrowRight className="size-3" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
