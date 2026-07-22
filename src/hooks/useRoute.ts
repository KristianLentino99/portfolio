import { useCallback, useEffect, useState } from 'react'
import { fromBrowserPath, type RoutePath, toBrowserPath } from '../routing'

export interface RouteState {
  path: RoutePath
  navigate: (path: RoutePath) => void
}

export default function useRoute(): RouteState {
  const [path, setPath] = useState<RoutePath>(() => fromBrowserPath(window.location.pathname))

  useEffect(() => {
    const onPopState = () => setPath(fromBrowserPath(window.location.pathname))
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const navigate = useCallback(
    (nextPath: RoutePath) => {
      if (nextPath !== path) window.history.pushState({}, '', toBrowserPath(nextPath))
      setPath(fromBrowserPath(nextPath, '/'))
      window.scrollTo({ top: 0, behavior: 'instant' })
      window.setTimeout(
        () => document.getElementById('main-content')?.focus({ preventScroll: true }),
        0,
      )
    },
    [path],
  )

  return { path, navigate }
}
