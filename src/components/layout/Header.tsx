import { useEffect, useState } from 'react'
import type { RoutePath } from '../../routing'
import AppLink from '../AppLink'

interface NavItem {
  path: RoutePath
  label: string
}

interface HeaderProps {
  path: RoutePath
  items: NavItem[]
  theme: 'light' | 'dark'
  onNavigate: (path: RoutePath) => void
  onToggleTheme: () => void
}

export default function Header({ path, items, theme, onNavigate, onToggleTheme }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  // biome-ignore lint/correctness/useExhaustiveDependencies: A route change closes the mobile menu.
  useEffect(() => setMenuOpen(false), [path])

  useEffect(() => {
    if (!menuOpen) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [menuOpen])

  return (
    <header className="site-header">
      <AppLink
        to="/"
        navigate={onNavigate}
        className="wordmark"
        aria-label="Kristian Lentino, home"
      >
        KL<span>.</span>
      </AppLink>

      <button
        className="menu-toggle"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span />
        <span />
      </button>

      <nav
        id="primary-navigation"
        className={menuOpen ? 'primary-nav is-open' : 'primary-nav'}
        aria-label="Primary navigation"
      >
        <div className="nav-links">
          {items.map((item) => (
            <AppLink
              key={item.path}
              to={item.path}
              navigate={onNavigate}
              className={path === item.path ? 'nav-link is-active' : 'nav-link'}
              aria-current={path === item.path ? 'page' : undefined}
              onNavigate={() => setMenuOpen(false)}
            >
              {item.label}
            </AppLink>
          ))}
        </div>
        <button
          className="theme-toggle"
          type="button"
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
        >
          <span aria-hidden="true">{theme === 'dark' ? '☀️' : '🌙'}</span>
          <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
        </button>
      </nav>
    </header>
  )
}
