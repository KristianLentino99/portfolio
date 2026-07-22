import { useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

export interface ThemeState {
  theme: Theme
  toggleTheme: () => void
}

function getInitialTheme(): Theme {
  const saved = window.localStorage.getItem('kl-theme')
  if (saved === 'dark' || saved === 'light') return saved
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export default function useTheme(): ThemeState {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    const colorScheme = window.matchMedia('(prefers-color-scheme: dark)')
    const followSystemTheme = (event: MediaQueryListEvent) => {
      const saved = window.localStorage.getItem('kl-theme')
      if (saved !== 'dark' && saved !== 'light') setTheme(event.matches ? 'dark' : 'light')
    }

    colorScheme.addEventListener('change', followSystemTheme)
    return () => colorScheme.removeEventListener('change', followSystemTheme)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'dark' ? '#151210' : '#faf8f4')
  }, [theme])

  const toggleTheme = () => {
    setTheme((current) => {
      const next = current === 'dark' ? 'light' : 'dark'
      window.localStorage.setItem('kl-theme', next)
      return next
    })
  }

  return { theme, toggleTheme }
}
