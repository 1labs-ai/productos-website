"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Check, Cloud, Loader2, ArrowRight } from "lucide-react"

const cloudProviders = [
  { 
    id: "vercel", 
    name: "Vercel", 
    url: "app.vercel.app",
    color: "text-foreground",
    bgColor: "bg-foreground/5",
    borderColor: "border-foreground/20"
  },
  { 
    id: "netlify", 
    name: "Netlify", 
    url: "app.netlify.app",
    color: "text-teal-500",
    bgColor: "bg-teal-500/10",
    borderColor: "border-teal-500/20"
  },
  { 
    id: "aws", 
    name: "AWS Amplify", 
    url: "app.amplify.aws",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/20"
  },
  { 
    id: "cloudflare", 
    name: "Cloudflare", 
    url: "app.pages.dev",
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/20"
  },
]

export function MultiCloudDeploy() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [deployedProviders, setDeployedProviders] = useState<string[]>([])
  const [currentProvider, setCurrentProvider] = useState<string | null>(null)

  useEffect(() => {
    if (!isInView) return

    let index = 0
    const deployNext = () => {
      if (index >= cloudProviders.length) {
        setCurrentProvider(null)
        return
      }
      
      const provider = cloudProviders[index]
      setCurrentProvider(provider.id)
      
      setTimeout(() => {
        setDeployedProviders(prev => [...prev, provider.id])
        index++
        deployNext()
      }, 700)
    }

    setTimeout(deployNext, 500)
  }, [isInView])

  return (
    <div ref={ref} className="relative">
      <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-b from-card/80 to-card/40 backdrop-blur-sm">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border/30">
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <Cloud className="w-4 h-4 text-blue-500" />
            </div>
            <div>
              <span className="text-sm font-medium text-foreground">Multi-Cloud Deploy</span>
              <span className="text-xs text-muted-foreground ml-2">One click, everywhere</span>
            </div>
          </div>
        </div>

        {/* Deploy Flow */}
        <div className="p-5">
          {/* Source */}
          <div className="flex items-center justify-center mb-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-violet-500/10 border border-violet-500/20"
            >
              <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center">
                <span className="text-lg">⚡</span>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">ProductOS Build</p>
                <p className="text-xs text-muted-foreground">Production bundle ready</p>
              </div>
            </motion.div>
          </div>

          {/* Arrow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="flex justify-center mb-6"
          >
            <ArrowRight className="w-5 h-5 text-muted-foreground/50 rotate-90" />
          </motion.div>

          {/* Cloud Providers Grid */}
          <div className="grid grid-cols-2 gap-3">
            {cloudProviders.map((provider, index) => {
              const isDeployed = deployedProviders.includes(provider.id)
              const isDeploying = currentProvider === provider.id
              
              return (
                <motion.div
                  key={provider.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className={`relative p-4 rounded-xl border transition-all duration-300 ${
                    isDeployed 
                      ? `${provider.bgColor} ${provider.borderColor}` 
                      : "bg-muted/20 border-border/30"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-sm font-medium ${isDeployed ? provider.color : "text-muted-foreground"}`}>
                      {provider.name}
                    </span>
                    {isDeployed ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className={`w-5 h-5 rounded-full flex items-center justify-center ${provider.bgColor}`}
                      >
                        <Check className={`w-3 h-3 ${provider.color}`} />
                      </motion.div>
                    ) : isDeploying ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Loader2 className="w-4 h-4 text-muted-foreground" />
                      </motion.div>
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-muted/30" />
                    )}
                  </div>
                  
                  {isDeployed && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-1"
                    >
                      <div className="relative">
                        <div className={`w-1.5 h-1.5 rounded-full ${provider.color.replace("text-", "bg-")}`} />
                        <div className={`absolute inset-0 w-1.5 h-1.5 rounded-full ${provider.color.replace("text-", "bg-")} animate-ping`} />
                      </div>
                      <span className="text-xs text-muted-foreground font-mono">{provider.url}</span>
                    </motion.div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-border/30 bg-muted/20">
          <span className="text-xs text-muted-foreground">
            {deployedProviders.length}/{cloudProviders.length} providers deployed
          </span>
          {deployedProviders.length === cloudProviders.length && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-emerald-500 font-medium"
            >
              Global availability ✓
            </motion.span>
          )}
        </div>
      </div>
    </div>
  )
}
