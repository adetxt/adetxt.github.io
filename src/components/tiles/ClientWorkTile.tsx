import { FiLock } from 'react-icons/fi'
import { BentoTile } from '../bento/BentoTile'
import { clientWork } from '../../data/clientWork'

export function ClientWorkTile({ className = '' }: { className?: string }) {
  return (
    <BentoTile
      data-bento-tile
      label="Selected work"
      className={`col-span-1 lg:col-span-3 p-6 ${className}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
            Selected work
          </p>
          <span className="rounded-full bg-[var(--bg)] px-1.5 py-0.5 text-[10px] font-medium text-ink-muted">
            Private
          </span>
        </div>
        <FiLock size={12} className="text-ink-muted" />
      </div>
      <ul className="mt-4 divide-y divide-[var(--tile-border)]">
        {clientWork.map((w) => (
          <li key={w.id} className="py-3 first:pt-0">
            <div className="flex items-baseline justify-between gap-2">
              <p className="truncate text-sm font-semibold text-ink">{w.title}</p>
              <span className="shrink-0 text-xs text-ink-muted">{w.year}</span>
            </div>
            <p className="text-xs text-ink-muted">{w.company}</p>
            <p className="mt-1 line-clamp-2 text-xs text-ink-muted">{w.description}</p>
            <div className="mt-1.5 flex flex-wrap gap-1">
              {w.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-[var(--bg)] px-1.5 py-0.5 text-[10px] font-medium text-ink-muted"
                >
                  {t}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </BentoTile>
  )
}
