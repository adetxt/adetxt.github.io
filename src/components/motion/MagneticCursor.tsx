import { useEffect, useState } from 'react'
import { useMousePosition } from '../../hooks/useMousePosition'
import { useReducedMotion } from './useReducedMotion'

export function MagneticCursor() {
  const { x, y } = useMousePosition()
  const reduced = useReducedMotion()
  const [hidden, setHidden] = useState(true)
  const [variant, setVariant] = useState<'default' | 'tile' | 'link'>('default')
  const [linkText, setLinkText] = useState('')
  const [accent, setAccent] = useState('#6e6e73')

  useEffect(() => {
    if (reduced) return
    const isTouch = window.matchMedia('(hover: none)').matches
    if (isTouch) return
    setHidden(false)
  }, [reduced])

  useEffect(() => {
    if (hidden) return
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      const tile = t.closest('[data-bento-tile]') as HTMLElement | null
      const link = t.closest('a') as HTMLElement | null
      if (tile) {
        setVariant('tile')
        setLinkText('')
        setAccent(getComputedStyle(tile).getPropertyValue('--accent').trim() || '#6e6e73')
      } else if (link) {
        setVariant('link')
        setLinkText(t.textContent?.trim() || '')
      } else {
        setVariant('default')
        setLinkText('')
      }
    }
    window.addEventListener('mouseover', onOver, { passive: true })
    return () => window.removeEventListener('mouseover', onOver)
  }, [hidden])

  if (hidden) return null

  const isLink = variant === 'link'
  const pillWidth = isLink ? Math.max(64, linkText.length * 7 + 24) : variant === 'tile' ? 48 : 32
  const pillHeight = isLink ? 28 : variant === 'tile' ? 48 : 32

  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-50 hidden -translate-x-1/2 -translate-y-1/2 mix-blend-difference md:block"
        style={{
          transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
          transition: 'width 0.2s, height 0.2s, opacity 0.2s',
          width: isLink ? 0 : 8,
          height: isLink ? 0 : 8,
          borderRadius: 9999,
          background: variant === 'tile' ? accent : '#fff',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-50 hidden -translate-x-1/2 -translate-y-1/2 md:block"
        style={{
          transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
          transition: 'width 0.25s, height 0.25s, opacity 0.25s, border-color 0.25s',
          width: pillWidth,
          height: pillHeight,
          borderRadius: 9999,
          border: `1.5px solid ${variant === 'tile' ? accent : 'rgba(255,255,255,0.5)'}`,
          background: isLink ? 'rgba(255,255,255,0.08)' : 'transparent',
        }}
      >
        {isLink && linkText && (
          <span className="absolute inset-0 flex items-center justify-center px-3 text-[11px] font-medium text-white whitespace-nowrap">
            {linkText}
          </span>
        )}
      </div>
    </>
  )
}
