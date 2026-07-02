import { useEffect, useRef } from 'react'
import { useInmersoActive } from '../hooks/useInmersoActive'

interface TrailParticle {
  x: number
  y: number
  bornAt: number
}

const LIFETIME_MS = 600
const MAX_PARTICLES = 60

/** Estela bioluminiscente que sigue el cursor. Solo desktop, solo INMERSO. */
export default function InmersoCursorTrail() {
  const active = useInmersoActive()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!active) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const canvasEl = canvasRef.current
    if (!canvasEl) return
    const ctx2d = canvasEl.getContext('2d')
    if (!ctx2d) return

    const canvas: HTMLCanvasElement = canvasEl
    const ctx: CanvasRenderingContext2D = ctx2d
    const particles: TrailParticle[] = []
    let animId: number

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    function onMove(e: MouseEvent) {
      particles.push({ x: e.clientX, y: e.clientY, bornAt: performance.now() })
      if (particles.length > MAX_PARTICLES) particles.shift()
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const now = performance.now()

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        const age = now - p.bornAt
        if (age > LIFETIME_MS) {
          particles.splice(i, 1)
          continue
        }
        const t = 1 - age / LIFETIME_MS
        const radius = 2 + t * 3

        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius * 4)
        g.addColorStop(0, `rgba(110,242,168,${0.5 * t})`)
        g.addColorStop(0.4, `rgba(110,242,168,${0.2 * t})`)
        g.addColorStop(1, 'rgba(110,242,168,0)')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(p.x, p.y, radius * 4, 0, Math.PI * 2)
        ctx.fill()
      }

      animId = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
    }
  }, [active])

  if (!active) return null

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-30 hidden sm:block"
    />
  )
}
