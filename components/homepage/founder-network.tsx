"use client"

import { motion } from 'framer-motion'
import { User, Search, Palette, Code2, ClipboardList } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FounderNetworkProps {
  className?: string
}

export const FounderNetwork = ({ className }: FounderNetworkProps) => {
  const roles = [
    { id: 'pm', icon: ClipboardList, label: 'PM', x: -90, y: -50 },
    { id: 'research', icon: Search, label: 'Researcher', x: 90, y: -50 },
    { id: 'design', icon: Palette, label: 'Designer', x: -90, y: 50 },
    { id: 'eng', icon: Code2, label: 'Engineer', x: 90, y: 50 },
  ]

  return (
    <div className={cn("relative w-full flex items-center justify-center", className)}>
      {/* Container */}
      <div className="relative w-[300px] h-[220px] flex items-center justify-center">
        
        {/* SVG for Organic Connections */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 300 220">
          <defs>
            <filter id="glow-neural">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <linearGradient id="line-grad-founder" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" className="[stop-color:rgb(var(--foreground)/0)] dark:[stop-color:rgba(255,255,255,0)]" />
              <stop offset="50%" className="[stop-color:rgb(var(--foreground)/0.2)] dark:[stop-color:rgba(255,255,255,0.2)]" />
              <stop offset="100%" className="[stop-color:rgb(var(--foreground)/0)] dark:[stop-color:rgba(255,255,255,0)]" />
            </linearGradient>
          </defs>
          
          {roles.map((role, i) => {
            const x2 = 150 + role.x
            const y2 = 110 + role.y
            
            // Create a curved path
            const cx1 = 150 + role.x * 0.5
            const cy1 = 110
            const cx2 = 150
            const cy2 = 110 + role.y * 0.5
            
            const path = `M 150 110 C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`

            return (
              <g key={i}>
                <motion.path
                  d={path}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-foreground/15 dark:text-white/15"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 2, delay: i * 0.3 }}
                />
                
                {/* Flowing Data Particles */}
                <motion.circle
                  r="1.5"
                  className="fill-foreground dark:fill-white"
                  filter="url(#glow-neural)"
                  initial={{ offsetDistance: "0%", opacity: 0 }}
                  animate={{ 
                    offsetDistance: ["0%", "100%"],
                    opacity: [0, 0.8, 0]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: i * 0.8
                  }}
                  style={{
                    offsetPath: `path('${path}')`,
                  }}
                />
              </g>
            )
          })}
        </svg>

        {/* Nodes Layer */}
        <div className="relative w-full h-full flex items-center justify-center">
          
          {/* Center Founder Node */}
          <div className="relative z-30">
            <div className="w-16 h-16 rounded-full border border-foreground/10 dark:border-white/10 flex items-center justify-center bg-background dark:bg-[#0A0A0A] shadow-[0_0_30px_rgba(0,0,0,0.1)] dark:shadow-[0_0_30px_rgba(255,255,255,0.03)]">
              <div className="w-11 h-11 rounded-full border border-foreground/5 dark:border-white/5 flex items-center justify-center text-foreground/70 dark:text-white/70">
                <User size={22} strokeWidth={1} />
              </div>
              
              {/* Orbiting Ring */}
              <motion.div 
                className="absolute inset-[-8px] rounded-full border border-foreground/5 dark:border-white/5 border-dashed"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </div>

          {/* Role Nodes */}
          {roles.map((role, i) => (
            <motion.div
              key={role.id}
              className="absolute z-20 flex flex-col items-center gap-2"
              style={{ 
                left: `calc(50% + ${role.x}px)`, 
                top: `calc(50% + ${role.y}px)`,
                transform: 'translate(-50%, -50%)'
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + i * 0.2, type: "spring", stiffness: 100 }}
            >
              <div className="group relative">
                <div className="w-10 h-10 rounded-xl border border-foreground/20 dark:border-white/20 bg-foreground/[0.03] dark:bg-white/[0.03] flex items-center justify-center text-foreground/50 dark:text-white/50 group-hover:text-foreground dark:group-hover:text-white group-hover:border-foreground/40 dark:group-hover:border-white/40 transition-all duration-500">
                  <role.icon size={18} strokeWidth={1.5} />
                </div>
                
                {/* Corner Accents */}
                <div className="absolute -top-0.5 -left-0.5 w-1.5 h-1.5 border-t border-l border-foreground/20 dark:border-white/20" />
                <div className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 border-b border-r border-foreground/20 dark:border-white/20" />
              </div>
              
              <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-foreground/50 dark:text-white/50">
                {role.label}
              </span>
            </motion.div>
          ))}

        </div>
      </div>
    </div>
  )
}

export default FounderNetwork
