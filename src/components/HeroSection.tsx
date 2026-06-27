import { useEffect, useRef } from 'react'

interface HeroSectionProps {
  scrollProg: number
}

export default function HeroSection({ scrollProg }: HeroSectionProps) {
  const h1Ref = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    function onMove(e: MouseEvent) {
      const h1 = h1Ref.current
      if (!h1) return
      const nx = (e.clientX / window.innerWidth - 0.5) * 2
      const ny = (e.clientY / window.innerHeight - 0.5) * 2
      h1.style.transform = `perspective(800px) rotateY(${nx * 3}deg) rotateX(${-ny * 3}deg)`
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  // contraste adaptativo: navy oscuro sobre la superficie clara, claro sobre el fondo oscuro
  const kickerColor = `rgba(${Math.round(10 + scrollProg * 200)}, ${Math.round(
    25 + scrollProg * 210,
  )}, ${Math.round(35 + scrollProg * 200)}, 0.6)`

  return (
    <section className="flex h-[100dvh] w-full flex-col items-center justify-center px-6 text-center">
      <p
        className="hero-anim hero-fade font-sans text-xs uppercase tracking-[0.2em]"
        style={{ animationDelay: '0.25s', color: kickerColor }}
      >
        Reguero Studio · Madrid
      </p>
      <div className="hero-anim hero-reveal mt-6" style={{ animationDelay: '0.45s' }}>
        <h1
          ref={h1Ref}
          className="font-sans text-4xl font-light text-[#dde8e9] sm:text-6xl md:text-7xl"
          style={{ transition: 'transform 0.25s ease-out', willChange: 'transform' }}
        >
          Diseño que se{' '}
          <em className="font-serif italic">siente.</em>
          <sup className="text-lg align-super not-italic">®</sup>
        </h1>
      </div>
      <p
        className="hero-anim hero-fade mt-6 max-w-md font-sans text-sm text-[#dde8e9]/40"
        style={{ animationDelay: '0.7s' }}
      >
        Dirección creativa para marcas que no necesitan gritar.
      </p>
    </section>
  )
}
