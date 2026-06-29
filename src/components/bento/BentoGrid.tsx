import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { staggerContainer } from '../../lib/animations'

type BentoGridProps = {
  children: ReactNode
  className?: string
}

export function BentoGrid({ children, className = '' }: BentoGridProps) {
  return (
    <motion.section
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.15 }}
      className={`mx-auto grid w-full max-w-6xl grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-12 lg:gap-5 lg:p-6 ${className}`}
    >
      {children}
    </motion.section>
  )
}
