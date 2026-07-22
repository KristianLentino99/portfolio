import type { ReactNode } from 'react'

interface ContactCardProps {
  href: string
  channel: string
  title: string
  children: ReactNode
  featured?: boolean
  newTab?: boolean
  ariaLabel?: string
}

export default function ContactCard({
  href,
  channel,
  title,
  children,
  featured = false,
  newTab = false,
  ariaLabel,
}: ContactCardProps) {
  return (
    <a
      href={href}
      target={newTab ? '_blank' : undefined}
      rel={newTab ? 'noreferrer' : undefined}
      className={featured ? 'contact-card featured-panel' : 'contact-card'}
      aria-label={ariaLabel}
    >
      <strong>{channel}</strong>
      <h2>{title}</h2>
      <span>{children}</span>
    </a>
  )
}
