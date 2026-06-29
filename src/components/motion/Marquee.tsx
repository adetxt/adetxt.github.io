import { useReducedMotion } from './useReducedMotion'

type Props = {
  items: string[]
  speed?: number // seconds per loop
}

export function Marquee({ items, speed = 40 }: Props) {
  const reduced = useReducedMotion()
  const text = items.join('  •  ')

  if (reduced) {
    return (
      <div className="overflow-hidden border-y border-[var(--tile-border)] bg-tile py-3">
        <div className="px-6 text-sm text-ink-muted">{text}</div>
      </div>
    )
  }

  return (
    <div className="group overflow-hidden border-y border-[var(--tile-border)] bg-tile py-3">
      <div
        className="flex whitespace-nowrap text-sm text-ink-muted"
        style={{
          animation: `marquee ${speed}s linear infinite`,
          animationPlayState: 'running',
        }}
      >
        <span className="px-6">{text}</span>
        <span className="px-6" aria-hidden>{text}</span>
      </div>
      <style>{`
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .group:hover > div { animation-play-state: paused; }
      `}</style>
    </div>
  )
}
