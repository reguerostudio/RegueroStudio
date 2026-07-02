import { motion } from 'framer-motion'
import MediaPlaceholder from './MediaPlaceholder'

const PARAGRAPHS = [
  'Lo más importante es por qué empecé esto.',
  'Me aburría de ver negocios con potencial real escondidos detrás de marcas que no les hacían justicia. Un logo genérico. Una web de plantilla. Sin criterio. Sin carácter.',
  'Reguero Studio nació para hacer lo contrario.',
  'Diseño identidad visual y estrategia de marca para negocios locales y fundadores que entienden que la imagen no es decoración. Es posicionamiento.',
  'No tengo diez años de cartera. Tengo criterio en formación, hambre a tiempo completo y la ventaja de vivir en la misma realidad que los consumidores a los que quieres llegar.',
  'Trabajo con IA no porque esté de moda. Sino porque me permite entregar en días lo que otros tardan semanas. Y porque los mejores sistemas no dependen de que el artesano esté siempre delante del torno.',
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

export default function AboutSection() {
  return (
    <section id="sobre-mi" className="relative w-full px-6 py-32 sm:py-40">
      <div className="mx-auto flex max-w-5xl flex-col gap-12 lg:flex-row lg:items-start lg:gap-16">
        <div className="flex-1">
          <motion.p
            className="font-sans text-xs uppercase tracking-[0.2em] text-[#57b8bc]/60"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            Quién está detrás
          </motion.p>

          <motion.h2
            className="mt-6 font-sans text-4xl font-light leading-[1.15] text-[#dde8e9] sm:text-5xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            Tengo 19 años.
            <br />
            Y eso no es lo más importante.
          </motion.h2>

          {/* portrait: visible en mobile justo después del titular, antes del texto */}
          <motion.div
            className="mt-10 max-w-[220px] lg:hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <MediaPlaceholder label="Foto de Fer" kind="imagen" aspectRatio="portrait" variant="surface" />
          </motion.div>

          <div className="mt-14 flex flex-col gap-6">
            {PARAGRAPHS.map((paragraph, i) => (
              <motion.p
                key={paragraph}
                className="font-sans text-base leading-relaxed text-[#dde8e9]/65 sm:text-lg"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                variants={fadeUp}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 }}
              >
                {paragraph}
              </motion.p>
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
            <p className="font-serif text-2xl italic text-[#9fe0e5] sm:text-3xl">
              Reguero Studio no es una agencia.
              <br />
              Es una apuesta.
            </p>
          </motion.div>
        </div>

        {/* portrait: columna lateral fija en desktop */}
        <motion.div
          className="hidden lg:block lg:w-64 lg:flex-none"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        >
          <MediaPlaceholder label="Foto de Fer" kind="imagen" aspectRatio="portrait" variant="surface" />
        </motion.div>
      </div>
    </section>
  )
}
