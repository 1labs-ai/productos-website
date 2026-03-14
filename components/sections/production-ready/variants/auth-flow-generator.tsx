"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Shield, Check, Key, Users, Lock, Fingerprint, Mail, Github } from "lucide-react"

const authFeatures = [
  { id: "jwt", label: "JWT Authentication", icon: Key, code: "createJWT(user)" },
  { id: "oauth", label: "OAuth 2.0 / OIDC", icon: Github, code: "providers: [...]" },
  { id: "mfa", label: "Multi-Factor Auth", icon: Fingerprint, code: "verifyTOTP(code)" },
  { id: "sessions", label: "Session Management", icon: Users, code: "redis.session()" },
  { id: "rbac", label: "Role-Based Access", icon: Lock, code: "authorize(role)" },
  { id: "magic", label: "Magic Links", icon: Mail, code: "sendMagicLink()" },
]

export function AuthFlowGenerator() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeFeatures, setActiveFeatures] = useState<number>(-1)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (!isInView) return

    let feature = 0
    const enableFeatures = () => {
      if (feature >= authFeatures.length) {
        setIsComplete(true)
        return
      }
      
      setActiveFeatures(feature)
      feature++
      setTimeout(enableFeatures, 500)
    }

    setTimeout(enableFeatures, 300)
  }, [isInView])

  return (
    <div ref={ref} className="relative">
      <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-b from-card/80 to-card/40 backdrop-blur-sm">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border/30">
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-lg bg-violet-500/10 border border-violet-500/20">
              <Shield className="w-4 h-4 text-violet-500" />
            </div>
            <div>
              <span className="text-sm font-medium text-foreground">Auth System</span>
              <span className="text-xs text-muted-foreground ml-2">Auto-configured</span>
            </div>
          </div>
          
          {isComplete && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20"
            >
              <Check className="w-3 h-3 text-emerald-500" />
              <span className="text-xs text-emerald-500 font-medium">Secure</span>
            </motion.div>
          )}
        </div>

        {/* Auth Features Grid */}
        <div className="p-5 min-h-[300px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {authFeatures.map((feature, index) => {
              const isActive = index <= activeFeatures
              const Icon = feature.icon
              
              return (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: index * 0.08 }}
                  className={`relative p-4 rounded-xl border transition-all duration-300 ${
                    isActive 
                      ? "bg-violet-500/5 border-violet-500/30" 
                      : "bg-muted/10 border-border/20"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${
                      isActive ? "bg-violet-500/10" : "bg-muted/30"
                    }`}>
                      <Icon className={`w-4 h-4 ${
                        isActive ? "text-violet-400" : "text-muted-foreground/40"
                      }`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-medium ${
                          isActive ? "text-foreground" : "text-muted-foreground/50"
                        }`}>
                          {feature.label}
                        </span>
                        {isActive && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center"
                          >
                            <Check className="w-2.5 h-2.5 text-emerald-500" />
                          </motion.div>
                        )}
                      </div>
                      
                      {isActive && (
                        <motion.code
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="block mt-1.5 text-xs font-mono text-violet-400/70 truncate"
                        >
                          {feature.code}
                        </motion.code>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Summary */}
          {isComplete && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20 text-center"
            >
              <span className="text-xs text-emerald-500">
                ✓ Authentication ready • Zero config required
              </span>
            </motion.div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-border/30 bg-muted/20">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>NextAuth.js</span>
            <span>•</span>
            <span>Clerk Compatible</span>
          </div>
          {isComplete && (
            <div className="flex items-center gap-2">
              <Github className="w-3 h-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">+ 4 providers</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
