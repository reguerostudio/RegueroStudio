import { useRef, type ReactNode } from 'react'
import HeroCanvas from './HeroCanvas'
import OceanHUD from './OceanHUD'
import { useOceanScroll } from '../hooks/useOceanScroll'

interface OceanSceneProps {
  children: (scrollProg: number) => ReactNode
}

export default function OceanScene({ children }: OceanSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollProg, depthMeters } = useOceanScroll(containerRef)
  const scanLineOpacity = (1 - scrollProg) * 0.15

  return (
    <div ref={containerRef} className="relative">
      {/* Fondo fijo: canvas + scan line + HUD, pinned durante todo el descenso.
          Sin CSS Grid a propósito: sticky dentro de grid tiene bugs conocidos en Safari/WebKit. */}
      <div className="hero-zoom sticky top-0 z-0 h-[100dvh] w-full overflow-hidden">
        <HeroCanvas scrollProg={scrollProg} />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-[#8ce1e6]"
          style={{ opacity: scanLineOpacity, animation: 'scanline 6s linear infinite' }}
        />
        <style>{`
          @keyframes scanline {
            0% { transform: translateY(0); }
            100% { transform: translateY(100dvh); }
          }
        `}</style>
        {/* fade inferior: refuerza el contraste del HUD/texto contra las partículas, más marcado cuanto más cerca de la superficie */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-40 sm:h-48"
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0))',
            opacity: 0.5 + (1 - scrollProg) * 0.5,
          }}
        />
        <OceanHUD scrollProg={scrollProg} depthMeters={depthMeters} />
      </div>

      {/* Contenido: se solapa con el fondo gracias al margen negativo, y se desplaza por encima al hacer scroll */}
      <div className="relative z-10" style={{ marginTop: '-100dvh' }}>
        {children(scrollProg)}
      </div>
    </div>
  )
}
