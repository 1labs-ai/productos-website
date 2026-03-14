"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Layers, Lightbulb, Search, FileText, Palette, Code } from 'lucide-react'
import { cn } from '@/lib/utils'

const AGENTS = [
  { id: 'product-os', name: 'Product OS', icon: Layers, pos: { x: '50%', y: '50%' }, size: 'large' as const },
  { id: 'ideate', name: 'Ideate', icon: Lightbulb, pos: { x: '50%', y: '15%' }, size: 'small' as const },
  { id: 'discover', name: 'Discover', icon: Search, pos: { x: '85%', y: '38%' }, size: 'small' as const },
  { id: 'define', name: 'Define', icon: FileText, pos: { x: '72%', y: '82%' }, size: 'small' as const },
  { id: 'design', name: 'Design', icon: Palette, pos: { x: '28%', y: '82%' }, size: 'small' as const },
  { id: 'develop', name: 'Develop', icon: Code, pos: { x: '15%', y: '38%' }, size: 'small' as const }
]

interface AgentFigureProps {
  className?: string
}

export const AgentFigure = ({ className }: AgentFigureProps) => {
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % AGENTS.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className={cn("relative w-full flex items-center justify-center", className)}>
      {/* Container - centered square, responsive */}
      <div className="relative w-[240px] sm:w-[280px] md:w-[320px] h-[240px] sm:h-[280px] md:h-[320px] rounded-3xl overflow-visible flex items-center justify-center">

        {/* Connection Lines (SVG) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible text-foreground dark:text-white">
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" className="[stop-color:currentColor]" stopOpacity="0.05" />
              <stop offset="50%" className="[stop-color:currentColor]" stopOpacity="0.3" />
              <stop offset="100%" className="[stop-color:currentColor]" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          
          {/* Circular path connecting the 5 outer nodes */}
          <motion.circle
            cx="50%"
            cy="50%"
            r="35%"
            fill="none"
            stroke="url(#lineGrad)"
            strokeWidth="1.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />

          {/* Hub Spokes - lines from center to each outer node */}
          {AGENTS.slice(1).map((agent, i) => (
            <line
              key={i}
              x1="50%"
              y1="50%"
              x2={agent.pos.x}
              y2={agent.pos.y}
              stroke="currentColor"
              strokeWidth="1"
              strokeOpacity="0.25"
              strokeDasharray="2 4"
            />
          ))}
        </svg>

        {/* Nodes */}
        <div className="relative w-full h-full">
          {AGENTS.map((agent, index) => {
            const isActive = activeStep === index
            const Icon = agent.icon
            const isHub = agent.size === 'large'

            return (
              <motion.div
                key={agent.id}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                style={{ left: agent.pos.x, top: agent.pos.y }}
              >
                <motion.button
                  onClick={() => setActiveStep(index)}
                  className={cn(
                    "relative z-10 rounded-full flex items-center justify-center transition-all duration-500",
                    isHub ? 'w-14 h-14' : 'w-9 h-9',
                    isActive 
                      ? 'bg-foreground text-background shadow-[0_0_20px_rgba(0,0,0,0.2)] dark:shadow-[0_0_20px_rgba(255,255,255,0.3)]' 
                      : 'bg-foreground/5 text-foreground/60 border border-foreground/20 hover:border-foreground/40 dark:bg-white/[0.03] dark:text-white/40 dark:border-white/10 dark:hover:border-white/30'
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={isHub ? 24 : 14} strokeWidth={1.5} />
                  
                  {/* Active Pulse Ring */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-foreground dark:border-white"
                      initial={{ scale: 1, opacity: 0.5 }}
                      animate={{ scale: 1.5, opacity: 0 }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}

                  {/* Outer Ring for Hub */}
                  {isHub && (
                    <div className="absolute inset-[-8px] rounded-full border border-foreground/20 dark:border-white/10" />
                  )}
                </motion.button>

                {/* Label - shows when active */}
                <motion.span 
                  className={cn(
                    "absolute -bottom-5 text-[7px] font-mono uppercase tracking-[0.15em] text-foreground/70 dark:text-white/60 transition-all duration-500 whitespace-nowrap",
                    isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
                  )}
                >
                  {agent.name}
                </motion.span>
              </motion.div>
            )
          })}
        </div>

        {/* Flowing Particle on the circular path */}
        <motion.div
          className="absolute w-1 h-1 rounded-full bg-white blur-[1px] z-20"
          style={{
            left: '50%',
            top: '15%',
          }}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
    </div>
  )
}

export default AgentFigure
