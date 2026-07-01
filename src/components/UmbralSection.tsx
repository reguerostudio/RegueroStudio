import { motion } from 'framer-motion'

export default function UmbralSection() {
  return (
    <div
      className="relative flex min-h-[50vh] items-center justify-center overflow-hidden px-6"
      style={{
        background: 'linear-gradient(to bottom, #0a1520 0%, #080812 50%, #050308 100%)',
      }}
    >
      {/* violet bleed — la turquesa se apaga, entra el violeta */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(44,31,168,0) 0%, rgba(44,31,168,0.18) 100%)',
        }}
      />

      <div className="relative z-10 max-w-lg text-center">
        <motion.p
          className="font-sans text-[10px] uppercase tracking-[0.35em]"
          style={{ color: 'rgba(110,242,168,0.55)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          — umbral —
        </motion.p>

        <motion.p
          className="mt-8 font-sans text-2xl font-light leading-[1.35] sm:text-3xl"
          style={{ color: '#EDEAF5' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        >
          Aquí se acaba la presentación.
          <br />
          Lo que sigue es lo real.
        </motion.p>

        <motion.div
          className="mx-auto mt-10 h-px w-14"
          style={{ backgroundColor: 'rgba(110,242,168,0.45)' }}
          initial={{ scaleX: 0, originX: 0.5 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        />
      </div>
    </div>
  )
}
