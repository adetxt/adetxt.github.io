import { useEffect, useState } from 'react'
import { useMousePosition } from '../../hooks/useMousePosition'
import { useReducedMotion } from './useReducedMotion'

export function MagneticCursor() {
  const { x, y } = useMousePosition()
  const reduced = useReducedMotion()
  const [hidden, setHidden] = useState(true)
  const [variant, setVariant] = useState<'default' | 'tile' | 'link'>('default')
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
      const link = t.closest('a, button') as HTMLElement | null
      if (tile) {
        setVariant('tile')
        setAccent(getComputedStyle(tile).getPropertyValue('--accent').trim() || '#6e6e73')
      } else if (link) {
        setVariant('link')
      } else {
        setVariant('default')
      }
    }
    window.addEventListener('mouseover', onOver, { passive: true })
    return () => window.removeEventListener('mouseover', onOver)
  }, [hidden])

  if (hidden) return null

  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-50 hidden -translate-x-1/2 -translate-y-1/2 mix-blend-difference md:block"
        style={{
          transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
          transition: 'width 0.2s, height 0.2s, opacity 0.2s',
          width: variant === 'link' ? 0 : 8,
          height: variant === 'link' ? 0 : 8,
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
          width: variant === 'tile' ? 48 : variant === 'link' ? 64 : 32,
          height: variant === 'tile' ? 48 : variant === 'link' ? 28 : 32,
          borderRadius: variant === 'link' ? 999 : 999,
          border: `1.5px solid ${variant === 'tile' ? accent : 'rgba(255,255,255,0.5)'}`,
          background: 'transparent',
        }}
      />
    </>
  )
}
