import { useEffect, useRef, useState } from 'react'
import { useMousePosition } from '../../hooks/useMousePosition'
import { useReducedMotion } from './useReducedMotion'

const COLORS = ['var(--mesh-1)', 'var(--mesh-2)', 'var(--mesh-3)', 'var(--mesh-4)']

export function MeshGradient() {
  const { x, y } = useMousePosition()
  const reduced = useReducedMotion()
  const [active, setActive] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    if (reduced) return
    const wake = () => {
      setActive(true)
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => setActive(false), 10_000)
    }
    wake()
    window.addEventListener('mousemove', wake)
    return () => {
      window.removeEventListener('mousemove', wake)
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [reduced])

  if (reduced) return null

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{ opacity: active ? 1 : 0.6 }}
      >
        {COLORS.map((c, i) => (
          <div
            key={i}
            className="absolute h-[60vmax] w-[60vmax]"
            style={{
              top: `${20 + i * 15}%`,
              left: `${(i * 25 + (x * 0.03)) % 80}%`,
              transform: `translateY(${y * 0.03}px)`,
            }}
          >
            <div
              className="h-full w-full rounded-full blur-3xl opacity-40 mix-blend-multiply dark:mix-blend-screen"
              style={{
                background: c,
                animation: `mesh-drift-${i} ${60 + i * 5}s ease-in-out infinite alternate`,
              }}
            />
          </div>
        ))}
      </div>
      <style>{`
        @keyframes mesh-drift-0 { from { transform: translate(0,0); } to { transform: translate(40vw, 30vh); } }
        @keyframes mesh-drift-1 { from { transform: translate(0,0); } to { transform: translate(-30vw, 40vh); } }
        @keyframes mesh-drift-2 { from { transform: translate(0,0); } to { transform: translate(20vw, -30vh); } }
        @keyframes mesh-drift-3 { from { transform: translate(0,0); } to { transform: translate(-40vw, -20vh); } }
      `}</style>
    </div>
  )
}
