"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-500/20 rounded-full blur-[150px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-muted-foreground">Start building today</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Ready to ship your <span className="text-gradient">next product?</span>
          </h2>
          
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Join hundreds of founders building and launching products in days, not months.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-500 to-violet-500 hover:opacity-90 px-8 glow-sm hover:glow-md transition-all" 
              asChild
            >
              <Link href="/sign-up">
                Get Started Free
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/20 hover:bg-white/5" 
              asChild
            >
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>
          
          <p className="mt-6 text-sm text-muted-foreground">
            No credit card required • Free tier available
          </p>
        </motion.div>
      </div>
    </section>
  );
}
