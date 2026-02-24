import { Variants } from "framer-motion";

export const transitions = {
  fast: { duration: 0.15, ease: "easeOut" },
  normal: { duration: 0.25, ease: "easeOut" },
  slow: { duration: 0.4, ease: "easeOut" },
  spring: { type: "spring", stiffness: 300, damping: 30 },
  smooth: { type: "spring", stiffness: 100, damping: 20 },
} as const;

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transitions.normal },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: transitions.smooth },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0, transition: transitions.smooth },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: transitions.smooth },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: transitions.smooth },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: transitions.smooth },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: transitions.normal },
};

// Hover animations for interactive elements
export const hoverScale = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: transitions.fast,
};

export const hoverLift = {
  whileHover: { y: -4 },
  transition: { duration: 0.2 },
};

export const hoverGlow = {
  whileHover: { 
    y: -4, 
    boxShadow: "0 20px 40px rgba(59, 130, 246, 0.15)" 
  },
  transition: { duration: 0.2 },
};

// Card hover animation with subtle lift and glow
export const cardHover = {
  whileHover: { 
    y: -6,
    transition: { duration: 0.2 }
  },
};

// Button animations
export const buttonHover = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
};

// Icon spin animation
export const iconSpin: Variants = {
  hidden: { rotate: 0 },
  visible: { rotate: 360, transition: { duration: 0.5 } },
};

// Pulse animation for attention
export const pulse: Variants = {
  hidden: { scale: 1 },
  visible: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Float animation for decorative elements
export const float: Variants = {
  hidden: { y: 0 },
  visible: {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};
