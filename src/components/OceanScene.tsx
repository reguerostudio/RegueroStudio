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
    <div ref={containerRef} className="grid">
      {/* Fondo fijo: canvas + scan line + HUD, pinned durante todo el descenso */}
      <div
        className="hero-zoom sticky top-0 z-0 h-[100dvh] w-full overflow-hidden"
        style={{ gridArea: '1 / 1' }}
      >
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
        <OceanHUD scrollProg={scrollProg} depthMeters={depthMeters} />
      </div>

      {/* Contenido: se desplaza por encima del fondo fijo, en la misma celda de grid */}
      <div className="relative z-10" style={{ gridArea: '1 / 1' }}>
        {children(scrollProg)}
      </div>
    </div>
  )
}
