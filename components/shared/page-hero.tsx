"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { type LucideIcon } from "lucide-react"

interface PageHeroProps {
  badge?: {
    icon?: LucideIcon
    text: string
  }
  title: string
  titleHighlight?: string
  description: string
  className?: string
  children?: React.ReactNode
}

/**
 * PageHero - Reusable page hero section
 * 
 * Usage:
 * <PageHero
 *   badge={{ icon: Target, text: "About ProductOS" }}
 *   title="Making product development"
 *   titleHighlight="accessible to everyone"
 *   description="We're on a mission to democratize product development."
 * >
 *   <Button>Get Started</Button>
 * </PageHero>
 */
export function PageHero({
  badge,
  title,
  titleHighlight,
  description,
  className,
  children,
}: PageHeroProps) {
  const BadgeIcon = badge?.icon

  return (
    <section
      className={cn(
        "relative min-h-[60vh] flex flex-col items-center justify-center px-4 pt-20 pb-16 overflow-hidden",
        className
      )}
    >
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, hsl(240 10% 20% / 0.3) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Badge */}
        {badge && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-card/80 backdrop-blur-sm border border-border/50 mb-8"
          >
            {BadgeIcon && <BadgeIcon className="size-3.5 text-amber-500" />}
            <span className="text-sm font-medium text-foreground/80">
              {badge.text}
            </span>
          </motion.div>
        )}

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
          style={{ lineHeight: 1.1, letterSpacing: "-0.025em" }}
        >
          <span className="text-foreground">{title}</span>
          {titleHighlight && (
            <>
              <br />
              <span className="text-foreground/60">{titleHighlight}</span>
            </>
          )}
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          {description}
        </motion.p>

        {/* Optional children (CTAs, etc.) */}
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  )
}
