"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Gauge, Zap, Eye, Accessibility, Search, Check } from "lucide-react"

const metrics = [
  { id: "performance", label: "Performance", score: 98, icon: Zap, color: "emerald" },
  { id: "accessibility", label: "Accessibility", score: 100, icon: Accessibility, color: "emerald" },
  { id: "best-practices", label: "Best Practices", score: 100, icon: Eye, color: "emerald" },
  { id: "seo", label: "SEO", score: 100, icon: Search, color: "emerald" },
]

const coreWebVitals = [
  { label: "LCP", value: "1.2s", status: "good", description: "Largest Contentful Paint" },
  { label: "FID", value: "8ms", status: "good", description: "First Input Delay" },
  { label: "CLS", value: "0.02", status: "good", description: "Cumulative Layout Shift" },
]

export function PerformanceLighthouse() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [animatedScores, setAnimatedScores] = useState<Record<string, number>>({})
  const [showVitals, setShowVitals] = useState(false)

  useEffect(() => {
    if (!isInView) return

    metrics.forEach((metric, index) => {
      setTimeout(() => {
        let current = 0
        const interval = setInterval(() => {
          current += 2
          if (current >= metric.score) {
            current = metric.score
            clearInterval(interval)
          }
          setAnimatedScores(prev => ({ ...prev, [metric.id]: current }))
        }, 20)
      }, index * 200)
    })

    setTimeout(() => setShowVitals(true), 1200)
  }, [isInView])

  return (
    <div ref={ref} className="relative">
      <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-b from-card/80 to-card/40 backdrop-blur-sm">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border/30">
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-lg bg-orange-500/10 border border-orange-500/20">
              <Gauge className="w-4 h-4 text-orange-500" />
            </div>
            <div>
              <span className="text-sm font-medium text-foreground">Lighthouse Report</span>
              <span className="text-xs text-muted-foreground ml-2">Auto-optimized</span>
            </div>
          </div>
          
          {showVitals && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20"
            >
              <Check className="w-3 h-3 text-emerald-500" />
              <span className="text-xs text-emerald-500 font-medium">99 avg</span>
            </motion.div>
          )}
        </div>

        {/* Scores Grid */}
        <div className="p-5 min-h-[300px]">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {metrics.map((metric) => {
              const score = animatedScores[metric.id] || 0
              const Icon = metric.icon
              
              return (
                <motion.div
                  key={metric.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  className="flex flex-col items-center p-4 rounded-xl bg-muted/20 border border-border/20"
                >
                  {/* Circular Progress */}
                  <div className="relative w-16 h-16 mb-3">
                    <svg className="w-full h-full -rotate-90">
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        className="text-muted/30"
                      />
                      <motion.circle
                        cx="32"
                        cy="32"
                        r="28"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                        className="text-emerald-500"
                        initial={{ strokeDasharray: "0, 176" }}
                        animate={{ strokeDasharray: `${(score / 100) * 176}, 176` }}
                        transition={{ duration: 0.5 }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-bold text-foreground">{score}</span>
                    </div>
                  </div>
                  
                  <Icon className="w-4 h-4 text-muted-foreground mb-1" />
                  <span className="text-xs text-muted-foreground text-center">{metric.label}</span>
                </motion.div>
              )
            })}
          </div>

          {/* Core Web Vitals */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={showVitals ? { opacity: 1, y: 0 } : {}}
            className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20"
          >
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-4 h-4 text-emerald-500" />
              <span className="text-sm font-medium text-foreground">Core Web Vitals</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-500 font-medium">PASSED</span>
            </div>
            <div className="flex flex-wrap gap-4">
              {coreWebVitals.map((vital) => (
                <div key={vital.label} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-xs font-mono text-foreground/80">{vital.label}:</span>
                  <span className="text-xs font-mono text-emerald-500">{vital.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-border/30 bg-muted/20">
          <div className="text-xs text-muted-foreground">
            Optimized bundle: <span className="text-foreground/70 font-mono">42kb gzipped</span>
          </div>
        </div>
      </div>
    </div>
  )
}
