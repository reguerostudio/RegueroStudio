import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer
      className="relative w-full px-6 py-10 text-center"
      style={{ backgroundColor: '#070a0d' }}
    >
      <p className="font-sans text-xs text-[#dde8e9]/40">
        Fernando Reguero Gallego · © 2026
      </p>
      <p className="mt-2 font-serif text-sm italic text-[#dde8e9]/30">
        El diseño bueno no se nota. Se siente. Y se compra.
      </p>
      <Link
        to="/privacidad"
        className="mt-4 inline-block font-sans text-xs text-[#dde8e9]/30 underline transition-colors hover:text-[#57b8bc]"
      >
        Política de privacidad
      </Link>
    </footer>
  )
}
