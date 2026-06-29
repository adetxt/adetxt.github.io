import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { useInView } from './useInView'

let intersectionCallback: ((entries: any[]) => void) | null = null

beforeEach(() => {
  intersectionCallback = null
  // @ts-expect-error - mock
  globalThis.IntersectionObserver = class {
    constructor(cb: any) {
      intersectionCallback = cb
    }
    observe() {}
    disconnect() {}
    unobserve() {}
  }
})

describe('useInView', () => {
  it('starts as not in view', () => {
    const { result } = renderHook(() => useInView())
    expect(result.current[1]).toBe(false)
  })

  it('becomes true when intersection is reported as intersecting', () => {
    const { result } = renderHook(() => useInView({ threshold: 0.15 }))
    act(() => {
      intersectionCallback!([{ isIntersecting: true }])
    })
    expect(result.current[1]).toBe(true)
  })
})
