import { BentoTile } from '../bento/BentoTile'
import { socials } from '../../data/socials'

export function ContactTile({ className = '' }: { className?: string }) {
  return (
    <BentoTile
      data-bento-tile
      label="Get in touch"
      className={`col-span-1 !bg-[#0a0a0a] p-6 !text-white lg:col-span-4 ${className}`}
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-white/60">
        Get in touch
      </p>
      <h3 className="mt-2 text-2xl font-bold tracking-tight">Let's talk.</h3>
      <a
        href="mailto:hello@example.com"
        className="mt-3 inline-block text-sm text-white/80 underline-offset-4 hover:underline"
      >
        hello@example.com
      </a>
      <div className="mt-4 flex gap-2">
        {socials.map((s) => {
          const Icon = s.icon
          const hoverClass =
            s.name === 'GitHub' ? 'hover:rotate-12' :
            s.name === 'LinkedIn' ? 'hover:-translate-y-0.5' :
            s.name === 'Twitter' ? 'hover:skew-x-[-12deg]' :
            s.name === 'Email' ? 'hover:scale-125' :
            ''
          return (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.name}
              className={`flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-transform duration-200 ${hoverClass}`}
            >
              <Icon size={15} />
            </a>
          )
        })}
      </div>
    </BentoTile>
  )
}
