import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer
      className="relative w-full px-6 py-16 sm:px-10"
      style={{ backgroundColor: '#050308' }}
    >
      {/* violet wash sutil */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 60% 80% at 50% 100%, rgba(44,31,168,0.12) 0%, rgba(5,3,8,0) 70%)',
        }}
      />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center gap-10 text-center sm:flex-row sm:items-start sm:justify-between sm:text-left">

        {/* Columna izquierda: identidad */}
        <div>
          <p className="font-sans text-sm" style={{ color: 'rgba(237,234,245,0.55)' }}>
            Fernando Reguero Gallego
          </p>
          <p className="mt-1 font-sans text-xs" style={{ color: 'rgba(237,234,245,0.28)' }}>
            © 2026 · Madrid
          </p>
          <p className="mt-4 max-w-xs font-serif text-sm italic" style={{ color: 'rgba(237,234,245,0.22)' }}>
            El diseño bueno no se nota. Se siente. Y se compra.
          </p>
        </div>

        {/* Columna derecha: redes + legal */}
        <div className="flex flex-col items-center gap-5 sm:items-end">
          <div className="flex items-center gap-6">
            <a
              href="https://www.instagram.com/fernandoreguero"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.2em] transition-all duration-200"
              style={{ color: 'rgba(237,234,245,0.4)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#6EF2A8'
                e.currentTarget.style.textShadow = '0 0 10px rgba(110,242,168,0.4)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(237,234,245,0.4)'
                e.currentTarget.style.textShadow = 'none'
              }}
            >
              <span>IG</span>
              <span>@fernandoreguero</span>
            </a>
            <div className="h-3 w-px" style={{ backgroundColor: 'rgba(237,234,245,0.08)' }} />
            <a
              href="https://www.tiktok.com/@mellamofeerr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.2em] transition-all duration-200"
              style={{ color: 'rgba(237,234,245,0.4)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#6EF2A8'
                e.currentTarget.style.textShadow = '0 0 10px rgba(110,242,168,0.4)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(237,234,245,0.4)'
                e.currentTarget.style.textShadow = 'none'
              }}
            >
              <span>TK</span>
              <span>@mellamofeerr</span>
            </a>
          </div>

          <Link
            to="/privacidad"
            className="font-sans text-xs underline transition-all duration-200"
            style={{ color: 'rgba(237,234,245,0.28)' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#6EF2A8' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(237,234,245,0.28)' }}
          >
            Política de privacidad
          </Link>

          <p
            className="font-sans text-[10px] uppercase tracking-[0.2em]"
            style={{ color: 'rgba(237,234,245,0.18)' }}
          >
            Construida con IA. El criterio, siempre mío.
          </p>
        </div>
      </div>
    </footer>
  )
}
