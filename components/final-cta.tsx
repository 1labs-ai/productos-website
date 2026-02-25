"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function FinalCTA() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to ship your next product?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Join hundreds of founders building and launching products in days, not months.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
            <Button
              size="lg"
              className="bg-foreground text-background hover:bg-foreground/90 rounded-lg px-6 h-11"
              asChild
            >
              <a href="https://build.productos.dev/sign-up">
                Get Started Free
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-lg px-6 h-11 border-border hover:bg-secondary"
              asChild
            >
              <a href="#pricing">View Pricing</a>
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground">
            No credit card required
          </p>
        </motion.div>
      </div>
    </section>
  )
}
