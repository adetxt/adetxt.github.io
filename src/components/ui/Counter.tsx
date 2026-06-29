import { useEffect, useState } from 'react'
import { useReducedMotion } from '../motion/useReducedMotion'

type Props = {
  to: number
  duration?: number
  className?: string
}

export function Counter({ to, duration = 1200, className = '' }: Props) {
  const reduced = useReducedMotion()
  const [n, setN] = useState(reduced ? to : 0)

  useEffect(() => {
    if (reduced) return
    const start = performance.now()
    let raf = 0
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      setN(Math.floor(t * to))
      if (t < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [to, duration, reduced])

  return <span className={className}>{n.toLocaleString()}</span>
}
