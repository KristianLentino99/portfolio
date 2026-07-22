export type RoutePath = '/' | '/about' | '/koomy' | '/timeline' | '/contact'

export const ROUTE_PATHS: RoutePath[] = ['/', '/about', '/koomy', '/timeline', '/contact']

function normalizeBase(base: string) {
  if (!base || base === '/') return ''
  return `/${base.replace(/^\/+|\/+$/g, '')}`
}

export function toBrowserPath(path: string, base = import.meta.env.BASE_URL) {
  const normalizedBase = normalizeBase(base)
  return path === '/' ? `${normalizedBase}/` : `${normalizedBase}${path}`
}

export function fromBrowserPath(pathname: string, base = import.meta.env.BASE_URL): RoutePath {
  const normalizedBase = normalizeBase(base)
  const withoutBase =
    normalizedBase && pathname.startsWith(`${normalizedBase}/`)
      ? pathname.slice(normalizedBase.length)
      : pathname
  const normalizedPath = withoutBase.length > 1 ? withoutBase.replace(/\/$/, '') : withoutBase
  return ROUTE_PATHS.includes(normalizedPath as RoutePath) ? (normalizedPath as RoutePath) : '/'
}

export function assetPath(path: string, base = import.meta.env.BASE_URL) {
  return `${base.endsWith('/') ? base : `${base}/`}${path.replace(/^\//, '')}`
}
