"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Terminal, ExternalLink } from "lucide-react"

const deployLog = [
  { text: "$ productos deploy", type: "command", delay: 0 },
  { text: "", type: "empty", delay: 200 },
  { text: "◐ Analyzing project structure...", type: "info", delay: 400 },
  { text: "✓ Found 12 components", type: "success", delay: 800 },
  { text: "✓ Found 4 API routes", type: "success", delay: 1000 },
  { text: "", type: "empty", delay: 1100 },
  { text: "◐ Running type check...", type: "info", delay: 1200 },
  { text: "✓ No TypeScript errors", type: "success", delay: 1800 },
  { text: "", type: "empty", delay: 1900 },
  { text: "◐ Running tests...", type: "info", delay: 2000 },
  { text: "  PASS  src/components/Dashboard.test.tsx", type: "pass", delay: 2400 },
  { text: "  PASS  src/api/users.test.ts", type: "pass", delay: 2600 },
  { text: "  PASS  src/lib/analytics.test.ts", type: "pass", delay: 2800 },
  { text: "✓ 24 tests passed", type: "success", delay: 3100 },
  { text: "", type: "empty", delay: 3200 },
  { text: "◐ Building for production...", type: "info", delay: 3300 },
  { text: "✓ Bundle size: 142kb (gzipped)", type: "success", delay: 4000 },
  { text: "", type: "empty", delay: 4100 },
  { text: "◐ Deploying to Vercel Edge...", type: "info", delay: 4200 },
  { text: "✓ Deployed in 2.4s", type: "success", delay: 5000 },
  { text: "", type: "empty", delay: 5100 },
  { text: "🚀 Live at https://your-app.vercel.app", type: "url", delay: 5200 },
]

export function TerminalDeploy() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [visibleLines, setVisibleLines] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (!isInView) return

    const timeouts: NodeJS.Timeout[] = []
    
    deployLog.forEach((_, index) => {
      const timeout = setTimeout(() => {
        setVisibleLines(index + 1)
        if (index === deployLog.length - 1) {
          setIsComplete(true)
        }
      }, deployLog[index].delay)
      timeouts.push(timeout)
    })

    return () => timeouts.forEach(clearTimeout)
  }, [isInView])

  const getLineStyle = (type: string) => {
    switch (type) {
      case "command": return "text-foreground font-medium"
      case "success": return "text-emerald-400"
      case "pass": return "text-emerald-400/70 pl-2"
      case "info": return "text-amber-400"
      case "url": return "text-foreground"
      default: return "text-muted-foreground"
    }
  }

  return (
    <div ref={ref} className="relative">
      {/* Terminal window */}
      <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-[#0a0a0c]">
        {/* Subtle reflection */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
        
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.06]">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-white/10 hover:bg-red-500/80 transition-colors cursor-pointer" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/10 hover:bg-yellow-500/80 transition-colors cursor-pointer" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/10 hover:bg-green-500/80 transition-colors cursor-pointer" />
          </div>
          <div className="flex items-center gap-2 ml-2">
            <Terminal className="w-3.5 h-3.5 text-white/30" />
            <span className="text-xs text-white/40 font-mono">Terminal — productos deploy</span>
          </div>
        </div>

        {/* Terminal content */}
        <div className="p-5 font-mono text-sm min-h-[320px] overflow-hidden">
          <div className="space-y-0.5">
            {deployLog.slice(0, visibleLines).map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15 }}
                className={`${getLineStyle(line.type)} leading-relaxed`}
              >
                {line.type === "url" ? (
                  <span className="flex items-center gap-2">
                    <span>{line.text}</span>
                    <ExternalLink className="w-3 h-3 text-white/40" />
                  </span>
                ) : (
                  line.text
                )}
              </motion.div>
            ))}
            
            {/* Cursor */}
            {!isComplete && visibleLines > 0 && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.6, repeat: Infinity }}
                className="inline-block w-2 h-4 bg-white/50 ml-0.5"
              />
            )}
          </div>
        </div>

        {/* Bottom glow when complete */}
        {isComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-emerald-500/5 to-transparent pointer-events-none"
          />
        )}
      </div>

      {/* Live indicator */}
      {isComplete && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center gap-3 mt-4"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <div className="relative">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <div className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            </div>
            <span className="text-sm text-emerald-400">Production</span>
          </div>
        </motion.div>
      )}
    </div>
  )
}
