"use client"

import { motion, useAnimation } from "framer-motion"
import { useEffect, useImperativeHandle, forwardRef, useRef } from "react"

interface AnimatedLogoProps {
  size?: number
  className?: string
  animate?: boolean
}

export interface AnimatedLogoRef {
  replay: () => void
}

export const AnimatedLogo = forwardRef<AnimatedLogoRef, AnimatedLogoProps>(
  ({ size = 28, className = "", animate = true }, ref) => {
    const backControls = useAnimation()
    const leftControls = useAnimation()
    const rightControls = useAnimation()
    const isAnimating = useRef(false)

    // Play initial animation on mount
    useEffect(() => {
      if (animate) {
        const playInitial = async () => {
          // Start all at hidden
          backControls.set({ opacity: 0, scaleY: 0 })
          leftControls.set({ opacity: 0, rotateY: 90 })
          rightControls.set({ opacity: 0, rotateY: -90 })
          
          // Sequence the animation
          await backControls.start({ 
            opacity: 0.35, 
            scaleY: 1, 
            transition: { duration: 0.5, ease: "easeOut", delay: 0.1 } 
          })
          leftControls.start({ 
            opacity: 0.65, 
            rotateY: 0, 
            transition: { duration: 0.4, ease: "easeOut" } 
          })
          await new Promise(r => setTimeout(r, 400))
          rightControls.start({ 
            opacity: 1, 
            rotateY: 0, 
            transition: { duration: 0.4, ease: "easeOut" } 
          })
        }
        playInitial()
      }
    }, [animate, backControls, leftControls, rightControls])

    // Expose replay method - subtle fold effect
    useImperativeHandle(ref, () => ({
      replay: async () => {
        if (!animate || isAnimating.current) return
        isAnimating.current = true
        
        // Quick subtle fold - don't fully hide
        await Promise.all([
          backControls.start({ opacity: 0.15, scaleY: 0.7, transition: { duration: 0.15 } }),
          leftControls.start({ opacity: 0.3, rotateY: 30, transition: { duration: 0.15 } }),
          rightControls.start({ opacity: 0.5, rotateY: -30, transition: { duration: 0.15 } }),
        ])
        
        // Unfold back
        backControls.start({ opacity: 0.35, scaleY: 1, transition: { duration: 0.4, ease: "easeOut" } })
        await new Promise(r => setTimeout(r, 150))
        leftControls.start({ opacity: 0.65, rotateY: 0, transition: { duration: 0.35, ease: "easeOut" } })
        await new Promise(r => setTimeout(r, 150))
        await rightControls.start({ opacity: 1, rotateY: 0, transition: { duration: 0.35, ease: "easeOut" } })
        
        isAnimating.current = false
      }
    }))

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

    // Animated version
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        {/* Back face - grows up from bottom first */}
        <motion.path 
          d="M4 32 L18 4 L32 32 Z" 
          fill="currentColor" 
          initial={{ opacity: 0, scaleY: 0 }}
          animate={backControls}
          style={{ transformOrigin: "center bottom" }}
        />
        {/* Left fold - rotates in from left */}
        <motion.path 
          d="M18 4 L4 32 L18 32 Z" 
          fill="currentColor" 
          initial={{ opacity: 0, rotateY: 90 }}
          animate={leftControls}
          style={{ transformOrigin: "right center" }}
        />
        {/* Right fold - rotates in from right */}
        <motion.path 
          d="M18 4 L18 32 L32 4 Z" 
          fill="currentColor"
          initial={{ opacity: 0, rotateY: -90 }}
          animate={rightControls}
          style={{ transformOrigin: "left center" }}
        />
      </svg>
    )
  }
)

AnimatedLogo.displayName = "AnimatedLogo"
