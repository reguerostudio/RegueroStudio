import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer
      className="relative w-full px-6 py-14 text-center"
      style={{ backgroundColor: '#050308' }}
    >
      {/* violet wash sutil */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 60% 80% at 50% 100%, rgba(44,31,168,0.12) 0%, rgba(5,3,8,0) 70%)',
        }}
      />

      <div className="relative z-10">
        {/* Redes */}
        <div className="flex items-center justify-center gap-8">
          <a
            href="https://www.instagram.com/fernandoreguero"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.2em] transition-all duration-200"
            style={{ color: 'rgba(237,234,245,0.35)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#6EF2A8'
              e.currentTarget.style.textShadow = '0 0 10px rgba(110,242,168,0.4)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'rgba(237,234,245,0.35)'
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
            style={{ color: 'rgba(237,234,245,0.35)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#6EF2A8'
              e.currentTarget.style.textShadow = '0 0 10px rgba(110,242,168,0.4)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'rgba(237,234,245,0.35)'
              e.currentTarget.style.textShadow = 'none'
            }}
          >
            <span>TK</span>
            <span>@mellamofeerr</span>
          </a>
        </div>

        <div className="mx-auto mt-8 h-px w-12" style={{ backgroundColor: 'rgba(237,234,245,0.06)' }} />

        <p className="mt-8 font-sans text-xs" style={{ color: 'rgba(237,234,245,0.3)' }}>
          Fernando Reguero Gallego · © 2026
        </p>
        <p className="mt-2 font-serif text-sm italic" style={{ color: 'rgba(237,234,245,0.18)' }}>
          El diseño bueno no se nota. Se siente. Y se compra.
        </p>

        <p
          className="mt-6 font-sans text-[10px] uppercase tracking-[0.2em]"
          style={{ color: 'rgba(237,234,245,0.15)' }}
        >
          Construida con IA. El criterio, siempre mío.
        </p>

        <Link
          to="/privacidad"
          className="mt-5 inline-block font-sans text-xs underline transition-all duration-200"
          style={{ color: 'rgba(237,234,245,0.2)' }}
          onMouseEnter={(e) => { e.currentTarget.style.color = '#6EF2A8' }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(237,234,245,0.2)' }}
        >
          Política de privacidad
        </Link>
      </div>
    </footer>
  )
}
