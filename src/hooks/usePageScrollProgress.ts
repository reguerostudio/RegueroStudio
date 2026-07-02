import { useEffect, useRef, useState } from 'react'

/** Progreso de scroll de toda la página: 0 arriba del todo, 1 al fondo. */
export function usePageScrollProgress(): number {
  const [progress, setProgress] = useState(0)
  const frame = useRef<number | null>(null)

  useEffect(() => {
    function compute() {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0)
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
  }, [])

  return progress
}
