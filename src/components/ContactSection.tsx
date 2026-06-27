import { useState, type FormEvent, type KeyboardEvent } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'

interface FormState {
  name: string
  email: string
  message: string
}

const STEPS: { key: keyof FormState; label: string; placeholder: string; type: string }[] = [
  { key: 'name', label: '¿Cómo te llamas?', placeholder: 'Tu nombre', type: 'text' },
  { key: 'email', label: '¿Dónde te respondo?', placeholder: 'tu@email.com', type: 'email' },
  { key: 'message', label: '¿Qué tienes en mente?', placeholder: 'Cuéntame en dos líneas...', type: 'text' },
]

export default function ContactSection() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [focused, setFocused] = useState(false)
  const [accepted, setAccepted] = useState(false)

  const current = STEPS[step]
  const isLast = step === STEPS.length - 1
  const value = current ? form[current.key] : ''
  const canAdvance = value.trim().length > 0 && (!isLast || accepted)

  function update(v: string) {
    if (!current) return
    setForm((f) => ({ ...f, [current.key]: v }))
  }

  async function submitLead() {
    setSending(true)
    setError(null)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('request-failed')
      setSubmitted(true)
    } catch {
      setError('No se pudo enviar. Inténtalo otra vez en un momento.')
    } finally {
      setSending(false)
    }
  }

  function advance() {
    if (!canAdvance || sending) return
    if (isLast) {
      submitLead()
    } else {
      setStep((s) => s + 1)
    }
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault()
      advance()
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    advance()
  }

  return (
    <section
      id="contacto"
      className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center px-6 py-32"
      style={{ backgroundColor: '#0a0f14' }}
    >
      <div className="w-full max-w-lg text-center">
        <p className="font-sans text-xs uppercase tracking-[0.2em] text-[#57b8bc]/60">
          ¿Tienes un proyecto?
        </p>
        <h2 className="mt-6 font-sans text-3xl font-light text-[#dde8e9] sm:text-4xl">
          Cuéntame qué necesitas.
        </h2>
        <p className="mt-4 font-sans text-sm text-[#dde8e9]/40">
          Sin formularios de diez campos ni reuniones de presentación infinitas.
          <br />
          Un mensaje. Una llamada. Y si encajamos, arrancamos.
        </p>

        <div className="mt-16">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key={step}
                onSubmit={onSubmit}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center gap-6"
              >
                <label className="font-sans text-lg text-[#dde8e9]/80" htmlFor="contact-field">
                  {current.label}
                </label>
                <div className="relative w-full">
                  <input
                    id="contact-field"
                    autoFocus
                    type={current.type}
                    value={value}
                    placeholder={current.placeholder}
                    onChange={(e) => update(e.target.value)}
                    onKeyDown={onKeyDown}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    className="w-full border-0 border-b bg-transparent px-1 py-3 text-center font-sans text-xl text-[#dde8e9] outline-none transition-all duration-300 placeholder:text-[#dde8e9]/20"
                    style={{
                      borderColor: focused ? 'rgba(87,184,188,0.6)' : 'rgba(255,255,255,0.15)',
                      boxShadow: focused ? '0 8px 24px -8px rgba(87,184,188,0.35)' : 'none',
                    }}
                  />
                </div>

                {isLast && (
                  <label className="flex max-w-xs items-start gap-2 text-left font-sans text-xs text-[#dde8e9]/50">
                    <input
                      type="checkbox"
                      checked={accepted}
                      onChange={(e) => setAccepted(e.target.checked)}
                      className="mt-0.5 h-3.5 w-3.5 flex-none accent-[#57b8bc]"
                    />
                    <span>
                      He leído y acepto la{' '}
                      <Link to="/privacidad" className="text-[#9fe0e5] underline">
                        política de privacidad
                      </Link>
                      .
                    </span>
                  </label>
                )}

                <button
                  type="submit"
                  disabled={!canAdvance || sending}
                  className="mt-2 inline-flex items-center gap-2 rounded-full px-6 py-2.5 font-sans text-sm transition-opacity disabled:opacity-30"
                  style={{ backgroundColor: '#57b8bc', color: '#0a0a0a' }}
                >
                  {sending ? 'Enviando...' : isLast ? 'Iniciar descenso' : 'Siguiente'}
                  <ArrowRight size={15} />
                </button>

                {error && (
                  <p className="font-sans text-xs text-red-300/80">{error}</p>
                )}

                <div className="mt-2 flex items-center gap-2">
                  {STEPS.map((s, i) => (
                    <span
                      key={s.key}
                      className="h-1 w-6 rounded-full transition-colors"
                      style={{
                        backgroundColor: i <= step ? 'rgba(87,184,188,0.8)' : 'rgba(255,255,255,0.1)',
                      }}
                    />
                  ))}
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center gap-4"
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full"
                  style={{ backgroundColor: 'rgba(87,184,188,0.15)' }}
                >
                  <Check size={20} className="text-[#9fe0e5]" />
                </div>
                <p className="font-serif text-xl italic text-[#9fe0e5]">
                  Recibido, {form.name.split(' ')[0]}.
                </p>
                <p className="max-w-xs font-sans text-sm text-[#dde8e9]/50">
                  Respondo en menos de 48h a {form.email}.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <p className="absolute bottom-8 right-6 font-mono text-[10px] tracking-widest text-[#57b8bc]/30">
        40.4168° N, 3.7038° W
      </p>
    </section>
  )
}
