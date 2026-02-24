"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { transitions } from "@/lib/animations";

interface AnimatedButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: ReactNode;
  variant?: "default" | "subtle" | "bounce";
}

export const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ children, className, variant = "default", ...props }, ref) => {
    const variants = {
      default: {
        whileHover: { scale: 1.02 },
        whileTap: { scale: 0.98 },
      },
      subtle: {
        whileHover: { scale: 1.01 },
        whileTap: { scale: 0.99 },
      },
      bounce: {
        whileHover: { scale: 1.05, y: -2 },
        whileTap: { scale: 0.95 },
      },
    };

    return (
      <motion.button
        ref={ref}
        {...variants[variant]}
        transition={transitions.fast}
        className={className}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

AnimatedButton.displayName = "AnimatedButton";

interface AnimatedLinkProps extends Omit<HTMLMotionProps<"a">, "children"> {
  children: ReactNode;
  underline?: boolean;
}

export const AnimatedLink = forwardRef<HTMLAnchorElement, AnimatedLinkProps>(
  ({ children, className, underline = true, ...props }, ref) => {
    return (
      <motion.a
        ref={ref}
        whileHover={{ scale: 1.02 }}
        transition={transitions.fast}
        className={cn("relative inline-flex items-center group", className)}
        {...props}
      >
        {children}
        {underline && (
          <motion.span
            className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-violet-500"
            initial={{ width: 0 }}
            whileHover={{ width: "100%" }}
            transition={{ duration: 0.2 }}
          />
        )}
      </motion.a>
    );
  }
);

AnimatedLink.displayName = "AnimatedLink";

interface AnimatedIconButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: ReactNode;
}

export const AnimatedIconButton = forwardRef<HTMLButtonElement, AnimatedIconButtonProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        transition={transitions.spring}
        className={className}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

AnimatedIconButton.displayName = "AnimatedIconButton";
