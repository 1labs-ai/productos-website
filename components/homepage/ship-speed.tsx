"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, Cpu, ShieldCheck, Box } from 'lucide-react'
import { cn } from '@/lib/utils'

const PIPELINE_STEPS = [
  { id: 'conv', label: 'CONVERSATION', icon: Terminal, duration: '2D' },
  { id: 'code', label: 'REAL CODE', icon: Cpu, duration: '4D' },
  { id: 'test', label: 'REAL TESTS', icon: ShieldCheck, duration: '2D' },
  { id: 'infra', label: 'INFRASTRUCTURE', icon: Box, duration: '4D' }
]

interface ShipSpeedProps {
  className?: string
}

export const ShipSpeed = ({ className }: ShipSpeedProps) => {
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % PIPELINE_STEPS.length)
    }, 2000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className={cn("relative w-full flex flex-col items-center", className)}>
      
      {/* Header: Time Compression Metric */}
      <div className="w-full flex justify-between items-end mb-6 px-1">
        <div className="space-y-0.5">
          <div className="text-[8px] font-mono text-foreground/20 dark:text-white/20 uppercase tracking-[0.2em]">Metric / Velocity</div>
          <div className="text-2xl font-light tracking-tighter flex items-baseline gap-1.5 text-foreground dark:text-white">
            12 <span className="text-[10px] font-mono text-foreground/40 dark:text-white/40 uppercase tracking-widest">Days</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[8px] font-mono text-foreground/20 dark:text-white/20 uppercase tracking-[0.2em]">Status</div>
          <div className="text-[10px] font-mono text-foreground/60 dark:text-white/60 uppercase tracking-widest flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-foreground dark:bg-white animate-pulse" />
            Optimized
          </div>
        </div>
      </div>

      {/* The Pipeline */}
      <div className="w-full space-y-1.5">
        {PIPELINE_STEPS.map((step, index) => {
          const isActive = activeStep === index
          const isPast = activeStep > index

          return (
            <div key={step.id} className="relative group">
              <motion.div 
                className={cn(
                  "relative h-12 border rounded-xl overflow-hidden transition-colors duration-500 flex items-center px-3",
                  isActive 
                    ? 'bg-foreground/5 dark:bg-white/5 border-foreground/30 dark:border-white/30' 
                    : 'bg-transparent border-foreground/10 dark:border-white/10'
                )}
              >
                {/* Active Scan Line */}
                {isActive && (
                  <motion.div 
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-foreground/[0.05] dark:via-white/[0.05] to-transparent skew-x-12"
                  />
                )}

                {/* Step Info */}
                <div className="flex-1 flex items-center gap-2.5">
                  <div className={cn(
                    "w-7 h-7 rounded-lg flex items-center justify-center border transition-all duration-500",
                    isActive 
                      ? 'bg-foreground dark:bg-white text-background dark:text-black border-foreground dark:border-white' 
                      : 'bg-foreground/5 dark:bg-white/5 text-foreground/20 dark:text-white/20 border-foreground/5 dark:border-white/5'
                  )}>
                    <step.icon size={14} strokeWidth={1.5} />
                  </div>
                  
                  <div className="flex flex-col">
                    <span className={cn(
                      "text-[7px] font-mono tracking-[0.15em] transition-colors duration-500",
                      isActive ? 'text-foreground/80 dark:text-white/80' : 'text-foreground/20 dark:text-white/20'
                    )}>
                      STEP 0{index + 1}
                    </span>
                    <span className={cn(
                      "text-[10px] font-medium tracking-wide transition-colors duration-500",
                      isActive ? 'text-foreground dark:text-white' : 'text-foreground/40 dark:text-white/40'
                    )}>
                      {step.label}
                    </span>
                  </div>
                </div>

                {/* Duration Badge */}
                <div className={cn(
                  "font-mono text-[8px] px-2 py-0.5 rounded-full border transition-all duration-500",
                  isActive 
                    ? 'border-foreground/40 dark:border-white/40 text-foreground dark:text-white' 
                    : 'border-foreground/5 dark:border-white/5 text-foreground/10 dark:text-white/10'
                )}>
                  {step.duration}
                </div>

                {/* Connection Line */}
                {index < PIPELINE_STEPS.length - 1 && (
                  <div className="absolute -bottom-1.5 left-[22px] w-[1px] h-1.5 bg-foreground/10 dark:bg-white/10" />
                )}
              </motion.div>

              {/* Checkmark for past steps */}
              <AnimatePresence>
                {isPast && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-foreground dark:bg-white flex items-center justify-center text-background dark:text-black"
                  >
                    <ShieldCheck size={8} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>

      {/* Footer: Progress Bars */}
      <div className="mt-6 w-full pt-4 border-t border-foreground/5 dark:border-white/5 flex justify-between items-center">
        <div className="flex gap-0.5 items-center">
          {[...Array(12)].map((_, i) => (
            <div 
              key={i} 
              className={cn(
                "w-0.5 rounded-full transition-all duration-1000",
                i < (activeStep + 1) * 3 
                  ? 'bg-foreground/40 dark:bg-white/40 h-4' 
                  : 'bg-foreground/5 dark:bg-white/5 h-2.5'
              )} 
            />
          ))}
        </div>
        <div className="text-[7px] font-mono text-foreground/20 dark:text-white/20 uppercase tracking-[0.3em]">
          Time 1:2.5
        </div>
      </div>
    </div>
  )
}

export default ShipSpeed
