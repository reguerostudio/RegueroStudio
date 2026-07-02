import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'
import SeoHead from '../components/SeoHead'

export default function ContactPage() {
  return (
    <main>
      <SeoHead
        title="Contacto · Reguero Studio"
        description="Cuéntame qué necesitas. Un mensaje, una llamada, y si encajamos, arrancamos."
        path="/contacto"
      />
      <Link
        to="/"
        className="fixed left-6 top-6 z-50 flex items-center gap-2 font-sans text-xs uppercase tracking-[0.2em] text-[#dde8e9]/60 transition-colors hover:text-[#57b8bc]"
      >
        <ArrowLeft size={14} />
        Reguero Studio
      </Link>
      <ContactSection />
      <Footer />
    </main>
  )
}
