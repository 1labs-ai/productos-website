"use client"

import { motion } from "framer-motion"
import { useState } from "react"

interface AnimatedLogoProps {
  size?: number
  className?: string
  animate?: boolean // kept for backwards compat, but now hover-based
}

export function AnimatedLogo({ size = 28, className = "" }: AnimatedLogoProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{ perspective: 100 }}
    >
      {/* Back face - pulses on hover */}
      <motion.path 
        d="M4 32 L18 4 L32 32 Z" 
        fill="currentColor" 
        fillOpacity={0.35}
        animate={isHovered ? {
          opacity: [0.35, 0.15, 0.35],
          scaleY: [1, 0.85, 1],
        } : { opacity: 0.35, scaleY: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{ transformOrigin: "center bottom" }}
      />
      {/* Left fold - rotates on hover */}
      <motion.path 
        d="M18 4 L4 32 L18 32 Z" 
        fill="currentColor" 
        fillOpacity={0.65}
        animate={isHovered ? {
          rotateY: [0, -25, 0],
          opacity: [0.65, 0.4, 0.65],
        } : { rotateY: 0, opacity: 0.65 }}
        transition={{ duration: 0.5, ease: "easeInOut", delay: 0.08 }}
        style={{ transformOrigin: "right center" }}
      />
      {/* Right fold - rotates on hover */}
      <motion.path 
        d="M18 4 L18 32 L32 32 Z" 
        fill="currentColor"
        animate={isHovered ? {
          rotateY: [0, 25, 0],
          opacity: [1, 0.7, 1],
        } : { rotateY: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut", delay: 0.15 }}
        style={{ transformOrigin: "left center" }}
      />
    </motion.svg>
  )
}
