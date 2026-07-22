import type { ReactNode } from 'react'
import type { RoutePath } from '../../routing'
import Footer, { type FooterNext } from './Footer'
import Header from './Header'

interface NavItem {
  path: RoutePath
  label: string
}

interface PageShellProps {
  path: RoutePath
  items: NavItem[]
  theme: 'light' | 'dark'
  children: ReactNode
  footer?: FooterNext
  onNavigate: (path: RoutePath) => void
  onToggleTheme: () => void
}

export default function PageShell({
  path,
  items,
  theme,
  children,
  footer,
  onNavigate,
  onToggleTheme,
}: PageShellProps) {
  return (
    <div className="page-shell">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <Header
        path={path}
        items={items}
        theme={theme}
        onNavigate={onNavigate}
        onToggleTheme={onToggleTheme}
      />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <Footer path={path} onNavigate={onNavigate} next={footer} />
    </div>
  )
}
