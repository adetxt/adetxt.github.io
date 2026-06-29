import type { Variants, Transition } from 'framer-motion'

export const springConfig = {
  type: 'spring' as const,
  stiffness: 120,
  damping: 18,
} satisfies Transition

export const fadeInUp = {
  initial: { opacity: 0, y: 24, scale: 0.96 },
  animate: { opacity: 1, y: 0, scale: 1 },
} satisfies Variants

export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
  viewport: { amount: 0.15 },
}

export const tileHover = {
  y: -4,
  boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
  transition: springConfig,
}
