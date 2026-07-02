import { ImageIcon, Play } from 'lucide-react'
import { INMERSO, SURFACE, withAlpha } from '../lib/theme'

interface MediaPlaceholderProps {
  label: string
  kind?: 'imagen' | 'video'
  aspectRatio?: 'square' | 'portrait' | 'landscape'
  variant?: 'surface' | 'inmerso'
  src?: string
  className?: string
}

/**
 * Hueco reservado para foto/vídeo real. Se sube contenido más adelante
 * sustituyendo `src` — hasta entonces queda visible como placeholder de marca.
 */
export default function MediaPlaceholder({
  label,
  kind = 'imagen',
  aspectRatio = 'square',
  variant = 'surface',
  src,
  className = '',
}: MediaPlaceholderProps) {
  const aspectClass =
    aspectRatio === 'portrait' ? 'aspect-[3/4]' :
    aspectRatio === 'landscape' ? 'aspect-video' :
    'aspect-square'

  const isInmerso = variant === 'inmerso'
  const borderColor = isInmerso ? withAlpha(INMERSO.violet, 0.5) : withAlpha(SURFACE.turquoise, 0.25)
  const bgColor = isInmerso ? '#0d0a1a' : 'rgba(255,255,255,0.02)'
  const iconColor = isInmerso ? withAlpha(INMERSO.violet, 0.6) : withAlpha(SURFACE.turquoise, 0.5)
  const textColor = isInmerso ? withAlpha(INMERSO.text, 0.3) : withAlpha(SURFACE.textLight, 0.3)

  if (src) {
    return (
      <div className={`relative overflow-hidden ${aspectClass} ${className}`} style={{ borderRadius: '4px' }}>
        <img src={src} alt={label} className="h-full w-full object-cover" />
      </div>
    )
  }

  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 ${aspectClass} ${className}`}
      style={{ backgroundColor: bgColor, border: `1px solid ${borderColor}`, borderRadius: '4px' }}
    >
      {kind === 'video' ? <Play size={24} style={{ color: iconColor }} /> : <ImageIcon size={22} style={{ color: iconColor }} />}
      <p className="px-4 text-center font-sans text-[10px] uppercase tracking-[0.2em]" style={{ color: textColor }}>
        {label}
      </p>
    </div>
  )
}
