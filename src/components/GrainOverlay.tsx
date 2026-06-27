import { useEffect, useRef } from 'react'

const SCALE = 3 // resolución reducida + pixelated = grano grueso, visible

export default function GrainOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvasEl = canvasRef.current
    if (!canvasEl) return
    const ctx2d = canvasEl.getContext('2d')
    if (!ctx2d) return
    const canvas: HTMLCanvasElement = canvasEl
    const ctx: CanvasRenderingContext2D = ctx2d

    let w = 0
    let h = 0

    function resize() {
      w = Math.ceil(window.innerWidth / SCALE)
      h = Math.ceil(window.innerHeight / SCALE)
      canvas.width = w
      canvas.height = h
    }
    resize()
    window.addEventListener('resize', resize)

    let raf = 0
    let running = true
    let frameCount = 0

    function draw() {
      if (!running) return
      frameCount++
      if (frameCount % 2 === 0) {
        const imageData = ctx.createImageData(w, h)
        const data = imageData.data
        for (let i = 0; i < data.length; i += 4) {
          const v = Math.random() * 255
          data[i] = v
          data[i + 1] = v
          data[i + 2] = v
          data[i + 3] = 255
        }
        ctx.putImageData(imageData, 0, 0)
      }
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-[5] h-full w-full opacity-[0.04] mix-blend-overlay"
      style={{ imageRendering: 'pixelated' }}
      aria-hidden="true"
    />
  )
}
