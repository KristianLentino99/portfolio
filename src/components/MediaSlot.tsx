import { useEffect, useRef, useState } from 'react'

export interface MediaSlotProps {
  src: string
  alt: string
  className?: string
  priority?: boolean
}

type ImageState = 'loading' | 'loaded' | 'failed'

export default function MediaSlot({
  src,
  alt,
  className = '',
  priority = false,
}: MediaSlotProps) {
  const [state, setState] = useState<ImageState>('loading')
  const imgRef = useRef<HTMLImageElement>(null)

  // biome-ignore lint/correctness/useExhaustiveDependencies: Re-check the element when its source changes.
  useEffect(() => {
    const img = imgRef.current
    if (!img) return

    // Handle cached images (complete before React attaches listeners)
    if (img.complete) {
      setState(img.naturalWidth > 0 ? 'loaded' : 'failed')
      return
    }

    const onLoad = () => setState('loaded')
    const onError = () => setState('failed')

    img.addEventListener('load', onLoad)
    img.addEventListener('error', onError)
    return () => {
      img.removeEventListener('load', onLoad)
      img.removeEventListener('error', onError)
    }
  }, [src])

  const isLoading = state === 'loading'

  return (
    <div className={`media-slot${isLoading ? ' is-loading' : ''} ${className}`.trim()}>
      {/* Loading indicator */}
      <span className="media-label" aria-hidden={state === 'loaded' ? 'true' : undefined}>
        {state === 'loading' ? 'Loading…' : 'Image failed to load'}
      </span>

      {state !== 'failed' && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          className={isLoading ? 'media-img-loading' : undefined}
        />
      )}
    </div>
  )
}
