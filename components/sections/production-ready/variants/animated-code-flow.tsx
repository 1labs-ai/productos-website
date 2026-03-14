"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Check, Zap } from "lucide-react"

const codeLines = [
  { text: "// ProductOS Code Agent", type: "comment" },
  { text: "export async function Dashboard() {", type: "keyword" },
  { text: "  const data = await fetchAnalytics()", type: "normal" },
  { text: "  ", type: "empty" },
  { text: "  return (", type: "keyword" },
  { text: "    <Card className=\"p-6\">", type: "jsx" },
  { text: "      <MetricsGrid data={data} />", type: "jsx" },
  { text: "    </Card>", type: "jsx" },
  { text: "  )", type: "keyword" },
  { text: "}", type: "keyword" },
]

const deploySteps = [
  "Analyzing code...",
  "Running 24 tests...",
  "Building bundle...",
  "Deploying to edge...",
]

export function AnimatedCodeFlow() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [currentLine, setCurrentLine] = useState(0)
  const [deployStep, setDeployStep] = useState(-1)
  const [isDeployed, setIsDeployed] = useState(false)

  useEffect(() => {
    if (!isInView) return

    // Animate code lines
    const lineInterval = setInterval(() => {
      setCurrentLine(prev => {
        if (prev >= codeLines.length - 1) {
          clearInterval(lineInterval)
          // Start deploy animation
          setTimeout(() => setDeployStep(0), 500)
          return prev
        }
        return prev + 1
      })
    }, 200)

    return () => clearInterval(lineInterval)
  }, [isInView])

  useEffect(() => {
    if (deployStep < 0) return

    const deployInterval = setInterval(() => {
      setDeployStep(prev => {
        if (prev >= deploySteps.length - 1) {
          clearInterval(deployInterval)
          setTimeout(() => setIsDeployed(true), 300)
          return prev
        }
        return prev + 1
      })
    }, 600)

    return () => clearInterval(deployInterval)
  }, [deployStep])

  const getLineColor = (type: string) => {
    switch (type) {
      case "comment": return "text-muted-foreground/50"
      case "keyword": return "text-foreground/70"
      case "jsx": return "text-emerald-400/80"
      default: return "text-foreground/60"
    }
  }

  return (
    <div ref={ref} className="relative">
      {/* Main container with subtle glow */}
      <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-b from-card/80 to-card/40 backdrop-blur-sm">
        {/* Subtle top glow */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border/30">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-foreground/10" />
              <div className="w-2.5 h-2.5 rounded-full bg-foreground/10" />
              <div className="w-2.5 h-2.5 rounded-full bg-foreground/10" />
            </div>
            <span className="text-xs text-muted-foreground font-mono">dashboard.tsx</span>
          </div>
          
          {/* Deploy status */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: deployStep >= 0 ? 1 : 0 }}
            className="flex items-center gap-2"
          >
            {isDeployed ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20"
              >
                <Check className="w-3 h-3 text-emerald-500" />
                <span className="text-xs text-emerald-500 font-medium">Live</span>
              </motion.div>
            ) : (
              <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Zap className="w-3 h-3 text-amber-500" />
                </motion.div>
                <span className="text-xs text-amber-500 font-medium">
                  {deploySteps[deployStep] || "Ready"}
                </span>
              </div>
            )}
          </motion.div>
        </div>

        {/* Code area */}
        <div className="p-5 font-mono text-sm min-h-[280px]">
          <div className="space-y-1">
            {codeLines.map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{
                  opacity: index <= currentLine ? 1 : 0,
                  x: index <= currentLine ? 0 : -10,
                }}
                transition={{ duration: 0.15 }}
                className={`flex items-center gap-3 ${getLineColor(line.type)}`}
              >
                <span className="w-5 text-right text-muted-foreground/30 text-xs select-none">
                  {index + 1}
                </span>
                <span className="whitespace-pre">{line.text}</span>
                {index === currentLine && currentLine < codeLines.length - 1 && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="w-0.5 h-4 bg-foreground/50"
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom status bar */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-border/30 bg-muted/20">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>TypeScript</span>
            <span>•</span>
            <span>UTF-8</span>
          </div>
          
          {isDeployed && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-xs"
            >
              <div className="relative">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <div className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              </div>
              <span className="text-muted-foreground">your-app.vercel.app</span>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
