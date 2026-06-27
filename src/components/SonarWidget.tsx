import { useEffect, useRef } from 'react'

interface Ping {
  x: number
  y: number
  r: number
  op: number
}

export default function SonarWidget() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx2d = canvas.getContext('2d')
    if (!ctx2d) return
    const ctx: CanvasRenderingContext2D = ctx2d

    const size = 60
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = size * dpr
    canvas.height = size * dpr
    canvas.style.width = `${size}px`
    canvas.style.height = `${size}px`
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    const cx = size / 2
    const cy = size / 2
    const radius = size / 2 - 2
    let pings: Ping[] = []
    let raf = 0
    let running = true

    function spawnPing() {
      const angle = Math.random() * Math.PI * 2
      const dist = Math.random() * radius * 0.8
      pings.push({
        x: cx + Math.cos(angle) * dist,
        y: cy + Math.sin(angle) * dist,
        r: 1,
        op: 0.8,
      })
    }

    const pingInterval = setInterval(() => {
      if (Math.random() < 0.5) spawnPing()
    }, 1400)

    function frame(t: number) {
      if (!running) return
      ctx.clearRect(0, 0, size, size)

      ctx.strokeStyle = 'rgba(87, 184, 188, 0.3)'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.arc(cx, cy, radius, 0, Math.PI * 2)
      ctx.stroke()

      for (let i = 1; i < 3; i++) {
        ctx.beginPath()
        ctx.arc(cx, cy, (radius / 3) * i, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(87, 184, 188, 0.12)'
        ctx.stroke()
      }

      // sweep arm
      const sweepAngle = (t * 0.001) % (Math.PI * 2)
      const sweepGrad = ctx.createConicGradient
        ? ctx.createConicGradient(sweepAngle, cx, cy)
        : null
      ctx.save()
      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.arc(cx, cy, radius, sweepAngle, sweepAngle + 0.5)
      ctx.closePath()
      if (sweepGrad) {
        sweepGrad.addColorStop(0, 'rgba(87, 184, 188, 0.35)')
        sweepGrad.addColorStop(1, 'rgba(87, 184, 188, 0)')
        ctx.fillStyle = sweepGrad
      } else {
        ctx.fillStyle = 'rgba(87, 184, 188, 0.2)'
      }
      ctx.fill()
      ctx.restore()

      ctx.strokeStyle = 'rgba(87, 184, 188, 0.6)'
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.lineTo(cx + Math.cos(sweepAngle) * radius, cy + Math.sin(sweepAngle) * radius)
      ctx.stroke()

      // pings
      pings = pings.filter((p) => p.op > 0.02)
      for (const p of pings) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(140, 225, 230, ${p.op})`
        ctx.fill()
        p.r += 0.3
        p.op -= 0.015
      }

      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      clearInterval(pingInterval)
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden="true" />
}
