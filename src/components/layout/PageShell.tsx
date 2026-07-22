import type { ReactNode } from 'react'
import Header from './Header'
import Footer, { type FooterNext } from './Footer'

interface NavItem {
  path: string
  label: string
}

interface PageShellProps {
  path: string
  items: NavItem[]
  theme: 'light' | 'dark'
  children: ReactNode
  footer?: FooterNext
  onNavigate: (path: string) => void
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
