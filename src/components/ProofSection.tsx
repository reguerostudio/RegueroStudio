import { motion } from 'framer-motion'
import MediaPlaceholder from './MediaPlaceholder'

const STATS = [
  { value: '2026', label: 'Año de fundación' },
  { value: '48h', label: 'Tiempo de respuesta' },
  { value: '1:1', label: 'Trato directo, sin intermediarios' },
]

const CLIENTS = [
  {
    n: '01',
    name: 'Motor Arjona',
    detail: 'Concesionario Toyota, Madrid.',
    work: 'Contenido, redes y presencia digital constante. Calendario editorial, cobertura de eventos y comunicación de marca semana a semana.',
  },
  {
    n: '02',
    name: 'R House Asesores',
    detail: 'Inmobiliaria, sur de Madrid.',
    work: 'Identidad visual y comunicación digital pensadas para un sector donde la confianza se construye antes de la primera llamada.',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

export default function ProofSection() {
  return (
    <section id="trabajo" className="relative w-full px-6 py-32 sm:py-40">
      <div className="mx-auto max-w-2xl">
        <motion.p
          className="font-sans text-xs uppercase tracking-[0.2em] text-[#57b8bc]/60"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          Con quién trabajo
        </motion.p>

        <motion.h2
          className="mt-6 font-sans text-3xl font-light leading-[1.2] text-[#dde8e9] sm:text-4xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          Construyo en público.
          <br />
          Esto es lo real, ahora mismo.
        </motion.h2>

        <motion.div
          className="mt-12 grid grid-cols-3 gap-6 border-y border-white/10 py-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        >
          {STATS.map((stat) => (
            <div key={stat.label}>
              <p className="font-serif text-2xl italic text-[#9fe0e5] sm:text-3xl">{stat.value}</p>
              <p className="mt-1 font-sans text-xs leading-snug text-[#dde8e9]/50">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        <div className="mt-14 flex flex-col gap-10">
          {CLIENTS.map((client, i) => (
            <motion.div
              key={client.n}
              className="flex flex-col gap-6 border-t border-white/10 pt-6 sm:flex-row"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={fadeUp}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
            >
              <span className="font-mono text-sm text-[#9fe0e5]">{client.n}</span>
              <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
                <div className="flex-1">
                  <p className="font-sans text-lg text-[#dde8e9]">{client.name}</p>
                  <p className="mt-1 font-sans text-sm text-[#dde8e9]/50">{client.detail}</p>
                  <p className="mt-2 font-sans text-base leading-relaxed text-[#dde8e9]/70">{client.work}</p>
                </div>
                <MediaPlaceholder
                  label={`Proyecto ${client.name}`}
                  kind="imagen"
                  aspectRatio="landscape"
                  variant="surface"
                  className="w-full sm:w-40 sm:flex-none"
                />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 border-l border-[#57b8bc]/30 pl-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-serif text-xl italic text-[#9fe0e5] sm:text-2xl">
            No necesito cien logos en un grid para demostrar que sé lo que hago.
            <br />
            Necesito que veas cómo trabajo con los que ya confían en mí.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
