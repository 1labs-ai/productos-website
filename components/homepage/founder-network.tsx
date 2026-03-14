"use client"

import { motion } from 'framer-motion'
import { User, Search, Palette, Code2, ClipboardList } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FounderNetworkProps {
  className?: string
}

export const FounderNetwork = ({ className }: FounderNetworkProps) => {
  const roles = [
    { id: 'pm', icon: ClipboardList, label: 'PM', x: -110, y: -85 },
    { id: 'research', icon: Search, label: 'Researcher', x: 110, y: -85 },
    { id: 'design', icon: Palette, label: 'Designer', x: -110, y: 85 },
    { id: 'eng', icon: Code2, label: 'Engineer', x: 110, y: 85 },
  ]

  return (
    <div className={cn("relative w-full flex items-center justify-center", className)}>
      {/* Container - sized to match other figures */}
      <div className="relative w-[320px] h-[320px] flex items-center justify-center">

        {/* SVG for Organic Connections */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 320 320">
          <defs>
            <filter id="glow-neural">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <linearGradient id="line-grad-fn" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255,255,255,0)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.2)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
          </defs>

          {roles.map((role, i) => {
            // Shorten endpoint to stop at box corner (box is 48px, offset by ~28px toward center)
            const cornerOffset = 28
            const endX = 160 + role.x + (role.x < 0 ? cornerOffset : -cornerOffset)
            const endY = 160 + role.y + (role.y < 0 ? cornerOffset : -cornerOffset)

            // Create a curved path that ends at the box corner
            const cx1 = 160 + role.x * 0.4
            const cy1 = 160
            const cx2 = 160
            const cy2 = 160 + role.y * 0.4

            const path = `M 160 160 C ${cx1} ${cy1}, ${cx2} ${cy2}, ${endX} ${endY}`

            return (
              <g key={i}>
                <motion.path
                  d={path}
                  fill="none"
                  stroke="url(#line-grad-fn)"
                  strokeWidth="1.5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 2, delay: i * 0.3 }}
                />

                {/* Flowing Data Particles */}
                {[...Array(3)].map((_, j) => (
                  <motion.circle
                    key={j}
                    r="1.5"
                    fill="white"
                    filter="url(#glow-neural)"
                    initial={{ offsetDistance: "0%", opacity: 0 }}
                    animate={{
                      offsetDistance: ["0%", "100%"],
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 3 + j * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.5 + j * 1.2
                    }}
                    style={{
                      offsetPath: `path('${path}')`,
                    }}
                  />
                ))}
              </g>
            )
          })}
        </svg>

        {/* Nodes Layer */}
        <div className="relative w-full h-full flex items-center justify-center">

          {/* Center Founder Node */}
          <div className="relative z-30">
            <div className="w-16 h-16 rounded-full border border-foreground/10 dark:border-white/10 flex items-center justify-center bg-background dark:bg-[#0A0A0A] shadow-[0_0_50px_rgba(255,255,255,0.05)]">
              <div className="w-11 h-11 rounded-full border border-foreground/5 dark:border-white/5 flex items-center justify-center text-foreground/80 dark:text-white/80">
                <User size={22} strokeWidth={1} />
              </div>

              {/* Orbiting Ring */}
              <motion.div
                className="absolute inset-[-10px] rounded-full border border-foreground/5 dark:border-white/5 border-dashed"
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
              style={{ x: role.x, y: role.y }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + i * 0.2, type: "spring", stiffness: 100 }}
            >
              <div className="group relative">
                <div className="w-12 h-12 rounded-xl border border-foreground/10 dark:border-white/10 bg-foreground/[0.02] dark:bg-white/[0.02] flex items-center justify-center text-foreground/30 dark:text-white/30 group-hover:text-foreground dark:group-hover:text-white group-hover:border-foreground/30 dark:group-hover:border-white/30 transition-all duration-500">
                  <role.icon size={18} strokeWidth={1} />
                </div>

                {/* Corner Accents */}
                <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-foreground/20 dark:border-white/20" />
                <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-foreground/20 dark:border-white/20" />
              </div>

              <span className="text-[8px] font-mono uppercase tracking-[0.2em] text-foreground/20 dark:text-white/20">
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
