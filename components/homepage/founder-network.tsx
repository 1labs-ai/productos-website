"use client"

import { motion } from 'framer-motion'
import { User, Search, Palette, Code2, ClipboardList } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FounderNetworkProps {
  className?: string
}

export const FounderNetwork = ({ className }: FounderNetworkProps) => {
  const roles = [
    { id: 'pm', icon: ClipboardList, label: 'PM', x: -90, y: -90 },
    { id: 'research', icon: Search, label: 'RESEARCHER', x: 90, y: -90 },
    { id: 'design', icon: Palette, label: 'DESIGNER', x: -90, y: 90 },
    { id: 'eng', icon: Code2, label: 'ENGINEER', x: 90, y: 90 },
  ]

  return (
    <div className={cn("relative w-full flex flex-col items-center", className)}>
      {/* Figure Label */}
      <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-foreground/20 dark:text-white/20 mb-auto self-start">
        Fig 0.3 / Neural Flow
      </div>

      {/* The Figure Visualization */}
      <div className="relative flex-1 flex items-center justify-center w-full h-[220px] sm:h-[260px] md:h-[280px]">

        {/* SVG for Organic Connections */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400">
          <defs>
            <filter id="glow-neural">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" className="[stop-color:currentColor]" stopOpacity="0" />
              <stop offset="50%" className="[stop-color:currentColor]" stopOpacity="0.2" />
              <stop offset="100%" className="[stop-color:currentColor]" stopOpacity="0" />
            </linearGradient>
          </defs>

          {roles.map((role, i) => {
            const x2 = 200 + role.x;
            const y2 = 200 + role.y;

            // Create a curved path instead of a straight line
            const cx1 = 200 + role.x * 0.5;
            const cy1 = 200;
            const cx2 = 200;
            const cy2 = 200 + role.y * 0.5;

            const path = `M 200 200 C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`;

            return (
              <g key={i}>
                <motion.path
                  d={path}
                  fill="none"
                  stroke="url(#line-grad)"
                  strokeWidth="1.5"
                  className="text-foreground dark:text-white"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 2, delay: i * 0.3 }}
                />

                {/* Flowing Data Particles */}
                {[...Array(3)].map((_, j) => (
                  <motion.circle
                    key={j}
                    r="1.5"
                    fill="currentColor"
                    className="text-foreground dark:text-white"
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
            );
          })}
        </svg>

        {/* Nodes Layer */}
        <div className="relative w-full h-full flex items-center justify-center">

          {/* Center Founder Node */}
          <div className="relative z-30">
            <div className="w-16 h-16 sm:w-18 md:w-20 sm:h-18 md:h-20 rounded-full border border-foreground/10 dark:border-white/10 flex items-center justify-center bg-background dark:bg-[#0A0A0A] shadow-[0_0_50px_rgba(0,0,0,0.05)] dark:shadow-[0_0_50px_rgba(255,255,255,0.05)]">
              <div className="w-10 h-10 sm:w-12 md:w-14 sm:h-12 md:h-14 rounded-full border border-foreground/5 dark:border-white/5 flex items-center justify-center text-foreground/80 dark:text-white/80">
                <User className="w-5 h-5 sm:w-6 md:w-7 sm:h-6 md:h-7" strokeWidth={1} />
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
              className="absolute z-20 flex flex-col items-center gap-2 sm:gap-3"
              style={{ 
                left: `calc(50% + ${role.x * 0.8}px)`,
                top: `calc(50% + ${role.y * 0.8}px)`,
                transform: 'translate(-50%, -50%)'
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + i * 0.2, type: "spring", stiffness: 100 }}
            >
              <div className="group relative">
                <div className="w-11 h-11 sm:w-12 md:w-14 sm:h-12 md:h-14 rounded-xl sm:rounded-2xl border border-foreground/10 dark:border-white/10 bg-foreground/[0.02] dark:bg-white/[0.02] flex items-center justify-center text-foreground/30 dark:text-white/30 group-hover:text-foreground dark:group-hover:text-white group-hover:border-foreground/30 dark:group-hover:border-white/30 transition-all duration-500">
                  <role.icon className="w-4 h-4 sm:w-5 md:w-5 sm:h-5 md:h-5" strokeWidth={1} />
                </div>

                {/* Corner Accents */}
                <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-foreground/20 dark:border-white/20" />
                <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-foreground/20 dark:border-white/20" />
              </div>

              <span className="text-[7px] sm:text-[8px] font-mono uppercase tracking-[0.2em] sm:tracking-[0.3em] text-foreground/20 dark:text-white/20">
                {role.label}
              </span>
            </motion.div>
          ))}

        </div>
      </div>

      {/* Empty space at bottom to maintain layout balance */}
      <div className="h-8 sm:h-12" />
    </div>
  )
}

export default FounderNetwork
