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
    { id: 'research', icon: Search, label: 'RESEARCHER', x: 90, y: -50 },
    { id: 'design', icon: Palette, label: 'DESIGNER', x: -90, y: 50 },
    { id: 'eng', icon: Code2, label: 'ENGINEER', x: 90, y: 50 },
  ]

  return (
    <div className={cn("relative w-full flex items-center justify-center", className)}>
      {/* Container */}
      <div className="relative w-[300px] h-[220px] flex flex-col items-center justify-center">
        
        {/* Header Label */}
        <div className="absolute top-0 left-0 right-0 flex justify-center">
          <span className="text-[8px] font-mono uppercase tracking-[0.2em] text-foreground/30 dark:text-white/30">
            FIG 0.3 / NEURAL FLOW
          </span>
        </div>
        
        {/* SVG for Connections and Concentric Rings */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 300 220">
          <defs>
            <filter id="glow-neural">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Concentric Rings around center */}
          {[45, 55, 65].map((r, i) => (
            <circle
              key={`ring-${i}`}
              cx="150"
              cy="110"
              r={r}
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-foreground/10 dark:text-white/10"
              strokeDasharray={i === 2 ? "4 4" : "none"}
            />
          ))}
          
          {/* Tick marks on outer ring */}
          {Array.from({ length: 36 }).map((_, i) => {
            const angle = (i * 10 * Math.PI) / 180
            const x1 = 150 + Math.cos(angle) * 62
            const y1 = 110 + Math.sin(angle) * 62
            const x2 = 150 + Math.cos(angle) * 68
            const y2 = 110 + Math.sin(angle) * 68
            return (
              <line
                key={`tick-${i}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-foreground/15 dark:text-white/15"
              />
            )
          })}
          
          {/* Connection lines to role nodes */}
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
                  className="text-foreground/20 dark:text-white/20"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 2, delay: i * 0.3 }}
                />
                
                {/* Small dot at connection point on outer ring */}
                <circle
                  cx={150 + role.x * 0.45}
                  cy={110 + role.y * 0.45}
                  r="2"
                  className="fill-foreground/30 dark:fill-white/30"
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
            <div className="w-16 h-16 rounded-full border border-foreground/15 dark:border-white/15 flex items-center justify-center bg-background dark:bg-[#0A0A0A] shadow-[0_0_30px_rgba(0,0,0,0.1)] dark:shadow-[0_0_30px_rgba(255,255,255,0.03)]">
              <div className="w-11 h-11 rounded-full border border-foreground/10 dark:border-white/10 flex items-center justify-center text-foreground/70 dark:text-white/70">
                <User size={22} strokeWidth={1.5} />
              </div>
            </div>
          </div>

          {/* Role Nodes */}
          {roles.map((role, i) => (
            <motion.div
              key={role.id}
              className="absolute z-20 flex flex-col items-center gap-1.5"
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
                <div className="w-11 h-11 rounded-xl border border-foreground/20 dark:border-white/20 bg-background dark:bg-[#0A0A0A] flex items-center justify-center text-foreground/60 dark:text-white/60 group-hover:text-foreground dark:group-hover:text-white group-hover:border-foreground/40 dark:group-hover:border-white/40 transition-all duration-500">
                  <role.icon size={18} strokeWidth={1.5} />
                </div>
                
                {/* Corner Accents */}
                <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-foreground/30 dark:border-white/30" />
                <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-foreground/30 dark:border-white/30" />
              </div>
              
              <span className="text-[9px] font-mono uppercase tracking-[0.15em] text-foreground/40 dark:text-white/40">
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
