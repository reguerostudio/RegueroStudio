import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = ['Trabajo', 'Servicios', 'Proceso']

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <div className="fixed left-1/2 top-6 z-50 w-fit -translate-x-1/2">
        <nav
          className="hero-anim hero-fade flex items-center gap-6 rounded-full border border-white/5 px-6 py-3 backdrop-blur-md"
          style={{ backgroundColor: 'rgba(21, 38, 54, 0.85)', animationDelay: '0.25s' }}
        >
          <Link to="/" className="font-sans text-sm font-medium tracking-tight text-[#dde8e9]">
            RS
          </Link>
          <ul className="hidden items-center gap-6 font-sans text-xs uppercase tracking-wide text-[#dde8e9]/70 sm:flex">
            {NAV_LINKS.map((link) => (
              <li key={link}>
                <a href={`/#${link.toLowerCase()}`} className="transition-colors hover:text-[#57b8bc]">
                  {link}
                </a>
              </li>
            ))}
          </ul>
          <Link
            to="/contacto"
            className="hidden rounded-full bg-[#57b8bc] px-4 py-1.5 font-sans text-xs text-[#0a0a0a] transition-opacity hover:opacity-80 sm:inline-block"
          >
            Hablamos
          </Link>
          <button
            type="button"
            className="text-[#dde8e9] sm:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Abrir menú"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </div>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:hidden ${
          menuOpen ? 'h-screen opacity-100' : 'h-0 overflow-hidden opacity-0'
        }`}
        style={{ backgroundColor: 'rgba(1, 3, 11, 0.98)' }}
      >
        {NAV_LINKS.map((link, i) => (
          <a
            key={link}
            href={`/#${link.toLowerCase()}`}
            className="font-sans text-3xl font-medium text-[#dde8e9] transition-all"
            style={{ transitionDelay: `${i * 100}ms` }}
            onClick={() => setMenuOpen(false)}
          >
            {link}
          </a>
        ))}
        <Link
          to="/contacto"
          className="mt-4 rounded-full bg-white px-6 py-2 font-sans text-base text-[#0a0a0a]"
          onClick={() => setMenuOpen(false)}
        >
          Hablamos
        </Link>
      </div>
    </>
  )
}
