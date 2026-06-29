import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { ThemeToggle } from './ThemeToggle'

describe('ThemeToggle', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.classList.remove('dark')
  })

  it('renders a button with an accessible label', () => {
    render(<ThemeToggle />)
    const btn = screen.getByRole('button', { name: /switch to (dark|light) mode/i })
    expect(btn).toBeInTheDocument()
  })

  it('clicking toggles the document class', () => {
    render(<ThemeToggle />)
    const btn = screen.getByRole('button')
    fireEvent.click(btn)
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    fireEvent.click(btn)
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })
})
