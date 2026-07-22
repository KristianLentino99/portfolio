import type { HTMLAttributes, ReactNode } from 'react'

export type ComicBalloonVariant = 'speech' | 'shout' | 'thought' | 'whisper' | 'narration'
export type ComicBalloonTail = 'none' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
export type ComicBalloonTone = 'surface' | 'orange' | 'ink'
export type ComicBalloonSize = 'sm' | 'md' | 'lg'

interface ComicBalloonProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  children: ReactNode
  variant?: ComicBalloonVariant
  tail?: ComicBalloonTail
  tone?: ComicBalloonTone
  size?: ComicBalloonSize
}

export default function ComicBalloon({
  children,
  variant = 'speech',
  tail = 'bottom-left',
  tone = 'surface',
  size = 'md',
  className = '',
  ...props
}: ComicBalloonProps) {
  const classes = [
    'comic-balloon',
    `comic-balloon--${variant}`,
    `comic-balloon--${tone}`,
    `comic-balloon--${size}`,
    `comic-balloon--tail-${tail}`,
    className,
  ].filter(Boolean).join(' ')

  return (
    <aside className={classes} role="note" {...props}>
      <span className="comic-balloon__content">{children}</span>
    </aside>
  )
}
