import { useEffect } from 'react'
import PageShell from '../components/layout/PageShell'
import { NAV_ITEMS, PAGE_CONFIG } from '../config/navigation'
import useRoute from '../hooks/useRoute'
import useTheme from '../hooks/useTheme'
import AboutPage from '../pages/AboutPage'
import ContactPage from '../pages/ContactPage'
import HomePage from '../pages/HomePage'
import KoomyPage from '../pages/KoomyPage'
import TimelinePage from '../pages/TimelinePage'
import type { RoutePath } from '../routing'

interface PageRouterProps {
  path: RoutePath
  navigate: (path: RoutePath) => void
}

function PageRouter({ path, navigate }: PageRouterProps) {
  switch (path) {
    case '/about':
      return <AboutPage navigate={navigate} />
    case '/koomy':
      return <KoomyPage />
    case '/timeline':
      return <TimelinePage />
    case '/contact':
      return <ContactPage />
    default:
      return <HomePage navigate={navigate} />
  }
}

export default function AppContainer() {
  const { path, navigate } = useRoute()
  const { theme, toggleTheme } = useTheme()
  const pageConfig = PAGE_CONFIG[path]

  useEffect(() => {
    const url = `https://kristianlentino.it${path === '/' ? '/' : path}`
    document.title = pageConfig.title
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', url)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', pageConfig.title)
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', url)
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', pageConfig.title)
  }, [pageConfig.title, path])

  return (
    <PageShell
      path={path}
      items={NAV_ITEMS}
      theme={theme}
      onNavigate={navigate}
      onToggleTheme={toggleTheme}
      footer={pageConfig.next}
    >
      <PageRouter path={path} navigate={navigate} />
    </PageShell>
  )
}
