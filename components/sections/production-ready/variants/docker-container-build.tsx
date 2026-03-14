"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Container, Check, Layers, HardDrive, Cpu, Cloud } from "lucide-react"

const buildSteps = [
  { text: "FROM node:20-alpine", type: "instruction" },
  { text: "WORKDIR /app", type: "instruction" },
  { text: "COPY package*.json ./", type: "copy" },
  { text: "RUN npm ci --only=production", type: "run" },
  { text: "COPY . .", type: "copy" },
  { text: "RUN npm run build", type: "run" },
  { text: "EXPOSE 3000", type: "instruction" },
  { text: "CMD [\"npm\", \"start\"]", type: "instruction" },
]

const containerStats = [
  { label: "Image Size", value: "147MB", icon: HardDrive },
  { label: "Layers", value: "8", icon: Layers },
  { label: "Arch", value: "amd64", icon: Cpu },
]

export function DockerContainerBuild() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [currentStep, setCurrentStep] = useState(0)
  const [isBuilt, setIsBuilt] = useState(false)
  const [isPushed, setIsPushed] = useState(false)

  useEffect(() => {
    if (!isInView) return

    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= buildSteps.length - 1) {
          clearInterval(stepInterval)
          setTimeout(() => setIsBuilt(true), 400)
          setTimeout(() => setIsPushed(true), 1200)
          return prev
        }
        return prev + 1
      })
    }, 350)

    return () => clearInterval(stepInterval)
  }, [isInView])

  const getStepColor = (type: string) => {
    switch (type) {
      case "instruction": return "text-blue-400"
      case "copy": return "text-amber-400"
      case "run": return "text-emerald-400"
      default: return "text-foreground/60"
    }
  }

  return (
    <div ref={ref} className="relative">
      <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-b from-card/80 to-card/40 backdrop-blur-sm">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border/30">
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <Container className="w-4 h-4 text-blue-500" />
            </div>
            <div>
              <span className="text-sm font-medium text-foreground">Docker Build</span>
              <span className="text-xs text-muted-foreground font-mono ml-2">Dockerfile</span>
            </div>
          </div>
          
          {isPushed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20"
            >
              <Cloud className="w-3 h-3 text-emerald-500" />
              <span className="text-xs text-emerald-500 font-medium">Pushed</span>
            </motion.div>
          ) : isBuilt ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Cloud className="w-3 h-3 text-amber-500" />
              </motion.div>
              <span className="text-xs text-amber-500 font-medium">Pushing...</span>
            </motion.div>
          ) : null}
        </div>

        {/* Dockerfile Content */}
        <div className="p-5 font-mono text-sm min-h-[280px]">
          <div className="space-y-1">
            {buildSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{
                  opacity: index <= currentStep ? 1 : 0.2,
                  x: index <= currentStep ? 0 : -10,
                }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-3"
              >
                <span className="w-5 text-right text-muted-foreground/30 text-xs select-none">
                  {index + 1}
                </span>
                <span className={`whitespace-pre ${index <= currentStep ? getStepColor(step.type) : 'text-muted-foreground/30'}`}>
                  {step.text}
                </span>
                {index === currentStep && currentStep < buildSteps.length - 1 && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="w-0.5 h-4 bg-foreground/50"
                  />
                )}
              </motion.div>
            ))}
          </div>

          {/* Container Stats */}
          {isBuilt && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 pt-4 border-t border-border/30"
            >
              <div className="flex items-center gap-6">
                {containerStats.map((stat) => (
                  <div key={stat.label} className="flex items-center gap-2">
                    <stat.icon className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{stat.label}:</span>
                    <span className="text-xs text-foreground/80 font-medium">{stat.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-border/30 bg-muted/20">
          <div className="text-xs text-muted-foreground font-mono">
            productoOS/app:latest
          </div>
          {isPushed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-1.5 text-xs"
            >
              <Check className="w-3 h-3 text-emerald-500" />
              <span className="text-muted-foreground">ghcr.io/productos</span>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
