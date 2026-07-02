import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import BioCanvas from '../components/BioCanvas'
import Navbar from '../components/Navbar'
import SeoHead from '../components/SeoHead'

export default function NotFoundPage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-6" style={{ backgroundColor: '#050308' }}>
      <SeoHead
        title="Página no encontrada · Reguero Studio"
        description="Te has ido más profundo de lo que esperaba."
        path="/404"
        noindex
      />
      <Navbar />
      <BioCanvas />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 40%, rgba(44,31,168,0.2) 0%, rgba(5,3,8,0) 70%)',
        }}
      />

      <motion.div
        className="relative z-10 max-w-md text-center"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="font-mono text-sm" style={{ color: 'rgba(110,242,168,0.5)' }}>
          404
        </p>
        <h1 className="mt-6 font-sans text-2xl font-light leading-[1.3] sm:text-3xl" style={{ color: '#EDEAF5' }}>
          Te has ido más profundo de lo que esperaba.
        </h1>
        <p className="mt-4 font-sans text-sm leading-relaxed" style={{ color: 'rgba(237,234,245,0.5)' }}>
          Esta página no existe, o dejó de hacerlo.
        </p>
        <Link
          to="/"
          className="mt-10 inline-flex items-center gap-2 font-sans text-base font-medium transition-opacity hover:opacity-80"
          style={{ color: '#FF9E5E' }}
        >
          Volver a la superficie
        </Link>
      </motion.div>
    </main>
  )
}
