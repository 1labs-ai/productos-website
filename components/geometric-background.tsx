"use client"

import { cn } from "@/lib/utils"

interface GeometricBackgroundProps {
  className?: string
  variant?: "default" | "subtle" | "hero"
  opacity?: number
}

/**
 * Geometric Background - Origami-inspired triangular pattern
 * Matches the ProductOS logo aesthetic for brand consistency
 */
export function GeometricBackground({ 
  className, 
  variant = "default",
  opacity = 0.03
}: GeometricBackgroundProps) {
  const opacityValue = variant === "hero" ? opacity * 1.5 : opacity
  
  return (
    <div 
      className={cn(
        "pointer-events-none fixed inset-0 overflow-hidden",
        className
      )}
      aria-hidden="true"
    >
      {/* Base gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: variant === "hero" 
            ? "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(var(--primary) / 0.15), transparent)"
            : "transparent"
        }}
      />
      
      {/* SVG Pattern Layer */}
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity: opacityValue }}
      >
        <defs>
          {/* Origami triangle pattern - matching logo */}
          <pattern
            id="origami-pattern"
            x="0"
            y="0"
            width="120"
            height="104"
            patternUnits="userSpaceOnUse"
          >
            {/* Large triangle pointing up */}
            <path
              d="M60 0 L120 104 L0 104 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-foreground"
            />
            {/* Inner fold line - left */}
            <path
              d="M60 0 L30 52 L60 104"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-foreground"
            />
            {/* Inner fold line - right */}
            <path
              d="M60 0 L90 52 L60 104"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-foreground"
            />
          </pattern>
          
          {/* Subtle grid dots */}
          <pattern
            id="dot-pattern"
            x="0"
            y="0"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx="20"
              cy="20"
              r="1"
              fill="currentColor"
              className="text-foreground"
            />
          </pattern>
        </defs>
        
        {/* Apply patterns */}
        <rect width="100%" height="100%" fill="url(#origami-pattern)" />
        {variant === "subtle" && (
          <rect width="100%" height="100%" fill="url(#dot-pattern)" style={{ opacity: 0.3 }} />
        )}
      </svg>
      
      {/* Gradient overlays for depth */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background"
        style={{ opacity: 0.9 }}
      />
      <div 
        className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background"
        style={{ opacity: 0.5 }}
      />
    </div>
  )
}

/**
 * Section-specific geometric accent
 * For use on individual sections rather than full page
 */
export function GeometricAccent({ 
  className,
  position = "top-right"
}: { 
  className?: string
  position?: "top-right" | "bottom-left" | "center"
}) {
  const positionStyles = {
    "top-right": "top-0 right-0 -translate-y-1/2 translate-x-1/4",
    "bottom-left": "bottom-0 left-0 translate-y-1/2 -translate-x-1/4",
    "center": "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
  }
  
  return (
    <div 
      className={cn(
        "pointer-events-none absolute opacity-[0.03]",
        positionStyles[position],
        className
      )}
      aria-hidden="true"
    >
      <svg
        width="600"
        height="520"
        viewBox="0 0 120 104"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Large origami triangle */}
        <path
          d="M60 0 L120 104 L0 104 Z"
          stroke="currentColor"
          strokeWidth="0.3"
          className="text-foreground"
        />
        <path
          d="M60 0 L30 52 L60 104"
          stroke="currentColor"
          strokeWidth="0.3"
          className="text-foreground"
        />
        <path
          d="M60 0 L90 52 L60 104"
          stroke="currentColor"
          strokeWidth="0.3"
          className="text-foreground"
        />
        <path
          d="M60 0 L60 104"
          stroke="currentColor"
          strokeWidth="0.3"
          className="text-foreground"
        />
      </svg>
    </div>
  )
}
