"use client"

import { motion } from "framer-motion"

const logos = ["Stripe", "Vercel", "Linear", "Notion", "Figma", "Supabase"]

export function LogoMarquee() {
  return (
    <section className="py-12 px-4 border-y border-border">
      <div className="max-w-6xl mx-auto">
        <p className="text-center text-sm text-muted-foreground mb-8">
          Trusted every day by teams that build world-class software
        </p>
        <div className="flex items-center justify-center gap-8 sm:gap-12 flex-wrap">
          {logos.map((logo) => (
            <span 
              key={logo} 
              className="text-sm text-muted-foreground/60 font-medium"
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
