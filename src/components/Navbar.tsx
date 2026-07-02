import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'

const INMERSO_LINKS = [
  { label: 'Portfolio', href: '/inmerso/portfolio' },
  { label: 'Manifiesto', href: '/#inmerso' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [workOpen, setWorkOpen] = useState(false)
  const { pathname } = useLocation()
  const isInmerso = pathname.startsWith('/inmerso')

  const navBg    = isInmerso ? 'rgba(5,3,8,0.92)'        : 'rgba(21,38,54,0.85)'
  const navBorder= isInmerso ? 'rgba(44,31,168,0.35)'    : 'rgba(255,255,255,0.05)'
  const logoColor= isInmerso ? '#EDEAF5'                  : '#dde8e9'
  const linkColor= isInmerso ? 'rgba(237,234,245,0.6)'   : 'rgba(221,232,233,0.7)'
  const ctaBg    = isInmerso ? '#FF9E5E'                  : '#57b8bc'

  return (
    <>
      <style>{`
        .surface-link:hover { color: #57b8bc; }
        .inmerso-link { transition: color 0.2s, text-shadow 0.2s; }
        .inmerso-link:hover {
          color: #6EF2A8;
          text-shadow: 0 0 12px rgba(110,242,168,0.55), 0 0 24px rgba(110,242,168,0.2);
        }
      `}</style>

      <div className="fixed left-1/2 top-6 z-50 w-fit -translate-x-1/2">
        <nav
          className="hero-anim hero-fade flex items-center gap-6 rounded-full border px-6 py-3 backdrop-blur-md transition-colors duration-500"
          style={{ backgroundColor: navBg, borderColor: navBorder, animationDelay: '0.25s' }}
        >
          <Link
            to="/"
            className="font-sans text-sm font-medium tracking-tight transition-colors duration-300"
            style={{ color: logoColor }}
          >
            RS
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-6 font-sans text-xs uppercase tracking-wide sm:flex">
            {isInmerso ? (
              /* INMERSO mode: links directos */
              INMERSO_LINKS.map(({ label, href }) => (
                <li key={label}>
                  {href.startsWith('/') && !href.includes('#') ? (
                    <Link to={href} className="inmerso-link transition-colors" style={{ color: linkColor }}>
                      {label}
                    </Link>
                  ) : (
                    <a href={href} className="inmerso-link transition-colors" style={{ color: linkColor }}>
                      {label}
                    </a>
                  )}
                </li>
              ))
            ) : (
              /* Surface mode: Trabajo con dropdown, resto normal */
              <>
                {/* Trabajo con dropdown */}
                <li
                  className="relative"
                  onMouseEnter={() => setWorkOpen(true)}
                  onMouseLeave={() => setWorkOpen(false)}
                >
                  <button
                    type="button"
                    className="surface-link inline-flex items-center gap-1 uppercase tracking-wide transition-colors"
                    style={{ color: linkColor }}
                    onClick={() => { window.location.hash = 'trabajo' }}
                  >
                    Trabajo
                    <ChevronDown
                      size={10}
                      className="transition-transform duration-200"
                      style={{ transform: workOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    />
                  </button>

                  {/* Dropdown submenu */}
                  <div
                    className="absolute left-1/2 top-full -translate-x-1/2 pt-3 transition-all duration-200"
                    style={{
                      opacity: workOpen ? 1 : 0,
                      pointerEvents: workOpen ? 'auto' : 'none',
                      transform: `translateX(-50%) translateY(${workOpen ? '0px' : '-6px'})`,
                    }}
                  >
                    <div
                      className="rounded-xl border px-1 py-1 backdrop-blur-md"
                      style={{
                        backgroundColor: 'rgba(21,38,54,0.97)',
                        borderColor: 'rgba(255,255,255,0.06)',
                        minWidth: '148px',
                        boxShadow: '0 12px 32px rgba(0,0,0,0.4)',
                      }}
                    >
                      <Link
                        to="/inmerso/portfolio"
                        className="flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-white/5"
                        style={{ color: '#dde8e9' }}
                        onClick={() => setWorkOpen(false)}
                      >
                        <span className="font-sans text-xs uppercase tracking-wide">Portfolio</span>
                        <span
                          className="rounded px-1.5 py-0.5 font-sans text-[9px] uppercase tracking-wider"
                          style={{ backgroundColor: 'rgba(44,31,168,0.4)', color: 'rgba(110,242,168,0.8)' }}
                        >
                          INMERSO
                        </span>
                      </Link>
                    </div>
                  </div>
                </li>

                <li>
                  <a href="/#servicios" className="surface-link transition-colors" style={{ color: linkColor }}>
                    Servicios
                  </a>
                </li>
                <li>
                  <a href="/#proceso" className="surface-link transition-colors" style={{ color: linkColor }}>
                    Proceso
                  </a>
                </li>
              </>
            )}
          </ul>

          <Link
            to="/contacto"
            className="hidden rounded-full px-4 py-1.5 font-sans text-xs transition-opacity hover:opacity-80 sm:inline-block"
            style={{ backgroundColor: ctaBg, color: '#0a0a0a' }}
          >
            Hablamos
          </Link>

          <button
            type="button"
            className="sm:hidden transition-colors duration-300"
            style={{ color: logoColor }}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Abrir menú"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </div>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-7 backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:hidden ${
          menuOpen ? 'h-screen opacity-100' : 'h-0 overflow-hidden opacity-0'
        }`}
        style={{ backgroundColor: isInmerso ? 'rgba(5,3,8,0.98)' : 'rgba(1,3,11,0.98)' }}
      >
        {isInmerso ? (
          INMERSO_LINKS.map(({ label, href }, i) =>
            href.startsWith('/') && !href.includes('#') ? (
              <Link key={label} to={href} className="font-sans text-3xl font-medium"
                style={{ color: '#EDEAF5', transitionDelay: `${i * 100}ms` }}
                onClick={() => setMenuOpen(false)}>
                {label}
              </Link>
            ) : (
              <a key={label} href={href} className="font-sans text-3xl font-medium"
                style={{ color: '#EDEAF5', transitionDelay: `${i * 100}ms` }}
                onClick={() => setMenuOpen(false)}>
                {label}
              </a>
            )
          )
        ) : (
          <>
            <a href="/#trabajo" className="font-sans text-3xl font-medium text-[#dde8e9]"
              onClick={() => setMenuOpen(false)}>Trabajo</a>
            <Link to="/inmerso/portfolio"
              className="font-sans text-base text-[#dde8e9]/50"
              onClick={() => setMenuOpen(false)}>
              └ Portfolio
            </Link>
            <a href="/#servicios" className="font-sans text-3xl font-medium text-[#dde8e9]"
              onClick={() => setMenuOpen(false)}>Servicios</a>
            <a href="/#proceso" className="font-sans text-3xl font-medium text-[#dde8e9]"
              onClick={() => setMenuOpen(false)}>Proceso</a>
          </>
        )}
        <Link
          to="/contacto"
          className="mt-4 rounded-full px-6 py-2 font-sans text-base"
          style={{ backgroundColor: ctaBg, color: '#0a0a0a' }}
          onClick={() => setMenuOpen(false)}
        >
          Hablamos
        </Link>
      </div>
    </>
  )
}
