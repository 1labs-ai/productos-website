"use client"

import { motion, useAnimation } from "framer-motion"
import { useEffect } from "react"

interface AnimatedLogoProps {
  size?: number
  className?: string
  animate?: boolean
}

export function AnimatedLogo({ size = 28, className = "", animate = true }: AnimatedLogoProps) {
  const controls = useAnimation()

  // Animation sequence: unfolds like origami paper
  const backVariants = {
    hidden: { opacity: 0, scaleY: 0 },
    visible: { 
      opacity: 1, 
      scaleY: 1,
      transition: { duration: 0.5, ease: "easeOut", delay: 0.1 }
    }
  }

  const leftVariants = {
    hidden: { opacity: 0, rotateY: 90 },
    visible: { 
      opacity: 1, 
      rotateY: 0,
      transition: { duration: 0.4, ease: "easeOut", delay: 0.6 }
    }
  }

  const rightVariants = {
    hidden: { opacity: 0, rotateY: -90 },
    visible: { 
      opacity: 1, 
      rotateY: 0,
      transition: { duration: 0.4, ease: "easeOut", delay: 1.0 }
    }
  }

  // Play animation on mount
  useEffect(() => {
    if (animate) {
      controls.start("visible")
    }
  }, [animate, controls])

  // Replay animation on hover
  const handleHoverStart = async () => {
    if (!animate) return
    await controls.start("hidden")
    controls.start("visible")
  }

  // Static version (no animation)
  if (!animate) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path d="M4 32 L18 4 L32 32 Z" fill="currentColor" fillOpacity={0.35} />
        <path d="M18 4 L4 32 L18 32 Z" fill="currentColor" fillOpacity={0.65} />
        <path d="M18 4 L18 32 L32 4 Z" fill="currentColor" />
      </svg>
    )
  }

  // Animated version - plays on load + replays on hover
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      initial="hidden"
      animate={controls}
      onHoverStart={handleHoverStart}
      style={{ cursor: "pointer" }}
    >
      {/* Back face - grows up from bottom first */}
      <motion.path 
        d="M4 32 L18 4 L32 32 Z" 
        fill="currentColor" 
        fillOpacity={0.35}
        variants={backVariants}
        style={{ transformOrigin: "center bottom" }}
      />
      {/* Left fold - rotates in from left */}
      <motion.path 
        d="M18 4 L4 32 L18 32 Z" 
        fill="currentColor" 
        fillOpacity={0.65}
        variants={leftVariants}
        style={{ transformOrigin: "right center" }}
      />
      {/* Right fold - rotates in from right */}
      <motion.path 
        d="M18 4 L18 32 L32 4 Z" 
        fill="currentColor"
        variants={rightVariants}
        style={{ transformOrigin: "left center" }}
      />
    </motion.svg>
  )
}
