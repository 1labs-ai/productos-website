"use client"

import { motion } from "framer-motion"
import { Twitter, Linkedin } from "lucide-react"
import { cn } from "@/lib/utils"

interface TeamCardProps {
  name: string
  role: string
  bio: string
  initials: string
  avatar?: string
  social?: {
    twitter?: string
    linkedin?: string
  }
  delay?: number
  className?: string
}

/**
 * TeamCard - Team member display
 * 
 * Usage:
 * <TeamCard
 *   name="Alex Chen"
 *   role="CEO & Co-founder"
 *   bio="Former PM at Google. Built 3 startups."
 *   initials="AC"
 *   social={{ twitter: "#", linkedin: "#" }}
 * />
 */
export function TeamCard({
  name,
  role,
  bio,
  initials,
  avatar,
  social,
  delay = 0,
  className,
}: TeamCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "p-6 rounded-xl bg-card border border-border/50 hover:border-border transition-colors text-center group",
        className
      )}
    >
      {avatar ? (
        <img
          src={avatar}
          alt={name}
          className="w-16 h-16 mx-auto mb-4 rounded-full object-cover group-hover:scale-105 transition-transform"
        />
      ) : (
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/50 border border-border/50 flex items-center justify-center text-lg font-semibold text-foreground/80 group-hover:border-border transition-colors">
          {initials}
        </div>
      )}

      <h3 className="text-lg font-semibold text-foreground mb-1">{name}</h3>
      <p className="text-sm text-foreground/60 mb-3">{role}</p>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{bio}</p>

      {social && (
        <div className="flex items-center justify-center gap-3">
          {social.twitter && (
            <a
              href={social.twitter}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label={`${name} on Twitter`}
            >
              <Twitter className="w-4 h-4" />
            </a>
          )}
          {social.linkedin && (
            <a
              href={social.linkedin}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label={`${name} on LinkedIn`}
            >
              <Linkedin className="w-4 h-4" />
            </a>
          )}
        </div>
      )}
    </motion.div>
  )
}

interface TeamGridProps {
  members: Array<{
    name: string
    role: string
    bio: string
    initials: string
    avatar?: string
    social?: { twitter?: string; linkedin?: string }
  }>
  columns?: 2 | 3 | 4
  className?: string
}

/**
 * TeamGrid - Grid of team member cards
 */
export function TeamGrid({ members, columns = 4, className }: TeamGridProps) {
  const gridCols = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  }

  return (
    <div className={cn("grid gap-6", gridCols[columns], className)}>
      {members.map((member, index) => (
        <TeamCard key={member.name} {...member} delay={index * 0.1} />
      ))}
    </div>
  )
}
