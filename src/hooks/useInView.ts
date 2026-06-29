import { useEffect, useRef, useState } from 'react'

type Options = {
  threshold?: number
  rootMargin?: string
  once?: boolean
}

export function useInView<T extends Element = HTMLDivElement>(
  options: Options = {},
): [React.RefObject<T>, boolean] {
  const { threshold = 0.15, rootMargin = '0px', once = true } = options
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold, rootMargin },
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return [ref, inView]
}
