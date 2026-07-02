import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const SURFACE_LINKS = [
  { label: 'Trabajo', href: '/#trabajo' },
  { label: 'Servicios', href: '/#servicios' },
  { label: 'Proceso', href: '/#proceso' },
]

const INMERSO_LINKS = [
  { label: 'Portfolio', href: '/inmerso/portfolio' },
  { label: 'Manifiesto', href: '/#inmerso' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()
  const isInmerso = pathname.startsWith('/inmerso')

  const links = isInmerso ? INMERSO_LINKS : SURFACE_LINKS

  /* ── estilos condicionales ────────────────────────────────────────────── */
  const navBg = isInmerso
    ? 'rgba(5,3,8,0.92)'
    : 'rgba(21, 38, 54, 0.85)'

  const navBorder = isInmerso
    ? 'rgba(44,31,168,0.35)'
    : 'rgba(255,255,255,0.05)'

  const logoColor = isInmerso ? '#EDEAF5' : '#dde8e9'
  const linkColor = isInmerso ? 'rgba(237,234,245,0.6)' : 'rgba(221,232,233,0.7)'
  const linkHoverClass = isInmerso ? 'inmerso-link' : 'surface-link'

  const ctaBg = isInmerso ? '#FF9E5E' : '#57b8bc'
  const ctaText = '#0a0a0a'

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
          style={{
            backgroundColor: navBg,
            borderColor: navBorder,
            animationDelay: '0.25s',
          }}
        >
          <Link
            to="/"
            className="font-sans text-sm font-medium tracking-tight transition-colors duration-300"
            style={{ color: logoColor }}
          >
            RS
          </Link>

          <ul className="hidden items-center gap-6 font-sans text-xs uppercase tracking-wide sm:flex">
            {links.map(({ label, href }) => (
              <li key={label}>
                {href.startsWith('/') && !href.includes('#') ? (
                  <Link
                    to={href}
                    className={`transition-colors ${linkHoverClass}`}
                    style={{ color: linkColor }}
                  >
                    {label}
                  </Link>
                ) : (
                  <a
                    href={href}
                    className={`transition-colors ${linkHoverClass}`}
                    style={{ color: linkColor }}
                  >
                    {label}
                  </a>
                )}
              </li>
            ))}
          </ul>

          <Link
            to="/contacto"
            className="hidden rounded-full px-4 py-1.5 font-sans text-xs transition-opacity hover:opacity-80 sm:inline-block"
            style={{ backgroundColor: ctaBg, color: ctaText }}
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
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:hidden ${
          menuOpen ? 'h-screen opacity-100' : 'h-0 overflow-hidden opacity-0'
        }`}
        style={{
          backgroundColor: isInmerso ? 'rgba(5,3,8,0.98)' : 'rgba(1,3,11,0.98)',
        }}
      >
        {links.map(({ label, href }, i) => (
          href.startsWith('/') && !href.includes('#') ? (
            <Link
              key={label}
              to={href}
              className="font-sans text-3xl font-medium transition-all"
              style={{
                color: isInmerso ? '#EDEAF5' : '#dde8e9',
                transitionDelay: `${i * 100}ms`,
              }}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ) : (
            <a
              key={label}
              href={href}
              className="font-sans text-3xl font-medium transition-all"
              style={{
                color: isInmerso ? '#EDEAF5' : '#dde8e9',
                transitionDelay: `${i * 100}ms`,
              }}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          )
        ))}
        <Link
          to="/contacto"
          className="mt-4 rounded-full px-6 py-2 font-sans text-base"
          style={{ backgroundColor: ctaBg, color: ctaText }}
          onClick={() => setMenuOpen(false)}
        >
          Hablamos
        </Link>
      </div>
    </>
  )
}
