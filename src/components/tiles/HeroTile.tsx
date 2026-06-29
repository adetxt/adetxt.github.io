import { BentoTile } from '../bento/BentoTile'
import { Chip } from '../ui/Chip'

export function HeroTile() {
  return (
    <BentoTile
      data-bento-tile
      label="About"
      className="col-span-1 md:col-span-2 lg:col-span-7 lg:row-span-2 p-8"
    >
      <div className="flex h-full flex-col justify-between gap-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
            About
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Hi, I'm <span className="bg-gradient-to-r from-pink-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">Ade</span>.
          </h1>
          <p className="mt-4 max-w-md text-base text-ink-muted sm:text-lg">
            Software engineer building delightful, useful things. Currently focused on
            real-time interfaces and developer tools.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Chip>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Open to work
          </Chip>
          <Chip>Lagos · Remote</Chip>
        </div>
      </div>
    </BentoTile>
  )
}
