import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

type Props = {
  children: ReactNode
  className?: string
  tone?: 'default' | 'dark'
}

export function Chip({ children, className = '', tone = 'default' }: Props) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium',
        tone === 'default' && 'bg-[var(--bg)] text-ink-muted',
        tone === 'dark' && 'bg-white/10 text-white',
        className,
      )}
    >
      {children}
    </span>
  )
}
