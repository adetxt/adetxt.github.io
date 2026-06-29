import { describe, it, expect } from 'vitest'
import { fadeInUp, staggerContainer, springConfig, tileHover } from './animations'

describe('animations', () => {
  it('fadeInUp has the expected initial and animate states', () => {
    expect(fadeInUp.initial).toEqual({ opacity: 0, y: 24, scale: 0.96 })
    expect(fadeInUp.animate).toEqual({ opacity: 1, y: 0, scale: 1 })
  })

  it('staggerContainer has 60ms stagger and 15% viewport threshold', () => {
    expect(staggerContainer.animate.transition.staggerChildren).toBe(0.06)
    expect(staggerContainer.viewport.amount).toBe(0.15)
  })

  it('springConfig defines stiffness and damping', () => {
    expect(springConfig.stiffness).toBe(120)
    expect(springConfig.damping).toBe(18)
  })

  it('tileHover has y -4 and the expected shadow', () => {
    expect(tileHover.y).toBe(-4)
    expect(tileHover.boxShadow).toBe('0 20px 40px rgba(0,0,0,0.08)')
  })
})
