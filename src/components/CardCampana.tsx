import { Layers } from 'lucide-react'

interface CardCampanaProps {
  title: string
  client?: string
  tag?: string
  description?: string
  assets?: string[]   // URLs de imágenes del proyecto
}

export default function CardCampana({ title, client, tag, description, assets }: CardCampanaProps) {
  const isEmpty = !assets || assets.length === 0

  return (
    <div className="mb-4 overflow-hidden" style={{ borderRadius: '4px' }}>
      {isEmpty ? (
        /* placeholder con borde punteado */
        <div
          className="flex min-h-[220px] flex-col items-center justify-center p-8 text-center"
          style={{
            border: '1.5px dashed rgba(44,31,168,0.45)',
            backgroundColor: 'rgba(44,31,168,0.04)',
          }}
        >
          <Layers size={24} style={{ color: 'rgba(44,31,168,0.5)' }} />
          <p className="mt-3 font-sans text-sm" style={{ color: 'rgba(237,234,245,0.35)' }}>
            {title}
          </p>
          {client && (
            <p className="mt-1 font-sans text-xs" style={{ color: 'rgba(237,234,245,0.2)' }}>
              {client}
            </p>
          )}
          <p
            className="mt-4 font-sans text-[10px] uppercase tracking-[0.2em]"
            style={{ color: 'rgba(110,242,168,0.35)' }}
          >
            próximamente
          </p>
        </div>
      ) : (
        /* contenido real: grid de assets */
        <div>
          <div
            className={`grid gap-1 ${assets.length === 1 ? 'grid-cols-1' : assets.length === 2 ? 'grid-cols-2' : 'grid-cols-2'}`}
          >
            {assets.slice(0, 4).map((src, i) => (
              <div
                key={i}
                className={`relative overflow-hidden ${assets.length >= 3 && i === 0 ? 'col-span-2' : ''}`}
                style={{ aspectRatio: assets.length >= 3 && i === 0 ? '16/7' : '1/1' }}
              >
                <img src={src} alt={`${title} ${i + 1}`} className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* meta siempre visible */}
      <div className="px-1 pt-3 pb-1">
        {tag && (
          <p className="font-sans text-[10px] uppercase tracking-[0.2em]" style={{ color: 'rgba(110,242,168,0.55)' }}>
            {tag}
          </p>
        )}
        <p className="mt-1 font-sans text-sm" style={{ color: isEmpty ? 'rgba(237,234,245,0.3)' : '#EDEAF5' }}>
          {title}
        </p>
        {client && (
          <p className="mt-0.5 font-sans text-xs" style={{ color: 'rgba(237,234,245,0.35)' }}>
            {client}
          </p>
        )}
        {description && (
          <p className="mt-2 font-sans text-xs leading-relaxed" style={{ color: 'rgba(237,234,245,0.4)' }}>
            {description}
          </p>
        )}
      </div>
    </div>
  )
}
