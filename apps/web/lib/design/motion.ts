/**
 * Motion Configuration
 * Purposeful animations only - No loops, Max 240ms
 * @see docs/PRD.md#92-motion-rules
 */

import type { Variants, Transition } from "framer-motion";

/**
 * Base transition - 240ms max as per PRD
 */
export const baseTransition: Transition = {
  duration: 0.24,
  ease: "easeOut",
};

/**
 * State change animations
 */
export const stateChangeVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: baseTransition },
  exit: { opacity: 0, transition: { ...baseTransition, ease: "easeIn" } },
};

/**
 * Causality reveal - for showing cause-effect relationships
 */
export const causalityRevealVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: baseTransition,
  },
};

/**
 * Progression - for step-by-step flows
 */
export const progressionVariants: Variants = {
  initial: { x: -10, opacity: 0 },
  animate: { x: 0, opacity: 1, transition: baseTransition },
  exit: { x: 10, opacity: 0, transition: baseTransition },
};

/**
 * Slide up - for modals and overlays
 */
export const slideUpVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: baseTransition,
  },
};

/**
 * Stagger children - for list animations
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { y: 10, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: baseTransition,
  },
};

/**
 * Scale in - for emphasis
 */
export const scaleInVariants: Variants = {
  initial: { scale: 0.9, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: baseTransition,
  },
};

/**
 * Fade in - simple opacity transition
 */
export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: baseTransition,
  },
};

/**
 * Spring config for interactive elements
 * Still respects 240ms constraint
 */
export const springTransition: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 30,
  mass: 0.8,
};

/**
 * Reduced motion support
 */
export const prefersReducedMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0 } },
  exit: { opacity: 0, transition: { duration: 0 } },
};
