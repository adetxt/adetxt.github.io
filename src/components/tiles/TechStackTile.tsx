import { motion } from 'framer-motion'
import { BentoTile } from '../bento/BentoTile'
import { skills } from '../../data/skills'

export function TechStackTile() {
  return (
    <BentoTile data-bento-tile label="Tech stack" className="col-span-1 lg:col-span-3 p-6">
      <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
        Tech stack
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {skills.map((s, i) => {
          const Icon = s.icon
          return (
            <motion.div
              key={s.name}
              animate={{
                y: [0, -3, 0],
              }}
              transition={{
                duration: 3 + (i % 3),
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.2,
              }}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--bg)] text-ink hover:scale-125 transition-transform"
              title={s.name}
            >
              <Icon size={16} />
            </motion.div>
          )
        })}
      </div>
    </BentoTile>
  )
}
