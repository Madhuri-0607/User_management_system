import { describe, expect, it, beforeEach, afterEach } from 'vitest'
import { getStoredTheme, resolveTheme, setThemePreference } from './theme'

describe('theme helpers', () => {
  const originalMatchMedia = window.matchMedia

  beforeEach(() => {
    localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
  })

  afterEach(() => {
    window.matchMedia = originalMatchMedia
  })

  it('uses the stored theme when available', () => {
    localStorage.setItem('user-dashboard-theme', 'dark')
    expect(resolveTheme()).toBe('dark')
  })

  it('falls back to system preference', () => {
    window.matchMedia = () => ({ matches: true })
    expect(resolveTheme()).toBe('dark')
  })

  it('persists the theme preference', () => {
    setThemePreference('dark')
    expect(localStorage.getItem('user-dashboard-theme')).toBe('dark')
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
  })
})
