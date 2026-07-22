import type { FooterNext } from '../components/layout/Footer'
import type { RoutePath } from '../routing'

export interface NavItem {
  path: RoutePath
  label: string
}

export interface PageConfig {
  title: string
  next?: FooterNext
}

export const NAV_ITEMS: NavItem[] = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/koomy', label: 'Koomy' },
  { path: '/timeline', label: 'Timeline' },
  { path: '/contact', label: 'Contact' },
]

export const PAGE_CONFIG: Record<RoutePath, PageConfig> = {
  '/': { title: 'Kristian Lentino · Engineer & Founder' },
  '/about': {
    title: 'About · Kristian Lentino',
    next: { path: '/koomy', label: 'Next chapter: Koomy →' },
  },
  '/koomy': {
    title: 'Koomy · Kristian Lentino',
    next: { path: '/timeline', label: 'Next chapter: the full timeline →' },
  },
  '/timeline': {
    title: 'Timeline · Kristian Lentino',
    next: { path: '/contact', label: 'Final chapter: say hi →' },
  },
  '/contact': { title: 'Contact · Kristian Lentino' },
}
