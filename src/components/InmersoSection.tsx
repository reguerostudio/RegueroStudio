import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import BioCanvas from './BioCanvas'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
}

const vp = { once: true, margin: '-80px' }
const ease = [0.16, 1, 0.3, 1] as const

const RAW_PROCESS = [
  {
    n: '—',
    title: 'La primera versión siempre está mal.',
    desc: 'No porque sea malo. Sino porque no puedo saber lo que necesitas hasta que te enseño algo incorrecto y reaccionas. Lo primero que entrego es una pregunta disfrazada de propuesta.',
  },
  {
    n: '—',
    title: 'La IA me da diez ideas en el tiempo que yo generaría una.',
    desc: 'Mi trabajo es saber cuál de las diez tiene razón. Eso no lo hace la IA. Lo hace criterio. Y el criterio no se automatiza, se entrena con fallos.',
  },
  {
    n: '—',
    title: 'La tercera revisión revela lo que querías desde el principio.',
    desc: 'No te enfades. No es fallo tuyo ni mío. Es que no sabías cómo pedirlo hasta que viste lo que no era. Ahí empieza el trabajo real.',
  },
  {
    n: '—',
    title: 'El cliente más difícil no es el más exigente.',
    desc: 'Es el que no sabe lo que quiere y no lo admite. Con ese no hay diseño que funcione. Por eso prefiero perder un cliente en la primera llamada antes de que me cueste dos semanas y mi reputación.',
  },
]

export default function InmersoSection() {
  return (
    <section
      id="inmerso"
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: '#050308' }}
    >
      <BioCanvas />

      {/* violet depth wash */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(44,31,168,0.22) 0%, rgba(5,3,8,0) 70%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-2xl px-6 py-32 sm:py-44">

        {/* label */}
        <motion.p
          className="font-sans text-[10px] uppercase tracking-[0.3em]"
          style={{ color: 'rgba(110,242,168,0.6)' }}
          initial="hidden"
          whileInView="visible"
          viewport={vp}
          variants={fadeUp}
          transition={{ duration: 0.7, ease }}
        >
          INMERSO — proceso crudo
        </motion.p>

        {/* Manifiesto */}
        <motion.h2
          className="mt-8 font-sans text-3xl font-light leading-[1.25] sm:text-4xl"
          style={{ color: '#EDEAF5' }}
          initial="hidden"
          whileInView="visible"
          viewport={vp}
          variants={fadeUp}
          transition={{ duration: 0.9, ease, delay: 0.1 }}
        >
          Llevo un año cobrando por esto.
          <br />
          <span className="font-serif italic" style={{ color: '#9FE0E5' }}>
            Eso no es logro. Es punto de partida.
          </span>
        </motion.h2>

        <div className="mt-12 flex flex-col gap-6">
          {[
            'Un cliente en serio. Uno en proceso. Y esta web que construí yo mismo. Eso es todo lo que hay. Sin inflar, sin ocultar.',
            'Lo que sí tengo: criterio que no me dejaron enseñar en ningún sitio porque todavía no termino el bachillerato. Lo aprendí en horas, en fallos, en conversaciones con gente que sabe más que yo.',
            'La mayoría de mis reuniones terminan con "te escribo en unos días". No escriben. Aprendes a distinguir interés real de educación antes de que te haga daño.',
            'He entregado trabajo que me gustaba mucho y que el cliente no entendió. He entregado trabajo que no me convencía y que al cliente le encantó. Eso te hace más humilde que cualquier crítica.',
            'Diseñar es fácil. Saber qué diseñar, cuándo parar y por qué — eso no te lo enseña ningún curso de Domestika.',
          ].map((text, i) => (
            <motion.p
              key={i}
              className="font-sans text-base leading-relaxed sm:text-lg"
              style={{ color: 'rgba(237,234,245,0.65)' }}
              initial="hidden"
              whileInView="visible"
              viewport={vp}
              variants={fadeUp}
              transition={{ duration: 0.7, ease, delay: i * 0.06 }}
            >
              {text}
            </motion.p>
          ))}
        </div>

        {/* divider con glow verde */}
        <motion.div
          className="my-20 flex items-center gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={vp}
          variants={fadeUp}
          transition={{ duration: 0.8, ease }}
        >
          <div className="h-px flex-1" style={{ backgroundColor: 'rgba(44,31,168,0.4)' }} />
          <span
            className="font-sans text-[10px] uppercase tracking-[0.3em]"
            style={{ color: 'rgba(110,242,168,0.5)' }}
          >
            el proceso sin filtro
          </span>
          <div className="h-px flex-1" style={{ backgroundColor: 'rgba(44,31,168,0.4)' }} />
        </motion.div>

        {/* Raw process steps */}
        <div className="flex flex-col gap-12">
          {RAW_PROCESS.map((step, i) => (
            <motion.div
              key={i}
              className="flex gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={vp}
              variants={fadeUp}
              transition={{ duration: 0.7, ease, delay: i * 0.08 }}
            >
              <div
                className="mt-1 flex-none font-serif text-xl italic"
                style={{ color: 'rgba(110,242,168,0.5)' }}
              >
                {step.n}
              </div>
              <div>
                <p
                  className="font-sans text-lg leading-snug"
                  style={{ color: '#EDEAF5' }}
                >
                  {step.title}
                </p>
                <p
                  className="mt-3 font-sans text-sm leading-relaxed"
                  style={{ color: 'rgba(237,234,245,0.55)' }}
                >
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Por qué sigo */}
        <motion.div
          className="mt-20 border-l-2 pl-6"
          style={{ borderColor: 'rgba(44,31,168,0.6)' }}
          initial="hidden"
          whileInView="visible"
          viewport={vp}
          variants={fadeUp}
          transition={{ duration: 0.9, ease }}
        >
          <p
            className="font-serif text-2xl italic leading-[1.35] sm:text-3xl"
            style={{ color: '#EDEAF5' }}
          >
            Sigo porque me importa más hacer algo bueno
            <br />
            que hacer algo rápido.
          </p>
          <p
            className="mt-4 font-sans text-sm"
            style={{ color: 'rgba(237,234,245,0.45)' }}
          >
            — Fer, 19 años, Madrid
          </p>
        </motion.div>

        {/* CTA naranja */}
        <motion.div
          className="mt-20"
          initial="hidden"
          whileInView="visible"
          viewport={vp}
          variants={fadeUp}
          transition={{ duration: 0.8, ease }}
        >
          <p
            className="font-sans text-base"
            style={{ color: 'rgba(237,234,245,0.6)' }}
          >
            Si llegas hasta aquí con algo en mente, me interesa escucharte.
          </p>
          <Link
            to="/contacto"
            className="mt-4 inline-block font-sans text-base font-medium transition-opacity hover:opacity-80"
            style={{ color: '#FF9E5E' }}
          >
            Escríbeme →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
