import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'

const FAQS = [
  {
    q: '¿Por qué confiar en alguien de 19 años?',
    a: 'La edad es un dato, no un argumento. Mira el trabajo con Motor Arjona y R House Asesores y decide tú con eso, no con mi DNI.',
  },
  {
    q: '¿Cuánto tarda un proyecto?',
    a: 'Depende del alcance. Te doy un plazo real en la primera llamada, no una promesa vacía solo para cerrar el trato.',
  },
  {
    q: '¿Trabajas en remoto?',
    a: 'Sí. El criterio no depende del código postal. Llamadas, revisiones y entregas, todo a distancia sin perder seguimiento.',
  },
  {
    q: '¿Cómo es el proceso de pago?',
    a: 'Lo hablamos claro antes de empezar, sin letra pequeña ni sorpresas a mitad de proyecto.',
  },
  {
    q: '¿Y si no encajamos?',
    a: 'Te lo digo en la primera llamada. Prefiero perder un cliente a entregar algo mediocre.',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: { '@type': 'Answer', text: faq.a },
  })),
}

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="relative w-full px-6 pb-32 pt-12 sm:pb-40 sm:pt-16" style={{ backgroundColor: '#0a1520' }}>
      <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      <div className="mx-auto max-w-2xl">
        <motion.p
          className="font-sans text-xs uppercase tracking-[0.2em] text-[#57b8bc]/60"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          Antes de escribirme
        </motion.p>

        <motion.h2
          className="mt-6 font-sans text-3xl font-light leading-[1.2] text-[#dde8e9] sm:text-4xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          Lo que normalmente preguntan.
        </motion.h2>

        <div className="mt-12 flex flex-col">
          {FAQS.map((faq, i) => {
            const isOpen = open === i
            return (
              <motion.div
                key={faq.q}
                className="border-t border-white/10"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                variants={fadeUp}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 }}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-6 text-left"
                >
                  <span className="font-sans text-base text-[#dde8e9] sm:text-lg">{faq.q}</span>
                  <Plus
                    size={18}
                    className="flex-none text-[#57b8bc] transition-transform duration-300"
                    style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 font-sans text-sm leading-relaxed text-[#dde8e9]/60">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
