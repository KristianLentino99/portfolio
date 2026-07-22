export interface TickerProps {
  items: string[]
  /** Separator rendered between items. Default: "◆" */
  separator?: string
  /** Speed in seconds for one full cycle. Default: 30 */
  speed?: number
  className?: string
}

export default function Ticker({
  items,
  separator = '◆',
  speed = 30,
  className = '',
}: TickerProps) {
  const doubled = [
    ...items.map((item) => ({ item, key: `first-${item}` })),
    ...items.map((item) => ({ item, key: `second-${item}` })),
  ]

  return (
    <div className={`ticker ${className}`.trim()} aria-hidden="true">
      <div style={{ animationDuration: `${speed}s` }}>
        {doubled.map(({ item, key }, index) => (
          <span key={key}>
            {item}
            {index < doubled.length - 1 ? ` ${separator} ` : null}
          </span>
        ))}
      </div>
    </div>
  )
}
