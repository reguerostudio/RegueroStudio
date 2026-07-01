import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  pulse: number
  pulseSpeed: number
}

const N_PARTICLES = 32

function rand(a: number, b: number) {
  return a + Math.random() * (b - a)
}

export default function BioCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvasEl = canvasRef.current
    if (!canvasEl) return
    const ctx2d = canvasEl.getContext('2d')
    if (!ctx2d) return

    const canvas: HTMLCanvasElement = canvasEl
    const ctx: CanvasRenderingContext2D = ctx2d

    let animId: number
    let W = 0
    let H = 0
    const particles: Particle[] = []

    function init() {
      W = canvas.offsetWidth
      H = canvas.offsetHeight
      canvas.width = W
      canvas.height = H
      particles.length = 0
      for (let i = 0; i < N_PARTICLES; i++) {
        particles.push({
          x: rand(0, W),
          y: rand(0, H),
          vx: rand(-0.1, 0.1),
          vy: rand(-0.3, -0.08),
          size: rand(2, 7),
          opacity: rand(0.12, 0.45),
          pulse: rand(0, Math.PI * 2),
          pulseSpeed: rand(0.004, 0.014),
        })
      }
    }

    function draw() {
      ctx.clearRect(0, 0, W, H)

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        p.pulse += p.pulseSpeed

        if (p.y < -30) {
          p.y = H + 30
          p.x = rand(0, W)
        }
        if (p.x < -30) p.x = W + 30
        if (p.x > W + 30) p.x = -30

        const pulse = Math.sin(p.pulse)
        const glowR = p.size * (5 + pulse * 2)
        const alpha = p.opacity * (0.7 + pulse * 0.3)

        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowR)
        g.addColorStop(0, `rgba(110,242,168,${alpha})`)
        g.addColorStop(0.25, `rgba(110,242,168,${alpha * 0.5})`)
        g.addColorStop(0.6, `rgba(110,242,168,${alpha * 0.1})`)
        g.addColorStop(1, 'rgba(110,242,168,0)')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(p.x, p.y, glowR, 0, Math.PI * 2)
        ctx.fill()
      }

      animId = requestAnimationFrame(draw)
    }

    init()
    draw()

    const ro = new ResizeObserver(() => init())
    ro.observe(canvas)

    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ opacity: 0.55 }}
    />
  )
}
