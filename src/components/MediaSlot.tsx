import { useState } from 'react'

export interface MediaSlotProps {
  src: string
  alt: string
  label: string
  className?: string
  priority?: boolean
}

export default function MediaSlot({
  src,
  alt,
  label,
  className = '',
  priority = false,
}: MediaSlotProps) {
  const [failed, setFailed] = useState(false)

  return (
    <div className={`media-slot ${className}`.trim()}>
      <span className="media-label" aria-hidden={failed ? undefined : 'true'}>
        {label}
      </span>
      {!failed && (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  )
}
