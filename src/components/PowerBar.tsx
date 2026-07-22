export interface PowerBarProps {
  /** Value 0–100 */
  value: number
  className?: string
}

export default function PowerBar({ value, className = '' }: PowerBarProps) {
  const clamped = Math.max(0, Math.min(100, value))
  const classes = `power-bar ${className}`.trim()

  return (
    <div className={classes} role="progressbar" aria-valuenow={clamped} aria-valuemin={0} aria-valuemax={100}>
      <span style={{ width: `${clamped}%` }} />
    </div>
  )
}
