import { useInmersoActive } from '../hooks/useInmersoActive'
import { usePageScrollProgress } from '../hooks/usePageScrollProgress'
import { INMERSO, withAlpha } from '../lib/theme'

const MAX_DEPTH_M = 4000

/** Contador de profundidad fijo, visible solo dentro de la capa INMERSO. */
export default function InmersoDepthMeter() {
  const active = useInmersoActive()
  const progress = usePageScrollProgress()
  const depth = Math.round(progress * MAX_DEPTH_M)

  return (
    <div
      className="pointer-events-none fixed bottom-5 left-4 z-40 font-mono transition-opacity duration-500 sm:left-6"
      style={{
        fontSize: '11px',
        letterSpacing: '0.04em',
        color: withAlpha(INMERSO.bioGreen, 0.5),
        opacity: active ? 1 : 0,
      }}
    >
      -{depth}m
    </div>
  )
}
