import type { CSSProperties } from 'react'

export interface TimelineArc {
  year: string
  tag: string
  title: string
  body: string
  featured?: boolean
  current?: boolean
}

interface TimelineEntryProps {
  arc: TimelineArc
  index: number
  isLast: boolean
}

export default function TimelineEntry({ arc, index, isLast }: TimelineEntryProps) {
  const dotClassName = [arc.featured && 'featured-dot', arc.current && 'current-dot']
    .filter(Boolean)
    .join(' ')
  const style = { '--timeline-delay': `${340 + index * 440}ms` } as CSSProperties

  return (
    <article className="timeline-item" style={style}>
      <div className="timeline-year">{arc.year}</div>
      <div className="timeline-track">
        <span
          className={dotClassName}
          data-testid={arc.current ? 'current-timeline-dot' : undefined}
        />
        {!isLast && <i data-testid="timeline-segment" />}
      </div>
      <div className={arc.featured ? 'timeline-card is-featured' : 'timeline-card'}>
        <div>
          <span>{arc.tag}</span>
          <h2>{arc.title}</h2>
        </div>
        <p>{arc.body}</p>
      </div>
    </article>
  )
}
