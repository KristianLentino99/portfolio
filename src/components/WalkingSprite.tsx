import { useEffect, useState } from 'react'
import { assetPath } from '../routing'

export interface WalkingSpriteProps {
  direction?: 'left' | 'right'
  size?: number
  className?: string
}

const SHEET_SRC = assetPath('assets/avatars/kristian-walk.webp')
const FRAME_POSITIONS = [
  '0%',
  '14.285714%',
  '28.571429%',
  '42.857143%',
  '57.142857%',
  '71.428571%',
  '85.714286%',
]
// The final source cell repeats the first contact pose, so it is not played.
const FRAME_DURATION_MS = 140

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export default function WalkingSprite({
  direction = 'right',
  size = 96,
  className = '',
}: WalkingSpriteProps) {
  const [leg, setLeg] = useState<'left' | 'right'>(direction)
  const [frame, setFrame] = useState(0)
  const [reducedMotion] = useState(prefersReducedMotion)

  useEffect(() => {
    if (reducedMotion) {
      return undefined
    }

    const interval = window.setInterval(() => {
      setFrame((current) => (current + 1) % FRAME_POSITIONS.length)
    }, FRAME_DURATION_MS)

    return () => window.clearInterval(interval)
  }, [reducedMotion])

  const activeDirection = reducedMotion ? direction : leg
  const figureClassName = [
    'walking-sprite-figure',
    `facing-${activeDirection}`,
    reducedMotion ? null : `walk-${activeDirection}`,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      className={`walking-sprite ${className}`.trim()}
      style={{ height: size }}
      aria-hidden="true"
    >
      <div
        key={reducedMotion ? 'static' : leg}
        className={figureClassName}
        style={{
          width: size / 2,
          height: size,
          backgroundImage: `url(${SHEET_SRC})`,
          backgroundPositionX: FRAME_POSITIONS[reducedMotion ? 0 : frame],
        }}
        onAnimationEnd={
          reducedMotion
            ? undefined
            : () => setLeg((current) => (current === 'right' ? 'left' : 'right'))
        }
      />
    </div>
  )
}
