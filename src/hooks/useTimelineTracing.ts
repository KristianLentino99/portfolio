import { useEffect, useRef, useState } from 'react'

export default function useTimelineTracing() {
  const timelineRef = useRef<HTMLElement>(null)
  const [isTracing, setIsTracing] = useState(() => typeof IntersectionObserver === 'undefined')

  useEffect(() => {
    const timeline = timelineRef.current
    if (!timeline || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setIsTracing(true)
        observer.unobserve(entry.target)
      },
      { threshold: 0.12 },
    )

    observer.observe(timeline)
    return () => observer.disconnect()
  }, [])

  return { timelineRef, isTracing }
}
