import { useEffect, useRef, useState, type ReactNode } from 'react'
import { FiChevronDown } from 'react-icons/fi'

type Props = {
  children: ReactNode
  collapsedHeight?: number
  className?: string
}

export function Collapsible({ children, collapsedHeight = 240, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [overflowing, setOverflowing] = useState(false)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const check = () => setOverflowing(el.scrollHeight > collapsedHeight + 1)
    check()
    const ro = new ResizeObserver(check)
    ro.observe(el)
    return () => ro.disconnect()
  }, [collapsedHeight])

  return (
    <div className={`relative ${className}`}>
      {overflowing && expanded && (
        <button
          type="button"
          onClick={() => setExpanded(false)}
          className="relative z-10 mb-2 flex w-full items-center justify-center gap-1.5 rounded-md py-1.5 text-xs font-medium text-ink-muted transition-colors hover:text-ink"
        >
          <FiChevronDown size={14} className="rotate-180" />
          Show less
        </button>
      )}
      <div
        ref={ref}
        className="overflow-hidden transition-[max-height] duration-500 ease-out"
        style={{ maxHeight: expanded ? '2000px' : `${collapsedHeight}px` }}
      >
        {children}
      </div>
      {overflowing && !expanded && (
        <div
          className="pointer-events-none absolute inset-x-0 bottom-9 h-14 bg-gradient-to-t from-[var(--tile)] to-transparent"
          aria-hidden="true"
        />
      )}
      {overflowing && (
        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          className="relative mt-2 flex w-full items-center justify-center gap-1.5 rounded-md py-1.5 text-xs font-medium text-ink-muted transition-colors hover:text-ink"
        >
          {expanded ? 'Show less' : 'Show more'}
          <FiChevronDown
            size={14}
            className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
          />
        </button>
      )}
    </div>
  )
}
