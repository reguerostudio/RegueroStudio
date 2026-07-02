import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Gate único para toda la capa de efectos INMERSO (profundímetro, cursor,
 * sonido, grano). Activo en cualquier ruta /inmerso/* o, en la home, en
 * cuanto la sección #inmerso empieza a entrar en el viewport.
 */
export function useInmersoActive(): boolean {
  const { pathname } = useLocation()
  const isInmersoRoute = pathname.startsWith('/inmerso')
  const [enteredOnHome, setEnteredOnHome] = useState(false)

  useEffect(() => {
    if (isInmersoRoute) return
    function check() {
      const el = document.getElementById('inmerso')
      if (!el) return
      setEnteredOnHome(el.getBoundingClientRect().top <= window.innerHeight * 0.6)
    }
    check()
    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check)
    return () => {
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
    }
  }, [isInmersoRoute])

  return isInmersoRoute || enteredOnHome
}
