"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Activity, Server, Globe, Zap, TrendingUp } from "lucide-react"

const metrics = [
  { label: "Uptime", value: "99.99", unit: "%", icon: Activity, color: "emerald" },
  { label: "Latency", value: "42", unit: "ms", icon: Zap, color: "blue" },
  { label: "Requests", value: "12.4k", unit: "/min", icon: Globe, color: "violet" },
  { label: "Memory", value: "256", unit: "MB", icon: Server, color: "amber" },
]

const regions = [
  { name: "US-East", status: "healthy", latency: "12ms" },
  { name: "EU-West", status: "healthy", latency: "28ms" },
  { name: "AP-South", status: "healthy", latency: "45ms" },
]

export function LiveInfraMetrics() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeMetric, setActiveMetric] = useState(0)
  const [requestCount, setRequestCount] = useState(12400)

  useEffect(() => {
    if (!isInView) return

    const interval = setInterval(() => {
      setRequestCount(prev => prev + Math.floor(Math.random() * 50))
      setActiveMetric(prev => (prev + 1) % metrics.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [isInView])

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; border: string }> = {
      emerald: { bg: "bg-emerald-500/10", text: "text-emerald-500", border: "border-emerald-500/20" },
      blue: { bg: "bg-blue-500/10", text: "text-blue-500", border: "border-blue-500/20" },
      violet: { bg: "bg-violet-500/10", text: "text-violet-500", border: "border-violet-500/20" },
      amber: { bg: "bg-amber-500/10", text: "text-amber-500", border: "border-amber-500/20" },
    }
    return colors[color] || colors.emerald
  }

  return (
    <div ref={ref} className="relative">
      <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-b from-card/80 to-card/40 backdrop-blur-sm">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border/30">
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <Activity className="w-4 h-4 text-emerald-500" />
            </div>
            <div>
              <span className="text-sm font-medium text-foreground">Infrastructure</span>
              <span className="text-xs text-muted-foreground ml-2">Live Metrics</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <div className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            </div>
            <span className="text-xs text-emerald-500 font-medium">All Systems Operational</span>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="p-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {metrics.map((metric, index) => {
              const colors = getColorClasses(metric.color)
              const Icon = metric.icon
              const isActive = index === activeMetric
              
              return (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1 }}
                  className={`relative p-4 rounded-xl border ${isActive ? colors.border : "border-border/30"} ${isActive ? colors.bg : "bg-muted/20"} transition-all duration-300`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className={`w-4 h-4 ${colors.text}`} />
                    <span className="text-xs text-muted-foreground">{metric.label}</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-foreground">
                      {metric.label === "Requests" ? (requestCount / 1000).toFixed(1) + "k" : metric.value}
                    </span>
                    <span className="text-xs text-muted-foreground">{metric.unit}</span>
                  </div>
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full ${colors.text.replace("text-", "bg-")}`}
                    />
                  )}
                </motion.div>
              )
            })}
          </div>

          {/* Edge Regions */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
              <Globe className="w-3.5 h-3.5" />
              <span>Edge Deployments</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {regions.map((region, index) => (
                <motion.div
                  key={region.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/30 border border-border/30"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-xs font-medium text-foreground">{region.name}</span>
                  <span className="text-xs text-muted-foreground">{region.latency}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-border/30 bg-muted/20">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
            <span>Auto-scaled • Zero config</span>
          </div>
          <span className="text-xs text-muted-foreground">Powered by Vercel Edge</span>
        </div>
      </div>
    </div>
  )
}
