const THEME_STORAGE_KEY = 'user-dashboard-theme'

export function getStoredTheme() {
  if (typeof window === 'undefined') return null
  return window.localStorage.getItem(THEME_STORAGE_KEY)
}

export function resolveTheme() {
  const storedTheme = getStoredTheme()
  if (storedTheme === 'light' || storedTheme === 'dark') return storedTheme

  if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark'
  }

  return 'light'
}

export function setThemePreference(theme) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(THEME_STORAGE_KEY, theme)
  document.documentElement.setAttribute('data-theme', theme)
}

export function initializeTheme() {
  setThemePreference(resolveTheme())
}
