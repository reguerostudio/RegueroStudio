import { useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { useInmersoActive } from '../hooks/useInmersoActive'
import { INMERSO, withAlpha } from '../lib/theme'

const STORAGE_KEY = 'inmerso-sound-enabled'
const PEAK_GAIN = 0.014 // deliberadamente muy bajo, casi subliminal

interface AmbientNodes {
  sub: OscillatorNode
  noise: AudioBufferSourceNode
  lfo: OscillatorNode
  masterGain: GainNode
}

/** Toggle de sonido ambiente: textura de "corriente submarina" (ruido
 * filtrado) + un sub grave casi imperceptible, con una modulación lenta
 * tipo respiración en vez de un tono fijo. Nada de dos senos cercanos
 * batiendo entre sí (sonaba a motor). Muteado por defecto. Nunca autoplay
 * con sonido activo al cargar: si había preferencia guardada, se retoma
 * solo tras el primer gesto real del usuario. */
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
  const nodesRef = useRef<AmbientNodes | null>(null)

  function startAmbient() {
    if (ctxRef.current) {
      ctxRef.current.resume()
      return
    }
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    const ctx = new AudioCtx()

    const masterGain = ctx.createGain()
    masterGain.gain.value = 0
    masterGain.connect(ctx.destination)

    // respiración lenta sobre el volumen general, nada de tono fijo estático
    const lfo = ctx.createOscillator()
    lfo.type = 'sine'
    lfo.frequency.value = 0.06 // un ciclo cada ~16s
    const lfoGain = ctx.createGain()
    lfoGain.gain.value = 0.005
    lfo.connect(lfoGain)
    lfoGain.connect(masterGain.gain)
    lfo.start()

    // sub grave, casi imperceptible, da presencia sin sonar a maquinaria
    const sub = ctx.createOscillator()
    sub.type = 'sine'
    sub.frequency.value = 38
    const subGain = ctx.createGain()
    subGain.gain.value = 0.45
    sub.connect(subGain)
    subGain.connect(masterGain)
    sub.start()

    // textura de corriente submarina: ruido filtrado, no un tono puro
    const bufferSeconds = 2
    const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * bufferSeconds, ctx.sampleRate)
    const data = noiseBuffer.getChannelData(0)
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1

    const noise = ctx.createBufferSource()
    noise.buffer = noiseBuffer
    noise.loop = true

    const noiseFilter = ctx.createBiquadFilter()
    noiseFilter.type = 'lowpass'
    noiseFilter.frequency.value = 220
    noiseFilter.Q.value = 0.7

    const noiseGain = ctx.createGain()
    noiseGain.gain.value = 0.4
    noise.connect(noiseFilter)
    noiseFilter.connect(noiseGain)
    noiseGain.connect(masterGain)
    noise.start()

    masterGain.gain.linearRampToValueAtTime(PEAK_GAIN, ctx.currentTime + 2)

    ctxRef.current = ctx
    nodesRef.current = { sub, noise, lfo, masterGain }
  }

  function stopAmbient() {
    const ctx = ctxRef.current
    const nodes = nodesRef.current
    if (!ctx || !nodes) return
    nodes.masterGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.8)
    window.setTimeout(() => {
      nodes.sub.stop()
      nodes.noise.stop()
      nodes.lfo.stop()
      ctx.close()
      ctxRef.current = null
      nodesRef.current = null
    }, 900)
  }

  // Preferencia guardada: no se reanuda hasta el primer gesto real.
  useEffect(() => {
    if (!enabled || ctxRef.current) return
    function resumeOnGesture() {
      startAmbient()
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

  // Pausa el ambiente cuando sales de la zona INMERSO, sin perder la preferencia.
  useEffect(() => {
    const ctx = ctxRef.current
    if (!ctx) return
    if (active && enabled) ctx.resume()
    else if (!active) ctx.suspend()
  }, [active, enabled])

  useEffect(() => {
    return () => stopAmbient()
  }, [])

  function toggle() {
    const next = !enabled
    setEnabled(next)
    try {
      localStorage.setItem(STORAGE_KEY, String(next))
    } catch {
      // localStorage no disponible, la preferencia solo dura esta sesión
    }
    if (next) startAmbient()
    else stopAmbient()
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
