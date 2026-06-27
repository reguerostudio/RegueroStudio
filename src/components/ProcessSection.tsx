import { motion } from 'framer-motion'

const STEPS = [
  {
    n: 'I',
    title: 'Escucho',
    desc: 'Una llamada. Sin powerpoints, sin paripé. Solo necesito entender qué quieres construir.',
  },
  {
    n: 'II',
    title: 'Bajo',
    desc: 'Investigo tu sector, tu competencia, a quién le hablas. Dirección antes que ejecución.',
  },
  {
    n: 'III',
    title: 'Construyo',
    desc: 'Diseño con IA donde acelera y con criterio donde decide. Entrego en días, no en meses.',
  },
  {
    n: 'IV',
    title: 'Entrego',
    desc: 'Revisamos juntos, ajustamos lo que haga falta. Te quedas con algo que puedes usar ya.',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

export default function ProcessSection() {
  return (
    <section id="proceso" className="relative w-full px-6 py-32 sm:py-40">
      <div className="mx-auto max-w-2xl">
        <motion.p
          className="font-sans text-xs uppercase tracking-[0.2em] text-[#57b8bc]/60"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          Cómo trabajamos
        </motion.p>

        <motion.h2
          className="mt-6 font-sans text-3xl font-light leading-[1.2] text-[#dde8e9] sm:text-4xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          Cuatro pasos. Sin vueltas.
        </motion.h2>

        <div className="mt-16 flex flex-col">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.n}
              className="flex gap-6 border-l pb-12 pl-8"
              style={{
                borderColor: 'rgba(87,184,188,0.25)',
                marginLeft: '8px',
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={fadeUp}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
            >
              <div className="relative -ml-[41px] flex h-8 w-8 flex-none items-center justify-center rounded-full font-serif text-sm italic text-[#0a0a0a]" style={{ backgroundColor: '#9fe0e5' }}>
                {step.n}
              </div>
              <div className="-mt-1">
                <p className="font-sans text-lg text-[#dde8e9]">{step.title}</p>
                <p className="mt-2 font-sans text-sm leading-relaxed text-[#dde8e9]/60">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
