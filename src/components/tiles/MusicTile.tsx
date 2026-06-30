import { BentoTile } from '../bento/BentoTile'
import { currentlyListening, currentlyReading } from '../../data/music'

export function MusicTile({ className = '' }: { className?: string }) {
  return (
    <BentoTile data-bento-tile label="Currently enjoying" className={`col-span-1 lg:col-span-4 p-6 ${className}`}>
      <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
        Vibes
      </p>
      <div className="mt-4 space-y-3">
        <div className="flex items-center gap-3">
          <div className={`h-12 w-12 flex-shrink-0 rounded-md bg-gradient-to-br ${currentlyListening.coverGradient}`} />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-ink">{currentlyListening.title}</p>
            <p className="truncate text-xs text-ink-muted">{currentlyListening.artist}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className={`h-12 w-12 flex-shrink-0 rounded-md bg-gradient-to-br ${currentlyReading.coverGradient}`} />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-ink">{currentlyReading.title}</p>
            <p className="truncate text-xs text-ink-muted">{currentlyReading.artist}</p>
          </div>
        </div>
      </div>
    </BentoTile>
  )
}
