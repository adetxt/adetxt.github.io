import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useMousePosition } from './useMousePosition'

describe('useMousePosition', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'innerWidth', { value: 1000, configurable: true })
    Object.defineProperty(window, 'innerHeight', { value: 800, configurable: true })
  })

  it('starts at 0,0', () => {
    const { result } = renderHook(() => useMousePosition())
    expect(result.current.x).toBe(0)
    expect(result.current.y).toBe(0)
  })

  it('updates on mousemove', () => {
    const { result } = renderHook(() => useMousePosition())
    act(() => {
      window.dispatchEvent(new MouseEvent('mousemove', { clientX: 500, clientY: 400 }))
    })
    expect(result.current.x).toBe(500)
    expect(result.current.y).toBe(400)
  })

  it('cleans up listener on unmount', () => {
    const { unmount } = renderHook(() => useMousePosition())
    const removeSpy = vi.spyOn(window, 'removeEventListener')
    unmount()
    expect(removeSpy).toHaveBeenCalledWith('mousemove', expect.any(Function))
  })
})
