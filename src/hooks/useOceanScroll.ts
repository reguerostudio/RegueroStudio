import { useEffect, useRef, useState } from 'react'

const MAX_DEPTH_M = 800

export function useOceanScroll(containerRef: React.RefObject<HTMLElement | null>) {
  const [scrollProg, setScrollProg] = useState(0)
  const [depthMeters, setDepthMeters] = useState(0)
  const frame = useRef<number | null>(null)

  useEffect(() => {
    function compute() {
      const el = containerRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      const scrolled = -rect.top
      const prog = total > 0 ? Math.min(1, Math.max(0, scrolled / total)) : 0
      setScrollProg(prog)
      setDepthMeters(Math.round(prog * MAX_DEPTH_M))
    }
    function onScrollOrResize() {
      if (frame.current !== null) return
      frame.current = requestAnimationFrame(() => {
        frame.current = null
        compute()
      })
    }
    compute()
    window.addEventListener('scroll', onScrollOrResize, { passive: true })
    window.addEventListener('resize', onScrollOrResize)
    return () => {
      window.removeEventListener('scroll', onScrollOrResize)
      window.removeEventListener('resize', onScrollOrResize)
      if (frame.current !== null) cancelAnimationFrame(frame.current)
    }
  }, [containerRef])

  return { scrollProg, depthMeters }
}
