import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Footer from '../components/Footer'

export default function PrivacyPage() {
  return (
    <main style={{ backgroundColor: '#0a0f14' }}>
      <Link
        to="/"
        className="fixed left-6 top-6 z-50 flex items-center gap-2 font-sans text-xs uppercase tracking-[0.2em] text-[#dde8e9]/60 transition-colors hover:text-[#57b8bc]"
      >
        <ArrowLeft size={14} />
        Reguero Studio
      </Link>

      <div className="mx-auto max-w-2xl px-6 py-32">
        <p className="font-sans text-xs uppercase tracking-[0.2em] text-[#57b8bc]/60">
          Legal
        </p>
        <h1 className="mt-6 font-sans text-3xl font-light text-[#dde8e9] sm:text-4xl">
          Política de privacidad
        </h1>
        <p className="mt-4 font-sans text-sm text-[#dde8e9]/40">
          Última actualización: junio de 2026
        </p>

        <div className="mt-12 flex flex-col gap-8 font-sans text-sm leading-relaxed text-[#dde8e9]/70">
          <section>
            <h2 className="mb-2 font-sans text-base text-[#9fe0e5]">Responsable del tratamiento</h2>
            <p>
              Fernando Reguero Gallego, actuando bajo el nombre comercial Reguero Studio. Contacto:{' '}
              <a href="mailto:reguero.studio.contact@gmail.com" className="text-[#9fe0e5] underline">
                reguero.studio.contact@gmail.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-sans text-base text-[#9fe0e5]">Qué datos recogemos</h2>
            <p>
              Únicamente los que introduces voluntariamente en el formulario de contacto: nombre,
              email y el contenido del mensaje. No recogemos ningún otro dato personal, y esta web
              no utiliza cookies de seguimiento ni analítica de terceros.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-sans text-base text-[#9fe0e5]">Para qué los usamos</h2>
            <p>
              Exclusivamente para responder a tu consulta. No se utilizan con fines publicitarios,
              no se elaboran perfiles, y no se ceden a terceros con fines comerciales.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-sans text-base text-[#9fe0e5]">Base legal</h2>
            <p>
              El consentimiento que prestas al marcar la casilla de aceptación y enviar el
              formulario (art. 6.1.a del RGPD).
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-sans text-base text-[#9fe0e5]">Con quién se comparten</h2>
            <p>
              Los datos se almacenan en Supabase (proveedor de base de datos en la nube) y se
              notifican por email a través de Resend (proveedor de envío de email). Ambos actúan
              como encargados del tratamiento, con sus propias garantías de seguridad y cifrado. No
              se comparten con nadie más.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-sans text-base text-[#9fe0e5]">Cuánto tiempo se conservan</h2>
            <p>
              El tiempo necesario para gestionar tu consulta. Puedes solicitar su eliminación en
              cualquier momento escribiendo al email de contacto.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-sans text-base text-[#9fe0e5]">Tus derechos</h2>
            <p>
              Tienes derecho a acceder, rectificar, suprimir, oponerte, limitar el tratamiento y
              solicitar la portabilidad de tus datos. Para ejercerlos, escribe a{' '}
              <a href="mailto:reguero.studio.contact@gmail.com" className="text-[#9fe0e5] underline">
                reguero.studio.contact@gmail.com
              </a>
              . También puedes presentar una reclamación ante la Agencia Española de Protección de
              Datos (
              <a
                href="https://www.aepd.es"
                target="_blank"
                rel="noreferrer"
                className="text-[#9fe0e5] underline"
              >
                www.aepd.es
              </a>
              ).
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  )
}
