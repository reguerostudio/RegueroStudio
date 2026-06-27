import { useEffect, useRef } from 'react'

// Sistema completo validado — Canvas 2D · Reguero Studio Hero
// Paleta: #57b8bc (superficie) → #152636 (fondo marino)
// Orden de draw: background → caustics → partículas (3 capas parallax, sprite) → pings → viñeta
// Partículas renderizadas como sprite pre-calculado (drawImage) en vez de gradiente por partícula/frame: mucho más barato en CPU/GPU, clave para que vaya fluido en móvil.

const TOP = { r: 87, g: 184, b: 188 } // #57b8bc
const BOT = { r: 21, g: 38, b: 54 } // #152636

const MOUSE_RADIUS = 100
const IS_MOBILE = typeof window !== 'undefined' && window.innerWidth < 768

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function clamp01(v: number) {
  return Math.min(1, Math.max(0, v))
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp01((x - edge0) / (edge1 - edge0))
  return t * t * (3 - 2 * t)
}

function lerpC(c1: typeof TOP, c2: typeof BOT, t: number) {
  return {
    r: lerp(c1.r, c2.r, t),
    g: lerp(c1.g, c2.g, t),
    b: lerp(c1.b, c2.b, t),
  }
}

function rand(min: number, max: number) {
  return min + Math.random() * (max - min)
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  sz: number
  op: number
  spriteSize: number
  boost: number
}

interface ParticleLayer {
  particles: Particle[]
  parallax: number
}

const LAYER_DEFS = [
  { count: 90, sizeRange: [0.5, 1.2] as [number, number], speedMul: 0.35, parallax: 0.012, opRange: [0.05, 0.14] as [number, number] },
  { count: 140, sizeRange: [0.9, 2.0] as [number, number], speedMul: 1, parallax: 0.035, opRange: [0.1, 0.28] as [number, number] },
  { count: 40, sizeRange: [1.8, 3.4] as [number, number], speedMul: 1.7, parallax: 0.08, opRange: [0.22, 0.42] as [number, number] },
]
const MOBILE_COUNT_MUL = 0.55

function createLayer(w: number, h: number, def: (typeof LAYER_DEFS)[number]): ParticleLayer {
  const count = Math.round(def.count * (IS_MOBILE ? MOBILE_COUNT_MUL : 1))
  const particles = Array.from({ length: count }, () => {
    const sz = rand(def.sizeRange[0], def.sizeRange[1])
    return {
      x: rand(0, w),
      y: rand(0, h),
      vx: rand(-0.15, 0.15) * def.speedMul,
      vy: rand(-0.08, 0.08) * def.speedMul,
      sz,
      op: rand(def.opRange[0], def.opRange[1]),
      spriteSize: sz * rand(4, 10) * 2, // diámetro del sprite (glow incluido)
      boost: 0,
    }
  })
  return { particles, parallax: def.parallax }
}

// Sprite único: glow + núcleo + brillo central, pre-renderizado una vez a alpha=1.
// Cada partícula solo hace un drawImage con globalAlpha = su opacidad actual.
const SPRITE_RES = 128
function createParticleSprite(): HTMLCanvasElement {
  const sprite = document.createElement('canvas')
  sprite.width = SPRITE_RES
  sprite.height = SPRITE_RES
  const sctx = sprite.getContext('2d')!
  const c = SPRITE_RES / 2

  const glow = sctx.createRadialGradient(c, c, 0, c, c, c)
  glow.addColorStop(0, 'rgba(140, 225, 230, 0.5)')
  glow.addColorStop(1, 'rgba(140, 225, 230, 0)')
  sctx.fillStyle = glow
  sctx.beginPath()
  sctx.arc(c, c, c, 0, Math.PI * 2)
  sctx.fill()

  const coreR = c * 0.22
  sctx.fillStyle = 'rgba(160, 230, 235, 1)'
  sctx.beginPath()
  sctx.arc(c, c, coreR, 0, Math.PI * 2)
  sctx.fill()

  sctx.fillStyle = 'rgba(255, 255, 255, 0.65)'
  sctx.beginPath()
  sctx.arc(c, c, coreR * 0.35, 0, Math.PI * 2)
  sctx.fill()

  return sprite
}

function drawParticle(
  ctx: CanvasRenderingContext2D,
  sprite: HTMLCanvasElement,
  p: Particle,
  brightness: number,
  ox: number,
  oy: number,
) {
  const op = Math.min(1, (p.op + p.boost) * brightness)
  if (op <= 0.005) return
  const x = p.x + ox
  const y = p.y + oy
  const s = p.spriteSize
  ctx.globalAlpha = op
  ctx.drawImage(sprite, x - s / 2, y - s / 2, s, s)
  ctx.globalAlpha = 1
}

interface Ping {
  x: number
  y: number
  r: number
  op: number
}

interface HeroCanvasProps {
  scrollProg: number
}

export default function HeroCanvas({ scrollProg }: HeroCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const scrollProgRef = useRef(scrollProg)
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const parallaxRef = useRef(
    LAYER_DEFS.map(() => ({ x: 0, y: 0 })),
  )

  useEffect(() => {
    scrollProgRef.current = scrollProg
  }, [scrollProg])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx2d = canvas.getContext('2d')
    if (!ctx2d) return
    const c: HTMLCanvasElement = canvas
    const ctx: CanvasRenderingContext2D = ctx2d

    const dpr = Math.min(window.devicePixelRatio || 1, IS_MOBILE ? 1.5 : 2)
    let w = 0
    let h = 0

    const sprite = createParticleSprite()
    const layers = LAYER_DEFS.map((def) => createLayer(window.innerWidth, window.innerHeight, def))
    const pings: Ping[] = []

    function resize() {
      w = window.innerWidth
      h = window.innerHeight
      c.width = w * dpr
      c.height = h * dpr
      c.style.width = `${w}px`
      c.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    function onMouseMove(e: MouseEvent) {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
    }
    window.addEventListener('mousemove', onMouseMove)

    function onClick(e: MouseEvent) {
      pings.push({ x: e.clientX, y: e.clientY, r: 4, op: 0.55 })
    }
    window.addEventListener('click', onClick)

    let raf = 0
    let running = true
    let paused = false

    function onVisibility() {
      paused = document.hidden
      if (!paused && running) raf = requestAnimationFrame(frame)
    }
    document.addEventListener('visibilitychange', onVisibility)

    function frame(t: number) {
      if (!running || paused) return
      const scrollProgNow = scrollProgRef.current
      const color = lerpC(TOP, BOT, scrollProgNow)
      const brightness = 1 - scrollProgNow * 0.78
      const ascendDrift = scrollProgNow * 0.9
      const surfaceFade = 1 - smoothstep(0, 0.3, scrollProgNow)

      ctx.clearRect(0, 0, w, h)

      // background
      const bgGrad = ctx.createLinearGradient(0, 0, 0, h)
      bgGrad.addColorStop(0, `rgb(${color.r}, ${color.g}, ${color.b})`)
      bgGrad.addColorStop(1, `rgb(${color.r * 0.5}, ${color.g * 0.5}, ${color.b * 0.6})`)
      ctx.fillStyle = bgGrad
      ctx.fillRect(0, 0, w, h)

      // caustics (solo en superficie, se omiten en móvil para aligerar)
      if (!IS_MOBILE && surfaceFade > 0.01) {
        const causticAlpha = surfaceFade * 0.055
        for (let i = 0; i < 5; i++) {
          const cx = (Math.sin(t * 0.0002 + i * 1.7) * 0.5 + 0.5) * w
          const cy = (Math.cos(t * 0.00015 + i * 2.1) * 0.5 + 0.5) * h * 0.4
          const cr = 150 + i * 40
          const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, cr)
          cg.addColorStop(0, `rgba(200, 240, 245, ${causticAlpha})`)
          cg.addColorStop(1, 'rgba(200, 240, 245, 0)')
          ctx.fillStyle = cg
          ctx.beginPath()
          ctx.arc(cx, cy, cr, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // partículas (3 capas con parallax de mouse, muy sutil)
      const mouse = mouseRef.current
      const mouseNormX = w > 0 ? (mouse.x / w - 0.5) * 2 : 0
      const mouseNormY = h > 0 ? (mouse.y / h - 0.5) * 2 : 0

      layers.forEach((layer, li) => {
        const targetOx = -mouseNormX * layer.parallax * 60
        const targetOy = -mouseNormY * layer.parallax * 60
        const smoothed = parallaxRef.current[li]
        smoothed.x += (targetOx - smoothed.x) * 0.04
        smoothed.y += (targetOy - smoothed.y) * 0.04
        const ox = smoothed.x
        const oy = smoothed.y
        for (const p of layer.particles) {
          p.x += p.vx
          p.y += p.vy - ascendDrift
          if (p.x < -50) p.x = w + 50
          if (p.x > w + 50) p.x = -50
          if (p.y < -50) p.y = h + 50
          if (p.y > h + 50) p.y = -50

          if (!IS_MOBILE) {
            const dx = p.x + ox - mouse.x
            const dy = p.y + oy - mouse.y
            const dist = Math.sqrt(dx * dx + dy * dy)
            const targetBoost = dist < MOUSE_RADIUS ? (1 - dist / MOUSE_RADIUS) * 0.45 : 0
            p.boost += (targetBoost - p.boost) * 0.08
          }

          drawParticle(ctx, sprite, p, brightness, ox, oy)
        }
      })

      // sonar pings (click)
      for (let i = pings.length - 1; i >= 0; i--) {
        const ping = pings[i]
        ctx.beginPath()
        ctx.arc(ping.x, ping.y, ping.r, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(159, 224, 229, ${ping.op})`
        ctx.lineWidth = 1.5
        ctx.stroke()
        ping.r += 2.4
        ping.op -= 0.012
        if (ping.op <= 0) pings.splice(i, 1)
      }

      // viñeta
      const vignetteOp = 0.48 + scrollProgNow * 0.42
      const vg = ctx.createRadialGradient(w / 2, h / 2, h * 0.3, w / 2, h / 2, h * 0.9)
      vg.addColorStop(0, 'rgba(0,0,0,0)')
      vg.addColorStop(1, `rgba(0,0,0,${vignetteOp})`)
      ctx.fillStyle = vg
      ctx.fillRect(0, 0, w, h)

      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('click', onClick)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 h-full w-full"
      aria-hidden="true"
    />
  )
}
