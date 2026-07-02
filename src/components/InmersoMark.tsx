interface InmersoMarkProps {
  size?: number
  color?: string
  opacity?: number
  className?: string
}

/** Isotipo INMERSO: forma de onda de audio estilizada, no literal. */
export default function InmersoMark({ size = 20, color = '#6EF2A8', opacity = 1, className = '' }: InmersoMarkProps) {
  const heights = [5, 10, 16, 22, 16, 10, 5]
  const barWidth = 2.4
  const gap = 1.6
  const totalWidth = heights.length * barWidth + (heights.length - 1) * gap
  const viewHeight = 24

  return (
    <svg
      width={size}
      height={size * (viewHeight / totalWidth)}
      viewBox={`0 0 ${totalWidth} ${viewHeight}`}
      className={className}
      style={{ opacity }}
      aria-hidden="true"
    >
      {heights.map((h, i) => (
        <rect
          key={i}
          x={i * (barWidth + gap)}
          y={(viewHeight - h) / 2}
          width={barWidth}
          height={h}
          rx={barWidth / 2}
          fill={color}
        />
      ))}
    </svg>
  )
}
