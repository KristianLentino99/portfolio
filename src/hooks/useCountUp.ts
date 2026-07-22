import { useEffect, useState } from 'react'

export default function useCountUp(target: number): number {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target)
      return
    }

    const start = performance.now()
    let frame = 0
    const tick = (time: number) => {
      const progress = Math.min(1, (time - start) / 1500)
      setValue(Math.round(target * (1 - (1 - progress) ** 3)))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target])

  return value
}
