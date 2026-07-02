import { useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { useInmersoActive } from '../hooks/useInmersoActive'
import { INMERSO, withAlpha } from '../lib/theme'

const STORAGE_KEY = 'inmerso-sound-enabled'

interface RumbleNodes {
  osc1: OscillatorNode
  osc2: OscillatorNode
  gain: GainNode
}

/** Toggle de sonido ambiente (retumbo grave sintetizado, sin asset de audio).
 * Muteado por defecto. Nunca autoplay con sonido activo al cargar: si había
 * preferencia guardada, se retoma solo tras el primer gesto real del usuario. */
export default function InmersoSoundToggle() {
  const active = useInmersoActive()
  const [enabled, setEnabled] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'true'
    } catch {
      return false
    }
  })
  const ctxRef = useRef<AudioContext | null>(null)
  const nodesRef = useRef<RumbleNodes | null>(null)

  function startRumble() {
    if (ctxRef.current) {
      ctxRef.current.resume()
      return
    }
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    const ctx = new AudioCtx()
    const gain = ctx.createGain()
    gain.gain.value = 0
    gain.connect(ctx.destination)

    const osc1 = ctx.createOscillator()
    osc1.type = 'sine'
    osc1.frequency.value = 42
    osc1.connect(gain)
    osc1.start()

    const osc2 = ctx.createOscillator()
    osc2.type = 'sine'
    osc2.frequency.value = 55
    osc2.connect(gain)
    osc2.start()

    gain.gain.linearRampToValueAtTime(0.035, ctx.currentTime + 1.2)

    ctxRef.current = ctx
    nodesRef.current = { osc1, osc2, gain }
  }

  function stopRumble() {
    const ctx = ctxRef.current
    const nodes = nodesRef.current
    if (!ctx || !nodes) return
    nodes.gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.6)
    window.setTimeout(() => {
      nodes.osc1.stop()
      nodes.osc2.stop()
      ctx.close()
      ctxRef.current = null
      nodesRef.current = null
    }, 700)
  }

  // Preferencia guardada: no se reanuda hasta el primer gesto real.
  useEffect(() => {
    if (!enabled || ctxRef.current) return
    function resumeOnGesture() {
      startRumble()
      window.removeEventListener('pointerdown', resumeOnGesture)
      window.removeEventListener('keydown', resumeOnGesture)
    }
    window.addEventListener('pointerdown', resumeOnGesture)
    window.addEventListener('keydown', resumeOnGesture)
    return () => {
      window.removeEventListener('pointerdown', resumeOnGesture)
      window.removeEventListener('keydown', resumeOnGesture)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Pausa el retumbo cuando sales de la zona INMERSO, sin perder la preferencia.
  useEffect(() => {
    const ctx = ctxRef.current
    if (!ctx) return
    if (active && enabled) ctx.resume()
    else if (!active) ctx.suspend()
  }, [active, enabled])

  useEffect(() => {
    return () => stopRumble()
  }, [])

  function toggle() {
    const next = !enabled
    setEnabled(next)
    try {
      localStorage.setItem(STORAGE_KEY, String(next))
    } catch {
      // localStorage no disponible, la preferencia solo dura esta sesión
    }
    if (next) startRumble()
    else stopRumble()
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={enabled ? 'Silenciar sonido ambiente' : 'Activar sonido ambiente'}
      className="pointer-events-auto fixed bottom-5 right-4 z-40 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-sm transition-all duration-500 sm:right-6"
      style={{
        backgroundColor: withAlpha(INMERSO.base, 0.5),
        border: `1px solid ${withAlpha(INMERSO.bioGreen, enabled ? 0.5 : 0.25)}`,
        color: withAlpha(INMERSO.bioGreen, enabled ? 0.85 : 0.4),
        opacity: active ? 1 : 0,
        pointerEvents: active ? 'auto' : 'none',
      }}
    >
      {enabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
    </button>
  )
}
