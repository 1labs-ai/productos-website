"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Check, Zap, Globe, Lock, FileJson } from "lucide-react"

const apiEndpoints = [
  { method: "GET", path: "/api/users", status: "200 OK", response: "User[]" },
  { method: "POST", path: "/api/users", status: "201 Created", response: "User" },
  { method: "GET", path: "/api/users/:id", status: "200 OK", response: "User" },
  { method: "PUT", path: "/api/users/:id", status: "200 OK", response: "User" },
  { method: "DELETE", path: "/api/users/:id", status: "204 No Content", response: "void" },
  { method: "POST", path: "/api/auth/login", status: "200 OK", response: "Token" },
]

const methodColors: Record<string, string> = {
  GET: "text-emerald-400 bg-emerald-500/10",
  POST: "text-blue-400 bg-blue-500/10",
  PUT: "text-amber-400 bg-amber-500/10",
  DELETE: "text-red-400 bg-red-500/10",
}

export function APIEndpointGenerator() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [visibleEndpoints, setVisibleEndpoints] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (!isInView) return

    const interval = setInterval(() => {
      setVisibleEndpoints(prev => {
        if (prev >= apiEndpoints.length) {
          clearInterval(interval)
          setTimeout(() => setIsComplete(true), 300)
          return prev
        }
        return prev + 1
      })
    }, 400)

    return () => clearInterval(interval)
  }, [isInView])

  return (
    <div ref={ref} className="relative">
      <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-b from-card/80 to-card/40 backdrop-blur-sm">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border/30">
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <Globe className="w-4 h-4 text-blue-500" />
            </div>
            <div>
              <span className="text-sm font-medium text-foreground">API Routes</span>
              <span className="text-xs text-muted-foreground ml-2">Auto-generated</span>
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isComplete ? 1 : 0 }}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20"
          >
            <Check className="w-3 h-3 text-emerald-500" />
            <span className="text-xs text-emerald-500 font-medium">6 endpoints</span>
          </motion.div>
        </div>

        {/* API Endpoints */}
        <div className="p-5 font-mono text-sm min-h-[300px]">
          <div className="space-y-2">
            {apiEndpoints.map((endpoint, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: index < visibleEndpoints ? 1 : 0,
                  x: index < visibleEndpoints ? 0 : -20,
                }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-3 p-3 rounded-lg bg-muted/20 border border-border/20"
              >
                <span className={`px-2 py-0.5 rounded text-xs font-bold ${methodColors[endpoint.method]}`}>
                  {endpoint.method}
                </span>
                <span className="text-foreground/80 flex-1">{endpoint.path}</span>
                <span className="text-muted-foreground text-xs hidden sm:inline">{endpoint.response}</span>
                {index < visibleEndpoints && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center gap-1"
                  >
                    <Lock className="w-3 h-3 text-emerald-500/50" />
                    <FileJson className="w-3 h-3 text-blue-500/50" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-border/30 bg-muted/20">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>OpenAPI 3.0</span>
            <span>•</span>
            <span>TypeScript</span>
          </div>
          {isComplete && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-1.5 text-xs text-muted-foreground"
            >
              <Zap className="w-3 h-3 text-amber-500" />
              <span>Edge-ready</span>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
