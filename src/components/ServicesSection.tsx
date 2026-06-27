import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const SERVICES = [
  {
    n: '01',
    title: 'Identidad visual',
    desc: 'Marca que se siente antes de entenderse.',
    long: 'Naming, paleta, tipografía, sistema de marca. Desde cero o desde lo que ya existe pero necesita criterio.',
  },
  {
    n: '02',
    title: 'Estrategia digital',
    desc: 'Dirección antes que ejecución ciega.',
    long: 'Por qué existes, qué dices y a quién le hablas, antes de diseñar una sola pieza.',
  },
  {
    n: '03',
    title: 'Web & Framer',
    desc: 'Código con criterio de diseño.',
    long: 'Sistemas que posicionan y convierten, con arquitectura de contenido y SEO desde el primer trazo.',
  },
  {
    n: '04',
    title: 'Contenido & Social',
    desc: 'Frecuencias que la audiencia ya escucha.',
    long: 'Calendario editorial, redes y campañas. Cada publicación tiene una razón de existir.',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
}

export default function ServicesSection() {
  return (
    <section id="servicios" className="relative w-full px-6 pb-20 pt-32 sm:pb-24 sm:pt-40" style={{ backgroundColor: '#0a1520' }}>
      <div className="mx-auto max-w-5xl">
        <motion.p
          className="font-sans text-xs uppercase tracking-[0.2em] text-[#57b8bc]/60"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          En qué puedo ayudarte
        </motion.p>

        <motion.h2
          className="mt-6 max-w-lg font-sans text-3xl font-light leading-[1.2] text-[#dde8e9] sm:text-4xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          Lo que construimos juntos.
        </motion.h2>

        <div className="mt-14 grid gap-px sm:grid-cols-2">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.n}
              className="group relative border p-8 transition-colors duration-300"
              style={{ borderColor: 'rgba(87,184,188,0.06)' }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={fadeUp}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.15 }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(87,184,188,0.25)'
                e.currentTarget.style.boxShadow = '0 0 40px rgba(87,184,188,0.08)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(87,184,188,0.06)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <span className="font-mono text-sm text-[#9fe0e5]">{service.n}</span>
              <h3 className="mt-4 font-sans text-xl text-[#dde8e9]">{service.title}</h3>
              <p className="mt-2 font-sans text-sm text-[#dde8e9]/55">{service.desc}</p>
              <p className="mt-4 font-sans text-sm leading-relaxed text-[#dde8e9]/40">{service.long}</p>
              <ArrowRight
                size={16}
                className="mt-6 text-[#57b8bc]/50 transition-transform duration-300 group-hover:translate-x-1"
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-sans text-base text-[#dde8e9]/60">¿Tu marca necesita alguno de esto?</p>
          <Link
            to="/contacto"
            className="mt-3 inline-flex items-center gap-2 font-sans text-lg text-[#9fe0e5] transition-opacity hover:opacity-75"
          >
            Hablemos sin compromiso <ArrowRight size={18} />
          </Link>
          <p className="mt-8 font-sans text-xs text-[#dde8e9]/35">
            Sin packs cerrados ni tarifas genéricas. El precio depende del alcance, lo hablamos claro en la primera llamada.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
