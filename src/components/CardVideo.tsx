import { Play } from 'lucide-react'
import InmersoMark from './InmersoMark'
import { pickMicrocopy, formatSighting } from '../lib/microcopy'

interface CardVideoProps {
  title: string
  tag?: string
  src?: string        // URL del vídeo cuando esté disponible
  thumb?: string      // miniatura
  aspectRatio?: 'square' | 'portrait' | 'landscape'
  sightingNumber?: number
}

export default function CardVideo({ title, tag, src, thumb, aspectRatio = 'landscape', sightingNumber }: CardVideoProps) {
  const aspectClass =
    aspectRatio === 'portrait' ? 'aspect-[3/4]' :
    aspectRatio === 'square'   ? 'aspect-square'  :
                                  'aspect-video'

  const isEmpty = !src && !thumb

  return (
    <div className="group relative mb-4 overflow-hidden" style={{ borderRadius: '4px' }}>
      {/* contenedor de imagen/vídeo */}
      <div className={`relative w-full ${aspectClass} overflow-hidden`}>
        {thumb ? (
          <img
            src={thumb}
            alt={title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          /* placeholder */
          <div
            className="relative flex h-full w-full items-center justify-center overflow-hidden"
            style={{
              backgroundColor: '#0d0a1a',
              border: '1px solid rgba(44,31,168,0.5)',
            }}
          >
            <InmersoMark
              size={64}
              opacity={0.06}
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            />
            <div className="relative text-center">
              <Play size={28} style={{ color: 'rgba(44,31,168,0.6)', margin: '0 auto' }} />
              <p
                className="mt-3 max-w-[160px] px-2 text-center font-sans text-xs leading-snug"
                style={{ color: 'rgba(237,234,245,0.5)' }}
              >
                {pickMicrocopy(title)}
              </p>
            </div>
          </div>
        )}

        {/* overlay hover con play */}
        {!isEmpty && (
          <div
            className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ backgroundColor: 'rgba(5,3,8,0.55)' }}
          >
            <div
              className="flex h-14 w-14 items-center justify-center rounded-full"
              style={{ backgroundColor: 'rgba(110,242,168,0.15)', border: '1px solid rgba(110,242,168,0.4)' }}
            >
              <Play size={20} style={{ color: '#6EF2A8', marginLeft: '2px' }} />
            </div>
          </div>
        )}
      </div>

      {/* meta */}
      <div className="px-1 pt-3 pb-1">
        <div className="flex items-center justify-between gap-2">
          {tag && (
            <p className="font-sans text-[10px] uppercase tracking-[0.2em]" style={{ color: 'rgba(110,242,168,0.55)' }}>
              {tag}
            </p>
          )}
          {sightingNumber !== undefined && (
            <p className="font-mono text-[10px]" style={{ color: 'rgba(237,234,245,0.35)' }}>
              {formatSighting(sightingNumber)}
            </p>
          )}
        </div>
        <p className="mt-1 font-sans text-sm" style={{ color: isEmpty ? 'rgba(237,234,245,0.5)' : '#EDEAF5' }}>
          {title}
        </p>
      </div>
    </div>
  )
}
