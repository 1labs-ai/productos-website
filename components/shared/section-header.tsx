"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { type LucideIcon } from "lucide-react"

interface SectionHeaderProps {
  badge?: {
    icon?: LucideIcon
    text: string
  }
  title: string
  subtitle?: string
  description?: string
  align?: "left" | "center"
  className?: string
}

/**
 * SectionHeader - Reusable section header component
 * 
 * Usage:
 * <SectionHeader
 *   badge={{ icon: Sparkles, text: "Features" }}
 *   title="Everything you need"
 *   description="All the tools to build great products"
 * />
 */
export function SectionHeader({
  badge,
  title,
  subtitle,
  description,
  align = "center",
  className,
}: SectionHeaderProps) {
  const BadgeIcon = badge?.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "text-center",
        className
      )}
    >
      {badge && (
        <div
          className={cn(
            "inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-card/80 border border-border/50 mb-6",
            align === "center" && "mx-auto"
          )}
        >
          {BadgeIcon && <BadgeIcon className="size-3.5 text-amber-500" />}
          <span className="text-sm font-medium text-foreground/80">
            {badge.text}
          </span>
        </div>
      )}

      <h2
        className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
        style={{ letterSpacing: "-0.02em" }}
      >
        {title}
      </h2>

      {subtitle && (
        <p className="text-xl text-foreground/60 mb-4">{subtitle}</p>
      )}

      {description && (
        <p
          className={cn(
            "text-muted-foreground text-lg leading-relaxed",
            align === "center" && "max-w-2xl mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </motion.div>
  )
}
