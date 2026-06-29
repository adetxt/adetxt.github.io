import { BentoTile } from '../bento/BentoTile'

export function MusicTile() {
  return (
    <BentoTile data-bento-tile label="Currently enjoying" className="col-span-1 lg:col-span-4 p-6">
      <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
        Vibes
      </p>
      <div className="mt-4 space-y-3">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 flex-shrink-0 rounded-md bg-gradient-to-br from-orange-400 to-pink-500" />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-ink">Album title here</p>
            <p className="truncate text-xs text-ink-muted">Artist name</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 flex-shrink-0 rounded-md bg-gradient-to-br from-emerald-400 to-cyan-500" />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-ink">Book title here</p>
            <p className="truncate text-xs text-ink-muted">Author</p>
          </div>
        </div>
      </div>
    </BentoTile>
  )
}
