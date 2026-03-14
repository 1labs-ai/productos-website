"use client"

import { motion } from 'framer-motion'
import { User, Search, Palette, Code2, ClipboardList } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FounderNetworkProps {
  className?: string
}

export const FounderNetwork = ({ className }: FounderNetworkProps) => {
  // Role positions (absolute coordinates in viewBox 320x320, center at 160,160)
  const roles = [
    { id: 'pm', icon: ClipboardList, label: 'PM', x: 70, y: 70 },
    { id: 'research', icon: Search, label: 'RESEARCHER', x: 250, y: 70 },
    { id: 'design', icon: Palette, label: 'DESIGNER', x: 70, y: 250 },
    { id: 'eng', icon: Code2, label: 'ENGINEER', x: 250, y: 250 },
  ]

  return (
    <div className={cn("relative w-full flex items-center justify-center", className)}>
      {/* Figure label for consistency */}
      <span className="absolute top-0 left-0 text-[10px] font-mono text-foreground/30 tracking-widest">
        FIG 0.3
      </span>
      
      {/* Container - sized to match other figures, responsive */}
      <div className="relative w-[240px] sm:w-[280px] md:w-[320px] h-[180px] sm:h-[200px] md:h-[220px] flex items-center justify-center">

        {/* SVG for connections and nodes */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none" 
          viewBox="0 0 320 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Connection lines from center to roles - straight lines */}
          <g opacity="0.25">
            <line x1="160" y1="110" x2="80" y2="55" stroke="currentColor" strokeWidth="1" className="text-foreground"/>
            <line x1="160" y1="110" x2="240" y2="55" stroke="currentColor" strokeWidth="1" className="text-foreground"/>
            <line x1="160" y1="110" x2="80" y2="165" stroke="currentColor" strokeWidth="1" className="text-foreground"/>
            <line x1="160" y1="110" x2="240" y2="165" stroke="currentColor" strokeWidth="1" className="text-foreground"/>
          </g>
          
          {/* Role 1 - PM (top left) */}
          <g>
            <circle cx="80" cy="50" r="18" stroke="currentColor" strokeWidth="1" fill="none" className="text-foreground" opacity="0.4"/>
            <rect x="68" y="38" width="24" height="24" rx="4" stroke="currentColor" strokeWidth="1" fill="none" className="text-foreground" opacity="0.3"/>
            <text x="80" y="80" textAnchor="middle" className="text-foreground/50" fontSize="8" fontFamily="monospace">PM</text>
          </g>
          
          {/* Role 2 - Researcher (top right) */}
          <g>
            <circle cx="240" cy="50" r="18" stroke="currentColor" strokeWidth="1" fill="none" className="text-foreground" opacity="0.4"/>
            <circle cx="243" cy="47" r="6" stroke="currentColor" strokeWidth="1" fill="none" className="text-foreground" opacity="0.5"/>
            <line x1="248" y1="52" x2="252" y2="56" stroke="currentColor" strokeWidth="1" className="text-foreground" opacity="0.5"/>
            <text x="240" y="80" textAnchor="middle" className="text-foreground/50" fontSize="7" fontFamily="monospace">RESEARCHER</text>
          </g>
          
          {/* Role 3 - Designer (bottom left) */}
          <g>
            <circle cx="80" cy="170" r="18" stroke="currentColor" strokeWidth="1" fill="none" className="text-foreground" opacity="0.4"/>
            <rect x="72" y="162" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1" fill="none" className="text-foreground" opacity="0.5"/>
            <text x="80" y="200" textAnchor="middle" className="text-foreground/50" fontSize="7" fontFamily="monospace">DESIGNER</text>
          </g>
          
          {/* Role 4 - Engineer (bottom right) */}
          <g>
            <circle cx="240" cy="170" r="18" stroke="currentColor" strokeWidth="1" fill="none" className="text-foreground" opacity="0.4"/>
            <text x="240" y="174" textAnchor="middle" className="text-foreground/50" fontSize="10" fontFamily="monospace">&lt;/&gt;</text>
            <text x="240" y="200" textAnchor="middle" className="text-foreground/50" fontSize="7" fontFamily="monospace">ENGINEER</text>
          </g>
          
          {/* Central Founder - Main circle with user icon */}
          <g>
            <motion.circle 
              cx="160" cy="110" r="30" 
              stroke="currentColor" strokeWidth="1.5" fill="none" 
              className="text-foreground" opacity="0.6"
              animate={{ scale: [1, 1.02, 1] }} 
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.circle 
              cx="160" cy="110" r="30" 
              stroke="currentColor" strokeWidth="1" fill="none" 
              className="text-foreground/15"
              animate={{ scale: [1, 1.4], opacity: [0.2, 0] }} 
              transition={{ duration: 2.5, repeat: Infinity }}
            />
            
            {/* User silhouette - head */}
            <circle cx="160" cy="102" r="8" stroke="currentColor" strokeWidth="1.2" fill="none" className="text-foreground" opacity="0.5"/>
            {/* User silhouette - body/shoulders */}
            <path d="M148 125 Q160 112 172 125" stroke="currentColor" strokeWidth="1.2" fill="none" className="text-foreground" opacity="0.5"/>
          </g>
          
          {/* Animated pulses from center to roles */}
          <motion.circle 
            r="3" fill="currentColor" className="text-foreground/30"
            animate={{ cx: [160, 80], cy: [110, 50], opacity: [0, 0.6, 0], scale: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0 }}
          />
          <motion.circle 
            r="3" fill="currentColor" className="text-foreground/30"
            animate={{ cx: [160, 240], cy: [110, 50], opacity: [0, 0.6, 0], scale: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          />
          <motion.circle 
            r="3" fill="currentColor" className="text-foreground/30"
            animate={{ cx: [160, 80], cy: [110, 170], opacity: [0, 0.6, 0], scale: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          />
          <motion.circle 
            r="3" fill="currentColor" className="text-foreground/30"
            animate={{ cx: [160, 240], cy: [110, 170], opacity: [0, 0.6, 0], scale: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
          />
        </svg>
      </div>
    </div>
  )
}

export default FounderNetwork
