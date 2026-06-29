import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, type ReactNode, type HTMLAttributes } from 'react'
import { fadeInUp, tileHover, springConfig } from '../../lib/animations'

type BentoTileProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'onDrag' | 'onDragEnd' | 'onDragStart' | 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration'
> & {
  children: ReactNode
  onClick?: () => void
  expandable?: boolean
  label?: string
  layoutId?: string
  inView?: boolean
}

export function BentoTile({
  children,
  className = '',
  onClick,
  expandable = false,
  label,
  layoutId,
  inView = true,
  ...rest
}: BentoTileProps) {
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-150, 150], [8, -8]), springConfig)
  const ry = useSpring(useTransform(mx, [-150, 150], [-8, 8]), springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    mx.set(e.clientX - rect.left - rect.width / 2)
    my.set(e.clientY - rect.top - rect.height / 2)
  }
  const handleMouseLeave = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.div
      ref={ref}
      layoutId={layoutId}
      variants={fadeInUp}
      initial="initial"
      animate={inView ? 'animate' : 'initial'}
      whileHover={tileHover}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      role={expandable ? 'button' : undefined}
      tabIndex={expandable ? 0 : undefined}
      aria-label={label}
      {...rest}
      style={{
        rotateX: rx,
        rotateY: ry,
        transformPerspective: 1000,
        transformStyle: 'preserve-3d',
        ...rest.style,
      }}
      className={`group relative overflow-hidden rounded-bento bg-tile shadow-tile ${expandable ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </motion.div>
  )
}
