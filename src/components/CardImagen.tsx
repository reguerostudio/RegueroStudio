import { ImageIcon } from 'lucide-react'
import InmersoMark from './InmersoMark'
import { pickMicrocopy, formatSighting } from '../lib/microcopy'

interface CardImagenProps {
  title: string
  tag?: string
  src?: string
  aspectRatio?: 'square' | 'portrait' | 'landscape'
  sightingNumber?: number
}

export default function CardImagen({ title, tag, src, aspectRatio = 'square', sightingNumber }: CardImagenProps) {
  const aspectClass =
    aspectRatio === 'portrait'  ? 'aspect-[3/4]' :
    aspectRatio === 'landscape' ? 'aspect-video'  :
                                   'aspect-square'

  const isEmpty = !src

  return (
    <div className="group relative mb-4 overflow-hidden" style={{ borderRadius: '4px' }}>
      <div className={`relative w-full ${aspectClass} overflow-hidden`}>
        {src ? (
          <img
            src={src}
            alt={title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
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
              <ImageIcon size={26} style={{ color: 'rgba(44,31,168,0.6)', margin: '0 auto' }} />
              <p
                className="mt-3 max-w-[160px] px-2 text-center font-sans text-xs leading-snug"
                style={{ color: 'rgba(237,234,245,0.5)' }}
              >
                {pickMicrocopy(title)}
              </p>
            </div>
          </div>
        )}

        {!isEmpty && (
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: 'linear-gradient(to top, rgba(5,3,8,0.7) 0%, rgba(5,3,8,0) 60%)',
            }}
          />
        )}
      </div>

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
