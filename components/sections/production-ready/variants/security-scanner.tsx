"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Shield, Check, AlertTriangle, Lock, Key, Fingerprint } from "lucide-react"

const securityChecks = [
  { id: "deps", label: "Dependency Audit", icon: Lock, status: "pass", details: "0 vulnerabilities" },
  { id: "secrets", label: "Secret Detection", icon: Key, status: "pass", details: "No exposed secrets" },
  { id: "headers", label: "Security Headers", icon: Shield, status: "pass", details: "CSP, HSTS enabled" },
  { id: "auth", label: "Auth Configuration", icon: Fingerprint, status: "pass", details: "JWT + OAuth 2.0" },
  { id: "xss", label: "XSS Protection", icon: Shield, status: "pass", details: "Sanitized inputs" },
  { id: "sql", label: "SQL Injection", icon: Lock, status: "pass", details: "Parameterized queries" },
]

export function SecurityScanner() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [scannedChecks, setScannedChecks] = useState<number>(-1)
  const [currentCheck, setCurrentCheck] = useState<number>(-1)

  useEffect(() => {
    if (!isInView) return

    let check = 0
    const runScan = () => {
      if (check >= securityChecks.length) return
      
      setCurrentCheck(check)
      
      setTimeout(() => {
        setScannedChecks(check)
        check++
        runScan()
      }, 600)
    }

    setTimeout(runScan, 300)
  }, [isInView])

  const getCheckStatus = (index: number) => {
    if (index <= scannedChecks) return "scanned"
    if (index === currentCheck) return "scanning"
    return "pending"
  }

  return (
    <div ref={ref} className="relative">
      <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-b from-card/80 to-card/40 backdrop-blur-sm">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border/30">
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <Shield className="w-4 h-4 text-emerald-500" />
            </div>
            <div>
              <span className="text-sm font-medium text-foreground">Security Scan</span>
              <span className="text-xs text-muted-foreground ml-2">Automated</span>
            </div>
          </div>
          
          {scannedChecks === securityChecks.length - 1 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20"
            >
              <Shield className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-xs text-emerald-500 font-bold">A+</span>
            </motion.div>
          )}
        </div>

        {/* Security Checks */}
        <div className="p-5 min-h-[300px]">
          <div className="space-y-3">
            {securityChecks.map((check, index) => {
              const status = getCheckStatus(index)
              const Icon = check.icon
              
              return (
                <motion.div
                  key={check.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.08 }}
                  className={`flex items-center gap-4 p-3 rounded-lg border transition-colors ${
                    status === "scanned" 
                      ? "bg-emerald-500/5 border-emerald-500/20" 
                      : status === "scanning"
                      ? "bg-amber-500/5 border-amber-500/20"
                      : "bg-muted/10 border-border/20"
                  }`}
                >
                  {/* Status Icon */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    status === "scanned" 
                      ? "bg-emerald-500/10" 
                      : status === "scanning"
                      ? "bg-amber-500/10"
                      : "bg-muted/30"
                  }`}>
                    {status === "scanned" ? (
                      <Check className="w-4 h-4 text-emerald-500" />
                    ) : status === "scanning" ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Icon className="w-4 h-4 text-amber-500" />
                      </motion.div>
                    ) : (
                      <Icon className="w-4 h-4 text-muted-foreground/40" />
                    )}
                  </div>

                  {/* Check Info */}
                  <div className="flex-1">
                    <span className={`text-sm font-medium ${
                      status === "pending" ? "text-muted-foreground/50" : "text-foreground"
                    }`}>
                      {check.label}
                    </span>
                    {status === "scanned" && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-xs text-emerald-500/70 mt-0.5"
                      >
                        {check.details}
                      </motion.p>
                    )}
                    {status === "scanning" && (
                      <motion.p
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-xs text-amber-500 mt-0.5"
                      >
                        Scanning...
                      </motion.p>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-border/30 bg-muted/20">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>OWASP Top 10</span>
            <span>•</span>
            <span>SOC 2 Ready</span>
          </div>
          {scannedChecks === securityChecks.length - 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-emerald-500 font-medium"
            >
              All checks passed
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
