import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import BioCanvas from '../components/BioCanvas'
import CardVideo from '../components/CardVideo'
import CardImagen from '../components/CardImagen'
import CardCampana from '../components/CardCampana'
import SeoHead from '../components/SeoHead'

/* ── Aquí añades tus piezas cuando las tengas ───────────────────────────────
   Cada objeto es una tarjeta en el grid. Deja src/assets vacío para que
   aparezca en modo placeholder. El orden aquí es el orden en el masonry.
   ─────────────────────────────────────────────────────────────────────────── */
const ITEMS = [
  {
    type: 'campaña' as const,
    title: 'Motor Arjona',
    client: 'Taller mecánico · Madrid',
    tag: 'Web & Estrategia',
    description: 'Supervisión web, estrategia digital y presencia de marca.',
    assets: [],
  },
  {
    type: 'video' as const,
    title: 'Reel 01',
    tag: 'Vídeo',
    aspectRatio: 'portrait' as const,
  },
  {
    type: 'imagen' as const,
    title: 'Identidad visual',
    tag: 'Branding',
    aspectRatio: 'square' as const,
  },
  {
    type: 'campaña' as const,
    title: 'R House Asesores',
    client: 'Asesoría · Madrid',
    tag: 'Branding & Web',
    description: 'Identidad visual y sistema digital para asesoría familiar.',
    assets: [],
  },
  {
    type: 'video' as const,
    title: 'Reel 02',
    tag: 'Vídeo',
    aspectRatio: 'landscape' as const,
  },
  {
    type: 'imagen' as const,
    title: 'Fotografía',
    tag: 'Fotografía',
    aspectRatio: 'portrait' as const,
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}
const ease = [0.16, 1, 0.3, 1] as const

export default function InmersoPortfolioPage() {
  return (
    <main className="relative min-h-screen" style={{ backgroundColor: '#050308' }}>
      <SeoHead
        title="Portfolio · INMERSO — Reguero Studio"
        description="El trabajo real de Fernando Reguero: campañas, vídeo, imagen. Proceso crudo, sin pulir para presentación."
        path="/inmerso/portfolio"
      />
      <Navbar />
      <BioCanvas />

      {/* violet depth wash */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(44,31,168,0.2) 0%, rgba(5,3,8,0) 65%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-24 sm:py-32">

        {/* header */}
        <motion.div
          className="mt-12"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.8, ease, delay: 0.1 }}
        >
          <p
            className="font-sans text-[10px] uppercase tracking-[0.3em]"
            style={{ color: 'rgba(110,242,168,0.55)' }}
          >
            INMERSO — trabajo
          </p>
          <h1
            className="mt-4 font-sans text-3xl font-light leading-[1.2] sm:text-4xl"
            style={{ color: '#EDEAF5' }}
          >
            Lo que he construido.
            <br />
            <span className="font-serif italic" style={{ color: 'rgba(237,234,245,0.45)' }}>
              Y lo que viene.
            </span>
          </h1>
          <p
            className="mt-4 font-sans text-sm leading-relaxed"
            style={{ color: 'rgba(237,234,245,0.45)', maxWidth: '480px' }}
          >
            Esta página crece con el trabajo. Lo que no está todavía, está en proceso.
          </p>
        </motion.div>

        {/* divider */}
        <div className="my-14 h-px w-full" style={{ backgroundColor: 'rgba(44,31,168,0.3)' }} />

        {/* masonry grid — CSS columns */}
        <motion.div
          className="columns-1 gap-4 sm:columns-2 lg:columns-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease, delay: 0.25 }}
        >
          {ITEMS.map((item, i) => {
            if (item.type === 'video') {
              return (
                <div key={i} className="break-inside-avoid">
                  <CardVideo
                    title={item.title}
                    tag={item.tag}
                    aspectRatio={item.aspectRatio as 'square' | 'portrait' | 'landscape'}
                  />
                </div>
              )
            }
            if (item.type === 'imagen') {
              return (
                <div key={i} className="break-inside-avoid">
                  <CardImagen
                    title={item.title}
                    tag={item.tag}
                    aspectRatio={item.aspectRatio as 'square' | 'portrait' | 'landscape'}
                  />
                </div>
              )
            }
            return (
              <div key={i} className="break-inside-avoid">
                <CardCampana
                  title={item.title}
                  client={item.client}
                  tag={item.tag}
                  description={item.description}
                  assets={item.assets}
                />
              </div>
            )
          })}
        </motion.div>

        {/* footer nota */}
        <p
          className="mt-20 text-center font-sans text-xs"
          style={{ color: 'rgba(237,234,245,0.2)' }}
        >
          Más trabajo en camino. Vuelve pronto.
        </p>
      </div>
    </main>
  )
}
