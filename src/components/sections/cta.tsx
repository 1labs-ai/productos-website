"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { fadeInUp, scaleIn } from "@/lib/animations";

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 via-transparent to-transparent" />
      <motion.div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-500/20 rounded-full blur-[150px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div 
            variants={scaleIn}
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8 cursor-default"
          >
            <motion.div
              animate={{ 
                rotate: [0, 15, -15, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              <Sparkles className="w-4 h-4 text-blue-400" />
            </motion.div>
            <span className="text-sm text-muted-foreground">Start building today</span>
          </motion.div>
          
          {/* Headline */}
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6"
          >
            Ready to ship your <span className="text-gradient">next product?</span>
          </motion.h2>
          
          {/* Description */}
          <motion.p 
            variants={fadeInUp}
            className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto"
          >
            Join hundreds of founders building and launching products in days, not months.
          </motion.p>
          
          {/* CTAs */}
          <motion.div 
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-500 to-violet-500 hover:opacity-90 px-8 transition-all hover:shadow-lg hover:shadow-blue-500/30" 
                asChild
              >
                <Link href="/sign-up">
                  Get Started Free
                  <motion.span
                    className="ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ 
                      duration: 1.2, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.span>
                </Link>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/20 hover:bg-white/5 hover:border-white/30 transition-all" 
                asChild
              >
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </motion.div>
          </motion.div>
          
          {/* Fine print */}
          <motion.p 
            variants={fadeInUp}
            className="mt-6 text-sm text-muted-foreground"
          >
            No credit card required • Free tier available
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
