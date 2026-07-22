import type { ReactNode } from 'react'

export interface StickerProps {
  children: ReactNode
  className?: string
}

export default function Sticker({ children, className = '' }: StickerProps) {
  return <span className={`sticker ${className}`.trim()}>{children}</span>
}
