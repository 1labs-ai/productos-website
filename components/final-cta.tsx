"use client"

import { motion } from "framer-motion"
import { ArrowRight, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

export function FinalCTA() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative p-8 sm:p-12 rounded-lg bg-card border border-border overflow-hidden"
        >
          {/* Background gradient */}
          <div 
            className="absolute inset-0 opacity-50 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse 80% 60% at 50% 100%, hsl(240 10% 15% / 0.5) 0%, transparent 70%)"
            }}
          />
          
          <div className="relative z-10 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-muted/50 border border-border/50 mb-6">
              <Zap className="size-3.5 text-amber-500" />
              <span className="text-sm font-medium text-foreground/80">Ship in days, not months</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4" style={{ letterSpacing: '-0.02em' }}>
              Ready to build?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto text-lg leading-relaxed">
              Join founders who've shipped products 10x faster. 
              Start with an idea, ship with confidence.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-foreground text-background hover:bg-foreground/90 rounded-md px-8 h-12 text-base font-medium shadow-lg shadow-foreground/10"
                asChild
              >
                <a href="/early-access">
                  Request Early Access
                  <ArrowRight className="ml-2 size-4" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-md px-8 h-12 text-base font-medium border-border/50 hover:bg-muted hover:border-border"
                asChild
              >
                <a href="mailto:founders@productos.dev">Talk to Us</a>
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground mt-6">
              Private beta · Limited spots available
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
