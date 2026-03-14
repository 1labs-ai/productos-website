"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Check, Play, GitBranch, TestTube, Package, Rocket, Clock } from "lucide-react"

const pipelineStages = [
  { id: "checkout", label: "Checkout", icon: GitBranch, duration: "2s" },
  { id: "install", label: "Install", icon: Package, duration: "8s" },
  { id: "lint", label: "Lint", icon: TestTube, duration: "3s" },
  { id: "test", label: "Test", icon: TestTube, duration: "12s" },
  { id: "build", label: "Build", icon: Package, duration: "15s" },
  { id: "deploy", label: "Deploy", icon: Rocket, duration: "6s" },
]

export function CICDPipeline() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [completedStages, setCompletedStages] = useState<number>(-1)
  const [currentStage, setCurrentStage] = useState<number>(-1)

  useEffect(() => {
    if (!isInView) return

    let stage = 0
    const runPipeline = () => {
      if (stage >= pipelineStages.length) return
      
      setCurrentStage(stage)
      
      setTimeout(() => {
        setCompletedStages(stage)
        stage++
        runPipeline()
      }, 800)
    }

    setTimeout(runPipeline, 300)
  }, [isInView])

  const getStageStatus = (index: number) => {
    if (index <= completedStages) return "completed"
    if (index === currentStage) return "running"
    return "pending"
  }

  return (
    <div ref={ref} className="relative">
      <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-b from-card/80 to-card/40 backdrop-blur-sm">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border/30">
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-lg bg-violet-500/10 border border-violet-500/20">
              <GitBranch className="w-4 h-4 text-violet-500" />
            </div>
            <div>
              <span className="text-sm font-medium text-foreground">CI/CD Pipeline</span>
              <span className="text-xs text-muted-foreground ml-2">#247</span>
            </div>
          </div>
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-muted/30 border border-border/30">
            <span className="text-xs text-muted-foreground font-mono">main</span>
          </div>
        </div>

        {/* Pipeline Stages */}
        <div className="p-5">
          <div className="relative">
            {/* Connection Line */}
            <div className="absolute left-[18px] top-[30px] bottom-[30px] w-0.5 bg-border/30" />
            
            {/* Progress Line */}
            <motion.div
              className="absolute left-[18px] top-[30px] w-0.5 bg-emerald-500"
              initial={{ height: 0 }}
              animate={{ 
                height: completedStages >= 0 
                  ? `${Math.min((completedStages + 1) / pipelineStages.length * 100, 100)}%` 
                  : 0 
              }}
              transition={{ duration: 0.3 }}
              style={{ maxHeight: "calc(100% - 60px)" }}
            />

            <div className="space-y-4">
              {pipelineStages.map((stage, index) => {
                const status = getStageStatus(index)
                const Icon = stage.icon
                
                return (
                  <motion.div
                    key={stage.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    {/* Status Icon */}
                    <div className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center border-2 ${
                      status === "completed" 
                        ? "bg-emerald-500/10 border-emerald-500" 
                        : status === "running"
                        ? "bg-amber-500/10 border-amber-500"
                        : "bg-muted/30 border-border/50"
                    }`}>
                      {status === "completed" ? (
                        <Check className="w-4 h-4 text-emerald-500" />
                      ) : status === "running" ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Play className="w-4 h-4 text-amber-500" />
                        </motion.div>
                      ) : (
                        <Icon className="w-4 h-4 text-muted-foreground/50" />
                      )}
                    </div>

                    {/* Stage Info */}
                    <div className="flex-1 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-medium ${
                          status === "pending" ? "text-muted-foreground/50" : "text-foreground"
                        }`}>
                          {stage.label}
                        </span>
                        {status === "running" && (
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="text-xs text-amber-500"
                          >
                            Running...
                          </motion.span>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {status === "completed" && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex items-center gap-1 text-xs text-muted-foreground"
                          >
                            <Clock className="w-3 h-3" />
                            <span>{stage.duration}</span>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-border/30 bg-muted/20">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>Triggered by</span>
            <span className="font-mono text-foreground/70">push to main</span>
          </div>
          {completedStages === pipelineStages.length - 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-1.5 text-xs text-emerald-500"
            >
              <Check className="w-3.5 h-3.5" />
              <span className="font-medium">Deployed in 46s</span>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
