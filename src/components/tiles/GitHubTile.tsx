import { useMemo } from 'react'
import { BentoTile } from '../bento/BentoTile'
import { Counter } from '../ui/Counter'

const WEEKS = 26
const DAYS = 7

function generateMockContributions(): number[][] {
  return Array.from({ length: WEEKS }, () =>
    Array.from({ length: DAYS }, () => Math.floor(Math.random() * 5)),
  )
}

const LEVEL_COLORS = [
  'bg-[var(--bg)]',
  'bg-emerald-200 dark:bg-emerald-900',
  'bg-emerald-300 dark:bg-emerald-700',
  'bg-emerald-400 dark:bg-emerald-500',
  'bg-emerald-500 dark:bg-emerald-400',
]

export function GitHubTile() {
  const data = useMemo(generateMockContributions, [])
  const total = useMemo(() => data.flat().reduce((a, b) => a + b, 0), [data])

  return (
    <BentoTile data-bento-tile label="GitHub activity" className="col-span-1 lg:col-span-5 p-6">
      <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
        GitHub activity
      </p>
      <div className="mt-4 flex items-end gap-4">
        <div>
          <p className="text-3xl font-bold text-ink">
            <Counter to={total} />
          </p>
          <p className="text-xs text-ink-muted">contributions in 6mo</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-ink">
            <Counter to={12} />
          </p>
          <p className="text-xs text-ink-muted">day streak</p>
        </div>
      </div>
      <div className="mt-4 flex gap-1">
        {data.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1">
            {week.map((level, di) => (
              <div
                key={di}
                className={`h-2.5 w-2.5 rounded-sm ${LEVEL_COLORS[level]}`}
                title={`${level} contributions`}
              />
            ))}
          </div>
        ))}
      </div>
    </BentoTile>
  )
}
