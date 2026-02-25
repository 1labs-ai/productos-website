"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { type LucideIcon } from "lucide-react"

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  delay?: number
  className?: string
}

/**
 * FeatureCard - Single feature display
 * 
 * Usage:
 * <FeatureCard
 *   icon={Sparkles}
 *   title="AI-First"
 *   description="Every feature is designed with AI at its core."
 * />
 */
export function FeatureCard({
  icon: Icon,
  title,
  description,
  delay = 0,
  className,
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "p-6 rounded-xl bg-card/50 border border-border/50 hover:border-border transition-colors",
        className
      )}
    >
      <div className="w-10 h-10 rounded-lg bg-muted/50 border border-border/50 flex items-center justify-center mb-4">
        <Icon className="w-5 h-5 text-foreground/60" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </motion.div>
  )
}

interface FeatureGridProps {
  features: Array<{
    icon: LucideIcon
    title: string
    description: string
  }>
  columns?: 2 | 3 | 4
  className?: string
}

/**
 * FeatureGrid - Grid of feature cards
 * 
 * Usage:
 * <FeatureGrid
 *   features={[
 *     { icon: Sparkles, title: "AI-First", description: "..." },
 *     { icon: Rocket, title: "Ship Fast", description: "..." },
 *   ]}
 *   columns={4}
 * />
 */
export function FeatureGrid({ features, columns = 4, className }: FeatureGridProps) {
  const gridCols = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  }

  return (
    <div className={cn("grid gap-6", gridCols[columns], className)}>
      {features.map((feature, index) => (
        <FeatureCard
          key={feature.title}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
          delay={index * 0.1}
        />
      ))}
    </div>
  )
}
