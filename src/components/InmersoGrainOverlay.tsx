import { useEffect, useRef } from 'react'
import { useInmersoActive } from '../hooks/useInmersoActive'

const FRAME_COUNT = 4
const FRAME_INTERVAL_MS = 90
const GRAIN_ALPHA_MAX = 18 // 0-255 (~0.07 de opacidad)

/** Grano tipo film, sutil y animado. Frames de ruido precalculados y
 * ciclados por blit (putImageData), no generación de ruido por pixel
 * en cada frame — mantiene el coste bajo incluso en móvil. */
export default function InmersoGrainOverlay() {
  const active = useInmersoActive()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!active) return
    const canvasEl = canvasRef.current
    if (!canvasEl) return
    const ctx2d = canvasEl.getContext('2d')
    if (!ctx2d) return

    const canvas: HTMLCanvasElement = canvasEl
    const ctx: CanvasRenderingContext2D = ctx2d
    const isMobile = window.innerWidth < 640
    const downscale = isMobile ? 3 : 2

    let frames: ImageData[] = []
    let frameIdx = 0
    let intervalId: number

    function buildFrames() {
      const w = Math.ceil(window.innerWidth / downscale)
      const h = Math.ceil(window.innerHeight / downscale)
      canvas.width = w
      canvas.height = h
      frames = []
      for (let f = 0; f < FRAME_COUNT; f++) {
        const imgData = ctx.createImageData(w, h)
        const data = imgData.data
        for (let p = 0; p < data.length; p += 4) {
          const v = Math.random() * 255
          data[p] = v
          data[p + 1] = v
          data[p + 2] = v
          data[p + 3] = Math.random() * GRAIN_ALPHA_MAX
        }
        frames.push(imgData)
      }
    }

    function tick() {
      ctx.putImageData(frames[frameIdx], 0, 0)
      frameIdx = (frameIdx + 1) % FRAME_COUNT
    }

    buildFrames()
    tick()
    intervalId = window.setInterval(tick, FRAME_INTERVAL_MS)

    function onResize() {
      buildFrames()
    }
    window.addEventListener('resize', onResize)

    return () => {
      window.clearInterval(intervalId)
      window.removeEventListener('resize', onResize)
    }
  }, [active])

  if (!active) return null

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[25]"
      style={{ width: '100vw', height: '100vh', mixBlendMode: 'overlay' }}
    />
  )
}
