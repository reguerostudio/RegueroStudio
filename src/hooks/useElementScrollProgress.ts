import { useEffect, useRef, useState, type RefObject } from 'react'

/** Progreso de scroll de un elemento concreto atravesando el viewport: 0 al
 * empezar a entrar por abajo, 1 al terminar de salir por arriba. */
export function useElementScrollProgress(ref: RefObject<HTMLElement | null>): number {
  const [progress, setProgress] = useState(0)
  const frame = useRef<number | null>(null)

  useEffect(() => {
    function compute() {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const total = rect.height + window.innerHeight
      const scrolled = window.innerHeight - rect.top
      setProgress(Math.min(1, Math.max(0, scrolled / total)))
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
  }, [ref])

  return progress
}
