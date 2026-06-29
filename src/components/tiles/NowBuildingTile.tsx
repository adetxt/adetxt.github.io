import { motion } from 'framer-motion'
import { BentoTile } from '../bento/BentoTile'
import { now } from '../../data/now'

export function NowBuildingTile() {
  return (
    <BentoTile data-bento-tile label="What I'm building now" className="col-span-1 lg:col-span-4 p-6">
      <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
        Now
      </p>
      <div className="mt-3 flex items-center gap-2">
        <motion.span
          className="h-2 w-2 rounded-full bg-emerald-500"
          animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <span className="text-sm font-medium text-ink">Shipping</span>
      </div>
      <h3 className="mt-3 text-lg font-semibold tracking-tight text-ink">
        {now.title}
      </h3>
      <p className="mt-1 text-sm text-ink-muted">{now.description}</p>
      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-[var(--bg)]">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-pink-400 via-violet-400 to-cyan-400"
          initial={{ width: 0 }}
          animate={{ width: `${now.progress}%` }}
          transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
        />
      </div>
    </BentoTile>
  )
}
