import { type MouseEvent, type ReactNode } from 'react'
import { toBrowserPath } from '../routing'

export interface AppLinkProps {
  to: string
  navigate: (path: string) => void
  children: ReactNode
  className?: string
  onNavigate?: () => void
  'aria-label'?: string
  'aria-current'?: 'page'
}

export default function AppLink({
  to,
  navigate,
  children,
  className,
  onNavigate,
  'aria-label': ariaLabel,
  'aria-current': ariaCurrent,
}: AppLinkProps) {
  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    navigate(to)
    onNavigate?.()
  }

  return (
    <a
      href={toBrowserPath(to)}
      onClick={onClick}
      className={className}
      aria-label={ariaLabel}
      aria-current={ariaCurrent}
    >
      {children}
    </a>
  )
}
