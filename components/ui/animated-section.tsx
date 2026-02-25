"use client";

import * as React from "react";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

type AnimationVariant = 
  | "fadeIn" 
  | "fadeInUp" 
  | "fadeInDown" 
  | "slideInLeft" 
  | "slideInRight" 
  | "scaleIn";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
  as?: "div" | "section" | "article" | "header" | "footer";
}

const variantMap: Record<AnimationVariant, Variants> = {
  fadeIn: { 
    hidden: { opacity: 0 }, 
    visible: { opacity: 1 } 
  },
  fadeInUp: { 
    hidden: { opacity: 0, y: 24 }, 
    visible: { opacity: 1, y: 0 } 
  },
  fadeInDown: { 
    hidden: { opacity: 0, y: -24 }, 
    visible: { opacity: 1, y: 0 } 
  },
  slideInLeft: { 
    hidden: { opacity: 0, x: -40 }, 
    visible: { opacity: 1, x: 0 } 
  },
  slideInRight: { 
    hidden: { opacity: 0, x: 40 }, 
    visible: { opacity: 1, x: 0 } 
  },
  scaleIn: { 
    hidden: { opacity: 0, scale: 0.95 }, 
    visible: { opacity: 1, scale: 1 } 
  },
};

export function AnimatedSection({
  children,
  className,
  variant = "fadeInUp",
  delay = 0,
  duration = 0.5,
  threshold = 0.1,
  once = true,
  as = "div",
}: AnimatedSectionProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });
  const prefersReducedMotion = useReducedMotion();

  // Respect reduced motion preference
  if (prefersReducedMotion) {
    const Component = as;
    return <Component className={className}>{children}</Component>;
  }

  const baseVariants = variantMap[variant];

  const variants: Variants = {
    hidden: baseVariants.hidden,
    visible: {
      ...baseVariants.visible,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1], // Smooth easing
      },
    },
  };

  const MotionComponent = motion[as] as typeof motion.div;

  return (
    <MotionComponent
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={cn(className)}
    >
      {children}
    </MotionComponent>
  );
}

// Staggered children animation
interface AnimatedGroupProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  threshold?: number;
  once?: boolean;
}

export function AnimatedGroup({
  children,
  className,
  staggerDelay = 0.1,
  threshold = 0.1,
  once = true,
}: AnimatedGroupProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

// Child item for AnimatedGroup
export function AnimatedItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 16 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.4,
            ease: [0.25, 0.1, 0.25, 1],
          },
        },
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

// Hover scale wrapper
export function HoverScale({
  children,
  className,
  scale = 1.02,
}: {
  children: React.ReactNode;
  className?: string;
  scale?: number;
}) {
  const prefersReducedMotion = useReducedMotion();
  
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      whileHover={{ scale }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {children}
    </motion.div>
  );
}
