"use client"

import { motion } from 'framer-motion'
import { User, Search, Palette, Code2, ClipboardList } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FounderNetworkProps {
  className?: string
}

export const FounderNetwork = ({ className }: FounderNetworkProps) => {
  const roles = [
    { id: 'pm', icon: ClipboardList, label: 'PM', x: 0, y: -140 },
    { id: 'research', icon: Search, label: 'Researcher', x: 140, y: 0 },
    { id: 'design', icon: Palette, label: 'Designer', x: 0, y: 140 },
    { id: 'eng', icon: Code2, label: 'Engineer', x: -140, y: 0 },
  ]

  return (
    <div className={cn("flex items-center justify-center", className)}>
      {/* Square Card Container */}
      <div className="relative aspect-square w-full max-w-[440px] bg-foreground/[0.02] dark:bg-white/[0.02] border border-foreground/10 dark:border-white/10 rounded-[40px] overflow-hidden flex flex-col p-12">
        
        {/* Figure Label */}
        <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-foreground/30 dark:text-white/30 mb-auto">
          Fig 0.3 / Geometric Synthesis
        </div>

        {/* The Figure Visualization */}
        <div className="relative flex-1 flex items-center justify-center">
          
          {/* Background Diamond Grid */}
          <div className="absolute w-[280px] h-[280px] border border-foreground/5 dark:border-white/5 rotate-45" />
          <div className="absolute w-[200px] h-[200px] border border-foreground/5 dark:border-white/5 rotate-45" />

          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400">
            <g transform="translate(200, 200)">
              {roles.map((role, i) => (
                <motion.line
                  key={i}
                  x1="0"
                  y1="0"
                  x2={role.x}
                  y2={role.y}
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-foreground/10 dark:text-white/10"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 0.2 }}
                />
              ))}
              
              {/* Outer Perimeter Lines */}
              {roles.map((role, i) => {
                const nextRole = roles[(i + 1) % roles.length]
                return (
                  <motion.line
                    key={`p-${i}`}
                    x1={role.x}
                    y1={role.y}
                    x2={nextRole.x}
                    y2={nextRole.y}
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-foreground/5 dark:text-white/5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 0.5 }}
                  />
                )
              })}
            </g>
          </svg>

          {/* Scanning Bar Animation */}
          <motion.div 
            className="absolute inset-x-0 h-[100px] bg-gradient-to-b from-transparent via-foreground/[0.03] dark:via-white/[0.03] to-transparent z-10 pointer-events-none"
            animate={{ top: ['-20%', '120%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />

          {/* Nodes Layer */}
          <div className="relative w-full h-full flex items-center justify-center">
            
            {/* Center Founder Node */}
            <div className="relative z-30">
              <motion.div 
                className="w-24 h-24 bg-background dark:bg-[#050505] border border-foreground/20 dark:border-white/20 flex items-center justify-center rotate-45"
                whileHover={{ scale: 1.05, borderColor: 'rgba(255,255,255,0.4)' }}
              >
                <div className="-rotate-45 text-foreground/90 dark:text-white/90">
                  <User size={32} strokeWidth={1} />
                </div>
              </motion.div>
              
              {/* Pulse Effect */}
              <motion.div 
                className="absolute inset-0 border border-foreground/20 dark:border-white/20 rotate-45"
                animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>

            {/* Role Nodes */}
            {roles.map((role, i) => (
              <motion.div
                key={role.id}
                className="absolute z-20 flex flex-col items-center"
                style={{ x: role.x, y: role.y }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.1 }}
              >
                <div className="group relative">
                  <div className="w-14 h-14 bg-background dark:bg-[#050505] border border-foreground/10 dark:border-white/10 flex items-center justify-center rotate-45 group-hover:border-foreground/40 dark:group-hover:border-white/40 transition-all duration-500">
                    <div className="-rotate-45 text-foreground/30 dark:text-white/30 group-hover:text-foreground/80 dark:group-hover:text-white/80 transition-colors">
                      <role.icon size={20} strokeWidth={1} />
                    </div>
                  </div>
                  
                  {/* Label */}
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <span className="text-[8px] font-mono uppercase tracking-[0.4em] text-foreground/30 dark:text-white/30">
                      {role.label}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}

          </div>
        </div>

        {/* Bottom Status Bar */}
        <div className="mt-auto flex justify-between items-center border-t border-foreground/5 dark:border-white/5 pt-6">
          <div className="flex gap-4">
            <div className="w-1 h-1 bg-foreground/40 dark:bg-white/40 rounded-full" />
            <div className="w-1 h-1 bg-foreground/10 dark:bg-white/10 rounded-full" />
            <div className="w-1 h-1 bg-foreground/10 dark:bg-white/10 rounded-full" />
          </div>
          <div className="text-[7px] font-mono uppercase tracking-widest text-foreground/20 dark:text-white/20">
            Org_Synthesis_Active
          </div>
        </div>

      </div>
    </div>
  )
}

export default FounderNetwork
