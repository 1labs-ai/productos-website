"use client"

import { motion, useInView, useSpring, useTransform } from "framer-motion"
import { useRef, useEffect, useState } from "react"

// Stats data
const stats = [
  { value: 12, prefix: "3-", label: "Days to ship", suffix: "days", isRange: true },
  { value: 80, prefix: "", label: "Less development cost", suffix: "%", isRange: false },
  { value: 5, prefix: "", label: "AI agents working together", suffix: "", isRange: false },
  { value: 100, prefix: "", label: "Products you can launch", suffix: "+", isRange: false },
]

// Animated number counter
function AnimatedNumber({ 
  value, 
  prefix = "", 
  suffix = "",
  isRange = false,
  delay = 0 
}: { 
  value: number
  prefix?: string
  suffix?: string
  isRange?: boolean
  delay?: number 
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [hasAnimated, setHasAnimated] = useState(false)

  const spring = useSpring(0, { 
    stiffness: 50, 
    damping: 20,
    duration: 1500
  })

  const display = useTransform(spring, (current) => Math.round(current))
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (isInView && !hasAnimated) {
      const timeout = setTimeout(() => {
        spring.set(value)
        setHasAnimated(true)
      }, delay * 1000)
      return () => clearTimeout(timeout)
    }
  }, [isInView, value, spring, delay, hasAnimated])

  useEffect(() => {
    const unsubscribe = display.on("change", (v) => setDisplayValue(v))
    return unsubscribe
  }, [display])

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{displayValue}{suffix}
    </span>
  )
}

// Single stat card with hover effects
function StatCard({ 
  stat, 
  index 
}: { 
  stat: typeof stats[0]
  index: number 
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <motion.div 
        className="group relative text-center p-8 rounded-2xl bg-card/30 border border-border/20 overflow-hidden cursor-default"
        whileHover={{ 
          y: -4,
          scale: 1.02,
        }}
        transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Hover glow overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/[0.02] to-transparent" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/15 to-transparent" />
        </div>

        {/* Subtle inner glow on hover */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[inset_0_0_30px_rgba(255,255,255,0.02)]" />
        
        {/* Number */}
        <div className="relative z-10 text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-3 transition-transform duration-300 group-hover:scale-105">
          <AnimatedNumber 
            value={stat.value} 
            prefix={stat.prefix}
            suffix={stat.suffix}
            isRange={stat.isRange}
            delay={index * 0.15}
          />
        </div>
        
        {/* Label */}
        <div className="relative z-10 text-sm text-muted-foreground group-hover:text-muted-foreground/80 transition-colors duration-300">
          {stat.label}
        </div>

        {/* Border glow on hover */}
        <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-foreground/5 transition-colors duration-300" />
      </motion.div>
    </motion.div>
  )
}

export function AnimatedStats() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Subtle background gradient glow */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 40% at 50% 50%, rgba(120, 120, 120, 0.06) 0%, transparent 60%),
            radial-gradient(ellipse 40% 30% at 25% 60%, rgba(100, 100, 100, 0.04) 0%, transparent 50%),
            radial-gradient(ellipse 40% 30% at 75% 40%, rgba(140, 140, 140, 0.04) 0%, transparent 50%)
          `
        }}
      />

      <div className="max-w-[1436px] mx-auto px-6 lg:px-[50px] relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 
            className="text-3xl sm:text-4xl lg:text-[48px] font-medium mb-4" 
            style={{ lineHeight: 1, letterSpacing: '-0.022em' }}
          >
            The numbers speak.<br />
            <span className="text-muted-foreground">ProductOS delivers.</span>
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
