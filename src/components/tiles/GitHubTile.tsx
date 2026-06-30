import { FiStar, FiExternalLink } from 'react-icons/fi'
import { BentoTile } from '../bento/BentoTile'
import { Counter } from '../ui/Counter'
import { githubRepos, githubTotals, githubHeatmap } from '../../data/github'

const LANG_DOT: Record<string, string> = {
  TypeScript: 'bg-blue-500',
  JavaScript: 'bg-yellow-400',
  Go: 'bg-cyan-400',
  PHP: 'bg-indigo-400',
  Python: 'bg-green-500',
  'C#': 'bg-purple-500',
  Ruby: 'bg-red-500',
  Rust: 'bg-orange-500',
  'C++': 'bg-pink-500',
}

const LEVEL_COLORS = [
  'bg-[var(--bg)]',
  'bg-emerald-200 dark:bg-emerald-900',
  'bg-emerald-300 dark:bg-emerald-700',
  'bg-emerald-400 dark:bg-emerald-500',
  'bg-emerald-500 dark:bg-emerald-400',
]

function relativeTime(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime()
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  if (days < 1) return 'today'
  if (days < 7) return `${days}d ago`
  if (days < 30) return `${Math.floor(days / 7)}w ago`
  if (days < 365) return `${Math.floor(days / 30)}mo ago`
  return `${Math.floor(days / 365)}y ago`
}

export function GitHubTile() {
  return (
    <BentoTile data-bento-tile label="GitHub activity" className="col-span-1 lg:col-span-5 p-6">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
          GitHub
        </p>
        <a
          href={githubTotals.profileUrl}
          target="_blank"
          rel="noreferrer"
          className="text-ink-muted transition-colors hover:text-ink"
          aria-label="Open GitHub profile"
        >
          <FiExternalLink size={14} />
        </a>
      </div>

      <div className="mt-3 flex items-end gap-6">
        <div>
          <p className="text-2xl font-bold text-ink">
            <Counter to={githubTotals.publicRepos} />
          </p>
          <p className="text-xs text-ink-muted">public repos</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-ink">
            <Counter to={githubTotals.stars} />
          </p>
          <p className="text-xs text-ink-muted">stars</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-ink">
            <Counter to={githubTotals.followers} />
          </p>
          <p className="text-xs text-ink-muted">followers</p>
        </div>
      </div>

      <div className="mt-4 overflow-x-auto">
        <div className="flex gap-1">
          {githubHeatmap.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-1">
              {week.map((level, di) => (
                <div
                  key={di}
                  className={`h-2.5 w-2.5 rounded-sm ${LEVEL_COLORS[level]}`}
                  title={`${level === 0 ? 'No' : level} contribution${level === 1 ? '' : 's'}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <ul className="mt-4 divide-y divide-[var(--tile-border)]">
        {githubRepos.slice(0, 3).map((repo) => (
          <li key={repo.fullName} className="py-2.5 first:pt-0">
            <div className="flex items-baseline justify-between gap-2">
              <a
                href={repo.url}
                target="_blank"
                rel="noreferrer"
                className="truncate text-sm font-semibold text-ink transition-colors hover:underline"
              >
                {repo.name}
              </a>
              {repo.stars > 0 && (
                <span className="flex shrink-0 items-center gap-0.5 text-xs text-ink-muted">
                  <FiStar size={11} /> {repo.stars}
                </span>
              )}
            </div>
            {repo.description && (
              <p className="mt-0.5 line-clamp-1 text-xs text-ink-muted">{repo.description}</p>
            )}
            <div className="mt-1 flex items-center gap-3 text-xs text-ink-muted">
              {repo.language && (
                <span className="flex items-center gap-1.5">
                  <span className={`h-2 w-2 rounded-full ${LANG_DOT[repo.language] ?? 'bg-ink-muted'}`} />
                  {repo.language}
                </span>
              )}
              <span>updated {relativeTime(repo.updatedAt)}</span>
            </div>
          </li>
        ))}
      </ul>
    </BentoTile>
  )
}
