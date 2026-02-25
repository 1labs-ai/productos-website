"use client"

import { motion } from "framer-motion"
import { ArrowRight, type LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CTASectionProps {
  badge?: {
    icon?: LucideIcon
    text: string
  }
  title: string
  description: string
  primaryAction: {
    label: string
    href: string
    icon?: LucideIcon
  }
  secondaryAction?: {
    label: string
    href: string
  }
  footnote?: string
  variant?: "default" | "minimal"
  className?: string
}

/**
 * CTASection - Reusable call-to-action section
 * 
 * Usage:
 * <CTASection
 *   badge={{ icon: Zap, text: "Get Started" }}
 *   title="Ready to build something amazing?"
 *   description="Start your product journey today."
 *   primaryAction={{ label: "Start Building Free", href: "https://build.productos.dev/sign-up" }}
 *   secondaryAction={{ label: "Talk to Sales", href: "/contact" }}
 * />
 */
export function CTASection({
  badge,
  title,
  description,
  primaryAction,
  secondaryAction,
  footnote,
  variant = "default",
  className,
}: CTASectionProps) {
  const BadgeIcon = badge?.icon
  const PrimaryIcon = primaryAction.icon || ArrowRight

  return (
    <section className={cn("py-24 px-4", className)}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={cn(
            "relative p-8 sm:p-12 rounded-xl overflow-hidden",
            variant === "default" && "bg-card border border-border",
            variant === "minimal" && "bg-transparent"
          )}
        >
          {/* Background glow */}
          {variant === "default" && (
            <div
              className="absolute inset-0 opacity-50 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 80% 60% at 50% 100%, hsl(240 10% 15% / 0.5) 0%, transparent 70%)",
              }}
            />
          )}

          <div className="relative z-10 text-center">
            {badge && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-muted/50 border border-border/50 mb-6">
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

            <p className="text-muted-foreground mb-8 max-w-lg mx-auto text-lg leading-relaxed">
              {description}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-foreground text-background hover:bg-foreground/90 rounded-md px-8 h-12 text-base font-medium shadow-lg shadow-foreground/10"
                asChild
              >
                <a href={primaryAction.href}>
                  {primaryAction.label}
                  <PrimaryIcon className="ml-2 size-4" />
                </a>
              </Button>

              {secondaryAction && (
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-md px-8 h-12 text-base font-medium border-border/50 hover:bg-muted hover:border-border"
                  asChild
                >
                  <a href={secondaryAction.href}>{secondaryAction.label}</a>
                </Button>
              )}
            </div>

            {footnote && (
              <p className="text-sm text-muted-foreground mt-6">{footnote}</p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
