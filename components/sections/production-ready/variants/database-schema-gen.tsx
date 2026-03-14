"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Database, Table, Key, Link2, Check, Sparkles } from "lucide-react"

const schemaLines = [
  { text: "// Auto-generated Prisma Schema", type: "comment" },
  { text: "", type: "empty" },
  { text: "model User {", type: "model" },
  { text: "  id        String   @id @default(cuid())", type: "field" },
  { text: "  email     String   @unique", type: "field" },
  { text: "  name      String?", type: "field" },
  { text: "  posts     Post[]", type: "relation" },
  { text: "  createdAt DateTime @default(now())", type: "field" },
  { text: "}", type: "model" },
  { text: "", type: "empty" },
  { text: "model Post {", type: "model" },
  { text: "  id        String   @id @default(cuid())", type: "field" },
  { text: "  title     String", type: "field" },
  { text: "  content   String?", type: "field" },
  { text: "  author    User     @relation(fields: [authorId])", type: "relation" },
  { text: "  authorId  String", type: "field" },
  { text: "}", type: "model" },
]

const dbStats = [
  { label: "Tables", value: "2", icon: Table },
  { label: "Fields", value: "10", icon: Database },
  { label: "Relations", value: "1", icon: Link2 },
  { label: "Indexes", value: "3", icon: Key },
]

export function DatabaseSchemaGen() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [currentLine, setCurrentLine] = useState(-1)
  const [isMigrated, setIsMigrated] = useState(false)

  useEffect(() => {
    if (!isInView) return

    let line = 0
    const interval = setInterval(() => {
      if (line >= schemaLines.length) {
        clearInterval(interval)
        setTimeout(() => setIsMigrated(true), 500)
        return
      }
      setCurrentLine(line)
      line++
    }, 120)

    return () => clearInterval(interval)
  }, [isInView])

  const getLineColor = (type: string) => {
    switch (type) {
      case "comment": return "text-muted-foreground/50"
      case "model": return "text-violet-400"
      case "field": return "text-foreground/70"
      case "relation": return "text-emerald-400"
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
            <div className="p-1.5 rounded-lg bg-violet-500/10 border border-violet-500/20">
              <Database className="w-4 h-4 text-violet-500" />
            </div>
            <div>
              <span className="text-sm font-medium text-foreground">Database Schema</span>
              <span className="text-xs text-muted-foreground ml-2">schema.prisma</span>
            </div>
          </div>
          
          {isMigrated ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20"
            >
              <Check className="w-3 h-3 text-emerald-500" />
              <span className="text-xs text-emerald-500 font-medium">Migrated</span>
            </motion.div>
          ) : (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/20">
              <Sparkles className="w-3 h-3 text-violet-500" />
              <span className="text-xs text-violet-500 font-medium">Generating</span>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-[1fr,200px]">
          {/* Schema Code */}
          <div className="p-5 font-mono text-sm border-r border-border/30">
            <div className="space-y-0.5 min-h-[300px]">
              {schemaLines.map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{
                    opacity: index <= currentLine ? 1 : 0,
                    x: index <= currentLine ? 0 : -10,
                  }}
                  transition={{ duration: 0.1 }}
                  className={`flex items-center gap-3 ${getLineColor(line.type)}`}
                >
                  <span className="w-4 text-right text-muted-foreground/30 text-xs select-none">
                    {index + 1}
                  </span>
                  <span className="whitespace-pre">{line.text}</span>
                  {index === currentLine && currentLine < schemaLines.length - 1 && (
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

          {/* Stats Panel */}
          <div className="p-5 bg-muted/10">
            <p className="text-xs text-muted-foreground mb-4">Schema Stats</p>
            <div className="space-y-3">
              {dbStats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, x: 10 }}
                    animate={isMigrated ? { opacity: 1, x: 0 } : { opacity: 0.3, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{stat.label}</span>
                    </div>
                    <span className="text-sm font-medium text-foreground">{stat.value}</span>
                  </motion.div>
                )
              })}
            </div>

            {isMigrated && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20"
              >
                <p className="text-xs text-emerald-500 font-medium mb-1">Migration Complete</p>
                <p className="text-xs text-muted-foreground">
                  Database synced with Neon
                </p>
              </motion.div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-border/30 bg-muted/20">
          <span className="text-xs text-muted-foreground font-mono">prisma migrate dev</span>
          <span className="text-xs text-muted-foreground">PostgreSQL</span>
        </div>
      </div>
    </div>
  )
}
