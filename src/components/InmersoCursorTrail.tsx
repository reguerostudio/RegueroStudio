import { useEffect, useRef } from 'react'
import { useInmersoActive } from '../hooks/useInmersoActive'

interface TrailParticle {
  x: number
  y: number
  bornAt: number
}

const LIFETIME_MS = 450
const MAX_PARTICLES = 18
const MIN_SPAWN_INTERVAL_MS = 45
const MIN_SPAWN_DISTANCE = 10

/** Estela bioluminiscente sutil que sigue el cursor. Solo desktop, solo
 * INMERSO. Puntos pequeños y espaciados, no un halo denso. */
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
    let lastSpawnAt = 0
    let lastX = -1
    let lastY = -1
    let animId: number

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    function onMove(e: MouseEvent) {
      const now = performance.now()
      const dx = e.clientX - lastX
      const dy = e.clientY - lastY
      const moved = Math.hypot(dx, dy)

      if (now - lastSpawnAt < MIN_SPAWN_INTERVAL_MS || moved < MIN_SPAWN_DISTANCE) return

      lastSpawnAt = now
      lastX = e.clientX
      lastY = e.clientY

      particles.push({ x: e.clientX, y: e.clientY, bornAt: now })
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
        const radius = 1.5 + t * 1.5

        ctx.beginPath()
        ctx.fillStyle = `rgba(110,242,168,${0.35 * t})`
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2)
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
