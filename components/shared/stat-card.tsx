"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface StatCardProps {
  value: string
  label: string
  delay?: number
  className?: string
}

/**
 * StatCard - Single stat display
 * 
 * Usage:
 * <StatCard value="10,000+" label="Founders Served" />
 */
export function StatCard({ value, label, delay = 0, className }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "p-6 rounded-xl bg-card border border-border/50 hover:border-border transition-colors text-center",
        className
      )}
    >
      <div className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
        {value}
      </div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </motion.div>
  )
}

interface StatsGridProps {
  stats: Array<{ value: string; label: string }>
  columns?: 2 | 3 | 4
  className?: string
}

/**
 * StatsGrid - Grid of stat cards
 * 
 * Usage:
 * <StatsGrid
 *   stats={[
 *     { value: "10,000+", label: "Founders Served" },
 *     { value: "50,000+", label: "Products Built" },
 *   ]}
 *   columns={4}
 * />
 */
export function StatsGrid({ stats, columns = 4, className }: StatsGridProps) {
  const gridCols = {
    2: "grid-cols-2",
    3: "grid-cols-2 md:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-4",
  }

  return (
    <div className={cn("grid gap-6", gridCols[columns], className)}>
      {stats.map((stat, index) => (
        <StatCard
          key={stat.label}
          value={stat.value}
          label={stat.label}
          delay={index * 0.1}
        />
      ))}
    </div>
  )
}
