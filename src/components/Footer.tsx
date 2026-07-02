import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer
      className="relative w-full px-6 py-14 text-center"
      style={{ backgroundColor: '#070a0d' }}
    >
      {/* Redes */}
      <div className="flex items-center justify-center gap-8">
        <a
          href="https://www.instagram.com/fernandoreguero"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.2em] transition-colors"
          style={{ color: 'rgba(221,232,233,0.45)' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#57b8bc')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(221,232,233,0.45)')}
        >
          <span>IG</span>
          <span>@fernandoreguero</span>
        </a>
        <div className="h-3 w-px" style={{ backgroundColor: 'rgba(221,232,233,0.1)' }} />
        <a
          href="https://www.tiktok.com/@mellamofeerr"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.2em] transition-colors"
          style={{ color: 'rgba(221,232,233,0.45)' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#57b8bc')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(221,232,233,0.45)')}
        >
          <span>TK</span>
          <span>@mellamofeerr</span>
        </a>
      </div>

      <div className="mx-auto mt-8 h-px w-12" style={{ backgroundColor: 'rgba(221,232,233,0.08)' }} />

      <p className="mt-8 font-sans text-xs text-[#dde8e9]/40">
        Fernando Reguero Gallego · © 2026
      </p>
      <p className="mt-2 font-serif text-sm italic text-[#dde8e9]/25">
        El diseño bueno no se nota. Se siente. Y se compra.
      </p>

      {/* Crédito IA */}
      <p
        className="mt-6 font-sans text-[10px] uppercase tracking-[0.2em]"
        style={{ color: 'rgba(221,232,233,0.2)' }}
      >
        Construida con IA. El criterio, siempre mío.
      </p>

      <Link
        to="/privacidad"
        className="mt-5 inline-block font-sans text-xs text-[#dde8e9]/25 underline transition-colors hover:text-[#57b8bc]"
      >
        Política de privacidad
      </Link>
    </footer>
  )
}
