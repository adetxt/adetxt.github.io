import { BentoTile } from '../bento/BentoTile'
import { Collapsible } from '../ui/Collapsible'
import { experiences } from '../../data/experience'

export function ExperienceTile({ className = '' }: { className?: string }) {
  return (
    <BentoTile data-bento-tile label="Experience" className={`col-span-1 lg:col-span-7 p-6 ${className}`}>
      <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
        Experience
      </p>
      <Collapsible className="mt-4">
        <ul className="divide-y divide-[var(--tile-border)]">
          {experiences.map((e) => (
            <li key={e.id} className="grid grid-cols-12 gap-3 py-3 first:pt-0 last:pb-0">
              <p className="col-span-3 text-xs font-medium text-ink-muted">
                {e.start} – {e.end}
              </p>
              <div className="col-span-9">
                <p className="text-sm font-semibold text-ink">
                  {e.role} · {e.company}
                </p>
                <p className="text-sm text-ink-muted">{e.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </Collapsible>
    </BentoTile>
  )
}
