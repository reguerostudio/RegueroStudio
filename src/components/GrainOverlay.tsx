import { useEffect, useRef } from 'react'

const IS_MOBILE = typeof window !== 'undefined' && window.innerWidth < 768
const SCALE = IS_MOBILE ? 5 : 3 // resolución reducida + pixelated = grano grueso, visible
const FRAME_COUNT = 4 // unos pocos frames pre-renderizados, se reciclan en vez de generar ruido cada vez
const UPDATE_EVERY = IS_MOBILE ? 6 : 3 // frames de animación entre cada cambio de textura

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
    let frames: ImageData[] = []

    function buildFrames() {
      frames = Array.from({ length: FRAME_COUNT }, () => {
        const imageData = ctx.createImageData(w, h)
        const data = imageData.data
        for (let i = 0; i < data.length; i += 4) {
          const v = Math.random() * 255
          data[i] = v
          data[i + 1] = v
          data[i + 2] = v
          data[i + 3] = 255
        }
        return imageData
      })
    }

    function resize() {
      w = Math.ceil(window.innerWidth / SCALE)
      h = Math.ceil(window.innerHeight / SCALE)
      canvas.width = w
      canvas.height = h
      buildFrames()
    }
    resize()
    window.addEventListener('resize', resize)

    let raf = 0
    let running = true
    let paused = false
    let frameCount = 0
    let frameIndex = 0

    function onVisibility() {
      paused = document.hidden
      if (!paused && running) raf = requestAnimationFrame(draw)
    }
    document.addEventListener('visibilitychange', onVisibility)

    function draw() {
      if (!running || paused) return
      frameCount++
      if (frameCount % UPDATE_EVERY === 0) {
        frameIndex = (frameIndex + 1) % frames.length
        ctx.putImageData(frames[frameIndex], 0, 0)
      }
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
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
