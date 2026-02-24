"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { staggerItem, transitions } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  hoverScale?: boolean;
}

export function AnimatedCard({ 
  children, 
  className,
  glowColor = "rgba(59, 130, 246, 0.15)",
  hoverScale = false
}: AnimatedCardProps) {
  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ 
        y: -6,
        scale: hoverScale ? 1.02 : 1,
        boxShadow: `0 20px 40px ${glowColor}`,
      }}
      transition={{ duration: 0.2 }}
      className={cn(
        "relative rounded-2xl bg-card border border-white/5 transition-colors hover:border-white/10",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

interface FeatureCardProps {
  children: ReactNode;
  className?: string;
  gradientColor?: string;
}

export function FeatureCard({ 
  children, 
  className,
  gradientColor = "from-blue-500 to-violet-500"
}: FeatureCardProps) {
  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ 
        y: -6,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      className={cn(
        "group relative p-6 rounded-2xl bg-card border border-white/5 hover:border-white/10 transition-colors overflow-hidden",
        className
      )}
    >
      {/* Glow effect on hover */}
      <div 
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300",
          gradientColor
        )} 
      />
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}

interface TestimonialCardProps {
  children: ReactNode;
  className?: string;
  index?: number;
}

export function TestimonialCard({ 
  children, 
  className,
  index = 0
}: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, ...transitions.smooth }}
      whileHover={{ 
        y: -4,
        borderColor: "rgba(255, 255, 255, 0.15)",
        transition: { duration: 0.2 }
      }}
      className={cn(
        "relative p-6 rounded-2xl bg-card border border-white/5 transition-shadow",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export function GlassCard({ children, className }: GlassCardProps) {
  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ 
        y: -4,
        backdropFilter: "blur(20px)",
        transition: { duration: 0.2 }
      }}
      className={cn(
        "relative p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 transition-colors",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
