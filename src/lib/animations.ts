import { Variants, Transition } from "framer-motion";

// Animation variants
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
  },
};

export const staggerContainer: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

// Transition presets
export const transitions = {
  spring: {
    type: "spring",
    stiffness: 300,
    damping: 30,
  } as Transition,
  smooth: {
    duration: 0.5,
    ease: [0.25, 0.1, 0.25, 1],
  } as Transition,
  bounce: {
    type: "spring",
    stiffness: 400,
    damping: 25,
  } as Transition,
};
